import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import type { Post } from '../../../models';
import { colors, spacing, typography } from '../../../theme';

type Props = {
  post: Post;
  onPress: (post: Post) => void;
};

export function PostListItem({ post, onPress }: Props) {
  return (
    <Pressable style={styles.item} onPress={() => onPress(post)}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.body} numberOfLines={2}>
        {post.body}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: spacing.md,
    backgroundColor: colors.surface,
  },
  title: {
    ...typography.subtitle,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  body: {
    ...typography.body,
    color: colors.textSecondary,
  },
});
