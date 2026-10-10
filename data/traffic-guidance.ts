import { Neighborhood, TransportMode } from '../types/place';

export interface TrafficPattern {
  area: Neighborhood;
  weekdayMorningPeak: string;
  weekdayEveningPeak: string;
  weekendEveningPeak: string;
  keyBottlenecks: string[];
  recommendedDepartureWindows: {
    morning: string;
    afternoon: string;
    evening: string;
  };
  metroAlternativeAvailable: boolean;
  twoWheelerAdvantage: string;
}

export const PUNE_TRAFFIC_PATTERNS: Record<Neighborhood, TrafficPattern> = {
  'FC Road & Deccan': {
    area: 'FC Road & Deccan',
    weekdayMorningPeak: '8:45 AM – 10:30 AM (School & Office traffic on Karve Rd and JM Rd)',
    weekdayEveningPeak: '5:45 PM – 8:30 PM (Heavy shopping and student crowd at Goodluck Chowk)',
    weekendEveningPeak: '6:00 PM – 9:30 PM (Intense parking congestion along FC Road)',
    keyBottlenecks: ['Goodluck Chowk', 'Alka Talkies Bridge', 'Deccan Bus Stand turn', 'Ghole Road intersection'],
    recommendedDepartureWindows: {
      morning: 'Before 8:30 AM or after 10:30 AM',
      afternoon: '2:00 PM – 4:30 PM (Golden unhurried window)',
      evening: 'Before 5:30 PM or after 8:45 PM'
    },
    metroAlternativeAvailable: true,
    twoWheelerAdvantage: 'High. Narrow alleys and dedicated two-wheeler bays make two-wheelers 40% faster than cars during peak hours.'
  },
  'JM Road': {
    area: 'JM Road',
    weekdayMorningPeak: '9:00 AM – 10:30 AM (Northbound commuter corridor towards Shivajinagar)',
    weekdayEveningPeak: '6:00 PM – 8:30 PM (Southbound traffic returning towards Deccan and Kothrud)',
    weekendEveningPeak: '5:30 PM – 9:00 PM',
    keyBottlenecks: ['Sancheti Hospital flyover junction', 'Balgandharva Chowk', 'Jhansi Rani Chowk'],
    recommendedDepartureWindows: {
      morning: 'Before 8:45 AM',
      afternoon: '1:30 PM – 4:30 PM',
      evening: 'After 8:45 PM'
    },
    metroAlternativeAvailable: true,
    twoWheelerAdvantage: 'Moderate. Multiple lanes allow smoother car flow, but signals at Balgandharva create minor delays.'
  },
  'Koregaon Park': {
    area: 'Koregaon Park',
    weekdayMorningPeak: '9:30 AM – 11:00 AM',
    weekdayEveningPeak: '6:30 PM – 9:00 PM (Dinner & pub traffic entering North Main Road)',
    weekendEveningPeak: '7:00 PM – 10:30 PM (Extensive weekend nightlife congestion)',
    keyBottlenecks: ['North Main Road petrol pump turn', 'German Bakery corner (Lane 1)', 'Kalyani Nagar Bridge junction'],
    recommendedDepartureWindows: {
      morning: 'Before 9:30 AM',
      afternoon: '2:30 PM – 5:30 PM',
      evening: 'Before 7:00 PM or after 10:00 PM'
    },
    metroAlternativeAvailable: false,
    twoWheelerAdvantage: 'High. Bypasses narrow lane queues and resident speed bumps with ease.'
  },
  'Kalyani Nagar': {
    area: 'Kalyani Nagar',
    weekdayMorningPeak: '9:00 AM – 10:30 AM (Tech park commuters heading towards Cerebrum)',
    weekdayEveningPeak: '6:00 PM – 8:30 PM (Bridge crossing towards KP and airport road)',
    weekendEveningPeak: '7:00 PM – 9:45 PM',
    keyBottlenecks: ['Kalyani Nagar - Koregaon Park Bridge', 'Bishop’s School junction', 'East Avenue signal'],
    recommendedDepartureWindows: {
      morning: 'Before 8:45 AM or after 10:45 AM',
      afternoon: '1:00 PM – 4:45 PM',
      evening: 'After 8:45 PM'
    },
    metroAlternativeAvailable: true,
    twoWheelerAdvantage: 'Moderate. Kalyani Nagar Metro station bypasses bridge jams completely.'
  },
  'Baner & Balewadi': {
    area: 'Baner & Balewadi',
    weekdayMorningPeak: '9:00 AM – 10:45 AM (Highway and Hinjawadi outbound queue)',
    weekdayEveningPeak: '6:15 PM – 8:45 PM (Highway return traffic at Radha Chowk)',
    weekendEveningPeak: '7:30 PM – 10:30 PM (Balewadi High Street parking wait times)',
    keyBottlenecks: ['Radha Chowk', 'Balewadi High Street entry', 'Baner Road Pan Card Club road'],
    recommendedDepartureWindows: {
      morning: 'Before 8:30 AM',
      afternoon: '2:00 PM – 5:00 PM',
      evening: 'Before 6:30 PM or after 9:15 PM'
    },
    metroAlternativeAvailable: false,
    twoWheelerAdvantage: 'High. Allows bypassing the Radha Chowk bottlenecks.'
  },
  'Camp': {
    area: 'Camp',
    weekdayMorningPeak: '9:15 AM – 10:45 AM',
    weekdayEveningPeak: '5:30 PM – 8:30 PM (Heavy shopping and wholesale delivery vans)',
    weekendEveningPeak: '5:00 PM – 9:30 PM (MG Road & East Street full pedestrian capacity)',
    keyBottlenecks: ['Aurora Towers Chowk', 'West End Cinema junction', 'Try Luck Chowk'],
    recommendedDepartureWindows: {
      morning: 'Before 9:00 AM or 11:00 AM – 1:00 PM',
      afternoon: '2:00 PM – 4:30 PM',
      evening: 'After 8:45 PM'
    },
    metroAlternativeAvailable: false,
    twoWheelerAdvantage: 'Crucial. Cars struggle severely for parking; walking and two-wheelers are ideal.'
  },
  'Kothrud': {
    area: 'Kothrud',
    weekdayMorningPeak: '8:45 AM – 10:15 AM (Karve Road towards Deccan)',
    weekdayEveningPeak: '6:00 PM – 8:30 PM (Return corridor from Shivajinagar)',
    weekendEveningPeak: '6:30 PM – 9:00 PM',
    keyBottlenecks: ['Paud Phata flyover', 'Karve Statue Chowk', 'Chandani Chowk interchange'],
    recommendedDepartureWindows: {
      morning: 'Use Pune Metro (Vanaz to Deccan takes just 12 mins)',
      afternoon: '1:30 PM – 5:00 PM',
      evening: 'Take Metro or leave after 8:30 PM'
    },
    metroAlternativeAvailable: true,
    twoWheelerAdvantage: 'High, but Metro is even faster along the Karve Road spine.'
  },
  'Pashan & Hills': {
    area: 'Pashan & Hills',
    weekdayMorningPeak: '9:00 AM – 10:30 AM (Sus Road traffic)',
    weekdayEveningPeak: '6:00 PM – 8:00 PM (Pashan Circle)',
    weekendEveningPeak: '5:30 PM – 7:30 PM (Hilltop visitor departures)',
    keyBottlenecks: ['Pashan Circle', 'Abhimanshree Society gate on Pashan road'],
    recommendedDepartureWindows: {
      morning: 'Early morning (6:00 AM – 8:30 AM) is breezy and empty',
      afternoon: 'Open all afternoon',
      evening: 'Head home by 6:45 PM before evening rush'
    },
    metroAlternativeAvailable: false,
    twoWheelerAdvantage: 'High. Scenic hill climbs are enjoyable on two-wheelers.'
  },
  'Viman Nagar': {
    area: 'Viman Nagar',
    weekdayMorningPeak: '9:00 AM – 10:30 AM',
    weekdayEveningPeak: '6:00 PM – 8:45 PM (Airport road and Phoenix Mall chowk)',
    weekendEveningPeak: '5:30 PM – 9:45 PM (Mall visitor traffic)',
    keyBottlenecks: ['Phoenix Marketcity entrance', 'Symbiosis College junction', 'Airport Road junction'],
    recommendedDepartureWindows: {
      morning: 'Before 9:00 AM',
      afternoon: '1:00 PM – 4:30 PM',
      evening: 'After 9:00 PM'
    },
    metroAlternativeAvailable: true,
    twoWheelerAdvantage: 'High around campus lanes.'
  },
  'Aundh': {
    area: 'Aundh',
    weekdayMorningPeak: '9:00 AM – 10:30 AM (Parihar Chowk and University road)',
    weekdayEveningPeak: '6:00 PM – 8:30 PM',
    weekendEveningPeak: '6:00 PM – 9:00 PM',
    keyBottlenecks: ['Parihar Chowk', 'Bremer Chowk', 'Spicer College turn'],
    recommendedDepartureWindows: {
      morning: 'Before 8:45 AM',
      afternoon: '1:30 PM – 4:30 PM',
      evening: 'After 8:30 PM'
    },
    metroAlternativeAvailable: false,
    twoWheelerAdvantage: 'High around DP Road and internal market.'
  },
  'Hinjawadi': {
    area: 'Hinjawadi',
    weekdayMorningPeak: '8:30 AM – 11:00 AM (Massive IT corridor incoming rush)',
    weekdayEveningPeak: '5:30 PM – 9:00 PM (Phase 1, 2, 3 outbound bottleneck)',
    weekendEveningPeak: 'Relatively light compared to weekdays',
    keyBottlenecks: ['Hinjawadi Flyover Chowk', 'Wakad Bridge', 'Phase 1 Circle'],
    recommendedDepartureWindows: {
      morning: 'Before 8:15 AM or after 11:30 AM',
      afternoon: '1:00 PM – 4:30 PM',
      evening: 'After 9:15 PM'
    },
    metroAlternativeAvailable: false,
    twoWheelerAdvantage: 'Moderate due to dust/highway speeds; bus/carpooling preferred.'
  }
};
