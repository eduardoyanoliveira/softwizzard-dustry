from rest_framework import viewsets
from dustry.models import ProductionOrderOperator ,ProductionOrder, Operator
from .serializer import ProductionOrderOperatorSerializer

from rest_framework.response import Response 
from rest_framework import status


class ProductionOrderOperatorViewSet(viewsets.ModelViewSet):
    queryset = ProductionOrderOperator.objects.all() 
    serializer_class = ProductionOrderOperatorSerializer
    
    def retrieve(self, request, *args, **kwargs):
        params = request.query_params
        
        if 'operator' in params:
            data = ProductionOrderOperator.objects.filter(operator_id=params['operator'])
            serializer = ProductionOrderOperatorSerializer(data, many=True)
            return Response(serializer.data)
                            
        data = ProductionOrderOperator.objects.filter(order_id=kwargs['pk'])
        serializer = ProductionOrderOperatorSerializer(data, many=True)
        return Response(serializer.data)
    
    def create(self, request, *args, **kwargs):
        params = request.query_params
        
        if 'order' in params and 'operator' in params:
            this_operator = Operator.objects.get(id=params['operator'])
            this_order = ProductionOrder.objects.get(id=params['order'])
            
            if(not this_operator):
                return Response(
                    {'msg': 'Código de operador não encontrado no banco de dados.'},
                    status=status.HTTP_404_NOT_FOUND
                )
            
            if(not this_order):
                return Response(
                    {'msg': 'Código de Order de Produção não encontrado no banco de dados.'},
                    status=status.HTTP_404_NOT_FOUND
                )
            
            # Checks if the database has aldeary a register of the current data
            try:
               production_order_operator = ProductionOrderOperator.objects.get(order_id=this_order, operator_id=this_operator)
            except ProductionOrderOperator.DoesNotExist:
                production_order_operator = None
                
            if(production_order_operator != None):
                return Response(
                {'msg': 'Já existe um registro para estes dados.'},
                status=status.HTTP_409_CONFLICT
            )
 
            production_order_operator =  ProductionOrderOperator.objects.create(order_id=this_order, operator_id=this_operator)
            production_order_operator.save()
            
            serializer = ProductionOrderOperatorSerializer(production_order_operator, many=False)
            return Response(serializer.data)
        else:
            return Response(
                {'msg': 'A requisição não possui todos parametros necessários.'},
                status=status.HTTP_400_BAD_REQUEST
            )

    def destroy(self, request, *args, **kwargs):
        params = request.query_params
        
        try:
            production_order_operator = ProductionOrderOperator.objects.filter(order_id=kwargs['pk'])
        except ProductionOrderOperator.DoesNotExist:
            production_order_operator = None
        
        if production_order_operator == None:
            return Response({'message': 'Ordem de Produção não está vinculado a nenhum registro'})
            
        
        # If the user sends a parameter called "all" with the value true, it deletes every record with the order passed on pk
        if 'all' in params:
            if params['all']:
                production_order_operator = ProductionOrderOperator.objects.filter(order_id=kwargs['pk'])
                if production_order_operator:
                    production_order_operator.delete()
                    return Response(status=status.HTTP_200_OK)
                else:
                    return Response(
                        {
                            'msg':'Nenhum registro está vinculado a esta Ordem de Produção'
                        },
                        status=status.HTTP_404_NOT_FOUND                                                   
                    )
        
        if 'operator' in params:
            if params['operator']:
                production_order_operator = ProductionOrderOperator.objects.filter(operator_id=params['operator'])
                if production_order_operator:  
                    production_order_operator.delete()
                    return Response(status=status.HTTP_200_OK)
                else:
                    return Response(
                        {
                            'msg':'A Ordem de Produção não possui vinculo com este operador'
                        },
                        status=status.HTTP_404_NOT_FOUND                                                   
                    )


  