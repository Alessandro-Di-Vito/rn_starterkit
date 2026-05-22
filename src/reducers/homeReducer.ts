import type { Post } from '../models';
import { ApiError } from '../network';

export type HomeState = {
  posts: Post[];
  loading: boolean;
  error: string | null;
};

export type HomeAction =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: Post[] }
  | { type: 'FETCH_ERROR'; payload: string };

export const initialHomeState: HomeState = {
  posts: [],
  loading: true,
  error: null,
};

export function homeReducer(state: HomeState, action: HomeAction): HomeState {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { posts: action.payload, loading: false, error: null };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export function toHomeErrorMessage(error: unknown): string {
  return error instanceof ApiError
    ? `API error (${error.status})`
    : 'Unexpected error';
}
