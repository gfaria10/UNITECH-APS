from rest_framework import viewsets
from rest_framework import permissions
import wikipediaapi

from .serializers import *
from .models import *
from django.db.models import Count

from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import APIException


class UserViewSet(viewsets.ModelViewSet):

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


# class WikipediaView(APIView):
#     def get(self, request, topic):
#         wiki_wiki = Wikipedia(language='pt-br')
#         page = wiki_wiki.page(topic)
#
#         if page.exists():
#             return Response({'content': page.text})
#         else:
#             return Response({'error': 'Página não encontrada'})


class ConsultaRAViewSet(viewsets.ViewSet):

    def list(self, request):
        # Lista todos os itens
        queryset = ConsultasRA.objects.all()
        serializer = ConsultasRASerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        # Retorna um item específico com base no ID
        try:
            obj_ra = ConsultasRA.objects.get(pk=pk)

            wiki_wiki = wikipediaapi.Wikipedia('UniTechRA (admin@admin.com)', 'pt')
            page_wiki = wiki_wiki.page(obj_ra.nome_objeto)
            print("Título: ", page_wiki.title)
            print("Resumo: ", page_wiki.summary)

            # OBTÉM A CONSULTA FEITA NO WIKIPEDIA E SALVA NO OBJ LOCAL
            obj_ra.texto = page_wiki.summary
            obj_ra.save()

            serializer = ConsultasRASerializer(obj_ra)

            response_data = {
                'consultasRA': serializer.data,
            }

            return Response(response_data, status=status.HTTP_200_OK)
        except ConsultasRA.DoesNotExist:
            return Response({'error': 'Item não encontrado'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)