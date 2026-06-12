/**
 * Nail Conditions Knowledge Base
 * Built from 100+ professional podology & dermatology references.
 * All user-facing text is in simple Spanish for end users.
 */

export type Severity = "leve" | "moderado" | "severo";
export type BodyArea = "manos" | "pies" | "ambos";

export interface SymptomOption {
  id: string;
  label: string;
  description: string;
  icon: string; // emoji for visual recognition
}

export interface NailCondition {
  id: string;
  name: string;
  shortName: string;
  description: string;
  /** What the user sees — simple visual cues */
  visualSigns: string[];
  /** Primary/hallmark symptoms — weighted 3x in scoring (strongest indicators) */
  primarySymptoms: string[];
  /** Secondary symptom IDs that also map to this condition */
  matchingSymptoms: string[];
  /** How common this condition is — multiplier for scoring (1.0 = baseline) */
  prevalence: number;
  /** How many symptom matches needed for HIGH confidence */
  minHighConfidence: number;
  /** Severity indicators */
  severityGuide: {
    leve: string;
    moderado: string;
    severo: string;
  };
  /** Causes in plain language */
  commonCauses: string[];
  /** Risk factors */
  riskFactors: string[];
  /** What to do at home */
  homeCare: string[];
  /** Common mistakes to avoid */
  doNot: string[];
  /** When to see a professional */
  seekProfessionalWhen: string[];
  /** How onicoplastia / Neycha's services help */
  professionalTreatment: string;
  /** Affects hands, feet, or both */
  affectedArea: BodyArea;
  /** Estimated recovery time */
  recoveryNote: string;
  /** Condition category for result grouping */
  category: "infeccion" | "salon" | "trauma" | "medica" | "estructural";
  /** If true, show urgent medical warning in results */
  medicalWarning?: string;
  /** Related condition IDs */
  relatedConditions: string[];
  /** Matching before/after case IDs from the portfolio */
  relatedCaseIds: number[];
}

// ─── SYMPTOM OPTIONS ───────────────────────────────────────
// These are the interactive choices users see in the wizard.
// Grouped by visual category for easy selection.

export const symptomGroups = [
  {
    id: "color",
    title: "Color de la Uña",
    subtitle: "¿Has notado cambios de color?",
    icon: "🎨",
    symptoms: [
      { id: "yellow", label: "Amarillenta", description: "La uña se ve amarilla o con manchas amarillas", icon: "🟡" },
      { id: "white_spots", label: "Manchas blancas", description: "Puntos o manchas blancas en la superficie", icon: "⚪" },
      { id: "brown_black", label: "Oscura o marrón", description: "La uña se ve oscura, marrón o con manchas", icon: "🟤" },
      { id: "dark_stripe", label: "Línea oscura vertical", description: "Una raya marrón o negra que va de la base a la punta", icon: "📏" },
      { id: "green", label: "Verdosa", description: "Tono verde o verde-amarillento", icon: "🟢" },
    ],
  },
  {
    id: "texture",
    title: "Textura y Forma",
    subtitle: "¿Cómo se siente o se ve la superficie?",
    icon: "✋",
    symptoms: [
      { id: "thick", label: "Gruesa", description: "La uña está más gruesa de lo normal, difícil de cortar", icon: "📏" },
      { id: "brittle", label: "Quebradiza", description: "Se rompe, pela o desmorona fácilmente", icon: "💔" },
      { id: "ridges", label: "Con surcos o líneas", description: "Líneas verticales u horizontales marcadas", icon: "📊" },
      { id: "rough", label: "Áspera o irregular", description: "Superficie rugosa, no lisa ni uniforme", icon: "🪨" },
      { id: "pitting", label: "Con hoyitos", description: "Pequeños puntitos o dents en la superficie, como alfileres", icon: "🔘" },
      { id: "peeling", label: "Se pela por capas", description: "Las capas de la uña se separan y se pelan", icon: "📄" },
    ],
  },
  {
    id: "shape",
    title: "Forma y Separación",
    subtitle: "¿Ha cambiado la forma de la uña?",
    icon: "👁️",
    symptoms: [
      { id: "lifting", label: "Se despega", description: "La uña se separa del dedo por los bordes o la punta", icon: "📤" },
      { id: "ingrown", label: "Enterrada", description: "El borde de la uña crece hacia la piel y duele", icon: "⚠️" },
      { id: "curved", label: "Curvada o enrollada", description: "La uña se curva hacia abajo o se enrolla en los bordes", icon: "🌀" },
      { id: "deformed", label: "Deformada", description: "Ha perdido su forma normal", icon: "🔀" },
    ],
  },
  {
    id: "discomfort",
    title: "Molestias",
    subtitle: "¿Sientes alguna molestia?",
    icon: "💊",
    symptoms: [
      { id: "pain", label: "Dolor", description: "Dolor al caminar, al presionar o al usar zapatos", icon: "🔴" },
      { id: "smell", label: "Mal olor", description: "La uña o el dedo tienen un olor desagradable", icon: "👃" },
      { id: "itching", label: "Picazón", description: "Picazón alrededor de la uña o entre los dedos", icon: "🫳" },
      { id: "swelling", label: "Inflamación", description: "Enrojecimiento o hinchazón alrededor de la uña", icon: "🔥" },
      { id: "pus", label: "Pus o secreción", description: "Sale líquido, pus o secreción del borde de la uña", icon: "💧" },
    ],
  },
];

export const allSymptoms: SymptomOption[] = symptomGroups.flatMap(g => g.symptoms);

// ─── DURATION OPTIONS ──────────────────────────────────────
export const durationOptions = [
  { id: "recent", label: "Menos de 1 mes", weight: 0.5 },
  { id: "months", label: "1 a 6 meses", weight: 1 },
  { id: "long", label: "6 meses a 1 año", weight: 1.5 },
  { id: "chronic", label: "Más de 1 año", weight: 2 },
];

// ─── CONDITIONS DATABASE ───────────────────────────────────
// Each condition is built from the reference library's clinical data,
// translated to simple language.

export const conditions: NailCondition[] = [
  {
    id: "onicomicosis",
    name: "Infección por Hongos (Onicomicosis)",
    shortName: "Hongos en la Uña",
    description:
      "Es la infección más común de las uñas. Un hongo se instala debajo o sobre la uña y la va dañando poco a poco. Afecta a 1 de cada 10 personas y es más frecuente en los pies.",
    visualSigns: [
      "Color amarillo, blanco o marrón",
      "Uña más gruesa de lo normal",
      "Bordes que se desmenuzan o se rompen",
      "La uña se puede despegar del dedo",
      "Posible mal olor",
    ],
    primarySymptoms: ["yellow", "thick", "smell"],
    matchingSymptoms: ["yellow", "white_spots", "thick", "smell", "brittle", "rough"],
    prevalence: 1.2,
    minHighConfidence: 2,
    severityGuide: {
      leve: "Solo un cambio de color leve en la punta de la uña. No duele ni es gruesa.",
      moderado: "La uña está más gruesa, amarillenta y empieza a desmoronarse. Puede cubrir la mitad de la uña.",
      severo: "Toda la uña está afectada, muy gruesa, deformada y puede desprenderse. Posible dolor.",
    },
    commonCauses: [
      "Caminar descalzo en duchas públicas, piscinas o gimnasios",
      "Zapatos cerrados por muchas horas (el hongo crece con calor y humedad)",
      "Compartir cortaúñas o herramientas de manicura",
      "Pie de atleta no tratado que se extiende a las uñas",
      "Lesión previa en la uña que permite la entrada del hongo",
    ],
    riskFactors: [
      "Diabetes o problemas de circulación",
      "Sistema inmune debilitado",
      "Edad mayor de 60 años",
      "Sudoración excesiva en los pies",
      "Uso frecuente de uñas artificiales o esmalte permanente",
    ],
    homeCare: [
      "Mantén las uñas cortas y limas la superficie gruesa suavemente",
      "Seca bien tus pies después de bañarte, especialmente entre los dedos",
      "Usa medias de algodón y cámbialas diariamente",
      "Aplica un antimicótico tópico de venta libre (como terbinafina en crema) en las primeras etapas",
      "Alterna tus zapatos para que se sequen entre usos",
      "Desinfecta tu cortaúñas con alcohol después de cada uso",
      "Usa sandalias en duchas y piscinas públicas",
    ],
    doNot: [
      "No cubras la uña infectada con esmalte regular — atrapa la humedad",
      "No compartas zapatos, medias ni herramientas de uñas",
      "No arranques ni cortes agresivamente la uña dañada",
      "No ignores el problema pensando que se va solo — empeora con el tiempo",
      "No uses remedios caseros como vinagre o ajo como único tratamiento en casos moderados o severos",
    ],
    seekProfessionalWhen: [
      "La infección cubre más del 50% de la uña",
      "La uña está muy gruesa y difícil de manejar",
      "Sientes dolor al caminar o usar zapatos",
      "Tienes diabetes u otros problemas de salud",
      "Los productos de farmacia no han funcionado después de 2-3 meses",
    ],
    professionalTreatment:
      "Con onicoplastia, reconstruimos estéticamente tu uña mientras la fortalecemos con tratamiento profesional. Sales el mismo día con una uña de apariencia perfecta — puedes usar sandalias sin pena. El tratamiento es indoloro y los resultados son inmediatos.",
    affectedArea: "ambos",
    recoveryNote: "Los hongos de uñas requieren paciencia. El tratamiento profesional da resultados estéticos inmediatos, pero la uña natural tarda de 6 a 12 meses en crecer completamente sana.",
    category: "infeccion",
    relatedConditions: ["pie_atleta", "trauma"],
    relatedCaseIds: [1, 2, 3],
  },

  {
    id: "trauma",
    name: "Daño por Golpe o Trauma",
    shortName: "Uña Golpeada",
    description:
      "Cuando la uña recibe un golpe fuerte o presión repetida (como zapatos apretados), puede dañarse. A veces el daño es temporal, pero puede dejar la uña deformada si no se atiende.",
    visualSigns: [
      "Moretón debajo de la uña (color oscuro o rojo)",
      "Uña deformada o con ondulaciones",
      "La uña puede desprenderse parcial o totalmente",
      "Crecimiento irregular después del golpe",
    ],
    primarySymptoms: ["brown_black", "deformed", "pain"],
    matchingSymptoms: ["brown_black", "deformed", "lifting", "pain", "ridges"],
    prevalence: 1.1,
    minHighConfidence: 2,
    severityGuide: {
      leve: "Pequeño moretón debajo de la uña. No hay dolor significativo.",
      moderado: "La uña se deformó o se desprendió parcialmente. Dolor moderado.",
      severo: "La uña se perdió completamente o está muy deformada. Dolor significativo.",
    },
    commonCauses: [
      "Golpe directo (dejar caer algo sobre el dedo)",
      "Zapatos demasiado apretados o pequeños",
      "Deportes de impacto (correr, fútbol, baloncesto)",
      "Tropezar o golpear el dedo contra algo",
    ],
    riskFactors: [
      "Usar zapatos de la talla incorrecta",
      "Deportes de alto impacto",
      "Trabajos físicos donde los pies están expuestos",
    ],
    homeCare: [
      "Aplica hielo envuelto en tela durante 15-20 minutos para reducir la inflamación",
      "Si hay sangre debajo de la uña y duele mucho, consulta a un profesional",
      "No arranques la uña — deja que se desprenda naturalmente",
      "Mantén la zona limpia y seca",
      "Usa zapatos amplios mientras sana",
    ],
    doNot: [
      "No intentes drenar la sangre debajo de la uña por tu cuenta",
      "No arranques ni cortes la uña dañada",
      "No uses zapatos apretados mientras sana",
      "No apliques presión sobre la uña afectada",
    ],
    seekProfessionalWhen: [
      "El dolor no mejora después de unos días",
      "La uña se desprendió y no crece correctamente",
      "La uña nueva crece deforme o diferente",
      "Quieres restaurar la apariencia de la uña rápidamente",
    ],
    professionalTreatment:
      "La onicoplastia reconstruye uñas dañadas por trauma dándoles una apariencia completamente natural. No importa si la uña se perdió o creció deformada — con prótesis especializada y GEL Polish, nadie notará la diferencia.",
    affectedArea: "ambos",
    recoveryNote: "La reconstrucción estética es inmediata. La uña natural puede tardar 3-6 meses en crecer completamente (pies) o 2-4 meses (manos).",
    category: "trauma",
    relatedConditions: ["onicomicosis", "unas_debiles"],
    relatedCaseIds: [4, 5],
  },

  {
    id: "unas_debiles",
    name: "Uñas Débiles o Quebradizas",
    shortName: "Uñas Frágiles",
    description:
      "Las uñas se rompen, pelan o desmenuzan con facilidad. Es muy común, especialmente en mujeres, y puede deberse a productos químicos, falta de nutrientes o uso excesivo de esmaltes.",
    visualSigns: [
      "Uñas que se rompen o pelan fácilmente",
      "Capas de la uña que se separan",
      "Uñas delgadas y flexibles en exceso",
      "Bordes irregulares y ásperos",
    ],
    primarySymptoms: ["brittle"],
    matchingSymptoms: ["brittle", "rough", "ridges"],
    prevalence: 1.0,
    minHighConfidence: 2,
    severityGuide: {
      leve: "Se rompen de vez en cuando, especialmente cuando están largas.",
      moderado: "Se pelan por capas regularmente. No puedes mantener las uñas largas.",
      severo: "Extremadamente frágiles, se rompen al mínimo contacto. Duele o sangra.",
    },
    commonCauses: [
      "Contacto frecuente con agua, jabones y productos de limpieza",
      "Uso excesivo de acetona o removedores fuertes",
      "Aplicación y remoción frecuente de uñas acrílicas o gel",
      "Deficiencia de biotina, hierro o zinc",
      "Lavarse las manos muchas veces al día",
    ],
    riskFactors: [
      "Trabajar con las manos en agua frecuentemente",
      "Uso frecuente de sanitizador de manos",
      "Hipotiroidismo",
      "Deficiencias nutricionales",
    ],
    homeCare: [
      "Usa guantes de goma al lavar platos o limpiar",
      "Aplica crema hidratante en las uñas y cutículas cada noche",
      "Considera suplementos de biotina (2.5 mg diarios) — consulta con tu médico",
      "Mantén las uñas cortas mientras se fortalecen",
      "Usa endurecedor de uñas con queratina",
      "Come alimentos ricos en proteína, huevos y verduras verdes",
      "Evita la acetona — usa removedores sin acetona",
    ],
    doNot: [
      "No uses las uñas como herramienta (abrir latas, rascar etiquetas)",
      "No te arranques las cutículas ni la piel alrededor",
      "No apliques capa tras capa de esmalte sin descanso",
      "No limes las uñas en zig-zag — lima siempre en una dirección",
    ],
    seekProfessionalWhen: [
      "Las uñas llevan meses débiles sin mejorar",
      "Sospechas una deficiencia nutricional",
      "Las uñas cambian mucho de aspecto además de romperse",
      "Necesitas reconstruir uñas dañadas por gel o acrílico",
    ],
    professionalTreatment:
      "El tratamiento fortalecedor penetra las capas de la uña para fortalecerla desde adentro. A diferencia del esmalte, este tratamiento restaura la estructura interna. Combinado con GEL Polish profesional, tus uñas lucen perfectas mientras se recuperan.",
    affectedArea: "ambos",
    recoveryNote: "Con el tratamiento fortalecedor y cuidados en casa, las uñas pueden mejorar notablemente en 4-8 semanas.",
    category: "salon",
    relatedConditions: ["onicomicosis", "psoriasis_ungueal"],
    relatedCaseIds: [6],
  },

  {
    id: "onicocriptosis",
    name: "Uña Encarnada (Onicocriptosis)",
    shortName: "Uña Enterrada",
    description:
      "El borde de la uña crece hacia dentro de la piel, causando dolor, enrojecimiento y a veces infección. Es más común en el dedo gordo del pie y puede ser muy molesto al caminar.",
    visualSigns: [
      "Dolor en el borde de la uña",
      "Enrojecimiento e hinchazón a un lado de la uña",
      "Piel que crece sobre el borde de la uña",
      "Posible secreción o pus si hay infección",
    ],
    primarySymptoms: ["ingrown"],
    matchingSymptoms: ["ingrown", "pain", "swelling"],
    prevalence: 1.0,
    minHighConfidence: 1,
    severityGuide: {
      leve: "Molestia leve al presionar. Ligero enrojecimiento.",
      moderado: "Dolor al caminar. Enrojecimiento e hinchazón marcados.",
      severo: "Dolor intenso. Pus o secreción. Dificultad para caminar.",
    },
    commonCauses: [
      "Cortar las uñas demasiado cortas o en forma curva",
      "Zapatos apretados que presionan los dedos",
      "Traumatismo en el dedo",
      "Forma natural de la uña (muy curvada)",
    ],
    riskFactors: [
      "Cortar mal las uñas de los pies",
      "Sudoración excesiva en los pies",
      "Diabetes",
      "Sobrepeso",
    ],
    homeCare: [
      "Remoja el pie en agua tibia con sal durante 15-20 minutos, 2-3 veces al día",
      "Coloca suavemente un trozo pequeño de algodón debajo del borde de la uña para levantarla",
      "Aplica crema antibiótica en la zona enrojecida",
      "Usa zapatos abiertos o amplios",
      "Corta las uñas de los pies en línea recta, no en curva",
    ],
    doNot: [
      "No intentes cortar el borde enterrado tú mismo con tijeras — puede empeorar",
      "No uses zapatos apretados ni puntiagudos",
      "No ignores signos de infección (pus, enrojecimiento intenso, fiebre)",
      "No apliques esmalte en una uña infectada",
    ],
    seekProfessionalWhen: [
      "Hay pus o señales de infección",
      "El dolor no mejora con los remojos después de 3-4 días",
      "Tienes diabetes u otros problemas de circulación",
      "Es recurrente — se enterran las uñas frecuentemente",
    ],
    professionalTreatment:
      "Evaluamos tu caso y realizamos la corrección adecuada. En muchos casos, con onicoplastia podemos reconstruir la forma correcta de la uña para prevenir que vuelva a enterrarse. El tratamiento es personalizado según la severidad.",
    affectedArea: "pies",
    recoveryNote: "Los casos leves mejoran en días con cuidados en casa. Los moderados pueden necesitar 1-2 semanas de tratamiento profesional.",
    category: "estructural",
    relatedConditions: ["trauma"],
    relatedCaseIds: [],
  },

  {
    id: "pie_atleta",
    name: "Pie de Atleta (Tinea Pedis)",
    shortName: "Pie de Atleta",
    description:
      "Es una infección por hongos en la piel del pie, especialmente entre los dedos. Si no se trata, el hongo puede extenderse a las uñas y causar onicomicosis.",
    visualSigns: [
      "Piel descamada o agrietada entre los dedos",
      "Picazón intensa, especialmente entre el 4to y 5to dedo",
      "Enrojecimiento en la planta del pie",
      "Ampollas o piel que se pela",
    ],
    primarySymptoms: ["itching"],
    matchingSymptoms: ["itching", "swelling", "smell"],
    prevalence: 1.1,
    minHighConfidence: 1,
    severityGuide: {
      leve: "Picazón leve entre los dedos. Poca descamación.",
      moderado: "Picazón frecuente, piel agrietada, enrojecimiento. Puede oler.",
      severo: "Ampollas, grietas dolorosas, mal olor. Puede extenderse a las uñas.",
    },
    commonCauses: [
      "Caminar descalzo en duchas y piscinas públicas",
      "Pies húmedos por mucho tiempo dentro de zapatos",
      "Compartir toallas o zapatos",
      "Clima caliente y húmedo (como en Puerto Rico)",
    ],
    riskFactors: [
      "Sudoración excesiva en los pies",
      "Usar zapatos cerrados todo el día",
      "Vivir en clima tropical",
      "Practicar deportes",
    ],
    homeCare: [
      "Aplica crema o spray antimicótico de venta libre (clotrimazol o terbinafina)",
      "Seca bien los pies después de bañarte, especialmente entre los dedos",
      "Usa medias de algodón y cámbialas a diario",
      "Aplica talco antimicótico en los pies y dentro de los zapatos",
      "Deja que los zapatos se sequen completamente entre usos",
      "Lava las medias con agua caliente",
    ],
    doNot: [
      "No camines descalzo en áreas públicas húmedas",
      "No uses los mismos zapatos dos días seguidos",
      "No compartas toallas ni calzado",
      "No ignores la picazón — el hongo se extiende a las uñas",
    ],
    seekProfessionalWhen: [
      "El tratamiento de farmacia no funciona después de 2 semanas",
      "La infección se extiende a las uñas",
      "Tienes ampollas dolorosas o grietas profundas",
      "Tienes diabetes",
    ],
    professionalTreatment:
      "Si el pie de atleta ya afectó tus uñas, la onicoplastia restaura la apariencia mientras tratamos la infección. Evaluamos la extensión del problema y creamos un plan completo que incluye tratamiento y prevención.",
    affectedArea: "pies",
    recoveryNote: "El pie de atleta en la piel mejora en 2-4 semanas con tratamiento. Si ya afectó las uñas, el tratamiento es más prolongado.",
    category: "infeccion",
    relatedConditions: ["onicomicosis"],
    relatedCaseIds: [],
  },

  {
    id: "psoriasis_ungueal",
    name: "Cambios por Psoriasis u Otras Condiciones",
    shortName: "Psoriasis en Uñas",
    description:
      "Ciertas condiciones de salud como la psoriasis pueden afectar las uñas causando hoyitos, surcos o desprendimiento. A veces se confunde con hongos, pero el tratamiento es diferente.",
    visualSigns: [
      "Pequeños hoyitos o puntitos en la superficie (pitting)",
      "Manchas color salmón o anaranjado debajo de la uña",
      "La uña se despega del dedo",
      "Surcos o líneas transversales",
      "Uña engrosada y con textura irregular",
    ],
    primarySymptoms: ["pitting"],
    matchingSymptoms: ["pitting", "ridges", "lifting", "rough", "thick"],
    prevalence: 0.7,
    minHighConfidence: 2,
    severityGuide: {
      leve: "Algunos hoyitos o manchas. No molesta.",
      moderado: "Cambios visibles en varias uñas. Algo incómodo.",
      severo: "Uñas muy deformadas, se despegan. Afecta la autoestima.",
    },
    commonCauses: [
      "Psoriasis (enfermedad autoinmune de la piel)",
      "Eczema o dermatitis",
      "Liquen plano",
      "Alopecia areata",
    ],
    riskFactors: [
      "Tener psoriasis en la piel",
      "Antecedentes familiares de psoriasis",
      "Estrés crónico",
    ],
    homeCare: [
      "Mantén las uñas cortas para reducir el trauma",
      "Hidrata las uñas y cutículas con aceite de almendras o vitamina E",
      "Evita traumatismos en las uñas",
      "Usa guantes protectores al hacer tareas",
      "Consulta con un dermatólogo para tratamiento de la psoriasis",
    ],
    doNot: [
      "No te autodiagnostiques — se puede confundir con hongos",
      "No uses tratamientos antimicóticos si es psoriasis (no funcionarán)",
      "No manipules ni arranques las uñas afectadas",
    ],
    seekProfessionalWhen: [
      "No estás seguro/a si es hongo o psoriasis",
      "Las uñas están afectando tu confianza o calidad de vida",
      "Quieres mejorar la apariencia mientras tratas la condición",
    ],
    professionalTreatment:
      "La onicoplastia puede mejorar dramáticamente la apariencia de uñas afectadas por psoriasis mientras recibes tratamiento médico. Reconstruimos la uña estéticamente para que luzcas perfecta mientras sanas.",
    affectedArea: "ambos",
    recoveryNote: "La psoriasis es crónica y requiere manejo médico continuo. La onicoplastia ofrece una solución estética inmediata mientras se controla la condición.",
    category: "medica",
    relatedConditions: ["unas_debiles"],
    relatedCaseIds: [],
  },

  {
    id: "discromia",
    name: "Cambio de Color en la Uña",
    shortName: "Decoloración",
    description:
      "La uña cambia de color sin otros síntomas obvios. Puede ser por esmaltes, medicamentos, hongos en etapa temprana o en casos raros, una señal de algo más serio.",
    visualSigns: [
      "Uña amarillenta sin engrosamiento",
      "Manchas blancas superficiales",
      "Líneas oscuras o marrones en la uña",
      "Color verdoso (puede indicar infección bacteriana)",
    ],
    primarySymptoms: ["green"],
    matchingSymptoms: ["yellow", "white_spots", "brown_black", "green"],
    prevalence: 0.7,
    minHighConfidence: 2,
    severityGuide: {
      leve: "Cambio de color leve. Solo un dedo afectado.",
      moderado: "Color notable en una o más uñas. Sin dolor.",
      severo: "Líneas oscuras nuevas que aparecen en una sola uña. Cambios que avanzan rápido.",
    },
    commonCauses: [
      "Uso prolongado de esmalte oscuro (mancha amarilla)",
      "Infección por hongos en etapa temprana",
      "Infección bacteriana (verde/verdoso)",
      "Medicamentos que cambian el color de las uñas",
      "Trauma menor repetido",
    ],
    riskFactors: [
      "Uso frecuente de esmalte sin descanso",
      "Exposición a humedad prolongada",
      "Ciertos medicamentos",
    ],
    homeCare: [
      "Da descanso a las uñas del esmalte — al menos 1 semana cada mes",
      "Usa siempre base protectora antes del esmalte de color",
      "Para manchas amarillas por esmalte: frota suavemente con pasta dental o bicarbonato",
      "Observa si el color cambia o se extiende en las próximas semanas",
    ],
    doNot: [
      "No ignores líneas oscuras nuevas en una sola uña — consulta a un dermatólogo",
      "No cubras los cambios de color con más esmalte sin investigar la causa",
      "No intentes raspar o limar agresivamente la decoloración",
    ],
    seekProfessionalWhen: [
      "Aparece una línea oscura nueva en una sola uña (importante descartar melanoma)",
      "El color verde indica posible infección bacteriana",
      "El cambio de color avanza o se extiende",
      "Además del color, la uña se engrosa o deforma",
    ],
    professionalTreatment:
      "Evaluamos la causa del cambio de color. Si es estético, la onicoplastia restaura la apariencia natural. Si detectamos hongos o algo más, te orientamos al tratamiento correcto antes de la reconstrucción.",
    affectedArea: "ambos",
    recoveryNote: "Si es solo manchas por esmalte, mejora en semanas. Si es hongo temprano, el tratamiento oportuno evita que avance.",
    category: "medica",
    relatedConditions: ["onicomicosis"],
    relatedCaseIds: [2],
  },

  {
    id: "onicorrexis",
    name: "Uñas con Surcos o Líneas",
    shortName: "Surcos en las Uñas",
    description:
      "Las líneas verticales en las uñas son muy comunes y generalmente normales con la edad. Pero las líneas horizontales o surcos profundos pueden indicar un problema de salud o trauma.",
    visualSigns: [
      "Líneas verticales de arriba a abajo (muy comunes)",
      "Surco horizontal profundo que cruza toda la uña (línea de Beau)",
      "Superficie con crestas o irregularidades",
    ],
    primarySymptoms: [],
    matchingSymptoms: ["ridges", "rough", "brittle"],
    prevalence: 0.8,
    minHighConfidence: 2,
    severityGuide: {
      leve: "Líneas verticales finas. Muy normal con la edad.",
      moderado: "Surcos pronunciados o líneas horizontales. La uña se siente áspera.",
      severo: "Surcos profundos que debilitan la uña. Se rompe por los surcos.",
    },
    commonCauses: [
      "Envejecimiento natural (líneas verticales — totalmente normal)",
      "Trauma o golpe en la matriz de la uña",
      "Enfermedad reciente o fiebre alta (líneas horizontales de Beau)",
      "Deficiencias nutricionales",
      "Estrés significativo",
    ],
    riskFactors: [
      "Edad mayor de 50 años (las líneas verticales son normales)",
      "Deficiencia de hierro o zinc",
      "Enfermedades recientes",
    ],
    homeCare: [
      "Las líneas verticales son normales — hidrata las uñas con aceite de cutículas",
      "Usa un pulidor suave para alisar las crestas (sin exceder)",
      "Mantén una dieta balanceada rica en vitaminas",
      "Bebe suficiente agua — la hidratación afecta las uñas",
      "Aplica crema con queratina o biotina en las uñas",
    ],
    doNot: [
      "No limes agresivamente los surcos — debilita la uña",
      "No te preocupes por líneas verticales finas — son normales",
      "No ignores líneas horizontales nuevas — pueden indicar un problema de salud",
    ],
    seekProfessionalWhen: [
      "Aparecen surcos horizontales profundos en varias uñas a la vez",
      "Los surcos van acompañados de otros cambios (color, textura)",
      "Quieres una uña con apariencia suave y perfecta",
    ],
    professionalTreatment:
      "Con el tratamiento fortalecedor y onicoplastia, alisamos la superficie de la uña y la fortalecemos. El resultado es una uña suave, uniforme y perfecta al instante.",
    affectedArea: "ambos",
    recoveryNote: "Las líneas verticales son permanentes pero normales. Los surcos por trauma desaparecen cuando la uña crece completamente (3-6 meses).",
    category: "estructural",
    relatedConditions: ["unas_debiles", "psoriasis_ungueal"],
    relatedCaseIds: [],
  },

  // ─── NEW CONDITIONS: Salon-Acquired, Infections, Medical Warnings ─────

  {
    id: "paronychia",
    name: "Infección Alrededor de la Uña (Paroniquia)",
    shortName: "Infección del Borde",
    description:
      "Infección bacteriana o por hongos de la piel que rodea la uña. Muy común cuando las cutículas se cortan demasiado profundo con herramientas no esterilizadas en un salón, o por morderse las uñas.",
    visualSigns: [
      "Enrojecimiento e hinchazón en un lado de la uña",
      "Dolor pulsante al tocar",
      "Pus o secreción amarillenta-verdosa",
      "La piel alrededor se siente caliente",
    ],
    primarySymptoms: ["pus", "swelling"],
    matchingSymptoms: ["pus", "swelling", "pain"],
    prevalence: 1.2,
    minHighConfidence: 2,
    severityGuide: {
      leve: "Enrojecimiento leve. Sensibilidad al tocar.",
      moderado: "Hinchazón visible, dolor pulsante. Pus presente.",
      severo: "Infección extendida, mucho pus, dolor intenso. Puede tener fiebre.",
    },
    commonCauses: [
      "Cortarse las cutículas demasiado profundo en el salón",
      "Herramientas de manicura no esterilizadas",
      "Morderse las uñas o arrancarse los padrastros",
      "Manos en agua por mucho tiempo (lavaplatos, limpieza)",
      "Uña enterrada que se infecta",
    ],
    riskFactors: [
      "Manicuras frecuentes con corte agresivo de cutícula",
      "Diabetes",
      "Manos en agua frecuentemente",
      "Morderse las uñas",
    ],
    homeCare: [
      "Remoja el dedo en agua tibia con sal 3-4 veces al día por 15 minutos",
      "Aplica crema antibiótica (bacitracina o mupirocina) después de cada remojo",
      "Mantén la zona seca entre remojos",
      "No exprimas el pus — se puede extender la infección",
      "Si mejora, mantén la zona limpia y seca",
    ],
    doNot: [
      "No intentes drenar el pus con aguja — riesgo de infección mayor",
      "No vayas a un salón mientras tengas infección activa",
      "No uses esmalte ni productos en la uña afectada",
      "No ignores fiebre o enrojecimiento que se extiende — ve al médico",
    ],
    seekProfessionalWhen: [
      "El pus no mejora en 2-3 días con remojos",
      "El enrojecimiento se extiende más allá del dedo",
      "Tienes fiebre o escalofríos",
      "Tienes diabetes u otros problemas de salud",
      "Es recurrente — pasa frecuentemente",
    ],
    professionalTreatment:
      "Evaluamos la infección y te orientamos al tratamiento correcto. Una vez resuelta la infección, la onicoplastia restaura la apariencia de la uña si quedó dañada. También te educamos sobre cómo prevenir futuras infecciones al elegir salones seguros.",
    affectedArea: "ambos",
    recoveryNote: "Las infecciones leves mejoran en 5-7 días con remojos y antibiótico. Las severas pueden necesitar antibiótico oral recetado por un médico.",
    category: "infeccion",
    relatedConditions: ["onicocriptosis", "onicomicosis"],
    relatedCaseIds: [],
  },

  {
    id: "green_nail",
    name: "Uña Verde (Pseudomonas)",
    shortName: "Uña Verde",
    description:
      "Una bacteria llamada Pseudomonas crece entre la uña y un acrílico o gel levantado, produciendo un color verde distintivo. NO es hongo — es bacteria. Muy común cuando hay humedad atrapada bajo uñas artificiales.",
    visualSigns: [
      "Color verde o verde-negro debajo de la uña artificial",
      "El acrílico o gel se ha levantado y hay humedad debajo",
      "Puede haber mal olor",
      "La uña natural debajo puede verse dañada",
    ],
    primarySymptoms: ["green"],
    matchingSymptoms: ["green", "lifting", "smell"],
    prevalence: 1.0,
    minHighConfidence: 1,
    severityGuide: {
      leve: "Manchita verde pequeña. Solo se ve al quitar el artificial.",
      moderado: "Color verde visible. La uña artificial está levantada.",
      severo: "Verde intenso en gran parte de la uña. Olor fuerte. Dolor posible.",
    },
    commonCauses: [
      "Humedad atrapada entre la uña natural y el acrílico/gel levantado",
      "No atender un levantamiento (lift) del producto artificial a tiempo",
      "Aplicación deficiente que deja bolsas de aire",
      "Mojar las manos frecuentemente sin secar bien bajo las uñas",
    ],
    riskFactors: [
      "Uso de uñas acrílicas o gel sin mantenimiento regular",
      "Salones con mala higiene",
      "Exposición frecuente al agua",
    ],
    homeCare: [
      "RETIRA el acrílico o gel inmediatamente — la bacteria necesita oscuridad y humedad",
      "Limpia la uña con alcohol o vinagre blanco diluido",
      "Deja la uña al aire libre — sin esmalte ni producto",
      "El verde desaparecerá gradualmente mientras la uña crece (1-3 meses)",
      "Mantén la uña corta y limpia",
    ],
    doNot: [
      "No pongas más acrílico o gel encima para tapar el verde",
      "No uses antimicóticos — no es hongo, es bacteria",
      "No limes agresivamente — la uña ya está debilitada",
      "No compartas limas ni herramientas",
    ],
    seekProfessionalWhen: [
      "Hay dolor, hinchazón o pus además del color verde",
      "El color se extiende rápidamente",
      "Sospechas que la infección es más profunda",
    ],
    professionalTreatment:
      "Removemos cualquier producto artificial de forma segura, limpiamos y tratamos la uña. Una vez que la bacteria se resuelve, la onicoplastia puede restaurar la apariencia de la uña con productos seguros y técnica profesional que evita recurrencias.",
    affectedArea: "manos",
    recoveryNote: "El color verde desaparece con el crecimiento de la uña (2-3 meses). La bacteria se elimina al retirar el producto y dejar la uña respirar.",
    category: "salon",
    relatedConditions: ["onicomicosis"],
    relatedCaseIds: [],
  },

  {
    id: "onycholysis_salon",
    name: "Uña Despegada por Daño de Salón (Onicólisis)",
    shortName: "Uña Levantada por Salón",
    description:
      "La uña se despega de la cama del dedo, frecuentemente causado por limado excesivo, uso agresivo de herramientas metálicas bajo el borde, o remoción forzada de gel/acrílico. También puede causar estrías rojas (la uña queda demasiado fina).",
    visualSigns: [
      "La uña se separa del dedo, se ve el espacio debajo",
      "La uña se ve blanca o amarillenta donde se despegó",
      "Uña muy delgada, casi transparente, con manchas rojizas",
      "Dolor o sensibilidad al presionar",
    ],
    primarySymptoms: ["lifting", "peeling"],
    matchingSymptoms: ["lifting", "peeling", "brittle", "pain", "rough"],
    prevalence: 1.1,
    minHighConfidence: 2,
    severityGuide: {
      leve: "Pequeño levantamiento en la punta. No duele.",
      moderado: "La uña se ha levantado visiblemente. La uña se siente delgada.",
      severo: "Gran parte de la uña despegada. Uña muy fina, rojiza y dolorosa.",
    },
    commonCauses: [
      "Limado excesivo con lima eléctrica (e-file) en el salón",
      "Uso de herramienta metálica agresiva bajo el borde libre de la uña",
      "Arrancarse el gel o acrílico en vez de removerlo correctamente",
      "Reacción alérgica a productos de gel o acrílico (HEMA)",
      "Sobre-preparación de la uña antes de la aplicación",
    ],
    riskFactors: [
      "Manicuras frecuentes con limado eléctrico",
      "Salones que no tienen cuidado con la presión del limado",
      "Remover gel o acrílico sin acetona (arrancándolo)",
    ],
    homeCare: [
      "Deja descansar la uña — NO apliques producto nuevo",
      "Aplica aceite de cutícula diariamente para nutrir mientras crece",
      "Mantén la uña corta para evitar que se enganche y se arranque más",
      "Si está muy delgada, protégela con un endurecedor transparente suave",
      "Ten paciencia — la uña nueva tardará en crecer",
    ],
    doNot: [
      "No arranques la parte despegada — puede causar más daño",
      "No vuelvas al mismo salón que causó el daño",
      "No pongas acrílico o gel sobre la uña dañada sin dejarla recuperar",
      "No uses acetona ni removedores fuertes en uñas debilitadas",
    ],
    seekProfessionalWhen: [
      "La uña está extremadamente delgada y duele al tocar",
      "El desprendimiento avanza y no se detiene",
      "Quieres reconstruir la uña de forma segura mientras sana",
      "Necesitas orientación sobre salones y técnicas seguras",
    ],
    professionalTreatment:
      "El tratamiento fortalecedor es ideal para uñas dañadas por salones: penetra y fortalece la uña desde adentro. La onicoplastia reconstruye la apariencia mientras la uña natural se recupera. Te educamos para que identifiques salones seguros y evites este daño en el futuro.",
    affectedArea: "manos",
    recoveryNote: "La uña natural necesita 3-6 meses para crecer completamente nueva. Con el cuidado adecuado, se fortalece significativamente en 4-6 semanas.",
    category: "salon",
    relatedConditions: ["unas_debiles", "green_nail"],
    relatedCaseIds: [6],
  },

  {
    id: "melanonychia",
    name: "Línea Oscura en la Uña (Melanoniquia)",
    shortName: "Línea Oscura Vertical",
    description:
      "Una línea o banda oscura (marrón o negra) que va de la base a la punta de la uña. En muchos casos es benigna, especialmente en pieles oscuras, PERO puede ser señal de melanoma subungueal (cáncer de piel) y siempre debe ser evaluada por un dermatólogo.",
    visualSigns: [
      "Línea vertical marrón o negra en una sola uña",
      "La línea puede ser delgada o ancha",
      "Puede oscurecerse o ensancharse con el tiempo",
      "En casos serios: la pigmentación se extiende a la piel alrededor de la uña",
    ],
    primarySymptoms: ["dark_stripe"],
    matchingSymptoms: ["dark_stripe", "brown_black"],
    prevalence: 0.8,
    minHighConfidence: 1,
    severityGuide: {
      leve: "Línea delgada, uniforme, que no ha cambiado en meses.",
      moderado: "Línea que ha cambiado de color, ancho o se está oscureciendo.",
      severo: "Línea ancha, oscura, irregular, con pigmentación en la piel alrededor. CONSULTA URGENTE.",
    },
    commonCauses: [
      "Aumento normal de melanina (muy común en personas de piel oscura)",
      "Trauma menor repetido en la uña",
      "Ciertos medicamentos",
      "En casos raros: melanoma subungueal (cáncer)",
    ],
    riskFactors: [
      "Línea nueva en una sola uña en persona de piel clara",
      "Cambios recientes en color, ancho o forma de la línea",
      "Mayores de 50 años con línea nueva",
    ],
    homeCare: [
      "Observa y documenta: toma foto de la línea cada mes para comparar",
      "Si la línea NO cambia y tu piel es oscura, probablemente es normal",
      "Si la línea es NUEVA, cambia, o se ensancha — ve al dermatólogo",
    ],
    doNot: [
      "No ignores una línea oscura nueva, especialmente si cambia",
      "No intentes limar, raspar ni cubrir la línea",
      "No te autodiagnostiques — consulta siempre",
    ],
    seekProfessionalWhen: [
      "Cualquier línea oscura nueva en una sola uña merece evaluación",
      "La línea ha cambiado de ancho, color o forma",
      "La pigmentación se extiende a la piel alrededor de la uña (signo de Hutchinson)",
      "Tienes más de 50 años y aparece una línea nueva",
    ],
    professionalTreatment:
      "Te orientamos para que consultes con un dermatólogo para descartar cualquier condición seria. Una vez evaluada y descartada cualquier preocupación médica, la onicoplastia puede mejorar la apariencia estética si lo deseas.",
    affectedArea: "ambos",
    recoveryNote: "Si es benigna, no requiere tratamiento. Si hay sospecha de melanoma, la detección temprana es crucial — consulta a un dermatólogo.",
    category: "medica",
    medicalWarning: "Las líneas oscuras nuevas en una sola uña deben ser evaluadas por un dermatólogo para descartar melanoma subungueal. Esto es especialmente importante si la línea cambia, se ensancha, o si la pigmentación se extiende a la piel alrededor. La detección temprana salva vidas.",
    relatedConditions: ["trauma"],
    relatedCaseIds: [],
  },

  {
    id: "dermatitis_contacto",
    name: "Alergia a Productos de Uñas (Dermatitis de Contacto)",
    shortName: "Alergia a Gel/Acrílico",
    description:
      "Reacción alérgica a los químicos en productos de uñas, especialmente al HEMA en geles o al monómero en acrílicos. Causa picazón, enrojecimiento y ampollas en la piel alrededor de las uñas y los dedos.",
    visualSigns: [
      "Enrojecimiento y picazón en la piel alrededor de las uñas",
      "Pequeñas ampollas o sarpullido en las puntas de los dedos",
      "Piel seca, agrietada o que se pela alrededor de las uñas",
      "Los síntomas aparecen horas o días después del servicio de salón",
    ],
    primarySymptoms: ["itching", "swelling"],
    matchingSymptoms: ["itching", "swelling", "peeling"],
    prevalence: 0.9,
    minHighConfidence: 2,
    severityGuide: {
      leve: "Picazón leve después del servicio de uñas. Desaparece en días.",
      moderado: "Enrojecimiento notable, picazón persistente, pequeñas ampollas.",
      severo: "Ampollas grandes, piel agrietada, hinchazón. Puede extenderse a otras áreas.",
    },
    commonCauses: [
      "Alergia al HEMA (químico en la mayoría de geles UV)",
      "Alergia al monómero líquido de acrílico",
      "Contacto con gel sin curar (antes de pasar por la lámpara UV)",
      "Desarrollo de alergia después de exposición repetida (puede tardar meses o años)",
    ],
    riskFactors: [
      "Uso prolongado de geles UV o acrílicos",
      "Piel sensible o antecedentes de alergias",
      "Contacto frecuente con gel sin curar",
    ],
    homeCare: [
      "Deja de usar el producto que causa la reacción inmediatamente",
      "Aplica crema con hidrocortisona de venta libre para la picazón",
      "Usa crema hidratante sin fragancia para piel agrietada",
      "Busca productos HEMA-free si quieres seguir usando gel",
      "Un antihistamínico oral puede ayudar con la picazón",
    ],
    doNot: [
      "No sigas usando el mismo producto — la alergia empeora con cada exposición",
      "No revientes las ampollas — riesgo de infección",
      "No apliques esmalte ni productos sobre piel irritada",
    ],
    seekProfessionalWhen: [
      "La reacción no mejora en 1-2 semanas",
      "Las ampollas son grandes o se infectan",
      "La reacción se extiende más allá de los dedos",
      "Quieres saber exactamente a qué químico eres alérgica",
    ],
    professionalTreatment:
      "En nuestro salón usamos productos hipoalergénicos y libres de HEMA. Evaluamos tu historial y elegimos los productos más seguros para tu piel. La onicoplastia con tratamiento fortalecedor es una alternativa segura que fortalece la uña sin los químicos problemáticos.",
    affectedArea: "manos",
    recoveryNote: "La piel se recupera en 1-3 semanas al retirar el producto causante. Evitar la re-exposición es clave.",
    category: "salon",
    relatedConditions: ["unas_debiles", "onycholysis_salon"],
    relatedCaseIds: [],
  },

  {
    id: "onicogrifosis",
    name: "Uña en Garra (Onicogrifosis)",
    shortName: "Uña Muy Gruesa y Curva",
    description:
      "La uña crece extremadamente gruesa, larga y curvada, parecida a un cuerno o garra. Común en adultos mayores, personas con mala circulación, o cuando las uñas se descuidan por mucho tiempo.",
    visualSigns: [
      "Uña extremadamente gruesa, difícil o imposible de cortar en casa",
      "La uña se curva hacia un lado o se enrolla",
      "Color amarillo oscuro o marrón",
      "Superficie rugosa y áspera",
    ],
    primarySymptoms: ["thick", "curved"],
    matchingSymptoms: ["thick", "curved", "deformed", "yellow", "rough"],
    prevalence: 0.8,
    minHighConfidence: 2,
    severityGuide: {
      leve: "La uña está más gruesa de lo normal pero aún se puede cortar.",
      moderado: "Muy gruesa, difícil de manejar en casa. Empieza a curvarse.",
      severo: "Imposible de cortar en casa. La uña interfiere con zapatos y actividad diaria.",
    },
    commonCauses: [
      "Falta de cuidado de las uñas por largo tiempo",
      "Mala circulación en las extremidades",
      "Trauma repetido (zapatos apretados durante años)",
      "Infección por hongos avanzada no tratada",
    ],
    riskFactors: [
      "Edad avanzada",
      "Diabetes o problemas vasculares",
      "Dificultad para alcanzarse los pies",
      "Falta de movilidad",
    ],
    homeCare: [
      "Si la uña es muy gruesa, NO intentes cortarla tú mismo — puedes lastimarte",
      "Remoja los pies en agua tibia 20-30 minutos para ablandar la uña",
      "Aplica crema hidratante con urea (20-40%) en la uña y alrededores",
      "Busca ayuda profesional para el corte y manejo",
    ],
    doNot: [
      "No intentes cortar una uña extremadamente gruesa con cortaúñas casero",
      "No ignores el problema — puede causar dolor e infecciones",
      "No uses zapatos apretados que presionen la uña",
    ],
    seekProfessionalWhen: [
      "No puedes cortar la uña en casa",
      "La uña causa dolor o interfiere con el calzado",
      "Tienes diabetes — el manejo profesional es importante",
      "Quieres restaurar una apariencia normal",
    ],
    professionalTreatment:
      "Reducimos el grosor de la uña de forma segura y profesional, evaluamos si hay hongos u otra condición, y con onicoplastia reconstruimos una apariencia natural. Para adultos mayores, ofrecemos un manejo continuo para mantener las uñas saludables.",
    affectedArea: "pies",
    recoveryNote: "La reducción profesional del grosor da resultados inmediatos. El mantenimiento regular cada 4-8 semanas mantiene las uñas manejables.",
    category: "estructural",
    relatedConditions: ["onicomicosis", "trauma"],
    relatedCaseIds: [1, 3],
  },
];

// ─── GENERAL PREVENTION TIPS ───────────────────────────────
// Shown after every diagnosis to maximize value

export const generalPreventionTips = [
  {
    icon: "🧴",
    title: "Hidrata a Diario",
    tip: "Aplica crema o aceite en uñas y cutículas cada noche antes de dormir.",
  },
  {
    icon: "✂️",
    title: "Corta Correctamente",
    tip: "Corta las uñas de los pies en línea recta. Las de las manos pueden tener forma ovalada suave.",
  },
  {
    icon: "👟",
    title: "Zapatos que Respiren",
    tip: "Alterna tus zapatos y usa medias de algodón. Evita zapatos mojados o húmedos.",
  },
  {
    icon: "🧼",
    title: "Higiene Personal",
    tip: "No compartas cortaúñas ni herramientas de manicura. Desinféctalas con alcohol.",
  },
  {
    icon: "🩴",
    title: "Protección en Público",
    tip: "Usa sandalias en duchas públicas, piscinas y gimnasios.",
  },
  {
    icon: "🥗",
    title: "Alimentación",
    tip: "Come proteínas, verduras verdes, huevos y alimentos ricos en biotina y zinc.",
  },
];
