
import { Program, Project, TeamMember, NewsItem, GalleryImage } from './types';

export const PROGRAMS: Program[] = [
  {
    id: 'peacebuilding',
    title: 'Peacebuilding & Conflict Resolution',
    icon: 'MessageCircle',
    description: 'Ensuring peaceful coexistence among agro-pastoralist communities in South Sudan through inter-community meetings and dialogues under trees. We focus on mitigating resource-based conflicts stemming from inadequate water and pastures.',
    objectives: [
      'Ensure peaceful coexistence among agro-pastoralists communities.',
      'Facilitate inter-community meetings and dialogues.',
      'Mediate resource-based conflicts over water and pastures.'
    ],
    activities: [
      'Inter-community peace dialogues under the tree',
      'Conflict mapping in arid regions',
      'Peace committee training and mediation',
      'Local coordination and social cohesion'
    ],
    beneficiaries: 'Pastoralists, agro-pastoralists, and rural communities in South Sudan.',
    outcomes: [
      'Reduced resource-based violence.',
      'Shared water and pasture agreements.'
    ],
    image: ''
  },
  {
    id: 'livelihoods',
    title: 'Sustainable Livelihoods',
    icon: 'Sprout',
    description: 'Improving livelihoods in South Sudan through oxen plowing, technical training, and livestock health services to enhance production and income generation for rural communities.',
    objectives: [
      'Improve rural household livelihoods.',
      'Enhance production through oxen plowing and modern farming.',
      'Support income generation via livestock health and markets.'
    ],
    activities: [
      'Oxen plowing and technical training',
      'Veterinary services for goat and livestock health',
      'Okra and vegetable harvest support',
      'Market distribution and sack transport'
    ],
    beneficiaries: 'Smallholder farmers and rural agro-pastoralists.',
    outcomes: [
      'Improved household food security.',
      'Increased income from diversified sources.'
    ],
    image: ''
  },
  {
    id: 'resilience',
    title: 'DRR & Resilience',
    icon: 'CloudRain',
    description: 'Building resilience in South Sudan through food preservation techniques like hanging maize/corn for drying and environmental conservation to respond to climate disasters.',
    objectives: [
      'Train communities in disaster preparedness.',
      'Build resilience via traditional maize drying and preservation.',
      'Strengthen community response to climate shocks.'
    ],
    activities: [
      'Traditional corn preservation and drying',
      'Community resilience mapping',
      'Early warning system implementation',
      'Water resource management training'
    ],
    beneficiaries: 'Rural communities in disaster-prone arid areas.',
    outcomes: [
      'Communities prepared for climate shocks.',
      'Reduced vulnerability to environmental disasters.'
    ],
    image: ''
  },
  {
    id: 'governance',
    title: 'Good Governance & Accountability',
    icon: 'ShieldCheck',
    description: 'Capacity building in South Sudan through indoor workshops for community leaders to lead in a fair, transparent, and rights-based manner.',
    objectives: [
      'Promote fair and transparent leadership.',
      'Strengthen community-level accountability.',
      'Build capacity for local community leaders.'
    ],
    activities: [
      'Capacity building workshops for local leaders',
      'Sharing project entitlements with beneficiaries',
      'Leadership training for peace committees',
      'Advocacy forums'
    ],
    beneficiaries: 'Community leaders and local authorities.',
    outcomes: [
      'Transparent resource management.',
      'Accountable community governance.'
    ],
    image: ''
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'livelihood-okra',
    title: 'Climate Smart Okra Cultivation',
    location: 'Central Equatoria, South Sudan',
    duration: 'Ongoing',
    partner: 'Local Government',
    status: 'ongoing',
    description: 'Training farmers in okra cultivation and facilitating the harvest and distribution of fresh produce to local markets in South Sudan.',
    outcomes: [
      'Successful harvest of high-yield okra varieties.',
      'Training provided to 200 smallholder farmers.',
      'Distribution of harvest sacks to women-led groups.'
    ],
    image: './Images/projects/input_file_1.png'
  },
  {
    id: 'oxen-farming',
    title: 'Oxen Plowing & Technical Training',
    location: 'Bahr el Ghazal, South Sudan',
    duration: 'Ongoing',
    partner: 'Ministry of Agriculture',
    status: 'ongoing',
    description: 'Increasing agricultural acreage in South Sudan through animal traction (oxen plowing) and modern soil conservation techniques.',
    outcomes: [
      'Expanded cultivation areas for 500 households.',
      'Training provided on sustainable soil management.',
      'Provision of high-quality plowing kits.'
    ],
    image: './Images/projects/input_file_0.png'
  }
];

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 'g1',
    url: './Images/gallery/input_file_0.png',
    caption: 'Oxen plowing: Preparing land for the planting season in South Sudan.',
    location: 'Bahr el Ghazal',
    category: 'Livelihoods'
  },
  {
    id: 'g2',
    url: './Images/gallery/input_file_1.png',
    caption: 'Okra Harvest: Farmers displaying high-yield produce in Central Equatoria.',
    location: 'Central Equatoria',
    category: 'Projects'
  },
  {
    id: 'g3',
    url: './Images/gallery/input_file_2.png',
    caption: 'Project Handover: Distributing produce sacks to South Sudanese farmer groups.',
    location: 'Market Linkage',
    category: 'Impact'
  },
  {
    id: 'g4',
    url: './Images/gallery/input_file_3.png',
    caption: 'Field Monitoring: ADC team assessing crop health with rural farmers.',
    location: 'Arid Zone',
    category: 'Livelihoods'
  }
];

export const TEAM: TeamMember[] = [
  {
    id: '1',
    name: 'Hillary Taban Lohinei',
    role: 'Executive Director',
    bio: 'Visionary leader dedicated to ADC’s mission of empowering agropastoralists in South Sudan through strategic resilience building.',
    image: '',
    category: 'management'
  },
  {
    id: '2',
    name: 'ADC Secretariat',
    role: 'Operations Management',
    bio: 'Acting with honesty, strong moral principles, and ethical values to ensure community project success across South Sudan.',
    image: '',
    category: 'management'
  }
];

