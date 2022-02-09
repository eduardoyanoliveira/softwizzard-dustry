from rest_framework import serializers
from dustry.models import ProductionOrder

class ProductionOrderSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ProductionOrder
        fields = ('id', 'machine_id', 'leader_id', 'shift', 'start', 'end', 'initial_hour_meter', 'end_hour_meter', 'obs') 