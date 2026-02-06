// // src/utils/camperSchema.js

// // 1) ЄДИНЕ місце, де ми описуємо всі поля з бекенду:
// // - label (людська назва)
// // - group: "equipment" | "details"
// // - icon (якщо треба для pills)
// // - asBadge: чи показувати в pills
// // - show: умова показу
// // - value: як отримати/перетворити значення

// export const CAMPER_FIELDS = {
//   transmission: {
//     label: "Automatic",
//     group: "equipment",
//     asBadge: true,
//     icon: "/diagram.png",
//     show: (c) => c.transmission === "automatic",
//     value: () => "Automatic",
//   },

//   engine: {
//     label: "Engine",
//     group: "equipment",
//     asBadge: true,
//     icon: "/Petrol.png",
//     show: (c) => Boolean(c.engine),
//     value: (c) => c.engine, // petrol/diesel/hybrid
//   },

//   AC: {
//     label: "AC",
//     group: "equipment",
//     asBadge: true,
//     icon: "/wind.png",
//     show: (c) => Boolean(c.AC),
//     value: () => "AC",
//   },

//   kitchen: {
//     label: "Kitchen",
//     group: "equipment",
//     asBadge: true,
//     icon: "/cup-hot.png",
//     show: (c) => Boolean(c.kitchen),
//     value: () => "Kitchen",
//   },

//   TV: {
//     label: "TV",
//     group: "equipment",
//     asBadge: false,
//     icon: "/tv.png",
//     show: (c) => Boolean(c.TV),
//     value: () => "TV",
//   },

//   bathroom: {
//     label: "Bathroom",
//     group: "equipment",
//     asBadge: false,
//     icon: "/shower.png",
//     show: (c) => Boolean(c.bathroom),
//     value: () => "Bathroom",
//   },

//   radio: {
//     label: "Radio",
//     group: "equipment",
//     asBadge: true,
//     icon: "/radio.png",
//     show: (c) => Boolean(c.radio),
//     value: () => "Radio",
//   },

//   refrigerator: {
//     label: "Refrigerator",
//     group: "equipment",
//     asBadge: false,
//     icon: "/fridge.png",
//     show: (c) => Boolean(c.refrigerator),
//     value: () => "Refrigerator",
//   },

//   microwave: {
//     label: "Microwave",
//     group: "equipment",
//     asBadge: false,
//     icon: "/microwave.png",
//     show: (c) => Boolean(c.microwave),
//     value: () => "Microwave",
//   },

//   gas: {
//     label: "Gas",
//     group: "equipment",
//     asBadge: false,
//     icon: "/gas.png",
//     show: (c) => Boolean(c.gas),
//     value: () => "Gas",
//   },

//   water: {
//     label: "Water",
//     group: "equipment",
//     asBadge: false,
//     icon: "/water.png",
//     show: (c) => Boolean(c.water),
//     value: () => "Water",
//   },

//   // ---- details ----
//   form: {
//     label: "Form",
//     group: "details",
//     show: (c) => Boolean(c.form),
//     value: (c) => c.form, // panelTruck / alcove / fullyIntegrated
//   },

//   length: {
//     label: "Length",
//     group: "details",
//     show: (c) => Boolean(c.length),
//     value: (c) => c.length,
//   },

//   width: {
//     label: "Width",
//     group: "details",
//     show: (c) => Boolean(c.width),
//     value: (c) => c.width,
//   },

//   height: {
//     label: "Height",
//     group: "details",
//     show: (c) => Boolean(c.height),
//     value: (c) => c.height,
//   },

//   tank: {
//     label: "Tank",
//     group: "details",
//     show: (c) => Boolean(c.tank),
//     value: (c) => c.tank,
//   },

//   consumption: {
//     label: "Consumption",
//     group: "details",
//     show: (c) => Boolean(c.consumption),
//     value: (c) => c.consumption,
//   },
// };

// // Порядок, як у макеті/логіці (важливо, щоб UI був стабільний)
// export const EQUIPMENT_ORDER = [
//   "transmission",
//   "engine",
//   "kitchen",
//   "AC",
//   "radio",
//   "bathroom",
//   "TV",
//   "refrigerator",
//   "microwave",
//   "gas",
//   "water",
// ];

// export const DETAILS_ORDER = [
//   "form",
//   "length",
//   "width",
//   "height",
//   "tank",
//   "consumption",
// ];

// // helpers
// export const getBadgeItems = (camper) =>
//   EQUIPMENT_ORDER.map((key) => ({ key, cfg: CAMPER_FIELDS[key] }))
//     .filter(({ cfg }) => cfg?.asBadge && cfg.show(camper))
//     .map(({ key, cfg }) => ({
//       key,
//       label: typeof cfg.value === "function" ? cfg.value(camper) : cfg.label,
//       icon: cfg.icon,
//     }));

// export const getSpecItems = (camper, group) => {
//   const order = group === "equipment" ? EQUIPMENT_ORDER : DETAILS_ORDER;

//   return order
//     .map((key) => ({ key, cfg: CAMPER_FIELDS[key] }))
//     .filter(({ cfg }) => cfg?.group === group && cfg.show(camper))
//     .map(({ key, cfg }) => ({
//       key,
//       label: cfg.label,
//       value: cfg.value(camper),
//     }));
// };
