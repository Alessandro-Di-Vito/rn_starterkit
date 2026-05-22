export type AppState = {
  appLoading: boolean;
};

export type AppAction = { type: 'SET_APP_LOADING'; payload: boolean };

export const initialAppState: AppState = {
  appLoading: false,
};

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_APP_LOADING':
      return { ...state, appLoading: action.payload };
    default:
      return state;
  }
}
