const subcategories = [
  // 1. STUDENT HOUSING (categoryId: 1)
  { 
    id: 101, 
    categoryId: 1, 
    name: "Hostels", 
    description: "Safe and affordable shared living spaces for students with meal facilities.",
    providerCount: 15,
    image: "https://images.unsplash.com/photo-1555854817-5b2738f751a7?q=80&w=500" 
  },
  { 
    id: 102, 
    categoryId: 1, 
    name: "Apartments", 
    description: "Modern private flats and studio apartments near university areas.",
    providerCount: 8,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=500" 
  },
  { 
    id: 103, 
    categoryId: 1, 
    name: "Paying Guest", 
    description: "Comfortable rooms with local families for a home-like environment.",
    providerCount: 12,
    image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=500" 
  },
  { 
    id: 104, 
    categoryId: 1, 
    name: "Rent Houses", 
    description: "Full houses available for group stays or family rentals.",
    providerCount: 5,
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=500" 
  },

  // 2. TUTORING (categoryId: 2)
  { 
    id: 201, 
    categoryId: 2, 
    name: "Mathematics", 
    description: "Expert help for calculus, algebra, and school-level math.",
    providerCount: 20,
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=500" 
  },
  { 
    id: 202, 
    categoryId: 2, 
    name: "Programming", 
    description: "Learn Python, Java, C++, or Web Development from seniors.",
    providerCount: 14,
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=500" 
  },
  { 
    id: 203, 
    categoryId: 2, 
    name: "Science", 
    description: "Physics, Chemistry, and Biology tutoring for all levels.",
    providerCount: 11,
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=500" 
  },
  { 
    id: 204, 
    categoryId: 2, 
    name: "Language Class", 
    description: "English, Japanese, or Korean language preparation classes.",
    providerCount: 9,
    image: "https://images.unsplash.com/photo-1543165796-5426273ea458?q=80&w=500" 
  },

  // 3. PET CARE (categoryId: 3)
  { 
    id: 301, 
    categoryId: 3, 
    name: "Dog Grooming", 
    description: "Full cleaning, hair trimming, and hygiene for your pets.",
    providerCount: 6,
    image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=500" 
  },
  { 
    id: 302, 
    categoryId: 3, 
    name: "Pet Walking", 
    description: "Daily exercise and walking services for your active dogs.",
    providerCount: 18,
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=500" 
  },
  { 
    id: 303, 
    categoryId: 3, 
    name: "Vet Services", 
    description: "Professional medical checkups and vaccinations for animals.",
    providerCount: 4,
    image: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?q=80&w=500" 
  },

  // 4. HEALTH (categoryId: 4)
  { 
    id: 401, 
    categoryId: 4, 
    name: "Physiotherapy", 
    description: "In-home physical therapy for recovery and pain relief.",
    providerCount: 7,
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=500" 
  },
  { 
    id: 402, 
    categoryId: 4, 
    name: "Counseling", 
    description: "Mental health support and professional therapy sessions.",
    providerCount: 5,
    image: "https://images.unsplash.com/photo-1573497620053-ea5310f94a17?q=80&w=500" 
  },

  // 5. TECH SERVICES (categoryId: 5)
  { 
    id: 501, 
    categoryId: 5, 
    name: "Laptop Repair", 
    description: "Hardware fixes, screen replacement, and deep cleaning.",
    providerCount: 10,
    image: "https://images.unsplash.com/photo-1588872674874-3a0c6124b59f?q=80&w=500" 
  },
  { 
    id: 502, 
    categoryId: 5, 
    name: "Software Install", 
    description: "OS installation, antivirus setup, and software troubleshooting.",
    providerCount: 15,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=500" 
  },

  // 6. AUTOMOBILES (categoryId: 6)
  { 
    id: 601, 
    categoryId: 6, 
    name: "Bike Repair", 
    description: "On-call mechanics for bike servicing and engine work.",
    providerCount: 12,
    image: "https://images.unsplash.com/photo-1485903593239-c217aa388bc5?q=80&w=500" 
  },
  { 
    id: 602, 
    categoryId: 6, 
    name: "Car Wash", 
    description: "Professional interior and exterior cleaning for your vehicles.",
    providerCount: 9,
    image: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=500" 
  },

  // 7. PERSONAL SERVICE (categoryId: 7)
  { 
    id: 701, 
    categoryId: 7, 
    name: "Haircut", 
    description: "Home-visit barber services and professional hair styling.",
    providerCount: 8,
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=500" 
  },
  { 
    id: 702, 
    categoryId: 7, 
    name: "Tailoring", 
    description: "Custom stitching and alteration services for all clothes.",
    providerCount: 6,
    image: "https://images.unsplash.com/photo-1525230071276-4a87f42f469e?q=80&w=500" 
  },

  // 8. HOME IMPROVEMENT (categoryId: 8)
  { 
    id: 801, 
    categoryId: 8, 
    name: "Plumbing", 
    description: "Leak fixes, pipe installation, and bathroom maintenance.",
    providerCount: 11,
    image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?q=80&w=500" 
  },
  { 
    id: 802, 
    categoryId: 8, 
    name: "Electrician", 
    description: "Wiring, switchboard repair, and electronic installations.",
    providerCount: 13,
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=500" 
  },
  { 
    id: 803, 
    categoryId: 8, 
    name: "Cleaning", 
    description: "Deep house cleaning, kitchen cleaning, and sanitization.",
    providerCount: 16,
    image: "https://images.unsplash.com/photo-1581578731522-7b754796191f?q=80&w=500" 
  },

  // 9. FOOD & MEAL (categoryId: 9)
  { 
    id: 901, 
    categoryId: 9, 
    name: "Tiffin Service", 
    description: "Daily healthy meal delivery for students and office workers.",
    providerCount: 22,
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=500" 
  },
  { 
    id: 902, 
    categoryId: 9, 
    name: "Home Cooked", 
    description: "Freshly prepared home meals available for order.",
    providerCount: 14,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=500" 
  }
];

export default subcategories;