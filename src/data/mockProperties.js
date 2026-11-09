/**
 * Comprehensive Mock Property Database for Jami Dunia (Odisha, India)
 */

export const INITIAL_PROPERTIES = [
  // --- BUY LAND LISTINGS ---
  {
    id: "LH-LND-101",
    title: "Prime Gharabari Residential Plot near Infocity",
    category: "land",
    type: "Residential Gharabari",
    location: "Patia, Infocity Road",
    city: "Bhubaneswar",
    district: "Khordha",
    pincode: "751024",
    areaSqFt: 2400,
    dimensions: "40 ft × 60 ft",
    pricePerSqFt: 2200,
    totalPrice: 5280000, // 2400 * 2200 = ₹52,80,000
    bookingToken: 50000,
    facing: "East",
    roadAccess: "40 ft BDA Blacktop Road",
    khataNo: "142/58",
    plotNo: "892/104",
    tehsil: "Bhubaneswar",
    mouza: "Patia",
    status: "Available",
    featured: true,
    rating: 4.9,
    reviewsCount: 14,
    description: "Exceptional freehold residential Gharabari plot situated in high-growth Patia corridor. Perfect rectangular shape with clear Stitiban Patta, ROR mutation verified, BDA approved layout, underground drainage, and 3-phase electricity line installed. 5 mins drive from KIIT University and TCS Infotech campus.",
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1524813686514-a57563d77d61?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1592595896551-12b371d546d5?auto=format&fit=crop&w=1200&q=80"
    ],
    seller: {
      name: "Odisha Land Developers Pvt. Ltd.",
      type: "Verified Partner",
      contact: "+91 94370 12890",
      verified: true
    },
    amenities: ["Gated Boundary Wall", "40ft Road Access", "Underground Drainage", "Street Lights", "Electricity Connection", "Water Pipeline"]
  },
  {
    id: "LH-LND-102",
    title: "Corner Highway Commercial Land on NH-16",
    category: "land",
    type: "Commercial Land",
    location: "Pahala, NH-16 Corridor",
    city: "Bhubaneswar",
    district: "Khordha",
    pincode: "752101",
    areaSqFt: 4800,
    dimensions: "60 ft × 80 ft",
    pricePerSqFt: 2850,
    totalPrice: 13680000, // 4800 * 2850 = ₹1,36,80,000
    bookingToken: 100000,
    facing: "North-East",
    roadAccess: "60 ft NH Service Road + 30 ft Side Road",
    khataNo: "88/12",
    plotNo: "1140/32",
    tehsil: "Balianta",
    mouza: "Pahala",
    status: "Available",
    featured: true,
    rating: 4.8,
    reviewsCount: 19,
    description: "High-visibility corner commercial plot located right on the bustling Bhubaneswar-Cuttack NH-16 highway stretch. Direct dual-road frontage, excellent for corporate offices, automobile showrooms, warehouse, or hotel development. 100% legal clearance with single-owner verified title.",
    images: [
      "https://images.unsplash.com/photo-1592595896551-12b371d546d5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1628624747186-a941c476b7ef?auto=format&fit=crop&w=1200&q=80"
    ],
    seller: {
      name: "Pradeep Kumar Mohanty",
      type: "Individual Owner",
      contact: "+91 98610 54321",
      verified: true
    },
    amenities: ["Corner Plot", "Dual Road Frontage", "High Commercial Visibility", "Immediate Mutation", "Transformer Nearby"]
  },
  {
    id: "LH-LND-103",
    title: "Affordable Gharabari Plot in Gated Community",
    category: "land",
    type: "Residential Gharabari",
    location: "Sundarpada, Near Botanical Garden",
    city: "Bhubaneswar",
    district: "Khordha",
    pincode: "751002",
    areaSqFt: 1800,
    dimensions: "30 ft × 60 ft",
    pricePerSqFt: 1450,
    totalPrice: 2610000, // 1800 * 1450 = ₹26,10,000
    bookingToken: 25000,
    facing: "North",
    roadAccess: "30 ft Concrete Road",
    khataNo: "210/44",
    plotNo: "654/12",
    tehsil: "Jatni",
    mouza: "Sundarpada",
    status: "Available",
    featured: false,
    rating: 4.7,
    reviewsCount: 8,
    description: "Vastu-compliant residential land inside a serene gated residential colony. Complete with boundary demarcation pillars, ready for immediate home construction with peaceful surroundings and high appreciation potential.",
    images: [
      "https://images.unsplash.com/photo-1628624747186-a941c476b7ef?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80"
    ],
    seller: {
      name: "Subhashree Builders & Realtors",
      type: "Verified Partner",
      contact: "+91 97760 11223",
      verified: true
    },
    amenities: ["Gated Society", "Concrete Roads", "Water Borewell Facility", "Vastu Compliant", "Boundary Pillars Fixed"]
  },
  {
    id: "LH-LND-104",
    title: "Luxury Riverside View Plot near Trisulia Bridge",
    category: "land",
    type: "Residential Gharabari",
    location: "Trisulia, Kathajodi Riverfront",
    city: "Cuttack",
    district: "Cuttack",
    pincode: "754005",
    areaSqFt: 3000,
    dimensions: "50 ft × 60 ft",
    pricePerSqFt: 1850,
    totalPrice: 5550000, // 3000 * 1850 = ₹55,50,000
    bookingToken: 50000,
    facing: "East",
    roadAccess: "40 ft Wide Pitch Road",
    khataNo: "305/19",
    plotNo: "412/8",
    tehsil: "Cuttack Sadar",
    mouza: "Trisulia",
    status: "Available",
    featured: true,
    rating: 4.9,
    reviewsCount: 11,
    description: "Picturesque riverside residential land adjoining the twin-city connector expressway. BDA & CDA master-plan aligned zone with rapid development, scenic lush greenery, and breezy Kathajodi riverbank breeze.",
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1592595896551-12b371d546d5?auto=format&fit=crop&w=1200&q=80"
    ],
    seller: {
      name: "Kalinga Land Bank",
      type: "Verified Partner",
      contact: "+91 94371 88990",
      verified: true
    },
    amenities: ["Riverside View", "Twin City Connectivity", "Wide Pitch Road", "Clear Title", "Survey Marked"]
  },
  {
    id: "LH-LND-105",
    title: "Tourism & Resort Hospitality Land on Marine Drive",
    category: "land",
    type: "Commercial / Resort Land",
    location: "Marine Drive, Sipasarubali",
    city: "Puri",
    district: "Puri",
    pincode: "752002",
    areaSqFt: 10890, // 10 Gunthas
    dimensions: "99 ft × 110 ft",
    pricePerSqFt: 3100,
    totalPrice: 33759000, // 10890 * 3100 = ₹3,37,59,000
    bookingToken: 200000,
    facing: "South-East",
    roadAccess: "60 ft Marine Drive Road",
    khataNo: "92/04",
    plotNo: "189/5",
    tehsil: "Puri Sadar",
    mouza: "Sipasarubali",
    status: "Available",
    featured: false,
    rating: 4.8,
    reviewsCount: 6,
    description: "Prestigious tourism and luxury resort commercial land directly connecting Puri and Konark on the iconic Marine Drive. Just 400m from the coastline with ocean breeze, ideal for beach resorts, wellness centers, or boutique hotels.",
    images: [
      "https://images.unsplash.com/photo-1524813686514-a57563d77d61?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80"
    ],
    seller: {
      name: "Lord Jagannath Realties",
      type: "Verified Partner",
      contact: "+91 99370 44556",
      verified: true
    },
    amenities: ["Coastal Road Access", "Tourism Zone Clearance", "Wide 60ft Frontage", "Electricity Substation Nearby"]
  },

  // --- APARTMENTS ---
  {
    id: "LH-APT-201",
    title: "Utkal Royal Residency 3 BHK Luxury Apartment",
    category: "apartment",
    bhk: "3 BHK",
    type: "High-Rise Luxury Apartment",
    location: "Jayadev Vihar, Near Fortune Tower",
    city: "Bhubaneswar",
    district: "Khordha",
    pincode: "751013",
    areaSqFt: 1850,
    builtUpArea: 1850,
    carpetArea: 1420,
    floorNo: 9,
    totalFloors: 18,
    pricePerSqFt: 6200,
    totalPrice: 11470000, // ₹1.14 Cr
    bookingToken: 50000,
    facing: "North-East",
    parking: "2 Covered Basement Parkings",
    bedrooms: 3,
    bathrooms: 3,
    balconies: 2,
    status: "Available",
    featured: true,
    rating: 4.9,
    reviewsCount: 28,
    description: "Sophisticated 3 BHK luxury apartment offering panoramic city skyline views of Jayadev Vihar. Features Italian marble flooring, VRV air-conditioning provisions, modern modular kitchen, and private balconies overlooking the Central Park.",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80"
    ],
    seller: {
      name: "Utkal Builders & Developers",
      type: "Top Tier Developer",
      contact: "+91 94372 33445",
      verified: true
    },
    amenities: ["Clubhouse", "Rooftop Swimming Pool", "Modern Gymnasium", "24/7 Power Backup", "High Speed Schindler Lifts", "2 Covered Parkings", "Fire Safety Systems"]
  },
  {
    id: "LH-APT-202",
    title: "Kalinga Greenwoods 2 BHK Modern Flat",
    category: "apartment",
    bhk: "2 BHK",
    type: "Premium Gated Apartment",
    location: "Khandagiri, Near ITER College",
    city: "Bhubaneswar",
    district: "Khordha",
    pincode: "751030",
    areaSqFt: 1250,
    builtUpArea: 1250,
    carpetArea: 960,
    floorNo: 4,
    totalFloors: 12,
    pricePerSqFt: 4800,
    totalPrice: 6000000, // ₹60,00,000
    bookingToken: 35000,
    facing: "East",
    parking: "1 Covered Car Parking",
    bedrooms: 2,
    bathrooms: 2,
    balconies: 1,
    status: "Available",
    featured: false,
    rating: 4.7,
    reviewsCount: 15,
    description: "Smartly planned 2 BHK flat with plenty of natural daylight and cross-ventilation. Walking distance to ITER university, hospitals, and Khandagiri highway junction. Ideal for families and working professionals.",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80"
    ],
    seller: {
      name: "Kalinga Infratech",
      type: "Verified Developer",
      contact: "+91 98611 77889",
      verified: true
    },
    amenities: ["Community Hall", "Badminton Court", "Intercom", "24/7 Security", "CCTV Surveillance", "Children Play Area"]
  },
  {
    id: "LH-APT-203",
    title: "Mahanadi Heights 4 BHK Penthouse with Private Deck",
    category: "apartment",
    bhk: "4 BHK",
    type: "Penthouse / Sky Villa",
    location: "CDA Sector 9, Riverbank",
    city: "Cuttack",
    district: "Cuttack",
    pincode: "753014",
    areaSqFt: 3200,
    builtUpArea: 3200,
    carpetArea: 2450,
    floorNo: 15,
    totalFloors: 15,
    pricePerSqFt: 6500,
    totalPrice: 20800000, // ₹2.08 Cr
    bookingToken: 100000,
    facing: "North",
    parking: "3 Dedicated Covered Parkings",
    bedrooms: 4,
    bathrooms: 4,
    balconies: 3,
    status: "Available",
    featured: true,
    rating: 5.0,
    reviewsCount: 9,
    description: "Cuttack's crowning penthouse overlooking the scenic Mahanadi river basin. Massive 4 BHK layout with double-height ceiling in living lounge, private plunge pool on open terrace deck, and domestic staff quarters.",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
    ],
    seller: {
      name: "Silver City Promoters",
      type: "Verified Partner",
      contact: "+91 94370 99881",
      verified: true
    },
    amenities: ["Private Terrace Jacuzzi", "River View Deck", "Servant Room", "Keycard Elevator Access", "Solar Water Heating", "Club Membership"]
  },

  // --- VILLAS ---
  {
    id: "LH-VIL-301",
    title: "The Orchid Sanctuary 4 BHK Luxury Gated Villa",
    category: "villa",
    type: "Duplex Luxury Villa",
    location: "Sailashree Vihar, Chandrasekharpur",
    city: "Bhubaneswar",
    district: "Khordha",
    pincode: "751021",
    plotArea: 3000,
    builtUpArea: 3600,
    areaSqFt: 3600,
    dimensions: "50 ft × 60 ft",
    pricePerSqFt: 7500,
    totalPrice: 27000000, // ₹2.70 Cr
    bookingToken: 150000,
    facing: "East",
    bedrooms: 4,
    bathrooms: 5,
    floors: "G+1 Duplex",
    parking: "2 Covered Garage + 1 Open",
    status: "Available",
    featured: true,
    rating: 4.95,
    reviewsCount: 22,
    description: "Architectural masterpiece duplex villa set amidst private landscaped manicured lawns in Sailashree Vihar. Boasts double-height living room, private home theater room, teakwood stairways, imported sanitary fittings, and separate servant suite.",
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
    ],
    seller: {
      name: "Odisha Luxury Estates",
      type: "Premium Developer",
      contact: "+91 94373 55667",
      verified: true
    },
    amenities: ["Private Landscaped Lawn", "Home Theatre Room", "Solar Power Grid", "Italian Marble Flooring", "2 Covered Garages", "Gated Security with Boom Barriers"]
  },
  {
    id: "LH-VIL-302",
    title: "Emerald Greens 3 BHK Eco-Villa",
    category: "villa",
    type: "Triplex Contemporary Villa",
    location: "Trisulia Riverside Enclave",
    city: "Cuttack",
    district: "Cuttack",
    pincode: "754005",
    plotArea: 2200,
    builtUpArea: 2800,
    areaSqFt: 2800,
    dimensions: "40 ft × 55 ft",
    pricePerSqFt: 6200,
    totalPrice: 17360000, // ₹1.73 Cr
    bookingToken: 100000,
    facing: "North",
    bedrooms: 3,
    bathrooms: 4,
    floors: "G+2 Triplex",
    parking: "2 Car Port",
    status: "Available",
    featured: false,
    rating: 4.8,
    reviewsCount: 17,
    description: "Contemporary triplex eco-villa with rooftop terrace garden and private gym suite. Designed for modern multi-generational living with rainwater harvesting and open atrium natural lighting.",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80"
    ],
    seller: {
      name: "Mahanadi Green Living",
      type: "Verified Developer",
      contact: "+91 98612 44332",
      verified: true
    },
    amenities: ["Rooftop Terrace Garden", "Rainwater Harvesting", "Open Skylight Atrium", "Electric Car EV Charger", "Clubhouse Access"]
  },

  // --- INDEPENDENT HOUSES ---
  {
    id: "LH-HOU-401",
    title: "Modern 4 BHK G+1 Independent House in Nayapalli",
    category: "house",
    type: "Independent House",
    location: "Nayapalli, Near IRC Village",
    city: "Bhubaneswar",
    district: "Khordha",
    pincode: "751015",
    landArea: 2400,
    builtUpArea: 3100,
    areaSqFt: 3100,
    dimensions: "40 ft × 60 ft",
    pricePerSqFt: 5800,
    totalPrice: 17980000, // ₹1.79 Cr
    bookingToken: 100000,
    facing: "East",
    bedrooms: 4,
    bathrooms: 4,
    floors: "G+1 Independent Duplex",
    parking: "2 Car Parking Space inside boundary",
    status: "Available",
    featured: true,
    rating: 4.85,
    reviewsCount: 16,
    description: "Well-built independent residential house situated in prime Nayapalli. Built with premium red bricks, solid foundation expandable up to G+2, borewell with sweet groundwater, separate servant quarter, and wide blacktop approach road.",
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80"
    ],
    seller: {
      name: "Er. Ramesh Chandra Patnaik",
      type: "Individual Owner",
      contact: "+91 94370 77123",
      verified: true
    },
    amenities: ["Deep Borewell Water", "Boundary Wall with Main Gate", "G+2 Foundation Strength", "Pooja Room", "Store Room", "Wide Front Road"]
  },
  {
    id: "LH-HOU-402",
    title: "Charming 3 BHK Bungalow with Fruit Orchard",
    category: "house",
    type: "Bungalow",
    location: "Tamando, Near AIIMS Hospital",
    city: "Bhubaneswar",
    district: "Khordha",
    pincode: "752054",
    landArea: 3500,
    builtUpArea: 2200,
    areaSqFt: 2200,
    dimensions: "50 ft × 70 ft",
    pricePerSqFt: 5200,
    totalPrice: 11440000, // ₹1.14 Cr
    bookingToken: 50000,
    facing: "North-East",
    bedrooms: 3,
    bathrooms: 3,
    floors: "Single Storey Bungalow",
    parking: "Ample Parking (3 Cars)",
    status: "Available",
    featured: false,
    rating: 4.75,
    reviewsCount: 12,
    description: "Peaceful independent bungalow set inside a large 3,500 sq.ft plot featuring mango, coconut, and jackfruit trees. Located 5 minutes from AIIMS Bhubaneswar with complete privacy, high compound walls, and serene environment.",
    images: [
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80"
    ],
    seller: {
      name: "Bishnu Charan Sahoo",
      type: "Individual Owner",
      contact: "+91 99380 66554",
      verified: true
    },
    amenities: ["Private Orchard Garden", "Wide Frontage", "Single Storey Living", "Spacious Veranda", "Solar Water Tank"]
  },

  // --- SELLER SUBMITTED PROPERTY (SAMPLE APPROVED) ---
  {
    id: "LH-LND-106",
    title: "Verified Gharabari Plot in CDA Sector 11",
    category: "land",
    type: "Residential Gharabari",
    location: "CDA Sector 11, Bidanasi",
    city: "Cuttack",
    district: "Cuttack",
    pincode: "753014",
    areaSqFt: 2000,
    dimensions: "40 ft × 50 ft",
    pricePerSqFt: 1500,
    totalPrice: 3000000, // 2000 * 1500 = ₹30,00,000 (Exact example in prompt!)
    bookingToken: 25000,
    facing: "East",
    roadAccess: "30 ft Blacktop Pitch Road",
    khataNo: "118/27",
    plotNo: "740/15",
    tehsil: "Cuttack Sadar",
    mouza: "Bidanasi",
    status: "Available",
    approvalStatus: "Approved",
    isSellerListing: true,
    featured: true,
    rating: 4.85,
    reviewsCount: 10,
    description: "Clean title residential Gharabari plot in CDA Sector 11. Plot area 2,000 sq.ft (dimensions 40 ft × 50 ft) at ₹1,500/sq.ft totaling ₹30,00,000. East facing with 30 ft pitch road. Excellent neighbourhood for immediate home construction.",
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1628624747186-a941c476b7ef?auto=format&fit=crop&w=1200&q=80"
    ],
    seller: {
      name: "Santosh Kumar Rout",
      type: "Owner Seller",
      contact: "+91 98530 12345",
      verified: true
    },
    amenities: ["BDA/CDA Approved Zone", "East Facing", "30ft Pitch Road", "Clear Mutation", "Immediate Possession"]
  },

  // --- PENDING SELLER LISTING (AWAITING ADMIN APPROVAL) ---
  {
    id: "LH-LND-901",
    title: "Agricultural to Homestead Conversion Land near Jatni",
    category: "land",
    type: "Residential Gharabari",
    location: "Jatni Gate, Near IIT BBS Bypass",
    city: "Jatni",
    district: "Khordha",
    pincode: "752050",
    areaSqFt: 3600,
    dimensions: "60 ft × 60 ft",
    pricePerSqFt: 1100,
    totalPrice: 3960000,
    bookingToken: 25000,
    facing: "North",
    roadAccess: "25 ft Village Pitch Road",
    khataNo: "450/81",
    plotNo: "1203/4",
    tehsil: "Jatni",
    mouza: "Kantabada",
    status: "Pending Review",
    approvalStatus: "Pending",
    isSellerListing: true,
    featured: false,
    rating: 0,
    reviewsCount: 0,
    description: "Square plot near Jatni railway bypass. Title deed submitted for verification. Looking for direct buyers without intermediary broker commissions.",
    images: [
      "https://images.unsplash.com/photo-1524813686514-a57563d77d61?auto=format&fit=crop&w=1200&q=80"
    ],
    seller: {
      name: "Manoj Kumar Nayak",
      email: "manoj.nayak@gmail.com",
      contact: "+91 94380 91827",
      type: "Registered Seller",
      verified: false
    },
    amenities: ["Square Plot", "25ft Road", "Rapid Growth Area"]
  }
];

export const ODISHA_DISTRICTS = [
  "Khordha (Bhubaneswar)",
  "Cuttack",
  "Puri"
];

export const POPULAR_LOCATIONS = [
  {
    name: "Patia & Infocity",
    district: "Bhubaneswar",
    tagline: "Odisha's IT & Education Epicenter",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
    activeListings: 42,
    avgPriceSqFt: "₹2,200 - ₹3,500/sq.ft"
  },
  {
    name: "Pahala & NH-16",
    district: "Bhubaneswar",
    tagline: "Twin City Growth Expressway",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
    activeListings: 28,
    avgPriceSqFt: "₹2,400 - ₹4,000/sq.ft"
  },
  {
    name: "CDA & Trisulia",
    district: "Cuttack",
    tagline: "Planned Sectors & Riverfront Luxury",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    activeListings: 35,
    avgPriceSqFt: "₹1,500 - ₹2,800/sq.ft"
  },
  {
    name: "Marine Drive & Beachfront",
    district: "Puri",
    tagline: "Premium Tourism & Coastal Plots",
    image: "https://images.unsplash.com/photo-1524813686514-a57563d77d61?auto=format&fit=crop&w=800&q=80",
    activeListings: 19,
    avgPriceSqFt: "₹2,800 - ₹4,500/sq.ft"
  }
];

export const DEMARCATION_SERVICES = [
  {
    id: "dem-standard",
    title: "Standard Residential Plot Demarcation",
    category: "Up to 3,000 sq.ft (approx. 3 Gunthas)",
    price: 4999,
    turnaround: "48 - 72 Hours",
    features: [
      "Certified Revenue Surveyor on-site",
      "Total Station electronic measurement",
      "Official ROR & Mouza Map overlay matching",
      "4 Corner RCC boundary pillar fixing",
      "Digital Lat-Long Geo-tagged Demarcation Certificate",
      "Legal boundary dispute advisory"
    ],
    recommended: true
  },
  {
    id: "dem-commercial",
    title: "Commercial & Large Plot Demarcation",
    category: "Up to 10,000 sq.ft (approx. 10 Gunthas)",
    price: 9999,
    turnaround: "3 - 4 Working Days",
    features: [
      "Senior Revenue Inspector & Licensed Surveyor team",
      "Dual-Frequency DGPS boundary mapping",
      "Contour elevation & road setback verification",
      "BDA/CDA building line demarcation",
      "CAD layout drawing & shapefile delivery",
      "Certified boundary compliance affidavit"
    ],
    recommended: false
  },
  {
    id: "dem-acre",
    title: "Agricultural Land & Large Acreage Survey",
    category: "1 Acre and Above",
    price: 14999,
    turnaround: "4 - 6 Working Days",
    features: [
      "High-precision Drone Aerial Photogrammetry",
      "Tehsil records reconciliation & Chakbandi cross-check",
      "Irrigation channel & public pathway rights identification",
      "Comprehensive perimeter fencing coordinates",
      "Signed survey report admissible in Revenue Courts",
      "Boundary security recommendations"
    ],
    recommended: false
  }
];

export const TESTIMONIALS = [
  {
    name: "Dr. Priyadarshi Das",
    role: "Professor & Homeowner, Patia",
    comment: "I purchased a 2,400 sq.ft residential plot in Patia through Jami Dunia. Their automated price calculation was 100% transparent, and their team carried out the land demarcation with total station within 48 hours. Absolute peace of mind!",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    propertyId: "LH-LND-101"
  },
  {
    name: "Smita Patnaik",
    role: "IT Professional, Hyderabad (Odisha Native)",
    comment: "Living outside Odisha, buying property in Bhubaneswar used to be nerve-wracking. Jami Dunia's token booking system and transparent legal title checks allowed me to book my dream 3 BHK at Utkal Royal smoothly.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    propertyId: "LH-APT-201"
  },
  {
    name: "Ashok Jena",
    role: "Land Owner & Seller, Cuttack",
    comment: "I listed my 2,000 sq.ft CDA Sector 11 plot on Jami Dunia. The administrator verified my ROR documents promptly and approved my listing. I received genuine inquiries and secured a buyer in under 3 weeks!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    propertyId: "LH-LND-106"
  }
];
