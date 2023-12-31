from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from venues.views import VenueViewSet, ReviewViewSet, register, login, submit_review

# Create a router for registering viewsets
router = DefaultRouter()
router.register(r'venues', VenueViewSet)  # Register the VenueViewSet with the endpoint 'venues'
router.register(r'reviews', ReviewViewSet)  # Register the ReviewViewSet with the endpoint 'reviews'

# Define urlpatterns for routing requests to specific views or viewsets
urlpatterns = [
    path('admin/', admin.site.urls),  # Admin site URL
    path('api/', include(router.urls)),  # Include URLs registered by the router
    path('register/', register, name='register'),  # URL for user registration
    path('login/', login, name='login'),  # URL for user login
    path('api/submit_review/', submit_review, name='submit-review'),  # URL for submitting reviews
]