from rest_framework import serializers
from dustry.models import OperatorSector


class OperatorSectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = OperatorSector
        fields = ('operator_id', 'sector_id')
        