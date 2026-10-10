import { Neighborhood, TransportMode, Place } from '../types/place';
import { PUNE_TRAFFIC_PATTERNS } from '../data/traffic-guidance';

// Approximate driving distances between Pune hubs in kilometers
const NEIGHBORHOOD_DISTANCES: Record<string, number> = {
  'FC Road & Deccan_FC Road & Deccan': 0.8,
  'FC Road & Deccan_JM Road': 1.2,
  'FC Road & Deccan_Pashan & Hills': 4.5,
  'FC Road & Deccan_Kothrud': 3.2,
  'FC Road & Deccan_Camp': 5.8,
  'FC Road & Deccan_Koregaon Park': 7.2,
  'FC Road & Deccan_Kalyani Nagar': 8.5,
  'FC Road & Deccan_Baner & Balewadi': 8.0,
  'FC Road & Deccan_Viman Nagar': 10.5,
  'FC Road & Deccan_Aundh': 5.5,
  'FC Road & Deccan_Hinjawadi': 16.0,

  'JM Road_JM Road': 0.6,
  'JM Road_Kothrud': 4.2,
  'JM Road_Camp': 4.5,
  'JM Road_Koregaon Park': 6.2,
  'JM Road_Pashan & Hills': 5.2,

  'Koregaon Park_Kalyani Nagar': 2.0,
  'Koregaon Park_Viman Nagar': 4.5,
  'Koregaon Park_Camp': 3.8,

  'Baner & Balewadi_Pashan & Hills': 3.5,
  'Baner & Balewadi_Aundh': 4.0,
  'Baner & Balewadi_Hinjawadi': 8.5,
};

export function getApproxDistanceKm(from: Neighborhood, to: Neighborhood): number {
  if (from === to) return 1.0;
  const key1 = `${from}_${to}`;
  const key2 = `${to}_${from}`;
  return NEIGHBORHOOD_DISTANCES[key1] ?? NEIGHBORHOOD_DISTANCES[key2] ?? 6.0;
}

export function estimateTravelTimeMinutes(
  distanceKm: number,
  mode: TransportMode,
  isPeakHour: boolean = false
): { minutes: number; bufferMinutes: number } {
  let baseMinutes = 0;
  let bufferMinutes = 5;

  switch (mode) {
    case 'walking':
      // 5 km/h -> 12 mins per km
      baseMinutes = Math.round(distanceKm * 12);
      bufferMinutes = 3;
      break;
    case 'two-wheeler':
      // 25-30 km/h in city -> 2.2 mins per km
      baseMinutes = Math.round(distanceKm * 2.4);
      bufferMinutes = isPeakHour ? 6 : 4;
      break;
    case 'car-cab':
      // 18 km/h in city -> 3.3 mins per km
      baseMinutes = Math.round(distanceKm * 3.3);
      bufferMinutes = isPeakHour ? 15 : 8;
      break;
    case 'public-transit':
      // Bus/Metro + boarding wait
      baseMinutes = Math.round(distanceKm * 3.0) + 10;
      bufferMinutes = 8;
      break;
    case 'flexible':
    default:
      baseMinutes = Math.round(distanceKm * 2.8);
      bufferMinutes = isPeakHour ? 10 : 5;
  }

  // Ensure minimum travel time
  baseMinutes = Math.max(mode === 'walking' ? 5 : 8, baseMinutes);

  return {
    minutes: baseMinutes,
    bufferMinutes
  };
}

export function generateTrafficAdvisory(
  neighborhood: Neighborhood,
  departureTime?: string
): {
  peakWarning?: string;
  bestDepartureWindow: string;
  disclaimer: string;
} {
  const pattern = PUNE_TRAFFIC_PATTERNS[neighborhood] || PUNE_TRAFFIC_PATTERNS['FC Road & Deccan'];

  return {
    peakWarning: `Typical bottlenecks in ${neighborhood}: ${pattern.keyBottlenecks.join(', ')}. Evening peak runs ${pattern.weekdayEveningPeak}.`,
    bestDepartureWindow: `Best departure window: ${pattern.recommendedDepartureWindows.afternoon} or ${pattern.recommendedDepartureWindows.evening}.`,
    disclaimer: 'Typical traffic guidance based on historical flow — please check live conditions before leaving.'
  };
}
