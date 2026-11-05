export type ServiceGuide = {
  sanskrit: string;
  reading: string;
  headline: string;
  concerns: string[];
  studied: string[];
  prepare: string[];
  guidance: string[];
  faqs: { question: string; answer: string }[];
};

export const serviceGuides: Record<string, ServiceGuide> = {
  "residential-vastu": {
    sanskrit: "गृह वास्तु",
    reading: "Vastu for the home",
    headline: "Understand the Space You Call Home.",
    concerns: [
      "The main door feels awkward, or people are unsure which entrance is really used.",
      "A kitchen, bedroom, or living room does not sit comfortably in the plan.",
      "A family is building or altering a house and wants the layout studied before money is spent.",
      "A flat has limited scope for change, and the family wants to know what can still be considered.",
    ],
    studied: [
      "The main entrance and any door used every day",
      "The direction of the plot or flat",
      "Living room, kitchen, bedrooms, and bathrooms",
      "Windows, light, and how air moves",
      "The centre of the plan and the path through the home",
      "What sits around the property, as far as it can be seen on the visit",
    ],
    prepare: [
      "A floor plan with north marked, if you have one",
      "A short note about the room or question that matters most",
      "Photographs of the entrance and the rooms in question, if you are comfortable sharing them",
    ],
    guidance: [
      "A change in how a room is used",
      "A change in furniture or the daily path through the house",
      "A building change, only when the visit suggests it, and only after an architect or engineer has checked it",
    ],
    faqs: [
      {
        question: "Will the same home advice fit every house?",
        answer:
          "No. The entrance, the rooms, and the way your family lives decide what is discussed. A suggestion made for one house is not copied onto the next.",
      },
      {
        question: "Can a flat be studied?",
        answer:
          "Yes. A flat has less freedom for structural change. The visit still looks at the entrance, the rooms, and how they are used, and it says clearly what can and cannot be altered.",
      },
    ],
  },
  "business-vastu": {
    sanskrit: "व्यापार वास्तु",
    reading: "Vastu for business spaces",
    headline: "Understand the Space Where Your Business Operates.",
    concerns: [
      "The office entrance or reception does not work well for visitors.",
      "Workstations, cabins, or a meeting room feel poorly placed.",
      "A shop, clinic, or studio is about to be fitted out.",
      "The owner wants the premises looked at before spending on another alteration.",
    ],
    studied: [
      "The entrance from the street or lobby",
      "Reception and the path visitors take",
      "Workstations, meeting rooms, and the owner’s workspace",
      "Staff areas, storage, and the accounts desk if it is part of the question",
      "The direction of the premises and what surrounds them",
    ],
    prepare: [
      "A plan of the premises, if you have one",
      "A note about how staff and visitors use the space",
      "You do not need to share turnover, tax papers, or client lists",
    ],
    guidance: [
      "How an entrance, counter, or cabin might be used differently",
      "Which rooms deserve attention before a fit-out",
      "Where a structural change would need the landlord, architect, or engineer",
    ],
    faqs: [
      {
        question: "Does an office visit promise more business?",
        answer:
          "No. The visit studies the workplace. It does not forecast sales, clients, or profit, and it does not replace business or legal advice.",
      },
      {
        question: "Can a shop and an office be discussed together?",
        answer:
          "Only if you say which part of the building the visit is for. A mixed building needs a clear brief. A vague request produces vague guidance.",
      },
    ],
  },
  "financial-professional-guidance": {
    sanskrit: "समृद्धि",
    reading: "A traditional word for prosperity",
    headline: "A Thoughtful Look at Your Professional Space.",
    concerns: [
      "A study, shop, or accounts room is tied to a question about work.",
      "A home office has taken over a room that was meant for something else.",
      "A person wants the rooms connected with work to be looked at individually.",
    ],
    studied: [
      "The room where work or accounts actually happen",
      "How that room sits in the rest of the plan",
      "The entrance used for that work",
      "Whether the concern is about the property, rather than an investment decision",
    ],
    prepare: [
      "The question in your own words",
      "A plan of the property the question relates to",
      "No bank details, passwords, or tax returns",
    ],
    guidance: [
      "Spatial notes about the work room",
      "A distinction between a change of use and building work",
      "A clear limit: money decisions stay with you and your advisers",
    ],
    faqs: [
      {
        question: "Can this consultation tell me where to invest?",
        answer:
          "No. It looks at a property. It does not give investment, tax, lending, or legal advice, and it does not promise income or wealth.",
      },
      {
        question: "Why is the Sanskrit word samriddhi used here?",
        answer:
          "Samriddhi is a traditional word associated with prosperity. On this page it names the kind of question some clients bring. It is not a promise that the visit will produce wealth.",
      },
    ],
  },
  "health-wellbeing": {
    sanskrit: "स्वास्थ्य एवं संतुलन",
    reading: "Wellbeing and balance",
    headline: "Create a More Thoughtful Living Environment.",
    concerns: [
      "A family wants the bedrooms, light, and daily rooms looked at with care.",
      "Someone spends long hours in one room and wants that room understood in the plan.",
      "The household wants environmental suggestions while continuing with their doctor.",
    ],
    studied: [
      "Room arrangement and how the rooms are used",
      "Natural light and ventilation",
      "The layout and the centre of the plan",
      "The surroundings, as they can be seen on the visit",
      "Traditional Vastu ideas about placement, explained as tradition, not as medicine",
    ],
    prepare: [
      "Say only what you are comfortable sharing about the rooms",
      "A plan is useful",
      "Do not send medical reports unless you have chosen to, and know that they are not published",
    ],
    guidance: [
      "Suggestions about light, use of a room, or placement",
      "A statement of what would need building work",
      "No diagnosis, prescription, or claim of cure",
    ],
    faqs: [
      {
        question: "Can a Vastu visit treat an illness?",
        answer:
          "No. It cannot diagnose, cure, or prevent disease. For health decisions, speak to a qualified doctor. The visit is about the living environment only.",
      },
      {
        question: "What does balance mean on this page?",
        answer:
          "It means a thoughtful arrangement of rooms, light, and use. It does not mean a medical result.",
      },
    ],
  },
};
