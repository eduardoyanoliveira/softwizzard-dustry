from rest_framework import serializers
from dustry.models import ProductionOrderWithdraw

class ProductionOrderWithdrawSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductionOrderWithdraw
        fields = ('order_id', 'product_id', 'qty', 'time')