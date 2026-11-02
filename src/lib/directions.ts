export type DirectionKey = "n" | "ne" | "e" | "se" | "s" | "sw" | "w" | "nw";

export type DirectionNote = {
  key: DirectionKey;
  sanskrit: string;
  name: string;
  text: string;
};

/**
 * Educational notes on the eight traditional directions.
 * They describe how a consultation talks about a plan.
 * They are not a reading of any particular property, and they are not scriptural quotations.
 */
export const directions: DirectionNote[] = [
  {
    key: "n",
    sanskrit: "उत्तर",
    name: "North",
    text: "North is established on the ground from a reliable bearing, then discussed against the rooms that actually sit there. A consultation does not treat the word as a promise of wealth.",
  },
  {
    key: "ne",
    sanskrit: "ईशान",
    name: "Northeast",
    text: "The northeast is traditionally discussed for openness and for how water or an entrance relates to the rest of the plan. What matters is the corner in front of the consultant, not a diagram alone.",
  },
  {
    key: "e",
    sanskrit: "पूर्व",
    name: "East",
    text: "East is read with the morning light and with the rooms that receive it. An entrance or a window on this side is discussed only in relation to that property’s layout.",
  },
  {
    key: "se",
    sanskrit: "आग्नेय",
    name: "Southeast",
    text: "The southeast is traditionally associated with fire and with rooms such as a kitchen. The visit checks where those rooms actually are, rather than moving them on principle.",
  },
  {
    key: "s",
    sanskrit: "दक्षिण",
    name: "South",
    text: "South is considered for weight, privacy, and the rooms that hold the more solid parts of a plan. Any suggestion follows the building, not a fixed rule copied from another house.",
  },
  {
    key: "sw",
    sanskrit: "नैऋत्य",
    name: "Southwest",
    text: "The southwest is traditionally discussed as a heavier corner of a plan. Whether that applies, and what to do, is decided only after the property has been seen.",
  },
  {
    key: "w",
    sanskrit: "पश्चिम",
    name: "West",
    text: "West is reviewed for approach, afternoon light, and the rooms that close the day. The explanation stays with the plan being assessed.",
  },
  {
    key: "nw",
    sanskrit: "वायव्य",
    name: "Northwest",
    text: "The northwest is traditionally discussed in relation to movement and air. A consultation looks at circulation and openings there, and does not diagnose the household from the label.",
  },
];
