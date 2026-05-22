import { fetchPosts } from '../../features';
import type { Dispatch } from 'react';
import type { HomeAction } from '../../reducers';
import { toHomeErrorMessage } from '../../reducers';

type LoadHomePostsParams = {
  dispatch: Dispatch<HomeAction>;
  isMounted: () => boolean;
};

export async function loadHomePosts({
  dispatch,
  isMounted,
}: LoadHomePostsParams): Promise<void> {
  dispatch({ type: 'FETCH_START' });
  try {
    const response = await fetchPosts();
    if (!isMounted()) {
      return;
    }
    dispatch({ type: 'FETCH_SUCCESS', payload: response.slice(0, 20) });
  } catch (error) {
    if (!isMounted()) {
      return;
    }
    dispatch({ type: 'FETCH_ERROR', payload: toHomeErrorMessage(error) });
  }
}
