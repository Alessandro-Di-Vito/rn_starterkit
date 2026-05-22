import { fetchPostDetails } from '../../features';
import type { Dispatch } from 'react';
import type { DetailsAction } from '../../reducers';
import { toDetailsErrorMessage } from '../../reducers';

type LoadPostDetailsParams = {
  postId: number;
  dispatch: Dispatch<DetailsAction>;
  isMounted: () => boolean;
};

export async function loadPostDetails({
  postId,
  dispatch,
  isMounted,
}: LoadPostDetailsParams): Promise<void> {
  dispatch({ type: 'FETCH_START' });
  try {
    const response = await fetchPostDetails(postId);
    if (!isMounted()) {
      return;
    }
    dispatch({ type: 'FETCH_SUCCESS', payload: response });
  } catch (error) {
    if (!isMounted()) {
      return;
    }
    dispatch({ type: 'FETCH_ERROR', payload: toDetailsErrorMessage(error) });
  }
}
