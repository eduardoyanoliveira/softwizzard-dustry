from rest_framework import serializers
from dustry.models import Sector

class SectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sector
        fields = ('id','active', 'name', 'reg_date')
