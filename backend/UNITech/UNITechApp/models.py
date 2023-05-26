from django.db import models
from django.contrib.auth.models import User


class Materia(models.Model):
    nome = models.CharField('Nome da Matéria', max_length=100)

    class Meta:
        verbose_name = 'Matéria'
        verbose_name_plural = 'Matérias'

    def __str__(self):
        return self.nome


class Pesquisa(models.Model):
    
    class Meta:
        verbose_name = 'Pesquisa'
        verbose_name_plural = 'Pesquisas'

    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    materia = models.ForeignKey(Materia, on_delete=models.CASCADE)
    data_pesquisa = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Pesquisa de {self.usuario} em {self.materia}'
