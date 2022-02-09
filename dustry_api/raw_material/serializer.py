from rest_framework import serializers
from dustry.models import RawMaterial


class RawMaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = RawMaterial
        fields = ('id', 'active', 'name', 'cost', 'reg_date')