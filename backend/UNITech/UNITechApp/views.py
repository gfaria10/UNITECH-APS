from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from .serializers import *
from .models import *
from django.db.models import Count

from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.views.decorators.vary import vary_on_cookie, vary_on_headers
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import APIException


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class MateriasViewSet(viewsets.ModelViewSet):
    queryset = Materia.objects.all()
    serializer_class = MateriaSerializer

    @method_decorator(cache_page(60*60*24))  # Cache válido por 24 horas
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)


class PesquisaViewSet(viewsets.ViewSet):

    # AJUSTES NO CACHE, QUANDO FOR O MESMO USUARIO PODE USAR O CACHE, MAS QUANDO FOR DIFERENTE NAO USAR O CACHE
    def list(self, request):
        try:
            user = request.user
            pesquisas = Pesquisa.objects.filter(usuario=user).order_by('-data_pesquisa')

            # Matérias mais acessadas pelo usuario
            materias_acessadas = pesquisas.values('materia').annotate(total=Count('materia')).order_by('-total')

            serializer = PesquisaSerializer(pesquisas, many=True)

            response_data = {
                'pesquisas': serializer.data,
                'materia_mais_acessada': materias_acessadas
            }

            # Posteriormente pra montar a timeline com as matérias mais acessadas irá buscar:
            # Materia.objects.filter(id=1) com o id retornado da mais acessada.

            return Response(response_data, status=status.HTTP_200_OK)
        except Exception as e:
            raise APIException(str(e))
