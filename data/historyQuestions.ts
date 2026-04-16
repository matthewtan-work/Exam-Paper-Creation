export type HistoryLevel = "O Level" | "A Level (H1)" | "A Level (H2)";
export type HistoryQuestionType = "Structured Essay" | "Essay" | "Source-Based";

export interface HistorySource {
  label: string;       // "Source A"
  origin: string;      // brief description of provenance
  excerpt: string;     // the source text
}

export interface HistoryQuestion {
  id: string;
  topic: string;
  subtopic: string;
  level: HistoryLevel;
  period: string;
  questionType: HistoryQuestionType;
  marks: number;
  sourceYear: number;
  sourcePaper: string;
  text: string;
  answerOutline: string;
  sources?: HistorySource[];
  tags: string[];
}

export const historyQuestions: HistoryQuestion[] = [
  // ── WORLD WAR II ──────────────────────────────────────────────────────────
  {
    id: "h001",
    topic: "World War II",
    subtopic: "Causes of WWII in Europe",
    level: "O Level",
    period: "1919–1939",
    questionType: "Structured Essay",
    marks: 8,
    sourceYear: 2022,
    sourcePaper: "O Level History Paper 1",
    text: "Explain why Hitler's foreign policy was a major cause of the outbreak of World War II in Europe. [8]",
    answerOutline:
      "Hitler's aims: reverse Versailles, Lebensraum, unite all Germans. Rearmament (1935) violated Treaty of Versailles [2]. Remilitarisation of Rhineland (1936) — unchallenged [1]. Anschluss with Austria (1938) [1]. Sudetenland crisis and Munich Agreement (1938) — appeasement emboldened Hitler [2]. Invasion of Poland (1 Sep 1939) — triggered war [2].",
    tags: ["Hitler", "Versailles", "appeasement", "causes", "Europe"],
  },
  {
    id: "h002",
    topic: "World War II",
    subtopic: "Appeasement",
    level: "O Level",
    period: "1930s",
    questionType: "Source-Based",
    marks: 12,
    sourceYear: 2021,
    sourcePaper: "O Level History Paper 2",
    text: "Study the sources below and answer the questions that follow.\n\n(a) What can you infer from Source A about British attitudes towards Germany in 1938? [3]\n(b) How far does Source B support the view in Source A that appeasement was justified? [4]\n(c) 'Appeasement was a reasonable policy given the circumstances of the 1930s.' Using the sources and your own knowledge, how far do you agree? [5]",
    sources: [
      {
        label: "Source A",
        origin: "Neville Chamberlain, speech on returning from Munich, September 1938",
        excerpt:
          "We regard the agreement signed last night and the Anglo-German Naval Agreement as symbolic of the desire of our two peoples never to go to war with one another again. I believe it is peace for our time.",
      },
      {
        label: "Source B",
        origin: "Winston Churchill, speech in the House of Commons, October 1938",
        excerpt:
          "We have sustained a total and unmitigated defeat. We are in the presence of a disaster of the first magnitude. Do not suppose that this is the end. This is only the beginning of the reckoning.",
      },
    ],
    answerOutline:
      "(a) Inference: British believed peace with Germany was achievable; Chamberlain saw Hitler as a reasonable leader [2]; contextualise with fear of another war [1]. (b) Source B contradicts Source A — Churchill saw Munich as a defeat, not peace [2]; limited support — both sources reflect elite opinion but differ in assessment [2]. (c) Agree: legitimate fear of war, Britain unprepared militarily, public opposition to war [3]; Disagree: emboldened Hitler, sacrificed Czechoslovakia, gained little time [2].",
    tags: ["appeasement", "Munich", "Chamberlain", "source-based", "SBQ"],
  },
  {
    id: "h003",
    topic: "World War II",
    subtopic: "War in Asia and the Pacific",
    level: "O Level",
    period: "1937–1945",
    questionType: "Structured Essay",
    marks: 8,
    sourceYear: 2023,
    sourcePaper: "O Level History Paper 1",
    text: "Explain why Japan expanded aggressively in Asia during the 1930s and 1940s. [8]",
    answerOutline:
      "Economic need: Japan lacked raw materials (oil, rubber, iron) — expansion to secure resources [2]. Militarism and nationalism: rise of military influence in government, belief in Japanese racial superiority [2]. Western weakness: Great Depression weakened colonial powers; League of Nations ineffective after Manchuria (1931) [2]. Ideology: Greater East Asia Co-Prosperity Sphere as justification [1]. US oil embargo (1941) accelerated attack on Pearl Harbor [1].",
    tags: ["Japan", "Pacific", "militarism", "expansion", "Asia"],
  },
  {
    id: "h004",
    topic: "World War II",
    subtopic: "Fall of Singapore",
    level: "O Level",
    period: "1942",
    questionType: "Structured Essay",
    marks: 8,
    sourceYear: 2020,
    sourcePaper: "O Level History Paper 1",
    text: "Why was the British defence of Malaya and Singapore so ineffective against the Japanese invasion in 1941–1942? [8]",
    answerOutline:
      "Strategic misjudgements: guns faced seaward, attack came overland through Malaya [2]. Underestimation of Japan: British dismissed Japanese military capability [1]. Lack of air cover: RAF planes outdated, insufficient; Japanese air superiority decisive [2]. Divided command and poor communication between Allied forces [1]. Speed of Japanese advance: bicycle infantry, superior tactics overwhelmed defenders [2].",
    tags: ["Singapore", "Fall of Singapore", "British", "Japanese invasion", "1942"],
  },
  {
    id: "h005",
    topic: "World War II",
    subtopic: "Impact of Japanese Occupation",
    level: "O Level",
    period: "1942–1945",
    questionType: "Structured Essay",
    marks: 8,
    sourceYear: 2019,
    sourcePaper: "O Level History Paper 1",
    text: "How did the Japanese Occupation (1942–1945) affect the lives of people in Singapore? [8]",
    answerOutline:
      "Sook Ching massacres: systematic killing of Chinese perceived as anti-Japanese, creating lasting trauma [2]. Food shortages, inflation, black market — civilian hardship [2]. Forced labour (romusha) for infrastructure projects [1]. Suppression of culture: compulsory Japanese language, renaming of places [1]. Psychological impact: loss of faith in British protection; contributed to desire for self-determination [2].",
    tags: ["Japanese Occupation", "Sook Ching", "Singapore", "civilian", "impact"],
  },

  // ── COLD WAR ──────────────────────────────────────────────────────────────
  {
    id: "h006",
    topic: "Cold War",
    subtopic: "Origins of the Cold War",
    level: "O Level",
    period: "1945–1949",
    questionType: "Structured Essay",
    marks: 8,
    sourceYear: 2022,
    sourcePaper: "O Level History Paper 1",
    text: "Explain why relations between the USA and the USSR deteriorated so rapidly after 1945. [8]",
    answerOutline:
      "Ideological conflict: capitalism vs. communism — fundamentally incompatible worldviews [2]. Wartime mistrust: disagreements over Second Front, postwar borders (Yalta/Potsdam) [2]. Soviet expansion into Eastern Europe: satellite states raised US alarm [2]. Truman Doctrine (1947) and Marshall Plan: US commitment to contain communism, USSR saw as economic imperialism [2].",
    tags: ["Cold War origins", "USA", "USSR", "ideology", "Truman Doctrine"],
  },
  {
    id: "h007",
    topic: "Cold War",
    subtopic: "Korean War",
    level: "O Level",
    period: "1950–1953",
    questionType: "Structured Essay",
    marks: 8,
    sourceYear: 2021,
    sourcePaper: "O Level History Paper 1",
    text: "How did the Korean War (1950–1953) reflect the tensions of the Cold War? [8]",
    answerOutline:
      "Proxy conflict: US-led UN forces vs. North Korea backed by USSR/China — Cold War fought through client states [2]. Containment in action: Truman committed forces to prevent communist expansion in Asia [2]. China's entry (Oct 1950) after UN forces approached Yalu River raised stakes dramatically [2]. Outcome: stalemate, armistice at 38th parallel — neither side achieved decisive victory, tensions unresolved [2].",
    tags: ["Korean War", "proxy war", "containment", "China", "UN"],
  },
  {
    id: "h008",
    topic: "Cold War",
    subtopic: "Cuban Missile Crisis",
    level: "O Level",
    period: "1962",
    questionType: "Source-Based",
    marks: 12,
    sourceYear: 2023,
    sourcePaper: "O Level History Paper 2",
    text: "Study the sources and answer the questions that follow.\n\n(a) What does Source A suggest about Kennedy's response to the missile crisis? [3]\n(b) How useful is Source B as evidence of Soviet intentions during the crisis? [4]\n(c) 'The Cuban Missile Crisis showed that both superpowers wanted to avoid nuclear war.' How far do the sources and your own knowledge support this view? [5]",
    sources: [
      {
        label: "Source A",
        origin: "President Kennedy, televised address to the American people, 22 October 1962",
        excerpt:
          "It shall be the policy of this nation to regard any nuclear missile launched from Cuba against any nation in the Western Hemisphere as an attack by the Soviet Union on the United States, requiring a full retaliatory response upon the Soviet Union.",
      },
      {
        label: "Source B",
        origin: "Letter from Khrushchev to Kennedy, 26 October 1962",
        excerpt:
          "If there is no intention to doom the world to the catastrophe of thermonuclear war, then let us not only relax the forces pulling on the ends of the rope, let us take measures to untie that knot. We are ready for this.",
      },
    ],
    answerOutline:
      "(a) Kennedy firm, prepared to risk war to remove missiles; sought to deter Soviet aggression [2]; tone suggests red line drawn [1]. (b) Source B suggests Soviet willingness to negotiate [2]; Khrushchev's letter shows awareness of mutual destruction; reliability limited — diplomatic communication, may not reflect private intentions [2]. (c) Support: both backed down from direct confrontation, Khrushchev proposed withdrawal, Kennedy offered no-invasion pledge [3]; Against: brinksmanship tactics risked catastrophe — shows miscalculation possible [2].",
    tags: ["Cuban Missile Crisis", "Kennedy", "Khrushchev", "nuclear", "brinkmanship"],
  },
  {
    id: "h009",
    topic: "Cold War",
    subtopic: "End of the Cold War",
    level: "A Level (H2)",
    period: "1985–1991",
    questionType: "Essay",
    marks: 25,
    sourceYear: 2020,
    sourcePaper: "A Level History Paper 2",
    text: "To what extent was Gorbachev's leadership the main reason for the end of the Cold War? [25]",
    answerOutline:
      "Thesis: Gorbachev necessary but not sufficient — structural factors crucial. Gorbachev's role: Glasnost/Perestroika loosened control; INF Treaty (1987); refusal to use force to prop up Eastern European regimes [8]. Structural factors: Soviet economic exhaustion; arms race unsustainable (Reagan's SDI) [6]. Reagan's role: military buildup, ideological pressure [4]. Popular movements in Eastern Europe: Poland's Solidarity, 1989 revolutions driven by people [4]. Conclusion: Gorbachev accelerated but did not single-handedly cause the end — convergence of factors [3].",
    tags: ["Gorbachev", "Cold War", "end", "Reagan", "1989", "perestroika"],
  },
  {
    id: "h010",
    topic: "Cold War",
    subtopic: "Nuclear Arms Race",
    level: "A Level (H1)",
    period: "1945–1972",
    questionType: "Essay",
    marks: 20,
    sourceYear: 2019,
    sourcePaper: "A Level History Paper 1",
    text: "How far did the nuclear arms race make the world more dangerous between 1945 and 1972? [20]",
    answerOutline:
      "More dangerous: Berlin crises; Korean War risk of escalation; Cuban Missile Crisis (1962) brought world closest to nuclear war; MAD doctrine — any miscalculation fatal [10]. Less dangerous: MAD as deterrent — both sides avoided direct confrontation; Hotline (1963) after Cuba; SALT I (1972) began arms control [8]. Balance: arms race created dangerous moments but also incentivised restraint; world more dangerous in perception, not necessarily in practice [2].",
    tags: ["arms race", "MAD", "deterrence", "Cuba", "nuclear"],
  },

  // ── DECOLONISATION ────────────────────────────────────────────────────────
  {
    id: "h011",
    topic: "Decolonisation",
    subtopic: "End of British Empire",
    level: "O Level",
    period: "1945–1965",
    questionType: "Structured Essay",
    marks: 8,
    sourceYear: 2021,
    sourcePaper: "O Level History Paper 1",
    text: "Why did Britain grant independence to many of its colonies after World War II? [8]",
    answerOutline:
      "Economic cost: Britain near-bankrupt after WWII, could not sustain empire [2]. Rise of nationalism: educated elites, WWII weakened myth of white superiority, independence movements strengthened [2]. US pressure: America opposed European colonialism ideologically; Marshall Aid came with strings [1]. UN pressure: new international norms promoting self-determination [1]. Malayan Emergency demonstrated cost of suppressing independence [2].",
    tags: ["decolonisation", "Britain", "independence", "nationalism", "post-WWII"],
  },
  {
    id: "h012",
    topic: "Decolonisation",
    subtopic: "Vietnamese Independence",
    level: "A Level (H2)",
    period: "1945–1975",
    questionType: "Essay",
    marks: 25,
    sourceYear: 2022,
    sourcePaper: "A Level History Paper 2",
    text: "How far was US intervention the main reason why Vietnam remained divided from 1954 to 1975? [25]",
    answerOutline:
      "US intervention: Diem support, military advisors, Gulf of Tonkin resolution (1964), troop escalation under Johnson — prevented reunification under communist leadership [8]. Ho Chi Minh's resilience: popular support in North, guerrilla tactics of Viet Cong effective [6]. Geneva Accords (1954) and failure to hold elections — structural cause of division [4]. Cold War framework: USSR/China supported North, sustaining conflict [4]. Conclusion: US decisive in preventing rapid reunification but North's eventual victory shows limits of intervention [3].",
    tags: ["Vietnam", "US intervention", "Ho Chi Minh", "division", "Cold War"],
  },

  // ── SINGAPORE HISTORY ─────────────────────────────────────────────────────
  {
    id: "h013",
    topic: "Singapore's Journey to Independence",
    subtopic: "Merger with Malaysia",
    level: "O Level",
    period: "1961–1963",
    questionType: "Structured Essay",
    marks: 8,
    sourceYear: 2023,
    sourcePaper: "O Level History Paper 1",
    text: "Why did Singapore's leaders support the idea of a merger with Malaya in the early 1960s? [8]",
    answerOutline:
      "Economic reasons: common market, access to Malayan hinterland resources [2]. Security concerns: PAP feared communist takeover if Singapore remained alone — British withdrawal looming [2]. Lee Kuan Yew's political calculations: merger would marginalise left-wing Barisan Sosialis [2]. Tunku's motivation: Malaysia as a federation that could balance Chinese-majority Singapore with Malay-majority states [2].",
    tags: ["merger", "Malaysia", "PAP", "Lee Kuan Yew", "communism", "Singapore"],
  },
  {
    id: "h014",
    topic: "Singapore's Journey to Independence",
    subtopic: "Separation from Malaysia",
    level: "O Level",
    period: "1963–1965",
    questionType: "Structured Essay",
    marks: 8,
    sourceYear: 2022,
    sourcePaper: "O Level History Paper 1",
    text: "Why did Singapore separate from Malaysia on 9 August 1965? [8]",
    answerOutline:
      "Racial tensions: 1964 Race Riots (July and September); fundamental distrust between Chinese Singaporeans and Malay community [2]. PAP vs UMNO political rivalry: 'Malaysian Malaysia' campaign alarmed UMNO leadership [2]. Economic disagreements: Singapore's exclusion from common market, customs duties disputes [2]. Kuala Lumpur's decision: Tunku Abd Rahman concluded separation better than civil war; Lee Kuan Yew did not seek independence [2].",
    tags: ["separation", "independence", "Malaysia", "1965", "race riots", "Tunku"],
  },
  {
    id: "h015",
    topic: "Singapore's Journey to Independence",
    subtopic: "Nation-building",
    level: "O Level",
    period: "1965–1990",
    questionType: "Structured Essay",
    marks: 8,
    sourceYear: 2021,
    sourcePaper: "O Level History Paper 1",
    text: "How successfully did Singapore overcome its economic challenges after independence in 1965? [8]",
    answerOutline:
      "Challenges: no natural resources, high unemployment, British military withdrawal (1971) removed jobs/income [2]. EDB strategy: attract MNCs with tax incentives, skilled labour, political stability — Jurong Industrial Estate [2]. Education reforms: technical education aligned to industrial needs; bilingualism policy [2]. Transition from low-skill to high-value manufacturing and services (1970s–80s) [2]. By 1990s, first-world standard of living achieved — model of development success [marks awarded for analysis not just description].",
    tags: ["Singapore", "economy", "EDB", "MNCs", "industrialisation", "nation-building"],
  },
  {
    id: "h016",
    topic: "Singapore's Journey to Independence",
    subtopic: "Separation — Primary Sources",
    level: "O Level",
    period: "1965",
    questionType: "Source-Based",
    marks: 12,
    sourceYear: 2020,
    sourcePaper: "O Level History Paper 2",
    text: "Study the sources and answer the questions that follow.\n\n(a) What does Source A reveal about Lee Kuan Yew's feelings during the announcement of separation? [3]\n(b) How reliable is Source B as evidence of the reasons for Singapore's separation from Malaysia? [4]\n(c) Using the sources and your own knowledge, explain why separation from Malaysia was 'painful' for Singapore's leaders. [5]",
    sources: [
      {
        label: "Source A",
        origin: "Lee Kuan Yew, televised press conference, 9 August 1965",
        excerpt:
          "For me, it is a moment of anguish because all my life... I have believed in merger and the unity of these two territories. It's a moment of anguish because all my life I have believed in merger and the unity of these two territories... we are going to be a separate nation, against our will.",
      },
      {
        label: "Source B",
        origin: "Tunku Abdul Rahman, statement on the separation agreement, 9 August 1965",
        excerpt:
          "It is with the utmost regret and after very careful and deliberate consideration that we have decided that we sever all our connections with the State of Singapore. It is inevitable that we must part ways. The separation is made with the best of intentions and in a spirit of goodwill.",
      },
    ],
    answerOutline:
      "(a) Lee emotional, genuinely believed in merger — 'anguish' not performance [1]; unexpected — forced on Singapore [1]; reveals personal cost of political decision [1]. (b) Official diplomatic statement — language of 'goodwill' obscures racial tensions [2]; Tunku had reason to downplay conflict; useful for understanding KL's official position but limited for full picture [2]. (c) Against PAP ideology of merger [2]; economic and security risks for small new state [2]; personal leadership weight of responsibility [1].",
    tags: ["separation", "Lee Kuan Yew", "Tunku", "source-based", "1965", "anguish"],
  },
  {
    id: "h017",
    topic: "Singapore's Journey to Independence",
    subtopic: "Racial Harmony",
    level: "O Level",
    period: "1964–1980s",
    questionType: "Structured Essay",
    marks: 8,
    sourceYear: 2019,
    sourcePaper: "O Level History Paper 1",
    text: "Explain how the Singapore government managed racial and religious harmony after independence. [8]",
    answerOutline:
      "Legal framework: Maintenance of Religious Harmony Act (1990); ISA used against racial agitators [2]. Housing policy: HDB ethnic integration policy (1989) ensured racial mixing in estates [2]. Education: multilingualism, National Education, common curriculum [2]. Racial Harmony Day; community events promote interaction [1]. Economic inclusion: meritocracy reduced ethnic economic gaps [1].",
    tags: ["racial harmony", "HDB", "Singapore", "multiculturalism", "policy"],
  },

  // ── INTERNATIONAL RELATIONS ───────────────────────────────────────────────
  {
    id: "h018",
    topic: "International Relations",
    subtopic: "United Nations",
    level: "O Level",
    period: "1945–present",
    questionType: "Structured Essay",
    marks: 8,
    sourceYear: 2023,
    sourcePaper: "O Level History Paper 1",
    text: "How effective has the United Nations been in maintaining world peace since 1945? [8]",
    answerOutline:
      "Successes: peacekeeping missions (Cyprus, Cambodia); Korean War collective response; humanitarian work (UNHCR, WHO) [3]. Failures: unable to prevent Korean War escalation; Cold War paralysed Security Council vetoes; Rwanda genocide (1994), Srebrenica (1995) — UN failed to protect [3]. Structural weakness: permanent 5 veto power, voluntary funding, no standing army [2].",
    tags: ["United Nations", "peacekeeping", "veto", "effectiveness", "world peace"],
  },
  {
    id: "h019",
    topic: "International Relations",
    subtopic: "ASEAN",
    level: "O Level",
    period: "1967–present",
    questionType: "Structured Essay",
    marks: 8,
    sourceYear: 2021,
    sourcePaper: "O Level History Paper 1",
    text: "Explain why ASEAN was formed in 1967 and how it has benefited its member states. [8]",
    answerOutline:
      "Reasons for formation: Cold War context — fear of communist expansion (Vietnam, domino theory) [2]; regional conflicts (Indonesian Konfrontasi just ended 1966) — need for dialogue mechanism [2]. Benefits: political stability — reduced regional conflicts, ZOPFAN declaration [2]; economic cooperation — AFTA, FDI attraction, collective bargaining power with external powers [2].",
    tags: ["ASEAN", "formation", "1967", "regional cooperation", "Cold War"],
  },
  {
    id: "h020",
    topic: "International Relations",
    subtopic: "League of Nations",
    level: "O Level",
    period: "1919–1939",
    questionType: "Structured Essay",
    marks: 8,
    sourceYear: 2020,
    sourcePaper: "O Level History Paper 1",
    text: "Why did the League of Nations fail to prevent the outbreak of World War II? [8]",
    answerOutline:
      "Membership weakness: USA never joined; Germany and USSR excluded initially [2]. No enforcement power: no army, sanctions ineffective (Abyssinia 1935) [2]. Unanimity rule: decisions required all members to agree — paralysed action [1]. Great Depression weakened members' will/capacity to act [1]. Aggressor nations: Japan (Manchuria 1931), Italy (Abyssinia 1935), Germany (remilitarisation) — each challenge unanswered eroded League credibility [2].",
    tags: ["League of Nations", "failure", "collective security", "Abyssinia", "WWII"],
  },

  // ── A LEVEL EXTENDED ──────────────────────────────────────────────────────
  {
    id: "h021",
    topic: "Cold War",
    subtopic: "Berlin Crisis",
    level: "A Level (H2)",
    period: "1948–1961",
    questionType: "Essay",
    marks: 25,
    sourceYear: 2021,
    sourcePaper: "A Level History Paper 2",
    text: "How far was Berlin the most dangerous flashpoint of the Cold War between 1948 and 1961? [25]",
    answerOutline:
      "Berlin as flashpoint: Berlin Blockade (1948-49) — first major direct superpower standoff; Berlin Wall (1961) — physical division of Europe; Kennedy's 'Ich bin ein Berliner' moment [8]. Other flashpoints: Korea (1950-53) — actual war; Cuba (1962) — closest to nuclear exchange; Hungary (1956) — Soviet suppression [8]. Berlin unique as: deep in Soviet-controlled territory, ideological showcase, refugee problem drove wall's construction [6]. Conclusion: Berlin consistently dangerous but Cuba arguably most acute crisis; Berlin most persistent flashpoint [3].",
    tags: ["Berlin", "blockade", "Wall", "Cold War", "flashpoint"],
  },
  {
    id: "h022",
    topic: "World War II",
    subtopic: "Impact of WWII",
    level: "A Level (H1)",
    period: "1945",
    questionType: "Essay",
    marks: 20,
    sourceYear: 2022,
    sourcePaper: "A Level History Paper 1",
    text: "How significantly did World War II change the international order? [20]",
    answerOutline:
      "Rise of superpowers: USA and USSR replaced European balance of power [4]. Decline of European empires: weakened Britain and France, accelerated decolonisation [4]. Creation of new international institutions: UN, World Bank, IMF, Bretton Woods [4]. Onset of Cold War: ideological division replaced multilateral peace [4]. Technological change: nuclear weapons, jet aircraft permanently altered warfare and diplomacy [4].",
    tags: ["WWII impact", "international order", "superpowers", "decolonisation", "Cold War"],
  },
  {
    id: "h023",
    topic: "Cold War",
    subtopic: "Containment Policy",
    level: "A Level (H1)",
    period: "1947–1953",
    questionType: "Essay",
    marks: 20,
    sourceYear: 2019,
    sourcePaper: "A Level History Paper 1",
    text: "How effective was the US policy of containment in Asia between 1947 and 1953? [20]",
    answerOutline:
      "Successes: Marshall Plan in Europe; Truman Doctrine aided Greece/Turkey; NATO formation [4]. Korea: communist advance halted at 38th parallel — limited success [4]. Failures: China 'lost' to communism (1949) despite US support for Chiang Kai-shek [4]. Costs: Korean War 36,000 US dead, international tensions, McCarthyism domestically [4]. Assessment: containment halted spread in some areas but could not reverse communist gains [4].",
    tags: ["containment", "Truman", "Korea", "China", "Asia policy"],
  },
  {
    id: "h024",
    topic: "Singapore's Journey to Independence",
    subtopic: "Communist Threat",
    level: "O Level",
    period: "1948–1963",
    questionType: "Structured Essay",
    marks: 8,
    sourceYear: 2023,
    sourcePaper: "O Level History Paper 1",
    text: "How serious a threat did communism pose to Singapore's political stability in the 1950s and early 1960s? [8]",
    answerOutline:
      "Communist United Front: Malayan Communist Party (MCP) infiltrated trade unions and Chinese schools — broad popular base [2]. Hock Lee Bus Riots (1955), Chinese Middle School Riots — communist-led civil unrest threatened colonial order [2]. Barisan Sosialis formed from PAP split (1961) — legitimate political vehicle for left-wing opposition [2]. British concern: Emergency in Malaya — containment of spread to Singapore crucial to merger discussions [2].",
    tags: ["communism", "MCP", "Barisan Sosialis", "1950s", "Singapore politics"],
  },
  {
    id: "h025",
    topic: "World War II",
    subtopic: "Source-Based: Japanese Occupation",
    level: "O Level",
    period: "1942–1945",
    questionType: "Source-Based",
    marks: 12,
    sourceYear: 2019,
    sourcePaper: "O Level History Paper 2",
    text: "Study Sources A and B about life during the Japanese Occupation of Singapore.\n\n(a) What can you infer from Source A about how the Japanese treated civilian populations? [3]\n(b) How far does Source B support the view in Source A about conditions during the Occupation? [4]\n(c) 'Fear was the most important factor shaping civilian life during the Japanese Occupation.' Using the sources and your own knowledge, how far do you agree? [5]",
    sources: [
      {
        label: "Source A",
        origin: "Testimony of a Chinese Singaporean survivor, recorded by the National Archives of Singapore, 1985",
        excerpt:
          "We were always afraid. Every morning we did not know if we would return home. The Japanese soldiers could stop you on the street at any time. If you could not produce your identity card, or if they did not like the way you looked, you could be taken away. Many of my neighbours disappeared this way.",
      },
      {
        label: "Source B",
        origin: "Report by the International Red Cross, submitted to Allied authorities, 1945",
        excerpt:
          "Food supplies in the occupied territories have deteriorated significantly. Civilian mortality from malnutrition and disease has increased markedly since 1943. The population shows signs of systematic economic exploitation, including forced labour and confiscation of property.",
      },
    ],
    answerOutline:
      "(a) Inference: Japanese used fear and random violence as control mechanism [1]; Chinese particularly targeted [1]; civilians lived in constant uncertainty [1]. (b) Source B corroborates suffering — economic hardship, disease confirm Source A's picture of hardship [2]; B focuses on material conditions, A on psychological fear — complementary not identical [2]. (c) Agree: fear shaped daily behaviour, informants/Kempeitai surveillance pervasive [3]; Other factors: economic survival, community networks of resistance/support [2].",
    tags: ["Japanese Occupation", "civilian", "fear", "Sook Ching", "source-based"],
  },
  {
    id: "h026",
    topic: "Cold War",
    subtopic: "Marshall Plan and Truman Doctrine",
    level: "O Level",
    period: "1947–1952",
    questionType: "Structured Essay",
    marks: 8,
    sourceYear: 2022,
    sourcePaper: "O Level History Paper 1",
    text: "How important was the Marshall Plan in helping Western Europe resist the spread of communism? [8]",
    answerOutline:
      "Economic recovery: $13 billion aid rebuilt war-torn economies — reduced conditions in which communism thrived [2]. Political stabilisation: strengthened democratic governments in France, Italy where communist parties were strong [2]. Psychological impact: demonstrated US commitment to European recovery — improved morale [1]. Soviet reaction: Molotov Plan, Cominform — Marshall Plan accelerated Cold War division [2]. Limits: success depended on existing democratic institutions; not applicable where Soviet control already established [1].",
    tags: ["Marshall Plan", "Truman Doctrine", "Western Europe", "communism", "reconstruction"],
  },
];
