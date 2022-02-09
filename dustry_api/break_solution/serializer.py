from rest_framework import serializers
from dustry.models import BreakSolution

class BreakSolutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = BreakSolution
        fields = ('id' , 'active', 'name', 'reg_date')
