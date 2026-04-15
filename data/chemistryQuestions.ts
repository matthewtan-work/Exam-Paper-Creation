export type Difficulty = "Easy" | "Medium" | "Hard";
export type QuestionType = "Structured" | "MCQ" | "Free Response" | "Data-Based";
export type Level =
  | "O Level (Pure Chemistry)"
  | "O Level (Combined Chemistry)"
  | "A Level (H2 Chemistry)"
  | "A Level (H1 Chemistry)";

export interface ChemistryQuestion {
  id: string;
  topic: string;
  subtopic: string;
  level: Level;
  difficulty: Difficulty;
  questionType: QuestionType;
  marks: number;
  sourceYear: number;
  sourcePaper: string;
  text: string;
  answerOutline: string;
  tags: string[];
}

export const chemistryQuestions: ChemistryQuestion[] = [
  // === COVALENT BONDING ===
  {
    id: "q001",
    topic: "Covalent Bonding",
    subtopic: "Nature of Covalent Bond",
    level: "O Level (Pure Chemistry)",
    difficulty: "Easy",
    questionType: "Structured",
    marks: 2,
    sourceYear: 2022,
    sourcePaper: "O-Level Chem Paper 2",
    text: "Define a covalent bond. State the type of elements that typically form covalent bonds.",
    answerOutline:
      "A covalent bond is a shared pair of electrons between two non-metal atoms [1]. Covalent bonds are typically formed between non-metallic elements [1].",
    tags: ["definition", "bonding", "non-metals"],
  },
  {
    id: "q002",
    topic: "Covalent Bonding",
    subtopic: "Dot-and-Cross Diagrams",
    level: "O Level (Pure Chemistry)",
    difficulty: "Medium",
    questionType: "Structured",
    marks: 4,
    sourceYear: 2021,
    sourcePaper: "O-Level Chem Paper 2",
    text: "Draw a dot-and-cross diagram for a molecule of ammonia (NH₃). Explain why nitrogen forms three covalent bonds with hydrogen.",
    answerOutline:
      "Nitrogen has 5 valence electrons and needs 3 more to complete its octet [1]. Correct dot-and-cross diagram showing 3 N–H bonds and 1 lone pair on N [2]. Each hydrogen contributes 1 electron to form a shared pair [1].",
    tags: ["dot-and-cross", "ammonia", "lone pair", "octet rule"],
  },
  {
    id: "q003",
    topic: "Covalent Bonding",
    subtopic: "Properties of Covalent Compounds",
    level: "O Level (Combined Chemistry)",
    difficulty: "Medium",
    questionType: "Free Response",
    marks: 4,
    sourceYear: 2023,
    sourcePaper: "O-Level Chem Paper 2",
    text: "Explain why most simple molecular covalent compounds have low melting points but do not conduct electricity in any state.",
    answerOutline:
      "Low melting points: weak intermolecular forces between molecules require little energy to overcome [2]. No electrical conductivity: no free ions or electrons in any state; electrons are localised within covalent bonds and cannot carry charge [2].",
    tags: ["properties", "melting point", "conductivity", "intermolecular forces"],
  },
  {
    id: "q004",
    topic: "Covalent Bonding",
    subtopic: "Giant Covalent Structures",
    level: "A Level (H2 Chemistry)",
    difficulty: "Hard",
    questionType: "Structured",
    marks: 5,
    sourceYear: 2020,
    sourcePaper: "A-Level Chem Paper 3",
    text: "Compare the structures and properties of diamond and graphite. In your answer, refer to bonding, structure, electrical conductivity, and hardness.",
    answerOutline:
      "Diamond: tetrahedral arrangement, each C bonded to 4 others, very hard, non-conductor [2]. Graphite: layers of hexagonal rings, each C bonded to 3, delocalised electrons between layers conduct electricity, soft/lubricant [3].",
    tags: ["diamond", "graphite", "giant covalent", "allotropes"],
  },

  // === IONIC BONDING ===
  {
    id: "q005",
    topic: "Ionic Bonding",
    subtopic: "Formation of Ions",
    level: "O Level (Combined Chemistry)",
    difficulty: "Easy",
    questionType: "Structured",
    marks: 3,
    sourceYear: 2022,
    sourcePaper: "O-Level Chem Paper 1",
    text: "Magnesium reacts with chlorine to form magnesium chloride. (a) State the type of bonding present in magnesium chloride. (b) Write ionic equations showing the formation of Mg²⁺ and Cl⁻ ions from their atoms.",
    answerOutline:
      "(a) Ionic bonding [1]. (b) Mg → Mg²⁺ + 2e⁻ [1]; Cl + e⁻ → Cl⁻ [1].",
    tags: ["ionic bonding", "ion formation", "magnesium", "chloride"],
  },
  {
    id: "q006",
    topic: "Ionic Bonding",
    subtopic: "Properties of Ionic Compounds",
    level: "O Level (Pure Chemistry)",
    difficulty: "Medium",
    questionType: "Free Response",
    marks: 4,
    sourceYear: 2021,
    sourcePaper: "O-Level Chem Paper 2",
    text: "Explain why sodium chloride has a high melting point and can conduct electricity when dissolved in water but not in its solid state.",
    answerOutline:
      "High melting point: strong electrostatic forces between oppositely charged ions in a giant ionic lattice require large energy to break [2]. Conducts in solution: ions dissociate and are free to move and carry charge [1]. Does not conduct in solid: ions fixed in lattice, unable to move [1].",
    tags: ["ionic properties", "melting point", "conductivity", "lattice"],
  },
  {
    id: "q007",
    topic: "Ionic Bonding",
    subtopic: "Ionic vs Covalent",
    level: "O Level (Pure Chemistry)",
    difficulty: "Medium",
    questionType: "Data-Based",
    marks: 6,
    sourceYear: 2019,
    sourcePaper: "O-Level Chem Paper 2",
    text: "The table below shows properties of two compounds, X and Y.\n\nCompound X: melting point 801 °C, conducts electricity when molten: yes, soluble in water: yes.\nCompound Y: melting point 68 °C, conducts electricity when molten: no, soluble in water: slightly.\n\n(a) Identify the type of bonding in X and Y.\n(b) Explain how the bonding accounts for each compound's melting point.\n(c) Suggest an identity for each compound.",
    answerOutline:
      "(a) X: ionic; Y: covalent molecular [1]. (b) X: giant ionic lattice, strong forces, high mp [1]; Y: weak intermolecular forces, low energy needed [1]. (c) X: NaCl or similar ionic salt [1]; Y: CCl₄ or similar small covalent molecule [1]. Award [1] for clear reasoning.",
    tags: ["ionic", "covalent", "comparison", "properties", "data-based"],
  },

  // === MOLE CONCEPT ===
  {
    id: "q008",
    topic: "Mole Concept",
    subtopic: "Molar Mass and Avogadro's Number",
    level: "O Level (Combined Chemistry)",
    difficulty: "Easy",
    questionType: "Structured",
    marks: 2,
    sourceYear: 2023,
    sourcePaper: "O-Level Chem Paper 1",
    text: "Calculate the number of moles in 36 g of water (H₂O). [Relative atomic masses: H = 1, O = 16]",
    answerOutline:
      "Molar mass of H₂O = (2×1) + 16 = 18 g/mol [1]. Moles = 36/18 = 2 mol [1].",
    tags: ["moles", "calculation", "water", "molar mass"],
  },
  {
    id: "q009",
    topic: "Mole Concept",
    subtopic: "Stoichiometry",
    level: "O Level (Pure Chemistry)",
    difficulty: "Medium",
    questionType: "Structured",
    marks: 4,
    sourceYear: 2022,
    sourcePaper: "O-Level Chem Paper 2",
    text: "12 g of carbon is burned completely in excess oxygen to form carbon dioxide.\n\nC + O₂ → CO₂\n\n(a) Calculate the number of moles of carbon used. [Ar: C = 12]\n(b) Determine the mass of CO₂ produced. [Mr: CO₂ = 44]",
    answerOutline:
      "(a) Moles C = 12/12 = 1 mol [1]. (b) Mole ratio C:CO₂ = 1:1, so 1 mol CO₂ [1]; mass = 1 × 44 = 44 g [1]. Correct units [1].",
    tags: ["stoichiometry", "combustion", "carbon dioxide", "mole ratio"],
  },
  {
    id: "q010",
    topic: "Mole Concept",
    subtopic: "Concentration and Volume",
    level: "O Level (Pure Chemistry)",
    difficulty: "Hard",
    questionType: "Structured",
    marks: 5,
    sourceYear: 2020,
    sourcePaper: "O-Level Chem Paper 2",
    text: "25.0 cm³ of 0.100 mol/dm³ sodium hydroxide solution is exactly neutralised by 20.0 cm³ of hydrochloric acid.\n\nNaOH + HCl → NaCl + H₂O\n\n(a) Calculate the moles of NaOH used.\n(b) Calculate the concentration of the hydrochloric acid in mol/dm³.",
    answerOutline:
      "(a) Moles NaOH = 0.100 × (25/1000) = 0.0025 mol [1]. (b) Mole ratio NaOH:HCl = 1:1, so moles HCl = 0.0025 mol [1]; concentration = 0.0025/(20/1000) = 0.125 mol/dm³ [2]. Correct rounding [1].",
    tags: ["concentration", "titration", "neutralisation", "calculation"],
  },

  // === ACIDS AND BASES ===
  {
    id: "q011",
    topic: "Acids and Bases",
    subtopic: "pH and Indicators",
    level: "O Level (Combined Chemistry)",
    difficulty: "Easy",
    questionType: "MCQ",
    marks: 1,
    sourceYear: 2023,
    sourcePaper: "O-Level Chem Paper 1",
    text: "Which of the following correctly describes a solution with pH 3?\n\nA. Strongly alkaline\nB. Weakly alkaline\nC. Weakly acidic\nD. Strongly acidic",
    answerOutline: "C — pH 3 is weakly acidic (pH < 7 = acidic; pH close to 7 = weak).",
    tags: ["pH", "acidity", "indicator", "MCQ"],
  },
  {
    id: "q012",
    topic: "Acids and Bases",
    subtopic: "Reactions of Acids",
    level: "O Level (Pure Chemistry)",
    difficulty: "Medium",
    questionType: "Structured",
    marks: 4,
    sourceYear: 2021,
    sourcePaper: "O-Level Chem Paper 2",
    text: "Describe the reactions of dilute sulphuric acid with: (a) calcium carbonate, and (b) zinc. In each case, write a word equation and state the observations.",
    answerOutline:
      "(a) H₂SO₄ + CaCO₃ → CaSO₄ + H₂O + CO₂; effervescence, solid partially dissolves, CO₂ turns limewater milky [2]. (b) H₂SO₄ + Zn → ZnSO₄ + H₂; effervescence, zinc dissolves, gas produced reignites with a squeaky pop [2].",
    tags: ["acids", "reactions", "carbonate", "metal", "word equation"],
  },
  {
    id: "q013",
    topic: "Acids and Bases",
    subtopic: "Strong and Weak Acids",
    level: "A Level (H1 Chemistry)",
    difficulty: "Hard",
    questionType: "Free Response",
    marks: 5,
    sourceYear: 2019,
    sourcePaper: "A-Level Chem Paper 2",
    text: "Explain the difference between a strong acid and a weak acid in terms of degree of dissociation. Describe how you would distinguish between 1 mol/dm³ hydrochloric acid and 1 mol/dm³ ethanoic acid using a simple experiment.",
    answerOutline:
      "Strong acid (HCl): fully dissociates into ions in aqueous solution [1]. Weak acid (CH₃COOH): partially dissociates, equilibrium exists [1]. Experiment: use pH meter or indicator — HCl gives lower pH (higher [H⁺]) [1]; test electrical conductivity — HCl conducts better [1]; measure rate of reaction with Mg — HCl reacts faster due to higher [H⁺] [1].",
    tags: ["strong acid", "weak acid", "dissociation", "experiment"],
  },

  // === REDOX ===
  {
    id: "q014",
    topic: "Redox",
    subtopic: "Oxidation States",
    level: "O Level (Pure Chemistry)",
    difficulty: "Medium",
    questionType: "Structured",
    marks: 3,
    sourceYear: 2022,
    sourcePaper: "O-Level Chem Paper 2",
    text: "Define oxidation and reduction in terms of: (a) oxygen transfer, and (b) electron transfer. Give one example of a redox reaction and identify the oxidising and reducing agents.",
    answerOutline:
      "(a) Oxidation = gain of oxygen; reduction = loss of oxygen [1]. (b) Oxidation = loss of electrons; reduction = gain of electrons [1]. Example: Fe + CuSO₄ → FeSO₄ + Cu; Fe is reducing agent (loses e⁻), Cu²⁺ is oxidising agent (gains e⁻) [1].",
    tags: ["redox", "oxidation", "reduction", "electron transfer", "oxidising agent"],
  },
  {
    id: "q015",
    topic: "Redox",
    subtopic: "Half Equations",
    level: "A Level (H2 Chemistry)",
    difficulty: "Hard",
    questionType: "Structured",
    marks: 5,
    sourceYear: 2020,
    sourcePaper: "A-Level Chem Paper 3",
    text: "In acidic solution, manganate(VII) ions (MnO₄⁻) oxidise iron(II) ions (Fe²⁺) to iron(III) ions (Fe³⁺), while being reduced to Mn²⁺ ions.\n\n(a) Write the half-equation for the reduction of MnO₄⁻ to Mn²⁺ in acidic solution.\n(b) Write the half-equation for the oxidation of Fe²⁺ to Fe³⁺.\n(c) Combine the half-equations to give the overall ionic equation.",
    answerOutline:
      "(a) MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O [2]. (b) Fe²⁺ → Fe³⁺ + e⁻ [1]. (c) MnO₄⁻ + 8H⁺ + 5Fe²⁺ → Mn²⁺ + 5Fe³⁺ + 4H₂O [2].",
    tags: ["half equations", "permanganate", "iron", "acidic solution"],
  },

  // === ELECTROLYSIS ===
  {
    id: "q016",
    topic: "Electrolysis",
    subtopic: "Basic Principles",
    level: "O Level (Combined Chemistry)",
    difficulty: "Easy",
    questionType: "Structured",
    marks: 2,
    sourceYear: 2023,
    sourcePaper: "O-Level Chem Paper 1",
    text: "State what is meant by electrolysis and identify the products at the anode and cathode when dilute sulphuric acid is electrolysed using inert electrodes.",
    answerOutline:
      "Electrolysis is the decomposition of an ionic compound by passing electricity through it in molten or aqueous state [1]. Cathode: hydrogen gas (H₂); anode: oxygen gas (O₂) [1].",
    tags: ["electrolysis", "anode", "cathode", "sulphuric acid"],
  },
  {
    id: "q017",
    topic: "Electrolysis",
    subtopic: "Selective Discharge",
    level: "O Level (Pure Chemistry)",
    difficulty: "Medium",
    questionType: "Free Response",
    marks: 4,
    sourceYear: 2021,
    sourcePaper: "O-Level Chem Paper 2",
    text: "When concentrated sodium chloride solution is electrolysed using inert electrodes, chlorine gas is produced at the anode rather than oxygen. Explain why chlorine is preferentially discharged. State the product at the cathode and write half-equations for both electrode reactions.",
    answerOutline:
      "Selective discharge: in concentrated NaCl, Cl⁻ ions are present in much higher concentration than OH⁻ ions, so Cl⁻ is preferentially discharged [1]. Cathode product: H₂ [1]. Cathode: 2H⁺ + 2e⁻ → H₂ (or 2H₂O + 2e⁻ → H₂ + 2OH⁻) [1]. Anode: 2Cl⁻ → Cl₂ + 2e⁻ [1].",
    tags: ["selective discharge", "chlorine", "sodium chloride", "electrode"],
  },
  {
    id: "q018",
    topic: "Electrolysis",
    subtopic: "Electroplating",
    level: "O Level (Pure Chemistry)",
    difficulty: "Medium",
    questionType: "Structured",
    marks: 4,
    sourceYear: 2022,
    sourcePaper: "O-Level Chem Paper 2",
    text: "Describe how you would electroplate a steel spoon with silver. In your answer, state the identity of: (a) the electrolyte, (b) the anode, (c) the cathode. Write a half-equation for the reaction at the cathode.",
    answerOutline:
      "(a) Silver nitrate solution [1]. (b) Pure silver (anode) [1]. (c) Steel spoon (cathode) [1]. Cathode: Ag⁺ + e⁻ → Ag [1].",
    tags: ["electroplating", "silver", "cathode", "anode", "applied"],
  },

  // === ORGANIC CHEMISTRY ===
  {
    id: "q019",
    topic: "Organic Chemistry",
    subtopic: "Alkanes",
    level: "O Level (Pure Chemistry)",
    difficulty: "Easy",
    questionType: "Structured",
    marks: 3,
    sourceYear: 2022,
    sourcePaper: "O-Level Chem Paper 2",
    text: "Methane is the simplest alkane. (a) Draw the structural formula of methane. (b) Write the equation for the complete combustion of methane. (c) State one use of methane.",
    answerOutline:
      "(a) Correct structural formula: C with 4 H atoms [1]. (b) CH₄ + 2O₂ → CO₂ + 2H₂O [1]. (c) Fuel/natural gas [1].",
    tags: ["alkane", "methane", "combustion", "structural formula"],
  },
  {
    id: "q020",
    topic: "Organic Chemistry",
    subtopic: "Alkenes and Addition Reactions",
    level: "O Level (Pure Chemistry)",
    difficulty: "Medium",
    questionType: "Structured",
    marks: 4,
    sourceYear: 2021,
    sourcePaper: "O-Level Chem Paper 2",
    text: "Ethene (C₂H₄) undergoes addition reactions. (a) Describe the reaction of ethene with bromine water, including the observation and the name of the product. (b) Write the structural formula of the product formed when ethene reacts with hydrogen gas.",
    answerOutline:
      "(a) Bromine water decolourises from orange/brown to colourless [1]; product is 1,2-dibromoethane (BrCH₂CH₂Br) [1]. (b) CH₃CH₃ (ethane) [1]; correct structural formula showing C–C bond [1].",
    tags: ["alkene", "addition reaction", "bromine test", "ethene"],
  },
  {
    id: "q021",
    topic: "Organic Chemistry",
    subtopic: "Alcohols and Fermentation",
    level: "A Level (H1 Chemistry)",
    difficulty: "Medium",
    questionType: "Free Response",
    marks: 5,
    sourceYear: 2019,
    sourcePaper: "O-Level Chem Paper 2",
    text: "Ethanol can be produced by fermentation or by hydration of ethene. Compare the two methods in terms of: raw materials, conditions, yield, and environmental impact.",
    answerOutline:
      "Fermentation: glucose + yeast, 25–35 °C, anaerobic, slow/low yield, renewable feedstock [2]. Hydration: ethene + steam, 300 °C, H₃PO₄ catalyst, 60–70 atm, fast/high yield, non-renewable (petroleum) feedstock [2]. Environmental impact: fermentation is carbon neutral; hydration depletes fossil fuels [1].",
    tags: ["ethanol", "fermentation", "hydration", "comparison", "environmental"],
  },

  // === PERIODIC TABLE ===
  {
    id: "q022",
    topic: "Periodic Table",
    subtopic: "Group 1 Elements",
    level: "O Level (Combined Chemistry)",
    difficulty: "Easy",
    questionType: "Structured",
    marks: 3,
    sourceYear: 2023,
    sourcePaper: "O-Level Chem Paper 1",
    text: "Describe the trend in reactivity of Group I metals (alkali metals) as you go down the group. Explain this trend in terms of atomic structure.",
    answerOutline:
      "Reactivity increases down the group [1]. Going down: more electron shells, outermost electron is further from nucleus and more shielded [1], so ionisation energy decreases and the electron is more easily lost [1].",
    tags: ["Group 1", "alkali metals", "reactivity trend", "periodic table"],
  },
  {
    id: "q023",
    topic: "Periodic Table",
    subtopic: "Group 7 Elements",
    level: "O Level (Pure Chemistry)",
    difficulty: "Medium",
    questionType: "Structured",
    marks: 4,
    sourceYear: 2021,
    sourcePaper: "O-Level Chem Paper 2",
    text: "Chlorine, bromine, and iodine are all members of Group VII. (a) Describe one test to confirm the presence of chlorine gas. (b) State what is observed when chlorine gas is bubbled into a solution of potassium iodide. Write an ionic equation for this reaction.",
    answerOutline:
      "(a) Moist litmus paper turns red then bleaches to white [1]. (b) Solution turns brown/orange-brown as iodine is displaced [1]. Cl₂ + 2KI → 2KCl + I₂; or Cl₂ + 2I⁻ → 2Cl⁻ + I₂ [2].",
    tags: ["Group 7", "halogens", "displacement", "chlorine", "iodine"],
  },
  {
    id: "q024",
    topic: "Periodic Table",
    subtopic: "Transition Metals",
    level: "A Level (H2 Chemistry)",
    difficulty: "Hard",
    questionType: "Free Response",
    marks: 5,
    sourceYear: 2020,
    sourcePaper: "A-Level Chem Paper 2",
    text: "State four characteristic properties of transition metals and give an example illustrating each property.",
    answerOutline:
      "Variable oxidation states: Fe(II) and Fe(III) in iron compounds [1]; Coloured ions: Cu²⁺ is blue in solution [1]; Catalytic activity: Fe in Haber process, V₂O₅ in Contact process [1]; Complex ion formation: [Cu(NH₃)₄]²⁺ [1]; Good conductors of heat and electricity [1]. Award 1 mark each for any four, up to 4 marks with example.",
    tags: ["transition metals", "properties", "catalysis", "complex ions"],
  },

  // === METALS ===
  {
    id: "q025",
    topic: "Metals",
    subtopic: "Reactivity Series",
    level: "O Level (Combined Chemistry)",
    difficulty: "Easy",
    questionType: "Structured",
    marks: 3,
    sourceYear: 2022,
    sourcePaper: "O-Level Chem Paper 1",
    text: "The reactivity series of metals ranks metals in order of their reactivity. (a) State two observations when iron is added to copper sulphate solution. (b) Explain why gold does not react with dilute hydrochloric acid.",
    answerOutline:
      "(a) Iron dissolves / iron surface becomes coated with copper / blue solution fades [2]. (b) Gold is below hydrogen in the reactivity series / gold is less reactive than hydrogen, so it cannot displace hydrogen from acid [1].",
    tags: ["reactivity series", "displacement", "gold", "iron", "copper sulphate"],
  },
  {
    id: "q026",
    topic: "Metals",
    subtopic: "Extraction of Metals",
    level: "O Level (Pure Chemistry)",
    difficulty: "Medium",
    questionType: "Free Response",
    marks: 4,
    sourceYear: 2021,
    sourcePaper: "O-Level Chem Paper 2",
    text: "Explain why aluminium is extracted from its ore (bauxite) by electrolysis rather than by reduction with carbon. State one disadvantage of using electrolysis for large-scale metal extraction.",
    answerOutline:
      "Aluminium is more reactive than carbon [1], so carbon cannot reduce aluminium oxide [1]. Electrolysis is required because the strong ionic bonding in Al₂O₃ must be broken [1]. Disadvantage: very high energy cost / expensive electricity [1].",
    tags: ["aluminium", "extraction", "electrolysis", "reactivity"],
  },
  {
    id: "q027",
    topic: "Metals",
    subtopic: "Corrosion and Rusting",
    level: "O Level (Pure Chemistry)",
    difficulty: "Medium",
    questionType: "Data-Based",
    marks: 5,
    sourceYear: 2019,
    sourcePaper: "O-Level Chem Paper 2",
    text: "An experiment was set up to investigate the conditions required for rusting. Four iron nails were placed in separate test tubes:\n\nTube 1: boiled water + oil seal (no air)\nTube 2: dry air only\nTube 3: air + water\nTube 4: air + water + salt\n\nAfter one week, only nails in Tubes 3 and 4 had rusted, with Tube 4 showing more rust.\n\n(a) State the two conditions necessary for iron to rust.\n(b) Explain why the nail in Tube 4 rusted more than in Tube 3.\n(c) Suggest one method to prevent iron from rusting.",
    answerOutline:
      "(a) Water (or moisture) and oxygen (or air) [2]. (b) Salt (sodium chloride) increases the conductivity of the electrolyte, speeding up the electrochemical rusting process [1]. (c) Painting, galvanising, oiling, or alloying [1]. Accept any valid method with brief justification.",
    tags: ["rusting", "corrosion", "conditions", "prevention", "data-based"],
  },

  // === ENERGY CHANGES ===
  {
    id: "q028",
    topic: "Energy Changes",
    subtopic: "Exothermic and Endothermic",
    level: "O Level (Combined Chemistry)",
    difficulty: "Easy",
    questionType: "Structured",
    marks: 2,
    sourceYear: 2023,
    sourcePaper: "O-Level Chem Paper 1",
    text: "Distinguish between an exothermic and an endothermic reaction. Give one example of each.",
    answerOutline:
      "Exothermic: releases energy to surroundings, temperature of surroundings rises [1]; example: combustion, neutralisation. Endothermic: absorbs energy from surroundings, temperature of surroundings falls [1]; example: thermal decomposition, photosynthesis.",
    tags: ["exothermic", "endothermic", "energy", "definition"],
  },
  {
    id: "q029",
    topic: "Energy Changes",
    subtopic: "Bond Energies",
    level: "A Level (H2 Chemistry)",
    difficulty: "Hard",
    questionType: "Structured",
    marks: 5,
    sourceYear: 2020,
    sourcePaper: "A-Level Chem Paper 3",
    text: "Using the bond energies below, calculate the enthalpy change (ΔH) for the reaction:\n\nH₂ + Cl₂ → 2HCl\n\nBond energies (kJ/mol): H–H = 436; Cl–Cl = 243; H–Cl = 431\n\nState whether the reaction is exothermic or endothermic and explain your reasoning.",
    answerOutline:
      "Bonds broken: H–H (436) + Cl–Cl (243) = 679 kJ [1]. Bonds formed: 2 × H–Cl = 2 × 431 = 862 kJ [1]. ΔH = 679 − 862 = −183 kJ/mol [2]. Exothermic: energy released (bonds formed) > energy absorbed (bonds broken), ΔH is negative [1].",
    tags: ["bond energy", "enthalpy", "calculation", "exothermic"],
  },
  {
    id: "q030",
    topic: "Energy Changes",
    subtopic: "Hess's Law",
    level: "A Level (H2 Chemistry)",
    difficulty: "Hard",
    questionType: "Structured",
    marks: 5,
    sourceYear: 2019,
    sourcePaper: "A-Level Chem Paper 3",
    text: "State Hess's Law. Using the following data, calculate the standard enthalpy of formation of ethanol (C₂H₅OH).\n\nGiven:\nΔHc° [C(s)] = −394 kJ/mol\nΔHc° [H₂(g)] = −286 kJ/mol\nΔHc° [C₂H₅OH(l)] = −1371 kJ/mol",
    answerOutline:
      "Hess's Law: the total enthalpy change of a reaction is independent of the pathway taken [1]. Formation equation: 2C + 3H₂ + ½O₂ → C₂H₅OH. ΔHf° = [2(−394) + 3(−286)] − (−1371) = [−788 − 858] + 1371 = −1646 + 1371 = −275 kJ/mol [4].",
    tags: ["Hess's law", "enthalpy of formation", "calculation", "thermodynamics"],
  },

  // === ADDITIONAL QUESTIONS ===
  {
    id: "q031",
    topic: "Mole Concept",
    subtopic: "Empirical and Molecular Formula",
    level: "O Level (Pure Chemistry)",
    difficulty: "Medium",
    questionType: "Structured",
    marks: 4,
    sourceYear: 2022,
    sourcePaper: "O-Level Chem Paper 2",
    text: "A hydrocarbon contains 85.7% carbon and 14.3% hydrogen by mass. Its relative molecular mass is 56.\n\n(a) Determine the empirical formula of the hydrocarbon. [Ar: C = 12, H = 1]\n(b) Hence determine the molecular formula of the hydrocarbon.",
    answerOutline:
      "(a) C: 85.7/12 = 7.14; H: 14.3/1 = 14.3; ratio C:H = 7.14:14.3 = 1:2; empirical formula = CH₂ [2]. (b) Empirical formula mass = 14; 56/14 = 4; molecular formula = C₄H₈ [2].",
    tags: ["empirical formula", "molecular formula", "hydrocarbon", "calculation"],
  },
  {
    id: "q032",
    topic: "Acids and Bases",
    subtopic: "Neutralisation",
    level: "O Level (Combined Chemistry)",
    difficulty: "Easy",
    questionType: "Structured",
    marks: 3,
    sourceYear: 2023,
    sourcePaper: "O-Level Chem Paper 1",
    text: "Nitric acid reacts with potassium hydroxide in a neutralisation reaction.\n\n(a) Write the word equation for this reaction.\n(b) Write the balanced symbol equation.\n(c) Write the ionic equation for the neutralisation.",
    answerOutline:
      "(a) nitric acid + potassium hydroxide → potassium nitrate + water [1]. (b) HNO₃ + KOH → KNO₃ + H₂O [1]. (c) H⁺ + OH⁻ → H₂O [1].",
    tags: ["neutralisation", "ionic equation", "acid-base", "KOH"],
  },
  {
    id: "q033",
    topic: "Organic Chemistry",
    subtopic: "Polymers",
    level: "O Level (Pure Chemistry)",
    difficulty: "Medium",
    questionType: "Free Response",
    marks: 4,
    sourceYear: 2021,
    sourcePaper: "O-Level Chem Paper 2",
    text: "Poly(ethene) is an addition polymer made from ethene monomers.\n\n(a) Draw a section of the poly(ethene) chain showing at least three monomer units.\n(b) State two properties of poly(ethene) that make it useful as a plastic.\n(c) State one environmental problem associated with plastics such as poly(ethene).",
    answerOutline:
      "(a) Correct repeating unit –(CH₂–CH₂)n– with at least 3 units shown [2]. (b) Any two: flexible, lightweight, waterproof, chemically inert, cheap to produce [1]. (c) Non-biodegradable; accumulates in environment/oceans; releases toxins on incineration [1].",
    tags: ["polymer", "addition polymerisation", "poly(ethene)", "environmental"],
  },
];
