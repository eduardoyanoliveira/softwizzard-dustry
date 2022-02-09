from rest_framework import serializers
from dustry.models import Machine

class MachineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Machine
        fields = ('id','active', 'name', 'reg_date', 'kw_per_hour', 'length')