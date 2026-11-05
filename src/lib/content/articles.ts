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
  relatedHref?: string;
};

export const articleCategories = [
  "Foundations",
  "Directions",
  "Homes",
  "Practice",
  "Consultation",
];

const updated = "2026-11-05";

export const editorialArticles: Article[] = [
  {
    slug: "what-is-vastu-shastra",
    title: "What is Vastu Shastra?",
    excerpt: "Vastu Shastra is a traditional Indian way of looking at a building: its layout, directions, and surroundings. It is guidance, not a guarantee.",
    category: "Foundations",
    image: images.palace.src,
    imageAlt: images.palace.alt,
    publishedAt: updated,
    seoTitle: "What is Vastu Shastra?",
    seoDescription: "A plain explanation of Vastu Shastra as traditional guidance about layout, direction, and the use of a building.",
    source: "editorial",
    relatedHref: "/understanding-vastu",
    content: `Vastu Shastra is a traditional Indian approach to buildings. It looks at where a property sits, which way it faces, how the rooms are arranged, and what is around it. It is a way of studying a place. It is not a medical treatment, a financial product, or a promise about the future.

## What the name points to

**वास्तु (Vāstu)** refers to the space that is built and lived in. **शास्त्र (Śāstra)** means a body of traditional knowledge. Together, the name describes a tradition of looking at architecture and use. It does not mean that every old rule can be applied, unchanged, to every modern flat.

## What a visitor can expect

Mr. Sanjeev Jain uses this tradition during a personal visit. He studies one property at a time. Two homes on the same street can need different attention because their entrances and daily use are different.

A page on a website can explain the idea. It cannot assess your floor plan.

## A clear limit

Traditional interpretations are not the same thing as an engineer’s calculation or a doctor’s diagnosis. If a wall, a beam, or a health decision is involved, the qualified professional for that work remains responsible.

Related reading: [Understanding Vastu Shastra](/understanding-vastu) and [home consultation](/expertise/residential-vastu).`,
  },
  {
    slug: "directional-principles-in-vastu",
    title: "Why are directions important in Vastu?",
    excerpt: "Direction tells a consultant which way the entrance and the rooms face. It starts from a reliable north on the property, not from a compass drawn on a screen.",
    category: "Directions",
    image: images.hero.src,
    imageAlt: images.hero.alt,
    publishedAt: updated,
    seoTitle: "Why are directions important in Vastu?",
    seoDescription: "Directions matter because they locate the entrance and rooms. A website compass cannot assess a property.",
    source: "editorial",
    relatedHref: "/approach",
    content: `Directions matter because they locate the building. Once north is known, the entrance, the plot edges, and the rooms can be discussed in relation to one another. Without a reliable north, those words are only guesses.

## Begin on the property

**दिशा (Diśā)** means direction. A north point taken from a surveyed plan, or checked on site, is more useful than a phone compass used beside a steel cupboard. The meaning of a room is then discussed with the concern you brought. It is not a slogan such as “this direction is always lucky”.

## The eight directions

People often speak of north, east, south, and west, and of the four corners between them: north-east, south-east, south-west, and north-west. Different teachers describe these corners with different emphasis. STHAPATYA does not publish one chart that assigns a remedy to every corner.

## What this website’s compass is for

The compass on the approach page explains how a visit proceeds. It does not point at your home, and it does not change when you turn your laptop.

If you have a plan, mark north before the visit. The plan still does not replace seeing the place. See [how a consultation works](/approach).`,
  },
  {
    slug: "understanding-the-vastu-purusha-mandala",
    title: "What is the Vastu Purusha Mandala?",
    excerpt: "It is a traditional square used to talk about the centre and the edges of a plan. The drawing does not read your home by itself.",
    category: "Foundations",
    image: images.geometry.src,
    imageAlt: images.geometry.alt,
    publishedAt: updated,
    seoTitle: "What is the Vastu Purusha Mandala?",
    seoDescription: "The Vastu diagram is a traditional planning square. It organises a conversation. It does not diagnose a property.",
    source: "editorial",
    relatedHref: "/understanding-vastu",
    content: `The Vastu Purusha Mandala is a traditional square diagram. Consultants use it to talk about the centre of a plan and its edges. It helps organise a conversation. It does not, by itself, tell you what your home needs.

## How the square is described

In classical planning talk, the field is a square divided into smaller squares. The centre is often called the brahmasthan. Around it, the grid gives a shared language for corners and rooms. Schools do not all draw the grid in the same way. This site does not pretend that one printed chart is the only chart.

## How it is used in a visit

Mr. Sanjeev Jain may use the idea after he has seen the property. Where is the entrance in relation to the plot? What sits in the middle? Which room carries the concern you brought? Those are questions about a real place.

An animated diagram on this website is a teaching mark. Uploading a plan does not generate a reading.

This article does not quote a treatise as if a paraphrase were scripture. If a specific passage is published later, it will be given with its source. Read more on [Understanding Vastu](/understanding-vastu).`,
  },
  {
    slug: "five-elements-in-traditional-thought",
    title: "What are the five elements in traditional Indian thought?",
    excerpt: "Earth, water, fire, air, and space are a traditional way of talking about a building and its setting. They are not a medical diagnosis.",
    category: "Foundations",
    image: images.courtyard.src,
    imageAlt: images.courtyard.alt,
    publishedAt: updated,
    seoTitle: "What are the five elements in Vastu discussions?",
    seoDescription: "The five elements are a traditional language for ground, water, heat, air, and open space. They do not diagnose a person.",
    source: "editorial",
    relatedHref: "/understanding-vastu",
    content: `The five elements, **पंचमहाभूत (Pañcamahābhūta)**, are a traditional Indian way of describing the world: earth, water, fire, air, and space. In a Vastu conversation they offer words for the ground, water, heat, air, and the open part of a plan. They are not a test, and they are not a diagnosis.

## A simple reading of each word

- **पृथ्वी**, earth: the plot, the structure, and the weight of the building.
- **जल**, water: water inside or beside the property, and how it is placed.
- **अग्नि**, fire: heat and the brighter working parts of a plan, often discussed with the kitchen.
- **वायु**, air: openings and how a room is ventilated.
- **आकाश**, space: the open centre and the room a person can move through.

## What this is not

Different teachers connect the elements to directions in different ways. Publishing one map as if it were scientific fact would overstate the case. STHAPATYA treats the five elements as traditional language. Light, air, and structure can also be discussed with an architect or engineer in ordinary building terms.

The illustrations on [Understanding Vastu](/understanding-vastu) explain the words. They do not score a house.`,
  },
  {
    slug: "considerations-when-planning-a-home",
    title: "What should you know before a home Vastu consultation?",
    excerpt: "Bring the question, the city, and a plan if you have one. The visit looks at your house. This page does not score it.",
    category: "Homes",
    image: images.modernHome.src,
    imageAlt: images.modernHome.alt,
    publishedAt: updated,
    seoTitle: "What should you know before a home Vastu consultation?",
    seoDescription: "Before a home visit, note the entrance, the rooms that matter, and whether building work is possible.",
    source: "editorial",
    relatedHref: "/expertise/residential-vastu",
    content: `Before a home visit, know the question you want answered and whether you can consider building work. Mr. Sanjeev Jain will still need to see the house. This note only helps you prepare.

## Useful questions to write down

- Which way does the plot or flat face, and where is north on the drawing?
- Which door is used every day?
- What sits in the middle of the plan?
- Which room carries the concern: sleep, cooking, work, or a room that is hard to use?
- Can you consider building work, or do you need ideas that leave the walls alone?

## Timing

A new house is easier to discuss while decisions are still open. An existing home can still be visited. The range of practical measures may then be smaller. That is a reason to be honest, not a reason to invent a result.

The personal visit is ₹10,000. Travel, if needed, is separate. Remedies are priced after the visit. Start with [residential Vastu](/expertise/residential-vastu) or [book a consultation](/contact).`,
  },
  {
    slug: "what-a-vastu-consultant-studies",
    title: "What does a Vastu consultant study?",
    excerpt: "The visit looks at the entrance, directions, rooms, daily use, and surroundings. A checklist on a website cannot do this for a real property.",
    category: "Practice",
    image: images.residence.src,
    imageAlt: images.residence.alt,
    publishedAt: updated,
    seoTitle: "What does a Vastu consultant study?",
    seoDescription: "A Vastu visit studies entrance, direction, layout, use, and surroundings for one property.",
    source: "editorial",
    relatedHref: "/approach",
    content: `A Vastu consultant studies the property in front of him, not a generic house type. Mr. Sanjeev Jain looks at the entrance, the direction, the rooms connected to your question, and the way those rooms are used.

## What is usually included

- The main door and any second door that is used just as often.
- North, as reliably as the plan or the site allows.
- The centre of the plan and the path through the building.
- Rooms for living, cooking, sleep, or work, depending on the concern.
- Light, air, and what can be seen around the property.

## What is not included

The visit does not calculate a structural load, file a tax return, or diagnose an illness. If the guidance would move a wall or a staircase, an architect or engineer should review it before anyone builds.

The same list is not a score. Two properties can share a compass and still need different attention. The steps are set out on [the approach page](/approach).`,
  },
  {
    slug: "residential-versus-commercial-vastu",
    title: "What is the difference between residential and commercial Vastu?",
    excerpt: "A home and a workplace can share a compass and still need different attention, because people use them differently.",
    category: "Practice",
    image: images.commercial.src,
    imageAlt: images.commercial.alt,
    publishedAt: updated,
    seoTitle: "Residential and commercial Vastu",
    seoDescription: "Homes and workplaces are studied through the same attention to layout, but the rooms that matter are different.",
    source: "editorial",
    relatedHref: "/expertise/business-vastu",
    content: `Yes, an office can be studied. The difference is the brief. A home is organised around household life. A shop, office, or clinic is organised around work, visitors, staff, and storage. The same directional attention does not produce interchangeable advice.

## In a home

The visit asks who sleeps where, where the family eats, which room has become an office, and which door is really the front door. Details shared so the home can be understood are not published unless you later agree in writing.

## In a workplace

The path from the street, the reception, the meeting room, and the owner’s cabin are often part of the question. A suggestion that suits a living room may be awkward at a counter. Commercial guidance does not predict revenue.

## Mixed buildings

A shop below a flat needs the form to say which part the visit is for. If you are unsure, choose “Multiple concerns” or “Other” and describe the building. See [business Vastu](/expertise/business-vastu) and [home Vastu](/expertise/residential-vastu).`,
  },
  {
    slug: "understanding-practical-vastu-recommendations",
    title: "Does every Vastu concern require structural changes?",
    excerpt: "No. Some suggestions are about how a room is used. Building work is named as building work, and it is not promised to fit a fixed budget.",
    category: "Consultation",
    image: images.carving.src,
    imageAlt: images.carving.alt,
    publishedAt: updated,
    seoTitle: "Does every Vastu concern require structural changes?",
    seoDescription: "Not every suggestion needs building work. Structural changes are named separately and should be checked by an engineer.",
    source: "editorial",
    relatedHref: "/contact",
    content: `No. Some guidance is about how a room is used or how furniture sits. Other guidance would mean building work. You are told which is which. A vague instruction to “correct the energy” is not how this practice explains a suggestion.

## How a practical suggestion is framed

A useful note names the space, the reason it is being discussed, and the kind of change. It leaves you able to ask a carpenter, contractor, or architect for a price. The ₹10,000 fee is for the personal visit. Anything made or built afterwards is a further cost.

## Budget

Many simpler remedies may cost around ₹5,000–₹6,000, or less. That is not a maximum. Major structural work can cost much more, and it should be checked by the person legally responsible for the structure.

You may decline a suggestion or take only part of it. [Book a visit](/contact) when you are ready to talk about a real property.`,
  },
  {
    slug: "preparing-a-floor-plan",
    title: "How should you prepare a floor plan for a consultation?",
    excerpt: "A plan that shows north, the main door, and the room names is useful. You can still enquire if you do not have one.",
    category: "Consultation",
    image: images.geometry.src,
    imageAlt: images.geometry.alt,
    publishedAt: updated,
    seoTitle: "How should you prepare a floor plan?",
    seoDescription: "Mark north, the entrance, and the room names if you can. A drawing does not replace the visit.",
    source: "editorial",
    relatedHref: "/contact",
    content: `A useful floor plan shows north, the main door, and the names of the rooms. You can attach it to the enquiry. You can also enquire without one. The visit is still needed, because a drawing does not show how the place is lived in.

## What to mark

- North, as shown on a surveyed drawing if you have one.
- The everyday entrance, and any second door.
- Kitchen, bedrooms, bathrooms, and the room used for work.
- Stairs, and any courtyard or open centre.
- A note if a room on the plan is used differently in daily life.

## Files

The form accepts JPG, PNG, WEBP, and PDF files, with a limit on size and number. Do not send passwords or bank documents. Plans are stored so the visit can be prepared. They are not published, and they do not produce an automatic reading.

Send what you have through the [enquiry form](/contact).`,
  },
  {
    slug: "vastu-for-modern-homes",
    title: "Common questions about Vastu for modern homes",
    excerpt: "Flats, rented homes, and new layouts can still be discussed. The visit says what can be changed and what cannot.",
    category: "Homes",
    image: images.residence.src,
    imageAlt: images.residence.alt,
    publishedAt: updated,
    seoTitle: "Vastu questions for modern homes",
    seoDescription: "Modern flats and rented homes can be studied. Structural freedom is often limited, and that limit is stated plainly.",
    source: "editorial",
    relatedHref: "/expertise/residential-vastu",
    content: `Modern homes can be studied. A flat, a rented house, and a villa do not receive the same advice, because their walls, entrances, and leases are different.

## Questions people ask

Can a rented home be discussed? Yes. The visit can look at how rooms are used. It should not suggest work you are not allowed to do.

Can an apartment be assessed? Yes. Many changes will be small, because the structure is shared. That is said clearly.

Does a new tower follow an old diagram exactly? Not automatically. The tradition is a way of looking. Bylaws, structure, and the way the family lives also matter.

## What stays personal

STHAPATYA does not offer a printed score for “Vastu-compliant homes”. Mr. Sanjeev Jain looks at the home you name. Read [residential consultation](/expertise/residential-vastu) for what to prepare.`,
  },
  {
    slug: "vastu-for-office-layouts",
    title: "Understanding Vastu for office layouts",
    excerpt: "An office visit looks at the entrance, the path people walk, and the rooms where work happens. It does not promise profit.",
    category: "Practice",
    image: images.commercial.src,
    imageAlt: images.commercial.alt,
    publishedAt: updated,
    seoTitle: "Vastu for office layouts",
    seoDescription: "Office Vastu studies entrance, workstations, and meeting rooms. It is not a forecast of business results.",
    source: "editorial",
    relatedHref: "/expertise/business-vastu",
    content: `An office can be studied in the same personal way as a home. The visit looks at the entrance, the reception, the workstations, the meeting room, and the cabin where decisions are made. It does not promise clients or revenue.

## What is often discussed

- The door staff and visitors actually use.
- The path from that door to the working rooms.
- Where the owner sits, and where accounts are kept, if that is part of the question.
- Storage and rooms that have become cramped or unused.

## Before a fit-out

It is easier to talk while furniture and partitions can still move. An existing office can also be reviewed before more money is spent. Any change to a wall or a lease is for the people responsible for the building.

This is not a substitute for an architect’s drawing or a business plan. See [commercial Vastu](/expertise/business-vastu).`,
  },
  {
    slug: "natural-light-and-space",
    title: "How are natural light and space discussed in Vastu?",
    excerpt: "Light, air, and the open part of a plan are part of a traditional discussion. They are also ordinary architectural facts. The visit keeps those ideas distinct.",
    category: "Homes",
    image: images.courtyard.src,
    imageAlt: images.courtyard.alt,
    publishedAt: updated,
    seoTitle: "Natural light and space in Vastu discussions",
    seoDescription: "Vastu discussions can include light, air, and open space. These observations are not a medical or scientific claim by themselves.",
    source: "editorial",
    relatedHref: "/expertise/health-wellbeing",
    content: `Natural light and open space are discussed because they change how a room is used. **प्रकृति (Prakṛti)** here simply means the setting: light, air, and what surrounds the building. **आकाश** names space, including an open centre. These are traditional words and also things a person can see.

## What the visit can say

A room may be dark because of a deep verandah, a neighbouring wall, or the way furniture blocks a window. An open centre may have been built over. The consultant can point to that and discuss whether a change of use, a lighter arrangement, or building work is realistic.

## What it cannot say

Noticing light is not a medical finding. A brighter room is not a cure. If health is the concern, continue with a doctor. If a window or a slab would change, ask an architect or engineer before any work.

The [health and wellbeing consultation](/expertise/health-wellbeing) stays inside this limit.`,
  },
];
