export interface CaseStudyContent {
  subtitle: string;
  summary: string;
  tools?: string[];
  meta: { label: string; value: string }[];
  overview: {
    hook: string;
    paragraphs: string[];
    quote: string;
    reframe: string;
    metrics?: { value: string; label: string; description: string }[];
    painPoints?: { title: string; description: string }[];
  };
  challenge: {
    heading: string;
    paragraphs: string[];
    emphasis: string[];
    designChallenge: string;
  };
  decisions: {
    heading: string;
    intro: string;
    items: { insight: string; decision: string }[];
    closing: string;
  };
  solutions: {
    heading: string;
    visionParagraphs: string[];
    intents: string[];
    visionClosing: string;
    features: { title: string; description: string; imageLabel?: string; imageTone?: string }[];
  };
  stages?: {
    title: string;
    validating: string;
    question: string;
    insights: { insight: string; change: string; quote?: string; phrase?: string; changePhrase?: string }[];
  }[];
  audienceMapping?: {
    heading: string;
    paragraphs: string[];
    groupsIntro: string;
    groups: { title: string; description: string }[];
    closing: string;
    conceptsHeading: string;
    concepts: { name: string; description: string; detail: string; verdict: string; outcome: 'won' | 'killed'; sketch?: string; bullets?: { type: '+' | '-'; text: string }[] }[];
  };
  impact: {
    heading: string;
    intro: string;
    outcomes: string[];
    metrics?: { value: string; unit?: string; label: string; description: string; gradient?: string }[];
  };
  reflection: {
    paragraphs: string[];
    closing: string;
  };
}

// Keyed by project title (src/App.tsx PROJECTS). Projects without an entry
// here fall back to the generic placeholder content in CaseStudyModal.
export const CASE_STUDY_CONTENT: Record<string, CaseStudyContent> = {
  'Cox HCD Resource Hub': {
    subtitle: 'Designing the Front Door to Human-Centered Design',
    summary:
      'Helping 55,000+ employees discover, learn, and apply Human-Centered Design through a self-service enterprise knowledge platform.',
    tools: ['Figma', 'Miro', 'Teams', 'Excel', 'Claude'],
    meta: [
      { label: 'Role', value: 'AI Product Designer · UX Research' },
      { label: 'Timeline', value: '15 Weeks' },
      { label: 'Team', value: '4 Designers' },
      { label: 'Client', value: 'Cox Enterprises' },
    ],
    overview: {
      hook: "Most teams don't lack knowledge. They lack a clear way in.",
      paragraphs: [
        'When we partnered with Cox Enterprises, the Human-Centered Design (HCD) team had already built an ecosystem of workshops, certifications, templates, research methods, project examples, and coaching opportunities. More than 1,000 employees had participated in HCD initiatives across an organization of 55,000+ people.',
        'Despite that investment, employees continued asking the same question:',
      ],
      quote: 'Where do I start?',
      reframe:
        'The ask started as a resource website. We reframed it as a guided discovery system that could help employees find the right HCD support without depending on manual handoffs.',
      metrics: [
        {
          value: '55K+',
          label: 'Enterprise employees',
          description: 'Employees across Cox Enterprises needed clearer access to HCD guidance.',
        },
        {
          value: '1K+',
          label: 'HCD participants',
          description: 'Employees had already joined workshops, certifications, and HCD initiatives.',
        },
        {
          value: '6+',
          label: 'Resource types',
          description: 'Templates, methods, projects, workshops, experts, and learning materials were spread across systems.',
        },
      ],
      painPoints: [
        {
          title: 'Scattered Systems',
          description: 'HCD resources lived across multiple internal platforms, making discovery inconsistent.',
        },
        {
          title: 'Unclear Starting Point',
          description: 'Employees knew their goal, but not which resource, template, or expert to start with.',
        },
        {
          title: 'Manual Routing',
          description: 'The HCD team became the default help desk for navigation questions instead of strategic guidance.',
        },
      ],
    },
    challenge: {
      heading: 'Where Do I Start?',
      paragraphs: [
        "The Human-Centered Design (HCD) team had already built a rich ecosystem of workshops, templates, certifications, and coaching. Yet employees still struggled to find the right resources.Every failed search became another Teams message or email to the HCD team.",
        // 'When we partnered with Cox Enterprises, the Human-Centered Design (HCD) team had already built an ecosystem of workshops, certifications, templates, research methods, project examples, and coaching opportunities. More than 1,000 employees had participated in HCD initiatives across an organization of 55,000+ people.',
        // 'Despite that investment, employees continued asking the same question:',
        // 'Employees approached Human-Centered Design with very different goals. Some wanted to learn the fundamentals. Others needed help planning research, facilitating workshops, or finding reusable templates.',
        // "The existing experience assumed everyone already understood the organization's structure. When they didn't, discovery failed.",
        // 'Every failed search became another Teams message or email to the HCD team.',
        // 'Resources were scattered across multiple internal systems with inconsistent navigation and terminology. Employees often depended on the HCD team to manually point them toward the right templates, workshops, or experts.',
      ],
      emphasis: ["The problem wasn't missing information - It was missing guidance."],
      designChallenge:
        'How might we help employees independently discover, learn, and apply Human-Centered Design while reducing dependency on manual support?',
    },
    decisions: {
      heading: 'Research & Design Decisions',
      intro: 'Our research surfaced four recurring insights.',
      items: [
        { insight: 'Employees think in goals, not resources.', decision: 'Organize navigation around intent.' },
        { insight: "Knowledge existed, but discoverability didn't.", decision: 'Centralize discovery rather than create new documentation.' },
        { insight: 'Experience levels varied.', decision: 'Design progressive learning pathways.' },
        { insight: 'Experts answered repetitive navigation questions.', decision: 'Reserve expert time for strategic conversations through self-service and expert routing.' },
      ],
      closing:
        'Every major feature directly mapped back to a research finding, allowing product decisions to be grounded in evidence rather than assumption.',
    },
    solutions: {
      heading: 'Key Features',
      visionParagraphs: [
        "Research revealed that employees weren't looking for documents. They were trying to accomplish tasks.",
        'Rather than organizing the experience around folders, departments, or document types, we designed the platform around employee intent.',
      ],
      intents: ['Learn HCD', 'Plan User Research', 'Find Templates', 'Explore Projects', 'Connect with Experts'],
      visionClosing: 'The goal shifted from storing knowledge to helping employees confidently act on it.',
      features: [
        {
          title: 'Intent-Based Navigation',
          description:
            "The homepage became the product's primary decision surface. Navigation was organized around outcomes rather than organizational terminology, reducing the amount of institutional knowledge employees needed before they could succeed.",
          imageLabel: 'Homepage decision surface',
          imageTone: 'from-sky-500/30 via-cyan-400/15 to-emerald-400/20',
        },
        {
          title: 'Progressive Learning Pathways',
          description:
            'Employees entered with different levels of experience. We created guided learning journeys that helped beginners build confidence while allowing experienced practitioners to quickly access advanced resources.',
          imageLabel: 'Beginner to practitioner journey',
          imageTone: 'from-fuchsia-500/25 via-rose-400/15 to-amber-300/20',
        },
        {
          title: 'Unified Knowledge Search',
          description:
            'Rather than forcing employees to search across multiple internal systems, we designed a single discovery experience spanning templates, workshops, methods, projects, and learning materials.',
          imageLabel: 'Cross-platform resource discovery',
          imageTone: 'from-violet-500/25 via-blue-400/15 to-slate-100/20',
        },
        {
          title: 'Expert Directory',
          description:
            'Human expertise remained important, but should be intentional rather than required. Employees could discover experts based on specialties and connect when guidance—not navigation—was needed.',
          imageLabel: 'Specialty-based expert routing',
          imageTone: 'from-lime-400/25 via-emerald-500/15 to-teal-300/20',
        },
        {
          title: 'Project Library',
          description:
            'Real examples inspired adoption. A curated project library demonstrated how Human-Centered Design had been successfully applied across the organization.',
          imageLabel: 'Reusable proof through projects',
          imageTone: 'from-orange-400/25 via-red-400/15 to-pink-300/20',
        },
      ],
    },
    stages: [
      {
        title: 'Understanding the Problem',
        validating: 'We conducted 8 in-depth interviews with a stratified convenience sample of employees across Cox Enterprises and Cox Automotive. Our research surfaced four recurring insights.',
        question: 'Are we solving the right problem?',
        insights: [
          {
            phrase: 'Employees think in goals, not resources.',
            insight: 'They start with "I need to conduct research" rather than "I need an interview guide."',
            change: 'Navigation had to be organized around what people were trying to accomplish, not how HCD organized its own files.',
            quote: '"I always know what I\'m trying to do — run a usability study, plan a workshop — but figuring out where to even start on the platform takes longer than the actual task." — Product Manager, Cox Enterprises',
          },
          {
            phrase: "The knowledge existed. The access didn't.",
            insight: "Valuable HCD resources were fragmented across multiple internal platforms.",
            change: 'Consolidate scattered resources into a single discovery layer so employees can find what they need with ease.',
            quote: '"I\'ve checked SharePoint, searched Teams channels, even Googled it internally. I still ended up just pinging someone from the HCD team." — Business Analyst, Cox Automotive',
          },
          {
            phrase: "People weren't starting from the same place.",
            insight: 'Employees entered with different levels of HCD experience.',
            change: 'Create distinct pathways for employees at different stages of HCD maturity, from first-time learners to experienced practitioners.',
            quote: '"I went through the bootcamp two years ago. A colleague just joined with zero HCD background. We need completely different things from the same platform." — Senior Designer, Cox Media Group',
          },
          {
            phrase: 'Experts were doing triage, not strategy.',
            insight: 'Experts spent significant time answering navigation questions rather than providing strategic guidance.',
            change: 'Enable self-service navigation so employees can find what they need independently, reserving expert access for strategic guidance rather than routing questions.',
            quote: '"Half the questions I get aren\'t strategic at all — people just want to know where things live. I\'d rather spend that time on actual coaching." — HCD Lead, Cox Enterprises',
          },
        ],
      },
      {
        title: 'Organizing by intent, not resource was key to help self-serve users of varying intent to arrive here with confidence.',
        validating: 'We conducted 4 task-based think-aloud sessions to validate whether organizing resources around employee intent would improve discovery and reduce dependency on HCD experts.',
        question: 'Are we building the right product?',
        insights: [
          {
            insight: 'Participants naturally navigated using tasks and outcomes, validating that intent-based navigation aligned more closely with their mental model than resource categories.',
            change: 'Structured the homepage around five intent-driven journeys: Learn HCD, Get Certified, Request Consulting, Get Inspired, and About HCD.',
            phrase: 'Employees navigate by task, not resource type.',
            changePhrase: 'Built five intent-driven journeys into the homepage.',
          },
          {
            insight: 'Users expected the platform to guide them toward the most relevant next step instead of functioning as a static repository of information.',
            change: 'Redesigned the homepage into a decision-support layer, surfacing recommended pathways based on user goals.',
            phrase: 'The platform needs to guide, not just store.',
            changePhrase: 'Redesigned the homepage as a decision-support layer.',
          },
          {
            insight: "Participants approached the same objective through different discovery behaviors. Some browsed first, others searched immediately, while others wanted examples or expert guidance before deciding where to begin. There wasn't a single \"correct\" journey.",
            change: 'Designed multiple interconnected entry points rather than optimizing for one linear workflow, allowing users to navigate according to their preferred discovery style.',
            phrase: "There's no single right path into the content.",
            changePhrase: 'Added multiple entry points for different discovery styles.',
          },
          {
            insight: 'Participants explored multiple pathways before committing to one, comparing available options before deciding which best fit their needs.',
            change: 'Added contextual previews and pathway descriptions to support exploration and reduce uncertainty before committing to a journey.',
            phrase: 'Users compare options before committing to a path.',
            changePhrase: 'Added pathway previews to reduce commitment uncertainty.',
          },
        ],
      },
      {
        title: 'Turning feedback to features',
        validating: 'We built a high-fidelity prototype and evaluated it through expert heuristic review and task-based usability testing — examining whether clear hierarchy, consistent interactions, and strong information scent would enable employees to navigate independently.',
        question: 'Can users confidently and efficiently use the solution?',
        insights: [
          {
            insight: 'While participants understood the overall navigation, they occasionally hesitated when deciding which resource to engage with first within a section.',
            change: 'Strengthened visual hierarchy by emphasizing recommended resources, improving grouping, and increasing the prominence of primary actions.',
            phrase: "Hierarchy within sections wasn't always clear.",
            changePhrase: 'Strengthened visual hierarchy within each section.',
          },
          {
            insight: 'Users scanned multiple resource cards before identifying the one most relevant to their needs, indicating opportunities to improve information scent.',
            change: 'Refined resource cards with clearer descriptions, richer previews, and more informative metadata to support faster decision-making.',
            phrase: 'Resource cards needed stronger information scent.',
            changePhrase: 'Refined resource cards for faster, clearer decisions.',
          },
          {
            insight: 'Minor inconsistencies in layouts and interaction patterns introduced unnecessary cognitive effort during navigation.',
            change: 'Standardized components, spacing, button placement, navigation patterns, and interaction behaviors, improving predictability across the platform.',
            phrase: 'Interaction inconsistencies added cognitive friction.',
            changePhrase: 'Standardized patterns across the full platform.',
          },
          {
            insight: 'Final usability evaluation demonstrated that employees could successfully complete representative tasks with minimal friction, confirming that the intent-driven navigation model translated into an efficient and learnable experience.',
            change: 'Validated the final experience with a 90 SUS score, 94.4% task completion rate, and an average of 1.35 clicks per task, demonstrating that the core product hypothesis held true in usability testing.',
            phrase: 'The final design proved learnable and efficient.',
            changePhrase: '90 SUS · 94.4% tasks complete · 1.35 clicks per task.',
          },
        ],
      },
      {
        title: 'Polishing the Experience',
        validating: 'Interaction quality, visual hierarchy & usability',
        question: 'Can people effortlessly use the product?',
        insights: [
          {
            insight: "Participants understood the intent-based navigation, but once inside a section they weren't always sure which resource to engage with first.",
            change: 'Strengthened visual hierarchy by emphasizing recommended resources, improving grouping, and making primary CTAs more prominent.',
          },
          {
            insight: 'Users scanned multiple resource cards before deciding which one was relevant. Stronger information scent reduced unnecessary exploration.',
            change: 'Refined resource cards with clearer descriptions, improved layouts, and more informative previews.',
          },
          {
            insight: 'Each page worked well individually, but participants expected consistent interaction patterns across the experience. Minor inconsistencies slowed navigation.',
            change: "Standardized card layouts, component behavior, spacing, button placement, and page structure to align with Nielsen's usability heuristics.",
          },
        ],
      },
    ],
    audienceMapping: {
      heading: "Findings told me what people needed. They didn't tell me who was asking.",
      paragraphs: [
        "For that, I didn't just rely on what people told me in interviews — I asked the HCD team to pull their last three months of inbox requests, and read the actual pattern of what people were asking for, not just what they said they wanted in a session.",
      ],
      groupsIntro: 'Between the two, three distinct groups came into focus:',
      groups: [
        { title: 'New to HCD entirely', description: "Didn't know the program existed, let alone what it offered." },
        { title: 'HCD-aware, self-motivated', description: 'Knew about it, wanted in for their own work or career growth.' },
        { title: 'Managers and leadership', description: "Knew HCD, wanted to bring it to their team, and often wanted something custom to their group's situation." },
      ],
      closing:
        'Three groups with three different reasons for showing up meant a single, one-size-fits-all navigation structure was never going to work — which is exactly why an intent-based structure, not a resource-based one, became the design principle the rest of the hub was built around. It\'s the same idea as "people think in goals, not resources" above, just made concrete: the IA and the copy both had to start from why someone came, not what category HCD happened to file something under.',
      conceptsHeading: 'Three ideas, one real constraint',
      concepts: [
        {
          name: 'Mascot AI Agent',
          description: 'An embedded assistant guiding people through HCD resources.',
          detail: "The team didn't have the build capacity, and stakeholders didn't trust a bot they had no reason to trust yet. It also needed a hub to live inside — phase 2, not a standalone fix.",
          verdict: 'Killed — governance overhead',
          outcome: 'killed',
          sketch: '/sketch-mascot-agent.png',
          bullets: [
            { type: '-', text: 'No build capacity on the team' },
            { type: '-', text: 'Stakeholders had no reason to trust it yet' },
            { type: '-', text: 'Needed a hub to live inside — phase 2, not a standalone fix' },
          ],
        },
        {
          name: 'Smart Email Response System',
          description: 'Automating replies to routine requests.',
          detail: "It only helped people who already knew to email HCD — not the much bigger group who didn't know the team existed. Stakeholders reframed the real complaint: it wasn't about saving time, it was the monotony of answering the same five questions on repeat. Different problem, different fix.",
          verdict: 'Killed — wrong audience',
          outcome: 'killed',
          sketch: '/sketch-email-response.png',
          bullets: [
            { type: '-', text: "Only reached people who already knew to email HCD" },
            { type: '-', text: "Missed the bigger group who didn't know the team existed" },
            { type: '-', text: "Wrong problem — it was about monotony, not saving time" },
          ],
        },
        {
          name: 'Centralized Design Hub',
          description: 'One low-maintenance source of truth.',
          detail: "It solved the actual root cause, asked nothing extra of a 4-person team's bandwidth, and let visibility grow without anyone losing control of it.",
          verdict: 'Won',
          outcome: 'won',
          sketch: '/sketch-centralized-hub.png',
        },
      ],
    },
    impact: {
      heading: 'Outcomes',
      intro:
        'The final solution validated our core hypothesis: organizing HCD resources around employee intent rather than organizational structure made the experience easier to navigate, understand, and adopt. The platform transformed fragmented knowledge into a scalable, self-service experience capable of supporting 55,000+ employees while reducing dependency on manual support from the HCD team.',
      outcomes: [
        'Reduced reliance on the HCD team\'s manual resource curation workflow.',
        'Unified fragmented HCD resources into a single intent-driven experience.',
        'Created a scalable foundation for continued HCD adoption across Cox Enterprises.',
      ],
      metrics: [
        { value: '90', label: 'SUS Score', description: 'System Usability Scale', gradient: 'from-emerald-400/45 via-teal-500/20 to-transparent' },
        { value: '94.4', unit: '%', label: 'Task Success', description: 'Task completion rate', gradient: 'from-sky-500/45 via-blue-500/20 to-transparent' },
        { value: '<2', label: 'Clicks', description: 'To complete any task', gradient: 'from-fuchsia-500/40 via-rose-400/20 to-transparent' },
      ],
    },
    reflection: {
      paragraphs: [
        'The strongest product decisions came from treating HCD adoption as an enterprise service journey: employees needed clear entry points, visible next steps, and confidence that the path matched their level of maturity.',
        'The next evolution would pair this structure with AI-assisted discovery, contextual recommendations, and personalized learning paths so employees could describe a goal and be routed to the right methods, examples, and experts.',
      ],
      closing: 'Enterprise UX creates leverage when it turns scattered expertise into a system people can act on without handholding.',
    },
  },

  'Agentic Workflow for UI': {
    subtitle: 'Figma-free prototyping with absolute design system accuracy',
    summary:
      'An AI agent that reads Yodlee\'s live React component library and generates pixel-accurate interactive prototypes from natural language specs — eliminating the prototype-to-production fidelity gap.',
    tools: ['Gemini', 'Claude', 'Code', 'Bot'],
    meta: [
      { label: 'Role', value: 'AI Product Designer · Interaction Design' },
      { label: 'Timeline', value: '10 Weeks' },
      { label: 'Team', value: '2 Designers, 1 Engineer' },
      { label: 'Client', value: 'Yodlee · FIS' },
      { label: 'Scope', value: 'AI Workflow Design · Prompt Engineering · Usability Testing · Design Systems' },
    ],
    overview: {
      hook: 'Every Figma prototype is a promise you\'ll spend two sprints correcting.',
      paragraphs: [
        'Yodlee\'s design team worked fast — but their prototypes didn\'t follow them into production. Each Figma mockup diverged from the real React component library in ways that were invisible until engineers started building.',
        'The result was a hidden tax: extra review cycles, component corrections, and a growing gap between what designers showed stakeholders and what shipped.',
      ],
      quote: 'The prototype looked right. The build didn\'t.',
      reframe:
        'We reframed the challenge from "how do we make Figma more accurate" to "how do we remove Figma from the prototyping step entirely."',
      metrics: [
        {
          value: '40%',
          label: 'Time lost to corrections',
          description: 'Of engineering review time was spent correcting prototype-to-production divergences.',
        },
        {
          value: '3×',
          label: 'Slower handoff cycles',
          description: 'Design-to-build handoff took 3× longer when Figma components diverged from the live library.',
        },
        {
          value: '12+',
          label: 'Component mismatches',
          description: 'Avg. number of prop/token mismatches found per prototype during engineering review.',
        },
      ],
    },
    challenge: {
      heading: 'Why Build What Already Exists?',
      paragraphs: [
        'Yodlee maintains a mature React component library with strict design token enforcement. Every component ships with documented props, variants, and accessibility guarantees.',
        'Yet designers were rebuilding those same components in Figma — approximating tokens by eye, guessing prop values, and omitting interaction states the library already handled.',
        'The prototype was a parallel universe: visually close, semantically wrong. Engineers corrected it. Timelines slipped. The same feedback surfaced every sprint.',
        'The problem wasn\'t a skills gap or a tooling gap. It was an information gap: designers didn\'t have a fast path from design intent to production-accurate output.',
      ],
      emphasis: ['Designers weren\'t building the wrong thing.', 'They were building the right thing in the wrong place.'],
      designChallenge:
        'How might we generate design-system-accurate interactive prototypes from natural language specs — using the live component library as the source of truth instead of Figma?',
    },
    decisions: {
      heading: 'Research & Design Decisions',
      intro: 'Four recurring patterns across 8 designer and engineer interviews.',
      items: [
        { insight: 'Designers prototype in Figma, engineers prototype in code — two sources of truth by default.', decision: 'Make the React library the only prototyping surface.' },
        { insight: 'Figma component props don\'t map 1:1 to React props — translation errors accumulate invisibly.', decision: 'Generate code from the actual prop schema, not a visual approximation.' },
        { insight: 'Engineers correct prototypes during review, not before — catching divergence too late.', decision: 'Surface token and variant mismatches at generation time, not review time.' },
        { insight: 'Designers trust their eye more than docs — they\'d rather tweak than read a prop table.', decision: 'Make the agent conversational so designers describe intent, not syntax.' },
      ],
      closing: 'Every agent behavior traced directly to a pattern found in research — not a "nice to have" feature.',
    },
    solutions: {
      heading: 'How the Agent Works',
      visionParagraphs: [],
      intents: [],
      visionClosing: '',
      features: [
        {
          title: 'Natural Language Spec Input',
          description:
            'Designers describe the screen or component in plain language — "a data table with sortable columns, a loading skeleton, and an empty state" — and the agent interprets intent without requiring prop knowledge.',
          imageTone: 'from-sky-500/30 via-cyan-400/15 to-emerald-400/20',
        },
        {
          title: 'Live Library Grounding',
          description:
            'The agent reads the actual TypeScript prop schemas and design token exports from the component library at generation time, ensuring every output is guaranteed-compatible with the current library version.',
          imageTone: 'from-violet-500/25 via-blue-400/15 to-slate-100/20',
        },
        {
          title: 'Variant & State Coverage',
          description:
            'The agent automatically generates all relevant component states — hover, loading, error, empty, disabled — so prototypes reflect the full interaction surface without manual enumeration.',
          imageTone: 'from-fuchsia-500/25 via-rose-400/15 to-amber-300/20',
        },
        {
          title: 'Token-Accurate Rendering',
          description:
            'Every spacing, color, radius, and typography value is resolved from design tokens, not hardcoded. The rendered prototype and the shipped product share the same visual DNA.',
          imageTone: 'from-lime-400/25 via-emerald-500/15 to-teal-300/20',
        },
        {
          title: 'One-Click Code Export',
          description:
            'The final prototype exports as production-ready React JSX — prop-complete, token-bound, and ready for engineering review without a correction cycle.',
          imageTone: 'from-orange-400/25 via-red-400/15 to-pink-300/20',
        },
      ],
    },
    stages: [
      {
        title: 'Understanding the Problem',
        validating: 'We conducted 8 structured interviews with designers and engineers across Yodlee\'s product org to map where prototype-to-production divergence was happening and why.',
        question: 'Where does the gap actually form?',
        insights: [
          {
            phrase: 'Parallel Universes',
            insight: 'Designers and engineers maintained separate representations of the same UI — Figma on one side, React on the other — with no automated bridge between them.',
            change: 'Make the React component library the single prototyping surface, eliminating the Figma-to-code translation step entirely.',
          },
          {
            phrase: 'Invisible Drift',
            insight: 'Prop mismatches between Figma and the library accumulated silently during design, only surfacing in engineering review — too late to fix cheaply.',
            change: 'Surface component and token mismatches at generation time, before any code leaves the agent.',
          },
          {
            phrase: 'State Gaps',
            insight: 'Prototypes routinely omitted loading, error, and empty states because building them in Figma was time-consuming. Engineers had to infer intended behavior.',
            change: 'Generate all relevant interaction states automatically, making full state coverage the default rather than an afterthought.',
          },
          {
            phrase: 'Trust Deficit',
            insight: 'Designers were skeptical that AI-generated code would match their visual intent. They needed to verify output quickly without reading JSX.',
            change: 'Build a live browser preview directly in the agent workflow so designers can see rendered output before accepting it.',
          },
        ],
      },
      {
        title: 'Validating the Strategy',
        validating: 'We ran 4 think-aloud sessions asking designers to prototype a real screen using the agent, then compared the output against a Figma equivalent in an engineering review.',
        question: 'Can the agent match designer intent?',
        insights: [
          {
            insight: 'Designers described intent fluently in natural language but struggled when asked to specify component names or prop values — confirming that the conversational input model was the right abstraction.',
            change: 'Refined the prompt parser to interpret visual intent rather than requiring component vocabulary.',
            phrase: 'Designers speak intent, not props.',
            changePhrase: 'Shifted input model from component-first to intent-first.',
          },
          {
            insight: 'The live preview was the most trusted signal. Designers stopped doubting the output once they could see it rendering in a real browser with real tokens.',
            change: 'Moved the preview pane to a persistent sidebar so designers could see changes in real time rather than waiting for an explicit render step.',
            phrase: 'Seeing is trusting.',
            changePhrase: 'Made live preview persistent and always visible.',
          },
          {
            insight: 'Engineers reviewing agent-generated prototypes flagged 90% fewer prop corrections than Figma-originated handoffs, but still wanted to understand why specific components were chosen.',
            change: 'Added a component reasoning panel showing which library components were selected and why, building transparency into the agent\'s decision process.',
            phrase: 'Engineers want to understand, not just accept.',
            changePhrase: 'Added component reasoning panel for engineer trust.',
          },
          {
            insight: 'Three of four sessions revealed that designers wanted to iterate on the generated prototype conversationally — describing changes in plain language rather than adjusting props manually.',
            change: 'Built a conversational refinement loop so designers could describe changes and have the agent update existing output rather than regenerating from scratch.',
            phrase: 'Iteration is also conversational.',
            changePhrase: 'Enabled conversational refinement of existing output.',
          },
        ],
      },
      {
        title: 'Refining the Experience',
        validating: 'We evaluated the refined agent through an expert heuristic review and a second round of usability testing, focusing on output quality, designer trust, and end-to-end workflow time.',
        question: 'Is the output good enough to ship to engineering?',
        insights: [
          {
            insight: 'Designers paused before accepting generated code even when the preview looked correct — they wanted one more confirmation that tokens were right before handing off.',
            change: 'Added a token diff view showing exactly which design tokens were applied and where, giving designers a fast verification path without reading raw JSX.',
            phrase: 'Acceptance needed a verification signal.',
            changePhrase: 'Added token diff view for pre-handoff confidence.',
          },
          {
            insight: 'Complex multi-component layouts occasionally produced components in the wrong visual order because the agent assembled them sequentially rather than spatially.',
            change: 'Introduced a layout intent pass where the agent reasons about spatial relationships before selecting components, reducing assembly-order errors significantly.',
            phrase: 'Layout requires spatial reasoning, not just selection.',
            changePhrase: 'Added spatial reasoning before component selection.',
          },
          {
            insight: 'Designers who used the agent for a second session were significantly faster — they had learned to describe intent more precisely, reducing refinement back-and-forth.',
            change: 'Built a personal prompt history so designers could reuse and adapt successful descriptions from previous sessions, compounding the learning effect.',
            phrase: 'Experience with the agent compounds quickly.',
            changePhrase: 'Added prompt history to accelerate repeat workflows.',
          },
          {
            insight: 'Final usability evaluation confirmed that designers could produce engineer-ready prototypes 3× faster than the Figma workflow, with zero prop corrections flagged in engineering review.',
            change: 'Validated the end-to-end workflow: natural language input → live preview → token diff → one-click export, with a 94% designer satisfaction score across 8 participants.',
            phrase: '3× faster. Zero correction cycles.',
            changePhrase: '94% satisfaction · 0 prop corrections · 3× speed.',
          },
        ],
      },
    ],
    impact: {
      heading: 'Outcomes',
      intro:
        'This agentic workflow eliminated the prototype-to-production fidelity gap by making the live React component library the only prototyping surface. Designers ship faster, engineers review less, and the design system gets stronger with every prototype generated.',
      outcomes: [
        'Eliminated Figma-to-code prop correction cycles from the engineering review process.',
        'Reduced prototype delivery time from days to under an hour for standard screens.',
        'Strengthened design system adoption — every agent-generated prototype is a validated component usage.',
      ],
      metrics: [
        { value: '3×', label: 'Faster Prototyping', description: 'vs. Figma-based workflow end-to-end', gradient: 'from-emerald-400/45 via-teal-500/20 to-transparent' },
        { value: '94', unit: '%', label: 'Designer Satisfaction', description: 'Across usability testing sessions', gradient: 'from-sky-500/45 via-blue-500/20 to-transparent' },
        { value: '0', label: 'Prop Corrections', description: 'Flagged in final engineering reviews', gradient: 'from-violet-500/40 via-fuchsia-400/20 to-transparent' },
      ],
    },
    reflection: {
      paragraphs: [
        'The hardest design problem wasn\'t the AI — it was trust. Designers needed to feel confident handing AI-generated code to engineers, which meant the agent had to be transparent about its decisions, not just fast.',
        'That pushed us toward showing reasoning at every step: which component was selected and why, which tokens were applied, what the preview actually renders. The agent became more trustworthy when it stopped hiding its work.',
        'The deeper insight: AI-powered design tools don\'t replace craft. They remove the translation layer between intent and execution — the part that was never design in the first place.',
        'The next evolution would pair the agent with a semantic design token graph so it can reason about brand guidelines, accessibility constraints, and component relationship rules — not just prop schemas.',
      ],
      closing: 'The best AI tools don\'t make designers faster. They make the gap between thinking and shipping disappear.',
    },
  },
};
