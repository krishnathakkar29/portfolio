export interface Project {
  id: string;
  subtitle: string;
  title: string;
  description: string;
  preview: string;
  tech: string[];
  links: {
    website: string;
    github: string;
    video?: string;
  };
  color: string;
  screenshot: string; // Add this new property
}

export const projects: Project[] = [
  {
    id: "DocuTalk",
    subtitle: "Context-Aware Document Platform",
    title: "DocuTalk",
    description:
      "DocuTalk is an innovative platform that harnesses the power of Retrieval Augmented Generation to deliver contextually relevant responses. By integrating Pinecone for efficient vector embedding storage and AWS S3 for secure document management, DocuTalk ensures optimal data accessibility and retrieval accuracy. This platform streamlines information processing, providing users with tailored insights from the document.",
    preview: "#",
    tech: [
      "NextJs",
      "DrizzleORM",
      "Langchain",
      "AWS S3",
      "PostgreSQL",
      "PineCone",
      "Vercel SDK",
    ],
    links: {
      website: "#",
      github: "https://github.com/krishnathakkar29/DocuTalk/",
    },
    color: "from-[#FFD700] to-[#FFC000]",
    screenshot: "/portfolio/projects/docutalk.png",
  },
  {
    id: "thryve-ai",
    subtitle: "Thryve.AI",
    title: "AI-Powered Enterprise Support",
    description:
      "Thryve.AI is a full-stack enterprise support platform that integrates multiple AI models (including Gemini) to resolve employee queries. The system features a React-based frontend for dynamic UI and chat interactions and a NodeJs backend with REST APIs for query handling. It uses SpaCy and NLTK for advanced NLP processing, coupled with FAISS for efficient semantic search in large datasets.",
    preview: "#",
    tech: ["ReactJs", "NodeJs", "MongoDB", "AWS S3", "Gemini", "SpaCy", "NLTK"],
    links: {
      website: "#",
      github: "https://github.com/krishnathakkar29/Thryve.AI",
    },
    color: "from-[#10B981] to-[#059669]",
    screenshot: "/portfolio/projects/thryve.png",
  },
  {
    id: "pair-up",
    subtitle: "Social Interaction Platform",
    title: "PairUp",
    description:
      "PairUp is a dynamic social networking platform built with NextJs, designed to foster meaningful connections between users. Leveraging PostgreSQL and Prisma for efficient data management, it offers comprehensive CRUD operations for user profiles and content. The platform includes real-time features, enabling instant notifications and messaging.",
    preview: "#",
    tech: [
      "NextJs",
      "Prisma",
      "PostgreSQL",
      "NextAuth v5",
      "TypeScript",
    ],
    links: {
      website: "#",
      github: "https://github.com/krishnathakkar29/PairUp.git",
    },
    color: "from-[#4F46E5] to-[#7C3AED]",
    screenshot: "/portfolio/projects/pairup.png",
  },
];
