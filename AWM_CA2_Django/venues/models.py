from django.contrib.gis.db import models
from django.contrib.auth.models import User


# Define the Venue model for storing information about venues
class Venue(models.Model):
    # Fields for Venue model
    name = models.CharField(max_length=100)  # Venue name
    location = models.PointField()  # Geographic point location
    address = models.CharField(max_length=255)  # Venue address
    description = models.TextField(blank=True)  # Optional venue description
    openingHours = models.CharField(max_length=100)  # Opening hours information
    venueType = models.CharField(max_length=100)  # Type or category of the venue

    # String representation of the Venue object
    def __str__(self):
        return self.name


# Define the Review model for storing user reviews related to venues
class Review(models.Model):
    # Fields for Review model
    venue = models.ForeignKey(Venue, on_delete=models.CASCADE, related_name='reviews')  # Foreign key to Venue model
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Foreign key to User model
    rating = models.IntegerField()  # Numeric rating provided by the user
    comment = models.TextField()  # User's comments about the venue

    # String representation of the Review object
    def __str__(self):
        return f"{self.user.username} - {self.venue.name}"
