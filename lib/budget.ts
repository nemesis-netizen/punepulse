import { Place, TransportMode } from '../types/place';
import { BudgetPreferences, UserPreferences } from '../types/preferences';
import { BudgetBreakdown } from '../types/itinerary';

/**
 * Calculates estimated travel cost per person based on distance, group size, and transport mode
 */
export function estimateTransportCostPerPerson(
  totalDistanceKm: number,
  mode: TransportMode,
  groupCount: number
): number {
  if (totalDistanceKm <= 0) return 0;
  
  switch (mode) {
    case 'walking':
      return 0;
    case 'two-wheeler':
      // Two-wheeler fuel cost approx ₹3.5/km. Usually 1-2 people per bike.
      const bikeCount = Math.ceil(groupCount / 2);
      const totalFuel = totalDistanceKm * 3.5 * bikeCount;
      return Math.round(totalFuel / Math.max(1, groupCount));
    case 'car-cab':
      // Cab in Pune (Ola/Uber/Auto): base fare ₹40-60, approx ₹18/km. Shared across group.
      const cabBase = 50;
      const cabFareTotal = cabBase + (totalDistanceKm * 18);
      const cabsNeeded = Math.ceil(groupCount / 4);
      return Math.round((cabFareTotal * cabsNeeded) / Math.max(1, groupCount));
    case 'public-transit':
      // Pune Metro / PMPML Bus: ₹10 - ₹30 per trip per person
      const tripsCount = Math.max(1, Math.ceil(totalDistanceKm / 4));
      return tripsCount * 20;
    case 'flexible':
    default:
      // Balanced average (mix of auto and transit)
      return Math.round((totalDistanceKm * 12) / Math.max(1, Math.min(groupCount, 3)));
  }
}

/**
 * Computes the complete budget breakdown for an itinerary
 */
export function calculateItineraryBudget(
  places: Place[],
  preferences: UserPreferences,
  totalDistanceKm: number = 0
): BudgetBreakdown {
  const groupCount = Math.max(1, preferences.groupCount || 1);
  const budgetPrefs = preferences.budget;

  let foodSpendPerPerson = 0;
  let activitiesSpendPerPerson = 0;

  places.forEach(place => {
    if (place.priceBasis === 'free') {
      return;
    } else if (place.priceBasis === 'entry fee') {
      if (budgetPrefs.includeActivities) {
        activitiesSpendPerPerson += place.averageVisitCost;
      }
    } else {
      // per person food/drink
      if (budgetPrefs.includeFoodAndDrinks) {
        foodSpendPerPerson += place.averageVisitCost;
      }
    }
  });

  const transportPerPerson = budgetPrefs.includeTransport
    ? estimateTransportCostPerPerson(totalDistanceKm, preferences.transportMode, groupCount)
    : 0;

  const subtotal = foodSpendPerPerson + activitiesSpendPerPerson + transportPerPerson;
  const contingencyPercentage = budgetPrefs.contingencyPercentage ?? 10;
  const contingency = Math.round(subtotal * (contingencyPercentage / 100));
  const totalPerPerson = subtotal + contingency;
  const totalGroupSpend = totalPerPerson * groupCount;

  let budgetStatus: 'within-budget' | 'tight' | 'exceeds-budget' = 'within-budget';
  if (budgetPrefs.maxAmountPerPerson > 0) {
    if (totalPerPerson > budgetPrefs.maxAmountPerPerson) {
      budgetStatus = 'exceeds-budget';
    } else if (totalPerPerson > budgetPrefs.maxAmountPerPerson * 0.85) {
      budgetStatus = 'tight';
    }
  }

  return {
    foodAndDrinksPerPerson: Math.round(foodSpendPerPerson),
    transportPerPerson: Math.round(transportPerPerson),
    activitiesPerPerson: Math.round(activitiesSpendPerPerson),
    subtotalPerPerson: Math.round(subtotal),
    contingencyPerPerson: contingency,
    totalPerPerson: Math.round(totalPerPerson),
    totalGroupSpend: Math.round(totalGroupSpend),
    budgetStatus
  };
}
