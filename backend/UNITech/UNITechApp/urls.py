from . import views
from rest_framework import routers
from django.urls import path, include


router = routers.DefaultRouter()
router.register('usuarios', views.UserList, 'usuarios')

urlpatterns = [
    # path('api/usuarios/', views.UserList.as_view(), name='user-list'),
    path('api/', include(router.urls)),
]
