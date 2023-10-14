from django.urls import include, path, re_path
from rest_framework import routers
from UNITechApp.views import *
from django.contrib import admin


router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'materias', MateriasViewSet)
router.register(r'pesquisas', PesquisaViewSet, basename='pesquisas')
router.register(r'consultasRA', ConsultaRAViewSet, basename='consultasRA')

# Rota personalizada para a busca na Wikipedia
# router.register(r'wikipedia', WikipediaView, basename='wikipedia-search')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),

    re_path(r'^consultasRA/(?P<pk>\d+)/?$', ConsultaRAViewSet.as_view({'get': 'retrieve'})),
]
