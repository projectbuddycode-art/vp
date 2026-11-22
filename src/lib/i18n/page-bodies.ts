import type { Locale } from "@/lib/i18n/locale";
import type { DirectionKey } from "@/lib/directions";

export type PageBodies = {
  understanding: {
    filmNote: string;
    sections: { title: string; text: string }[];
    directionReading: string;
    directionMeaning: string;
    directionTitle: string;
    directionText: string;
    elementsReading: string;
    elementsMeaning: string;
    elementsTitle: string;
    diagramTitle: string;
    diagramText: string;
    seeApproach: string;
    bookCta: string;
  };
  approach: {
    filmNote: string;
    studyTitle: string;
    studyItems: { title: string; text: string }[];
    purposeTitle: string;
    purposeText: string;
    requestCta: string;
  };
  methodology: {
    eyebrow: string;
    title: string;
    text: string;
    stageMarker: string;
  };
  directionsPanel: {
    eyebrow: string;
    title: string;
    text: string;
    notes: Record<DirectionKey, { name: string; text: string }>;
  };
  elements: { name: string; meaning: string }[];
  legal: {
    privacyEyebrow: string;
    privacyTitle: string;
    privacyText: string;
    privacyBody: string[];
    termsEyebrow: string;
    termsTitle: string;
    termsText: string;
    termsBody: string[];
  };
  serviceChrome: {
    concerns: string;
    prepare: string;
    studied: string;
    guidance: string;
    faqs: string;
    personalTitle: string;
    personalText: string;
  };
};

const en: PageBodies = {
  understanding: {
    filmNote: "Architectural floor-plan film. Illustrative only. Not an assessment of a real property.",
    sections: [
      {
        title: "What Vastu Shastra means",
        text: "Vastu Shastra is a traditional Indian body of knowledge about buildings. It looks at the site, the rooms, and the way people use them. STHAPATYA uses it as a personal consultation, not as a product that scores every house the same way.",
      },
      {
        title: "Architecture and the space we live in",
        text: "A plan is not only a drawing. It is the path from the door to the kitchen, the place where people sit, and the rooms that have become offices or stores. Traditional Vastu pays attention to that arrangement. Modern bylaws, structure, and the lease still decide what can actually be built.",
      },
      {
        title: "Entrance and layout",
        text: "The door people use every day often matters more than a door that exists only on paper. The visit also looks at the sequence of rooms and at what sits in the middle of the plan. There is no published rule on this website that says one entrance is lucky for every plot.",
      },
      {
        title: "Room placement",
        text: "Kitchen, bedrooms, bathrooms, and work rooms are discussed in relation to the concern you bring. A traditional preference is an interpretation. It is explained as tradition. It is not presented as a laboratory result.",
      },
      {
        title: "Surroundings",
        text: "A road, a neighbour’s wall, a courtyard, or a drop in the land can change how a building is read. The consultant notes what can be seen on the visit. He does not claim to know a site he has not studied.",
      },
      {
        title: "Tradition and modern building requirements",
        text: "An old planning idea can inform a conversation. It does not replace a structural drawing, a fire rule, or a municipal approval. If guidance would move a wall, a stair, or a service, an architect or engineer should review it before anyone builds.",
      },
    ],
    directionReading: "Direction",
    directionMeaning: "Which way the plot and the rooms face. The compass below teaches the eight names. It does not point at your house.",
    directionTitle: "The eight directions",
    directionText:
      "North, east, south, west, and the four corners between them give a shared language. Different teachers describe the corners differently. STHAPATYA does not treat one corner chart as a diagnosis.",
    elementsReading: "The five elements",
    elementsMeaning: "Earth, water, fire, air, and space. A traditional language, not a medical test.",
    elementsTitle: "Five traditional elements",
    diagramTitle: "The Vastu diagram",
    diagramText:
      "The square is a traditional way to talk about the centre and the edges of a plan. The centre is often called the brahmasthan. The drawing on this page is original teaching artwork. It does not assess a floor plan, and it does not assign a remedy to each cell.",
    seeApproach: "See the consultation approach",
    bookCta: "Book a consultation",
  },
  approach: {
    filmNote: "Architectural film of a camera moving into a modern home. Not a client property, and not a record of a visit.",
    studyTitle: "How the property is studied",
    studyItems: [
      { title: "The concern", text: "The visit starts from the question you actually have, not from a fixed menu." },
      { title: "The property details", text: "City, property type, and any drawings are reviewed so the visit is prepared." },
      { title: "The layout", text: "Rooms, the centre of the plan, and the path through the building are looked at on site." },
      { title: "The directions", text: "North is established as reliably as the plan and the site allow." },
      { title: "Entrances and rooms", text: "The door people use, and the rooms tied to the concern, are discussed in plain words." },
      { title: "The surroundings", text: "What can be seen around the property is noted. A place he has not visited is not described." },
      { title: "Possible guidance", text: "Suggestions are specific to that property. They are not copied from the last visit." },
      { title: "What a change would mean", text: "A change of use is distinguished from building work." },
      { title: "Effort and cost", text: "The visit is ₹10,000. Travel and remedies are separate. A remedy price is not fixed before the assessment." },
    ],
    purposeTitle: "What the consultation is for",
    purposeText:
      "You leave with an account of the areas that asked for attention and with suggestions for that property. Implementation guidance explains how those suggestions can be carried out. Building work remains the responsibility of the people qualified to design and construct it.",
    requestCta: "Request your consultation",
  },
  methodology: {
    eyebrow: "Methodology",
    title: "No Two Properties Are the Same.",
    text: "Four stages, carried out by the consultant. The diagram explains the sequence. It does not assess a property.",
    stageMarker: "Stage marker",
  },
  directionsPanel: {
    eyebrow: "Directions",
    title: "Eight ways of reading a plan.",
    text: "These are the traditional directions a consultant names while standing in a property. Choosing one explains the idea. It does not assess your building.",
    notes: {
      n: {
        name: "North",
        text: "North is established on the ground from a reliable bearing, then discussed against the rooms that actually sit there. A consultation does not treat the word as a promise of wealth.",
      },
      ne: {
        name: "Northeast",
        text: "The northeast is traditionally discussed for openness and for how water or an entrance relates to the rest of the plan. What matters is the corner in front of the consultant, not a diagram alone.",
      },
      e: {
        name: "East",
        text: "East is read with the morning light and with the rooms that receive it. An entrance or a window on this side is discussed only in relation to that property’s layout.",
      },
      se: {
        name: "Southeast",
        text: "The southeast is traditionally associated with fire and with rooms such as a kitchen. The visit checks where those rooms actually are, rather than moving them on principle.",
      },
      s: {
        name: "South",
        text: "South is considered for weight, privacy, and the rooms that hold the more solid parts of a plan. Any suggestion follows the building, not a fixed rule copied from another house.",
      },
      sw: {
        name: "Southwest",
        text: "The southwest is traditionally discussed as a heavier corner of a plan. Whether that applies, and what to do, is decided only after the property has been seen.",
      },
      w: {
        name: "West",
        text: "West is reviewed for approach, afternoon light, and the rooms that close the day. The explanation stays with the plan being assessed.",
      },
      nw: {
        name: "Northwest",
        text: "The northwest is traditionally discussed in relation to movement and air. A consultation looks at circulation and openings there, and does not diagnose the household from the label.",
      },
    },
  },
  elements: [
    { name: "Earth", meaning: "The ground, the structure, and the weight of a building." },
    { name: "Water", meaning: "Water in and around a property, including how it is placed." },
    { name: "Fire", meaning: "Heat, the kitchen, and the brighter parts of a plan." },
    { name: "Air", meaning: "Movement of air, openings, and how a room breathes." },
    { name: "Space", meaning: "The open centre and the room a person can move through." },
  ],
  legal: {
    privacyEyebrow: "Privacy",
    privacyTitle: "How enquiry information is kept.",
    privacyText: "This policy describes the consultancy website. It should be reviewed by a legal adviser before it is treated as formal advice.",
    privacyBody: [
      "The enquiry form collects your name, mobile number, email, city, property type, consultation category, preferred mode and date, a description of the property, your concern, and any floor plans or photographs you choose to attach. Privacy consent is required. Marketing consent is separate and optional.",
      "Enquiries are stored in a private Supabase project so the consultancy can respond, schedule a visit, and keep notes. Property files are kept in a private storage bucket. They are not published on the website. Case studies and testimonials are published only after a separate decision to do so.",
      "A shortened hash of the network address may be stored with the consent record. The raw address is not kept in the enquiry. Access to client records is limited to authorised administrators.",
      "If email delivery is configured, an acknowledgement may be sent to the address you provide, and a notice may be sent to the consultancy. WhatsApp is offered as a link you can choose to open. The website does not send promotional WhatsApp messages.",
      "You may ask for a correction or deletion of an enquiry by contacting the consultancy through a published phone number or email address. Those contact details are added from the studio desk when they are ready.",
    ],
    termsEyebrow: "Terms",
    termsTitle: "The terms of a consultation enquiry.",
    termsText: "These terms describe the website and the consultation offer. Have them reviewed for your jurisdiction before relying on them.",
    termsBody: [
      "Submitting the form is a request for the consultancy to consider a visit or an initial discussion. It does not by itself reserve a date. A consultation is confirmed only when the consultancy agrees a time with you.",
      "The published fee covers a one-time personal property visit. Travel charges, where a journey requires them, may be quoted separately. Remedy costs are independent of the fee, depend on the recommendations, and are not capped by a guaranteed maximum.",
      "You are responsible for the accuracy of the details and files you send, and for having the right to share photographs and drawings of the property. Structural, medical, financial, and legal decisions remain with the professionals qualified to make them.",
      "Website content, including the knowledge centre, is general explanation. It is not a consultation and not a reading of any particular property.",
    ],
  },
  serviceChrome: {
    concerns: "Concerns people bring",
    prepare: "What to prepare",
    studied: "What is studied",
    guidance: "Forms of guidance",
    faqs: "Questions about this consultation",
    personalTitle: "The assessment remains personal.",
    personalText:
      "This page describes the kind of work. It does not read a property. The consultation fee covers a one-time personal visit, and any remedy is costed separately.",
  },
};

const hi: PageBodies = {
  understanding: {
    filmNote: "वास्तु नक्शे की वास्तु अध्ययन फ़िल्म। केवल उदाहरण। किसी वास्तविक संपत्ति का आकलन नहीं।",
    sections: [
      {
        title: "वास्तु शास्त्र का अर्थ",
        text: "वास्तु शास्त्र इमारतों के बारे में पारंपरिक भारतीय ज्ञान है। यह जगह, कमरों और लोगों के उपयोग को देखता है। स्थापत्य इसे निजी परामर्श के रूप में उपयोग करता है, न कि हर घर को एक जैसे अंक देने वाले उत्पाद के रूप में।",
      },
      {
        title: "वास्तुकला और वह जगह जहाँ हम रहते हैं",
        text: "नक्शा केवल ड्राइंग नहीं है। यह दरवाज़े से रसोई तक का रास्ता, बैठने की जगह, और वे कमरे हैं जो दफ़्तर या भंडार बन गए। पारंपरिक वास्तु उस व्यवस्था पर ध्यान देता है। आधुनिक नियम, संरचना और पट्टा तय करते हैं कि वास्तव में क्या बन सकता है।",
      },
      {
        title: "प्रवेश और नक्शा",
        text: "रोज इस्तेमाल होने वाला दरवाज़ा अक्सर कागज़ पर बने दरवाज़े से अधिक मायने रखता है। विज़िट कमरों के क्रम और नक्शे के बीच की जगह को भी देखती है। इस वेबसाइट पर कोई ऐसा नियम नहीं है जो हर प्लॉट के लिए एक प्रवेश को शुभ बताए।",
      },
      {
        title: "कमरों की जगह",
        text: "रसोई, शयनकक्ष, स्नानघर और काम के कमरे आपकी चिंता के संबंध में चर्चा होते हैं। पारंपरिक पसंद एक व्याख्या है। इसे परंपरा के रूप में समझाया जाता है। इसे प्रयोगशाला परिणाम नहीं कहा जाता।",
      },
      {
        title: "आसपास",
        text: "सड़क, पड़ोसी की दीवार, आँगन या ज़मीन का ढलान इमारत की समझ बदल सकता है। परामर्शदाता विज़िट पर जो दिखता है उसे नोट करता है। न देखी जगह का दावा नहीं करता।",
      },
      {
        title: "परंपरा और आधुनिक निर्माण आवश्यकताएँ",
        text: "पुराना नियोजन विचार बातचीत में मदद कर सकता है। यह संरचनात्मक ड्राइंग, अग्नि नियम या नगरपालिका अनुमति का विकल्प नहीं है। अगर मार्गदर्शन दीवार, सीढ़ी या सेवा हिलाए, निर्माण से पहले वास्तुकार या इंजीनियर की जाँच चाहिए।",
      },
    ],
    directionReading: "दिशा",
    directionMeaning: "प्लॉट और कमरे किस ओर मुख करते हैं। नीचे का कम्पास आठ नाम सिखाता है। यह आपके घर की ओर नहीं इशारा करता।",
    directionTitle: "आठ दिशाएँ",
    directionText:
      "उत्तर, पूर्व, दक्षिण, पश्चिम और उनके बीच के चार कोने एक साझा भाषा देते हैं। अलग शिक्षक कोनों को अलग तरह से बताते हैं। स्थापत्य एक कोने के चार्ट को निदान नहीं मानता।",
    elementsReading: "पाँच तत्व",
    elementsMeaning: "पृथ्वी, जल, अग्नि, वायु और आकाश। पारंपरिक भाषा, चिकित्सा जाँच नहीं।",
    elementsTitle: "पाँच पारंपरिक तत्व",
    diagramTitle: "वास्तु आरेख",
    diagramText:
      "वर्ग नक्शे के केंद्र और किनारों की बात करने का पारंपरिक तरीका है। केंद्र को अक्सर ब्रह्मस्थान कहते हैं। इस पेज का चित्र शिक्षण कला है। यह फ़्लोर प्लान नहीं आंकता, और हर कोष्ठक के लिए उपाय नहीं बताता।",
    seeApproach: "परामर्श की विधि देखें",
    bookCta: "परामर्श बुक करें",
  },
  approach: {
    filmNote: "आधुनिक घर में प्रवेश करती कैमरा फ़िल्म। ग्राहक की संपत्ति नहीं, और विज़िट का रिकॉर्ड नहीं।",
    studyTitle: "संपत्ति का अध्ययन कैसे होता है",
    studyItems: [
      { title: "चिंता", text: "विज़िट आपके वास्तविक सवाल से शुरू होती है, किसी तय मेनू से नहीं।" },
      { title: "संपत्ति का विवरण", text: "शहर, संपत्ति का प्रकार और उपलब्ध नक्शे विज़िट की तैयारी के लिए देखे जाते हैं।" },
      { title: "नक्शा", text: "कमरे, नक्शे का केंद्र और इमारत के रास्ते को मौके पर देखा जाता है।" },
      { title: "दिशाएँ", text: "उत्तर को नक्शे और जगह जितनी विश्वसनीयता देती है, उतनी सावधानी से तय किया जाता है।" },
      { title: "प्रवेश और कमरे", text: "लोग जिस दरवाज़े का उपयोग करते हैं, और चिंता से जुड़े कमरे, सादी भाषा में चर्चा होते हैं।" },
      { title: "आसपास", text: "संपत्ति के आसपास जो दिखता है नोट किया जाता है। न देखी जगह का वर्णन नहीं किया जाता।" },
      { title: "संभव मार्गदर्शन", text: "सुझाव उसी संपत्ति के होते हैं। पिछली विज़िट से नकल नहीं की जाती।" },
      { title: "बदलाव का अर्थ", text: "उपयोग का बदलाव और निर्माण कार्य अलग बताए जाते हैं।" },
      { title: "समय और शुल्क", text: "विज़िट ₹10,000 है। यात्रा और उपाय अलग हैं। आकलन से पहले उपाय की कीमत तय नहीं होती।" },
    ],
    purposeTitle: "परामर्श किसके लिए है",
    purposeText:
      "आप उन क्षेत्रों का विवरण लेकर जाते हैं जहाँ ध्यान चाहिए था, और उसी संपत्ति के सुझाव। क्रियान्वयन बताता है कि सुझाव कैसे लागू हो सकते हैं। निर्माण योग्य लोगों की जिम्मेदारी रहती है।",
    requestCta: "अपना परामर्श अनुरोध करें",
  },
  methodology: {
    eyebrow: "विधि",
    title: "कोई दो संपत्तियाँ एक जैसी नहीं।",
    text: "चार चरण, परामर्शदाता द्वारा। आरेख क्रम समझाता है। यह संपत्ति नहीं आंकता।",
    stageMarker: "चरण चिह्न",
  },
  directionsPanel: {
    eyebrow: "दिशाएँ",
    title: "नक्शा पढ़ने के आठ तरीके।",
    text: "ये पारंपरिक दिशाएँ हैं जिन्हें परामर्शदाता संपत्ति में खड़े होकर नाम देता है। चुनना विचार समझाता है। आपकी इमारत नहीं आंकता।",
    notes: {
      n: { name: "उत्तर", text: "उत्तर ज़मीन पर विश्वसनीय दिशा से तय होता है, फिर वहाँ मौजूद कमरों के साथ चर्चा होता है। परामर्श शब्द को धन का वादा नहीं मानता।" },
      ne: { name: "ईशान", text: "उत्तर-पूर्व पारंपरिक रूप से खुलेपन और पानी या प्रवेश से नक्शे के संबंध के लिए चर्चा होता है। महत्वपूर्ण वही कोना है जो सामने है, केवल आरेख नहीं।" },
      e: { name: "पूर्व", text: "पूर्व सुबह की रोशनी और उसे पाने वाले कमरों के साथ पढ़ा जाता है। इस ओर प्रवेश या खिड़की केवल उसी संपत्ति के नक्शे के संबंध में चर्चा होती है।" },
      se: { name: "आग्नेय", text: "दक्षिण-पूर्व पारंपरिक रूप से अग्नि और रसोई जैसे कमरों से जुड़ा है। विज़िट देखती है कि वे कमरे वास्तव में कहाँ हैं।" },
      s: { name: "दक्षिण", text: "दक्षिण वजन, निजता और नक्शे के ठोस हिस्सों के लिए देखा जाता है। सुझाव इमारत के अनुसार होता है, किसी दूसरे घर के नियम से नहीं।" },
      sw: { name: "नैऋत्य", text: "दक्षिण-पश्चिम पारंपरिक रूप से नक्शे का भारी कोना माना जाता है। लागू होता है या नहीं, संपत्ति देखने के बाद ही तय होता है।" },
      w: { name: "पश्चिम", text: "पश्चिम पहुँच, दोपहर की रोशनी और दिन बंद करने वाले कमरों के लिए देखा जाता है। व्याख्या उसी नक्शे पर रहती है।" },
      nw: { name: "वायव्य", text: "उत्तर-पश्चिम पारंपरिक रूप से आवाजाही और हवा से जुड़ा है। परामर्श वहाँ परिसंचरण और खुलेपन को देखता है।" },
    },
  },
  elements: [
    { name: "पृथ्वी", meaning: "ज़मीन, संरचना और इमारत का भार।" },
    { name: "जल", meaning: "संपत्ति में और आसपास पानी, और उसकी जगह।" },
    { name: "अग्नि", meaning: "गर्मी, रसोई और नक्शे के उजले हिस्से।" },
    { name: "वायु", meaning: "हवा का प्रवाह, खुले द्वार और कमरे की साँस।" },
    { name: "आकाश", meaning: "खुला केंद्र और वह जगह जिससे व्यक्ति गुज़र सके।" },
  ],
  legal: {
    privacyEyebrow: "गोपनीयता",
    privacyTitle: "पूछताछ की जानकारी कैसे रखी जाती है।",
    privacyText: "यह नीति परामर्श वेबसाइट का वर्णन करती है। औपचारिक सलाह मानने से पहले कानूनी सलाहकार से समीक्षा करवाएँ।",
    privacyBody: [
      "पूछताछ फ़ॉर्म नाम, मोबाइल, ईमेल, शहर, संपत्ति प्रकार, परामर्श श्रेणी, पसंदीदा तरीका और तारीख, संपत्ति का विवरण, चिंता, और आपके नक्शे या फ़ोटो एकत्र करता है। गोपनीयता सहमति आवश्यक है। मार्केटिंग सहमति अलग और वैकल्पिक है।",
      "पूछताछ निजी सुपाबेस प्रोजेक्ट में रखी जाती है ताकि परामर्श जवाब दे सके। संपत्ति फ़ाइलें निजी भंडार में रहती हैं। वे वेबसाइट पर प्रकाशित नहीं होतीं।",
      "सहमति रिकॉर्ड के साथ नेटवर्क पते का छोटा हैश रखा जा सकता है। कच्चा पता नहीं रखा जाता। पहुँच अधिकृत व्यवस्थापकों तक सीमित है।",
      "ईमेल सेट हो तो आपको पावती और परामर्श को सूचना मिल सकती है। व्हाट्सऐप एक लिंक है जिसे आप खोल सकते हैं। वेबसाइट प्रचारात्मक व्हाट्सऐप नहीं भेजती।",
      "प्रकाशित फ़ोन या ईमेल से पूछताछ सुधार या हटाने का अनुरोध कर सकते हैं।",
    ],
    termsEyebrow: "नियम",
    termsTitle: "परामर्श पूछताछ की शर्तें।",
    termsText: "ये शर्तें वेबसाइट और परामर्श प्रस्ताव बताती हैं। अपने क्षेत्र के अनुसार समीक्षा करवाएँ।",
    termsBody: [
      "फ़ॉर्म भेजना विज़िट या प्रारंभिक बातचीत का अनुरोध है। यह स्वयं तारीख आरक्षित नहीं करता। परामर्श तभी पक्का होता है जब समय तय हो।",
      "प्रकाशित शुल्क एक बार की निजी संपत्ति विज़िट के लिए है। यात्रा अलग हो सकती है। उपाय शुल्क से अलग हैं और अधिकतम गारंटी नहीं।",
      "आप भेजे विवरण और फ़ाइलों की सटीकता तथा फ़ोटो/नक्शे साझा करने के अधिकार के जिम्मेदार हैं। संरचनात्मक, चिकित्सा, वित्तीय और कानूनी निर्णय योग्य पेशेवरों के पास रहते हैं।",
      "ज्ञान केन्द्र सहित वेबसाइट सामग्री सामान्य व्याख्या है। यह परामर्श नहीं और किसी विशेष संपत्ति का पाठ नहीं।",
    ],
  },
  serviceChrome: {
    concerns: "लोग जिन चिंताओं के साथ आते हैं",
    prepare: "क्या तैयार रखें",
    studied: "क्या देखा जाता है",
    guidance: "मार्गदर्शन के रूप",
    faqs: "इस परामर्श के बारे में प्रश्न",
    personalTitle: "आकलन निजी ही रहता है।",
    personalText: "यह पेज काम का प्रकार बताता है। यह संपत्ति नहीं पढ़ता। परामर्श शुल्क एक निजी विज़िट के लिए है, और कोई उपाय अलग से तय होता है।",
  },
};

const gu: PageBodies = {
  understanding: {
    filmNote: "વાસ્તુ નકશાની અભ્યાસ ફિલ્મ. માત્ર ઉદાહરણ. કોઈ વાસ્તવિક મિલકતનું મૂલ્યાંકન નથી.",
    sections: [
      {
        title: "વાસ્તુ શાસ્ત્રનો અર્થ",
        text: "વાસ્તુ શાસ્ત્ર ઇમારતો વિશેનું પરંપરાગત ભારતીય જ્ઞાન છે. તે જગ્યા, ઓરડા અને લોકોના ઉપયોગને જુએ છે. સ્થાપત્ય તેને અંગત સલાહ તરીકે વાપરે છે, દરેક ઘરને એકસરખા ગુણ આપતા ઉત્પાદન તરીકે નહીં.",
      },
      {
        title: "સ્થાપત્ય અને જ્યાં આપણે રહીએ છીએ તે જગ્યા",
        text: "નકશો માત્ર ડ્રોઇંગ નથી. તે દરવાજાથી રસોડા સુધીનો માર્ગ, બેસવાની જગ્યા અને જે ઓરડા ઑફિસ કે સ્ટોર બની ગયા છે તે છે. પરંપરાગત વાસ્તુ તે વ્યવસ્થા પર ધ્યાન આપે છે.",
      },
      {
        title: "પ્રવેશ અને નકશો",
        text: "રોજ વપરાતો દરવાજો કાગળ પરના દરવાજા કરતાં વધુ મહત્ત્વનો હોય છે. મુલાકાત ઓરડાના ક્રમ અને નકશાની મધ્ય જગ્યા પણ જુએ છે.",
      },
      {
        title: "ઓરડાની જગ્યા",
        text: "રસોડું, શયનખંડ, સ્નાનઘર અને કામના ઓરડા તમારી ચિંતા સાથે ચર્ચા થાય છે. પરંપરાગત પસંદગી એક વ્યાખ્યા છે, પ્રયોગશાળાનું પરિણામ નથી.",
      },
      {
        title: "આસપાસ",
        text: "રસ્તો, પાડોશીની દીવાલ, આંગણું કે જમીનનો ઢોળાવ ઇમારતની સમજ બદલી શકે. સલાહકાર મુલાકાતમાં જે દેખાય તે નોંધે છે.",
      },
      {
        title: "પરંપરા અને આધુનિક બાંધકામ જરૂરિયાતો",
        text: "જૂનો આયોજન વિચાર વાતચીતમાં મદદ કરી શકે. તે માળખાકીય ડ્રોઇંગ કે મ્યુનિસિપલ મંજૂરીનો વિકલ્પ નથી.",
      },
    ],
    directionReading: "દિશા",
    directionMeaning: "પ્લોટ અને ઓરડા કઈ તરફ મુખ કરે છે. નીચેનો કંપાસ આઠ નામ શીખવે છે. તે તમારા ઘર તરફ નિર્દેશ કરતો નથી.",
    directionTitle: "આઠ દિશાઓ",
    directionText: "ઉત્તર, પૂર્વ, દક્ષિણ, પશ્ચિમ અને વચ્ચેના ચાર ખૂણા સહિયારી ભાષા આપે છે. સ્થાપત્ય એક ખૂણાના ચાર્ટને નિદાન ન માને.",
    elementsReading: "પાંચ તત્ત્વો",
    elementsMeaning: "પૃથ્વી, જળ, અગ્નિ, વાયુ અને આકાશ. પરંપરાગત ભાષા, તબીબી પરીક્ષા નહીં.",
    elementsTitle: "પાંચ પરંપરાગત તત્ત્વો",
    diagramTitle: "વાસ્તુ આકૃતિ",
    diagramText: "ચોરસ નકશાના કેન્દ્ર અને કિનારાની વાત કરવાની પરંપરાગત રીત છે. આ પેજનું ચિત્ર શિક્ષણ કલા છે. તે ફ્લોર પ્લાનનું મૂલ્યાંકન કરતું નથી.",
    seeApproach: "સલાહની રીત જુઓ",
    bookCta: "સલાહ બુક કરો",
  },
  approach: {
    filmNote: "આધુનિક ઘરમાં પ્રવેશતી કૅમેરા ફિલ્મ. ગ્રાહકની મિલકત નથી, અને મુલાકાતનો રેકોર્ડ નથી.",
    studyTitle: "મિલકતનો અભ્યાસ કેવી રીતે થાય છે",
    studyItems: [
      { title: "ચિંતા", text: "મુલાકાત તમારા વાસ્તવિક પ્રશ્નથી શરૂ થાય છે, નિશ્ચિત મેનૂથી નહીં." },
      { title: "મિલકતની વિગતો", text: "શહેર, મિલકતનો પ્રકાર અને ઉપલબ્ધ નકશા મુલાકાતની તૈયારી માટે જોવાય છે." },
      { title: "નકશો", text: "ઓરડા, નકશાનું કેન્દ્ર અને ઇમારતના માર્ગ સ્થળ પર જોવાય છે." },
      { title: "દિશાઓ", text: "ઉત્તરને નકશો અને સ્થળ જેટલી વિશ્વસનીયતા આપે તેટલી કાળજીથી નક્કી કરવામાં આવે છે." },
      { title: "પ્રવેશ અને ઓરડા", text: "લોકો જે દરવાજો વાપરે અને ચિંતા સાથેના ઓરડા સાદી ભાષામાં ચર્ચા થાય છે." },
      { title: "આસપાસ", text: "મિલકતની આસપાસ જે દેખાય તે નોંધાય છે. ન જોયેલી જગ્યાનું વર્ણન નથી." },
      { title: "શક્ય માર્ગદર્શન", text: "સૂચનો તે જ મિલકતના હોય છે. છેલ્લી મુલાકાતની નકલ નથી." },
      { title: "ફેરફારનો અર્થ", text: "ઉપયોગનો ફેરફાર અને બાંધકામ અલગ કહેવાય છે." },
      { title: "સમય અને ફી", text: "મુલાકાત ₹10,000 છે. મુસાફરી અને ઉપાય અલગ છે." },
    ],
    purposeTitle: "સલાહ શા માટે છે",
    purposeText: "તમે ધ્યાન માગતા ક્ષેત્રોનું વર્ણન અને તે જ મિલકતના સૂચનો લઈને જાઓ. બાંધકામ લાયક વ્યાવસાયિકોની જવાબદારી રહે છે.",
    requestCta: "તમારી સલાહની વિનંતી કરો",
  },
  methodology: {
    eyebrow: "પદ્ધતિ",
    title: "કોઈ બે મિલકતો એકસરખી નથી.",
    text: "ચાર તબક્કા, સલાહકાર દ્વારા. આકૃતિ ક્રમ સમજાવે છે. તે મિલકતનું મૂલ્યાંકન કરતી નથી.",
    stageMarker: "તબક્કાનું ચિહ્ન",
  },
  directionsPanel: {
    eyebrow: "દિશાઓ",
    title: "નકશો વાંચવાની આઠ રીતો.",
    text: "આ પરંપરાગત દિશાઓ છે જે સલાહકાર મિલકતમાં ઊભા રહીને નામ આપે છે. પસંદગી વિચાર સમજાવે છે. તમારી ઇમારતનું મૂલ્યાંકન નથી.",
    notes: {
      n: { name: "ઉત્તર", text: "ઉત્તર જમીન પર વિશ્વસનીય દિશાથી નક્કી થાય છે, પછી ત્યાંના ઓરડા સાથે ચર્ચા થાય છે." },
      ne: { name: "ઈશાન", text: "ઉત્તર-પૂર્વ પરંપરાગત રીતે ખુલ્લાપણા અને પાણી કે પ્રવેશ સાથે ચર્ચા થાય છે." },
      e: { name: "પૂર્વ", text: "પૂર્વ સવારના પ્રકાશ અને તે મેળવતા ઓરડા સાથે વાંચાય છે." },
      se: { name: "આગ્નેય", text: "દક્ષિણ-પૂર્વ પરંપરાગત રીતે અગ્નિ અને રસોડા જેવા ઓરડા સાથે જોડાયેલ છે." },
      s: { name: "દક્ષિણ", text: "દક્ષિણ વજન, ગોપનીયતા અને નકશાના મજબૂત ભાગો માટે જોવાય છે." },
      sw: { name: "નૈઋત્ય", text: "દક્ષિણ-પશ્ચિમ પરંપરાગત રીતે ભારે ખૂણો મનાય છે. મિલકત જોયા પછી જ નક્કી થાય." },
      w: { name: "પશ્ચિમ", text: "પશ્ચિમ પહોંચ, બપોરના પ્રકાશ અને દિવસ બંધ કરતા ઓરડા માટે જોવાય છે." },
      nw: { name: "વાયવ્ય", text: "ઉત્તર-પશ્ચિમ પરંપરાગત રીતે હલનચલન અને હવા સાથે જોડાયેલ છે." },
    },
  },
  elements: [
    { name: "પૃથ્વી", meaning: "જમીન, માળખું અને ઇમારતનું વજન." },
    { name: "જળ", meaning: "મિલકતમાં અને આસપાસ પાણી, અને તેની જગ્યા." },
    { name: "અગ્નિ", meaning: "ગરમી, રસોડું અને નકશાના ઉજાસ ભાગો." },
    { name: "વાયુ", meaning: "હવાની હિલચાલ, ખુલ્લા દ્વાર અને ઓરડાનો શ્વાસ." },
    { name: "આકાશ", meaning: "ખુલ્લું કેન્દ્ર અને જે જગ્યામાં વ્યક્તિ ફરી શકે." },
  ],
  legal: {
    privacyEyebrow: "ગોપનીયતા",
    privacyTitle: "પૂછપરછની માહિતી કેવી રીતે રાખવામાં આવે છે.",
    privacyText: "આ નીતિ સલાહ વેબસાઇટનું વર્ણન કરે છે. ઔપચારિક સલાહ માનતા પહેલાં કાનૂની સલાહકાર પાસે સમીક્ષા કરાવો.",
    privacyBody: [
      "પૂછપરછ ફોર્મ નામ, મોબાઇલ, ઈમેલ, શહેર, મિલકત પ્રકાર, સલાહ શ્રેણી, પસંદની રીત અને તારીખ, મિલકતનું વર્ણન, ચિંતા અને તમારા નકશા કે ફોટા એકત્ર કરે છે.",
      "પૂછપરછ ખાનગી સુપાબેઝ પ્રોજેક્ટમાં રાખવામાં આવે છે જેથી સલાહ જવાબ આપી શકે. મિલકત ફાઇલો ખાનગી સ્ટોરેજમાં રહે છે.",
      "સંમતિ રેકોર્ડ સાથે નેટવર્ક સરનામાંનો ટૂંકો હેશ રાખી શકાય. કાચું સરનામું નથી રાખાતું.",
      "ઈમેલ સેટ હોય તો પાવતી અને સૂચના મળી શકે. વોટ્સએપ એક લિંક છે જે તમે ખોલી શકો.",
      "પ્રકાશિત ફોન કે ઈમેલ દ્વારા સુધારા કે કાઢી નાખવાની વિનંતી કરી શકો.",
    ],
    termsEyebrow: "નિયમો",
    termsTitle: "સલાહ પૂછપરછની શરતો.",
    termsText: "આ શરતો વેબસાઇટ અને સલાહ ઑફર વર્ણવે છે. તમારા ક્ષેત્ર મુજબ સમીક્ષા કરાવો.",
    termsBody: [
      "ફોર્મ મોકલવું એ મુલાકાત કે પ્રારંભિક વાતચીતની વિનંતી છે. તે પોતે તારીખ અનામત કરતું નથી.",
      "પ્રકાશિત ફી એક વખતની અંગત મિલકત મુલાકાત માટે છે. મુસાફરી અને ઉપાય અલગ હોઈ શકે.",
      "તમે મોકલેલી વિગતો અને ફાઇલોની ચોકસાઈ તથા ફોટા/નકશા વહેંચવાના અધિકાર માટે જવાબદાર છો.",
      "જ્ઞાન કેન્દ્ર સહિત વેબસાઇટ સામગ્રી સામાન્ય સમજૂતી છે. તે સલાહ નથી અને કોઈ ચોક્કસ મિલકતનું વાંચન નથી.",
    ],
  },
  serviceChrome: {
    concerns: "લોકો જે ચિંતા લઈને આવે છે",
    prepare: "શું તૈયાર રાખવું",
    studied: "શું જોવામાં આવે છે",
    guidance: "માર્ગદર્શનના સ્વરૂપો",
    faqs: "આ સલાહ વિશેના પ્રશ્નો",
    personalTitle: "મૂલ્યાંકન અંગત જ રહે છે.",
    personalText: "આ પેજ કામનો પ્રકાર વર્ણવે છે. તે મિલકત વાંચતું નથી. સલાહ ફી એક અંગત મુલાકાત માટે છે, અને કોઈ ઉપાય અલગથી નક્કી થાય છે.",
  },
};

export const pageBodies: Record<Locale, PageBodies> = { en, hi, gu };

export function getPageBodies(locale: Locale) {
  return pageBodies[locale];
}
