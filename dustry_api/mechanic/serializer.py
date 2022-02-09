from dataclasses import fields
from rest_framework import serializers
from dustry.models import Mechanic

class MechanicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mechanic
        fields = ('id', 'active', 'name',  'value_per_hour', 'outsourced', 'reg_date')