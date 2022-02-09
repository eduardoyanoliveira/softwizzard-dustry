from rest_framework import viewsets
from .serializer import ProductSerializer
from dustry.models import Product

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer