import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ROUTES, type RootStackParamList } from '../navigation/routes';
import type { Post } from '../models';
import { PostListItem } from '../features';
import { loadHomePosts } from './controllers';
import { homeReducer, initialHomeState } from '../reducers';
import { colors, spacing, typography } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, typeof ROUTES.HOME>;

export function HomeScreen({ navigation }: Props) {
  const [state, dispatch] = React.useReducer(homeReducer, initialHomeState);

  React.useEffect(() => {
    let mounted = true;
    loadHomePosts({ dispatch, isMounted: () => mounted });

    return () => {
      mounted = false;
    };
  }, []);

  if (state.loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text style={styles.infoText}>Caricamento post...</Text>
      </View>
    );
  }

  if (state.error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Errore: {state.error}</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: Post }) => (
    <PostListItem
      post={item}
      onPress={selectedPost =>
        navigation.navigate(ROUTES.DETAILS, { postId: selectedPost.id })
      }
    />
  );

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={state.posts}
      keyExtractor={item => String(item.id)}
      renderItem={renderItem}
      ListHeaderComponent={<Text style={styles.title}>Post List</Text>}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
    padding: spacing.lg,
    backgroundColor: colors.background,
  },
  centered: {
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
  infoText: {
    ...typography.subtitle,
    color: colors.textSecondary,
  },
  errorText: {
    ...typography.subtitle,
    color: colors.danger,
    textAlign: 'center',
  },
});
