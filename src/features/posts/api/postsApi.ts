import type { Post } from '../../../models';
import { ENDPOINTS, request } from '../../../network';

export async function fetchPosts(): Promise<Post[]> {
  return request<Post[]>(ENDPOINTS.posts);
}

export async function fetchPostDetails(postId: number): Promise<Post> {
  return request<Post>(ENDPOINTS.postById(postId));
}
