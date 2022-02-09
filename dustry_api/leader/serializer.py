from rest_framework import serializers
from dustry.models import Leader

class LeaderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Leader
        fields = ('id','active', 'name', 'reg_date')
        