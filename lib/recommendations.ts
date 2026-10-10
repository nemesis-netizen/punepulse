import { Place, Neighborhood, Mood, GroupSize, Category } from '../types/place';
import { UserPreferences } from '../types/preferences';
import { Itinerary, ItineraryStop } from '../types/itinerary';
import { PUNE_PLACES } from '../data/places';
import { calculateItineraryBudget } from './budget';
import { getApproxDistanceKm, estimateTravelTimeMinutes, generateTrafficAdvisory } from './traffic';

/**
 * Calculates compatibility score between a place and user preferences
 */
export function scorePlace(
  place: Place,
  preferences: UserPreferences,
  currentNeighborhood: Neighborhood,
  selectedPlaceIds: string[]
): number {
  if (selectedPlaceIds.includes(place.id)) return -999;

  let score = 0;

  // 1. Mood compatibility (Weight: 40)
  const matchingMoods = place.moods.filter(m => preferences.moods.includes(m));
  score += matchingMoods.length * 20;

  // 2. Budget compatibility (Weight: 30)
  const maxPerPerson = preferences.budget.maxAmountPerPerson;
  if (maxPerPerson > 0) {
    if (place.averageVisitCost > maxPerPerson * 0.8) {
      score -= 50; // too expensive for one stop in an outing
    } else if (place.averageVisitCost <= maxPerPerson * 0.4) {
      score += 25; // great budget cushion
    } else {
      score += 10;
    }
  }

  // 3. Proximity to current neighborhood (Weight: 30)
  const distance = getApproxDistanceKm(currentNeighborhood, place.neighborhood);
  if (distance <= 1.5) {
    score += 30;
  } else if (distance <= 5.0) {
    score += 15;
  } else if (distance <= 10.0) {
    score += 5;
  } else {
    score -= 15; // too far
  }

  // 4. Group size match
  if (place.suitableGroupSizes.includes(preferences.groupSize)) {
    score += 15;
  }

  // 5. Indoor / Outdoor preference
  if (preferences.indoorOutdoorPreference !== 'any') {
    if (place.indoorOutdoor === preferences.indoorOutdoorPreference || place.indoorOutdoor === 'both') {
      score += 15;
    } else {
      score -= 20;
    }
  }

  // 6. Crowd preference
  if (preferences.avoidCrowds && place.crowdProfile.noiseLevel === 'quiet') {
    score += 20;
  }

  return score;
}

/**
 * Determines target number of stops based on duration
 */
export function getTargetStopCount(duration: UserPreferences['duration']): number {
  switch (duration) {
    case '1-2-hours':
      return 1;
    case '3-4-hours':
      return 2;
    case 'half-day':
      return 3;
    case 'full-day':
      return 4;
    default:
      return 2;
  }
}

/**
 * Formats time from minute offset (e.g. 14:30 -> "2:30 PM")
 */
function formatClockTime(startMinutes: number): string {
  const hours24 = Math.floor(startMinutes / 60) % 24;
  const mins = startMinutes % 60;
  const period = hours24 >= 12 ? 'PM' : 'AM';
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
  const minsStr = mins < 10 ? `0${mins}` : `${mins}`;
  return `${hours12}:${minsStr} ${period}`;
}

/**
 * Builds a catchy, sophisticated editorial title for the outing
 */
function generateItineraryTitle(preferences: UserPreferences, places: Place[]): { title: string; tagline: string } {
  const primaryMood = preferences.moods[0] || 'Slow morning';
  const area = preferences.startingNeighborhood;

  const titles: Record<string, { title: string; tagline: string }> = {
    'Slow morning': {
      title: `The Unhurried Morning in ${area.split(' ')[0]}`,
      tagline: 'Quiet breakfast, tree-lined strolls, and deep filter coffee.'
    },
    'Coffee and conversations': {
      title: `Conversations Over Chai & Cortados`,
      tagline: 'Intimate seating, gentle ambient hum, and plenty of time to talk.'
    },
    'Date night': {
      title: `A Golden Hour Affair`,
      tagline: 'Pebbled garden courtyards, candlelit corners, and romantic strolls.'
    },
    'Friends and chaos': {
      title: `The Classic Pune Crew Sprint`,
      tagline: 'Generous portions, vibrant streets, and endless laughter.'
    },
    'Nature escape': {
      title: `Ridge Trails & Clean Air`,
      tagline: 'Ascending scenic hilltops and peaceful water sanctuaries.'
    },
    'Food hunt': {
      title: `The Heritage Culinary Circuit`,
      tagline: 'Decades-old recipes, secret masala recipes, and iconic sweet stops.'
    },
    'Art and culture': {
      title: `Basalt, Fortresses & Curated Zines`,
      tagline: 'Immersing in ancient stone heritage and independent art spaces.'
    },
    'Nightlife': {
      title: `Craft Pours & Twilight Beats`,
      tagline: 'Artisanal microbrews, outdoor patios, and music-first venues.'
    },
    'Solo reset': {
      title: `A Mindful Pune Solitude`,
      tagline: 'Barefoot tea lounges, shaded botanical benches, and gentle pacing.'
    },
    'Something spontaneous': {
      title: `A Spontaneous City Discovery`,
      tagline: 'Letting Pune unfold one curious corner at a time.'
    }
  };

  return titles[primaryMood] || {
    title: `A Well-Curated Pune Outing`,
    tagline: 'Curated places, honest budgeting, and effortless pacing.'
  };
}

/**
 * Generates an end-to-end personalized itinerary with strict budget protection
 */
export function generateItinerary(
  preferences: UserPreferences,
  allPlaces: Place[] = PUNE_PLACES
): Itinerary {
  const targetCount = getTargetStopCount(preferences.duration);
  const selectedPlaces: Place[] = [];
  let currentArea = preferences.startingNeighborhood;
  const maxPerPerson = preferences.budget.maxAmountPerPerson;

  // Track used categories to enforce diversity
  const usedCategories: Set<string> = new Set();
  let cumulativeFoodAndActivities = 0;

  for (let i = 0; i < targetCount; i++) {
    const selectedIds = selectedPlaces.map(p => p.id);
    
    // Remaining budget for subsequent stops
    const remainingBudget = Math.max(0, maxPerPerson - cumulativeFoodAndActivities - 40); // reserve 40 for transit & contingency

    // Sort candidate places
    const candidates = [...allPlaces]
      .filter(p => !selectedIds.includes(p.id))
      // Filter out places whose averageVisitCost exceeds the remaining budget (allow free places always)
      .filter(p => p.priceBasis === 'free' || p.averageVisitCost <= remainingBudget || remainingBudget <= 0 && p.priceBasis === 'free')
      .map(p => {
        let s = scorePlace(p, preferences, currentArea, selectedIds);
        // Penalize repeating the exact same category
        if (usedCategories.has(p.category)) {
          s -= 40;
        }
        return { place: p, score: s };
      })
      .sort((a, b) => b.score - a.score);

    if (candidates.length > 0 && candidates[0].score > -100) {
      const chosen = candidates[0].place;
      selectedPlaces.push(chosen);
      cumulativeFoodAndActivities += chosen.averageVisitCost;
      usedCategories.add(chosen.category);
      currentArea = chosen.neighborhood;
    } else {
      // If no candidate fits remaining budget, try picking a free or ultra-low cost spot in the area
      const freeAlternative = allPlaces
        .filter(p => !selectedIds.includes(p.id) && (p.priceBasis === 'free' || p.averageVisitCost <= 50))
        .sort((a, b) => getApproxDistanceKm(currentArea, a.neighborhood) - getApproxDistanceKm(currentArea, b.neighborhood))[0];

      if (freeAlternative) {
        selectedPlaces.push(freeAlternative);
        cumulativeFoodAndActivities += freeAlternative.averageVisitCost;
        usedCategories.add(freeAlternative.category);
        currentArea = freeAlternative.neighborhood;
      }
    }
  }

  // Fallback if empty
  if (selectedPlaces.length === 0) {
    const fallback = allPlaces.filter(p => p.neighborhood === preferences.startingNeighborhood).slice(0, 1);
    if (fallback.length > 0) selectedPlaces.push(fallback[0]);
    else selectedPlaces.push(allPlaces[0]);
  }

  // Calculate cumulative travel distance
  let totalDistanceKm = 0;
  for (let i = 0; i < selectedPlaces.length - 1; i++) {
    totalDistanceKm += getApproxDistanceKm(selectedPlaces[i].neighborhood, selectedPlaces[i + 1].neighborhood);
  }

  // Calculate Budget
  const budget = calculateItineraryBudget(selectedPlaces, preferences, totalDistanceKm);

  // Build Time Schedule
  let currentMinutes = 14 * 60 + 30; // default 2:30 PM
  if (preferences.moods.includes('Slow morning')) {
    currentMinutes = 8 * 60; // 8:00 AM
  } else if (preferences.moods.includes('Nature escape')) {
    currentMinutes = 6 * 60 + 30; // 6:30 AM
  } else if (preferences.moods.includes('Nightlife') || preferences.moods.includes('Date night')) {
    currentMinutes = 18 * 60; // 6:00 PM
  }

  let totalDurationMinutes = 0;
  const stops: ItineraryStop[] = [];

  for (let i = 0; i < selectedPlaces.length; i++) {
    const place = selectedPlaces[i];
    const arrivalTime = formatClockTime(currentMinutes);
    const duration = place.estimatedVisitDurationMinutes;
    currentMinutes += duration;
    totalDurationMinutes += duration;
    const departureTime = formatClockTime(currentMinutes);

    // Find available alternatives for replacing this stop (within budget)
    const alternatives = allPlaces
      .filter(p => p.id !== place.id && !selectedPlaces.some(sp => sp.id === p.id))
      .filter(p => p.averageVisitCost <= place.averageVisitCost * 1.3)
      .slice(0, 3);

    let travelToNext = undefined;
    if (i < selectedPlaces.length - 1) {
      const nextPlace = selectedPlaces[i + 1];
      const dist = getApproxDistanceKm(place.neighborhood, nextPlace.neighborhood);
      const travelEstimate = estimateTravelTimeMinutes(dist, preferences.transportMode);
      
      currentMinutes += travelEstimate.minutes + travelEstimate.bufferMinutes;
      totalDurationMinutes += travelEstimate.minutes + travelEstimate.bufferMinutes;

      travelToNext = {
        distanceKm: dist,
        estimatedMinutes: travelEstimate.minutes,
        recommendedMode: preferences.transportMode,
        typicalTrafficNote: dist > 3 ? 'Cross-neighborhood transfer: leave buffer for signals.' : 'Short hop, minimal delays.',
        bufferMinutes: travelEstimate.bufferMinutes
      };
    }

    stops.push({
      order: i + 1,
      place,
      suggestedArrivalTime: arrivalTime,
      suggestedDepartureTime: departureTime,
      durationMinutes: duration,
      estimatedCostPerPerson: place.averageVisitCost,
      activityNote: place.bestFor[0] || 'Explore and enjoy the local atmosphere',
      travelToNextStop: travelToNext,
      availableAlternatives: alternatives
    });
  }

  const { title, tagline } = generateItineraryTitle(preferences, selectedPlaces);
  const trafficGuidance = generateTrafficAdvisory(preferences.startingNeighborhood);

  return {
    id: `pune-outing-${Date.now()}`,
    title,
    tagline,
    curatorNote: `Crafted for a ${preferences.groupSize.replace('-', ' ')} outing on a budget of ₹${preferences.budget.maxAmountPerPerson}/person, prioritizing ${preferences.moods.join(' & ')}.`,
    createdAt: new Date().toISOString(),
    preferences,
    startingNeighborhood: preferences.startingNeighborhood,
    stops,
    totalDurationMinutes,
    budget,
    trafficGuidance
  };
}

/**
 * Replaces a specific stop with a selected alternative and recalculates
 */
export function replaceStopInItinerary(
  itinerary: Itinerary,
  stopIndex: number,
  newPlace: Place,
  allPlaces: Place[] = PUNE_PLACES
): Itinerary {
  const updatedPlaces = itinerary.stops.map((stop, idx) => idx === stopIndex ? newPlace : stop.place);
  const newPreferences = { ...itinerary.preferences };
  
  let totalDistanceKm = 0;
  for (let i = 0; i < updatedPlaces.length - 1; i++) {
    totalDistanceKm += getApproxDistanceKm(updatedPlaces[i].neighborhood, updatedPlaces[i + 1].neighborhood);
  }

  const newBudget = calculateItineraryBudget(updatedPlaces, newPreferences, totalDistanceKm);

  const updatedStops: ItineraryStop[] = itinerary.stops.map((oldStop, idx) => {
    if (idx === stopIndex) {
      const alternatives = allPlaces
        .filter(p => p.id !== newPlace.id && !updatedPlaces.some(up => up.id === p.id))
        .filter(p => p.averageVisitCost <= newPlace.averageVisitCost * 1.3)
        .slice(0, 3);

      return {
        ...oldStop,
        place: newPlace,
        estimatedCostPerPerson: newPlace.averageVisitCost,
        activityNote: newPlace.bestFor[0] || 'Explore and enjoy',
        availableAlternatives: alternatives
      };
    }
    return oldStop;
  });

  return {
    ...itinerary,
    stops: updatedStops,
    budget: newBudget
  };
}

/**
 * Removes a stop and recalculates
 */
export function removeStopFromItinerary(
  itinerary: Itinerary,
  stopIndex: number
): Itinerary {
  const updatedStops = itinerary.stops.filter((_, idx) => idx !== stopIndex);
  const updatedPlaces = updatedStops.map(s => s.place);

  let totalDistanceKm = 0;
  for (let i = 0; i < updatedPlaces.length - 1; i++) {
    totalDistanceKm += getApproxDistanceKm(updatedPlaces[i].neighborhood, updatedPlaces[i + 1].neighborhood);
  }

  const newBudget = calculateItineraryBudget(updatedPlaces, itinerary.preferences, totalDistanceKm);

  const reorderedStops = updatedStops.map((stop, idx) => ({
    ...stop,
    order: idx + 1
  }));

  return {
    ...itinerary,
    stops: reorderedStops,
    budget: newBudget
  };
}
