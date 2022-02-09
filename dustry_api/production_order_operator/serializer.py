from rest_framework import serializers
from dustry.models import ProductionOrderOperator

class ProductionOrderOperatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductionOrderOperator
        fields = ('order_id', 'operator_id')