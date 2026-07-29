export interface CaseStudyContent {
  subtitle: string;
  summary: string;
  meta: { label: string; value: string }[];
  overview: {
    hook: string;
    paragraphs: string[];
    quote: string;
    reframe: string;
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
    features: { title: string; description: string }[];
  };
  impact: {
    heading: string;
    intro: string;
    outcomes: string[];
  };
  reflection: {
    paragraphs: string[];
    closing: string;
  };
}

// Keyed by project title (src/App.tsx PROJECTS). Projects without an entry
// here fall back to the generic placeholder content in CaseStudyModal.
export const CASE_STUDY_CONTENT: Record<string, CaseStudyContent> = {
  'Cox Design Hub': {
    subtitle: 'Designing the Front Door to Human-Centered Design',
    summary:
      'Helping 55,000+ employees discover, learn, and apply Human-Centered Design through a self-service enterprise knowledge platform.',
    meta: [
      { label: 'Role', value: 'AI Product Designer · UX Research' },
      { label: 'Timeline', value: '15 Weeks' },
      { label: 'Team', value: '4 Designers' },
      { label: 'Client', value: 'Cox Enterprises' },
      { label: 'Scope', value: 'Product Strategy · UX Research · Information Architecture · Interaction Design' },
    ],
    overview: {
      hook: "Most organizations don't have a knowledge problem—they have a discovery problem.",
      paragraphs: [
        'When we partnered with Cox Enterprises, the Human-Centered Design (HCD) team had already built an ecosystem of workshops, certifications, templates, research methods, project examples, and coaching opportunities. More than 1,000 employees had participated in HCD initiatives across an organization of 55,000+ people.',
        'Despite that investment, employees continued asking the same question:',
      ],
      quote: 'Where do I start?',
      reframe:
        "Resources were scattered across multiple internal systems with inconsistent navigation and terminology. Employees often depended on the HCD team to manually point them toward the right templates, workshops, or experts. We reframed the challenge from building a resource website to designing a product that could scale organizational knowledge.",
    },
    challenge: {
      heading: 'The Challenge',
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
      heading: 'The Solution',
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
        },
        {
          title: 'Progressive Learning Pathways',
          description:
            'Employees entered with different levels of experience. We created guided learning journeys that helped beginners build confidence while allowing experienced practitioners to quickly access advanced resources.',
        },
        {
          title: 'Unified Knowledge Search',
          description:
            'Rather than forcing employees to search across multiple internal systems, we designed a single discovery experience spanning templates, workshops, methods, projects, and learning materials.',
        },
        {
          title: 'Expert Directory',
          description:
            'Human expertise remained important, but should be intentional rather than required. Employees could discover experts based on specialties and connect when guidance—not navigation—was needed.',
        },
        {
          title: 'Project Library',
          description:
            'Real examples inspired adoption. A curated project library demonstrated how Human-Centered Design had been successfully applied across the organization.',
        },
      ],
    },
    impact: {
      heading: 'Impact',
      intro:
        'The project transformed a request for a centralized website into a strategy for scaling Human-Centered Design across the organization. Expected outcomes included:',
      outcomes: [
        'Reduced dependency on manual support',
        'Faster resource discovery',
        'Greater visibility of HCD initiatives',
        'Increased confidence for first-time practitioners',
        'Better utilization of expert time',
      ],
    },
    reflection: {
      paragraphs: [
        'This project changed how I think about enterprise products.',
        'I started by believing we were designing a website. I finished realizing we were designing a knowledge system.',
        "The best enterprise products don't ask people to understand the organization. They adapt the organization to the way people naturally think.",
        'Looking back, I see clear opportunities to extend this vision with AI-powered conversational discovery, contextual recommendations, and personalized learning experiences.',
      ],
      closing: 'Good enterprise software helps people complete tasks. Great enterprise software helps organizations scale expertise.',
    },
  },
};
