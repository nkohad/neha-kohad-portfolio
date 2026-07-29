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
      { label: 'Scope', value: 'Product Strategy · UX Research · Information Architecture · Interaction Design' },
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
      heading: 'From scattered resources to guided action',
      paragraphs: [
        'Employees approached Human-Centered Design with very different goals. Some wanted to learn the fundamentals. Others needed help planning research, facilitating workshops, or finding reusable templates.',
        "The existing experience assumed everyone already understood the organization's structure. When they didn't, discovery failed.",
        'Every failed search became another Teams message or email to the HCD team.',
      ],
      emphasis: ["The problem wasn't missing information.", 'It was missing guidance.'],
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
        validating: 'User needs & organizational pain points',
        question: 'Are we solving the right problem?',
        insights: [
          {
            phrase: 'Goal Logic',
            insight: 'Employees think in goals, not resources. They start with "I need to conduct research" rather than "I need an interview guide."',
            change: 'Design navigation around what employees are trying to accomplish, not how the organization categorizes its resources.',
            quote: '"I always know what I\'m trying to do — run a usability study, plan a workshop — but figuring out where to even start on the platform takes longer than the actual task." — Product Manager, Cox Enterprises',
          },
          {
            phrase: 'Hidden Access',
            insight: "Knowledge existed, but discoverability didn't. Valuable HCD resources were fragmented across multiple internal platforms.",
            change: 'Consolidate scattered resources into a single discovery layer so employees can find what they need without knowing where to look.',
            quote: '"I\'ve checked SharePoint, searched Teams channels, even Googled it internally. I still ended up just pinging someone from the HCD team." — Business Analyst, Cox Automotive',
          },
          {
            phrase: 'Varied Maturity',
            insight: 'Employees entered with different levels of HCD experience.',
            change: 'Create distinct pathways for employees at different stages of HCD maturity, from first-time learners to experienced practitioners.',
            quote: '"I went through the bootcamp two years ago. A colleague just joined with zero HCD background. We need completely different things from the same platform." — Senior Designer, Cox Media Group',
          },
          {
            phrase: 'Manual Support',
            insight: 'Experts spent significant time answering navigation questions rather than providing strategic guidance.',
            change: 'Enable self-service navigation so employees can find what they need independently, reserving expert access for strategic guidance rather than routing questions.',
            quote: '"Half the questions I get aren\'t strategic at all — people just want to know where things live. I\'d rather spend that time on actual coaching." — HCD Lead, Cox Enterprises',
          },
        ],
      },
      {
        title: 'Validating the Product Strategy',
        validating: 'Organizing resources around employee intent will improve discovery and reduce dependency on HCD experts.',
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
        title: 'Refining the Experience',
        validating: 'Clear hierarchy, consistent interactions, and strong information scent will enable employees to confidently navigate independently.',
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
        'The Cox HCD Resource Hub became less about launching another internal site and more about reducing the operational cost of knowledge transfer.',
        'The strongest product decisions came from treating HCD adoption as an enterprise service journey: employees needed clear entry points, visible next steps, and confidence that the path matched their level of maturity.',
        'That framing pushed the work beyond visual polish. It forced us to design for governance, repeatable discovery, expert capacity, and the way a 55,000-person organization actually absorbs new practices.',
        'The next evolution would pair this structure with AI-assisted discovery, contextual recommendations, and personalized learning paths so employees could describe a goal and be routed to the right methods, examples, and experts.',
      ],
      closing: 'Enterprise UX creates leverage when it turns scattered expertise into a system people can act on without handholding.',
    },
  },
};
