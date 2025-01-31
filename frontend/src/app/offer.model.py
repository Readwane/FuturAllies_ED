from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Offer(models.Model):
    TYPE_CHOICES = [
        ('Job', 'Job'),
        ('Internship', 'Internship'),
        ('Other', 'Other'),
    ]

    CONTRACT_TYPE_CHOICES = [
        ('CDI', 'CDI'),
        ('CDD', 'CDD'),
    ]

    STATUS_CHOICES = [
        ('Open', 'Open'),
        ('Closed', 'Closed'),
        ('Pending', 'Pending'),
    ]

    APPLICATION_MODE_CHOICES = [
        ('Online', 'Online'),
        ('Physical', 'Physical'),
        ('Both', 'Both'),
    ]

    title = models.CharField(max_length=255, verbose_name="Titre de l'offre")
    enterprise = models.CharField(max_length=255, verbose_name="Entreprise")
    enterpriseLocation = models.CharField(max_length=255, verbose_name="Localisation de l'entreprise")
    enterWebsite = models.URLField(blank=True, null=True, verbose_name="Site web de l'entreprise")
    description = models.TextField(verbose_name="Description de l'offre")
    domain = models.CharField(max_length=255, verbose_name="Domaine de l'offre")
    location = models.CharField(max_length=255, verbose_name="Localisation de l'offre")
    salary = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True, verbose_name="Salaire")
    duration = models.IntegerField(blank=True, null=True, verbose_name="Durée (en mois)")
    type = models.CharField(max_length=20, choices=TYPE_CHOICES, verbose_name="Type d'offre")
    requirements = models.TextField(blank=True, null=True, verbose_name="Exigences")
    responsibilities = models.TextField(blank=True, null=True, verbose_name="Responsabilités")
    educationLevel = models.CharField(max_length=255, blank=True, null=True, verbose_name="Niveau d'éducation requis")
    experienceLevel = models.CharField(max_length=255, blank=True, null=True, verbose_name="Niveau d'expérience requis")
    contractType = models.CharField(max_length=3, choices=CONTRACT_TYPE_CHOICES, default='CDD', verbose_name="Type de contrat")
    benefits = models.TextField(blank=True, null=True, verbose_name="Avantages")
    contactEmail = models.EmailField(verbose_name="Email de contact")
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='Open', verbose_name="Statut de l'offre")
    isRemote = models.BooleanField(default=False, verbose_name="Télétravail")
    applicationMode = models.CharField(max_length=10, choices=APPLICATION_MODE_CHOICES, default='Online', verbose_name="Mode de candidature")
    onlineSubmission = models.BooleanField(default=True, verbose_name="Soumission en ligne")
    isRequiredCvDoc = models.BooleanField(default=True, verbose_name="CV requis")
    isRequiredMlDoc = models.BooleanField(default=False, verbose_name="Lettre de motivation requise")
    canAddOthersDoc = models.BooleanField(default=False, verbose_name="Autres documents autorisés")
    applicationLink = models.URLField(blank=True, null=True, verbose_name="Lien de candidature")
    additionalInfo = models.TextField(blank=True, null=True, verbose_name="Informations supplémentaires")
    createdBy = models.ForeignKey(User, on_delete=models.CASCADE, related_name='offers', verbose_name="Créé par")
    postedDate = models.DateTimeField(auto_now_add=True, verbose_name="Date de publication")
    updatedAt = models.DateTimeField(auto_now=True, verbose_name="Dernière mise à jour")
    expirationDate = models.DateTimeField(blank=True, null=True, verbose_name="Date d'expiration")

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Offre"
        verbose_name_plural = "Offres"