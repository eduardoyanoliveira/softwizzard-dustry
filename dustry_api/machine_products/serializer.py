from rest_framework import serializers
from dustry.models import MachineProducts

class MachineProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model = MachineProducts
        fields = ('machine_id', 'product_id')
        