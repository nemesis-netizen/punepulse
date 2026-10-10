import { Mood, Neighborhood, TransportMode, GroupSize } from './place';

export type BudgetTier = 'under-200' | '200-500' | '500-1000' | '1000-2000' | '2000-plus' | 'custom';

export type DurationOption = '1-2-hours' | '3-4-hours' | 'half-day' | 'full-day';

export interface BudgetPreferences {
  tier: BudgetTier;
  maxAmountPerPerson: number;
  includeFoodAndDrinks: boolean;
  includeTransport: boolean;
  includeActivities: boolean;
  contingencyPercentage: number; // default 10%
}

export interface UserPreferences {
  moods: Mood[];
  budget: BudgetPreferences;
  duration: DurationOption;
  startingNeighborhood: Neighborhood;
  groupSize: GroupSize;
  groupCount: number;
  transportMode: TransportMode;
  indoorOutdoorPreference: 'any' | 'indoor' | 'outdoor';
  atmospherePreference: 'any' | 'quiet' | 'lively';
  avoidCrowds: boolean;
  maxTravelDistanceKm?: number;
}
