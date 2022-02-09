from .views import UserViewSet
from rest_framework.routers import DefaultRouter

app_name = 'users'

router = DefaultRouter()

router.register('custom_user', UserViewSet, basename='users')

urlpatterns = router.urls
