import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { useApp } from '../context/AppContext';

const FILTERS = ['All', 'Published', 'Drafts'];

function ProductItem({ product, onPress, onTogglePublish, onEdit, onDelete }) {
  return (
    <TouchableOpacity style={styles.productItem} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.productItemLeft}>
        <View style={[styles.productEmoji, { backgroundColor: `${colors.primary}15` }]}>
          <Text style={styles.productEmojiText}>{product.emoji || '📦'}</Text>
        </View>
        <View style={styles.productItemInfo}>
          <Text style={styles.productItemTitle} numberOfLines={1}>{product.title}</Text>
          <Text style={styles.productItemMeta}>
            {product.category} · ${product.price}
          </Text>
          <View style={styles.productItemStats}>
            <View style={styles.miniStat}>
              <Ionicons name="cart-outline" size={12} color={colors.textMuted} />
              <Text style={styles.miniStatText}>{product.sales}</Text>
            </View>
            <View style={styles.miniStat}>
              <Ionicons name="cash-outline" size={12} color={colors.textMuted} />
              <Text style={styles.miniStatText}>${product.revenue.toLocaleString()}</Text>
            </View>
            {product.rating > 0 && (
              <View style={styles.miniStat}>
                <Ionicons name="star" size={12} color="#F59E0B" />
                <Text style={styles.miniStatText}>{product.rating}</Text>
              </View>
            )}
          </View>
        </View>
      </View>
      <View style={styles.productItemActions}>
        <TouchableOpacity
          style={[styles.statusChip, { backgroundColor: product.isPublished ? `${colors.success}20` : `${colors.textMuted}15` }]}
          onPress={onTogglePublish}
        >
          <View style={[styles.statusDot, { backgroundColor: product.isPublished ? colors.success : colors.textMuted }]} />
          <Text style={[styles.statusText, { color: product.isPublished ? colors.success : colors.textMuted }]}>
            {product.isPublished ? 'Live' : 'Draft'}
          </Text>
        </TouchableOpacity>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton} onPress={onEdit}>
            <Ionicons name="pencil-outline" size={16} color={colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={onDelete}>
            <Ionicons name="trash-outline" size={16} color={colors.error} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function MyProductsScreen({ navigation }) {
  const [filter, setFilter] = useState('All');
  const [refreshing, setRefreshing] = useState(false);
  const { myProducts, togglePublish, deleteProduct } = useApp();
  const insets = useSafeAreaInsets();

  const filtered = myProducts.filter(p => {
    if (filter === 'Published') return p.isPublished;
    if (filter === 'Drafts') return !p.isPublished;
    return true;
  });

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  };

  const handleDelete = (product) => {
    Alert.alert(
      'Delete Product',
      `Are you sure you want to delete "${product.title}"? This cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteProduct(product.id),
        },
      ]
    );
  };

  const published = myProducts.filter(p => p.isPublished).length;
  const drafts = myProducts.filter(p => !p.isPublished).length;
  const totalRevenue = myProducts.reduce((sum, p) => sum + p.revenue, 0);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>My Products</Text>
          <Text style={styles.headerSubtitle}>{myProducts.length} total products</Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('CreateProduct')}
          activeOpacity={0.7}
        >
          <LinearGradient colors={['#A855F7', '#EC4899']} style={styles.addButtonGradient}>
            <Ionicons name="add" size={22} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Summary Cards */}
      <View style={styles.summaryRow}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{published}</Text>
          <Text style={styles.summaryLabel}>Published</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{drafts}</Text>
          <Text style={styles.summaryLabel}>Drafts</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryCard}>
          <Text style={[styles.summaryValue, { color: colors.primary }]}>
            ${totalRevenue.toLocaleString()}
          </Text>
          <Text style={styles.summaryLabel}>Revenue</Text>
        </View>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterTabs}>
        {FILTERS.map(f => (
          <TouchableOpacity
            key={f}
            style={[styles.filterTab, filter === f && styles.filterTabActive]}
            onPress={() => setFilter(f)}
          >
            <Text style={[styles.filterTabText, filter === f && styles.filterTabTextActive]}>
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Products List */}
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ProductItem
            product={item}
            onPress={() => navigation.navigate('ProductDetail', { product: item })}
            onTogglePublish={() => togglePublish(item.id)}
            onEdit={() => navigation.navigate('EditProduct', { product: item })}
            onDelete={() => handleDelete(item)}
          />
        )}
        contentContainerStyle={[styles.list, filtered.length === 0 && styles.listEmpty]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📦</Text>
            <Text style={styles.emptyTitle}>
              {filter === 'All' ? 'No products yet' : `No ${filter.toLowerCase()} products`}
            </Text>
            <Text style={styles.emptySubtitle}>
              {filter === 'All'
                ? 'Start creating your first digital product'
                : filter === 'Published'
                ? 'Publish a draft to make it live'
                : 'All your products are published!'}
            </Text>
            {filter === 'All' && (
              <TouchableOpacity
                onPress={() => navigation.navigate('CreateProduct')}
                style={styles.emptyButton}
              >
                <LinearGradient colors={['#A855F7', '#EC4899']} style={styles.emptyButtonGradient}>
                  <Ionicons name="add" size={16} color="#fff" />
                  <Text style={styles.emptyButtonText}>Create Product</Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  addButton: {
    borderRadius: 14,
    overflow: 'hidden',
  },
  addButtonGradient: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryRow: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
  },
  summaryCard: {
    flex: 1,
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 2,
  },
  summaryLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  summaryDivider: {
    width: 1,
    backgroundColor: colors.border,
    marginVertical: 4,
  },
  filterTabs: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 12,
    gap: 8,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterTabActive: {
    backgroundColor: `${colors.primary}20`,
    borderColor: colors.primary,
  },
  filterTabText: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  filterTabTextActive: {
    color: colors.primary,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    gap: 10,
  },
  listEmpty: {
    flex: 1,
  },
  productItem: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  productItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  productEmoji: {
    width: 50,
    height: 50,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  productEmojiText: {
    fontSize: 24,
  },
  productItemInfo: {
    flex: 1,
  },
  productItemTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 3,
  },
  productItemMeta: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 5,
  },
  productItemStats: {
    flexDirection: 'row',
    gap: 10,
  },
  miniStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  miniStatText: {
    fontSize: 11,
    color: colors.textMuted,
    fontWeight: '500',
  },
  productItemActions: {
    alignItems: 'flex-end',
    gap: 8,
    marginLeft: 8,
  },
  statusChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 6,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
    maxWidth: 260,
  },
  emptyButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  emptyButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  emptyButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
});
