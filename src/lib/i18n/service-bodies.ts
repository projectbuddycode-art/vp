import type { Locale } from "@/lib/i18n/locale";
import type { ServiceGuide } from "@/lib/content/service-guides";

export type LocalizedServiceBody = {
  summary: string;
  lead: string;
  paragraphs: string[];
  points: { title: string; text: string }[];
  boundary: string;
  guide: Omit<ServiceGuide, "sanskrit">;
};

type ServiceSlug =
  | "residential-vastu"
  | "business-vastu"
  | "health-wellbeing"
  | "financial-professional-guidance";

const en: Record<ServiceSlug, LocalizedServiceBody> = {
  "residential-vastu": {
    summary: "A personal look at a house, flat, or plot, based on its own layout.",
    lead: "This visit is for a house, flat, or plot. Mr. Sanjeev Jain looks at that home’s entrance, rooms and surroundings, then explains what he sees in plain language.",
    paragraphs: [
      "Residential work begins with the household’s questions and the plan of the property. Two homes on the same street can ask for different attention because their entrances, room relationships, and daily use are not the same.",
      "During a visit, Sanjeev Jain looks at orientation, the sequence of spaces, and the parts of the home connected to the concern you bring. Suggestions are then explained in ordinary language, with a preference for measures that can actually be carried out.",
      "If you are planning a new home or altering an existing one, bring whatever drawings you have. A north-marked floor plan is useful. The visit still matters, because a drawing alone does not show how the place is lived in.",
    ],
    points: [
      { title: "Who may find this useful", text: "Families in a house or flat, and people planning a plot or a home that is still being built." },
      { title: "What is studied", text: "The entrance, the direction of the plot, the centre of the plan, the main rooms, and how the household actually uses them." },
      { title: "What to prepare", text: "A floor plan with north marked, if you have one, and a short note about the room or question that matters most. Photographs help. They are not required." },
      { title: "After the visit", text: "Mr. Sanjeev Jain explains practical guidance for that home. Some ideas are about how a room is used. Building work, if suggested, should be checked by an architect or engineer. Remedies are priced separately." },
      { title: "How to book", text: "Use the enquiry form. A personal visit is ₹10,000. Travel, if needed, is discussed separately. A visit is confirmed only after the consultancy replies." },
    ],
    boundary: "Residential guidance is spatial. Building alterations should be checked with an architect or structural engineer before any wall, beam, or service is changed.",
    guide: {
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
          answer: "No. The entrance, the rooms, and the way your family lives decide what is discussed. A suggestion made for one house is not copied onto the next.",
        },
        {
          question: "Can a flat be studied?",
          answer: "Yes. A flat has less freedom for structural change. The visit still looks at the entrance, the rooms, and how they are used, and it says clearly what can and cannot be altered.",
        },
      ],
    },
  },
  "business-vastu": {
    summary: "A personal look at an office, shop, or other workplace.",
    lead: "This visit is for an office, shop, or other business space. The layout and the way people use it are studied. It is not a promise of profit.",
    paragraphs: [
      "Offices, shops, clinics, and other commercial premises are assessed as working environments. The visit considers orientation and layout alongside how staff, clients, and goods actually move.",
      "Recommendations may concern an entrance, the placement of a cabin or cash desk, storage, or the relationship between public and private rooms. They are specific to the premises. A suggestion made for one office is not a template for the next.",
      "This consultation does not forecast turnover, and it does not replace commercial, tax, or legal advice. It offers a traditional spatial reading of the property you use for work.",
    ],
    points: [
      { title: "Who may find this useful", text: "Owners and managers of offices, shops, clinics, and other workplaces who want the premises looked at before they spend on a further fit-out." },
      { title: "What is studied", text: "The entrance, the path people walk, cabins or counters, storage, and the rooms where clients are received." },
      { title: "What to prepare", text: "A plan of the premises, if you have one, and a note about how staff and visitors use the space. You do not need to share accounts or turnover." },
      { title: "After the visit", text: "You receive spatial guidance for that workplace. It is not a forecast of sales. Any building change should be checked by the people responsible for the structure and the lease." },
      { title: "How to book", text: "Send an enquiry with the city and the type of premises. The on-site visit is ₹10,000. Travel and any later remedy are separate." },
    ],
    boundary: "Commercial Vastu guidance is not a business-performance guarantee. Financial and legal decisions belong with the professionals qualified to give them.",
    guide: {
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
          answer: "No. The visit studies the workplace. It does not forecast sales, clients, or profit, and it does not replace business or legal advice.",
        },
        {
          question: "Can a shop and an office be discussed together?",
          answer: "Only if you say which part of the building the visit is for. A mixed building needs a clear brief. A vague request produces vague guidance.",
        },
      ],
    },
  },
  "health-wellbeing": {
    summary: "Traditional spatial guidance for people seeking a more considered living environment.",
    lead: "Some clients ask for a more settled home environment while they are also looking after their health. The consultation can consider the spaces they live in. It does not treat illness.",
    paragraphs: [
      "Health-related enquiries are heard with care and kept within the limits of spatial guidance. The visit looks at the rooms, light, placement, and orientation of the property connected to the concern.",
      "Suggestions, when they are made, concern the environment: how a room is used, what might be adjusted, and whether a modest change is preferable to building work. They are not prescriptions, therapies, or diagnoses.",
      "If you are unwell, continue with your physician. Tell the consultancy only what you are comfortable sharing about the spaces involved. Private health details sent with an enquiry are stored so the visit can be prepared, and they are not published.",
    ],
    points: [
      { title: "Who may find this useful", text: "People who want the rooms they live in to be looked at with care. This is for the house, not for a medical condition." },
      { title: "What is studied", text: "Bedrooms, kitchens, and rooms where someone spends long hours, including light, placement and direction." },
      { title: "What to prepare", text: "Share only what you are comfortable saying about the rooms involved. A plan is useful. Private health details are not published." },
      { title: "After the visit", text: "Suggestions, if any, are about the environment. They are not a diagnosis or a treatment. Continue with your doctor for health decisions." },
      { title: "How to book", text: "Use the enquiry form and say that the question is about the living environment. The visit fee is ₹10,000. Remedies are priced after the visit." },
    ],
    boundary: "This consultation does not diagnose, treat, or cure any condition. It does not replace medical care.",
    guide: {
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
          answer: "No. It cannot diagnose, cure, or prevent disease. For health decisions, speak to a qualified doctor. The visit is about the living environment only.",
        },
        {
          question: "What does balance mean on this page?",
          answer: "It means a thoughtful arrangement of rooms, light, and use. It does not mean a medical result.",
        },
      ],
    },
  },
  "financial-professional-guidance": {
    summary: "Personalised Vastu assessment for clients seeking guidance regarding financial and professional concerns.",
    lead: "Clients sometimes arrive with a question about work, business stability, or the rooms in which money and decisions are handled. The response is a property assessment, not financial advice.",
    paragraphs: [
      "Sanjeev Jain’s consultations include people who want the premises connected to their work or finances to be looked at individually. The visit identifies spatial points that relate to the concern and suggests measures for that property.",
      "A recommendation may be modest, such as a change in how a room is used, or it may involve building work. Remedy costs are separate from the consultation fee and are known only after the assessment. There is no promised ceiling, and there is no promised financial result.",
      "Bring the question you actually have, and the plans of the property it relates to. The consultation will not tell you where to invest, how to file tax, or what a business decision should be.",
    ],
    points: [
      { title: "Who may find this useful", text: "People who want the rooms connected with work or money to be studied. The answer is about the property, not about an investment." },
      { title: "What is studied", text: "A study, accounts room, shop, or home office, and how that room sits in the rest of the plan." },
      { title: "What to prepare", text: "Bring the actual question and a plan of the property it relates to. You do not need to share bank details or tax papers." },
      { title: "After the visit", text: "You leave with spatial guidance for that place. Where to invest, how to file tax, or what a business decision should be is outside this consultation." },
      { title: "How to book", text: "Describe the room and the concern on the enquiry form. The personal visit is ₹10,000. There is no promised financial result, and remedy costs are separate." },
    ],
    boundary: "This consultation does not provide investment, tax, lending, or legal advice, and it does not promise wealth or professional success.",
    guide: {
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
          answer: "No. It looks at a property. It does not give investment, tax, lending, or legal advice, and it does not promise income or wealth.",
        },
        {
          question: "Why is the Sanskrit word samriddhi used here?",
          answer: "Samriddhi is a traditional word associated with prosperity. On this page it names the kind of question some clients bring. It is not a promise that the visit will produce wealth.",
        },
      ],
    },
  },
};

const hi: Record<ServiceSlug, LocalizedServiceBody> = {
  "residential-vastu": {
    summary: "घर, फ़्लैट या प्लॉट का निजी अध्ययन, उसी के नक्शे के आधार पर।",
    lead: "यह विज़िट घर, फ़्लैट या प्लॉट के लिए है। श्री संजीव जैन प्रवेश, कमरे और आसपास देखते हैं, फिर सादी भाषा में समझाते हैं।",
    paragraphs: [
      "आवासीय कार्य परिवार के सवालों और संपत्ति के नक्शे से शुरू होता है। एक ही गली के दो घरों में अलग ध्यान लग सकता है क्योंकि प्रवेश, कमरों का संबंध और रोज़ का उपयोग अलग होते हैं।",
      "विज़िट पर संजीव जैन दिशा, जगहों का क्रम और आपकी चिंता से जुड़े हिस्से देखते हैं। सुझाव साधारण भाषा में बताए जाते हैं, उन उपायों पर ज़ोर देते हुए जो वास्तव में किए जा सकें।",
      "नया घर बना रहे हों या बदलाव कर रहे हों तो उपलब्ध नक्शे साथ लाएँ। उत्तर अंकित फ़्लोर प्लान उपयोगी है। विज़िट फिर भी ज़रूरी है, क्योंकि केवल ड्राइंग से यह नहीं पता चलता कि जगह कैसे जी जाती है।",
    ],
    points: [
      { title: "किसे उपयोगी लग सकता है", text: "घर या फ़्लैट में रहने वाले परिवार, और प्लॉट या निर्माणाधीन घर की योजना करने वाले।" },
      { title: "क्या देखा जाता है", text: "प्रवेश, प्लॉट की दिशा, नक्शे का केंद्र, मुख्य कमरे, और परिवार उनका वास्तविक उपयोग कैसे करता है।" },
      { title: "क्या तैयार रखें", text: "उत्तर अंकित फ़्लोर प्लान यदि हो, और सबसे महत्वपूर्ण कमरे या सवाल का संक्षिप्त नोट। फ़ोटो मदद करते हैं, अनिवार्य नहीं।" },
      { title: "विज़िट के बाद", text: "श्री संजीव जैन उसी घर के लिए व्यावहारिक मार्गदर्शन बताते हैं। कुछ विचार उपयोग बदलने के होते हैं। निर्माण हो तो वास्तुकार या इंजीनियर से जाँच करवाएँ। उपाय अलग से तय होते हैं।" },
      { title: "कैसे बुक करें", text: "पूछताछ फ़ॉर्म भरें। निजी विज़िट ₹10,000 है। यात्रा अलग चर्चा होती है। परामर्श के जवाब के बाद ही विज़िट पक्की होती है।" },
    ],
    boundary: "आवासीय मार्गदर्शन स्थानिक है। दीवार, बीम या सेवा बदलने से पहले वास्तुकार या संरचना इंजीनियर से जाँच करवाएँ।",
    guide: {
      reading: "घर के लिए वास्तु",
      headline: "उस जगह को समझें जिसे आप घर कहते हैं।",
      concerns: [
        "मुख्य द्वार अटपटा लगता है, या कौन-सा प्रवेश वास्तव में उपयोग होता है स्पष्ट नहीं।",
        "रसोई, शयनकक्ष या बैठक नक्शे में सहज नहीं बैठती।",
        "परिवार घर बना रहा है या बदल रहा है और खर्च से पहले नक्शा देखवाना चाहता है।",
        "फ़्लैट में बदलाव सीमित हैं, और परिवार जानना चाहता है कि क्या अभी भी किया जा सकता है।",
      ],
      studied: ["रोज इस्तेमाल होने वाला मुख्य प्रवेश", "प्लॉट या फ़्लैट की दिशा", "बैठक, रसोई, शयनकक्ष और स्नानघर", "खिड़कियाँ, रोशनी और हवा", "नक्शे का केंद्र और घर का रास्ता", "आसपास जो विज़िट पर दिखे"],
      prepare: ["उत्तर अंकित फ़्लोर प्लान यदि हो", "सबसे महत्वपूर्ण कमरे या सवाल का संक्षिप्त नोट", "प्रवेश और संबंधित कमरों की फ़ोटो यदि साझा करने में सहज हों"],
      guidance: ["कमरे के उपयोग में बदलाव", "फ़र्नीचर या रोज़ के रास्ते में बदलाव", "निर्माण बदलाव केवल जब विज़िट सुझाए, और वास्तुकार/इंजीनियर की जाँच के बाद"],
      faqs: [
        { question: "क्या एक ही घर सलाह हर घर पर लागू होती है?", answer: "नहीं। प्रवेश, कमरे और परिवार का जीवन तय करते हैं क्या चर्चा होगी। एक घर का सुझाव दूसरे पर नकल नहीं होता।" },
        { question: "क्या फ़्लैट का अध्ययन हो सकता है?", answer: "हाँ। फ़्लैट में संरचनात्मक बदलाव कम होते हैं। विज़िट फिर भी प्रवेश, कमरे और उपयोग देखती है, और स्पष्ट बताती है क्या बदला जा सकता है।" },
      ],
    },
  },
  "business-vastu": {
    summary: "कार्यालय, दुकान या अन्य कार्यस्थल का निजी अध्ययन।",
    lead: "यह विज़िट कार्यालय, दुकान या अन्य व्यावसायिक जगह के लिए है। नक्शा और लोगों का उपयोग देखा जाता है। यह लाभ का वादा नहीं है।",
    paragraphs: [
      "कार्यालय, दुकान, क्लिनिक और अन्य व्यावसायिक परिसर काम के वातावरण के रूप में देखे जाते हैं। विज़िट दिशा और नक्शे के साथ कर्मचारियों, ग्राहकों और सामान की आवाजाही भी देखती है।",
      "सुझाव प्रवेश, केबिन या कैश डेस्क, भंडारण, या सार्वजनिक व निजी कमरों के संबंध पर हो सकते हैं। वे उसी परिसर के होते हैं। एक कार्यालय का सुझाव अगले का साँचा नहीं।",
      "यह परामर्श टर्नओवर का पूर्वानुमान नहीं लगाता, और व्यावसायिक, कर या कानूनी सलाह का विकल्प नहीं है। यह आपके कार्यस्थल का पारंपरिक स्थानिक पाठ है।",
    ],
    points: [
      { title: "किसे उपयोगी लग सकता है", text: "कार्यालय, दुकान, क्लिनिक और अन्य कार्यस्थलों के मालिक/प्रबंधक जो और फिट-आउट से पहले परिसर देखवाना चाहते हैं।" },
      { title: "क्या देखा जाता है", text: "प्रवेश, लोगों का रास्ता, केबिन या काउंटर, भंडारण, और ग्राहक स्वागत के कमरे।" },
      { title: "क्या तैयार रखें", text: "परिसर का नक्शा यदि हो, और कर्मचारी/आगंतुक कैसे उपयोग करते हैं इसका नोट। खाते या टर्नओवर साझा करने की ज़रूरत नहीं।" },
      { title: "विज़िट के बाद", text: "आपको उसी कार्यस्थल के लिए स्थानिक मार्गदर्शन मिलता है। यह बिक्री का पूर्वानुमान नहीं। कोई निर्माण बदलाव संरचना और पट्टे के ज़िम्मेदार लोगों से जाँचे।" },
      { title: "कैसे बुक करें", text: "शहर और परिसर का प्रकार बताकर पूछताछ भेजें। मौके की विज़िट ₹10,000 है। यात्रा और बाद का उपाय अलग हैं।" },
    ],
    boundary: "व्यावसायिक वास्तु मार्गदर्शन व्यापार-प्रदर्शन की गारंटी नहीं है। वित्तीय और कानूनी निर्णय योग्य पेशेवरों के पास रहते हैं।",
    guide: {
      reading: "व्यापार स्थानों के लिए वास्तु",
      headline: "उस जगह को समझें जहाँ आपका व्यवसाय चलता है।",
      concerns: ["कार्यालय प्रवेश या रिसेप्शन आगंतुकों के लिए ठीक नहीं लगता।", "वर्कस्टेशन, केबिन या मीटिंग रूम गलत जगह लगते हैं।", "दुकान, क्लिनिक या स्टूडियो फिट-आउट होने वाला है।", "मालिक और बदलाव से पहले परिसर देखवाना चाहता है।"],
      studied: ["सड़क या लॉबी से प्रवेश", "रिसेप्शन और आगंतुकों का रास्ता", "वर्कस्टेशन, मीटिंग रूम और मालिक का कार्यक्षेत्र", "स्टाफ़ क्षेत्र, भंडारण और खातों की मेज़ यदि सवाल का हिस्सा हो", "परिसर की दिशा और आसपास"],
      prepare: ["परिसर का नक्शा यदि हो", "कर्मचारी और आगंतुक कैसे उपयोग करते हैं इसका नोट", "टर्नओवर, कर कागज़ या क्लाइंट सूची साझा करने की ज़रूरत नहीं"],
      guidance: ["प्रवेश, काउंटर या केबिन का अलग उपयोग", "फिट-आउट से पहले किन कमरों पर ध्यान", "जहाँ संरचनात्मक बदलाव के लिए मकान मालिक, वास्तुकार या इंजीनियर चाहिए"],
      faqs: [
        { question: "क्या कार्यालय विज़िट अधिक व्यवसाय का वादा करती है?", answer: "नहीं। विज़िट कार्यस्थल देखती है। यह बिक्री, ग्राहक या लाभ का पूर्वानुमान नहीं, और व्यापार/कानूनी सलाह का विकल्प नहीं।" },
        { question: "क्या दुकान और कार्यालय साथ चर्चा हो सकते हैं?", answer: "केवल जब आप बताएँ कि विज़िट इमारत के किस हिस्से के लिए है। मिश्रित इमारत को स्पष्ट ब्रीफ़ चाहिए।" },
      ],
    },
  },
  "health-wellbeing": {
    summary: "अधिक विचारशील रहने के वातावरण के लिए पारंपरिक स्थानिक मार्गदर्शन।",
    lead: "कुछ ग्राहक स्वास्थ्य का ध्यान रखते हुए घर के वातावरण को अधिक स्थिर चाहते हैं। परामर्श रहने की जगहों पर विचार कर सकता है। यह बीमारी का इलाज नहीं करता।",
    paragraphs: [
      "स्वास्थ्य संबंधी पूछताछ सावधानी से सुनी जाती है और स्थानिक मार्गदर्शन की सीमा में रहती है। विज़िट चिंता से जुड़े कमरे, रोशनी, जगह और दिशा देखती है।",
      "सुझाव जब दिए जाते हैं तो वातावरण के बारे में होते हैं: कमरे का उपयोग, क्या बदला जा सकता है, और क्या मामूली बदलाव निर्माण से बेहतर है। वे नुस्खे, उपचार या निदान नहीं हैं।",
      "यदि आप अस्वस्थ हैं तो चिकित्सक के साथ जारी रखें। जगहों के बारे में केवल वही बताएँ जिसमें सहज हों। निजी स्वास्थ्य विवरण प्रकाशित नहीं होते।",
    ],
    points: [
      { title: "किसे उपयोगी लग सकता है", text: "जो लोग अपने रहने के कमरों को सावधानी से देखवाना चाहते हैं। यह घर के लिए है, चिकित्सकीय स्थिति के लिए नहीं।" },
      { title: "क्या देखा जाता है", text: "शयनकक्ष, रसोई और जहाँ कोई लंबे समय बिताता है, सहित रोशनी, जगह और दिशा।" },
      { title: "क्या तैयार रखें", text: "संबंधित कमरों के बारे में केवल वही साझा करें जिसमें सहज हों। नक्शा उपयोगी है। निजी स्वास्थ्य विवरण प्रकाशित नहीं होते।" },
      { title: "विज़िट के बाद", text: "सुझाव यदि हों तो वातावरण के बारे में होते हैं। वे निदान या इलाज नहीं। स्वास्थ्य निर्णयों के लिए डॉक्टर के साथ रहें।" },
      { title: "कैसे बुक करें", text: "पूछताछ फ़ॉर्म में बताएँ कि सवाल रहने के वातावरण के बारे में है। विज़िट शुल्क ₹10,000 है। उपाय विज़िट के बाद तय होते हैं।" },
    ],
    boundary: "यह परामर्श किसी स्थिति का निदान, उपचार या इलाज नहीं करता। यह चिकित्सा देखभाल का विकल्प नहीं है।",
    guide: {
      reading: "कल्याण और संतुलन",
      headline: "अधिक विचारशील रहने का वातावरण बनाएँ।",
      concerns: ["परिवार शयनकक्ष, रोशनी और रोज़ के कमरे सावधानी से देखवाना चाहता है।", "कोई एक कमरे में लंबे समय बिताता है और उस कमरे को नक्शे में समझना चाहता है।", "परिवार डॉक्टर के साथ इलाज जारी रखते हुए पर्यावरणीय सुझाव चाहता है।"],
      studied: ["कमरे की व्यवस्था और उपयोग", "प्राकृतिक रोशनी और हवा", "नक्शा और केंद्र", "आसपास जो विज़िट पर दिखे", "जगह के बारे में पारंपरिक वास्तु विचार, परंपरा के रूप में, चिकित्सा के रूप में नहीं"],
      prepare: ["कमरों के बारे में केवल वही कहें जिसमें सहज हों", "नक्शा उपयोगी है", "चिकित्सा रिपोर्ट न भेजें जब तक आपने चुना हो, और जानें कि वे प्रकाशित नहीं होतीं"],
      guidance: ["रोशनी, कमरे के उपयोग या जगह के सुझाव", "क्या निर्माण चाहिए इसका स्पष्ट कथन", "कोई निदान, नुस्खा या इलाज का दावा नहीं"],
      faqs: [
        { question: "क्या वास्तु विज़िट बीमारी का इलाज कर सकती है?", answer: "नहीं। यह रोग का निदान, इलाज या रोकथाम नहीं कर सकती। स्वास्थ्य निर्णयों के लिए योग्य डॉक्टर से बात करें। विज़िट केवल रहने के वातावरण के बारे में है।" },
        { question: "इस पेज पर संतुलन का क्या अर्थ है?", answer: "इसका अर्थ कमरों, रोशनी और उपयोग की विचारशील व्यवस्था है। इसका अर्थ चिकित्सकीय परिणाम नहीं।" },
      ],
    },
  },
  "financial-professional-guidance": {
    summary: "वित्तीय और व्यावसायिक चिंताओं वाले ग्राहकों के लिए व्यक्तिगत वास्तु आकलन।",
    lead: "कभी-कभी ग्राहक काम, व्यवसाय की स्थिरता, या पैसा और निर्णय वाले कमरों के बारे में पूछते हैं। जवाब संपत्ति का आकलन है, वित्तीय सलाह नहीं।",
    paragraphs: [
      "संजीव जैन के परामर्श में वे लोग भी आते हैं जो काम या वित्त से जुड़ी जगह व्यक्तिगत रूप से देखवाना चाहते हैं। विज़िट चिंता से जुड़े स्थानिक बिंदु पहचानती है और उसी संपत्ति के उपाय सुझाती है।",
      "सुझाव मामूली हो सकता है जैसे उपयोग बदलना, या निर्माण शामिल हो सकता है। उपाय शुल्क परामर्श से अलग है और आकलन के बाद ही पता चलता है। कोई वादा अधिकतम या वित्तीय परिणाम नहीं।",
      "अपना वास्तविक सवाल और संबंधित नक्शे लाएँ। परामर्श यह नहीं बताएगा कि कहाँ निवेश करें, कर कैसे भरें, या व्यापारिक निर्णय क्या हो।",
    ],
    points: [
      { title: "किसे उपयोगी लग सकता है", text: "जो लोग काम या पैसे से जुड़े कमरे देखवाना चाहते हैं। जवाब संपत्ति के बारे में है, निवेश के बारे में नहीं।" },
      { title: "क्या देखा जाता है", text: "अध्ययन कक्ष, खातों का कमरा, दुकान या होम ऑफ़िस, और वह कमरा नक्शे में कहाँ बैठता है।" },
      { title: "क्या तैयार रखें", text: "वास्तविक सवाल और संबंधित नक्शा लाएँ। बैंक विवरण या कर कागज़ साझा करने की ज़रूरत नहीं।" },
      { title: "विज़िट के बाद", text: "आप उसी जगह के लिए स्थानिक मार्गदर्शन लेकर जाते हैं। निवेश, कर या व्यापारिक निर्णय इस परामर्श के बाहर हैं।" },
      { title: "कैसे बुक करें", text: "फ़ॉर्म पर कमरा और चिंता बताएँ। निजी विज़िट ₹10,000 है। कोई वादा वित्तीय परिणाम नहीं, और उपाय अलग हैं।" },
    ],
    boundary: "यह परामर्श निवेश, कर, ऋण या कानूनी सलाह नहीं देता, और धन या व्यावसायिक सफलता का वादा नहीं करता।",
    guide: {
      reading: "समृद्धि के लिए पारंपरिक शब्द",
      headline: "अपने व्यावसायिक स्थान पर एक विचारशील दृष्टि।",
      concerns: ["अध्ययन, दुकान या खातों का कमरा काम के सवाल से जुड़ा है।", "होम ऑफ़िस ने किसी और उद्देश्य वाले कमरे पर कब्ज़ा कर लिया है।", "व्यक्ति काम से जुड़े कमरे व्यक्तिगत रूप से देखवाना चाहता है।"],
      studied: ["जहाँ काम या खाते वास्तव में होते हैं", "वह कमरा बाकी नक्शे में कैसे बैठता है", "उस काम के लिए उपयोग होने वाला प्रवेश", "चिंता संपत्ति के बारे में है या निवेश निर्णय के बारे में"],
      prepare: ["अपने शब्दों में सवाल", "सवाल से जुड़े संपत्ति का नक्शा", "कोई बैंक विवरण, पासवर्ड या कर रिटर्न नहीं"],
      guidance: ["कार्य कक्ष पर स्थानिक नोट्स", "उपयोग बदलाव और निर्माण में अंतर", "स्पष्ट सीमा: पैसे के निर्णय आपके और आपके सलाहकारों के पास रहते हैं"],
      faqs: [
        { question: "क्या यह परामर्श बताएगा कहाँ निवेश करें?", answer: "नहीं। यह संपत्ति देखता है। यह निवेश, कर, ऋण या कानूनी सलाह नहीं देता, और आय या धन का वादा नहीं करता।" },
        { question: "यहाँ संस्कृत शब्द समृद्धि क्यों है?", answer: "समृद्धि समृद्धि से जुड़ा पारंपरिक शब्द है। इस पेज पर यह कुछ ग्राहकों के सवाल का नाम है। यह विज़िट से धन का वादा नहीं।" },
      ],
    },
  },
};

const gu: Record<ServiceSlug, LocalizedServiceBody> = {
  "residential-vastu": {
    summary: "ઘર, ફ્લેટ કે પ્લોટનો અંગત અભ્યાસ, તેના જ નકશા પર આધારિત.",
    lead: "આ મુલાકાત ઘર, ફ્લેટ કે પ્લોટ માટે છે. શ્રી સંજીવ જૈન પ્રવેશ, ઓરડા અને આસપાસ જુએ છે, પછી સાદી ભાષામાં સમજાવે છે.",
    paragraphs: [
      "રહેણાંક કાર્ય પરિવારના પ્રશ્નો અને મિલકતના નકશાથી શરૂ થાય છે. એક જ ગલીના બે ઘરોમાં અલગ ધ્યાન જોઈ શકે કારણ કે પ્રવેશ, ઓરડાના સંબંધ અને રોજનો ઉપયોગ અલગ હોય છે.",
      "મુલાકાતમાં સંજીવ જૈન દિશા, જગ્યાઓનો ક્રમ અને તમારી ચિંતા સાથેના ભાગો જુએ છે. સૂચનો સામાન્ય ભાષામાં કહેવાય છે, જે વાસ્તવમાં કરી શકાય તે પર ભાર મૂકીને.",
      "નવું ઘર બનાવતા હો કે ફેરફાર કરતા હો તો ઉપલબ્ધ નકશા લાવો. ઉત્તર અંકિત ફ્લોર પ્લાન ઉપયોગી છે. મુલાકાત હજુ પણ જરૂરી છે.",
    ],
    points: [
      { title: "કોને ઉપયોગી લાગી શકે", text: "ઘર કે ફ્લેટમાં રહેતા પરિવારો, અને પ્લોટ કે બાંધકામ અધીન ઘરની યોજના કરનારા." },
      { title: "શું જોવામાં આવે છે", text: "પ્રવેશ, પ્લોટની દિશા, નકશાનું કેન્દ્ર, મુખ્ય ઓરડા, અને પરિવાર તેમનો વાસ્તવિક ઉપયોગ કેવી રીતે કરે છે." },
      { title: "શું તૈયાર રાખવું", text: "ઉત્તર અંકિત ફ્લોર પ્લાન જો હોય, અને સૌથી મહત્ત્વના ઓરડા કે પ્રશ્નની ટૂંકી નોંધ. ફોટા મદદ કરે છે, ફરજિયાત નથી." },
      { title: "મુલાકાત પછી", text: "શ્રી સંજીવ જૈન તે જ ઘર માટે વ્યવહારિક માર્ગદર્શન સમજાવે છે. કેટલાક વિચારો ઉપયોગ બદલવાના હોય છે. બાંધકામ હોય તો આર્કિટેક્ટ કે એન્જિનિયર પાસે તપાસ કરાવો." },
      { title: "કેવી રીતે બુક કરવું", text: "પૂછપરછ ફોર્મ ભરો. અંગત મુલાકાત ₹10,000 છે. મુસાફરી અલગ ચર્ચા થાય છે." },
    ],
    boundary: "રહેણાંક માર્ગદર્શન સ્થાનિક છે. દીવાલ, બીમ કે સેવા બદલતા પહેલાં આર્કિટેક્ટ કે સ્ટ્રક્ચરલ એન્જિનિયર પાસે તપાસ કરાવો.",
    guide: {
      reading: "ઘર માટે વાસ્તુ",
      headline: "તે જગ્યા સમજો જેને તમે ઘર કહો છો.",
      concerns: ["મુખ્ય દરવાજો અજીબ લાગે, કે કયો પ્રવેશ ખરેખર વપરાય છે તે સ્પષ્ટ નથી.", "રસોડું, શયનખંડ કે બેઠક નકશામાં સહજ નથી બેસતું.", "પરિવાર ઘર બનાવે છે કે બદલે છે અને ખર્ચ પહેલાં નકશો જોવડાવવા માંગે છે.", "ફ્લેટમાં ફેરફાર મર્યાદિત છે, અને પરિવાર જાણવા માંગે છે કે શું હજુ કરી શકાય."],
      studied: ["રોજ વપરાતો મુખ્ય પ્રવેશ", "પ્લોટ કે ફ્લેટની દિશા", "બેઠક, રસોડું, શયનખંડ અને સ્નાનઘર", "બારીઓ, પ્રકાશ અને હવા", "નકશાનું કેન્દ્ર અને ઘરનો માર્ગ", "આસપાસ જે મુલાકાતમાં દેખાય"],
      prepare: ["ઉત્તર અંકિત ફ્લોર પ્લાન જો હોય", "સૌથી મહત્ત્વના ઓરડા કે પ્રશ્નની ટૂંકી નોંધ", "પ્રવેશ અને સંબંધિત ઓરડાના ફોટા જો શેર કરવામાં સહજ હોય"],
      guidance: ["ઓરડાના ઉપયોગમાં ફેરફાર", "ફર્નિચર કે રોજના માર્ગમાં ફેરફાર", "બાંધકામ ફેરફાર માત્ર જ્યારે મુલાકાત સૂચવે, અને આર્કિટેક્ટ/એન્જિનિયરની તપાસ પછી"],
      faqs: [
        { question: "શું એક જ ઘરની સલાહ દરેક ઘર પર લાગુ પડે?", answer: "ના. પ્રવેશ, ઓરડા અને પરિવારનું જીવન નક્કી કરે શું ચર્ચા થશે. એક ઘરનું સૂચન બીજા પર નકલ થતું નથી." },
        { question: "શું ફ્લેટનો અભ્યાસ થઈ શકે?", answer: "હા. ફ્લેટમાં માળખાકીય ફેરફાર ઓછા હોય છે. મુલાકાત હજુ પણ પ્રવેશ, ઓરડા અને ઉપયોગ જુએ છે." },
      ],
    },
  },
  "business-vastu": {
    summary: "ઑફિસ, દુકાન કે અન્ય કાર્યસ્થળનો અંગત અભ્યાસ.",
    lead: "આ મુલાકાત ઑફિસ, દુકાન કે અન્ય વ્યવસાયિક જગ્યા માટે છે. નકશો અને લોકોનો ઉપયોગ જોવાય છે. આ નફાનું વચન નથી.",
    paragraphs: [
      "ઑફિસ, દુકાન, ક્લિનિક અને અન્ય વ્યવસાયિક પરિસર કામના વાતાવરણ તરીકે જોવાય છે. મુલાકાત દિશા અને નકશા સાથે સ્ટાફ, ગ્રાહકો અને માલની હિલચાલ પણ જુએ છે.",
      "સૂચનો પ્રવેશ, કેબિન કે કેશ ડેસ્ક, સ્ટોરેજ, અથવા જાહેર અને ખાનગી ઓરડાના સંબંધ પર હોઈ શકે. તે તે જ પરિસરના હોય છે.",
      "આ સલાહ ટર્નઓવરની આગાહી કરતી નથી, અને વ્યવસાયિક, કર કે કાનૂની સલાહનો વિકલ્પ નથી.",
    ],
    points: [
      { title: "કોને ઉપયોગી લાગી શકે", text: "ઑફિસ, દુકાન, ક્લિનિક અને અન્ય કાર્યસ્થળોના માલિક/મેનેજર કે જેઓ વધુ ફિટ-આઉટ પહેલાં પરિસર જોવડાવવા માંગે છે." },
      { title: "શું જોવામાં આવે છે", text: "પ્રવેશ, લોકોનો માર્ગ, કેબિન કે કાઉન્ટર, સ્ટોરેજ, અને ગ્રાહક સ્વાગતના ઓરડા." },
      { title: "શું તૈયાર રાખવું", text: "પરિસરનો નકશો જો હોય, અને સ્ટાફ/મુલાકાતીઓ કેવી રીતે વાપરે તેની નોંધ. હિસાબ કે ટર્નઓવર શેર કરવાની જરૂર નથી." },
      { title: "મુલાકાત પછી", text: "તમને તે જ કાર્યસ્થળ માટે સ્થાનિક માર્ગદર્શન મળે છે. આ વેચાણની આગાહી નથી." },
      { title: "કેવી રીતે બુક કરવું", text: "શહેર અને પરિસરનો પ્રકાર કહીને પૂછપરછ મોકલો. સ્થળ મુલાકાત ₹10,000 છે." },
    ],
    boundary: "વ્યવસાયિક વાસ્તુ માર્ગદર્શન વ્યવસાય-પ્રદર્શનની ગેરંટી નથી. નાણાકીય અને કાનૂની નિર્ણયો લાયક વ્યાવસાયિકો પાસે રહે છે.",
    guide: {
      reading: "વ્યવસાય સ્થાનો માટે વાસ્તુ",
      headline: "તે જગ્યા સમજો જ્યાં તમારો વ્યવસાય ચાલે છે.",
      concerns: ["ઑફિસ પ્રવેશ કે રિસેપ્શન મુલાકાતીઓ માટે યોગ્ય નથી લાગતું.", "વર્કસ્ટેશન, કેબિન કે મીટિંગ રૂમ ખોટી જગ્યાએ લાગે છે.", "દુકાન, ક્લિનિક કે સ્ટુડિયો ફિટ-આઉટ થવાનું છે.", "માલિક વધુ ફેરફાર પહેલાં પરિસર જોવડાવવા માંગે છે."],
      studied: ["રસ્તા કે લૉબીમાંથી પ્રવેશ", "રિસેપ્શન અને મુલાકાતીઓનો માર્ગ", "વર્કસ્ટેશન, મીટિંગ રૂમ અને માલિકનું કાર્યક્ષેત્ર", "સ્ટાફ વિસ્તાર, સ્ટોરેજ અને હિસાબની ડેસ્ક જો પ્રશ્નનો ભાગ હોય", "પરિસરની દિશા અને આસપાસ"],
      prepare: ["પરિસરનો નકશો જો હોય", "સ્ટાફ અને મુલાકાતીઓ કેવી રીતે વાપરે તેની નોંધ", "ટર્નઓવર, કર કાગળ કે ક્લાયન્ટ યાદી શેર કરવાની જરૂર નથી"],
      guidance: ["પ્રવેશ, કાઉન્ટર કે કેબિનનો અલગ ઉપયોગ", "ફિટ-આઉટ પહેલાં કયા ઓરડા પર ધ્યાન", "જ્યાં માળખાકીય ફેરફાર માટે મકાનમાલિક, આર્કિટેક્ટ કે એન્જિનિયર જોઈએ"],
      faqs: [
        { question: "શું ઑફિસ મુલાકાત વધુ વ્યવસાયનું વચન આપે?", answer: "ના. મુલાકાત કાર્યસ્થળ જુએ છે. તે વેચાણ, ગ્રાહક કે નફાની આગાહી કરતી નથી." },
        { question: "શું દુકાન અને ઑફિસ સાથે ચર્ચા થઈ શકે?", answer: "માત્ર જ્યારે તમે કહો કે મુલાકાત ઇમારતના કયા ભાગ માટે છે." },
      ],
    },
  },
  "health-wellbeing": {
    summary: "વધુ વિચારશીલ રહેવાના વાતાવરણ માટે પરંપરાગત સ્થાનિક માર્ગદર્શન.",
    lead: "કેટલાક ગ્રાહકો આરોગ્યની કાળજી રાખતા ઘરના વાતાવરણને વધુ સ્થિર ઇચ્છે છે. સલાહ રહેવાની જગ્યાઓ પર વિચાર કરી શકે. તે બીમારીનો ઉપચાર કરતી નથી.",
    paragraphs: [
      "આરોગ્ય સંબંધિત પૂછપરછ કાળજીથી સાંભળવામાં આવે છે અને સ્થાનિક માર્ગદર્શનની મર્યાદામાં રહે છે. મુલાકાત ચિંતા સાથેના ઓરડા, પ્રકાશ, જગ્યા અને દિશા જુએ છે.",
      "સૂચનો જ્યારે આપવામાં આવે ત્યારે વાતાવરણ વિશે હોય છે: ઓરડાનો ઉપયોગ, શું બદલી શકાય, અને શું નાનો ફેરફાર બાંધકામ કરતાં વધુ સારો છે. તે પ્રિસ્ક્રિપ્શન કે નિદાન નથી.",
      "જો તમે અસ્વસ્થ હો તો ડૉક્ટર સાથે ચાલુ રાખો. જગ્યાઓ વિશે માત્ર તે જ કહો જેમાં સહજ હો. ખાનગી આરોગ્ય વિગતો પ્રકાશિત થતી નથી.",
    ],
    points: [
      { title: "કોને ઉપયોગી લાગી શકે", text: "જે લોકો પોતાના રહેવાના ઓરડા કાળજીથી જોવડાવવા માંગે છે. આ ઘર માટે છે, તબીબી સ્થિતિ માટે નહીં." },
      { title: "શું જોવામાં આવે છે", text: "શયનખંડ, રસોડું અને જ્યાં કોઈ લાંબો સમય વિતાવે, સહિત પ્રકાશ, જગ્યા અને દિશા." },
      { title: "શું તૈયાર રાખવું", text: "સંબંધિત ઓરડા વિશે માત્ર તે જ શેર કરો જેમાં સહજ હો. નકશો ઉપયોગી છે." },
      { title: "મુલાકાત પછી", text: "સૂચનો જો હોય તો વાતાવરણ વિશે હોય છે. તે નિદાન કે ઉપચાર નથી." },
      { title: "કેવી રીતે બુક કરવું", text: "પૂછપરછ ફોર્મમાં કહો કે પ્રશ્ન રહેવાના વાતાવરણ વિશે છે. મુલાકાત ફી ₹10,000 છે." },
    ],
    boundary: "આ સલાહ કોઈ સ્થિતિનું નિદાન, સારવાર કે ઉપચાર કરતી નથી. તે તબીબી સંભાળનો વિકલ્પ નથી.",
    guide: {
      reading: "કલ્યાણ અને સંતુલન",
      headline: "વધુ વિચારશીલ રહેવાનું વાતાવરણ બનાવો.",
      concerns: ["પરિવાર શયનખંડ, પ્રકાશ અને રોજના ઓરડા કાળજીથી જોવડાવવા માંગે છે.", "કોઈ એક ઓરડામાં લાંબો સમય વિતાવે અને તે ઓરડાને નકશામાં સમજવા માંગે છે.", "પરિવાર ડૉક્ટર સાથે સારવાર ચાલુ રાખતા પર્યાવરણીય સૂચનો ઇચ્છે છે."],
      studied: ["ઓરડાની વ્યવસ્થા અને ઉપયોગ", "કુદરતી પ્રકાશ અને હવા", "નકશો અને કેન્દ્ર", "આસપાસ જે મુલાકાતમાં દેખાય", "જગ્યા વિશે પરંપરાગત વાસ્તુ વિચારો, પરંપરા તરીકે, તબીબી તરીકે નહીં"],
      prepare: ["ઓરડા વિશે માત્ર તે જ કહો જેમાં સહજ હો", "નકશો ઉપયોગી છે", "તબીબી રિપોર્ટ ન મોકલો સિવાય કે તમે પસંદ કર્યું હોય"],
      guidance: ["પ્રકાશ, ઓરડાના ઉપયોગ કે જગ્યા વિશે સૂચનો", "શું બાંધકામ જોઈએ તેનું સ્પષ્ટ કથન", "કોઈ નિદાન, પ્રિસ્ક્રિપ્શન કે ઉપચારનો દાવો નહીં"],
      faqs: [
        { question: "શું વાસ્તુ મુલાકાત બીમારીનો ઉપચાર કરી શકે?", answer: "ના. તે રોગનું નિદાન, ઉપચાર કે નિવારણ કરી શકતી નથી. આરોગ્ય નિર્ણયો માટે લાયક ડૉક્ટર સાથે વાત કરો." },
        { question: "આ પેજ પર સંતુલનનો અર્થ શું?", answer: "તેનો અર્થ ઓરડા, પ્રકાશ અને ઉપયોગની વિચારશીલ વ્યવસ્થા છે. તેનો અર્થ તબીબી પરિણામ નથી." },
      ],
    },
  },
  "financial-professional-guidance": {
    summary: "નાણાકીય અને વ્યાવસાયિક ચિંતા ધરાવતા ગ્રાહકો માટે વ્યક્તિગત વાસ્તુ મૂલ્યાંકન.",
    lead: "ક્યારેક ગ્રાહકો કામ, વ્યવસાયની સ્થિરતા, અથવા પૈસા અને નિર્ણયના ઓરડા વિશે પૂછે છે. જવાબ મિલકતનું મૂલ્યાંકન છે, નાણાકીય સલાહ નહીં.",
    paragraphs: [
      "સંજીવ જૈનની સલાહમાં એ લોકો પણ આવે છે જે કામ કે નાણાં સાથેની જગ્યા અંગત રીતે જોવડાવવા માંગે છે. મુલાકાત ચિંતા સાથેના સ્થાનિક બિંદુઓ ઓળખે છે અને તે જ મિલકત માટે ઉપાય સૂચવે છે.",
      "સૂચન નાનું હોઈ શકે જેમ કે ઉપયોગ બદલવો, અથવા બાંધકામ સમાવી શકે. ઉપાય ફી સલાહથી અલગ છે અને મૂલ્યાંકન પછી જ જાણી શકાય. કોઈ વચન મહત્તમ કે નાણાકીય પરિણામ નથી.",
      "તમારો વાસ્તવિક પ્રશ્ન અને સંબંધિત નકશા લાવો. સલાહ કહેશે નહીં કે ક્યાં રોકાણ કરો, કર કેવી રીતે ભરો, કે વ્યવસાયિક નિર્ણય શું હોવો જોઈએ.",
    ],
    points: [
      { title: "કોને ઉપયોગી લાગી શકે", text: "જે લોકો કામ કે પૈસા સાથેના ઓરડા જોવડાવવા માંગે છે. જવાબ મિલકત વિશે છે, રોકાણ વિશે નહીં." },
      { title: "શું જોવામાં આવે છે", text: "અભ્યાસ ખંડ, હિસાબનો ઓરડો, દુકાન કે હોમ ઑફિસ, અને તે ઓરડો નકશામાં ક્યાં બેસે છે." },
      { title: "શું તૈયાર રાખવું", text: "વાસ્તવિક પ્રશ્ન અને સંબંધિત નકશો લાવો. બેંક વિગતો કે કર કાગળ શેર કરવાની જરૂર નથી." },
      { title: "મુલાકાત પછી", text: "તમે તે જ જગ્યા માટે સ્થાનિક માર્ગદર્શન લઈને જાઓ. રોકાણ, કર કે વ્યવસાયિક નિર્ણય આ સલાહની બહાર છે." },
      { title: "કેવી રીતે બુક કરવું", text: "ફોર્મ પર ઓરડો અને ચિંતા કહો. અંગત મુલાકાત ₹10,000 છે. કોઈ વચન નાણાકીય પરિણામ નથી." },
    ],
    boundary: "આ સલાહ રોકાણ, કર, ધિરાણ કે કાનૂની સલાહ આપતી નથી, અને સંપત્તિ કે વ્યાવસાયિક સફળતાનું વચન આપતી નથી.",
    guide: {
      reading: "સમૃદ્ધિ માટે પરંપરાગત શબ્દ",
      headline: "તમારા વ્યાવસાયિક સ્થાન પર એક વિચારશીલ દૃષ્ટિ.",
      concerns: ["અભ્યાસ, દુકાન કે હિસાબનો ઓરડો કામના પ્રશ્ન સાથે જોડાયેલો છે.", "હોમ ઑફિસે અન્ય હેતુના ઓરડા પર કબજો કર્યો છે.", "વ્યક્તિ કામ સાથેના ઓરડા અંગત રીતે જોવડાવવા માંગે છે."],
      studied: ["જ્યાં કામ કે હિસાબ ખરેખર થાય છે", "તે ઓરડો બાકીના નકશામાં કેવી રીતે બેસે છે", "તે કામ માટે વપરાતો પ્રવેશ", "ચિંતા મિલકત વિશે છે કે રોકાણ નિર્ણય વિશે"],
      prepare: ["તમારા શબ્દોમાં પ્રશ્ન", "પ્રશ્ન સંબંધિત મિલકતનો નકશો", "કોઈ બેંક વિગતો, પાસવર્ડ કે કર રિટર્ન નહીં"],
      guidance: ["કાર્ય ખંડ પર સ્થાનિક નોંધો", "ઉપયોગ ફેરફાર અને બાંધકામ વચ્ચેનો તફાવત", "સ્પષ્ટ મર્યાદા: પૈસાના નિર્ણયો તમારા અને તમારા સલાહકારો પાસે રહે છે"],
      faqs: [
        { question: "શું આ સલાહ કહેશે ક્યાં રોકાણ કરવું?", answer: "ના. તે મિલકત જુએ છે. તે રોકાણ, કર, ધિરાણ કે કાનૂની સલાહ આપતી નથી." },
        { question: "અહીં સંસ્કૃત શબ્દ સમૃદ્ધિ કેમ છે?", answer: "સમૃદ્ધિ સમૃદ્ધિ સાથે જોડાયેલો પરંપરાગત શબ્દ છે. આ પેજ પર તે કેટલાક ગ્રાહકોના પ્રશ્નનું નામ છે. તે મુલાકાતથી સંપત્તિનું વચન નથી." },
      ],
    },
  },
};

const serviceBodies: Record<Locale, Record<ServiceSlug, LocalizedServiceBody>> = { en, hi, gu };

export function getServiceBody(locale: Locale, slug: string): LocalizedServiceBody | null {
  const map = serviceBodies[locale];
  if (slug in map) return map[slug as ServiceSlug];
  return null;
}
