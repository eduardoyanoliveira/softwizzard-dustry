from rest_framework import viewsets
from dustry.models import ProductionOrderProduct ,ProductionOrder, Product
from .serializer import ProductionOrderProductSerializer

from rest_framework.response import Response 
from rest_framework import status


class ProductionOrderProductViewSet(viewsets.ModelViewSet):
    queryset = ProductionOrderProduct.objects.all() 
    serializer_class = ProductionOrderProductSerializer
    
    def retrieve(self, request, *args, **kwargs):
        data = ProductionOrderProduct.objects.filter(order_id=kwargs['pk'])
        serializer = ProductionOrderProductSerializer(data, many=True)
        return Response(serializer.data)
    
    def create(self, request, *args, **kwargs):
        params = request.query_params
        
        if 'order' in params and 'product' in params:
            this_product = Product.objects.get(id=params['product'])
            this_order = ProductionOrder.objects.get(id=params['order'])
            
            if(not this_product):
                return Response(
                    {'msg': 'Código de produto não encontrado no banco de dados.'},
                    status=status.HTTP_404_NOT_FOUND
                )
            
            if(not this_order):
                return Response(
                    {'msg': 'Código de Order de Produção não encontrado no banco de dados.'},
                    status=status.HTTP_404_NOT_FOUND
                )
            
            # Checks if the database has aldeary a register of the current data
            try:
               production_order_product = ProductionOrderProduct.objects.get(order_id=this_order, product_id=this_product)
            except ProductionOrderProduct.DoesNotExist:
                production_order_product = None
                
            if(production_order_product != None):
                return Response(
                {'msg': 'Já existe um registro para estes dados.'},
                status=status.HTTP_409_CONFLICT
            )
 
            production_order_product =  ProductionOrderProduct.objects.create(order_id=this_order, product_id=this_product)
            production_order_product.save()
            
            serializer = ProductionOrderProductSerializer(production_order_product, many=False)
            return Response(serializer.data)
        else:
            return Response(
                {'msg': 'A requisição não possui todos parametros necessários.'},
                status=status.HTTP_400_BAD_REQUEST
            )

    def destroy(self, request, *args, **kwargs):
        params = request.query_params
        
        try:
            production_order_product = ProductionOrderProduct.objects.filter(order_id=kwargs['pk'])
        except ProductionOrderProduct.DoesNotExist:
            production_order_product = None
        
        if production_order_product == None:
            return Response({'message': 'Ordem de Produção não está vinculado a nenhum registro'})
            
        
        # If the user sends a parameter called "all" with the value true, it deletes every record with the order passed on pk
        if 'all' in params:
            if params['all']:
                production_order_product = ProductionOrderProduct.objects.filter(order_id=kwargs['pk'])
                if production_order_product:
                    production_order_product.delete()
                    return Response(status=status.HTTP_200_OK)
                else:
                    return Response(
                        {
                            'msg':'Nenhum registro está vinculado a esta Ordem de Produção'
                        },
                        status=status.HTTP_404_NOT_FOUND                                                   
                    )
        
        if 'product' in params:
            if params['product']:
                production_order_product = ProductionOrderProduct.objects.filter(product_id=params['product'])
                if production_order_product:  
                    production_order_product.delete()
                    return Response(status=status.HTTP_200_OK)
                else:
                    return Response(
                        {
                            'msg':'A Ordem de Produção não possui vinculo com este produto'
                        },
                        status=status.HTTP_404_NOT_FOUND                                                   
                    )


  