/* ─── Portfolio Content Data ─────────────────────────────────────
   Source of truth: Md. Zubayer Ahmad Shibly's CV.
   Sections not explicitly covered by the CV (e.g. Collaborators) use
   demo content and will be refined later.
   ──────────────────────────────────────────────────────────────── */

export const personalInfo = {
  nameFirst:  'Md. Zubayer Ahmad',
  nameLast:   'Shibly',
  tagline:    'AI Researcher · CSE Undergraduate, Southeast University',
  description:
    '"I love designing algorithms from scratch, failing at them, and figuring out why." My high school had a motto - Know Thyself. I never stopped living by it. In research, failure is not the opposite of understanding. It is the beginning of it.',
  email:      'zubayer0ahmad@gmail.com',
  phone:      '+880 1845250202',
  location:   'Narayanganj, Bangladesh',
  cvUrl:      '/cv/Main_CV.pdf',
  cvFileName: 'Md_Zubayer_Ahmad_Shibly_CV.pdf',
  /* ── Video config ────────────────────────────────────────────── */
  videoUrl:    'https://www.youtube.com/embed/dQw4w9WgXcQ',
  videoLabel:  'Introduction Video',
  videoPoster: '',
  statusTag:  'Open for Graduate Research Associate Opportunities — 2026',
  socials: {
    orcid:    'https://orcid.org/0009-0001-0674-0240',
    github:   'https://github.com/iamshibly',
    linkedin: 'https://www.linkedin.com/in/iamshibly/',
  },
} as const;

/* ─── Hero Stats ─────────────────────────────────────────────── */
export const heroStats: { target: number; label: string }[] = [
  { target: 5,  label: 'Accepted Papers' },
  { target: 8,  label: 'Under Review' },
  { target: 3,  label: 'Projects' },
  { target: 1,  label: 'Departmental Rank' },
];

/* ─── About ──────────────────────────────────────────────────── */
export const aboutBio: string[] = [
  "I am a <strong>Computer Science and Engineering</strong> (CSE) student at <strong>SEU</strong>, <strong>Bangladesh</strong>. My focus is AI research, specifically federated learning, transformer models, explainable AI, and medical imaging.",
  "I build systems that tackle real problems in healthcare, finance, and security. I've collaborated with researchers across the <strong>UK</strong> and <strong>USA</strong>, with papers accepted and submitted to conferences like <strong>IEEE FUZZ</strong>, <strong>NeurIPS</strong>, and <strong>ICDM</strong>.",
  "I also believe in working close to the algorithm, which is reflected in works like <strong>TRUST-GFS</strong> and <strong>UADGE-FS</strong>, where I contributed to designing novel feature selection frameworks from the ground up.",
  "I'm actively seeking MSc opportunities in Europe, North America, and East Asia where I can push this research further.",
];

export const researchInterests: string[] = [
  'Explainable AI (XAI)',
  'Deep Learning',
  'Federated Learning',
  'Feature Selection',
  'Medical Image Analysis',
  'Tabular Representation Learning',
  'Intrusion Detection',
  'Trustworthy ML',
  'AI Agents',
];

export const hobbies: string[] = [
  'Football', 'Traveling', 'Watching Movies', 'Animation', 'Manga',
];

/* ─── Education ──────────────────────────────────────────────── */
export interface IeltsBreakdown {
  overall: number;
  listening: number;
  reading: number;
  writing: number;
  speaking: number;
}

export interface Education {
  year: string;
  degree: string;
  institution: string;
  cgpa: string;
  cgpaRecent?: string;
  ielts?: IeltsBreakdown;
}

export const education: Education[] = [
  {
    year:        'Jul 2022 – Present',
    degree:      'B.Sc. in Computer Science and Engineering',
    institution: 'Southeast University (SEU), Tejgaon, Dhaka',
    cgpa:        '4.00 / 4.00',
    cgpaRecent:  'Ranked 1st in CSE Department · Full Tuition Waiver Scholarship',
  },
];

/* ─── Research Positions ─────────────────────────────────────── */
export interface ResearchPosition {
  date:       string;
  status?:    string;
  title:      string;
  org:        string;
  supervisor: string;
  faculty:    string;
  topics:     string[];
  variant:    'cyan' | 'gold';
}

export const researchPositions: ResearchPosition[] = [
  {
    date:       '2026 – Present',
    status:     'Active',
    title:      'Collaborative Researcher',
    org:        'University of Salford, United Kingdom',
    supervisor: 'Supervised by Dr. Maybin Muyeba',
    faculty:    'School of Science, Engineering & Environment',
    variant:    'cyan',
    topics: [
      'Developed an explainable federated intrusion detection framework based on Empirical-Bernstein certified Bandit-KL mixing with tree stacking — accepted at IEEE FUZZ 2026 (<strong>Netherlands, B-core</strong>).',
      'Designed FedBridge++, a privacy-preserving federated self-supervision framework with interpretable transformers for tabular loan approval — accepted at SERA 2026 (<strong>USA, C-core</strong>).',
    ],
  },
  {
    date:       '2025 – April 2026',
    status:     'Completed',
    title:      'Collaborative Researcher',
    org:        'Augusta University, USA',
    supervisor: 'Supervised by Rajon Bardhan',
    faculty:    'School of Computer and Cyber Sciences',
    variant:    'gold',
    topics: [
      'UADGE-FS: Uncertainty-Aware, Dominance-Gated Evolutionary Feature Selection — submitted to ICDM 2026 (<strong>China, A* flagship</strong>).',
      'TRUST-GFS: Tie-safe Reliability and Uplift Screening for Target-guided Genetic Feature Selection — submitted to NeurIPS 2026 (<strong>A* flagship</strong>).',
    ],
  },
];

/* ─── Publications ───────────────────────────────────────────── */
export type PubType = 'Journal' | 'International Conference' | 'Domestic Conference';
export type PubStatus = 'Accepted' | 'Published' | 'Under Review';
export type CoreRank = 'A*' | 'A' | 'B' | 'C';

export interface Publication {
  title:    string;
  authors:  string;
  venue:    string;
  year:     number;
  type:     PubType;
  status:   PubStatus;
  link?:    string;
  coreRank?: CoreRank;   // CORE ranking for flagship highlighting
  note?:    string;      // extra annotation (e.g. 'Undergraduate Thesis')
}

export const publications: Publication[] = [
  /* ── Accepted / Forthcoming ─────────────────────────────────── */
  {
    title:    'Federated Explainable Intrusion Detection via Empirical-Bernstein Certified Bandit-KL Mixing with Tree Stacking',
    authors:  'Md. Zubayer Ahmad Shibly, Dr. Maybin Muyeba, et al.',
    venue:    'IEEE FUZZ 2026, Netherlands',
    year:     2026,
    type:     'International Conference',
    status:   'Accepted',
    coreRank: 'B',
  },
  {
    title:    'FedBridge++: Privacy-Preserving Federated Self-Supervision with Interpretable Transformers for Tabular Loan Approval',
    authors:  'Md. Zubayer Ahmad Shibly, Dr. Maybin Muyeba, et al.',
    venue:    'SERA 2026, USA',
    year:     2026,
    type:     'International Conference',
    status:   'Accepted',
    coreRank: 'C',
  },
  {
    title:    'Leveraging Multi-Algorithmic Feature Selection and Ensemble Machine Learning for Accurate Detection of Polycystic Ovarian Syndrome',
    authors:  'Md. Zubayer Ahmad Shibly, et al.',
    venue:    'IEEE ICCCNT 2025, Indore, India',
    year:     2025,
    type:     'International Conference',
    status:   'Accepted',
  },
  {
    title:    'A Novel Hybrid Feature Selection and Ensemble Learning Approach for Mortality Risk Classification in Hepatitis B Patients: An Explainable AI Study',
    authors:  'Md. Zubayer Ahmad Shibly, et al.',
    venue:    "ICCIT 2025, Cox's Bazar, Bangladesh",
    year:     2025,
    type:     'Domestic Conference',
    status:   'Accepted',
  },
  {
    title:    'Explainable AI-Driven Ensemble Learning Framework for PCOS Diagnosis Using AIM-PDCF and Quantum-GraphRFE Feature Selection',
    authors:  'Md. Zubayer Ahmad Shibly, et al.',
    venue:    "ICCIT 2025, Cox's Bazar, Bangladesh",
    year:     2025,
    type:     'Domestic Conference',
    status:   'Accepted',
  },

  /* ── Under Review — International Conferences ───────────────── */
  {
    title:    'Adaptive Biomarker Categorization with DiCAT and TCCA Feature Selection for Robust, Explainable Early Ovarian Cancer Detection',
    authors:  'Md. Zubayer Ahmad Shibly, et al.',
    venue:    'IRAI 2026, Melbourne, Australia',
    year:     2026,
    type:     'International Conference',
    status:   'Under Review',
  },
  {
    title:    'An Explainable Stacking Ensemble Framework with Disagreement-Aware Feature Selection for Loan Approval Prediction',
    authors:  'Md. Zubayer Ahmad Shibly, et al.',
    venue:    'TENSYMP 2026, Penang, Malaysia',
    year:     2026,
    type:     'International Conference',
    status:   'Under Review',
  },
  {
    title:    'An Interpretable Framework for Early Lung Cancer Prediction Using Graph Fusion and Role Stability for Robust Feature Selection with TabFGT',
    authors:  'Md. Zubayer Ahmad Shibly, et al.',
    venue:    'IEEE AVSS 2026, Lecce, Italy',
    year:     2026,
    type:     'International Conference',
    status:   'Under Review',
    coreRank: 'B',
  },

  /* ── Under Review — Journals ────────────────────────────────── */
  {
    title:    'Q-SEAL: An Explainable Transformer-Based Meta-Ensemble Model for Ovarian Cancer Prediction and Deployment Evaluation',
    authors:  'Md. Zubayer Ahmad Shibly, et al.',
    venue:    'Journal of Pathology Informatics',
    year:     2026,
    type:     'Journal',
    status:   'Under Review',
  },
  {
    title:    'Image Dataset for Classification and Recognition with Nutritional Values of Small Indigenous Freshwater River Fish from Bangladesh',
    authors:  'Md. Zubayer Ahmad Shibly, et al.',
    venue:    'Data in Brief, Elsevier',
    year:     2026,
    type:     'Journal',
    status:   'Under Review',
  },
  {
    title:    'Explainable Ovarian Cancer Diagnosis: Fusion-Based RFE-SHAP and Quantum-Inspired ANN-QUBO Feature Selection with Two-Tier Evaluation',
    authors:  'Md. Zubayer Ahmad Shibly, et al.',
    venue:    'Digital Health (SAGE)',
    year:     2026,
    type:     'Journal',
    status:   'Under Review',
  },
  {
    title:    'AIDPCP: An Adaptive Intelligent Preprocessing and Clustering Pipeline for Obesity Prediction with Explainable AI',
    authors:  'Md. Zubayer Ahmad Shibly, et al.',
    venue:    'IET Software (Wiley)',
    year:     2026,
    type:     'Journal',
    status:   'Under Review',
  },
  {
    title:    'FedGCF-Net: Federated Genetically-Optimized Contrast-Enhanced Fusion Network for Brain Tumor Classification',
    authors:  'Md. Zubayer Ahmad Shibly',
    venue:    'The Journal of Engineering',
    year:     2026,
    type:     'Journal',
    status:   'Under Review',
    note:     'Undergraduate Thesis',
  },
];

/* ─── Projects ───────────────────────────────────────────────── */
export interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  demo?: string;
}

export const projects: Project[] = [
  {
    title: 'MultiDx Clinical AI — Multi-Disease Prediction System',
    description: 'Full-stack clinical AI platform with an end-to-end modeling-to-deployment workflow. Integrates four disease-specific models (Ovarian Cancer, PCOS, Hepatitis B, Brain Tumor MRI) and ships explainability modules using SHAP and LIME with PDP, ICE, and ALE analytical views.',
    tags: ['Python', 'FastAPI', 'PyTorch', 'scikit-learn', 'Next.js', 'TypeScript', 'SHAP', 'LIME'],
    link: 'https://github.com/iamshibly/MultiDx',
    demo: 'https://model.sayeedjoy.com/',
  },
  {
    title: 'AniMaze — AI-Powered Anime & Manga Platform',
    description: 'Full-stack platform with a responsive interface, structured navigation, and user-focused design. Features AI-powered quiz generation, XP-based progression, leaderboards, typo-tolerant smart search, role-based dashboards, external API integrations, and subscription badge logic.',
    tags: ['TypeScript', 'MySQL', 'Supabase', 'Next.js'],
    link: 'https://github.com/iamshibly/AniMaze',
  },
  {
    title: 'Arduino Home Security & Fire/Smoke Detection',
    description: 'Keypad + LCD door security system with servo-controlled locking and timed auto re-lock. Bluetooth-based mobile control for gate access, pump, and alarm. Fire/smoke detection automatically triggers alarms and activates the water pump via relay.',
    tags: ['Arduino Uno', 'HC-05 Bluetooth', 'MQ-2 Sensor', 'Flame Sensor', 'Servo', 'Relay', 'Keypad'],
    link: 'https://github.com/iamshibly/Arduino-Home-Security-and-Fire-Smoke-Detection-System-with-Automatic-Water-Pump-Activation',
  },
];

/* ─── Collaborators ──────────────────────────────────────────── */
export interface Collaborator {
  name: string;
  title: string;
  institution: string;
  image: string;
}

export const collaborators: Collaborator[] = [
  {
    name:        'Prof. Mo Saraee',
    title:       'Professor of Data Science',
    institution: 'School of Science, Engineering & Environment, University of Salford, UK',
    image:       '/collaborators/mo-saraee.jpg',
  },
  {
    name:        'Dr. Maybin Muyeba',
    title:       'Lecturer in Data Science',
    institution: 'School of Science, Engineering & Environment, University of Salford, UK',
    image:       '/collaborators/maybin-muyeba.jpg',
  },
  {
    name:        'Rajon Bardhan',
    title:       'Ph.D. Student — Digital Forensics & Machine Learning',
    institution: 'Augusta University, USA',
    image:       '/collaborators/rajon-bardhan.jpg',
  },
  {
    name:        'Al-Amain',
    title:       'Research Assistant',
    institution: 'Dept. of Computer Science, Islamic University of Technology (IUT)',
    image:       '/collaborators/al-amain.jpg',
  },
  {
    name:        'Mirza Nadim Saad',
    title:       'Research Assistant',
    institution: 'Islamic University of Technology (IUT)',
    image:       '/collaborators/mirza-nadim-saad.jpg',
  },
  {
    name:        'Md. Jahidul Islam',
    title:       'Undergraduate Researcher',
    institution: 'Dept. of CSE, Southeast University (SEU)',
    image:       '/collaborators/jahidul-islam.jpg',
  },
];

/* ─── Experience ─────────────────────────────────────────────── */
export interface ExperienceLink {
  label: string;
  url:   string;
}

export interface Experience {
  date:        string;
  role:        string;
  org:         string;
  orgUrl?:     string;
  description: string;
  links?:      ExperienceLink[];
}

export const experience: Experience[] = [
  {
    date:        'Mar 2026 – Present',
    role:        'AI Agent Developer Intern',
    org:         'Neurocrack Technologies',
    orgUrl:      'https://www.neurocrack.com/',
    description:
      'Building a subject-agnostic AI agent that resolves academic doubts for middle- and high-school students across any topic — mathematics, science, English, Bangla, social studies — in real time. Work spans production-grade LLM orchestration, retrieval-augmented reasoning over curriculum content, tool-use for step-by-step solutions, and evaluation harnesses that keep answers pedagogically faithful before they reach a student.',
    links: [
      { label: 'Offer Letter', url: 'https://drive.google.com/file/d/1iUtrbSoNQnVuSJTFEPpOEKysm3Q-wkjE/view?usp=sharing' },
    ],
  },
  {
    date:        'Sep 2025 – Present',
    role:        'Director of Project Management (Volunteer)',
    org:         'Roots of Rise — NGO',
    orgUrl:      'https://www.linkedin.com/company/roots-of-rise/',
    description:
      'Leading end-to-end delivery of projects at Roots of Rise — a youth-driven NGO built around the 3E motto: Educate, Empower, Elevate — for a sustainable and just future. Coordinating across the Education, Outreach, and Community-Impact departments; scoping initiatives, sequencing deliverables, and owning timelines so programmes aligned with all three Es ship on schedule and with measurable impact.',
  },
  {
    date:        'Mar 2025 – May 2025',
    role:        'Campus Ambassador Intern',
    org:         'IMUN (International Model United Nations)',
    orgUrl:      'https://www.internationalmun.org/',
    description:
      'Represented IMUN on the Southeast University campus as a Campus Ambassador — running outreach for the organisation\u2019s diplomacy simulations, briefing prospective delegates on committee formats, and channelling interested students into IMUN\u2019s online conferences.',
    links: [
      { label: 'Offer Letter', url: 'https://drive.google.com/file/d/1xQSNMAZcsWHuVMru1aA6vGxK2Ebdk-2z/view?usp=sharing' },
    ],
  },
  {
    date:        'Feb 2024 – Apr 2024',
    role:        'Project Manager (Tech)',
    org:         'Laga Tour',
    orgUrl:      'https://www.linkedin.com/company/laga-tour/',
    description:
      'Coordinated a tech team across the data-collection and data-entry pipelines — scoping daily collection targets, reviewing entry quality, tracking deliverables against schedule, and handing off clean, validated datasets to downstream operations. Acted as the single point of accountability between the tech team and leadership for progress, blockers, and data-hygiene standards.',
  },
];

/* ─── Skills ─────────────────────────────────────────────────── */
export interface SkillBar {
  name:  string;
  level: number;
  tags:  string[];
}

export interface SkillGroup {
  groupTitle: string;
  skills:     SkillBar[];
}

export const skillGroups: SkillGroup[] = [
  {
    groupTitle: 'CORE & ML',
    skills: [
      { name: 'Federated Learning',             level: 90, tags: ['FedAvg', 'FedProx', 'Secure Aggregation', 'Differential Privacy', 'Non-IID', 'Self-Supervision'] },
      { name: 'Machine Learning',               level: 92, tags: ['Feature Engineering', 'Feature Selection', 'Data Preprocessing', 'Data Analysis', 'Statistics', 'Genetic FS', 'ML Algorithms'] },
      { name: 'Deep Learning & Transformers',   level: 92, tags: ['PyTorch', 'TensorFlow', 'Transformers', 'Attention', 'CNNs'] },
      { name: 'Explainable AI',                 level: 90, tags: ['SHAP', 'LIME', 'Grad-CAM', 'PDP', 'ICE', 'ALE'] },
      { name: 'Agentic AI',                     level: 82, tags: ['RAG', 'Vector Stores', 'Embeddings', 'Agents', 'Tools'] },
      { name: 'Programming',                    level: 88, tags: ['Python', 'C', 'Java', 'Dart'] },
    ],
  },
  {
    groupTitle: 'TOOLS & PLATFORMS',
    skills: [
      { name: 'Development Tools',       level: 90, tags: ['Git', 'GitHub', 'VS Code', 'LaTeX', 'Overleaf'] },
      { name: 'LLM Frameworks',          level: 82, tags: ['LangChain', 'LangGraph', 'Chains', 'Output Parsers', 'Prompt Templates'] },
      { name: 'Data & ML Libraries',     level: 88, tags: ['NumPy', 'Pandas', 'scikit-learn', 'Jupyter', 'Colab'] },
      { name: 'Visualization & Apps',    level: 82, tags: ['Streamlit', 'Matplotlib', 'Seaborn'] },
      { name: 'Databases',               level: 78, tags: ['MySQL', 'MongoDB'] },
    ],
  },
];

/* ─── Certifications ─────────────────────────────────────────── */
export interface Certification {
  name:   string;
  issuer: string;
  url?:   string;
}

export const certifications: Certification[] = [
  { name: 'Advanced Research in Machine Learning & XAI',                 issuer: 'Neural Research — Jun 2025', url: 'https://drive.google.com/file/d/1EwcDFTDQu56S0fL6bq1Gzc_9r-XQG4BN/view?usp=sharing' },
  { name: 'Python Functions, Files, and Dictionaries',                   issuer: 'University of Michigan (Coursera) — Mar 2025', url: 'https://drive.google.com/file/d/1bbNJ4PNvkl5AdCAGo_j0wJ0svGuyx-4A/view?usp=sharing' },
  { name: 'Foundations of Project Management',                           issuer: 'Coursera — Jun 2024', url: 'https://drive.google.com/file/d/1DFjPKA_hLtMpH-wAiQZHz1PjeIhp0RiL/view?usp=sharing' },
  { name: 'Cybersecurity Foundations',                                   issuer: 'LinkedIn Learning — Feb 2024', url: 'https://drive.google.com/file/d/1gPP_fXl_n6uz8smMTaYSyNXqnf5fYAZZ/view?usp=sharing' },
];

/* ─── Awards ─────────────────────────────────────────────────── */
export interface Award {
  icon: 'trophy' | 'medal' | 'graduation' | 'star' | 'sparkles';
  name: string;
  org:  string;
  year: string | number;
}

export const awards: Award[] = [
  { icon: 'medal',      name: 'Ranked 1st in CSE Department',                    org: 'Southeast University',              year: 2026 },
  { icon: 'trophy',     name: 'Top 22 of 650 — Harvard HSIL Hackathon (Dhaka Hub)', org: 'Harvard T.H. Chan School of Public Health', year: 2026 },
  { icon: 'graduation', name: 'Full Tuition Waiver Scholarship (4 years)',       org: 'Southeast University',              year: '2022–2026' },
  { icon: 'star',       name: 'Aspire Institute Awards — Leadership Recognition', org: 'Aspire Leaders Program',            year: 2025 },
  { icon: 'trophy',     name: 'Debate Competition Winner (Team President)',      org: 'FICC — Farees International Career Counseling', year: 2020 },
];

/* ─── News ───────────────────────────────────────────────────── */
export interface NewsLink {
  label: string;
  url:   string;
}

export interface NewsItem {
  id: string;
  date: string;
  title: string;
  titleUrl?: string;
  summary: string;
  image: string;
  featured: boolean;
  links?: NewsLink[];
}

export const news: NewsItem[] = [
  {
    id: 'seu-2022',
    date: 'August 2022',
    title: 'Enrolled in B.Sc. in CSE at Southeast University',
    summary:
      'Started the B.Sc. in Computer Science & Engineering journey at Southeast University (SEU), Dhaka, on a Full Tuition Waiver Scholarship. This marked the beginning of a deliberate focus on Artificial Intelligence, Machine Learning, and data-driven modeling — which would later evolve into applied research in healthcare AI, federated learning, and explainable modeling.',
    image: '/news/seu-join-2022.jpg',
    featured: false,
  },
  {
    id: 'usip-2024',
    date: '8 February 2024',
    title: 'Completed USIP "Peace Mediation Micro" Course',
    summary:
      'Earned the Certificate of Completion from the United States Institute of Peace (USIP) for the online, self-paced "Peace Mediation Micro" course. The course introduced structured mediation, negotiation ethics, and conflict-analysis frameworks used in international peacebuilding — a deliberate step outside pure CS to build broader humanities literacy.',
    image: '/news/usip-2024-cert.jpg',
    featured: false,
  },
  {
    id: 'imun-2025',
    date: '5 – 6 April 2025',
    title: 'Delegate at IMUN Online Conference 260.0',
    summary:
      'Served as a Delegate at the International Model United Nations (IMUN) Online Conference 260.0 — a two-day simulation of United Nations committee sessions. Researched a country position, drafted and defended a policy brief, negotiated language across bloc talks, and worked through committee procedure alongside delegates from multiple universities and countries — practical experience in structured international negotiation and multi-stakeholder decision making.',
    image: '/news/imun-2025-cert.jpg',
    featured: false,
  },
  {
    id: 'aspire-2025',
    date: 'August 2025',
    title: 'Aspire Institute — Aspire Leaders Program 2025',
    summary:
      'Recognised by the Aspire Institute (a Harvard-affiliated non-profit) through the Aspire Leaders Program 2025 — a global leadership development programme for first-generation, high-potential university students. The programme emphasises self-leadership, career navigation, and social impact.',
    image: '/news/aspire-2025.jpg',
    featured: false,
  },
  {
    id: 'icccnt-2025',
    date: '6 – 11 July 2025',
    title: 'Virtual Paper Presentation — IEEE ICCCNT 2025, IIT Indore',
    summary:
      'Virtually presented "Leveraging Multi-Algorithmic Feature Selection and Ensemble Machine Learning for Accurate Detection of Polycystic Ovarian Syndrome" (Paper ID 8634) at the 16th International IEEE Conference on Computing, Communication and Networking Technologies (ICCCNT 2025), hosted at IIT Indore in association with the IEEE Electronics Packaging Society and AICTE. The work combined multiple feature-selection algorithms with ensemble ML to improve PCOS diagnosis from clinical data.',
    image: '/news/icccnt-2025-cert.jpg',
    featured: false,
  },
  {
    id: 'roots-of-rise-2025',
    date: 'September 2025',
    title: 'Appointed Director of Project Management — Roots of Rise (NGO)',
    summary:
      'Joined Roots of Rise as Director of Project Management (Volunteer). Roots of Rise is a youth-driven NGO built around the 3E motto — Educate, Empower, Elevate — working toward a sustainable and just future. The role covers project planning, volunteer coordination, and programme delivery for the organisation\u2019s education and community-impact initiatives.',
    image: '/news/roots-of-rise-2025.jpg',
    featured: false,
  },
  {
    id: 'latex-2025',
    date: '17 November 2025',
    title: 'Attended IEEE CS SEU SBC Workshop — "LaTeX Unlocked: Research Writing"',
    summary:
      'Participated in the "LaTeX Unlocked: The Research Writing Workshop" organised by the IEEE Computer Society, SEU Student Branch Chapter. Session facilitator: Maksuda Rabeya (Graduate Research Assistant, Augusta University). Covered document structuring, BibTeX workflows, and best practices for preparing IEEE conference and journal manuscripts.',
    image: '/news/webinar-latex-2025.jpg',
    featured: false,
  },
  {
    id: 'prog-contest-webinar-2025',
    date: '26 December 2025',
    title: 'Attended IEEE CS SEU SBC Webinar — "Programming Contest & Research"',
    summary:
      'Engaged in the "Programming Contest & Research" webinar organised by the IEEE Computer Society, SEU Student Branch Chapter. Speaker: Rajon Bardhan (Graduate Research Student, Computer & Cyber Sciences, Augusta University). The session bridged competitive programming with research methodology — turning algorithmic intuition into publishable experimental design.',
    image: '/news/webinar-programming-contest-2025.jpg',
    featured: false,
  },
  {
    id: 'harvard-hackathon-2026',
    date: 'January 2026',
    title: 'Top 22 of 650 — Harvard HSIL Hackathon 2026 (Dhaka Hub)',
    summary:
      'Our team, Precision Health Innovators, was selected among the top 22 out of 650 applicant teams at the 7th Edition of the Harvard Health Systems Innovation Lab (HSIL) Hackathon — Dhaka Hub, organised by the Harvard T.H. Chan School of Public Health. Our project, MedSophia AI, focuses on applying data science and AI to real-world public-health and health-systems challenges.',
    image: '/news/harvard-hackathon-2026.jpg',
    featured: true,
  },
  {
    id: 'neurocrack-2026',
    date: 'March 2026',
    title: 'Joined Neurocrack Technologies as AI Agent Developer Intern',
    summary:
      'Currently building a subject-agnostic AI agent that resolves academic doubts for middle- and high-school students across any subject. Scope spans LLM orchestration, retrieval over curriculum content, tool-use for step-by-step working, and evaluation harnesses to keep answers pedagogically faithful.',
    image: '/news/neurocrack-2026.jpg',
    featured: true,
  },
  {
    id: 'fuzz-accepted-2026',
    date: 'March 2026',
    title: 'Paper Accepted at IEEE FUZZ 2026 (Maastricht, Netherlands) — CORE B',
    summary:
      '"Developing an explainable federated intrusion detection framework based on Empirical Bernstein-certified Bandit-KL mixing with tree stacking" — accepted at FUZZ-IEEE 2026. This conference is part of the IEEE World Congress on Computational Intelligence (WCCI) 2026, which brings together the flagship conferences of the IEEE Computational Intelligence Society. The event will take place from 21st to 26th June 2026 at MECC Maastricht, Netherlands. Collaborative work with Dr. Maybin Muyeba (University of Salford, UK) combining federated learning, certified confidence bounds, and interpretable tree-based models for network intrusion detection.',
    image: 'https://attend.ieee.org/wcci-2026/wp-content/uploads/sites/689/homepage-banner_boven-WCCI-1.jpg',
    featured: false,
  },
  {
    id: 'sera-accepted-2026',
    date: 'April 2026',
    title: 'Paper Accepted at IEEE/ACIS SERA 2026 — CORE C',
    summary:
      '"FedBridge++: a privacy-preserving federated self-supervision framework with interpretable transformers for tabular loan approval" — accepted at IEEE/ACIS SERA 2026 (USA). The framework applies federated self-supervision to credit-decision data, preserving client privacy while keeping the model auditable through interpretable transformer blocks.',
    image: '/news/sera-2026.jpg',
    featured: false,
  },
  {
    id: 'icdm-submission-2026',
    date: 'May 2026',
    title: 'UADGE-FS Submitted to IEEE ICDM 2026 (A*)',
    summary:
      'Submitted "UADGE-FS: Uncertainty-Aware, Dominance-Gated Evolutionary Feature Selection" to IEEE ICDM 2026 (China) — a CORE A* data-mining venue. Collaborative work with Rajon Bardhan (Augusta University, USA) that layers uncertainty quantification and dominance gating onto evolutionary feature selection, targeting high-dimensional, noisy biomedical and cyber datasets.',
    image: '/news/icdm-submission-2026.jpg',
    featured: false,
  },
  {
    id: 'neurips-submission-2026',
    date: 'May 2026',
    title: 'TRUST-GFS Submitted to NeurIPS 2026 (A*)',
    summary:
      '"TRUST-GFS: Tie-safe Reliability and Uplift Screening for Target-guided Genetic Feature Selection" — submitted to NeurIPS 2026 (A*), in collaboration with Rajon Bardhan (Augusta University, USA). The method introduces statistical uplift gates on top of genetic search so that selected feature subsets remain reliable under label noise, ties, and small-sample drift.',
    image: '/news/neurips-submission-2026.jpg',
    featured: false,
  },
];

/* ─── References / Contact ───────────────────────────────────── */
export interface Reference {
  name:        string;
  title:       string;
  institution: string;
  email:       string;
  image:       string;
  note?:       string;
}

export const references: Reference[] = [
  {
    name:        'Khandaker Mohammad Mohi Uddin',
    title:       'Assistant Professor',
    institution: 'Dept. of CSE, Southeast University',
    email:       'mohiuddin.kh@seu.edu.bd',
    image:       '/references/mohi-uddin.jpg',
    note:        'Undergraduate thesis supervisor',
  },
  {
    name:        'Shifat Ahmed',
    title:       'Assistant Professor',
    institution: 'Dept. of CSE, Southeast University',
    email:       'shifat.ahmed@seu.edu.bd',
    image:       '/references/shifat-ahmed.jpg',
  },
];
