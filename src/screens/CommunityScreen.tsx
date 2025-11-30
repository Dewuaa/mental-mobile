import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, RADIUS, FONTS, SHADOWS } from '../theme';
import { Card } from '../components/Card';
import { EmptyState } from '../components/EmptyState';
import { SwipeableRow } from '../components/SwipeableRow';
import { useToast } from '../context/ToastContext';
import { Heart, MessageSquare, Filter, Users } from 'lucide-react-native';

const CommunityScreen: React.FC = () => {
  const tags = ['Trending', 'Anxiety', 'Depression', 'College Life', 'Wins'];
  const [selectedTag, setSelectedTag] = React.useState('Trending');

  const { showToast } = useToast();
  const [posts, setPosts] = React.useState([
    {
      id: 1,
      author: 'Anonymous',
      time: '2h ago',
      content: 'Finally talked to someone about my anxiety. Small step, but it feels huge.',
      likes: 24,
      comments: 8,
      tags: ['Anxiety', 'Wins'],
    },
    {
      id: 2,
      author: 'Anonymous',
      time: '5h ago',
      content: 'Anyone else struggle with Sunday anxiety? Looking for coping strategies.',
      likes: 42,
      comments: 15,
      tags: ['Anxiety'],
    },
  ]);

  const handleDeletePost = (id: number) => {
    setPosts((prev) => prev.filter((post) => post.id !== id));
    showToast('success', 'Post deleted');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Community</Text>
            <Text style={styles.subtitle}>Share & connect anonymously</Text>
          </View>
          <View style={styles.headerIcon}>
            <Users size={24} color={COLORS.teal[500]} />
          </View>
        </View>

        {/* Tags */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tagsContainer}
        >
          {tags.map((tag) => (
            <TouchableOpacity
              key={tag}
              onPress={() => setSelectedTag(tag)}
              style={[
                styles.tag,
                selectedTag === tag && styles.tagActive,
              ]}
            >
              <Text
                style={[
                  styles.tagText,
                  selectedTag === tag && styles.tagTextActive,
                ]}
              >
                {tag}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Posts */}
        <View style={styles.postsContainer}>
          {posts.length === 0 ? (
            <EmptyState
              icon="message-text-outline"
              title="No posts yet"
              message="Be the first to share your thoughts with the community."
              actionLabel="Create Post"
              onAction={() => console.log('Create post')}
            />
          ) : (
            posts.map((post) => (
              <SwipeableRow
                key={post.id}
                onSwipe={() => handleDeletePost(post.id)}
              >
                <View style={styles.postCard}>
                  <View style={styles.postHeader}>
                    <View style={styles.avatar}>
                      <Text style={styles.avatarText}>A</Text>
                    </View>
                    <View style={styles.postMeta}>
                      <Text style={styles.postAuthor}>{post.author}</Text>
                      <Text style={styles.postTime}>{post.time}</Text>
                    </View>
                  </View>
                  <Text style={styles.postContent}>{post.content}</Text>
                  <View style={styles.postTags}>
                    {post.tags.map((tag) => (
                      <View key={tag} style={styles.postTag}>
                        <Text style={styles.postTagText}>{tag}</Text>
                      </View>
                    ))}
                  </View>
                  <View style={styles.postActions}>
                    <TouchableOpacity style={styles.actionButton}>
                      <Heart size={18} color={COLORS.slate[400]} />
                      <Text style={styles.actionText}>{post.likes}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                      <MessageSquare size={18} color={COLORS.slate[400]} />
                      <Text style={styles.actionText}>{post.comments}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </SwipeableRow>
            ))
          )}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.slate[50],
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.lg,
    paddingTop: SPACING['2xl'],
  },
  title: {
    fontSize: FONTS.sizes['3xl'],
    fontWeight: '700',
    color: COLORS.slate[900],
  },
  subtitle: {
    fontSize: FONTS.sizes.base,
    color: COLORS.slate[500],
    fontWeight: '500',
    marginTop: 4,
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.slate[50],
    ...SHADOWS.soft,
  },
  tagsContainer: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
    gap: SPACING.sm,
  },
  tag: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.slate[100],
    marginRight: SPACING.sm,
  },
  tagActive: {
    backgroundColor: COLORS.slate[900],
    borderColor: COLORS.slate[900],
  },
  tagText: {
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
    color: COLORS.slate[600],
  },
  tagTextActive: {
    color: COLORS.white,
  },
  postsContainer: {
    paddingHorizontal: SPACING.lg,
    gap: SPACING.lg,
  },
  postCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS['2xl'],
    padding: SPACING.lg,
    gap: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.slate[50],
    ...SHADOWS.soft,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.teal[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: FONTS.sizes.base,
    fontWeight: '700',
    color: COLORS.teal[600],
  },
  postMeta: {
    flex: 1,
  },
  postAuthor: {
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
    color: COLORS.slate[900],
  },
  postTime: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.slate[400],
    marginTop: 2,
  },
  postContent: {
    fontSize: FONTS.sizes.base,
    color: COLORS.slate[700],
    lineHeight: 22,
  },
  postTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  postTag: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.teal[50],
  },
  postTagText: {
    fontSize: FONTS.sizes.xs,
    fontWeight: '600',
    color: COLORS.teal[600],
  },
  postActions: {
    flexDirection: 'row',
    gap: SPACING.lg,
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.slate[50],
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  actionText: {
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
    color: COLORS.slate[500],
  },
});

export default CommunityScreen;
