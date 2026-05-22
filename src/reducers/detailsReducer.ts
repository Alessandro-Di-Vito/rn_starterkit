import type { Post } from '../models';
import { ApiError } from '../network';

export type DetailsState = {
  post: Post | null;
  loading: boolean;
  error: string | null;
};

export type DetailsAction =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: Post }
  | { type: 'FETCH_ERROR'; payload: string };

export const initialDetailsState: DetailsState = {
  post: null,
  loading: true,
  error: null,
};

export function detailsReducer(
  state: DetailsState,
  action: DetailsAction,
): DetailsState {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { post: action.payload, loading: false, error: null };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export function toDetailsErrorMessage(error: unknown): string {
  return error instanceof ApiError
    ? `API error (${error.status})`
    : 'Unexpected error';
}
