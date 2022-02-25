from dustry.models import ProductionOrder, ProductionOrderWithdraw
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from django.db.models import Sum

class WithdrawalsPerDay(APIView):

    def get(self, request, format=None):
        params = request.query_params
        orders = []
        operator = 0
        initial_date = ''
        final_date = ''
        
        if 'operator' in params:
            operator = params['operator']
        else:
            return Response('Operador não informado',status=status.HTTP_400_BAD_REQUEST)
        
        if 'initial_date' in params:
            initial_date = params['initial_date']
        else:
           return Response('Data Inicial não informada',status=status.HTTP_400_BAD_REQUEST) 
       
        if 'final_date' in params:
            final_date = params['final_date']
        else:
           return Response('Data Final não informada',status=status.HTTP_400_BAD_REQUEST) 
       
        if operator == '0':
            orders = ProductionOrder.objects.all()
        else:
            orders = ProductionOrder.objects.filter(productionorderoperator__operator_id=operator)

        order_ids = [order.id for order in orders]
        withdrawals = ProductionOrderWithdraw.objects.filter(order_id__in=order_ids)
        query = withdrawals.filter(time__range=[initial_date, final_date])
        query = query.extra(select={'date': 'date( time )'}).values('date').annotate(
            total= Sum('qty')
        )
        
        list = [row for row in query]
        dataset_list = []
        for item in list:
            dataset_list.append(
                {
                    'date': str(item['date']).replace('-', '/') + ' 00:00:00',
                    'total': item['total']
                }
            )

        return Response(dataset_list)
