from rest_framework import serializers
from dustry.models import ProductionOrderProduct

class ProductionOrderProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductionOrderProduct
        fields = ( 'order_id', 'product_id')