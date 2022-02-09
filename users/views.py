from rest_framework.response import Response
from rest_framework import viewsets
from .serializers import  UserGenericSerialzier
from users.models import NewUser


class UserViewSet(viewsets.ModelViewSet):
    queryset = NewUser.objects.all()
    serializer_class = UserGenericSerialzier
    
    def list(self, request, *args, **kwargs):      
        data = NewUser.objects.filter(is_superuser=False)
        serializer = UserGenericSerialzier(data, many=True)
        return Response(serializer.data)
   
    def retrieve(self, request, *args, **kwargs):
        params = request.query_params

        if 'email' in params:
            data = NewUser.objects.filter(email=params['email'])
            serializer = UserGenericSerialzier(data, many=True)
            return Response(serializer.data)