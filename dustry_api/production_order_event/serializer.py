from rest_framework import serializers
from dustry.models import ProductionOrderEvent

class ProductionOrderEventSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ProductionOrderEvent
        fields = (  'id','order_id', 'break_reason_id', 'mechanic_id', 'start', 'end', 'break_solution_id') 