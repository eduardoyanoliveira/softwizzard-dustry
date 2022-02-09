from rest_framework import serializers
from dustry.models import BreakReason

class BreakReasonSerializer(serializers.ModelSerializer):
    class Meta:
        model = BreakReason
        fields = ('id' , 'active', 'name', 'reg_date')