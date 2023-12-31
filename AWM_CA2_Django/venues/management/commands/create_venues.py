"""
Helper mgmt function for inserting sample data
"""

from django.core.management.base import BaseCommand
from django.contrib.gis.geos import Point
from venues.models import Venue


class Command(BaseCommand):
    help = 'Inserts test venue data for testing'

    def create_venue(self, name, address, description, location, openingHours, venueType):
        venue = Venue(
            name=name,
            address=address,
            description=description,
            location=Point(location[0], location[1]),
            openingHours=openingHours,
            venueType=venueType,
        )
        venue.save()
        self.stdout.write(self.style.SUCCESS(f'Successfully created {venue.name}'))

    def handle(self, *args, **kwargs):
        # Create individual venues
        self.create_venue(
            name='The Temple Bar',
            address='47-48 Temple Bar, Dublin, Ireland',
            description='Iconic pub in the heart of Dublin.',
            location=(-6.265074, 53.345308),
            openingHours='Mon-Sun: 11:00 AM - 2:30 AM',
            venueType='Bar',
        )
        self.create_venue(
            name='The Brazen Head',
            address="20 Lower Bridge St, Usher's Quay, Dublin, Ireland",
            description="Ireland's oldest pub, dating back to 1198.",
            location=(-6.2776, 53.3474),
            openingHours='Mon-Sun: 10:30 AM - 11:30 PM',
            venueType='Bar',
        )
        self.create_venue(
            name='Guinness Storehouse',
            address='St James\'s Gate, Ushers, Dublin 8, Ireland',
            description='Visitor center at the Guinness brewery.',
            location=Point(-6.2864, 53.3419),
            openingHours='Mon-Sun: 9:30 AM - 7:00 PM',
            venueType='Bar',
        )
        self.create_venue(
            name='The Porterhouse',
            address='16-18 Parliament St, Temple Bar, Dublin, Ireland',
            description='Brewpub with a variety of craft beers.',
            location=(-6.2669, 53.3457),
            openingHours='Mon-Sun: 12:00 PM - 12:30 AM',
            venueType='Bar',
        )
        self.create_venue(
            name='The Horseshoe Bar',
            address='Shelbourne Rd, Ballsbridge, Dublin, Ireland',
            description='Classic bar at The Shelbourne Hotel.',
            location=(-6.2389, 53.3366),
            openingHours='Mon-Sun: 12:00 PM - 12:30 AM',
            venueType='Bar',
        )
        self.create_venue(
            name='Dublin Castle',
            address='Dame St, Dublin, Ireland',
            description='Historic castle in the heart of Dublin.',
            location=(-6.2676, 53.3439),
            openingHours='Mon-Sun: 9:45 AM - 5:45 PM',
            venueType='Restaurant',
        )
        self.create_venue(
            name='The Sugar Club',
            address='8 Lower Leeson St, Saint Kevin\'s, Dublin, Ireland',
            description='Popular nightclub with live music events.',
            location=(-6.2560, 53.3341),
            openingHours='Thu-Sat: 11:00 PM - 3:00 AM',
            venueType='Nightclub',
        )
        self.create_venue(
            name='The Harbour Bar',
            address='1-4 Dock Terrace, Bray, Co. Wicklow, Ireland',
            description='Traditional Irish bar with live music.',
            location=(-6.1072, 53.2025),
            openingHours='Mon-Sun: 12:00 PM - 11:30 PM',
            venueType='Bar',
        )
        self.create_venue(
            name='The Stag\'s Head',
            address='1 Dame Ct, Dublin, Ireland',
            description='Traditional Irish pub with Victorian interior.',
            location=(-6.2656, 53.3445),
            openingHours='Mon-Sun: 11:00 AM - 11:30 PM',
            venueType='Bar',
        )
        self.create_venue(
            name='The Woollen Mills',
            address='42 Ormond Quay Lower, North City, Dublin, Ireland',
            description='Historic building housing a restaurant and bar.',
            location=(-6.2645, 53.3460),
            openingHours='Mon-Sun: 8:00 AM - 11:30 PM',
            venueType='Restaurant',
        )
        self.create_venue(
            name='The Grand Social',
            address='35 Liffey St Lower, North City, Dublin, Ireland',
            description='Music venue and bar with a rooftop terrace.',
            location=(-6.2698, 53.3474),
            openingHours='Mon-Sun: 12:00 PM - 3:00 AM',
            venueType='Bar',
        )
        self.create_venue(
            name='The Workman\'s Club',
            address='10 Wellington Quay, Temple Bar, Dublin, Ireland',
            description='Live music venue and club.',
            location=(-6.2673, 53.3458),
            openingHours='Mon-Sun: 12:00 PM - 2:30 AM',
            venueType='Nightclub',
        )
        self.create_venue(
            name='The Bernard Shaw',
            address='11-12 Richmond St S, Saint Kevin\'s, Dublin, Ireland',
            description='Hipster hangout with a beer garden.',
            location=(-6.2673, 53.3331),
            openingHours='Mon-Sun: 12:00 PM - 2:30 AM',
            venueType='Bar',
        )
        self.create_venue(
            name='The Liquor Rooms',
            address='6-8 Wellington Quay, Temple Bar, Dublin, Ireland',
            description='Stylish cocktail bar with a retro vibe.',
            location=(-6.2674, 53.3457),
            openingHours='Mon-Sun: 5:00 PM - 2:30 AM',
            venueType='Bar',
        )
        self.create_venue(
            name='The Dice Bar',
            address='79 Queen St, Smithfield, Dublin, Ireland',
            description='Trendy spot with craft beers and live music.',
            location=(-6.2793, 53.3473),
            openingHours='Mon-Sun: 5:00 PM - 2:30 AM',
            venueType='Bar',
        )
        self.create_venue(
            name='The George',
            address='89 South Great George\'s St, Dublin, Ireland',
            description='Iconic LGBTQ+ nightclub.',
            location=(-6.2679, 53.3437),
            openingHours='Mon-Sun: 2:00 PM - 3:00 AM',
            venueType='Nightclub',
        )
        self.create_venue(
            name='The Twisted Pepper',
            address='54 Middle Abbey St, North City, Dublin, Ireland',
            description='Multi-level nightclub and live music venue.',
            location=(-6.2631, 53.3480),
            openingHours='Fri-Sat: 11:00 PM - 3:00 AM',
            venueType='Nightclub',
        )
        self.create_venue(
            name='The Mercantile',
            address='28 Dame St, Dublin, Ireland',
            description='Pub and live music venue in a historic building.',
            location=(-6.2667, 53.3447),
            openingHours='Mon-Sun: 11:00 AM - 2:30 AM',
            venueType='Bar',
        )
        self.create_venue(
            name='The Button Factory',
            address='Curved St, Temple Bar, Dublin, Ireland',
            description='Live music venue in a former factory.',
            location=(-6.2668, 53.3452),
            openingHours='Mon-Sun: 11:00 AM - 2:30 AM',
            venueType='Nightclub',
        )
        self.create_venue(
            name='Opium',
            address='26 Wexford St, Dublin, Ireland',
            description='Asian-themed nightclub and cocktail bar.',
            location=(-6.2632, 53.3344),
            openingHours='Thu-Sat: 5:00 PM - 2:30 AM',
            venueType='Nightclub',
        )
        self.create_venue(
            name='The Vat House',
            address='Temple Bar, Dublin, Ireland',
            description='Traditional Irish pub in Temple Bar.',
            location=(-6.2674, 53.3458),
            openingHours='Mon-Sun: 11:00 AM - 2:30 AM',
            venueType='Bar',
        )
        self.create_venue(
            name='The Liquor Rooms',
            address='6-8 Wellington Quay, Temple Bar, Dublin, Ireland',
            description='Stylish cocktail bar with a retro vibe.',
            location=(-6.2674, 53.3457),
            openingHours='Mon-Sun: 5:00 PM - 2:30 AM',
            venueType='Bar',
        )
