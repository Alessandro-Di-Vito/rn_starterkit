export const ROUTES = {
  HOME: 'HOME',
  DETAILS: 'DETAILS',
} as const;

export type RouteName = (typeof ROUTES)[keyof typeof ROUTES];

export type RootStackParamList = {
  [ROUTES.HOME]: undefined;
  [ROUTES.DETAILS]: { postId: number };
};
