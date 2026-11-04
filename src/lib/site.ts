import { images, type SiteImage } from "@/lib/images";

export const disclaimer =
  "Vastu guidance on this website is traditional advice about a building and how it is used. It does not replace a doctor, a financial adviser, a lawyer, or an engineer. If someone describes a change after a visit, that is their own experience. It is not proof, and no result is promised.";

export type NavItem = { href: string; label: string };

export const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Sanjeev Jain" },
  { href: "/approach", label: "Vastu Approach" },
  { href: "/expertise", label: "Services" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact" },
];

export const propertyTypeValues = [
  "residential_home",
  "apartment",
  "commercial",
  "industrial",
  "plot",
] as const;

export const propertyTypes: { value: (typeof propertyTypeValues)[number]; label: string }[] = [
  { value: "residential_home", label: "Residential home" },
  { value: "apartment", label: "Apartment" },
  { value: "commercial", label: "Commercial property" },
  { value: "industrial", label: "Industrial property" },
  { value: "plot", label: "Plot / Under construction" },
];

export const concernValues = [
  "financial_business",
  "health_wellbeing",
  "family_residential",
  "property_planning",
  "multiple",
  "other",
] as const;

export const concernCategories: { value: (typeof concernValues)[number]; label: string }[] = [
  { value: "financial_business", label: "Financial and business concerns" },
  { value: "health_wellbeing", label: "Health and wellbeing" },
  { value: "family_residential", label: "Family and residential concerns" },
  { value: "property_planning", label: "Property planning" },
  { value: "multiple", label: "Multiple concerns" },
  { value: "other", label: "Other" },
];

export const modeValues = ["on_site", "online", "initial_discussion"] as const;

export const consultationModes: { value: (typeof modeValues)[number]; label: string }[] = [
  { value: "on_site", label: "On-site visit" },
  { value: "online", label: "Online consultation" },
  { value: "initial_discussion", label: "Initial discussion" },
];

export const leadStatusValues = [
  "new",
  "contacted",
  "qualified",
  "consultation_scheduled",
  "assessment_completed",
  "recommendations_provided",
  "closed",
] as const;

export const leadStatuses: { value: (typeof leadStatusValues)[number]; label: string }[] = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "qualified", label: "Qualified" },
  { value: "consultation_scheduled", label: "Consultation scheduled" },
  { value: "assessment_completed", label: "Assessment completed" },
  { value: "recommendations_provided", label: "Recommendations provided" },
  { value: "closed", label: "Closed" },
];

export const caseCategoryValues = [
  "residential",
  "business",
  "financial",
  "health",
  "structural",
] as const;

export const caseCategories: { value: (typeof caseCategoryValues)[number]; label: string }[] = [
  { value: "residential", label: "Residential" },
  { value: "business", label: "Business" },
  { value: "financial", label: "Financial concerns" },
  { value: "health", label: "Health and wellbeing" },
  { value: "structural", label: "Structural corrections" },
];

export const consentValues = ["pending", "granted", "declined"] as const;

export type ProcessStep = {
  number: string;
  title: string;
  direction: "N" | "E" | "S" | "W";
  text: string;
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Share Your Concern",
    direction: "N",
    text: "Tell us what is on your mind, and a little about the property. The conversation starts before any suggestion.",
  },
  {
    number: "02",
    title: "Discuss Your Property",
    direction: "E",
    text: "We talk through the layout, how the place is used, and any plans you already have.",
  },
  {
    number: "03",
    title: "Personal Property Visit",
    direction: "S",
    text: "Mr. Sanjeev Jain visits the property and studies it himself. A diagram on a screen cannot do this.",
  },
  {
    number: "04",
    title: "Receive Practical Guidance",
    direction: "W",
    text: "You receive suggestions for that property, explained in plain language, including what a builder may need to check.",
  },
];

export type Service = {
  slug: string;
  title: string;
  cardTitle: string;
  summary: string;
  image: SiteImage;
  lead: string;
  paragraphs: string[];
  points: { title: string; text: string }[];
  boundary: string;
  seoTitle: string;
  seoDescription: string;
};

export const services: Service[] = [
  {
    slug: "residential-vastu",
    title: "Residential Vastu",
    cardTitle: "Residential Vastu",
    summary: "A personal look at a house, flat, or plot, based on its own layout.",
    image: images.residence,
    lead: "This visit is for a house, flat, or plot. Mr. Sanjeev Jain looks at that home’s entrance, rooms and surroundings, then explains what he sees in plain language.",
    paragraphs: [
      "Residential work begins with the household’s questions and the plan of the property. Two homes on the same street can ask for different attention because their entrances, room relationships, and daily use are not the same.",
      "During a visit, Sanjeev Jain looks at orientation, the sequence of spaces, and the parts of the home connected to the concern you bring. Suggestions are then explained in ordinary language, with a preference for measures that can actually be carried out.",
      "If you are planning a new home or altering an existing one, bring whatever drawings you have. A north-marked floor plan is useful. The visit still matters, because a drawing alone does not show how the place is lived in.",
    ],
    points: [
      {
        title: "Who may find this useful",
        text: "Families in a house or flat, and people planning a plot or a home that is still being built.",
      },
      {
        title: "What is studied",
        text: "The entrance, the direction of the plot, the centre of the plan, the main rooms, and how the household actually uses them.",
      },
      {
        title: "What to prepare",
        text: "A floor plan with north marked, if you have one, and a short note about the room or question that matters most. Photographs help. They are not required.",
      },
      {
        title: "After the visit",
        text: "Mr. Sanjeev Jain explains practical guidance for that home. Some ideas are about how a room is used. Building work, if suggested, should be checked by an architect or engineer. Remedies are priced separately.",
      },
      {
        title: "How to book",
        text: "Use the enquiry form. A personal visit is ₹10,000. Travel, if needed, is discussed separately. A visit is confirmed only after the consultancy replies.",
      },
    ],
    boundary:
      "Residential guidance is spatial. Building alterations should be checked with an architect or structural engineer before any wall, beam, or service is changed.",
    seoTitle: "Home Vastu consultation",
    seoDescription:
      "A home Vastu consultation with Mr. Sanjeev Jain. He studies your house or flat in person and explains practical guidance for that layout.",
  },
  {
    slug: "business-vastu",
    title: "Business & Commercial Vastu",
    cardTitle: "Business & Commercial Vastu",
    summary: "A personal look at an office, shop, or other workplace.",
    image: images.commercial,
    lead: "This visit is for an office, shop, or other business space. The layout and the way people use it are studied. It is not a promise of profit.",
    paragraphs: [
      "Offices, shops, clinics, and other commercial premises are assessed as working environments. The visit considers orientation and layout alongside how staff, clients, and goods actually move.",
      "Recommendations may concern an entrance, the placement of a cabin or cash desk, storage, or the relationship between public and private rooms. They are specific to the premises. A suggestion made for one office is not a template for the next.",
      "This consultation does not forecast turnover, and it does not replace commercial, tax, or legal advice. It offers a traditional spatial reading of the property you use for work.",
    ],
    points: [
      {
        title: "Who may find this useful",
        text: "Owners and managers of offices, shops, clinics, and other workplaces who want the premises looked at before they spend on a further fit-out.",
      },
      {
        title: "What is studied",
        text: "The entrance, the path people walk, cabins or counters, storage, and the rooms where clients are received.",
      },
      {
        title: "What to prepare",
        text: "A plan of the premises, if you have one, and a note about how staff and visitors use the space. You do not need to share accounts or turnover.",
      },
      {
        title: "After the visit",
        text: "You receive spatial guidance for that workplace. It is not a forecast of sales. Any building change should be checked by the people responsible for the structure and the lease.",
      },
      {
        title: "How to book",
        text: "Send an enquiry with the city and the type of premises. The on-site visit is ₹10,000. Travel and any later remedy are separate.",
      },
    ],
    boundary:
      "Commercial Vastu guidance is not a business-performance guarantee. Financial and legal decisions belong with the professionals qualified to give them.",
    seoTitle: "Vastu for office and business",
    seoDescription:
      "A business Vastu consultation for offices and shops. Mr. Sanjeev Jain studies the workplace in person. Results are not guaranteed.",
  },
  {
    slug: "health-wellbeing",
    title: "Health & Wellbeing",
    cardTitle: "Health & Wellbeing",
    summary: "Traditional spatial guidance for people seeking a more considered living environment.",
    image: images.courtyard,
    lead: "Some clients ask for a more settled home environment while they are also looking after their health. The consultation can consider the spaces they live in. It does not treat illness.",
    paragraphs: [
      "Health-related enquiries are heard with care and kept within the limits of spatial guidance. The visit looks at the rooms, light, placement, and orientation of the property connected to the concern.",
      "Suggestions, when they are made, concern the environment: how a room is used, what might be adjusted, and whether a modest change is preferable to building work. They are not prescriptions, therapies, or diagnoses.",
      "If you are unwell, continue with your physician. Tell the consultancy only what you are comfortable sharing about the spaces involved. Private health details sent with an enquiry are stored so the visit can be prepared, and they are not published.",
    ],
    points: [
      {
        title: "Who may find this useful",
        text: "People who want the rooms they live in to be looked at with care. This is for the house, not for a medical condition.",
      },
      {
        title: "What is studied",
        text: "Bedrooms, kitchens, and rooms where someone spends long hours, including light, placement and direction.",
      },
      {
        title: "What to prepare",
        text: "Share only what you are comfortable saying about the rooms involved. A plan is useful. Private health details are not published.",
      },
      {
        title: "After the visit",
        text: "Suggestions, if any, are about the environment. They are not a diagnosis or a treatment. Continue with your doctor for health decisions.",
      },
      {
        title: "How to book",
        text: "Use the enquiry form and say that the question is about the living environment. The visit fee is ₹10,000. Remedies are priced after the visit.",
      },
    ],
    boundary:
      "This consultation does not diagnose, treat, or cure any condition. It does not replace medical care.",
    seoTitle: "Vastu and a calmer home",
    seoDescription:
      "A Vastu visit about the rooms you live in. It is not medical care and does not treat illness.",
  },
  {
    slug: "financial-professional-guidance",
    title: "Financial & Professional Concerns",
    cardTitle: "Financial & Professional Concerns",
    summary: "Personalised Vastu assessment for clients seeking guidance regarding financial and professional concerns.",
    image: images.modernHome,
    lead: "Clients sometimes arrive with a question about work, business stability, or the rooms in which money and decisions are handled. The response is a property assessment, not financial advice.",
    paragraphs: [
      "Sanjeev Jain’s consultations include people who want the premises connected to their work or finances to be looked at individually. The visit identifies spatial points that relate to the concern and suggests measures for that property.",
      "A recommendation may be modest, such as a change in how a room is used, or it may involve building work. Remedy costs are separate from the consultation fee and are known only after the assessment. There is no promised ceiling, and there is no promised financial result.",
      "Bring the question you actually have, and the plans of the property it relates to. The consultation will not tell you where to invest, how to file tax, or what a business decision should be.",
    ],
    points: [
      {
        title: "Who may find this useful",
        text: "People who want the rooms connected with work or money to be studied. The answer is about the property, not about an investment.",
      },
      {
        title: "What is studied",
        text: "A study, accounts room, shop, or home office, and how that room sits in the rest of the plan.",
      },
      {
        title: "What to prepare",
        text: "Bring the actual question and a plan of the property it relates to. You do not need to share bank details or tax papers.",
      },
      {
        title: "After the visit",
        text: "You leave with spatial guidance for that place. Where to invest, how to file tax, or what a business decision should be is outside this consultation.",
      },
      {
        title: "How to book",
        text: "Describe the room and the concern on the enquiry form. The personal visit is ₹10,000. There is no promised financial result, and remedy costs are separate.",
      },
    ],
    boundary:
      "This consultation does not provide investment, tax, lending, or legal advice, and it does not promise wealth or professional success.",
    seoTitle: "Vastu for work and money rooms",
    seoDescription:
      "A Vastu consultation about the rooms where you work and handle money. It is not financial advice and does not promise wealth.",
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export type Faq = {
  id: string;
  question: string;
  answer: string;
  sortOrder: number;
};

export const fallbackFaqs: Faq[] = [
  {
    id: "what-is-vastu",
    question: "What is Vastu Shastra?",
    answer:
      "Vastu Shastra is a traditional Indian way of looking at a building: its layout, its directions, and how the rooms are arranged. Mr. Sanjeev Jain uses it as practical guidance for one property at a time. It does not replace a doctor, a financial adviser, a lawyer, or an engineer.",
    sortOrder: 1,
  },
  {
    id: "how-consultation-works",
    question: "How does a Vastu consultation work?",
    answer:
      "You share your concern. Mr. Sanjeev Jain visits the property, looks at the layout and directions, and then explains practical guidance for that place. The suggestions come from the visit. The same chart is not copied onto every home.",
    sortOrder: 2,
  },
  {
    id: "home-check",
    question: "What does a Vastu consultant check in a home?",
    answer:
      "Mr. Sanjeev Jain looks at the entrance, the direction of the plot, the centre of the plan, and the rooms connected to your question. He also notes how the household uses those rooms and what sits around the property. A checklist on a website cannot do this for you.",
    sortOrder: 3,
  },
  {
    id: "on-site-visit",
    question: "What happens during an on-site visit?",
    answer:
      "The visit is a personal assessment. You can walk through the spaces related to your concern, explain how the place is used, and review drawings if you have them. Observations and suggestions are then explained in practical terms. A minute-by-minute script is not fixed, because properties differ.",
    sortOrder: 3,
  },
  {
    id: "fee",
    question: "How much does a Vastu consultation cost?",
    answer:
      "A personal on-site visit by Mr. Sanjeev Jain is ₹10,000. Travel, if needed, is discussed separately. Any remedy is priced after the visit. Many simpler remedies may cost around ₹5,000–₹6,000 or less. That is not a maximum. Large building work can cost more.",
    sortOrder: 4,
  },
  {
    id: "structural",
    question: "Do I need to make major changes to my house?",
    answer:
      "Not always. Some suggestions are about how a room is used. Others may need building work. You are told which is which. Any wall or structure should be checked by an architect or engineer before work starts.",
    sortOrder: 5,
  },
  {
    id: "affordable",
    question: "Can Vastu recommendations be practical and affordable?",
    answer:
      "The practice looks first for measures that are practical to carry out. Clients often hope for modest corrections, and that hope is taken seriously. It is not a promise that every property can be addressed within a particular budget. Structural work can cost more. Remedy costs vary with the recommendation and are separate from the ₹10,000 visit.",
    sortOrder: 6,
  },
  {
    id: "floor-plan",
    question: "Can I share my floor plan before a visit?",
    answer:
      "Yes. A plan that shows north is useful, and you can attach it to the enquiry form. You can still enquire if you do not have one. The visit is still needed, because a drawing does not show how the place is lived in.",
    sortOrder: 7,
  },
  {
    id: "remote",
    question: "Can I book a consultation remotely?",
    answer:
      "The primary consultation is an on-site visit, because the property is assessed in person. You can request an initial discussion through the form. An online consultation is available only when the consultancy has enabled it. An online conversation is not offered as a full substitute for seeing a property that needs to be visited.",
    sortOrder: 8,
  },
  {
    id: "duration",
    question: "How long does the assessment take?",
    answer:
      "There is no single duration. It depends on the property and the questions you bring. The likely length is confirmed when the visit is arranged.",
    sortOrder: 9,
  },
  {
    id: "office",
    question: "Can Vastu guidance be given for an office?",
    answer:
      "Yes. Offices, shops and other workplaces can be studied in the same personal way as a home. The visit looks at the entrance, the rooms and how people move through them. It does not promise profit or replace business advice.",
    sortOrder: 10,
  },
  {
    id: "same-solution",
    question: "Does every property need the same Vastu solution?",
    answer:
      "No. Two houses on the same street can need different attention because their entrances, rooms and daily use are different. Mr. Sanjeev Jain studies the property in front of him. He does not apply one fixed solution to every building.",
    sortOrder: 11,
  },
];

export type SiteSettings = {
  brandName: string;
  practiceName: string;
  tagline: string;
  coreMessage: string;
  phone: string;
  whatsapp: string;
  email: string;
  instagramUrl: string;
  linkedinUrl: string;
  serviceAreas: string;
  address: string;
  consultationFee: number;
  feeNote: string;
  remedyNote: string;
  onlineConsultationEnabled: boolean;
  deliverables: string[];
  founderSummary: string;
  founderPortraitUrl: string;
  heroSanskrit: string;
  heroTranslation: string;
  bookingNote: string;
};

export const defaultDeliverables = [
  "Individual property assessment",
  "Discussion of relevant concerns",
  "Identification of areas requiring attention",
  "Personalised recommendations",
  "Practical implementation guidance",
];

export const defaultSettings: SiteSettings = {
  brandName: "Sanjeev Jain",
  practiceName: "Vedic Vastu Consultancy",
  tagline: "Ancient Knowledge. Personal Insight. Practical Guidance.",
  coreMessage: "Every Space Is Different. Every Vastu Solution Should Be Personal.",
  phone: "",
  whatsapp: "",
  email: "",
  instagramUrl: "",
  linkedinUrl: "",
  serviceAreas: "",
  address: "",
  consultationFee: 10000,
  feeNote: "Travel charges, where applicable, may be separate.",
  remedyNote:
    "Remedy costs are independent of the consultation fee and vary with the recommendations. A fixed maximum is not guaranteed. The practice aims for practical measures. Significant structural changes can cost more.",
  onlineConsultationEnabled: false,
  deliverables: defaultDeliverables,
  founderSummary: "",
  founderPortraitUrl: "",
  heroSanskrit: "",
  heroTranslation: "",
  bookingNote:
    "Enquiries are reviewed personally. A visit is confirmed only after the consultancy has been in touch.",
};

export function labelFor<T extends string>(
  options: { value: T; label: string }[],
  value: string,
) {
  return options.find((option) => option.value === value)?.label ?? value;
}
