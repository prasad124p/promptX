export type ApiErrorShape = {
  success: false;
  message: string;
  details?: unknown;
};

export type PromptAuthor = {
  _id?: string;
  id?: string;
  name: string;
  avatarUrl?: string;
  bio?: string;
  favoriteTags?: string[];
};

export type PromptAiScore = {
  clarity: number;
  creativity: number;
  relevance: number;
  overall: number;
};

export type MarketplacePrompt = {
  _id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  tags: string[];
  category: string;
  status: string;
  aiScore: PromptAiScore;
  evaluationStatus: string;
  evaluationSummary: string;
  evaluationSource: string;
  ratingAverage: number;
  ratingCount: number;
  reviewCount: number;
  favoriteCount: number;
  likeCount: number;
  views: number;
  engagementScore: number;
  rankingScore: number;
  author: PromptAuthor;
  isFavorited?: boolean;
  isLiked?: boolean;
  createdAt: string;
  updatedAt: string;
};

export type MarketplaceReview = {
  _id: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  user: {
    _id?: string;
    id?: string;
    name: string;
    avatarUrl?: string;
  };
};

export type PromptListResponse = {
  prompts: MarketplacePrompt[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};

export type PromptResponse = {
  prompt: MarketplacePrompt;
};

export type ReviewListResponse = {
  reviews: MarketplaceReview[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};
