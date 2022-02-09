from rest_framework import viewsets
from .serializer import ProductionOrderSerializer
from dustry.models import ProductionOrder
from django_filters.rest_framework import DjangoFilterBackend
from django.db import models as django_models
import django_filters 


class POFilter(django_filters.FilterSet):
    start_date = django_filters.DateFilter(field_name="start", lookup_expr="gte", label= 'Data inicial')
    end_date = django_filters.DateFilter(field_name="start", lookup_expr="lte", label= 'Data final')
    operator_id = django_filters.NumberFilter(field_name="productionorderoperator__operator_id", lookup_expr='exact', label='operator')

    class Meta:
        model = ProductionOrder
        fields= ['start_date', 'end_date', 'machine_id', 'operator_id']

    filter_overrides = {
        django_models.DateTimeField: {
            'filter_class': django_filters.IsoDateTimeFilter
        },
    }


class ProductionOrderViewSet(viewsets.ModelViewSet):
    queryset = ProductionOrder.objects.all();
    serializer_class = ProductionOrderSerializer
    filter_class = POFilter
    filter_backends = [DjangoFilterBackend]
  
