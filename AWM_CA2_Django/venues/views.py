from rest_framework import viewsets
from .models import Venue, Review
from .serializers import VenueSerializer, ReviewSerializer
from django.contrib.auth.models import User
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404

# Define a viewset for the Venue model
class VenueViewSet(viewsets.ModelViewSet):
    # Set the queryset to retrieve all Venue objects
    queryset = Venue.objects.all()
    # Use the VenueSerializer for serialization
    serializer_class = VenueSerializer

    # Customize the retrieve method to include related reviews
    def retrieve(self, request, pk=None):
        # Retrieve the Venue object or return a 404 response
        venue = get_object_or_404(self.queryset, pk=pk)
        # Filter reviews related to the venue
        reviews = Review.objects.filter(venue=venue)
        # Serialize venue and reviews data
        venue_serializer = self.serializer_class(venue)
        reviews_serializer = ReviewSerializer(reviews, many=True)
        # Combine venue and reviews data in the response
        data = {
            'venue': venue_serializer.data,
            'reviews': reviews_serializer.data,
        }
        return Response(data)

# Define a viewset for the Review model
class ReviewViewSet(viewsets.ModelViewSet):
    # Set the queryset to retrieve all Review objects
    queryset = Review.objects.all()
    # Use the ReviewSerializer for serialization
    serializer_class = ReviewSerializer
    # Specify permission classes to allow only authenticated users
    permission_classes = [IsAuthenticated]

    # Customize the creation of a new review to associate it with the requesting user
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# Define an API view for user registration
@api_view(['POST'])
def register(request):
    # Extract username and password from the request data
    username = request.data.get('username')
    password = request.data.get('password')

    # Check if username and password are provided
    if not username or not password:
        return Response({"error": "Username and password required"}, status=status.HTTP_400_BAD_REQUEST)

    # Check if the username is already taken
    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already taken"}, status=status.HTTP_400_BAD_REQUEST)

    # Create a new user with the provided username and password
    user = User.objects.create_user(username=username, password=password)
    return Response({"success": "User created successfully"}, status=status.HTTP_201_CREATED)

# Define an API view for user login
@api_view(['POST'])
def login(request):
    # Extract username and password from the request data
    username = request.data.get('username')
    password = request.data.get('password')

    # Authenticate the user based on username and password
    user = authenticate(username=username, password=password)

    # Check if authentication is successful
    if user is not None:
        # Generate or retrieve an authentication token for the user
        token, _ = Token.objects.get_or_create(user=user)
        return Response({"token": token.key})
    else:
        # Return an error response for invalid credentials
        return Response({"error": "Invalid Credentials"}, status=400)

# Define an API view for submitting a new review (authenticated users only)
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def submit_review(request):
    # Include the user ID in the review data
    data = request.data
    data['user'] = request.user.id

    # Serialize the review data and perform validation
    serializer = ReviewSerializer(data=data)
    if serializer.is_valid():
        # Save the review and return a success response
        serializer.save()
        return Response(serializer.data, status=201)
    else:
        # Return an error response for invalid data
        return Response(serializer.errors, status=400)