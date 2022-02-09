from dataclasses import fields
from rest_framework import serializers
from dustry.models import ProductComposition

class ProductCompositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductComposition
        fields = ('product_id', 'raw_material_id', 'qty')