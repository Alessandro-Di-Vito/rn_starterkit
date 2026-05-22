export const ENDPOINTS = {
  posts: '/posts',
  postById: (postId: number) => `/posts/${postId}`,
} as const;
