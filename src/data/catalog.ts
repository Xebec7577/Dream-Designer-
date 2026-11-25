export type ProjectCategory =
  | "Residential"
  | "Commercial"
  | "Architecture"
  | "Interior Design"
  | "3D Visualisation";

export const IMAGES = {
  villa: "/images/concepts/concept-twilight-villa.jpg",
  hero: "/images/concepts/hero-courtyard-threshold.jpg",
  living: "/images/concepts/concept-living-sanctuary.jpg",
  material: "/images/concepts/concept-material-palette.jpg",
  kitchen: "/images/concepts/concept-kitchen-dining.jpg",
  staircase: "/images/concepts/concept-sculptural-staircase.jpg",
  powder: "/images/concepts/concept-powder-lighting.jpg",
  studio: "/images/concepts/studio-atmosphere.jpg",
  office: "/images/concepts/concept-timber-office.jpg",
  masterSuite: "/images/concepts/concept-master-suite.jpg",
  reelAtrium: "/images/concepts/reel-villa-atrium.jpg",
  reelWardrobe: "/images/concepts/reel-bespoke-wardrobe.jpg",
  panoLiving: "/images/concepts/pano-living-360.jpg",
  panoKitchen: "/images/concepts/pano-kitchen-360.jpg",
  panoMaster: "/images/concepts/pano-master-360.jpg",
  floorPlan: "/images/concepts/architectural-floorplan.jpg",
} as const;

export interface HomeModel {
  id: string;
  name: string;
  subtitle: string;
  meta: string;
  img: string;
  tourRoom: string;
}

export const HOME_MODELS: HomeModel[] = [
  { id: "villa", name: "The Linear Villa", subtitle: "Two-storey cantilevered travertine & vertical oak residence.", meta: "Independent Plot  ·  Architecture + Interiors + 3D", img: IMAGES.villa, tourRoom: "exterior" },
  { id: "living", name: "Courtyard Living Salon", subtitle: "Monolithic stone hearth opening directly onto a sunlit garden court.", meta: "Residential Interior  ·  Bespoke Millwork & Lighting", img: IMAGES.panoLiving, tourRoom: "living" },
  { id: "kitchen", name: "Culinary & Dining Hall", subtitle: "Honed travertine island seamlessly paired with flush walnut cabinetry.", meta: "Kitchen & Dining  ·  Custom Joinery & Ergonomics", img: IMAGES.panoKitchen, tourRoom: "kitchen" },
  { id: "master", name: "Master Suite & Dressing", subtitle: "Fluted oak sanctuary with smoked-bronze walk-in glass wardrobe.", meta: "Private Suite  ·  Acoustic Panelling & Cove Glow", img: IMAGES.panoMaster, tourRoom: "master" },
  { id: "office", name: "Timber Executive Studio", subtitle: "Calm commercial workplace crafted in slatted oak & limestone.", meta: "Commercial Interior  ·  Leadership & Client Suites", img: IMAGES.office, tourRoom: "office" },
];

export interface TourRoom {
  id: string;
  name: string;
  meta: string;
  img: string;
  portals: { label: string; targetRoom: string; x: number; y: number }[];
}

export const TOUR_ROOMS: TourRoom[] = [
  {
    id: "living",
    name: "Living Salon & Courtyard",
    meta: "Ground Floor · Double-Height Lounge · High-Res Spatial View",
    img: IMAGES.panoLiving,
    portals: [
      { label: "Courtyard Garden", targetRoom: "courtyard", x: 20, y: 54 },
      { label: "Kitchen & Dining", targetRoom: "kitchen", x: 84, y: 62 },
    ],
  },
  {
    id: "kitchen",
    name: "Culinary & Dining Hall",
    meta: "Ground Floor · Travertine Island & 8-Seat Dining",
    img: IMAGES.panoKitchen,
    portals: [
      { label: "Living Salon", targetRoom: "living", x: 56, y: 54 },
      { label: "Master Suite", targetRoom: "master", x: 35, y: 44 },
    ],
  },
  {
    id: "master",
    name: "Master Suite & Glass Wardrobe",
    meta: "Upper Wing · Fluted Oak & Smoked-Bronze Dressing",
    img: IMAGES.panoMaster,
    portals: [
      { label: "Culinary Hall", targetRoom: "kitchen", x: 26, y: 52 },
      { label: "Executive Studio", targetRoom: "office", x: 82, y: 58 },
    ],
  },
  {
    id: "exterior",
    name: "Linear Twilight Exterior",
    meta: "Full Villa Massing · Reflection Pool & Cantilevered Wings",
    img: IMAGES.villa,
    portals: [
      { label: "Step Inside Living", targetRoom: "living", x: 50, y: 56 },
      { label: "Upper Master Suite", targetRoom: "master", x: 22, y: 36 },
    ],
  },
  {
    id: "courtyard",
    name: "Courtyard Threshold Gallery",
    meta: "Indoor-Outdoor Transition · Vertical Oak Sun-Louvres",
    img: IMAGES.hero,
    portals: [
      { label: "Living Salon", targetRoom: "living", x: 40, y: 52 },
      { label: "Villa Exterior", targetRoom: "exterior", x: 64, y: 48 },
    ],
  },
  {
    id: "office",
    name: "Timber Executive Studio",
    meta: "Commercial Suite · Acoustic Fluted Oak & Limestone",
    img: IMAGES.office,
    portals: [
      { label: "Master Suite", targetRoom: "master", x: 24, y: 56 },
      { label: "Living Salon", targetRoom: "living", x: 78, y: 58 },
    ],
  },
];

export type ShowroomMode = "exterior" | "interior" | "floorplan";

export interface ShowroomSpot {
  id: string;
  x: number;
  y: number;
  title: string;
  desc: string;
  tourRoom: string;
}

export const SHOWROOM_SPOTS: Record<ShowroomMode, ShowroomSpot[]> = {
  exterior: [
    { id: "ex1", x: 24, y: 34, title: "Cantilevered Travertine Wing", desc: "Honed stone upper suite volume projecting over the landscaped garden court.", tourRoom: "master" },
    { id: "ex2", x: 50, y: 48, title: "Double-Height Glass Atrium", desc: "Floor-to-ceiling bronze-framed glazing connecting the living lounge to the water court.", tourRoom: "living" },
    { id: "ex3", x: 75, y: 36, title: "Vertical Oak Sun-Louvres", desc: "Rhythmic timber fins filtering intense North Indian sun while maintaining privacy.", tourRoom: "courtyard" },
    { id: "ex4", x: 50, y: 78, title: "Basalt Reflection Pool", desc: "Dark stone water court cooling summer breezes and mirroring the twilight elevation.", tourRoom: "exterior" },
  ],
  interior: [
    { id: "in1", x: 20, y: 52, title: "Sunlit Courtyard Threshold", desc: "Sliding bronze glazing opens the entire living salon onto the private planted court.", tourRoom: "courtyard" },
    { id: "in2", x: 50, y: 24, title: "Sculptural Brass Luminaire", desc: "Statement architectural chandelier anchoring the double-height ceiling plane.", tourRoom: "living" },
    { id: "in3", x: 72, y: 56, title: "Monolithic Travertine Hearth", desc: "Vein-cut honed stone fireplace integrated cleanly into fluted oak panelling.", tourRoom: "living" },
    { id: "in4", x: 50, y: 70, title: "Grounded Linen Lounge", desc: "Low-profile natural linen seating and monolithic stone coffee table.", tourRoom: "kitchen" },
  ],
  floorplan: [
    { id: "fp1", x: 26, y: 25, title: "Master Bedroom Suite", desc: "North-west private suite with fluted oak headboard wall and garden views.", tourRoom: "master" },
    { id: "fp2", x: 21, y: 49, title: "Walk-In Glass Wardrobe", desc: "Smoked-bronze glazing, backlit walnut millwork, and travertine island.", tourRoom: "master" },
    { id: "fp3", x: 27, y: 73, title: "Executive Timber Study", desc: "Acoustic fluted-oak home office overlooking the forecourt.", tourRoom: "office" },
    { id: "fp4", x: 50, y: 48, title: "Central Courtyard Pool", desc: "Shaded colonnade and sunken dark-stone pool bringing daylight to every wing.", tourRoom: "courtyard" },
    { id: "fp5", x: 76, y: 26, title: "Monolithic Kitchen", desc: "Full-height travertine island and flush walnut cabinetry.", tourRoom: "kitchen" },
    { id: "fp6", x: 76, y: 51, title: "Living & Formal Dining", desc: "Dual-aspect entertaining pavilion opening onto the courtyard colonnade.", tourRoom: "living" },
  ],
};

export interface ConceptStudy {
  slug: string;
  title: string;
  isConceptVisual: boolean;
  categories: ProjectCategory[];
  typology: string;
  shortDescription: string;
  coverImage: string;
  tourRoom: string;
  secondaryImages: { src: string; caption: string }[];
  overview: string;
  designConcept: string;
  materialAndLighting: string[];
  spatialPlanning: string;
  whatsappContext: string;
}

export const STUDIES: ConceptStudy[] = [
  { slug: "the-linear-twilight-villa", title: "The Linear Twilight Villa", isConceptVisual: true, categories: ["Residential", "Architecture", "3D Visualisation"], typology: "Two-Storey Luxury Residence", shortDescription: "Cantilevered honed travertine wings, vertical oak louvres, and a double-height glass atrium.", coverImage: IMAGES.villa, tourRoom: "exterior", secondaryImages: [{ src: IMAGES.panoLiving, caption: "Living Salon opening to the garden courtyard." }, { src: IMAGES.panoMaster, caption: "Upper-floor master suite with smoked-bronze walk-in wardrobe." }], overview: "Demonstrates how bold cantilevered stone volumes frame a deeply private, light-filled North Indian residence.", designConcept: "Two sculptural travertine blocks hover above transparent ground-floor living pavilions.", materialAndLighting: ["Honed travertine exterior cladding", "Vertical natural oak sun-screening louvres", "Warm 2700K recessed soffit illumination", "Dark basalt reflection pool"], spatialPlanning: "Ground-level social zones open seamlessly to garden courts while upper suites enjoy shaded private balconies.", whatsappContext: "Hello Dream Designers, I would like to discuss a luxury residence project inspired by The Linear Twilight Villa." },
  { slug: "courtyard-threshold-residence", title: "Courtyard Threshold Study", isConceptVisual: true, categories: ["Residential", "Architecture", "3D Visualisation"], typology: "Residential Architecture", shortDescription: "Indoor-outdoor threshold pairing travertine planes with vertical oak louvres.", coverImage: IMAGES.hero, tourRoom: "courtyard", secondaryImages: [{ src: IMAGES.material, caption: "Travertine, fluted oak, lime plaster, and bronze junction." }, { src: IMAGES.staircase, caption: "Cantilevered stone treads and vertical bronze rods." }], overview: "Explores how transitional thresholds mediate heat, privacy, and morning light.", designConcept: "Proportion, shadow rhythm, and monolithic stone planes carry the spatial story.", materialAndLighting: ["Honed warm travertine walls", "Vertical oak louvres", "Matte limestone flooring", "Recessed linear ceiling washes"], spatialPlanning: "Living zones open onto a shaded internal court via slender bronze-framed sliding glazing.", whatsappContext: "Hello Dream Designers, I would like to discuss a courtyard residence project." },
  { slug: "monolith-living-sanctuary", title: "Monolith Living Sanctuary", isConceptVisual: true, categories: ["Residential", "Interior Design"], typology: "Residential Interior", shortDescription: "Calm living room anchored by a low honed travertine hearth and fluted oak joinery.", coverImage: IMAGES.living, tourRoom: "living", secondaryImages: [{ src: IMAGES.panoLiving, caption: "Panoramic living salon and courtyard connection." }], overview: "Restrained tonal layering and tailored millwork create an unhurried lounge for family hosting.", designConcept: "Low grounded silhouettes highlight architectural volume and natural timber grain.", materialAndLighting: ["Hand-troweled ivory lime plaster", "Monolithic travertine plinth hearth", "Floor-to-ceiling fluted oak panelling", "Sheer linen daylight drapery"], spatialPlanning: "Axial seating balances conversation clusters with unobstructed circulation.", whatsappContext: "Hello Dream Designers, I am interested in residential interior design." },
  { slug: "culinary-and-dining-gallery", title: "Culinary & Dining Gallery", isConceptVisual: true, categories: ["Residential", "Interior Design", "3D Visualisation"], typology: "Kitchen & Dining Interior", shortDescription: "Monolithic stone island transitioning into a warm walnut dining hall.", coverImage: IMAGES.kitchen, tourRoom: "kitchen", secondaryImages: [{ src: IMAGES.panoKitchen, caption: "Panoramic kitchen island and 8-seater timber dining hall." }], overview: "Utility concealed behind flush oak and walnut cabinetry keeps the room serene.", designConcept: "Integrating culinary prep and dining into one warm material envelope eliminates clutter.", materialAndLighting: ["Full-height travertine monolithic island", "Quarter-cut oak & walnut joinery", "Linear brushed bronze pendant", "Matte lime-washed walls"], spatialPlanning: "Clear work-triangle ergonomics separate wet prep from the social island edge.", whatsappContext: "Hello Dream Designers, I would like to enquire about kitchen and dining interior design." },
  { slug: "serene-master-suite", title: "Fluted Oak Master Suite", isConceptVisual: true, categories: ["Residential", "Interior Design"], typology: "Private Bedroom Sanctuary", shortDescription: "Warm cove grazing light across a fluted oak headboard niche and smoked-bronze wardrobe.", coverImage: IMAGES.masterSuite, tourRoom: "master", secondaryImages: [{ src: IMAGES.panoMaster, caption: "Panoramic master suite & walk-in dressing gallery." }], overview: "A quiet retreat designed around tactile calm, warm recessed lighting, and natural timber.", designConcept: "Recessed headboard niche framed in lime plaster turns evening lighting into a gentle halo.", materialAndLighting: ["Fluted oak acoustic feature wall", "Solid honed travertine pedestals", "Lime plaster tray ceiling", "Smoked-bronze walk-in wardrobe"], spatialPlanning: "Generous circulation links the sleeping zone seamlessly to a private dressing gallery.", whatsappContext: "Hello Dream Designers, I would like to discuss bedroom and wardrobe interior design." },
  { slug: "fluted-timber-executive-office", title: "Fluted Timber Executive Suite", isConceptVisual: true, categories: ["Commercial", "Interior Design", "3D Visualisation"], typology: "Commercial Workplace", shortDescription: "Quiet commercial workspace uniting acoustic fluted oak panelling and limestone floors.", coverImage: IMAGES.office, tourRoom: "office", secondaryImages: [{ src: IMAGES.studio, caption: "Studio material curation and daylight control." }], overview: "Designed for boutique leadership suites and client-facing studios seeking acoustic calm.", designConcept: "A continuous plane of fluted oak anchors the workspace beneath recessed linear lighting.", materialAndLighting: ["Acoustic fluted oak wall panelling", "Large-format honed limestone flooring", "Walnut & bronze executive desk", "Recessed linear ceiling illumination"], spatialPlanning: "Distinct zones separate focused desk work from an informal client lounge.", whatsappContext: "Hello Dream Designers, I am planning a commercial or office interior project." },
];

export function getStudyBySlug(slug: string): ConceptStudy | undefined {
  return STUDIES.find((s) => s.slug === slug);
}

export const REELS_DATA = [
  { id: "reel-atrium", title: "Double-Height Atrium & Daylight Geometry", duration: "0:24", tag: "Architecture Reel", img: IMAGES.reelAtrium, desc: "Travertine columns, jali screens, and a sculptural spiral stair turning northern Indian sunlight into moving architectural art.", tags: ["Architecture", "Daylight", "Travertine"] },
  { id: "reel-wardrobe", title: "Bespoke Walk-In Dressing & Smoked Bronze", duration: "0:19", tag: "Interior Detailing", img: IMAGES.reelWardrobe, desc: "Fluted walnut millwork, smoked bronze glass doors, concealed vertical LED channels, and a carved travertine island.", tags: ["Millwork", "Lighting", "Interiors"] },
  { id: "reel-powder", title: "Powder Room Stone & Grazing Light", duration: "0:16", tag: "Material Study", img: IMAGES.powder, desc: "Monolithic floating stone vanity against vertical fluted oak with warm cove grazing illumination.", tags: ["Detailing", "Stone", "Hardware"] },
  { id: "reel-stair", title: "Cantilevered Travertine Staircase", duration: "0:21", tag: "3D Visualisation", img: IMAGES.staircase, desc: "Floating stone treads suspended beside full-height bronze balustrade rods under a clerestory light well.", tags: ["3D Visuals", "Circulation", "Minimal"] },
];

export const SERVICE_DETAILS = [
  {
    id: "architecture", num: "01", title: "Architecture", tagline: "Form, Climate & Proportion", img: IMAGES.villa, tourRoom: "exterior",
    summary: "Site-responsive residential and selected commercial architecture grounded in orientation, daylight control, and timeless massing.",
    tabs: [
      { key: "Spatial Strategy", text: "Plot orientation, wind paths, Vastu/functional preferences, and privacy gradients resolved before drawing a single elevation." },
      { key: "Material & Envelope", text: "Monolithic stone, shaded deep verandahs, and vertical timber louvres calibrated for North Indian climates." },
      { key: "Deliverables", text: "Concept massing, floor plans, facade elevations, structural coordination drawings, and consultation scope confirmed per brief." },
    ],
  },
  {
    id: "interiors", num: "02", title: "Interior Design", tagline: "Tactile Calm & Bespoke Craft", img: IMAGES.panoLiving, tourRoom: "living",
    summary: "End-to-end residential and boutique commercial interiors uniting custom joinery, natural materials, and layered architectural lighting.",
    tabs: [
      { key: "Spatial Strategy", text: "Furniture zoning, sightline orchestration, kitchen/dining ergonomics, and concealed architectural storage." },
      { key: "Material & Envelope", text: "Curated boards of honed travertine, fluted oak, walnut veneers, lime plaster, linen textiles, and brushed bronze." },
      { key: "Deliverables", text: "Interior layouts, false-ceiling & lighting plans, custom millwork elevations, and material specification schedules." },
    ],
  },
  {
    id: "visualisation", num: "03", title: "3D Visualisation", tagline: "Certainty Before Construction", img: IMAGES.panoKitchen, tourRoom: "kitchen",
    summary: "Photorealistic 3D architectural renders and interactive spatial tours so you experience light, scale, and finishes before site work begins.",
    tabs: [
      { key: "Spatial Strategy", text: "Camera-accurate perspective studies and interactive walkthroughs allowing families and commercial owners to refine proportions early." },
      { key: "Material & Envelope", text: "Physically believable stone veining, wood grain, daylight shafts, and evening cove lighting tested prior to procurement." },
      { key: "Deliverables", text: "High-resolution 3D perspectives, interactive room tours, and material option comparisons." },
    ],
  },
];
