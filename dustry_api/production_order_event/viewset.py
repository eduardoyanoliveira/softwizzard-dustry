from rest_framework import viewsets
from .serializer import ProductionOrderEventSerializer
from dustry.models import ProductionOrderEvent

from rest_framework.response import Response 
from rest_framework import status


class ProductionOrderEventViewSet(viewsets.ModelViewSet):
    queryset = ProductionOrderEvent.objects.all();
    serializer_class = ProductionOrderEventSerializer
    
    def retrieve(self, request, *args, **kwargs):
        data = ProductionOrderEvent.objects.filter(order_id=kwargs['pk'])
        serializer = ProductionOrderEventSerializer(data, many=True)
        return Response(serializer.data)
