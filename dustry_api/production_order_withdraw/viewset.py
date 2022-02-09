from rest_framework import viewsets
from dustry.models import ProductionOrderWithdraw ,ProductionOrder, Product
from .serializer import ProductionOrderWithdrawSerializer
from django_filters.rest_framework import DjangoFilterBackend
import django_filters 
from django.db import models as django_models

from rest_framework.response import Response 
from rest_framework import status


class POWithdrawFilter(django_filters.FilterSet):
    start_date = django_filters.DateFilter(field_name="time", lookup_expr="gte", label= 'Data inicial')
    end_date = django_filters.DateFilter(field_name="time", lookup_expr="lte", label= 'Data final')
    order_id = django_filters.NumberFilter(field_name="order_id", lookup_expr='exact', label='order')
    product_id = django_filters.NumberFilter(field_name="product_id", lookup_expr='exact', label='product')

    class Meta:
        model = ProductionOrderWithdraw
        fields= ['start_date', 'end_date', 'product_id', 'order_id']

    filter_overrides = {
        django_models.DateTimeField: {
            'filter_class': django_filters.IsoDateTimeFilter
        },
    }


class ProductionOrderWithdrawViewSet(viewsets.ModelViewSet):
    queryset = ProductionOrderWithdraw.objects.all() 
    serializer_class = ProductionOrderWithdrawSerializer
    filter_class= POWithdrawFilter
    filter_backends = [DjangoFilterBackend]
    
    def retrieve(self, request, *args, **kwargs):
        data = ProductionOrderWithdraw.objects.filter(order_id=kwargs['pk'])
        serializer = ProductionOrderWithdrawSerializer(data, many=True)
        return Response(serializer.data)
    
    def create(self, request, *args, **kwargs):
        params = request.query_params
        
        if 'order' in params and 'product' in params and 'qty' in params:
            this_product = Product.objects.get(id=params['product'])
            this_order = ProductionOrder.objects.get(id=params['order'])
            this_qty = params['qty']
            
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
            
            production_order_withdraw =  ProductionOrderWithdraw.objects.create(
                order_id=this_order, 
                product_id=this_product,
                qty= this_qty
            )
            production_order_withdraw.save()
            
            serializer = ProductionOrderWithdrawSerializer(production_order_withdraw, many=False)
            return Response(serializer.data)
        else:
            return Response(
                {'msg': 'A requisição não possui todos parametros necessários.'},
                status=status.HTTP_400_BAD_REQUEST
            )

    def destroy(self, request, *args, **kwargs):
        params = request.query_params
        
        try:
            production_order_withdraw = ProductionOrderWithdraw.objects.filter(order_id=kwargs['pk'])
        except ProductionOrderWithdraw.DoesNotExist:
            production_order_withdraw = None
        
        if production_order_withdraw == None:
            return Response({'message': 'Ordem de Produção não está vinculado a nenhum registro'})
            
        
        # If the user sends a parameter called "all" with the value true, it deletes every record with the order passed on pk
        if 'all' in params:
            if params['all']:
                production_order_withdraw = ProductionOrderWithdraw.objects.filter(order_id=kwargs['pk'])
                if production_order_withdraw:
                    production_order_withdraw.delete()
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
                production_order_withdraw = ProductionOrderWithdraw.objects.filter(product_id=params['product'])
                if production_order_withdraw:  
                    production_order_withdraw.delete()
                    return Response(status=status.HTTP_200_OK)
                else:
                    return Response(
                        {
                            'msg':'A Ordem de Produção não possui vinculo com este produto'
                        },
                        status=status.HTTP_404_NOT_FOUND                                                   
                    )


  