export type SanskritVerse = {
  id: string;
  sanskrit: string;
  transliteration: string;
  translation: string;
  source: string;
};

/**
 * Classical verses only. These are not Vastu readings of a property.
 * They are published Upaniṣadic and traditional śānti texts.
 */
export const verses: SanskritVerse[] = [
  {
    id: "brihadaranyaka-1-3-28",
    sanskrit: "ॐ असतो मा सद्गमय । तमसो मा ज्योतिर्गमय । मृत्योर्मा अमृतं गमय । ॐ शान्तिः शान्तिः शान्तिः ॥",
    transliteration: "oṃ asato mā sad gamaya. tamaso mā jyotir gamaya. mṛtyor mā amṛtaṃ gamaya. oṃ śāntiḥ śāntiḥ śāntiḥ.",
    translation: "Lead me from what is not true to what is true. From darkness to light. From death to what does not die.",
    source: "Bṛhadāraṇyaka Upaniṣad 1.3.28",
  },
  {
    id: "isha-1",
    sanskrit: "ईशा वास्यमिदं सर्वं यत्किञ्च जगत्यां जगत् । तेन त्यक्तेन भुञ्जीथा मा गृधः कस्यस्विद्धनम् ॥",
    transliteration: "īśā vāsyam idaṃ sarvaṃ yat kiñca jagatyāṃ jagat. tena tyaktena bhuñjīthā mā gṛdhaḥ kasya svid dhanam.",
    translation: "All of this world is pervaded by the divine. Enjoy with a sense of letting go. Do not take what belongs to someone else.",
    source: "Īśā Upaniṣad, verse 1",
  },
  {
    id: "taittiriya-shanti",
    sanskrit: "ॐ सह नाववतु । सह नौ भुनक्तु । सह वीर्यं करवावहै । तेजस्विनावधीतमस्तु मा विद्विषावहै । ॐ शान्तिः शान्तिः शान्तिः ॥",
    transliteration: "oṃ saha nāv avatu. saha nau bhunaktu. saha vīryaṃ karavāvahai. tejasvi nāv adhītam astu mā vidviṣāvahai.",
    translation: "May we be protected together. May we be nourished together. May we work with strength. May our learning be bright, and may we not turn against each other.",
    source: "Taittirīya Upaniṣad, Śikṣāvallī, śānti pāṭha",
  },
  {
    id: "sarve-bhavantu",
    sanskrit: "ॐ सर्वे भवन्तु सुखिनः । सर्वे सन्तु निरामयाः । सर्वे भद्राणि पश्यन्तु । मा कश्चिद् दुःखभाग् भवेत् ॥",
    transliteration: "oṃ sarve bhavantu sukhinaḥ. sarve santu nirāmayāḥ. sarve bhadrāṇi paśyantu. mā kaścid duḥkha-bhāg bhavet.",
    translation: "May everyone be happy. May everyone be free from illness. May everyone see what is good. May no one have to suffer.",
    source: "Traditional Sanskrit śānti prayer. Not a verse from a Vastu manual, and not a reading of a building.",
  },
];
