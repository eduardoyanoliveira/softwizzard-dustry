from rest_framework import serializers
from dustry.models import  Operator


class OperatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Operator
        fields = ('id','active', 'name', 'salary', 'reg_date')
           