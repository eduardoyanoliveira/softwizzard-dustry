from rest_framework import viewsets
from .serializer import LeaderSerializer
from dustry.models import Leader

class LeaderViewSet(viewsets.ModelViewSet):
    queryset = Leader.objects.all()
    serializer_class = LeaderSerializer
  