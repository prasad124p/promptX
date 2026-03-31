export type PromptAccess = "free" | "premium";

export type PromptComment = {
  id: number;
  author: string;
  message: string;
  createdLabel: string;
};

export type Prompt = {
  id: number;
  slug: string;
  title: string;
  description: string;
  category: string;
  rating: number;
  sales: number;
  creator: string;
  access: PromptAccess;
  excerpt: string;
  likes: number;
  comments: PromptComment[];
};

const PROMPT_LIKES_STORAGE_KEY = "promptx.promptLikes";
const PROMPT_SAVES_STORAGE_KEY = "promptx.savedPrompts";

export const prompts: Prompt[] = [
  {
    id: 1,
    slug: "seo-blog-post-generator",
    title: "SEO Blog Post Generator",
    description: "Generate SEO-optimized blog posts with engaging content.",
    category: "Writing",
    rating: 4.8,
    sales: 1234,
    creator: "Sarah Johnson",
    access: "free",
    excerpt:
      "Build article outlines, search-intent hooks, and keyword-friendly intros in one pass.",
    likes: 182,
    comments: [
      {
        id: 1,
        author: "Maya",
        message: "Clean structure and very usable for long-form article drafts.",
        createdLabel: "2h ago",
      },
      {
        id: 2,
        author: "Dev",
        message: "The hook and outline instructions save a lot of editing time.",
        createdLabel: "Yesterday",
      },
    ],
  },
  {
    id: 2,
    slug: "logo-design-assistant",
    title: "Logo Design Assistant",
    description: "Create unique logo concepts with detailed art direction.",
    category: "Design",
    rating: 4.9,
    sales: 856,
    creator: "Mike Chen",
    access: "free",
    excerpt:
      "Turn a brand brief into multiple logo directions, moodboards, and typography ideas.",
    likes: 143,
    comments: [
      {
        id: 3,
        author: "Ariana",
        message: "Really helpful for getting out of the blank-canvas phase.",
        createdLabel: "5h ago",
      },
    ],
  },
  {
    id: 3,
    slug: "python-code-optimizer",
    title: "Python Code Optimizer",
    description: "Refactor Python code for readability, speed, and maintainability.",
    category: "Coding",
    rating: 4.7,
    sales: 632,
    creator: "Alex Kumar",
    access: "free",
    excerpt:
      "Spot bottlenecks, simplify logic, and propose cleaner implementations with test notes.",
    likes: 126,
    comments: [
      {
        id: 4,
        author: "Soham",
        message: "Nice prompt when you want refactor suggestions with reasoning.",
        createdLabel: "Today",
      },
    ],
  },
  {
    id: 4,
    slug: "social-media-caption-writer",
    title: "Social Media Caption Writer",
    description: "Craft polished captions for Instagram, LinkedIn, and X.",
    category: "Marketing",
    rating: 4.6,
    sales: 2145,
    creator: "Emma Davis",
    access: "free",
    excerpt:
      "Generate platform-aware captions, CTA options, and tone variations for quick publishing.",
    likes: 211,
    comments: [
      {
        id: 5,
        author: "Neha",
        message: "Good variety of CTA tones without sounding repetitive.",
        createdLabel: "1d ago",
      },
    ],
  },
  {
    id: 5,
    slug: "email-marketing-template",
    title: "Email Marketing Template",
    description: "Draft email campaigns with stronger hooks and cleaner structure.",
    category: "Marketing",
    rating: 4.8,
    sales: 987,
    creator: "David Lee",
    access: "free",
    excerpt:
      "Create welcome, nurture, and launch emails with consistent messaging and subject lines.",
    likes: 167,
    comments: [
      {
        id: 6,
        author: "Chris",
        message: "The email flow logic is what makes this prompt useful.",
        createdLabel: "3d ago",
      },
    ],
  },
  {
    id: 6,
    slug: "story-plot-generator",
    title: "Story Plot Generator",
    description: "Generate plot arcs, twists, and stronger character setups.",
    category: "Writing",
    rating: 4.5,
    sales: 445,
    creator: "Lisa Park",
    access: "free",
    excerpt:
      "Outline story beats, emotional turns, and character motivations without losing momentum.",
    likes: 98,
    comments: [
      {
        id: 7,
        author: "Riya",
        message: "Helpful for escaping plot holes when drafting fiction.",
        createdLabel: "4d ago",
      },
    ],
  },
  {
    id: 7,
    slug: "react-component-builder",
    title: "React Component Builder",
    description: "Design polished React UI components with implementation guidance.",
    category: "Coding",
    rating: 5,
    sales: 128,
    creator: "Priya Nair",
    access: "premium",
    excerpt:
      "Reserved for the top 1% premium collection with deeper implementation and QA prompts.",
    likes: 59,
    comments: [
      {
        id: 8,
        author: "Ishan",
        message: "Very strong for component scaffolding and edge-case thinking.",
        createdLabel: "Last week",
      },
    ],
  },
  {
    id: 8,
    slug: "linkedin-thought-leadership-writer",
    title: "LinkedIn Thought Leadership Writer",
    description: "Turn rough ideas into polished LinkedIn posts with strong hooks and authority.",
    category: "Marketing",
    rating: 4.7,
    sales: 764,
    creator: "Anika Roy",
    access: "free",
    excerpt:
      "Shape founder notes, industry takes, and carousel copy into posts that feel credible and conversational.",
    likes: 132,
    comments: [
      {
        id: 9,
        author: "Rohan",
        message: "Strong hook framework for professional posts.",
        createdLabel: "6h ago",
      },
    ],
  },
  {
    id: 9,
    slug: "product-launch-announcement-kit",
    title: "Product Launch Announcement Kit",
    description: "Write launch messaging for product drops, changelogs, and waitlist reveals.",
    category: "Marketing",
    rating: 4.8,
    sales: 1192,
    creator: "Jules Carter",
    access: "free",
    excerpt:
      "Generate headlines, launch emails, social posts, and press-style summaries in a single workflow.",
    likes: 188,
    comments: [
      {
        id: 10,
        author: "Mina",
        message: "Useful when a release needs copy fast across channels.",
        createdLabel: "1d ago",
      },
    ],
  },
  {
    id: 10,
    slug: "brand-voice-calibrator",
    title: "Brand Voice Calibrator",
    description: "Define and reuse a brand voice that stays consistent across campaigns.",
    category: "Writing",
    rating: 4.6,
    sales: 553,
    creator: "Noah Bennett",
    access: "free",
    excerpt:
      "Translate examples and tone references into a reusable voice system with dos, don'ts, and sample rewrites.",
    likes: 109,
    comments: [
      {
        id: 11,
        author: "Lina",
        message: "Helpful for making style guidelines more concrete.",
        createdLabel: "Today",
      },
    ],
  },
  {
    id: 11,
    slug: "landing-page-copy-doctor",
    title: "Landing Page Copy Doctor",
    description: "Improve landing page headlines, sections, CTAs, and conversion clarity.",
    category: "Writing",
    rating: 4.9,
    sales: 1451,
    creator: "Karan Mehta",
    access: "free",
    excerpt:
      "Diagnose weak messaging, sharpen value propositions, and rebuild hero-to-CTA flow for higher clarity.",
    likes: 214,
    comments: [
      {
        id: 12,
        author: "Tia",
        message: "The headline rewrites are especially strong.",
        createdLabel: "3h ago",
      },
    ],
  },
  {
    id: 12,
    slug: "newsletter-issue-builder",
    title: "Newsletter Issue Builder",
    description: "Draft editorial newsletters with sections, transitions, and sharper takeaways.",
    category: "Writing",
    rating: 4.5,
    sales: 482,
    creator: "Ava Smith",
    access: "free",
    excerpt:
      "Turn scattered links and notes into a clean newsletter issue with a strong opening and curated flow.",
    likes: 87,
    comments: [
      {
        id: 13,
        author: "Pooja",
        message: "Nice for weekly curation emails.",
        createdLabel: "2d ago",
      },
    ],
  },
  {
    id: 13,
    slug: "motion-graphic-brief-generator",
    title: "Motion Graphic Brief Generator",
    description: "Create animation briefs with scene direction, pacing, and visual notes.",
    category: "Design",
    rating: 4.8,
    sales: 673,
    creator: "Nikhil Bose",
    access: "free",
    excerpt:
      "Map a rough concept into shots, transitions, timing cues, and a cohesive art direction for motion teams.",
    likes: 141,
    comments: [
      {
        id: 14,
        author: "Aya",
        message: "Great for speeding up first-pass motion briefs.",
        createdLabel: "5h ago",
      },
    ],
  },
  {
    id: 14,
    slug: "ux-microcopy-workshop",
    title: "UX Microcopy Workshop",
    description: "Write clearer product UI text for forms, toasts, empty states, and onboarding.",
    category: "Design",
    rating: 4.7,
    sales: 728,
    creator: "Maria Lopez",
    access: "free",
    excerpt:
      "Refine product messaging with short, human-friendly alternatives that keep flows understandable.",
    likes: 134,
    comments: [
      {
        id: 15,
        author: "Devika",
        message: "Useful for tightening product wording quickly.",
        createdLabel: "Yesterday",
      },
    ],
  },
  {
    id: 15,
    slug: "dashboard-ui-critic",
    title: "Dashboard UI Critic",
    description: "Review analytics dashboards for hierarchy, spacing, and scanability.",
    category: "Design",
    rating: 4.6,
    sales: 611,
    creator: "Jordan Pike",
    access: "free",
    excerpt:
      "Spot clutter, suggest cleaner modules, and improve the flow from overview metrics to deeper insight blocks.",
    likes: 118,
    comments: [
      {
        id: 16,
        author: "Sana",
        message: "Good at catching hierarchy problems in admin screens.",
        createdLabel: "4d ago",
      },
    ],
  },
  {
    id: 16,
    slug: "poster-concept-machine",
    title: "Poster Concept Machine",
    description: "Generate bold poster directions with layout systems, type, and mood cues.",
    category: "Design",
    rating: 4.9,
    sales: 803,
    creator: "Kai Morgan",
    access: "free",
    excerpt:
      "Push past safe visual ideas and create memorable poster concepts with compositional clarity.",
    likes: 193,
    comments: [
      {
        id: 17,
        author: "Yash",
        message: "Very fun for exploring multiple visual directions.",
        createdLabel: "1d ago",
      },
    ],
  },
  {
    id: 17,
    slug: "figma-component-namer",
    title: "Figma Component Namer",
    description: "Create cleaner naming systems for components, variants, and design tokens.",
    category: "Design",
    rating: 4.4,
    sales: 334,
    creator: "Helen Park",
    access: "free",
    excerpt:
      "Turn messy component sets into a naming convention that scales across teams and libraries.",
    likes: 72,
    comments: [
      {
        id: 18,
        author: "Neil",
        message: "Practical prompt for tidying a design system.",
        createdLabel: "3d ago",
      },
    ],
  },
  {
    id: 18,
    slug: "typescript-bug-hunter",
    title: "TypeScript Bug Hunter",
    description: "Find type issues, risky assumptions, and brittle code paths in TS projects.",
    category: "Coding",
    rating: 4.8,
    sales: 912,
    creator: "Farah Khan",
    access: "free",
    excerpt:
      "Audit a file or module for weak typing, runtime risk, and safer refactor options with examples.",
    likes: 176,
    comments: [
      {
        id: 19,
        author: "Ira",
        message: "Useful when strict mode exposes a mess.",
        createdLabel: "7h ago",
      },
    ],
  },
  {
    id: 19,
    slug: "sql-query-optimizer",
    title: "SQL Query Optimizer",
    description: "Refine SQL queries for performance, readability, and better indexing choices.",
    category: "Coding",
    rating: 4.7,
    sales: 689,
    creator: "Owen Price",
    access: "free",
    excerpt:
      "Break down slow queries, identify joins or scans, and propose clearer or faster alternatives.",
    likes: 149,
    comments: [
      {
        id: 20,
        author: "Gita",
        message: "Good prompt for debugging ugly reporting queries.",
        createdLabel: "2d ago",
      },
    ],
  },
  {
    id: 20,
    slug: "api-error-debugger",
    title: "API Error Debugger",
    description: "Diagnose backend request failures with hypotheses, checks, and likely fixes.",
    category: "Coding",
    rating: 4.9,
    sales: 1056,
    creator: "Ravi Patel",
    access: "free",
    excerpt:
      "Walk through logs, payloads, and edge cases to find the most probable cause of API failures.",
    likes: 205,
    comments: [
      {
        id: 21,
        author: "Mert",
        message: "Helps structure debugging instead of guessing.",
        createdLabel: "8h ago",
      },
    ],
  },
  {
    id: 21,
    slug: "nodejs-architecture-reviewer",
    title: "Node.js Architecture Reviewer",
    description: "Review backend structure for scalability, layering, and maintainability.",
    category: "Coding",
    rating: 4.6,
    sales: 544,
    creator: "Elena Cruz",
    access: "free",
    excerpt:
      "Surface coupling, module boundaries, and refactor opportunities in an Express or Node service.",
    likes: 116,
    comments: [
      {
        id: 22,
        author: "Sam",
        message: "Strong for discussing service boundaries.",
        createdLabel: "Yesterday",
      },
    ],
  },
  {
    id: 22,
    slug: "react-state-simplifier",
    title: "React State Simplifier",
    description: "Reduce tangled component state and make UI logic easier to reason about.",
    category: "Coding",
    rating: 4.8,
    sales: 741,
    creator: "Diya Kapoor",
    access: "free",
    excerpt:
      "Find redundant state, derive simpler flows, and suggest cleaner event-driven patterns for React.",
    likes: 164,
    comments: [
      {
        id: 23,
        author: "Harsh",
        message: "Nice when a component gets too many booleans.",
        createdLabel: "4h ago",
      },
    ],
  },
  {
    id: 23,
    slug: "test-case-generator-pro",
    title: "Test Case Generator Pro",
    description: "Generate practical unit, integration, and edge-case test scenarios from code.",
    category: "Coding",
    rating: 4.7,
    sales: 801,
    creator: "Ben Ortiz",
    access: "free",
    excerpt:
      "Turn business rules and source code into targeted test ideas with missing-edge-case coverage.",
    likes: 153,
    comments: [
      {
        id: 24,
        author: "Amit",
        message: "Great for widening test coverage fast.",
        createdLabel: "5d ago",
      },
    ],
  },
  {
    id: 24,
    slug: "cold-email-angle-finder",
    title: "Cold Email Angle Finder",
    description: "Generate stronger outreach angles for founders, agencies, and sales teams.",
    category: "Marketing",
    rating: 4.5,
    sales: 463,
    creator: "Zara West",
    access: "free",
    excerpt:
      "Produce hooks, personalization angles, and CTA variants that avoid sounding generic or spammy.",
    likes: 95,
    comments: [
      {
        id: 25,
        author: "Adeel",
        message: "Useful for outbound experiments.",
        createdLabel: "2d ago",
      },
    ],
  },
  {
    id: 25,
    slug: "seo-content-brief-builder",
    title: "SEO Content Brief Builder",
    description: "Create SEO content briefs with intent, structure, and coverage recommendations.",
    category: "Marketing",
    rating: 4.8,
    sales: 978,
    creator: "Meera Joshi",
    access: "free",
    excerpt:
      "Build stronger briefs with search intent, outline suggestions, FAQ ideas, and competitive angles.",
    likes: 169,
    comments: [
      {
        id: 26,
        author: "Ken",
        message: "Helpful before handing work to writers.",
        createdLabel: "1d ago",
      },
    ],
  },
  {
    id: 26,
    slug: "ad-creative-variant-generator",
    title: "Ad Creative Variant Generator",
    description: "Produce multiple paid ad angles, hooks, and copy variations from one brief.",
    category: "Marketing",
    rating: 4.7,
    sales: 723,
    creator: "Sophia Reed",
    access: "free",
    excerpt:
      "Stretch one campaign concept into many testable ad directions with clearer audience positioning.",
    likes: 146,
    comments: [
      {
        id: 27,
        author: "Rita",
        message: "Very useful for performance creative batches.",
        createdLabel: "6d ago",
      },
    ],
  },
  {
    id: 27,
    slug: "customer-persona-distiller",
    title: "Customer Persona Distiller",
    description: "Summarize messy user research into focused personas and buying motivations.",
    category: "Marketing",
    rating: 4.6,
    sales: 538,
    creator: "Theo Martin",
    access: "free",
    excerpt:
      "Cluster pain points, motivations, and objections into persona snapshots that are easier to act on.",
    likes: 112,
    comments: [
      {
        id: 28,
        author: "Nora",
        message: "Good for condensing a lot of interview notes.",
        createdLabel: "3d ago",
      },
    ],
  },
  {
    id: 28,
    slug: "screenplay-scene-expander",
    title: "Screenplay Scene Expander",
    description: "Develop screenplay scenes with subtext, tension, and stronger progression.",
    category: "Writing",
    rating: 4.7,
    sales: 407,
    creator: "Leo Grant",
    access: "free",
    excerpt:
      "Take a short scene idea and expand it into beats, tension shifts, and sharper emotional payoff.",
    likes: 101,
    comments: [
      {
        id: 29,
        author: "Ivy",
        message: "Helps turn rough drafts into fuller scenes.",
        createdLabel: "4d ago",
      },
    ],
  },
  {
    id: 29,
    slug: "case-study-storyteller",
    title: "Case Study Storyteller",
    description: "Turn project outcomes into convincing customer case studies with narrative flow.",
    category: "Writing",
    rating: 4.9,
    sales: 852,
    creator: "Rina Shah",
    access: "free",
    excerpt:
      "Frame customer context, actions, and results into a stronger story that still feels concrete.",
    likes: 186,
    comments: [
      {
        id: 30,
        author: "Paul",
        message: "Makes B2B results read less dry.",
        createdLabel: "11h ago",
      },
    ],
  },
  {
    id: 30,
    slug: "podcast-episode-outline-builder",
    title: "Podcast Episode Outline Builder",
    description: "Outline podcast episodes with segments, transitions, and memorable takeaways.",
    category: "Writing",
    rating: 4.4,
    sales: 318,
    creator: "Clara Dean",
    access: "free",
    excerpt:
      "Organize ideas, stories, and talking points into a tighter recording outline with listener payoff.",
    likes: 68,
    comments: [
      {
        id: 31,
        author: "Vik",
        message: "Simple and useful for planning solo episodes.",
        createdLabel: "2d ago",
      },
    ],
  },
  {
    id: 31,
    slug: "headline-variation-engine",
    title: "Headline Variation Engine",
    description: "Generate stronger headlines for ads, blogs, landing pages, and product launches.",
    category: "Writing",
    rating: 4.8,
    sales: 990,
    creator: "Grace Lin",
    access: "free",
    excerpt:
      "Explore multiple headline angles with different emotional triggers, clarity levels, and tones.",
    likes: 177,
    comments: [
      {
        id: 32,
        author: "Jai",
        message: "Fast way to get unstuck on hero copy.",
        createdLabel: "1d ago",
      },
    ],
  },
  {
    id: 32,
    slug: "book-cover-direction-finder",
    title: "Book Cover Direction Finder",
    description: "Develop book cover directions with typography, symbolism, and market positioning.",
    category: "Design",
    rating: 4.7,
    sales: 566,
    creator: "Natalie Stone",
    access: "free",
    excerpt:
      "Translate a manuscript theme into distinct cover concepts with style cues and commercial fit.",
    likes: 123,
    comments: [
      {
        id: 33,
        author: "Eshan",
        message: "Useful early in the concept stage.",
        createdLabel: "5d ago",
      },
    ],
  },
  {
    id: 33,
    slug: "mobile-app-onboarding-fixer",
    title: "Mobile App Onboarding Fixer",
    description: "Improve onboarding steps, reduce friction, and clarify first-time user value.",
    category: "Design",
    rating: 4.8,
    sales: 677,
    creator: "Olivia Hart",
    access: "free",
    excerpt:
      "Review onboarding screens and rewrite the flow to reduce hesitation and improve clarity at each step.",
    likes: 147,
    comments: [
      {
        id: 34,
        author: "Rey",
        message: "Good at surfacing first-run friction.",
        createdLabel: "Yesterday",
      },
    ],
  },
  {
    id: 34,
    slug: "design-system-token-helper",
    title: "Design System Token Helper",
    description: "Create better token naming and usage patterns for scalable design systems.",
    category: "Design",
    rating: 4.5,
    sales: 389,
    creator: "Amber Scott",
    access: "free",
    excerpt:
      "Build token groups for spacing, type, color, and states in a way that stays maintainable.",
    likes: 79,
    comments: [
      {
        id: 35,
        author: "Mohan",
        message: "Nice helper for early system cleanup.",
        createdLabel: "3d ago",
      },
    ],
  },
  {
    id: 35,
    slug: "python-data-cleanup-assistant",
    title: "Python Data Cleanup Assistant",
    description: "Clean messy datasets with transformation ideas, validation rules, and QA checks.",
    category: "Coding",
    rating: 4.6,
    sales: 512,
    creator: "Sofia Ahmed",
    access: "free",
    excerpt:
      "Suggest preprocessing steps, null handling, and sanity checks for untidy CSV or dataframe workflows.",
    likes: 111,
    comments: [
      {
        id: 36,
        author: "Jen",
        message: "Practical for data prep tasks.",
        createdLabel: "4d ago",
      },
    ],
  },
  {
    id: 36,
    slug: "code-review-response-helper",
    title: "Code Review Response Helper",
    description: "Write thoughtful PR responses and resolve feedback with clearer reasoning.",
    category: "Coding",
    rating: 4.7,
    sales: 458,
    creator: "Marcus Lee",
    access: "free",
    excerpt:
      "Turn scattered review comments into a structured response plan with tradeoffs and update notes.",
    likes: 104,
    comments: [
      {
        id: 37,
        author: "Pritam",
        message: "Surprisingly helpful for calmer PR conversations.",
        createdLabel: "8d ago",
      },
    ],
  },
  {
    id: 37,
    slug: "feature-spec-clarifier",
    title: "Feature Spec Clarifier",
    description: "Turn vague product requests into sharper implementation-ready feature specs.",
    category: "Coding",
    rating: 4.9,
    sales: 1024,
    creator: "Hannah Cole",
    access: "free",
    excerpt:
      "Extract assumptions, edge cases, acceptance criteria, and risks before development starts.",
    likes: 216,
    comments: [
      {
        id: 38,
        author: "Dinesh",
        message: "Excellent for turning chaos into a plan.",
        createdLabel: "10h ago",
      },
    ],
  },
  {
    id: 38,
    slug: "conversion-funnel-analyst",
    title: "Conversion Funnel Analyst",
    description: "Diagnose drop-off points and optimize messaging across your signup funnel.",
    category: "Marketing",
    rating: 4.8,
    sales: 864,
    creator: "Arun Gill",
    access: "free",
    excerpt:
      "Map user hesitation across the funnel and suggest experiments in copy, structure, and CTA timing.",
    likes: 171,
    comments: [
      {
        id: 39,
        author: "Mika",
        message: "Good lens for reviewing funnel friction.",
        createdLabel: "12h ago",
      },
    ],
  },
  {
    id: 39,
    slug: "ugc-ad-script-writer",
    title: "UGC Ad Script Writer",
    description: "Write UGC-style ad scripts that sound more human and less overproduced.",
    category: "Marketing",
    rating: 4.6,
    sales: 648,
    creator: "Brook Taylor",
    access: "free",
    excerpt:
      "Create short ad scripts with natural hooks, product framing, and creator-style delivery cues.",
    likes: 128,
    comments: [
      {
        id: 40,
        author: "Hema",
        message: "Solid starting point for creator briefs.",
        createdLabel: "2d ago",
      },
    ],
  },
  {
    id: 40,
    slug: "pricing-page-rewriter",
    title: "Pricing Page Rewriter",
    description: "Improve pricing page clarity, package differentiation, and CTA confidence.",
    category: "Marketing",
    rating: 4.7,
    sales: 717,
    creator: "Dylan Brooks",
    access: "free",
    excerpt:
      "Rewrite plans, features, and FAQs so pricing pages feel clearer, more trustworthy, and easier to compare.",
    likes: 138,
    comments: [
      {
        id: 41,
        author: "Suri",
        message: "Very handy for simplifying package language.",
        createdLabel: "3h ago",
      },
    ],
  },
  {
    id: 41,
    slug: "fiction-dialogue-polisher",
    title: "Fiction Dialogue Polisher",
    description: "Strengthen dialogue with sharper voice, rhythm, and subtext.",
    category: "Writing",
    rating: 4.8,
    sales: 624,
    creator: "Nina Flores",
    access: "free",
    excerpt:
      "Take flat dialogue and rewrite it with stronger characterization, tension, and pacing.",
    likes: 144,
    comments: [
      {
        id: 42,
        author: "Taran",
        message: "Helpful for making dialogue sound less generic.",
        createdLabel: "1d ago",
      },
    ],
  },
  {
    id: 42,
    slug: "executive-summary-crafter",
    title: "Executive Summary Crafter",
    description: "Condense long reports into concise executive summaries with decisions and risks.",
    category: "Writing",
    rating: 4.6,
    sales: 509,
    creator: "Ivy Collins",
    access: "free",
    excerpt:
      "Summarize dense material into decision-ready briefs that surface conclusions without losing the key nuance.",
    likes: 97,
    comments: [
      {
        id: 43,
        author: "Aditya",
        message: "Useful for stakeholder updates.",
        createdLabel: "5d ago",
      },
    ],
  },
  {
    id: 43,
    slug: "youtube-script-outliner",
    title: "YouTube Script Outliner",
    description: "Outline stronger YouTube scripts with open loops, segments, and retention beats.",
    category: "Writing",
    rating: 4.7,
    sales: 733,
    creator: "Zoe Walker",
    access: "free",
    excerpt:
      "Turn a video idea into a tighter script structure with pacing, hooks, and clearer audience payoff.",
    likes: 156,
    comments: [
      {
        id: 44,
        author: "Keshav",
        message: "Nice framework for educational videos.",
        createdLabel: "2d ago",
      },
    ],
  },
  {
    id: 44,
    slug: "research-note-synthesizer",
    title: "Research Note Synthesizer",
    description: "Organize scattered research notes into themes, insights, and next-step questions.",
    category: "Writing",
    rating: 4.5,
    sales: 392,
    creator: "Mila Novak",
    access: "free",
    excerpt:
      "Cluster notes into themes and produce a clearer narrative with open questions worth exploring next.",
    likes: 83,
    comments: [
      {
        id: 45,
        author: "Nav",
        message: "Helps make sense of a messy notebook.",
        createdLabel: "6d ago",
      },
    ],
  },
  {
    id: 45,
    slug: "premium-saas-growth-playbook",
    title: "Premium SaaS Growth Playbook",
    description: "Design premium growth experiments for SaaS teams with stronger prioritization.",
    category: "Marketing",
    rating: 5,
    sales: 276,
    creator: "Ethan Ross",
    access: "premium",
    excerpt:
      "A deeper playbook for diagnosing growth loops, prioritizing channels, and planning experiment sequencing.",
    likes: 74,
    comments: [
      {
        id: 46,
        author: "Kabir",
        message: "Feels more strategic than a typical growth prompt.",
        createdLabel: "Last week",
      },
    ],
  },
  {
    id: 46,
    slug: "premium-brand-system-blueprint",
    title: "Premium Brand System Blueprint",
    description: "Build a premium-ready brand system with voice, visual rules, and rollout guidance.",
    category: "Design",
    rating: 4.9,
    sales: 231,
    creator: "Elise Moore",
    access: "premium",
    excerpt:
      "Map a full brand system spanning tone, design principles, typography, color, and usage rules.",
    likes: 69,
    comments: [
      {
        id: 47,
        author: "Raghav",
        message: "Very complete prompt for identity direction.",
        createdLabel: "Last week",
      },
    ],
  },
];

export const categories = ["All", "Writing", "Design", "Coding", "Marketing"];

export const freePrompts = prompts.filter((prompt) => prompt.access === "free");
export const premiumPrompts = prompts.filter((prompt) => prompt.access === "premium");

export function calculatePromptEngagement(prompt: Prompt) {
  return (
    prompt.likes * 4 +
    prompt.comments.length * 3 +
    prompt.sales * 0.12 +
    prompt.rating * 20
  );
}

export function rankPromptsByEngagement(items: Prompt[]) {
  return [...items].sort((left, right) => {
    const scoreDifference =
      calculatePromptEngagement(right) - calculatePromptEngagement(left);

    if (scoreDifference !== 0) {
      return scoreDifference;
    }

    return right.likes - left.likes;
  });
}

export function getStoredPromptLikes() {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const raw = window.localStorage.getItem(PROMPT_LIKES_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, boolean>) : {};
  } catch {
    return {};
  }
}

export function isPromptLiked(slug: string) {
  return Boolean(getStoredPromptLikes()[slug]);
}

export function toggleStoredPromptLike(slug: string) {
  const storedLikes = getStoredPromptLikes();
  const nextLiked = !storedLikes[slug];

  if (nextLiked) {
    storedLikes[slug] = true;
  } else {
    delete storedLikes[slug];
  }

  if (typeof window !== "undefined") {
    window.localStorage.setItem(
      PROMPT_LIKES_STORAGE_KEY,
      JSON.stringify(storedLikes)
    );
  }

  return nextLiked;
}

export function hydratePromptLikes(items: Prompt[]) {
  const storedLikes = getStoredPromptLikes();

  return items.map((prompt) => ({
    ...prompt,
    likes: prompt.likes + (storedLikes[prompt.slug] ? 1 : 0),
  }));
}

export function getStoredSavedPrompts() {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const raw = window.localStorage.getItem(PROMPT_SAVES_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, boolean>) : {};
  } catch {
    return {};
  }
}

export function isPromptSaved(slug: string) {
  return Boolean(getStoredSavedPrompts()[slug]);
}

export function toggleStoredPromptSave(slug: string) {
  const storedSaves = getStoredSavedPrompts();
  const nextSaved = !storedSaves[slug];

  if (nextSaved) {
    storedSaves[slug] = true;
  } else {
    delete storedSaves[slug];
  }

  if (typeof window !== "undefined") {
    window.localStorage.setItem(
      PROMPT_SAVES_STORAGE_KEY,
      JSON.stringify(storedSaves)
    );
  }

  return nextSaved;
}

export function getPromptBySlug(slug: string) {
  return prompts.find((prompt) => prompt.slug === slug);
}

export function getRelatedPrompts(currentPrompt: Prompt) {
  return rankPromptsByEngagement(
    freePrompts
    .filter((prompt) => prompt.slug !== currentPrompt.slug)
    .sort((left, right) => {
      if (left.category === currentPrompt.category && right.category !== currentPrompt.category) {
        return -1;
      }

      if (right.category === currentPrompt.category && left.category !== currentPrompt.category) {
        return 1;
      }

      return right.rating - left.rating;
    })
  ).slice(0, 4);
}
