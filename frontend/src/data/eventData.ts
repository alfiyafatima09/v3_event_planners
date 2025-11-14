// Helper function to add category to packages
const addCategory = <T extends { id: number; image: string; info: string[]; cost: string }>(
  packages: T[],
  category: string
) => packages.map(pkg => ({ ...pkg, category }));

export const bdayDetails = addCategory([
  {
    id: 1,
    image: '/img1.jpg',
    info: ['Exclusive decorations', 'Custom theme options', 'Personalized cake designs'],
    cost: '5000',
  },
  {
    id: 2,
    image: '/img1.jpg',
    info: ['Live music and DJ', 'Photo booth setup', 'Special light effects'],
    cost: '7000',
  },
  {
    id: 3,
    image: '/img1.jpg',
    info: ['Kids games and activities', 'Gift hampers', 'Themed party favors'],
    cost: '10000',
  },
], 'birthday');

export const engagementDetails = addCategory([
  {
    id: 1,
    image: '/img1.jpg',
    info: ['Traditional decor setup', 'Ring ceremony arrangements', 'Basic photography'],
    cost: '15000',
  },
  {
    id: 2,
    image: '/img1.jpg',
    info: ['Premium floral decorations', 'Professional photography & videography', 'Live music'],
    cost: '25000',
  },
  {
    id: 3,
    image: '/img1.jpg',
    info: ['Luxury venue styling', 'Complete event coordination', 'Gourmet catering'],
    cost: '35000',
  },
], 'engagement');

export const housewarmingDetails = addCategory([
  {
    id: 1,
    image: '/img1.jpg',
    info: ['Traditional rangoli', 'Basic puja arrangements', 'Simple decorations'],
    cost: '8000',
  },
  {
    id: 2,
    image: '/img1.jpg',
    info: ['Extended puja arrangements', 'Floral decorations', 'Food arrangements'],
    cost: '12000',
  },
  {
    id: 3,
    image: '/img1.jpg',
    info: ['Complete ceremony management', 'Premium decorations', 'Catering service'],
    cost: '18000',
  },
], 'housewarming');

export const pujaDetails = addCategory([
  {
    id: 1,
    image: '/img1.jpg',
    info: ['Pandit arrangements', 'Basic puja samagri', 'Simple setup'],
    cost: '5000',
  },
  {
    id: 2,
    image: '/img1.jpg',
    info: ['Complete puja samagri', 'Decoration setup', 'Prasad arrangements'],
    cost: '8000',
  },
  {
    id: 3,
    image: '/img1.jpg',
    info: ['Premium puja arrangements', 'Special decorations', 'Catering service'],
    cost: '12000',
  },
], 'puja');

export const babyShowerDetails = addCategory([
  {
    id: 1,
    image: '/img1.jpg',
    info: ['Basic decorations', 'Traditional games setup', 'Photography'],
    cost: '12000',
  },
  {
    id: 2,
    image: '/img1.jpg',
    info: ['Theme-based decorations', 'Games & activities', 'Photo booth'],
    cost: '18000',
  },
  {
    id: 3,
    image: '/img1.jpg',
    info: ['Premium venue styling', 'Professional photography', 'Complete event management'],
    cost: '25000',
  },
], 'babyShower');

export const namingCeremonyDetails = addCategory([
  {
    id: 1,
    image: '/img1.jpg',
    info: ['Basic ceremony setup', 'Traditional decorations', 'Pandit arrangements'],
    cost: '10000',
  },
  {
    id: 2,
    image: '/img1.jpg',
    info: ['Premium decorations', 'Photography & videography', 'Catering service'],
    cost: '15000',
  },
  {
    id: 3,
    image: '/img1.jpg',
    info: ['Luxury event setup', 'Complete ceremony management', 'Premium catering'],
    cost: '22000',
  },
], 'namingCeremony');

// Export all packages together
export const allEventPackages = [
  ...bdayDetails,
  ...engagementDetails,
  ...housewarmingDetails,
  ...pujaDetails,
  ...babyShowerDetails,
  ...namingCeremonyDetails,
];

// Category metadata
export const categoryMetadata: Record<string, { title: string; description: string }> = {
  birthday: {
    title: 'Birthday Party Packages',
    description: 'Choose from our carefully curated selection of birthday packages, each designed to create unforgettable moments.',
  },
  engagement: {
    title: 'Engagement Party Packages',
    description: 'Make your engagement special with our thoughtfully curated packages designed to celebrate your love story.',
  },
  housewarming: {
    title: 'Housewarming Party Packages',
    description: 'Choose from our thoughtfully curated housewarming packages, each designed to celebrate new beginnings and create warm, lasting memories.',
  },
  puja: {
    title: 'Pooja Ceremony Packages',
    description: 'Choose from our thoughtfully curated pooja ceremony packages, each designed to bring peace, positivity, and blessings to your special occasion.',
  },
  babyShower: {
    title: 'Baby Shower Packages',
    description: 'Celebrate the upcoming arrival with our specially designed baby shower packages filled with joy and excitement.',
  },
  namingCeremony: {
    title: 'Naming Ceremony Packages',
    description: 'Make your baby\'s naming ceremony memorable with our traditional and modern package options.',
  },
};