export const CAMPER_FIELDS = {
  automatic: {
    label: "Automatic",
    group: "equipment",
    asBadge: true,
    icon: "/diagram.png",
    show: (c) => c.transmission === "automatic",
    value: () => "Automatic",
  },

  engine: {
    label: "Engine",
    group: "equipment",
    asBadge: true,
    icon: "/Petrol.png",
    show: (c) => Boolean(c.engine),
    value: (c) => c.engine,
  },

  AC: {
    label: "AC",
    group: "equipment",
    asBadge: true,
    icon: "/wind.png",
    show: (c) => Boolean(c.AC),
    value: () => "AC",
  },

  kitchen: {
    label: "Kitchen",
    group: "equipment",
    asBadge: true,
    icon: "/cup-hot.png",
    show: (c) => Boolean(c.kitchen),
    value: () => "Kitchen",
  },

  TV: {
    label: "TV",
    group: "equipment",
    asBadge: true,
    icon: "/tv.png",
    show: (c) => Boolean(c.TV),
    value: () => "TV",
  },

  bathroom: {
    label: "Bathroom",
    group: "equipment",
    asBadge: true,
    icon: "/ph_shower.png",
    show: (c) => Boolean(c.bathroom),
    value: () => "Bathroom",
  },

  radio: {
    label: "Radio",
    group: "equipment",
    asBadge: true,
    icon: "/radio.png",
    show: (c) => Boolean(c.radio),
    value: () => "Radio",
  },

  refrigerator: {
    label: "Refrigerator",
    group: "equipment",
    asBadge: true,
    icon: "/refrigerator.png",
    show: (c) => Boolean(c.refrigerator),
    value: () => "Refrigerator",
  },

  microwave: {
    label: "Microwave",
    group: "equipment",
    asBadge: true,
    icon: "/microwave.png",
    show: (c) => Boolean(c.microwave),
    value: () => "Microwave",
  },

  gas: {
    label: "Gas",
    group: "equipment",
    asBadge: true,
    icon: "/gas-bottle.png",
    show: (c) => Boolean(c.gas),
    value: () => "Gas",
  },

  water: {
    label: "Water",
    group: "equipment",
    asBadge: true,
    icon: "/h2o.png",
    show: (c) => Boolean(c.water),
    value: () => "Water",
  },

  // ---- details ----
  form: {
    label: "Form",
    group: "details",
    show: (c) => Boolean(c.form),
    value: (c) => c.form,
  },

  length: {
    label: "Length",
    group: "details",
    show: (c) => Boolean(c.length),
    value: (c) => c.length,
  },

  width: {
    label: "Width",
    group: "details",
    show: (c) => Boolean(c.width),
    value: (c) => c.width,
  },

  height: {
    label: "Height",
    group: "details",
    show: (c) => Boolean(c.height),
    value: (c) => c.height,
  },

  tank: {
    label: "Tank",
    group: "details",
    show: (c) => Boolean(c.tank),
    value: (c) => c.tank,
  },

  consumption: {
    label: "Consumption",
    group: "details",
    show: (c) => Boolean(c.consumption),
    value: (c) => c.consumption,
  },
};

export const EQUIPMENT_ORDER = [
  "automatic",
  "engine",
  "kitchen",
  "AC",
  "radio",
  "bathroom",
  "TV",
  "refrigerator",
  "microwave",
  "gas",
  "water",
];

export const DETAILS_ORDER = [
  "form",
  "length",
  "width",
  "height",
  "tank",
  "consumption",
];

// helpers
export const getBadgeItems = (camper) =>
  EQUIPMENT_ORDER.map((key) => ({ key, cfg: CAMPER_FIELDS[key] }))
    .filter(({ cfg }) => cfg?.asBadge && cfg.show(camper))
    .map(({ key, cfg }) => ({
      key,
      label: typeof cfg.value === "function" ? cfg.value(camper) : cfg.label,
      icon: cfg.icon,
    }));

export const getSpecItems = (camper, group) => {
  const order = group === "equipment" ? EQUIPMENT_ORDER : DETAILS_ORDER;

  return order
    .map((key) => ({ key, cfg: CAMPER_FIELDS[key] }))
    .filter(({ cfg }) => cfg?.group === group && cfg.show(camper))
    .map(({ key, cfg }) => ({
      key,
      label: cfg.label,
      value: cfg.value(camper),
    }));
};

export const FILTER_FEATURE_KEYS = EQUIPMENT_ORDER.filter(
  (key) => CAMPER_FIELDS[key]?.group === "equipment",
).filter((key) => !["engine", "transmission"].includes(key));

export const FORM_OPTIONS = [
  {
    value: "panelTruck",
    label: "Van",
    icon: "/bi_grid.png",
  },
  {
    value: "fullyIntegrated",
    label: "Fully Integrated",
    icon: "/bi_grid-1x2.png",
  },
  {
    value: "alcove",
    label: "Alcove",
    icon: "/bi_grid-3x3-gap.png",
  },
];
