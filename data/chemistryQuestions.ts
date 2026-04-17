/**
 * Chemistry question repository — SEAB 6092 O-Level Pure Chemistry (2026)
 * All questions must map to one of the 12 official syllabus topics.
 * A-Level and non-6092 content is EXCLUDED from this file.
 */

import type {
  OfficialChemTopic,
  ChemistryPaper,
  Paper2Section,
  ChemistryAO,
  PracticalSkillArea,
} from "./syllabusChemistry";

export type Difficulty = "Easy" | "Medium" | "Hard";
export type QuestionType = "MCQ" | "Structured" | "Free Response" | "Data-Based" | "Practical";
export type ReviewStatus = "approved" | "needs_remapping" | "under_review";

export interface ChemistryQuestion {
  id: string;
  syllabusCode: "6092";
  paper: ChemistryPaper;
  section?: Paper2Section;          // Paper 2 only
  questionType: QuestionType;
  officialTopic: OfficialChemTopic;
  subtopic: string;
  commandWord: string;
  assessmentObjective: ChemistryAO;
  practicalSkillArea?: PracticalSkillArea; // Paper 3 only
  marks: number;
  difficulty: Difficulty;
  sourceYear: number;
  sourceLabel: string;
  text: string;
  answerScheme: string;
  isDataBased: boolean;
  isPractical: boolean;
  reviewStatus: ReviewStatus;
  syllabusConfidence: "high" | "medium" | "low";
  tags: string[];
  sourceImage?: string;   // Path relative to /public, e.g. "/screenshots/qss_2023_prelim/page_02.png"
}

export const chemistryQuestions: ChemistryQuestion[] = [
  {
    id: "qss_2023_prelim_6092_p1_q001",
    syllabusCode: "6092",
    paper: "Paper 1",
    questionType: "MCQ",
    officialTopic: "Rate of Reactions",
    subtopic: "Measuring rate of reaction",
    commandWord: "Which",
    assessmentObjective: "AO2",
    marks: 1,
    difficulty: "Medium",
    sourceYear: 2023,
    sourceLabel: "Queenstown Secondary School Prelim 2023",
    text: `A student wants to show that the speed of reaction between 2.00 g of zinc carbonate and 30.00 cm³ of dilute nitric acid doubles for every 5°C rise in temperature. He measures the volume of carbon dioxide produced at regular intervals.

Which of the following apparatus should the student use to carry out the experiment?

A  burette, electronic mass balance, thermometer, gas syringe
B  burette, electronic mass balance, thermometer, measuring cylinder
C  pipette, electronic mass balance, thermometer, gas syringe
D  pipette, electronic mass balance, thermometer, measuring cylinder`,
    answerScheme: "",
    isDataBased: false,
    isPractical: false,
    reviewStatus: "approved",
    syllabusConfidence: "high",
    sourceImage: "/screenshots/qss_2023_prelim/questions/q001.png",
    tags: ["rate-of-reaction", "apparatus", "zinc-carbonate", "nitric-acid", "gas-collection"],
  },
  {
    id: "qss_2023_prelim_6092_p1_q002",
    syllabusCode: "6092",
    paper: "Paper 1",
    questionType: "MCQ",
    officialTopic: "Experimental Chemistry",
    subtopic: "Chromatography",
    commandWord: "What",
    assessmentObjective: "AO2",
    marks: 1,
    difficulty: "Medium",
    sourceYear: 2023,
    sourceLabel: "Queenstown Secondary School Prelim 2023",
    text: `The chromatography result below shows dyes, M and N present in an ink sample.

[See diagram: chromatography plate with solvent front at top (W), dye N spot, dye M spot, ink spot (origin), and solvent level at bottom (Z). Distances w, x, y, z are labelled between the levels and spots.]

What is the Rf value of the more soluble dye?

A  y / (w+x+y)
B  y / (w+x+y+z)
C  (x+y) / (x+y+z)
D  (x+y) / (w+x+y+z)`,
    answerScheme: "",
    isDataBased: true,
    isPractical: false,
    reviewStatus: "approved",
    syllabusConfidence: "high",
    sourceImage: "/screenshots/qss_2023_prelim/questions/q002.png",
    tags: ["chromatography", "Rf-value", "diagram", "paper-chromatography"],
  },
  {
    id: "qss_2023_prelim_6092_p1_q003",
    syllabusCode: "6092",
    paper: "Paper 1",
    questionType: "MCQ",
    officialTopic: "Qualitative Analysis",
    subtopic: "Testing for gases",
    commandWord: "Which",
    assessmentObjective: "AO1",
    marks: 1,
    difficulty: "Easy",
    sourceYear: 2023,
    sourceLabel: "Queenstown Secondary School Prelim 2023",
    text: `Which of the following tests would be able to distinguish between carbon dioxide gas and sulfur dioxide gas?

1  Insert a lighted splinter into the test-tube.
2  Place a piece of damp blue litmus paper at the mouth of the test-tube.
3  Bubble the gas into a test-tube containing limewater.
4  Bubble the gas into a test-tube containing aqueous acidified potassium manganate(VII).

A  1 and 2
B  1 and 3
C  2 and 3
D  3 and 4`,
    answerScheme: "",
    isDataBased: false,
    isPractical: false,
    reviewStatus: "approved",
    syllabusConfidence: "high",
    sourceImage: "/screenshots/qss_2023_prelim/questions/q003.png",
    tags: ["gas-tests", "carbon-dioxide", "sulfur-dioxide", "qualitative-analysis", "limewater", "potassium-manganate"],
  },
  {
    id: "qss_2023_prelim_6092_p1_q004",
    syllabusCode: "6092",
    paper: "Paper 1",
    questionType: "MCQ",
    officialTopic: "Qualitative Analysis",
    subtopic: "Qualitative analysis of cations",
    commandWord: "What",
    assessmentObjective: "AO2",
    marks: 1,
    difficulty: "Hard",
    sourceYear: 2023,
    sourceLabel: "Queenstown Secondary School Prelim 2023",
    text: `The flow chart below shows some reactions that blue solution W undergoes.

[See diagram: blue solution W → excess aqueous sodium hydroxide and filter → colourless solution X; W also produces → blue precipitate Y; Y → add dilute sulfuric acid and filter → blue solution Z; colourless solution X → add aluminium foil and heat → colourless gas that turns moist red litmus blue]

What are the identities of W, X, Y and Z?

         W              X           Y            Z
A  Cu(NO₃)₂        NaNO₃      Cu(OH)₂      CuSO₄
B  CuSO₄           Na₂SO₄     Cu(OH)₂      CuSO₄
C  Fe(NO₃)₂        NaNO₃      Fe(OH)₂      FeSO₄
D  (NH₄)₂SO₄      NH₄OH      Cu(OH)₂      CuSO₄`,
    answerScheme: "",
    isDataBased: true,
    isPractical: false,
    reviewStatus: "approved",
    syllabusConfidence: "high",
    sourceImage: "/screenshots/qss_2023_prelim/questions/q004.png",
    tags: ["qualitative-analysis", "copper-compounds", "ammonia", "flow-chart", "sodium-hydroxide"],
  },
  {
    id: "qss_2023_prelim_6092_p1_q005",
    syllabusCode: "6092",
    paper: "Paper 1",
    questionType: "MCQ",
    officialTopic: "The Particulate Nature of Matter",
    subtopic: "Diffusion",
    commandWord: "What",
    assessmentObjective: "AO2",
    marks: 1,
    difficulty: "Hard",
    sourceYear: 2023,
    sourceLabel: "Queenstown Secondary School Prelim 2023",
    text: `Two experimental set-ups used to demonstrate diffusion of gases are shown in the diagram below.

[See diagram: Experiment 1 — a U-tube containing a porous tube with nitrogen and oxygen, with carbon dioxide introduced at the top. Experiment 2 — same setup with hydrogen introduced at the top. Water levels at P and Q are indicated in each U-tube.]

What changes, if any, to the water levels at P and Q would you expect to see in both experiments?

                   experiment 1                   experiment 2
A  P and Q remain the same      P and Q remain the same
B  P and Q remain the same      Q is higher than P
C  P is higher than Q             Q is higher than P
D  Q is higher than P             Q is higher than P`,
    answerScheme: "",
    isDataBased: true,
    isPractical: false,
    reviewStatus: "approved",
    syllabusConfidence: "high",
    sourceImage: "/screenshots/qss_2023_prelim/questions/q005.png",
    tags: ["diffusion", "particulate-nature", "gases", "diagram", "porous-tube", "kinetic-theory"],
  },
  {
    id: "qss_2023_prelim_6092_p1_q006",
    syllabusCode: "6092",
    paper: "Paper 1",
    questionType: "MCQ",
    officialTopic: "The Particulate Nature of Matter",
    subtopic: "Atomic structure and ions",
    commandWord: "Which",
    assessmentObjective: "AO2",
    marks: 1,
    difficulty: "Medium",
    sourceYear: 2023,
    sourceLabel: "Queenstown Secondary School Prelim 2023",
    text: `A particle contains 31 protons, 40 neutrons and 28 electrons.

Which symbol is correct for this particle?

A  ⁷¹₃₁Ni²⁺
B  ⁷¹₃₁Ni³⁺
C  ⁷¹₃₁Ga²⁺
D  ⁷¹₃₁Ga³⁺`,
    answerScheme: "",
    isDataBased: false,
    isPractical: false,
    reviewStatus: "approved",
    syllabusConfidence: "high",
    sourceImage: "/screenshots/qss_2023_prelim/questions/q006.png",
    tags: ["atomic-structure", "ions", "protons-neutrons-electrons", "isotopes", "mass-number"],
  },
  {
    id: "qss_2023_prelim_6092_p1_q007",
    syllabusCode: "6092",
    paper: "Paper 1",
    questionType: "MCQ",
    officialTopic: "Chemical Bonding and Structure",
    subtopic: "Types of bonding",
    commandWord: "Which",
    assessmentObjective: "AO2",
    marks: 1,
    difficulty: "Hard",
    sourceYear: 2023,
    sourceLabel: "Queenstown Secondary School Prelim 2023",
    text: `X, Y and Z are 3 different elements in the Periodic Table. The 'dot-and-cross' diagram of the compound formed between X, Y and Z is shown below. Only the valence electrons are shown.

[See diagram: ionic compound showing Y⁺ cation (with electron shells) and [X-Z-X]⁻ anion where X and Z are joined by covalent bonds. Dot-and-cross representation of valence electrons only.]

Which statements are correct?

1  Element Y could be lithium.
2  Element X belongs to Group VII of the Periodic Table.
3  Elements X and Z are bonded together by covalent bonds.
4  There are more electrons than protons in ZX₂⁻.

A  1 and 2 only
B  3 and 4 only
C  1, 3 and 4
D  2, 3 and 4`,
    answerScheme: "",
    isDataBased: false,
    isPractical: false,
    reviewStatus: "approved",
    syllabusConfidence: "high",
    sourceImage: "/screenshots/qss_2023_prelim/questions/q007.png",
    tags: ["chemical-bonding", "ionic-bonding", "covalent-bonding", "dot-and-cross", "Group-VII"],
  },
  {
    id: "qss_2023_prelim_6092_p1_q008",
    syllabusCode: "6092",
    paper: "Paper 1",
    questionType: "MCQ",
    officialTopic: "Chemical Bonding and Structure",
    subtopic: "Covalent bonding",
    commandWord: "How many",
    assessmentObjective: "AO1",
    marks: 1,
    difficulty: "Easy",
    sourceYear: 2023,
    sourceLabel: "Queenstown Secondary School Prelim 2023",
    text: `How many electrons in total are shared between the atoms in a molecule of ethene, C₂H₄, and in a molecule of water, H₂O?

       ethene    water
A        6          2
B       10          4
C       12          4
D       14          8`,
    answerScheme: "",
    isDataBased: false,
    isPractical: false,
    reviewStatus: "approved",
    syllabusConfidence: "high",
    sourceImage: "/screenshots/qss_2023_prelim/questions/q008.png",
    tags: ["covalent-bonding", "ethene", "water", "shared-electrons", "double-bond"],
  },
  {
    id: "qss_2023_prelim_6092_p1_q009",
    syllabusCode: "6092",
    paper: "Paper 1",
    questionType: "MCQ",
    officialTopic: "Chemical Bonding and Structure",
    subtopic: "Structure and properties",
    commandWord: "Which",
    assessmentObjective: "AO1",
    marks: 1,
    difficulty: "Medium",
    sourceYear: 2023,
    sourceLabel: "Queenstown Secondary School Prelim 2023",
    text: `Diamond, graphite, iodine and silicon dioxide all contain covalent bonds. Which statement is correct?

A  Diamond has atoms that are arranged in a tetrahedral structure.
B  Graphite is used as a lubricant because each layer in its structure is held to the next layer by strong covalent bonds.
C  Iodine changes from solid to gas upon gentle warming as its covalent bonds are weak.
D  Silicon dioxide and graphite both can conduct electricity due to the presence of mobile electrons.`,
    answerScheme: "",
    isDataBased: false,
    isPractical: false,
    reviewStatus: "approved",
    syllabusConfidence: "high",
    sourceImage: "/screenshots/qss_2023_prelim/questions/q009.png",
    tags: ["giant-structure", "molecular-structure", "diamond", "graphite", "silicon-dioxide", "iodine", "electrical-conductivity"],
  },
  {
    id: "qss_2023_prelim_6092_p1_q010",
    syllabusCode: "6092",
    paper: "Paper 1",
    questionType: "MCQ",
    officialTopic: "Chemical Bonding and Structure",
    subtopic: "Metallic bonding",
    commandWord: "Which",
    assessmentObjective: "AO1",
    marks: 1,
    difficulty: "Easy",
    sourceYear: 2023,
    sourceLabel: "Queenstown Secondary School Prelim 2023",
    text: `Which statements about metals are correct?

1  Metals are not malleable.
2  Metals conduct thermal energy.
3  Metals have a lattice of positive ions in a 'sea of electrons'.

A  1 and 2 only
B  1 and 3 only
C  2 and 3 only
D  1, 2 and 3`,
    answerScheme: "",
    isDataBased: false,
    isPractical: false,
    reviewStatus: "approved",
    syllabusConfidence: "high",
    sourceImage: "/screenshots/qss_2023_prelim/questions/q010.png",
    tags: ["metallic-bonding", "properties-of-metals", "sea-of-electrons", "malleability", "thermal-conductivity"],
  },
  {
    id: "qss_2023_prelim_6092_p1_q011",
    syllabusCode: "6092",
    paper: "Paper 1",
    questionType: "MCQ",
    officialTopic: "Chemical Calculations",
    subtopic: "Empirical formula",
    commandWord: "What",
    assessmentObjective: "AO2",
    marks: 1,
    difficulty: "Medium",
    sourceYear: 2023,
    sourceLabel: "Queenstown Secondary School Prelim 2023",
    text: `Vanillin is the main chemical compound present in vanilla bean extract. It contains 63.16% of carbon, 5.26% of hydrogen and 31.58% of oxygen by mass. What is the empirical formula of vanillin?

A  C₂H₂O
B  C₄H₄O₂
C  C₄H₅O₃
D  C₄H₄O₅`,
    answerScheme: "",
    isDataBased: false,
    isPractical: false,
    reviewStatus: "approved",
    syllabusConfidence: "high",
    sourceImage: "/screenshots/qss_2023_prelim/questions/q011.png",
    tags: ["empirical-formula", "percentage-composition", "vanillin", "mole-concept"],
  },
  {
    id: "qss_2023_prelim_6092_p1_q012",
    syllabusCode: "6092",
    paper: "Paper 1",
    questionType: "MCQ",
    officialTopic: "Chemical Calculations",
    subtopic: "Mole calculations",
    commandWord: "What",
    assessmentObjective: "AO2",
    marks: 1,
    difficulty: "Hard",
    sourceYear: 2023,
    sourceLabel: "Queenstown Secondary School Prelim 2023",
    text: `The airbag in a car contains sodium azide, NaN₃, and potassium nitrate, KNO₃. During a car accident, two reactions take place, producing nitrogen gas which allows the airbag to inflate rapidly.

2NaN₃ → 2Na + 3N₂
10Na + 2KNO₃ → K₂O + 5Na₂O + N₂

What is the volume of nitrogen produced when 13.0 g of sodium azide decomposes in the airbag?
[Molar volume of gas = 24 dm³/mol at r.t.p.]

A  0.32 dm³
B  0.48 dm³
C  7.68 dm³
D  9.60 dm³`,
    answerScheme: "",
    isDataBased: false,
    isPractical: false,
    reviewStatus: "approved",
    syllabusConfidence: "high",
    sourceImage: "/screenshots/qss_2023_prelim/questions/q012.png",
    tags: ["mole-calculations", "stoichiometry", "sodium-azide", "nitrogen-gas", "airbag", "molar-volume"],
  },
  {
    id: "qss_2023_prelim_6092_p1_q013",
    syllabusCode: "6092",
    paper: "Paper 1",
    questionType: "MCQ",
    officialTopic: "Chemical Calculations",
    subtopic: "Titration calculations",
    commandWord: "What",
    assessmentObjective: "AO2",
    marks: 1,
    difficulty: "Hard",
    sourceYear: 2023,
    sourceLabel: "Queenstown Secondary School Prelim 2023",
    text: `A washing powder contains sodium hydrogencarbonate, NaHCO₃, as one of its ingredients. In a titration, a solution containing 1.00 g of the washing powder was found to react completely with 7.15 cm³ of 0.100 mol/dm³ of dilute hydrochloric acid.

NaHCO₃ + HCl → NaCl + H₂O + CO₂

Assuming that sodium hydrogen carbonate is the only ingredient that reacts with the acid, what is the percentage by mass of sodium hydrogencarbonate in the washing powder?

A  3.0%
B  6.0%
C  12.0%
D  24.0%`,
    answerScheme: "",
    isDataBased: false,
    isPractical: false,
    reviewStatus: "approved",
    syllabusConfidence: "high",
    sourceImage: "/screenshots/qss_2023_prelim/questions/q013.png",
    tags: ["titration", "percentage-composition", "sodium-hydrogencarbonate", "mole-calculations", "hydrochloric-acid"],
  },
  {
    id: "qss_2023_prelim_6092_p1_q014",
    syllabusCode: "6092",
    paper: "Paper 1",
    questionType: "MCQ",
    officialTopic: "Redox Chemistry",
    subtopic: "Electrolysis",
    commandWord: "At which",
    assessmentObjective: "AO2",
    marks: 1,
    difficulty: "Medium",
    sourceYear: 2023,
    sourceLabel: "Queenstown Secondary School Prelim 2023",
    text: `An electrolytic circuit is set up using inert electrodes P, Q, R and S.

[See diagram: two electrolytic cells in series — left cell contains molten lead(II) bromide with electrodes P and Q; right cell contains concentrated hydrochloric acid with electrodes R and S.]

At which of the electrodes is a Group VII element produced?

A  P only
B  P and R
C  Q only
D  Q and S`,
    answerScheme: "",
    isDataBased: false,
    isPractical: false,
    reviewStatus: "approved",
    syllabusConfidence: "high",
    sourceImage: "/screenshots/qss_2023_prelim/questions/q014.png",
    tags: ["electrolysis", "inert-electrodes", "lead-bromide", "hydrochloric-acid", "Group-VII", "halogens"],
  },
  {
    id: "qss_2023_prelim_6092_p1_q015",
    syllabusCode: "6092",
    paper: "Paper 1",
    questionType: "MCQ",
    officialTopic: "Redox Chemistry",
    subtopic: "Electrochemical cells",
    commandWord: "Which",
    assessmentObjective: "AO2",
    marks: 1,
    difficulty: "Hard",
    sourceYear: 2023,
    sourceLabel: "Queenstown Secondary School Prelim 2023",
    text: `Three electrochemical cells are set up using zinc metal and three other unknown metals P, Q and R as electrodes. The results of the experiment are shown in the table below.

metal tested | voltmeter reading / V | direction of electron flow
P            | 0.200                 | zinc to metal P
Q            | 0.500                 | metal Q to zinc
R            | 1.100                 | zinc to metal R

Which of the following shows the three unknown metals in increasing order of reactivity?

A  P, Q, R
B  Q, P, R
C  R, P, Q
D  R, Q, P`,
    answerScheme: "",
    isDataBased: true,
    isPractical: false,
    reviewStatus: "approved",
    syllabusConfidence: "high",
    sourceImage: "/screenshots/qss_2023_prelim/questions/q015.png",
    tags: ["electrochemical-cells", "reactivity-series", "voltmeter", "zinc", "electron-flow"],
  },
  {
    id: "qss_2023_prelim_6092_p1_q016",
    syllabusCode: "6092",
    paper: "Paper 1",
    questionType: "MCQ",
    officialTopic: "Chemical Energetics",
    subtopic: "Energy profile diagrams",
    commandWord: "What",
    assessmentObjective: "AO2",
    marks: 1,
    difficulty: "Medium",
    sourceYear: 2023,
    sourceLabel: "Queenstown Secondary School Prelim 2023",
    text: `The energy profile diagram for both the catalysed and uncatalysed reactions in the production of ammonia is shown below.

[See diagram: energy profile (energy/kJ vs progress of reaction) showing two peaks — a higher uncatalysed peak (A) and a lower catalysed peak (B/C), with reactants N₂ + 3H₂ at a higher energy level than products 2NH₃. Points A, B, C, D are labelled on the diagram.]

What is the activation energy for the decomposition of ammonia in the presence of a catalyst?

A  A
B  A − B
C  C − B
D  D`,
    answerScheme: "",
    isDataBased: true,
    isPractical: false,
    reviewStatus: "approved",
    syllabusConfidence: "high",
    sourceImage: "/screenshots/qss_2023_prelim/questions/q016.png",
    tags: ["energy-profile", "activation-energy", "catalyst", "ammonia", "Haber-process", "exothermic"],
  },
  {
    id: "qss_2023_prelim_6092_p1_q017",
    syllabusCode: "6092",
    paper: "Paper 1",
    questionType: "MCQ",
    officialTopic: "Chemical Energetics",
    subtopic: "Bond energies",
    commandWord: "Calculate",
    assessmentObjective: "AO2",
    marks: 1,
    difficulty: "Hard",
    sourceYear: 2023,
    sourceLabel: "Queenstown Secondary School Prelim 2023",
    text: `A molecule of ethyne undergoes addition of hydrogen to form ethane.

H−C≡C−H  +  2H−H  →  H−C−C−H (with 3 H atoms on each carbon)

Given the following information of the bond energies, calculate the enthalpy change of the reaction.

bond        | C−H  | C−C  | C=C  | C≡C  | H−H
bond energy | 413  | 347  | 612  | 839  | 432
(kJ/mol)

A  −296 kJ/mol
B  −176 kJ/mol
C  +176 kJ/mol
D  +296 kJ/mol`,
    answerScheme: "",
    isDataBased: true,
    isPractical: false,
    reviewStatus: "approved",
    syllabusConfidence: "high",
    sourceImage: "/screenshots/qss_2023_prelim/questions/q017.png",
    tags: ["bond-energies", "enthalpy-change", "ethyne", "ethane", "addition-reaction", "exothermic"],
  },
  {
    id: "qss_2023_prelim_6092_p1_q018",
    syllabusCode: "6092",
    paper: "Paper 1",
    questionType: "MCQ",
    officialTopic: "Chemical Energetics",
    subtopic: "Fuel cells",
    commandWord: "Which",
    assessmentObjective: "AO1",
    marks: 1,
    difficulty: "Easy",
    sourceYear: 2023,
    sourceLabel: "Queenstown Secondary School Prelim 2023",
    text: `Which statement about the hydrogen-oxygen fuel cell is incorrect?

A  It produces electricity, water and heat.
B  Hydrogen and oxygen are used as the main reactants.
C  The net reaction produces water and hydrogen gas only.
D  It is made up of an electrolyte between the anode and cathode.`,
    answerScheme: "",
    isDataBased: false,
    isPractical: false,
    reviewStatus: "approved",
    syllabusConfidence: "high",
    sourceImage: "/screenshots/qss_2023_prelim/questions/q018.png",
    tags: ["fuel-cell", "hydrogen-oxygen", "electrolyte", "anode-cathode", "electricity"],
  },
  {
    id: "qss_2023_prelim_6092_p1_q019",
    syllabusCode: "6092",
    paper: "Paper 1",
    questionType: "MCQ",
    officialTopic: "Rate of Reactions",
    subtopic: "Rate of reaction graphs",
    commandWord: "What",
    assessmentObjective: "AO2",
    marks: 1,
    difficulty: "Medium",
    sourceYear: 2023,
    sourceLabel: "Queenstown Secondary School Prelim 2023",
    text: `A given mass of calcium carbonate is reacted with excess nitric acid. As the reaction proceeds, the volume of carbon dioxide is measured, at room temperature and pressure, in a graduated syringe. The results are shown in the graph.

[See diagram: graph of volume of CO₂/cm³ (y-axis, 0–100) vs time/min (x-axis, 0–6). Curve rises steeply from 0, flattening to ~90 cm³ at approximately 4.5 min.]

CaCO₃(s) + 2HNO₃(aq) → Ca(NO₃)₂(aq) + CO₂(g) + H₂O(l)

What can be concluded from the information?

1  The number of moles of calcium carbonate used was 0.375.
2  During the reaction, the rate steadily decreased.
3  The reaction stopped at 4.5 min.

A  1, 2 and 3
B  1 and 2
C  1 and 3
D  2 only`,
    answerScheme: "",
    isDataBased: true,
    isPractical: false,
    reviewStatus: "approved",
    syllabusConfidence: "high",
    sourceImage: "/screenshots/qss_2023_prelim/questions/q019.png",
    tags: ["rate-of-reaction", "calcium-carbonate", "nitric-acid", "graph-analysis", "mole-calculations"],
  },
  {
    id: "qss_2023_prelim_6092_p1_q020",
    syllabusCode: "6092",
    paper: "Paper 1",
    questionType: "MCQ",
    officialTopic: "Redox Chemistry",
    subtopic: "Oxidation numbers",
    commandWord: "In which",
    assessmentObjective: "AO2",
    marks: 1,
    difficulty: "Hard",
    sourceYear: 2023,
    sourceLabel: "Queenstown Secondary School Prelim 2023",
    text: `Ammonia manufactured from the Haber Process can be converted into nitric acid. The following equations show the different reactions that can take place during this conversion. In which reaction does nitrogen have the greatest change in oxidation number?

A  4NH₃ + 5O₂ → 4NO + 6H₂O
B  3NO₂ + H₂O → 2HNO₃ + NO
C  2NO + O₂ → 2NO₂
D  4NH₃ + 6NO → 5N₂ + 6H₂O`,
    answerScheme: "",
    isDataBased: false,
    isPractical: false,
    reviewStatus: "approved",
    syllabusConfidence: "high",
    sourceImage: "/screenshots/qss_2023_prelim/questions/q020.png",
    tags: ["oxidation-numbers", "oxidation-states", "nitrogen", "Haber-process", "Ostwald-process", "ammonia"],
  },
  {
    id: "qss_2023_prelim_6092_p1_q021",
    syllabusCode: "6092",
    paper: "Paper 1",
    questionType: "MCQ",
    officialTopic: "Acid-Base Chemistry",
    subtopic: "Properties of alkalis",
    commandWord: "Which",
    assessmentObjective: "AO1",
    marks: 1,
    difficulty: "Medium",
    sourceYear: 2023,
    sourceLabel: "Queenstown Secondary School Prelim 2023",
    text: `Solution T has the following properties.
• It reacts with magnesium forming a gas.
• It reacts with ammonium carbonate forming a gas.

Which statement about solution T is correct?

A  It contains more OH⁻ ions than H⁺ ions.
B  It has pH 9.
C  Its reaction with ammonium carbonate produces ammonia.
D  It reacts with aqueous ammonia.`,
    answerScheme: "",
    isDataBased: false,
    isPractical: false,
    reviewStatus: "approved",
    syllabusConfidence: "high",
    sourceImage: "/screenshots/qss_2023_prelim/questions/q021.png",
    tags: ["acids-bases", "alkaline-solution", "hydroxide-ions", "ammonium-carbonate", "magnesium"],
  },
  {
    id: "qss_2023_prelim_6092_p1_q022",
    syllabusCode: "6092",
    paper: "Paper 1",
    questionType: "MCQ",
    officialTopic: "Acid-Base Chemistry",
    subtopic: "Amphoteric hydroxides",
    commandWord: "In which",
    assessmentObjective: "AO1",
    marks: 1,
    difficulty: "Medium",
    sourceYear: 2023,
    sourceLabel: "Queenstown Secondary School Prelim 2023",
    text: `In which of the following reactions is zinc hydroxide not behaving as a base?

A  Zn(OH)₂ + 2NaOH → Na₂Zn(OH)₄
B  Zn(OH)₂ + 2HCl → ZnCl₂ + 2H₂O
C  Zn(OH)₂ + (NH₄)₂SO₄ → ZnSO₄ + 2NH₃ + 2H₂O
D  3Zn(OH)₂ + 2H₃PO₄ → Zn₃(PO₄)₂ + 6H₂O`,
    answerScheme: "",
    isDataBased: false,
    isPractical: false,
    reviewStatus: "approved",
    syllabusConfidence: "high",
    sourceImage: "/screenshots/qss_2023_prelim/questions/q022.png",
    tags: ["amphoteric", "zinc-hydroxide", "base", "Bronsted-Lowry", "proton-acceptor"],
  },
  {
    id: "qss_2023_prelim_6092_p1_q023",
    syllabusCode: "6092",
    paper: "Paper 1",
    questionType: "MCQ",
    officialTopic: "Acid-Base Chemistry",
    subtopic: "Preparation of salts",
    commandWord: "Which",
    assessmentObjective: "AO2",
    marks: 1,
    difficulty: "Medium",
    sourceYear: 2023,
    sourceLabel: "Queenstown Secondary School Prelim 2023",
    text: `Which of the following salts can be prepared using the methods shown?

method: prepared by adding acid to an insoluble carbonate | prepared by mixing two aqueous salt solutions

A  lead(II) sulfate     |  silver chloride
B  magnesium nitrate    |  barium sulfate
C  sodium chloride      |  lead(II) chloride
D  zinc nitrate         |  potassium sulfate`,
    answerScheme: "",
    isDataBased: true,
    isPractical: false,
    reviewStatus: "approved",
    syllabusConfidence: "high",
    sourceImage: "/screenshots/qss_2023_prelim/questions/q023.png",
    tags: ["salts", "preparation-of-salts", "insoluble-carbonate", "precipitation", "solubility"],
  },
  {
    id: "qss_2023_prelim_6092_p1_q024",
    syllabusCode: "6092",
    paper: "Paper 1",
    questionType: "MCQ",
    officialTopic: "Rate of Reactions",
    subtopic: "Industrial chemistry — Haber process",
    commandWord: "Which",
    assessmentObjective: "AO1",
    marks: 1,
    difficulty: "Easy",
    sourceYear: 2023,
    sourceLabel: "Queenstown Secondary School Prelim 2023",
    text: `Which of the statements are true of the Haber process?

1  Ammonia formed is condensed and obtained as a liquid.
2  Hydrogen gas is obtained from cracking of crude oil.
3  Iron catalyst is used to increase the yield of ammonia.
4  Nitrogen gas is oxidised to form ammonia.

A  1 and 2 only
B  1 and 3 only
C  2 and 3 only
D  3 and 4 only`,
    answerScheme: "",
    isDataBased: false,
    isPractical: false,
    reviewStatus: "approved",
    syllabusConfidence: "high",
    sourceImage: "/screenshots/qss_2023_prelim/questions/q024.png",
    tags: ["Haber-process", "ammonia", "industrial-chemistry", "iron-catalyst", "nitrogen-fixation"],
  },
  {
    id: "qss_2023_prelim_6092_p1_q025",
    syllabusCode: "6092",
    paper: "Paper 1",
    questionType: "MCQ",
    officialTopic: "Patterns in the Periodic Table",
    subtopic: "Periodic trends",
    commandWord: "Which",
    assessmentObjective: "AO2",
    marks: 1,
    difficulty: "Medium",
    sourceYear: 2023,
    sourceLabel: "Queenstown Secondary School Prelim 2023",
    text: `P and Q are two elements located in Period 3 of the Periodic Table. Which statement best proves that element Q is located on the right side of element P?

A  P is less reactive than Q.
B  P loses electrons more easily than Q.
C  P forms an acidic oxide while Q forms a basic oxide.
D  P has six valence electrons while Q has three valence electrons.`,
    answerScheme: "",
    isDataBased: false,
    isPractical: false,
    reviewStatus: "approved",
    syllabusConfidence: "high",
    sourceImage: "/screenshots/qss_2023_prelim/questions/q025.png",
    tags: ["periodic-table", "Period-3", "periodic-trends", "valence-electrons", "metallic-character"],
  },
  {
    id: "qss_2023_prelim_6092_p1_q026",
    syllabusCode: "6092",
    paper: "Paper 1",
    questionType: "MCQ",
    officialTopic: "Patterns in the Periodic Table",
    subtopic: "Periodic table structure",
    commandWord: "Which",
    assessmentObjective: "AO2",
    marks: 1,
    difficulty: "Medium",
    sourceYear: 2023,
    sourceLabel: "Queenstown Secondary School Prelim 2023",
    text: `Part of the Periodic Table is shown below.

[See diagram: partial periodic table with elements R (Group I/II region), S (bottom left), T (top right), and U (bottom right) positioned in their respective groups and periods.]

Which statement is correct?

A  R has a lower melting point than S.
B  S has a higher reactivity than R.
C  T has a darker colour than U.
D  T has a lower reactivity than U.`,
    answerScheme: "",
    isDataBased: false,
    isPractical: false,
    reviewStatus: "approved",
    syllabusConfidence: "high",
    sourceImage: "/screenshots/qss_2023_prelim/questions/q026.png",
    tags: ["periodic-table", "melting-point", "reactivity", "halogens", "alkali-metals", "diagram"],
  },
  {
    id: "qss_2023_prelim_6092_p1_q027",
    syllabusCode: "6092",
    paper: "Paper 1",
    questionType: "MCQ",
    officialTopic: "Patterns in the Periodic Table",
    subtopic: "Transition metals",
    commandWord: "Which",
    assessmentObjective: "AO1",
    marks: 1,
    difficulty: "Medium",
    sourceYear: 2023,
    sourceLabel: "Queenstown Secondary School Prelim 2023",
    text: `Some properties of silver and its compounds are stated below.

1  Silver can form compounds like Ag₂O and AgF₂.
2  Silver has a high melting point of 962°C.
3  Silver is an important catalyst in the production of formaldehyde.
4  Silver reacts with chlorine to form a white crystalline solid of silver chloride.

Which of the above statements do not agree with the typical properties of transition metals?

A  2 only
B  4 only
C  1 and 3
D  2 and 4`,
    answerScheme: "",
    isDataBased: false,
    isPractical: false,
    reviewStatus: "approved",
    syllabusConfidence: "high",
    sourceImage: "/screenshots/qss_2023_prelim/questions/q027.png",
    tags: ["transition-metals", "silver", "properties-of-transition-metals", "catalyst", "variable-oxidation-state"],
  },
  {
    id: "qss_2023_prelim_6092_p1_q028",
    syllabusCode: "6092",
    paper: "Paper 1",
    questionType: "MCQ",
    officialTopic: "Patterns in the Periodic Table",
    subtopic: "Reactivity series",
    commandWord: "Which",
    assessmentObjective: "AO2",
    marks: 1,
    difficulty: "Hard",
    sourceYear: 2023,
    sourceLabel: "Queenstown Secondary School Prelim 2023",
    text: `The carbonates of three metals, X, Y and Z, are heated and the results are shown.

metal carbonate | result
X               | • carbon dioxide given off
                | • the colour of solid remained the same
Y               | • carbon dioxide given off
                | • the green solid turned black
Z               | • no visible change

Based on the results above, the following statements were made:
1  Metal X is more reactive than metal Z.
2  Metal Y is a transition metal.
3  If dilute nitric acid is added to all three carbonates, carbon dioxide is given off from the carbonates of X and Y but not from the carbonate of Z.

Which statement(s) is/are true?

A  1 only
B  2 only
C  1 and 2 only
D  1, 2 and 3`,
    answerScheme: "",
    isDataBased: true,
    isPractical: false,
    reviewStatus: "approved",
    syllabusConfidence: "high",
    sourceImage: "/screenshots/qss_2023_prelim/questions/q028.png",
    tags: ["thermal-decomposition", "carbonates", "reactivity-series", "transition-metals", "copper-carbonate"],
  },
  {
    id: "qss_2023_prelim_6092_p1_q029",
    syllabusCode: "6092",
    paper: "Paper 1",
    questionType: "MCQ",
    officialTopic: "Patterns in the Periodic Table",
    subtopic: "Extraction of metals",
    commandWord: "Which",
    assessmentObjective: "AO2",
    marks: 1,
    difficulty: "Hard",
    sourceYear: 2023,
    sourceLabel: "Queenstown Secondary School Prelim 2023",
    text: `Read the following statements about metals X, Y and Z.
• When heated strongly, metal X turns red hot and reacts slowly with steam.
• Metal Y reacts slowly with dilute sulfuric acid and stops reacting halfway through the reaction.
• Metal Z reacts very slowly with cold water but reacts violently with steam.

Which method of metal extraction from its ores is most likely to be used?

        electrolysis of molten ore | reduction by carbon
A  Z                               | X and Y
B  Y                               | X and Z
C  X and Z                        | Y
D  Y and Z                         | X`,
    answerScheme: "",
    isDataBased: true,
    isPractical: false,
    reviewStatus: "approved",
    syllabusConfidence: "high",
    sourceImage: "/screenshots/qss_2023_prelim/questions/q029.png",
    tags: ["extraction-of-metals", "electrolysis", "carbon-reduction", "reactivity-series", "steam-reaction"],
  },
  {
    id: "qss_2023_prelim_6092_p1_q030",
    syllabusCode: "6092",
    paper: "Paper 1",
    questionType: "MCQ",
    officialTopic: "Patterns in the Periodic Table",
    subtopic: "Extraction of iron",
    commandWord: "Which",
    assessmentObjective: "AO1",
    marks: 1,
    difficulty: "Easy",
    sourceYear: 2023,
    sourceLabel: "Queenstown Secondary School Prelim 2023",
    text: `Which statements about the extraction of iron from haematite is correct?

A  At the bottom of the furnace, molten slag floats on top of molten iron.
B  At the top of the furnace, hot waste gases such as oxygen escape.
C  Carbon monoxide acts as the oxidising agent in the process.
D  The other raw materials used are coke and quicklime.`,
    answerScheme: "",
    isDataBased: false,
    isPractical: false,
    reviewStatus: "approved",
    syllabusConfidence: "high",
    sourceImage: "/screenshots/qss_2023_prelim/questions/q030.png",
    tags: ["iron", "haematite", "blast-furnace", "slag", "coke", "limestone", "carbon-monoxide"],
  },
  {
    id: "qss_2023_prelim_6092_p1_q031",
    syllabusCode: "6092",
    paper: "Paper 1",
    questionType: "MCQ",
    officialTopic: "Patterns in the Periodic Table",
    subtopic: "Alloys and corrosion prevention",
    commandWord: "How",
    assessmentObjective: "AO1",
    marks: 1,
    difficulty: "Easy",
    sourceYear: 2023,
    sourceLabel: "Queenstown Secondary School Prelim 2023",
    text: `Stainless steel is an alloy of iron, carbon and chromium. It does not rust easily. It is known that chromium is more difficult to extract from its ore than iron. How does chromium protect the iron in stainless steel from rusting?

A  Chromium, being reactive, forms a protective oxide layer around iron.
B  Chromium, being less reactive, reacts with water or oxygen in place of iron.
C  Chromium, being less reactive, does not react with water or oxygen easily.
D  Chromium reacts with iron to form an alloy which does not allow iron to react with air and water.`,
    answerScheme: "",
    isDataBased: false,
    isPractical: false,
    reviewStatus: "approved",
    syllabusConfidence: "high",
    sourceImage: "/screenshots/qss_2023_prelim/questions/q031.png",
    tags: ["stainless-steel", "chromium", "corrosion", "alloys", "rusting", "protective-oxide"],
  },
  {
    id: "qss_2023_prelim_6092_p1_q032",
    syllabusCode: "6092",
    paper: "Paper 1",
    questionType: "MCQ",
    officialTopic: "Maintaining Air Quality",
    subtopic: "Air pollutants from fuels",
    commandWord: "Which",
    assessmentObjective: "AO2",
    marks: 1,
    difficulty: "Medium",
    sourceYear: 2023,
    sourceLabel: "Queenstown Secondary School Prelim 2023",
    text: `Diesel and petrol are fuels used commonly in cars. The combustion of these fuels produces air pollutants. The table below shows the mass of air pollutants found in the exhaust fumes when 1 kg of each fuel is burnt under identical conditions.

air pollutant          | mass after diesel / g | mass after petrol / g
carbon monoxide        | 15                    | 300
unburnt hydrocarbons   | 20                    | 25
oxides of nitrogen     | 95                    | 40

Which of the following can be inferred from the data given above?

A  The burning of petrol contributes more towards the formation of acid rain.
B  The burning of petrol is more exothermic than that of diesel.
C  Petrol requires less oxygen for complete combustion.
D  A diesel engine operates at a higher temperature than a petrol engine.`,
    answerScheme: "",
    isDataBased: true,
    isPractical: false,
    reviewStatus: "approved",
    syllabusConfidence: "high",
    sourceImage: "/screenshots/qss_2023_prelim/questions/q032.png",
    tags: ["air-pollution", "diesel", "petrol", "carbon-monoxide", "nitrogen-oxides", "hydrocarbons", "acid-rain"],
  },
  {
    id: "qss_2023_prelim_6092_p1_q033",
    syllabusCode: "6092",
    paper: "Paper 1",
    questionType: "MCQ",
    officialTopic: "Maintaining Air Quality",
    subtopic: "Carbon cycle",
    commandWord: "What",
    assessmentObjective: "AO2",
    marks: 1,
    difficulty: "Medium",
    sourceYear: 2023,
    sourceLabel: "Queenstown Secondary School Prelim 2023",
    text: `The diagram below shows part of the carbon cycle.

[See diagram: gas W in the air → process X → plants; plants → process Y → gas W; animals → process Y → gas W; gas W flows between plants and animals via process Y.]

What is the correct combination of the identity of gas W and processes X and Y?

      gas W          | process X       | process Y
A  carbon dioxide    | photosynthesis  | respiration
B  carbon dioxide    | respiration     | photosynthesis
C  carbon monoxide   | photosynthesis  | respiration
D  carbon monoxide   | respiration     | photosynthesis`,
    answerScheme: "",
    isDataBased: true,
    isPractical: false,
    reviewStatus: "approved",
    syllabusConfidence: "high",
    sourceImage: "/screenshots/qss_2023_prelim/questions/q033.png",
    tags: ["carbon-cycle", "photosynthesis", "respiration", "carbon-dioxide", "diagram"],
  },
  {
    id: "qss_2023_prelim_6092_p1_q034",
    syllabusCode: "6092",
    paper: "Paper 1",
    questionType: "MCQ",
    officialTopic: "Organic Chemistry",
    subtopic: "Petroleum and fractional distillation",
    commandWord: "Which",
    assessmentObjective: "AO1",
    marks: 1,
    difficulty: "Easy",
    sourceYear: 2023,
    sourceLabel: "Queenstown Secondary School Prelim 2023",
    text: `Which statement about the fractional distillation of petroleum is incorrect?

A  The hydrocarbons collected in each fraction have similar boiling points.
B  The fractions collected at the top are the most flammable.
C  The fractions collected at the bottom are the most viscous.
D  The fractions are separated according to their melting points.`,
    answerScheme: "",
    isDataBased: false,
    isPractical: false,
    reviewStatus: "approved",
    syllabusConfidence: "high",
    sourceImage: "/screenshots/qss_2023_prelim/questions/q034.png",
    tags: ["petroleum", "fractional-distillation", "boiling-point", "flammability", "viscosity", "hydrocarbons"],
  },
  {
    id: "qss_2023_prelim_6092_p1_q035",
    syllabusCode: "6092",
    paper: "Paper 1",
    questionType: "MCQ",
    officialTopic: "Organic Chemistry",
    subtopic: "Alkanes and isomerism",
    commandWord: "Which",
    assessmentObjective: "AO2",
    marks: 1,
    difficulty: "Medium",
    sourceYear: 2023,
    sourceLabel: "Queenstown Secondary School Prelim 2023",
    text: `Alkanes are saturated compounds containing carbon and hydrogen only. Structures 1, 2, 3 and 4 are saturated hydrocarbons.

[See diagram: 4 structural formulas shown:
Structure 1 — pentane (straight chain C5H12)
Structure 2 — 2-methylbutane (branched C5H12)
Structure 3 — cyclopentane (ring C5H10)
Structure 4 — 2,2-dimethylpropane (highly branched C5H12)]

Which pair of structures are isomers?

A  1 and 2
B  1 and 4
C  2 and 3
D  2 and 4`,
    answerScheme: "",
    isDataBased: false,
    isPractical: false,
    reviewStatus: "approved",
    syllabusConfidence: "high",
    sourceImage: "/screenshots/qss_2023_prelim/questions/q035.png",
    tags: ["alkanes", "isomers", "structural-isomers", "diagram", "cycloalkanes", "pentane"],
  },
  {
    id: "qss_2023_prelim_6092_p1_q036",
    syllabusCode: "6092",
    paper: "Paper 1",
    questionType: "MCQ",
    officialTopic: "Organic Chemistry",
    subtopic: "Alkenes",
    commandWord: "How many",
    assessmentObjective: "AO2",
    marks: 1,
    difficulty: "Hard",
    sourceYear: 2023,
    sourceLabel: "Queenstown Secondary School Prelim 2023",
    text: `0.025 mole of a vegetable oil was found to increase its mass by 25.4 g when shaken with an excess of iodine solution. How many C=C bonds are there in one molecule of the vegetable oil?
[Relative atomic masses: I = 127]

A  1
B  2
C  3
D  4`,
    answerScheme: "",
    isDataBased: false,
    isPractical: false,
    reviewStatus: "approved",
    syllabusConfidence: "high",
    sourceImage: "/screenshots/qss_2023_prelim/questions/q036.png",
    tags: ["alkenes", "C=C-bonds", "vegetable-oil", "iodine-test", "moles", "unsaturation"],
  },
  {
    id: "qss_2023_prelim_6092_p1_q037",
    syllabusCode: "6092",
    paper: "Paper 1",
    questionType: "MCQ",
    officialTopic: "Organic Chemistry",
    subtopic: "Alcohols",
    commandWord: "Which",
    assessmentObjective: "AO1",
    marks: 1,
    difficulty: "Medium",
    sourceYear: 2023,
    sourceLabel: "Queenstown Secondary School Prelim 2023",
    text: `Which statements about alcohols are correct?

1  Alcohols decolourise aqueous acidified potassium manganate(VII).
2  Alcohols contain the hydroxide ion, OH⁻.
3  Ethanol can be formed from ethene using a reaction catalysed by yeast.
4  Propanol can be oxidised to propanoic acid.

A  1 and 2
B  1 and 4
C  2 and 3
D  3 and 4`,
    answerScheme: "",
    isDataBased: false,
    isPractical: false,
    reviewStatus: "approved",
    syllabusConfidence: "high",
    sourceImage: "/screenshots/qss_2023_prelim/questions/q037.png",
    tags: ["alcohols", "decolourise", "hydroxyl-group", "fermentation", "oxidation", "potassium-manganate"],
  },
  {
    id: "qss_2023_prelim_6092_p1_q038",
    syllabusCode: "6092",
    paper: "Paper 1",
    questionType: "MCQ",
    officialTopic: "Organic Chemistry",
    subtopic: "Esters",
    commandWord: "What",
    assessmentObjective: "AO2",
    marks: 1,
    difficulty: "Hard",
    sourceYear: 2023,
    sourceLabel: "Queenstown Secondary School Prelim 2023",
    text: `A carboxylic acid of molecular formula C₃H₆O₂ reacts with an alcohol of molecular formula C₂H₆O to form an ester. What could be the formula of the ester formed?

[See diagram: four structural formulas A–D showing different ester linkages (–C(=O)–O–) with varying carbon chain lengths on each side of the ester bond. Options differ in the arrangement of the C₃ acid and C₂ alcohol components.]

A  CH₃CH₂C(=O)OCH₂CH₂CH₃
B  CH₃CH₂C(=O)OCH₂CH₃
C  CH₃CH₂CH₂C(=O)OCH₂CH₂CH₃
D  CH₃CH₂CH₂C(=O)OCH₂CH₃`,
    answerScheme: "",
    isDataBased: false,
    isPractical: false,
    reviewStatus: "approved",
    syllabusConfidence: "high",
    sourceImage: "/screenshots/qss_2023_prelim/questions/q038.png",
    tags: ["esters", "esterification", "carboxylic-acid", "alcohol", "structural-formula", "functional-group"],
  },
  {
    id: "qss_2023_prelim_6092_p1_q039",
    syllabusCode: "6092",
    paper: "Paper 1",
    questionType: "MCQ",
    officialTopic: "Organic Chemistry",
    subtopic: "Polymers",
    commandWord: "Which",
    assessmentObjective: "AO2",
    marks: 1,
    difficulty: "Hard",
    sourceYear: 2023,
    sourceLabel: "Queenstown Secondary School Prelim 2023",
    text: `The diagram below shows the structure of a polymer.

[See diagram: polymer chain showing alternating –CH₂– and –CH(CH₃)– units in a repeating pattern along the main carbon backbone, indicating a substituted polyalkene.]

Which of the following monomers was used to form the polymer?

[See diagram: four monomer options shown as structural formulas:
A — 1,3-butadiene (CH₂=CH–CH=CH₂)
B — but-1-ene (CH₂=CH–CH₂–CH₃... or propene-derived)
C — ethene (CH₂=CH₂)
D — but-2-ene (CH₃–CH=CH–CH₃)]`,
    answerScheme: "",
    isDataBased: false,
    isPractical: false,
    reviewStatus: "approved",
    syllabusConfidence: "high",
    sourceImage: "/screenshots/qss_2023_prelim/questions/q039.png",
    tags: ["polymers", "monomers", "addition-polymerisation", "structural-formula", "polypropene"],
  },
  {
    id: "qss_2023_prelim_6092_p1_q040",
    syllabusCode: "6092",
    paper: "Paper 1",
    questionType: "MCQ",
    officialTopic: "Organic Chemistry",
    subtopic: "Condensation polymerisation",
    commandWord: "Which",
    assessmentObjective: "AO2",
    marks: 1,
    difficulty: "Hard",
    sourceYear: 2023,
    sourceLabel: "Queenstown Secondary School Prelim 2023",
    text: `Condensation polymerisation occurs when the following monomers react:

[See diagram: two monomers — monomer 1 is a diamine (H₂N–[ring]–CH₂–[ring]–NH₂) and monomer 2 is a dicarboxylic acid (HOOC–[ring]–COOH), where [ring] represents a benzene ring or cyclic group.]

Which diagram represents the structure of the polymer formed?

[See diagram: four options (A–D) showing different polymer repeat units with varying arrangements of amide links (–C(=O)–N(H)–), ester links, or other combinations of the two monomer units.]`,
    answerScheme: "",
    isDataBased: false,
    isPractical: false,
    reviewStatus: "approved",
    syllabusConfidence: "medium",
    sourceImage: "/screenshots/qss_2023_prelim/questions/q040.png",
    tags: ["condensation-polymerisation", "nylon", "monomers", "amide-link", "diamine", "dicarboxylic-acid"],
  },
];
