export type Neighborhood = 
  | 'FC Road & Deccan'
  | 'JM Road'
  | 'Koregaon Park'
  | 'Viman Nagar'
  | 'Kalyani Nagar'
  | 'Baner & Balewadi'
  | 'Aundh'
  | 'Kothrud'
  | 'Camp'
  | 'Hinjawadi'
  | 'Pashan & Hills';

export type Category = 
  | 'Cafés & Bakeries'
  | 'Iconic Eateries'
  | 'Bars & Nightlife'
  | 'Nature & Hills'
  | 'Heritage & Culture'
  | 'Quiet & Books'
  | 'Street Food'
  | 'Recreation & Leisure'
  | 'Shopping & Leisure'
  | string;

export type Mood = 
  | 'Slow morning'
  | 'Coffee and conversations'
  | 'Date night'
  | 'Friends and chaos'
  | 'Nature escape'
  | 'Food hunt'
  | 'Art and culture'
  | 'Nightlife'
  | 'Solo reset'
  | 'Something spontaneous'
  | string;

export type TransportMode = 'walking' | 'two-wheeler' | 'car-cab' | 'public-transit' | 'flexible' | string;

export type GroupSize = 'solo' | 'couple' | 'friends-2-3' | 'group-4-6' | 'large-group' | string;

export type TimeWindow = 'early-morning' | 'morning' | 'afternoon' | 'sunset-evening' | 'late-night' | string;

export interface Place {
  id: string;
  slug: string;
  name: string;
  category: Category;
  subcategory: string;
  neighborhood: Neighborhood;
  address: string;
  latitude: number;
  longitude: number;
  shortDescription: string;
  fullDescription: string;
  whyVisit: string;
  imageUrl: string;
  priceMin: number;
  priceMax: number;
  priceBasis: 'per person' | 'entry fee' | 'free' | string;
  averageVisitCost: number;
  bestFor: string[];
  moods: Mood[];
  suitableGroupSizes: GroupSize[];
  indoorOutdoor: 'indoor' | 'outdoor' | 'both' | string;
  estimatedVisitDurationMinutes: number;
  recommendedVisitWindows: TimeWindow[];
  bestTimeNote: string;
  openingHours: string;
  isVerified: boolean;
  lastVerifiedAt: string;
  dataConfidence: string;
  transportAccessibility: {
    walkingFriendly: boolean;
    twoWheelerParking: 'easy' | 'moderate' | 'difficult' | string;
    carParking: 'easy' | 'moderate' | 'valet-only' | 'difficult' | string;
    nearestMetroOrBus: string;
  };
  amenities: string[];
  crowdProfile: {
    peakHours?: string;
    vibe: string;
    noiseLevel: 'quiet' | 'moderate' | 'lively' | 'loud' | string;
  };
  tags: string[];
  officialWebsite?: string;
  bookingUrl?: string;
  mapQuery: string;
  isTrending?: boolean;
  isHiddenGem?: boolean;
}
