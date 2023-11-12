import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  public readonly eventCategories: string[] = [
    'Art',
    'Food',
    'Music',
    'Sports',
    'Science',
    'Fashion',
    'Business',
    'Literature',
    'Networking',
    'Technology',
    'Campus Event',
    'Health and Wellness',
    'Professional Development',
  ]

  public readonly eventLocations: string[] = [
    'Convention Center',
    'Art Studio',
    'City Park',
    'Outdoor Amphitheater',
    'Community Hall',
    'Beach Resort',
    'Historical Museum',
    'Botanical Garden',
    'Sports Arena',
    'Rooftop Lounge',
    'Tech Hub',
    'Downtown Square',
    'Culinary School',
    'University Auditorium',
    'Co-working Space',
    'Public Library',
    'Golf Course',
    'Warehouse Loft',
    'Luxury Hotel',
    'Fitness Center'
  ]

  public readonly eventYears: number[] = [
    2014, 2015, 2016, 2017, 2018, 2018, 2019, 2020, 2021, 2022, 2023
  ]

}
