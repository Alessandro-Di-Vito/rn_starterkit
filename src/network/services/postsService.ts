import type { Post } from '../../models';
import { request } from '../client';
import { ENDPOINTS } from '../endpoints';

export async function getPosts(): Promise<Post[]> {
  return request<Post[]>(ENDPOINTS.posts);
}

export async function getPostById(postId: number): Promise<Post> {
  return request<Post>(ENDPOINTS.postById(postId));
}
