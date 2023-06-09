from django.urls import include, path
from rest_framework import routers
from UNITechApp.views import *
from django.contrib import admin


router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'materias', MateriasViewSet)
router.register(r'pesquisas', PesquisaViewSet, basename='pesquisas')

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
