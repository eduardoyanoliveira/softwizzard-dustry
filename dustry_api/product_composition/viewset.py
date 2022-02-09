from itertools import product
from rest_framework import viewsets
from .serializer import ProductCompositionSerializer
from dustry.models import ProductComposition, Product, RawMaterial


from rest_framework.response import Response 
from rest_framework import status


class ProductCompositionViewSet(viewsets.ModelViewSet):
    queryset = ProductComposition.objects.all() 
    serializer_class = ProductCompositionSerializer
    
    def retrieve(self, request, *args, **kwargs):
        data = ProductComposition.objects.filter(product_id=kwargs['pk'])
        serializer = ProductCompositionSerializer(data, many=True)
        return Response(serializer.data)
    
    def create(self, request, *args, **kwargs):
        params = request.query_params
        
        if 'product' in params and 'raw_material' in params and 'qty' in params:
            this_product = Product.objects.get(id=params['product'])
            this_raw_material = RawMaterial.objects.get(id=params['raw_material'])
            this_qty = params['qty']
            
            if(not this_product):
                return Response(
                    {'msg': 'Código de produto não encontrado no banco de dados.'},
                    status=status.HTTP_404_NOT_FOUND
                )
            
            if(not this_raw_material):
                return Response(
                    {'msg': 'Código de matéria prima não encontrado no banco de dados.'},
                    status=status.HTTP_404_NOT_FOUND
                )
            
            # Checks if the database has aldeary a register of the current data
            try:
               product_composition = ProductComposition.objects.get(product_id=this_product, raw_material_id=this_raw_material)
            except ProductComposition.DoesNotExist:
                product_composition = None
                
            if(product_composition != None):
                return Response(
                {'msg': 'Já existe um registro para estes dados.'},
                status=status.HTTP_409_CONFLICT
            )
 
            product_composition = ProductComposition.objects.create(product_id=this_product, raw_material_id=this_raw_material, qty=this_qty)
            product_composition.save()
            
            serializer = ProductCompositionSerializer(product_composition, many=False)
            return Response(serializer.data)
        else:
            return Response(
                {'msg': 'A requisição não possui todos parametros necessários.'},
                status=status.HTTP_400_BAD_REQUEST
            )

    def destroy(self, request, *args, **kwargs):
        params = request.query_params
        
        try:
            product_composition = ProductComposition.objects.filter(product_id=kwargs['pk'])
        except ProductComposition.DoesNotExist:
            product_composition = None
        
        if product_composition == None:
            return Response({'message': 'Produto não está vinculado a nenhum registro'})
            
        
        # If the user sends a parameter called "all" with the value true, it deletes every record with the product passed on pk
        if 'all' in params:
            if params['all']:
                product_composition = ProductComposition.objects.filter(product_id=kwargs['pk'])
                if product_composition:
                    product_composition.delete()
                    return Response(status=status.HTTP_200_OK)
                else:
                    return Response(
                        {
                            'msg':'Nenhum registro está vinculado a este produto'
                        },
                        status=status.HTTP_404_NOT_FOUND                                                   
                    )
        
        if 'raw_material' in params:
            if params['raw_material']:
                product_composition = ProductComposition.objects.filter(raw_material_id=params['raw_material'])
                if product_composition:  
                    product_composition.delete()
                    return Response(status=status.HTTP_200_OK)
                else:
                    return Response(
                        {
                            'msg':'O produto não possui vinculo com esta matéria prima'
                        },
                        status=status.HTTP_404_NOT_FOUND                                                   
                    )