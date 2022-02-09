from rest_framework import viewsets
from .serializer  import MachineSerializer
from dustry.models import Machine

class MachineViewSet(viewsets.ModelViewSet):
    queryset = Machine.objects.all()
    serializer_class = MachineSerializer
    