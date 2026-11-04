import { images } from "@/lib/images";

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  content: string;
  image: string;
  imageAlt: string;
  publishedAt: string;
  seoTitle: string;
  seoDescription: string;
  source: "editorial" | "cms";
};

export const articleCategories = [
  "Foundations",
  "Directions",
  "Homes",
  "Practice",
  "Consultation",
];

export const editorialArticles: Article[] = [
  {
    slug: "understanding-the-vastu-purusha-mandala",
    title: "What is the Vastu diagram?",
    excerpt:
      "It is a traditional square used to talk about the centre and edges of a plan. The drawing does not read your home by itself.",
    category: "Foundations",
    image: images.geometry.src,
    imageAlt: images.geometry.alt,
    publishedAt: "2026-01-15",
    seoTitle: "What is the Vastu diagram?",
    seoDescription:
      "The Vastu diagram is a traditional square for talking about the centre and edges of a plan. It does not read a home by itself.",
    source: "editorial",
    content: `The Vastu diagram is a traditional square used to talk about the centre and the edges of a plan. It helps organise a conversation. It does not, by itself, tell you what your home needs.

## A diagram, not a verdict

The Vastu Purusha Mandala is a traditional diagram used to think about a site. In classical planning it is described as a square field divided into smaller squares, often spoken of as a grid of sixty-four or eighty-one parts. The centre is commonly called the brahmasthan. Around it, the grid gives a consultant a shared language for edges, corners, and the middle of a plan.

This page explains the idea. It does not read your floor plan. A drawing on a screen cannot tell you what a property needs.

## How the diagram is used

During a consultation the mandala is a way of paying attention. Where is the entrance in relation to the plot? Which rooms sit at the centre, and which sit against an edge? Which part of the building carries the concern the client has brought? Those are questions about a real place. The diagram helps organise them. It does not replace walking through the property.

Different teaching lineages describe the grid with different emphasis. This consultancy does not publish a universal chart that assigns a remedy to each square. Sanjeev Jain uses the inherited approach he works with, and he applies it after seeing the property.

## What this website will not do

An animated mandala on the homepage is a visual mark of the practice. It is not an assessment tool. Uploading a plan to a form does not generate a Vastu reading. Plans are stored so the visit can be prepared, and the reading happens with the consultant.

## A note on sources

Classical treatises on Indian architecture discuss site, measure, and orientation. This article does not quote them, because a paraphrase presented as scripture would be misleading. If a specific textual passage is used in the consultancy’s published writing, it will be given with its source.

The useful point for a client is simpler. The mandala is a traditional way of looking. The consultation is personal because the property is particular.`,
  },
  {
    slug: "directional-principles-in-vastu",
    title: "What do the Vastu directions mean?",
    excerpt:
      "Direction starts from a reliable north on the property, then looks at the rooms that matter to you. A website compass cannot assess a building.",
    category: "Directions",
    image: images.hero.src,
    imageAlt: images.hero.alt,
    publishedAt: "2026-01-22",
    seoTitle: "What do the Vastu directions mean?",
    seoDescription:
      "Vastu directions start from a reliable north on the property. A compass on a website cannot assess a building.",
    source: "editorial",
    content: `Vastu directions start from a reliable north on the actual property. From there, the entrance and the rooms can be discussed. A compass drawn on this website does not point at your home.

## Begin with a reliable north

Directional discussion in Vastu starts from the orientation of the actual property. A north point taken from a surveyed plan, or confirmed on site, is more useful than a rough guess from a phone in a room full of steel.

Once orientation is known, the consultant can talk about the entrance, the plot edges, and the rooms that sit toward particular directions. The meaning of those placements is interpreted in the context of the building and the concern. It is not a slogan such as “this direction is always lucky”.

## What a compass on this website is for

The directional diagram in the methodology section explains the four stages of a consultation: understand, assess, recommend, and implement. The letters N, E, S, and W are a wayfinding device for that sequence. They do not point at your home, and they do not change when you turn your laptop.

## Elements, qualities, and caution

Traditional teaching associates directions with qualities, and schools do not describe those associations in identical ways. Publishing one elemental map as if it were the only map would overstate the case. In this practice, directional judgement is made during the visit, and it is explained in relation to the spaces being discussed.

## Plans and photographs

A plan that marks north, the main door, and the room names will make the conversation clearer. Photographs of the entrance and of the rooms in question help the consultancy prepare. They are private documents. They are not a substitute for the visit when a visit is what the property requires.

Direction is a discipline of attention. It becomes advice only after the property has been seen.`,
  },
  {
    slug: "considerations-when-planning-a-home",
    title: "What does a Vastu consultant check in a home?",
    excerpt:
      "A few questions are worth asking early: orientation, entrance, the centre of the plan, and how the household will actually live.",
    category: "Homes",
    image: images.modernHome.src,
    imageAlt: images.modernHome.alt,
    publishedAt: "2026-02-02",
    seoTitle: "What does a Vastu consultant check in a home?",
    seoDescription:
      "A home visit looks at orientation, the entrance, the centre of the plan, and how the household lives. It is not a score.",
    source: "editorial",
    content: `In a home, Mr. Sanjeev Jain checks the direction, the entrance, the centre of the plan, and the rooms tied to your question. He also asks how the family uses those rooms. This note lists useful questions. It does not score your house.

## Ask while the plan can still move

The most useful time to discuss a new home is while decisions are still open. Orientation, the position of the entrance, and the relationship between kitchen, rooms, and stairs are easier to consider before walls are built. An existing home can still be assessed. The range of practical measures may then be narrower, which is a reason to be honest about what can be changed.

## Questions worth bringing

These are preparation questions, not a checklist that scores a house.

- Which way does the plot face, and where is north on the drawing?
- Where is the everyday entrance, and is there a second door used just as often?
- What sits in the middle of the plan, and is that centre built over, open, or serving as circulation?
- Which rooms carry the concern: sleep, work, cooking, storage, or a room that feels difficult to use?
- Are you able to consider building work, or do you need measures that leave the structure alone?

## Drawings, and their limits

An architectural drawing is a gift to the conversation, especially with levels and the north point. It still misses occupation. A guest room on a plan may be the room where someone actually works. A balcony may be the place the family sits every evening. The visit is where that difference appears.

## Professionals who remain responsible

If a recommendation would move a wall, a staircase, a toilet, or a structural element, an architect or engineer should review it before anyone builds. Vastu guidance can inform the brief. It does not stamp a structural drawing.

## Budget

Say plainly what kind of change you are willing to consider. The consultancy aims to suggest practical measures. It cannot promise that every useful suggestion will fall inside a chosen budget, and remedy costs are separate from the consultation fee.`,
  },
  {
    slug: "residential-versus-commercial-vastu",
    title: "Can Vastu be used for an office?",
    excerpt:
      "A home and a workplace can share a compass and still ask for different attention, because their use is different.",
    category: "Practice",
    image: images.commercial.src,
    imageAlt: images.commercial.alt,
    publishedAt: "2026-02-12",
    seoTitle: "Can Vastu be used for an office?",
    seoDescription:
      "Yes. An office can be studied in person. The visit looks at the workplace layout. It does not promise profit.",
    source: "editorial",
    content: `Yes. An office, shop, or clinic can be studied in the same personal way as a home. The visit looks at the entrance and how people use the rooms. It does not promise profit, and a home remedy is not copied onto a workplace.

## The same discipline, a different brief

Residential and commercial consultations use the same underlying attention to orientation, entrance, and layout. They do not produce interchangeable advice. A home is organised around household life. A shop, office, or clinic is organised around work, clients, staff, and storage. The concern that prompted the visit decides which rooms matter most.

## What changes in a workplace

In a commercial visit, the path from the street to the working rooms is often part of the question. So is the room where accounts are kept, the cabin used for meetings, or the counter where people are received. A recommendation that suits a family living room may be irrelevant, or actively awkward, in a reception.

Commercial guidance still has a firm boundary. It does not predict revenue, and it does not tell an owner how to price, hire, or borrow. Those decisions have their own professions.

## What changes in a home

A residence is assessed through occupation. Who sleeps where, where the family eats, which room has become an office, and which door is really the front door are all part of the reading. Privacy matters here in a particular way: details shared so the home can be understood are not material for a public case study unless you later agree to that in writing.

## Mixed-use buildings

Some properties are both. A shop below a flat, or a home with a client room, needs the brief to say which part of the building the consultation is for. Trying to cover every use in a vague way produces vague guidance. The form asks for property type and concern so this can be sorted before the visit.

If you are unsure which description fits, choose “Multiple concerns” or “Other” and describe the building in your own words.`,
  },
  {
    slug: "understanding-practical-vastu-recommendations",
    title: "How should I prepare for a Vastu visit?",
    excerpt:
      "A recommendation should be something you can understand, cost, and decide upon. Structural work is named as structural work.",
    category: "Consultation",
    image: images.carving.src,
    imageAlt: images.carving.alt,
    publishedAt: "2026-02-20",
    seoTitle: "How should I prepare for a Vastu visit?",
    seoDescription:
      "Bring your question, the city, and a plan if you have one. The visit is ₹10,000. Remedies are priced afterwards.",
    source: "editorial",
    content: `Write down the question you want answered, the city, and the type of property. A north-marked plan is useful if you have one. You can still enquire without it. The visit itself is ₹10,000, and any remedy is priced afterwards.

## Practical means specific

A practical recommendation names the space, the reason it is being discussed, and the kind of change suggested. It distinguishes a change of use or placement from building work. It leaves you able to ask a carpenter, a contractor, or an architect for a price. A vague instruction to “correct the energy” does not meet that standard, and this practice does not use the consultation fee to sell a fixed catalogue of objects.

## The visit and the remedy are different costs

The published fee of ₹10,000 is for a one-time personal property visit by Sanjeev Jain. Travel, where it applies, may be charged separately. Anything that is then made, built, or purchased is a further cost. That cost depends on the recommendation. It is not included in the visit, and it is not capped by a guarantee.

The consultancy’s aim is to look for measures that are realistic. Many clients hope the work will remain modest. Some properties, once seen, call for more substantial building changes. Both possibilities are stated before you treat an estimate as a promise.

## Reported experience

If a client later describes a change in their situation, that description can be published only with consent, and only as their account. This website will not present such accounts as proven effects, and it will not invent them in order to fill a page.

## Your decision

You may decline a recommendation, take part of it, or ask for a second opinion from an architect. Implementation guidance is there so the suggestion is intelligible. It is not an instruction to bypass the professionals who carry legal responsibility for health, structure, and finance.

Begin with the property you have and the concern that is actually yours. That is the whole method.`,
  },
];
