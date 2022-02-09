from itertools import product
from rest_framework import viewsets
from .serializer import MachineProductsSerializer
from dustry.models import MachineProducts, Machine, Product

from rest_framework.response import Response 
from rest_framework import status


class MachineProductsViewSet(viewsets.ModelViewSet):
    queryset = MachineProducts.objects.all()
    serializer_class = MachineProductsSerializer
    
    def retrieve(self, request, *args, **kwargs):
        data = MachineProducts.objects.filter(machine_id=kwargs['pk'])
        serializer = MachineProductsSerializer(data, many=True)
        return Response(serializer.data)
    
    def create(self, request, *args, **kwargs):
        params = request.query_params
        
        if 'machine' in params and 'product' in params:
            this_machine = Machine.objects.get(id=params['machine'])
            this_product = Product.objects.get(id=params['product'])

            if(not this_machine):
                return Response(
                    {'msg': 'Código de máquina não encontrado no banco de dados.'},
                    status=status.HTTP_404_NOT_FOUND
                )
                
            if(not this_product):
                return Response(
                    {'msg': 'Código de produto não encontrado no banco de dados.'},
                    status=status.HTTP_404_NOT_FOUND
                )
            
          
            
            # Checks if the database has aldeary a register of the current data
            try:
               machine_product = MachineProducts.objects.get(product_id=this_product, machine_id=this_machine)
            except MachineProducts.DoesNotExist:
                machine_product = None
                
            if(machine_product != None):
                return Response(
                {'msg': 'Já existe um registro para estes dados.'},
                status=status.HTTP_409_CONFLICT
            )
 
            machine_product = MachineProducts.objects.create(machine_id=this_machine, product_id=this_product)
            machine_product.save()
            
            serializer = MachineProductsSerializer(machine_product, many=False)
            return Response(serializer.data)
        else:
            return Response(
                {'msg': 'A requisição não possui todos parametros necessários.'},
                status=status.HTTP_400_BAD_REQUEST
            )
            
    def destroy(self, request, *args, **kwargs):
        params = request.query_params
        
        try:
            machine_product = MachineProducts.objects.filter(machine_id=kwargs['pk'])
        except MachineProducts.DoesNotExist:
            machine_product = None
        
        if machine_product == None:
            return Response({'message': 'Máquina não está vinculado a nenhum registro'})
            
        
        # If the user sends a parameter called "all" with the value true, it deletes every record with the machine passed on pk
        if 'all' in params:
            if params['all']:
                machine_product = MachineProducts.objects.filter(machine_id=kwargs['pk'])
                if machine_product:
                    machine_product.delete()
                    return Response(status=status.HTTP_200_OK)
                else:
                    return Response(
                        {
                            'msg':'Nenhum registro está vinculado a esta máquina'
                        },
                        status=status.HTTP_404_NOT_FOUND                                                   
                    )
        
        if 'product' in params:
            if params['product']:
                machine_product = MachineProducts.objects.filter(product_id=params['product'])
                if machine_product:  
                    machine_product.delete()
                    return Response(status=status.HTTP_200_OK)
                else:
                    return Response(
                        {
                            'msg':'A máquina não possui vinculo com este produto'
                        },
                        status=status.HTTP_404_NOT_FOUND                                                   
                    )