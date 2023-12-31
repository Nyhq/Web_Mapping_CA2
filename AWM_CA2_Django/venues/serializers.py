from rest_framework import serializers
from .models import Venue, Review


class VenueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Venue
        fields = ['id', 'name', 'location', 'address', 'description', 'openingHours', 'venueType']


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'venue', 'user', 'rating', 'comment']
