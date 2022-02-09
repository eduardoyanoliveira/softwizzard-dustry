from rest_framework import serializers
from dustry.models import Department

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ('id','active', 'name', 'reg_date')