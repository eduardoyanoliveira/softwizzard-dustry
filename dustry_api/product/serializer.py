from rest_framework import serializers
from dustry.models import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id', 'active', 'name', 'weight', 'department_id' , 'reg_date') 