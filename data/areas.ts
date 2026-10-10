import { Neighborhood } from '../types/place';

export interface AreaInfo {
  id: string;
  name: Neighborhood;
  tagline: string;
  description: string;
  vibe: string;
  bestTimeToVisit: string;
  walkingScore: 'Very High' | 'High' | 'Moderate' | 'Low';
  parkingAdvice: string;
  transitAccess: string;
  highlights: string[];
  isMvpFocus?: boolean;
}

export const PUNE_AREAS: AreaInfo[] = [
  {
    id: 'fc-road-deccan',
    name: 'FC Road & Deccan',
    tagline: 'The intellectual, youthful, and nostalgic epicenter of Pune.',
    description: 'Home to century-old educational bastions like Fergusson College and BMCC, tree-canopied residential lanes of Prabhat Road, and lively shopping sidewalks. Here, college debates, filter coffee, and iconic Irani bun maska collide.',
    vibe: 'Youthful energy meets old-world Puneri heritage and academic charm.',
    bestTimeToVisit: 'Early mornings (7:00 AM – 9:00 AM) for tranquil breakfast walks; twilight (5:00 PM – 8:00 PM) for vibrant street shopping and café hopping.',
    walkingScore: 'Very High',
    parkingAdvice: 'Two-wheeler parking available along designated bays; cars are strictly discouraged on FC Road itself (use Sambhaji Udyan multi-level parking).',
    transitAccess: 'Direct connectivity via Deccan Gymkhana & Chhatrapati Sambhaji Udyan Metro stations, plus frequent PMC city buses.',
    highlights: ['Vaishali', 'Café Goodluck', 'Wadeshwar', 'Hong Kong Lane', 'Kamala Nehru Park', 'Le Plaisir'],
    isMvpFocus: true
  },
  {
    id: 'jm-road',
    name: 'JM Road',
    tagline: 'Wide avenues, historical caves, and green civic gardens.',
    description: 'Running parallel to the Mutha river, Jangali Maharaj Road features wide walkways, century-old banyan trees, the 8th-century Pataleshwar rock cave temple, and iconic sweet marts.',
    vibe: 'Spacious, bustling, civic-minded with ancient archaeological retreats.',
    bestTimeToVisit: 'Mornings for Pataleshwar temple quietude; late afternoons for Sambhaji garden strolls.',
    walkingScore: 'High',
    parkingAdvice: 'Pay-and-park bays along the riverbed road; JM Road side bays fill up fast by noon.',
    transitAccess: 'Shivajinagar Metro station & PMC bus junction at Sancheti Hospital end.',
    highlights: ['Pataleshwar Cave Temple', 'Chhatrapati Sambhaji Garden', 'Modern Café', 'Khau Galli'],
    isMvpFocus: false
  },
  {
    id: 'koregaon-park',
    name: 'Koregaon Park',
    tagline: 'Leafy boulevard lanes, bohemian patios, and cosmopolitan nightlife.',
    description: 'Famous for its numbered leafy lanes draped in ancient banyans, Koregaon Park blends global wellness culture with upscale microbreweries, specialty patisseries, and independent art spaces.',
    vibe: 'Chic, international, lush green canopy, relaxed indulgence.',
    bestTimeToVisit: 'Lazy weekend brunches (10:30 AM – 2:00 PM) and evening patio gatherings (7:00 PM onwards).',
    walkingScore: 'High',
    parkingAdvice: 'Valet parking common at major venues; lane parking subject to odd-even resident rules.',
    transitAccess: 'Nearest metro at Bund Garden & Kalyani Nagar; auto-rickshaws plentiful.',
    highlights: ['German Bakery', 'High Spirits', 'The French Window', 'One O Eight', 'Squisito'],
    isMvpFocus: false
  },
  {
    id: 'kalyani-nagar',
    name: 'Kalyani Nagar',
    tagline: 'Modern riverside culture, craft breweries, and breezy pet-friendly lawns.',
    description: 'Bordered by the Mula-Mutha river and East Avenue, Kalyani Nagar offers spacious gastropubs, pet-friendly cafés, Jogger’s Park, and rapid connectivity to both KP and Viman Nagar.',
    vibe: 'Contemporary urban comfort, young professionals, relaxed craft dining.',
    bestTimeToVisit: 'Sunset and evenings (6:00 PM – 11:00 PM).',
    walkingScore: 'Moderate',
    parkingAdvice: 'Most restaurants provide dedicated valet; convenient roadside two-wheeler spots.',
    transitAccess: 'Kalyani Nagar Metro station located directly on the main arterial avenue.',
    highlights: ['Toit Pune', 'Elephant & Co.', 'Jogger’s Park', 'Café Paashh'],
    isMvpFocus: false
  },
  {
    id: 'baner-balewadi',
    name: 'Baner & Balewadi',
    tagline: 'Tech-corridor vitality, indie bookstores, and European-style boulevards.',
    description: 'Western Pune’s vibrant modern district. Features Balewadi High Street’s lively pedestrian food promenade alongside tucked-away cultural gems like Pagdandi book café and Baner Hill trails.',
    vibe: 'Progressive, active, tech-savvy with thriving artisanal communities.',
    bestTimeToVisit: 'Evenings for Balewadi High Street; early mornings for Baner Hill hikes.',
    walkingScore: 'Moderate',
    parkingAdvice: 'High Street has dedicated paid basement parking; Baner road has curbside spots.',
    transitAccess: 'Metro line under development; accessible via direct highway and arterial buses.',
    highlights: ['Pagdandi Books Chai Café', 'Balewadi High Street', 'Baner Hill', 'Effingut Baner'],
    isMvpFocus: false
  },
  {
    id: 'camp',
    name: 'Camp',
    tagline: 'Colonial heritage, Parsi bakeries, and bustling shopping bazaars.',
    description: 'Pune Cantonment preserves military cantonment architecture, Gothic clocktowers, vintage Parsi diners, and MG Road shopping where generations have bought Shrewsbury biscuits and chicken sandwiches.',
    vibe: 'Vintage nostalgia, cantonment symmetry, bustling commercial energy.',
    bestTimeToVisit: 'Late morning (11:00 AM – 1:30 PM) for unhurried bakery hopping; 5:00 PM onwards for MG Road walking.',
    walkingScore: 'High',
    parkingAdvice: 'Car parking is challenging on MG Road and East Street; prefer public transit or two-wheelers.',
    transitAccess: 'Pune Railway Station is 10 minutes away; extensive bus connectivity.',
    highlights: ['Marz-O-Rin', 'Burger (East Street)', 'Kayani Bakery', 'Dorabjee & Sons'],
    isMvpFocus: false
  },
  {
    id: 'kothrud',
    name: 'Kothrud',
    tagline: 'Cultural traditionalism, student hubs, and scenic hill ridges.',
    description: 'Once a quiet western suburb, Kothrud is now a powerhouse of Marathi theatre, cultural events, student hangout hubs, and the northern access trails to Vetal Tekdi and ARAI hills.',
    vibe: 'Warmly traditional, student-friendly, community-rooted.',
    bestTimeToVisit: 'Early mornings for Tekdi walks; evening for misal and cold coffee.',
    walkingScore: 'Moderate',
    parkingAdvice: 'Easier parking than old peths, especially along DP Road and Mayur Colony.',
    transitAccess: 'Served directly by the Vanaz – Garware College Metro line.',
    highlights: ['Durga Café', 'Vetal Tekdi access', 'Yashwantrao Chavan Natyagruha', 'Kata Kirr'],
    isMvpFocus: false
  },
  {
    id: 'pashan-hills',
    name: 'Pashan & Hills',
    tagline: 'Scenic ridgelines, freshwater lake sanctuaries, and open skies.',
    description: 'The natural western sanctuary of Pune featuring the expansive Vetal Hill ridge, Pashan wetland lake, and tranquil trails where birdwatchers and runners breathe clean hill air.',
    vibe: 'Quiet, rugged, nature-first, contemplative.',
    bestTimeToVisit: 'Sunrise (6:00 AM – 8:00 AM) and Golden Hour (5:00 PM – 6:45 PM).',
    walkingScore: 'Very High (on trails)',
    parkingAdvice: 'Ample open parking near ARAI gate and Pashan Lake entrance.',
    transitAccess: 'Auto-rickshaw or personal two-wheeler recommended for trailhead access.',
    highlights: ['Vetal Tekdi', 'ARAI Hill Quarry', 'Pashan Lake Nature Trail', 'Sunset Point'],
    isMvpFocus: false
  }
];
