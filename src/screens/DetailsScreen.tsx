import React from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ROUTES, type RootStackParamList } from '../navigation/routes';
import { loadPostDetails } from './controllers';
import {
  detailsReducer,
  initialDetailsState,
} from '../reducers';
import { colors, spacing, typography } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, typeof ROUTES.DETAILS>;

export function DetailsScreen({ navigation, route }: Props) {
  const [state, dispatch] = React.useReducer(detailsReducer, initialDetailsState);

  React.useEffect(() => {
    let mounted = true;
    loadPostDetails({
      postId: route.params.postId,
      dispatch,
      isMounted: () => mounted,
    });

    return () => {
      mounted = false;
    };
  }, [route.params.postId]);

  if (state.loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text style={styles.infoText}>Caricamento dettaglio...</Text>
      </View>
    );
  }

  if (state.error || !state.post) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          Errore: {state.error ?? 'Post non trovato'}
        </Text>
        <Button title="Torna alla Home" onPress={() => navigation.navigate(ROUTES.HOME)} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{state.post.title}</Text>
      <Text style={styles.body}>{state.post.body}</Text>
      <Button
        title="Torna alla Home"
        onPress={() => navigation.navigate(ROUTES.HOME)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    padding: spacing.lg,
    backgroundColor: colors.background,
  },
  title: {
    ...typography.title,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  body: {
    ...typography.subtitle,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  infoText: {
    ...typography.subtitle,
    color: colors.textSecondary,
  },
  errorText: {
    ...typography.subtitle,
    color: colors.danger,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
});
