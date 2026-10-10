import { Place, Neighborhood, TransportMode } from './place';
import { UserPreferences } from './preferences';

export interface ItineraryStop {
  order: number;
  place: Place;
  suggestedArrivalTime: string;
  suggestedDepartureTime: string;
  durationMinutes: number;
  estimatedCostPerPerson: number;
  activityNote: string;
  travelToNextStop?: {
    distanceKm: number;
    estimatedMinutes: number;
    recommendedMode: TransportMode;
    typicalTrafficNote: string;
    bufferMinutes: number;
  };
  availableAlternatives: Place[];
}

export interface BudgetBreakdown {
  foodAndDrinksPerPerson: number;
  transportPerPerson: number;
  activitiesPerPerson: number;
  subtotalPerPerson: number;
  contingencyPerPerson: number;
  totalPerPerson: number;
  totalGroupSpend: number;
  budgetStatus: 'within-budget' | 'tight' | 'exceeds-budget';
}

export interface Itinerary {
  id: string;
  title: string;
  tagline: string;
  curatorNote: string;
  createdAt: string;
  preferences: UserPreferences;
  startingNeighborhood: Neighborhood;
  stops: ItineraryStop[];
  totalDurationMinutes: number;
  budget: BudgetBreakdown;
  trafficGuidance: {
  peakWarning?: string;
  peakHourWarning?: string;
  bestDepartureWindow: string;
  disclaimer: string;
  };
}
