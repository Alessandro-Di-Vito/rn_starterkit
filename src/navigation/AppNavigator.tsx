import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ROUTES, type RootStackParamList } from './routes';
import { HomeScreen } from '../screens/home/HomeScreen';
import { DetailsScreen } from '../screens/detail/DetailsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName={ROUTES.HOME}>
      <Stack.Screen name={ROUTES.HOME} component={HomeScreen} />
      <Stack.Screen name={ROUTES.DETAILS} component={DetailsScreen} />
    </Stack.Navigator>
  );
}
