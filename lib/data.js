export const categories = [
  { id: 'house-plans', name: 'House Plans', icon: 'Home', description: 'Complete residential floor plans and elevations', count: 156 },
  { id: 'interior-layouts', name: 'Interior Layouts', icon: 'Palette', description: 'Professional interior design plans and mood boards', count: 89 },
  { id: 'landscape-designs', name: 'Landscape Designs', icon: 'TreePine', description: 'Garden layouts, hardscape plans, and planting designs', count: 64 },
  { id: 'apartment-blueprints', name: 'Apartment Blueprints', icon: 'Building2', description: 'Multi-unit residential building plans', count: 112 },
  { id: 'office-architecture', name: 'Office Architecture', icon: 'Briefcase', description: 'Commercial office space designs and layouts', count: 78 },
  { id: '3d-models', name: '3D Models', icon: 'Box', description: 'Ready-to-use 3D architectural models', count: 203 },
  { id: 'cad-files', name: 'CAD Files', icon: 'PenTool', description: 'AutoCAD compatible DWG and DXF files', count: 145 },
  { id: 'revit-files', name: 'Revit Files', icon: 'Layers', description: 'BIM-ready Revit families and templates', count: 97 },
  { id: 'construction-drawings', name: 'Construction Drawings', icon: 'Ruler', description: 'Detailed construction documentation sets', count: 131 },
];

export const vendors = [
  {
    id: 'v1',
    name: 'Studio Arcana',
    avatar: '🏛️',
    bio: 'Award-winning architecture firm specializing in modern residential and commercial design. 15+ years of experience delivering sustainable and innovative solutions.',
    location: 'New York, USA',
    rating: 4.9,
    reviewCount: 342,
    designCount: 87,
    totalSales: 2340,
    joinedDate: '2021-03-15',
    verified: true,
    specialties: ['house-plans', 'apartment-blueprints', '3d-models'],
  },
  {
    id: 'v2',
    name: 'Verde Landscapes',
    avatar: '🌿',
    bio: 'Landscape architecture studio creating harmonious outdoor spaces that blend nature with modern living. Experts in sustainable and native plantings.',
    location: 'Portland, USA',
    rating: 4.8,
    reviewCount: 198,
    designCount: 54,
    totalSales: 1567,
    joinedDate: '2021-08-22',
    verified: true,
    specialties: ['landscape-designs', 'construction-drawings'],
  },
  {
    id: 'v3',
    name: 'InSpace Design',
    avatar: '✨',
    bio: 'Interior design consultancy pushing the boundaries of spatial aesthetics. From minimalist Scandi to bold maximalism — we bring visions to life.',
    location: 'London, UK',
    rating: 4.7,
    reviewCount: 276,
    designCount: 63,
    totalSales: 1890,
    joinedDate: '2022-01-10',
    verified: true,
    specialties: ['interior-layouts', '3d-models', 'revit-files'],
  },
  {
    id: 'v4',
    name: 'BlueLine CAD',
    avatar: '📐',
    bio: 'Precision-focused CAD and BIM services. We provide production-ready technical drawings and Revit models for architects and contractors worldwide.',
    location: 'Berlin, Germany',
    rating: 4.9,
    reviewCount: 421,
    designCount: 112,
    totalSales: 3210,
    joinedDate: '2020-11-05',
    verified: true,
    specialties: ['cad-files', 'revit-files', 'construction-drawings'],
  },
  {
    id: 'v5',
    name: 'UrbanCraft Studios',
    avatar: '🏙️',
    bio: 'Urban planning and commercial architecture firm. Specialists in office spaces, mixed-use developments, and adaptive reuse projects.',
    location: 'Tokyo, Japan',
    rating: 4.6,
    reviewCount: 156,
    designCount: 41,
    totalSales: 980,
    joinedDate: '2022-06-18',
    verified: false,
    specialties: ['office-architecture', 'apartment-blueprints'],
  },
  {
    id: 'v6',
    name: 'Render Republic',
    avatar: '🎨',
    bio: '3D visualization studio creating photorealistic architectural renders and walkthrough animations. Bringing unbuilt designs to life.',
    location: 'Melbourne, Australia',
    rating: 4.8,
    reviewCount: 289,
    designCount: 76,
    totalSales: 2100,
    joinedDate: '2021-05-30',
    verified: true,
    specialties: ['3d-models', 'house-plans', 'interior-layouts'],
  },
];

const imageMap = {
  'house-plans': '/images/house_plan.png',
  'interior-layouts': '/images/interior_layout.png',
  'landscape-designs': '/images/landscape_design.png',
  'apartment-blueprints': '/images/apartment_blueprint.png',
  'office-architecture': '/images/office_architecture.png',
  '3d-models': '/images/threed_model.png',
  'cad-files': '/images/cad_file.png',
  'revit-files': '/images/cad_file.png',
  'construction-drawings': '/images/house_plan.png',
};

export const designs = [
  {
    id: 'd1', title: 'Modern Hillside Villa', category: 'house-plans', vendorId: 'v1',
    price: 299, originalPrice: 399, image: imageMap['house-plans'],
    description: 'A stunning 4-bedroom hillside villa with panoramic views, open floor plan, infinity pool, and sustainable design features. Includes full construction documents.',
    rating: 4.9, reviewCount: 87, downloads: 534, formats: ['PDF', 'DWG', 'RVT'],
    sqft: 3200, bedrooms: 4, bathrooms: 3, featured: true, trending: true,
  },
  {
    id: 'd2', title: 'Scandinavian Living Room Suite', category: 'interior-layouts', vendorId: 'v3',
    price: 149, originalPrice: null, image: imageMap['interior-layouts'],
    description: 'Complete interior design package for a modern Scandinavian living room. Includes furniture layout, material palette, lighting plan, and procurement list.',
    rating: 4.8, reviewCount: 63, downloads: 412, formats: ['PDF', 'AI', 'PSD'],
    sqft: 800, bedrooms: null, bathrooms: null, featured: true, trending: false,
  },
  {
    id: 'd3', title: 'Zen Garden Masterplan', category: 'landscape-designs', vendorId: 'v2',
    price: 199, originalPrice: 249, image: imageMap['landscape-designs'],
    description: 'Japanese-inspired garden design with zen rock garden, water features, bamboo groves, and native plantings. Complete with irrigation and drainage plans.',
    rating: 4.7, reviewCount: 45, downloads: 287, formats: ['PDF', 'DWG', 'SKP'],
    sqft: 5000, bedrooms: null, bathrooms: null, featured: false, trending: true,
  },
  {
    id: 'd4', title: 'Urban Loft Complex', category: 'apartment-blueprints', vendorId: 'v1',
    price: 499, originalPrice: 649, image: imageMap['apartment-blueprints'],
    description: '12-unit modern loft complex with mixed unit types. Industrial aesthetic with exposed concrete, steel, and glass. Full MEP coordination included.',
    rating: 4.9, reviewCount: 34, downloads: 156, formats: ['PDF', 'DWG', 'RVT', 'IFC'],
    sqft: 24000, bedrooms: null, bathrooms: null, featured: true, trending: true,
  },
  {
    id: 'd5', title: 'Open Plan Tech Office', category: 'office-architecture', vendorId: 'v5',
    price: 349, originalPrice: null, image: imageMap['office-architecture'],
    description: 'Biophilic office design for 120+ employees with collaborative zones, focus pods, living walls, and flexible hot-desking areas. Includes AV and data layouts.',
    rating: 4.6, reviewCount: 28, downloads: 198, formats: ['PDF', 'DWG', 'RVT'],
    sqft: 8500, bedrooms: null, bathrooms: null, featured: false, trending: true,
  },
  {
    id: 'd6', title: 'Villa Amara 3D Visualization', category: '3d-models', vendorId: 'v6',
    price: 179, originalPrice: 229, image: imageMap['3d-models'],
    description: 'Photorealistic 3D model of a Mediterranean-style villa. Fully textured with interiors. Compatible with 3ds Max, SketchUp, and Blender.',
    rating: 4.8, reviewCount: 92, downloads: 678, formats: ['3DS', 'SKP', 'BLEND', 'FBX'],
    sqft: 2800, bedrooms: 3, bathrooms: 2, featured: true, trending: false,
  },
  {
    id: 'd7', title: 'Full CAD Detail Library', category: 'cad-files', vendorId: 'v4',
    price: 89, originalPrice: null, image: imageMap['cad-files'],
    description: '500+ CAD details covering foundations, walls, roofs, stairs, and connections. Industry-standard blocks ready for any project.',
    rating: 4.9, reviewCount: 156, downloads: 1234, formats: ['DWG', 'DXF'],
    sqft: null, bedrooms: null, bathrooms: null, featured: false, trending: true,
  },
  {
    id: 'd8', title: 'Revit Residential Template', category: 'revit-files', vendorId: 'v4',
    price: 249, originalPrice: 299, image: imageMap['revit-files'],
    description: 'Production-ready Revit template for residential projects. Includes families, schedules, title blocks, view templates, and detail components.',
    rating: 4.7, reviewCount: 78, downloads: 456, formats: ['RVT', 'RFA'],
    sqft: null, bedrooms: null, bathrooms: null, featured: true, trending: false,
  },
  {
    id: 'd9', title: 'Coastal Contemporary Home', category: 'house-plans', vendorId: 'v6',
    price: 349, originalPrice: null, image: imageMap['house-plans'],
    description: 'Beach-front 5-bedroom residence with hurricane-rated construction, expansive decks, and ocean-view balconies. Full structural set included.',
    rating: 4.8, reviewCount: 41, downloads: 289, formats: ['PDF', 'DWG', 'RVT'],
    sqft: 4100, bedrooms: 5, bathrooms: 4, featured: false, trending: false,
  },
  {
    id: 'd10', title: 'Boutique Hotel Interior Pack', category: 'interior-layouts', vendorId: 'v3',
    price: 599, originalPrice: 799, image: imageMap['interior-layouts'],
    description: 'Complete interior design package for a 30-room boutique hotel. Lobby, rooms, restaurant, spa, and common areas. FF&E specifications included.',
    rating: 4.9, reviewCount: 19, downloads: 98, formats: ['PDF', 'AI', 'RVT'],
    sqft: 18000, bedrooms: null, bathrooms: null, featured: true, trending: true,
  },
  {
    id: 'd11', title: 'Commercial Landscape Masterplan', category: 'landscape-designs', vendorId: 'v2',
    price: 449, originalPrice: null, image: imageMap['landscape-designs'],
    description: 'Large-scale commercial property landscape design with parking lot plantings, entryway features, bioswales, and seasonal color plans.',
    rating: 4.5, reviewCount: 22, downloads: 134, formats: ['PDF', 'DWG', 'SKP'],
    sqft: 45000, bedrooms: null, bathrooms: null, featured: false, trending: false,
  },
  {
    id: 'd12', title: 'Luxury Penthouse Blueprint', category: 'apartment-blueprints', vendorId: 'v1',
    price: 399, originalPrice: 499, image: imageMap['apartment-blueprints'],
    description: 'Duplex penthouse with rooftop terrace, private elevator, floor-to-ceiling glazing, and smart home integration. Includes detailed M&E drawings.',
    rating: 4.8, reviewCount: 56, downloads: 321, formats: ['PDF', 'DWG', 'RVT'],
    sqft: 3800, bedrooms: 3, bathrooms: 3, featured: true, trending: true,
  },
  {
    id: 'd13', title: 'Co-Working Space Design', category: 'office-architecture', vendorId: 'v5',
    price: 279, originalPrice: null, image: imageMap['office-architecture'],
    description: 'Flexible co-working space design for 80+ members. Features phone booths, meeting rooms, event space, and cafe area with full branding guidelines.',
    rating: 4.7, reviewCount: 35, downloads: 213, formats: ['PDF', 'DWG'],
    sqft: 6200, bedrooms: null, bathrooms: null, featured: false, trending: false,
  },
  {
    id: 'd14', title: 'Modern Farmhouse Collection', category: '3d-models', vendorId: 'v6',
    price: 129, originalPrice: 169, image: imageMap['3d-models'],
    description: 'Set of 5 modern farmhouse 3D models in various sizes. Detailed exteriors with wrap-around porches, metal roofs, and board-and-batten siding.',
    rating: 4.6, reviewCount: 73, downloads: 489, formats: ['3DS', 'SKP', 'BLEND', 'OBJ'],
    sqft: null, bedrooms: null, bathrooms: null, featured: false, trending: true,
  },
  {
    id: 'd15', title: 'Structural Engineering CAD Set', category: 'cad-files', vendorId: 'v4',
    price: 199, originalPrice: null, image: imageMap['cad-files'],
    description: 'Comprehensive structural CAD package with steel connections, concrete details, foundation types, and retaining wall designs. PE-reviewed.',
    rating: 4.8, reviewCount: 89, downloads: 567, formats: ['DWG', 'DXF', 'PDF'],
    sqft: null, bedrooms: null, bathrooms: null, featured: true, trending: false,
  },
  {
    id: 'd16', title: 'BIM Office Template', category: 'revit-files', vendorId: 'v4',
    price: 329, originalPrice: 399, image: imageMap['revit-files'],
    description: 'Complete Revit template for commercial office projects. Includes MEP families, ceiling grid systems, partition types, and coordinated schedules.',
    rating: 4.9, reviewCount: 64, downloads: 378, formats: ['RVT', 'RFA', 'IFC'],
    sqft: null, bedrooms: null, bathrooms: null, featured: false, trending: true,
  },
  {
    id: 'd17', title: 'Construction Detail Atlas', category: 'construction-drawings', vendorId: 'v4',
    price: 159, originalPrice: null, image: imageMap['construction-drawings'],
    description: '300+ construction details compliant with international building codes. Covering walls, roofs, foundations, waterproofing, and thermal bridging solutions.',
    rating: 4.7, reviewCount: 112, downloads: 890, formats: ['PDF', 'DWG'],
    sqft: null, bedrooms: null, bathrooms: null, featured: true, trending: true,
  },
  {
    id: 'd18', title: 'Minimalist Tiny House', category: 'house-plans', vendorId: 'v1',
    price: 99, originalPrice: 149, image: imageMap['house-plans'],
    description: 'Efficient 600 sq ft tiny house with loft bedroom, compact kitchen, and fold-away furniture solutions. Perfect for ADUs and guest houses.',
    rating: 4.5, reviewCount: 134, downloads: 1023, formats: ['PDF', 'DWG'],
    sqft: 600, bedrooms: 1, bathrooms: 1, featured: false, trending: true,
  },
];

export const reviews = [
  { id: 'r1', designId: 'd1', user: 'Alex M.', rating: 5, date: '2025-12-01', text: 'Incredible quality drawings. The hillside grading details saved us weeks of work. Highly recommend Studio Arcana!' },
  { id: 'r2', designId: 'd1', user: 'Sarah K.', rating: 5, date: '2025-11-15', text: 'Used these plans for our dream home build. The contractor was impressed with the level of detail. Worth every penny.' },
  { id: 'r3', designId: 'd1', user: 'James L.', rating: 4, date: '2025-10-28', text: 'Great plans overall. Would have loved more MEP coordination notes, but the architectural set is top-notch.' },
  { id: 'r4', designId: 'd2', user: 'Emma R.', rating: 5, date: '2025-12-10', text: 'The material palette alone was worth the purchase. My client absolutely loved the Scandinavian aesthetic.' },
  { id: 'r5', designId: 'd2', user: 'Chris P.', rating: 4, date: '2025-11-22', text: 'Clean, well-organized files. The furniture sourcing list was a great bonus. Will buy from InSpace again.' },
  { id: 'r6', designId: 'd4', user: 'Maria G.', rating: 5, date: '2025-12-05', text: 'This loft complex plan helped us secure financing. The renderings and floor plans were investor-ready.' },
  { id: 'r7', designId: 'd6', user: 'Tom S.', rating: 5, date: '2025-11-30', text: 'Best 3D model I have ever purchased. The textures are incredibly detailed and it renders beautifully in V-Ray.' },
  { id: 'r8', designId: 'd7', user: 'Nina H.', rating: 5, date: '2025-12-08', text: 'The CAD detail library is a must-have for any practice. Saved me hundreds of hours of drafting. Excellent value.' },
  { id: 'r9', designId: 'd10', user: 'David W.', rating: 5, date: '2025-12-12', text: 'Phenomenal hotel interior package. The level of detail from room layouts to FF&E schedules is exceptional.' },
  { id: 'r10', designId: 'd12', user: 'Lisa C.', rating: 5, date: '2025-11-20', text: 'The penthouse blueprint exceeded expectations. Smart home integration layouts were a nice touch.' },
];

export function getDesignsByCategory(categoryId) {
  return designs.filter(d => d.id !== undefined && d.category === categoryId);
}

export function getDesignsByVendor(vendorId) {
  return designs.filter(d => d.vendorId === vendorId);
}

export function getVendorById(vendorId) {
  return vendors.find(v => v.id === vendorId);
}

export function getDesignById(designId) {
  return designs.find(d => d.id === designId);
}

export function getReviewsByDesign(designId) {
  return reviews.filter(r => r.designId === designId);
}

export function getFeaturedDesigns() {
  return designs.filter(d => d.featured);
}

export function getTrendingDesigns() {
  return designs.filter(d => d.trending);
}

export function searchDesigns(query) {
  const lower = query.toLowerCase();
  return designs.filter(d =>
    d.title.toLowerCase().includes(lower) ||
    d.description.toLowerCase().includes(lower) ||
    d.category.toLowerCase().includes(lower)
  );
}
