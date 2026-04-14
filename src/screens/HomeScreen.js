import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Alert,
  Dimensions,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { useApp } from '../context/AppContext';

const { width } = Dimensions.get('window');

const STAT_CARDS = [
  { key: 'revenue', label: 'Total Revenue', icon: '💰', prefix: '$', color: '#A855F7' },
  { key: 'sales', label: 'Total Sales', icon: '🛒', prefix: '', color: '#EC4899' },
  { key: 'products', label: 'Products', icon: '📦', prefix: '', color: '#06B6D4' },
  { key: 'followers', label: 'Followers', icon: '👥', prefix: '', color: '#22C55E' },
];

function StatCard({ stat, value, onPress }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, { toValue: 0.95, useNativeDriver: true }).start();
  };
  const handlePressOut = () => {
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start();
  };

  const formatted = stat.prefix === '$'
    ? `$${value.toLocaleString()}`
    : value.toLocaleString();

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }], flex: 1 }}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
        style={styles.statCard}
      >
        <View style={[styles.statIconContainer, { backgroundColor: `${stat.color}20` }]}>
          <Text style={styles.statIcon}>{stat.icon}</Text>
        </View>
        <Text style={styles.statValue}>{formatted}</Text>
        <Text style={styles.statLabel}>{stat.label}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

function ProductRow({ product, onPress }) {
  return (
    <TouchableOpacity style={styles.productRow} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.productEmoji, { backgroundColor: `${colors.primary}20` }]}>
        <Text style={styles.productEmojiText}>{product.emoji || '📦'}</Text>
      </View>
      <View style={styles.productRowInfo}>
        <Text style={styles.productRowTitle} numberOfLines={1}>{product.title}</Text>
        <Text style={styles.productRowStat}>{product.sales} sales · ${product.revenue.toLocaleString()}</Text>
      </View>
      <View style={styles.productRowRight}>
        <View style={[styles.badge, { backgroundColor: product.isPublished ? `${colors.success}20` : `${colors.textMuted}20` }]}>
          <Text style={[styles.badgeText, { color: product.isPublished ? colors.success : colors.textMuted }]}>
            {product.isPublished ? 'Live' : 'Draft'}
          </Text>
        </View>
        <Text style={styles.productRowPrice}>${product.price}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function HomeScreen({ navigation }) {
  const { user, myProducts, unreadCount } = useApp();
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const myRevenue = myProducts.reduce((sum, p) => sum + p.revenue, 0);
  const mySales = myProducts.reduce((sum, p) => sum + p.sales, 0);

  const stats = {
    revenue: myRevenue,
    sales: mySales,
    products: myProducts.length,
    followers: user?.followers || 0,
  };

  const recentProducts = [...myProducts].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  ).slice(0, 5);

  const topProduct = [...myProducts].sort((a, b) => b.revenue - a.revenue)[0];

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  const firstName = user?.name?.split(' ')[0] || 'Creator';

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
          />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.greeting}>{greeting} 👋</Text>
            <Text style={styles.userName}>{firstName}</Text>
          </View>
          <TouchableOpacity
            style={styles.notifButton}
            onPress={() => navigation.navigate('Notifications')}
          >
            <Ionicons name="notifications-outline" size={24} color={colors.text} />
            {unreadCount > 0 && (
              <View style={styles.notifBadge}>
                <Text style={styles.notifBadgeText}>{unreadCount > 9 ? '9+' : unreadCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Revenue Hero */}
        <LinearGradient
          colors={['#1E0A3C', '#2D1B69', '#1A0A2E']}
          style={styles.heroCard}
        >
          <LinearGradient
            colors={['#A855F7', '#EC4899']}
            style={styles.heroGlowLeft}
          />
          <View style={styles.heroContent}>
            <Text style={styles.heroLabel}>Total Revenue</Text>
            <Text style={styles.heroValue}>${myRevenue.toLocaleString()}</Text>
            <View style={styles.heroMeta}>
              <Ionicons name="trending-up" size={16} color={colors.success} />
              <Text style={styles.heroMetaText}>+12.5% this month</Text>
            </View>
          </View>
          <View style={styles.heroStats}>
            <View style={styles.heroStat}>
              <Text style={styles.heroStatValue}>{mySales}</Text>
              <Text style={styles.heroStatLabel}>Sales</Text>
            </View>
            <View style={styles.heroStatDivider} />
            <View style={styles.heroStat}>
              <Text style={styles.heroStatValue}>{myProducts.length}</Text>
              <Text style={styles.heroStatLabel}>Products</Text>
            </View>
            <View style={styles.heroStatDivider} />
            <View style={styles.heroStat}>
              <Text style={styles.heroStatValue}>{user?.followers || 0}</Text>
              <Text style={styles.heroStatLabel}>Followers</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Quick Actions */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
        </View>
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.quickAction}
            onPress={() => navigation.navigate('CreateProduct')}
            activeOpacity={0.7}
          >
            <LinearGradient colors={['#A855F7', '#7C3AED']} style={styles.quickActionIcon}>
              <Ionicons name="add" size={24} color="#fff" />
            </LinearGradient>
            <Text style={styles.quickActionLabel}>New Product</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickAction}
            onPress={() => navigation.navigate('MyProducts')}
            activeOpacity={0.7}
          >
            <LinearGradient colors={['#EC4899', '#BE185D']} style={styles.quickActionIcon}>
              <Ionicons name="grid-outline" size={22} color="#fff" />
            </LinearGradient>
            <Text style={styles.quickActionLabel}>My Products</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickAction}
            onPress={() => navigation.navigate('Explore')}
            activeOpacity={0.7}
          >
            <LinearGradient colors={['#06B6D4', '#0284C7']} style={styles.quickActionIcon}>
              <Ionicons name="compass-outline" size={22} color="#fff" />
            </LinearGradient>
            <Text style={styles.quickActionLabel}>Explore</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickAction}
            onPress={() => Alert.alert('Analytics', 'Detailed analytics dashboard coming soon!')}
            activeOpacity={0.7}
          >
            <LinearGradient colors={['#22C55E', '#15803D']} style={styles.quickActionIcon}>
              <Ionicons name="analytics-outline" size={22} color="#fff" />
            </LinearGradient>
            <Text style={styles.quickActionLabel}>Analytics</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Grid */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Overview</Text>
        </View>
        <View style={styles.statsGrid}>
          {STAT_CARDS.map(stat => (
            <StatCard
              key={stat.key}
              stat={stat}
              value={stats[stat.key]}
              onPress={() => {}}
            />
          ))}
        </View>

        {/* Top Product */}
        {topProduct && (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Top Product</Text>
            </View>
            <TouchableOpacity
              style={styles.topProductCard}
              onPress={() => navigation.navigate('ProductDetail', { product: topProduct })}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#1E0A3C', '#1A1A1A']}
                style={styles.topProductGradient}
              >
                <View style={styles.topProductLeft}>
                  <Text style={styles.topProductEmoji}>{topProduct.emoji || '📦'}</Text>
                  <View style={styles.topProductInfo}>
                    <View style={styles.topProductBadge}>
                      <Ionicons name="trophy" size={12} color="#F59E0B" />
                      <Text style={styles.topProductBadgeText}>Best Seller</Text>
                    </View>
                    <Text style={styles.topProductTitle} numberOfLines={2}>{topProduct.title}</Text>
                    <Text style={styles.topProductStat}>{topProduct.sales} sales · ⭐ {topProduct.rating}</Text>
                  </View>
                </View>
                <View style={styles.topProductRight}>
                  <Text style={styles.topProductRevenue}>${topProduct.revenue.toLocaleString()}</Text>
                  <Text style={styles.topProductRevenueLabel}>revenue</Text>
                  <Ionicons name="chevron-forward" size={16} color={colors.textMuted} style={{ marginTop: 8 }} />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </>
        )}

        {/* Recent Products */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Products</Text>
          <TouchableOpacity onPress={() => navigation.navigate('MyProducts')}>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>

        {recentProducts.length > 0 ? (
          <View style={styles.productsList}>
            {recentProducts.map((product) => (
              <ProductRow
                key={product.id}
                product={product}
                onPress={() => navigation.navigate('ProductDetail', { product })}
              />
            ))}
          </View>
        ) : (
          <TouchableOpacity
            style={styles.emptyProducts}
            onPress={() => navigation.navigate('CreateProduct')}
            activeOpacity={0.7}
          >
            <Text style={styles.emptyIcon}>✦</Text>
            <Text style={styles.emptyTitle}>No products yet</Text>
            <Text style={styles.emptySubtitle}>Create your first digital product</Text>
            <View style={styles.emptyButton}>
              <LinearGradient colors={['#A855F7', '#EC4899']} style={styles.emptyButtonGradient}>
                <Ionicons name="add" size={16} color="#fff" />
                <Text style={styles.emptyButtonText}>Create Product</Text>
              </LinearGradient>
            </View>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 16,
  },
  headerLeft: {},
  greeting: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  userName: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
  },
  notifButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: colors.error,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  notifBadgeText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '700',
  },
  heroCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  heroGlowLeft: {
    position: 'absolute',
    top: -40,
    left: -40,
    width: 120,
    height: 120,
    borderRadius: 60,
    opacity: 0.2,
  },
  heroContent: {
    marginBottom: 16,
  },
  heroLabel: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 4,
    fontWeight: '500',
  },
  heroValue: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.white,
    marginBottom: 8,
  },
  heroMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  heroMetaText: {
    fontSize: 13,
    color: colors.success,
    fontWeight: '500',
  },
  heroStats: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    paddingTop: 16,
  },
  heroStat: {
    flex: 1,
    alignItems: 'center',
  },
  heroStatValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
  },
  heroStatLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.5)',
    marginTop: 2,
  },
  heroStatDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
  },
  seeAllText: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '600',
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  quickAction: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '500',
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    minWidth: (width - 32 - 12) / 2 - 12,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statIcon: {
    fontSize: 20,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  topProductCard: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  topProductGradient: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topProductLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  topProductEmoji: {
    fontSize: 36,
  },
  topProductInfo: {
    flex: 1,
  },
  topProductBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  topProductBadgeText: {
    fontSize: 11,
    color: '#F59E0B',
    fontWeight: '600',
  },
  topProductTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  topProductStat: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  topProductRight: {
    alignItems: 'flex-end',
  },
  topProductRevenue: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary,
  },
  topProductRevenueLabel: {
    fontSize: 11,
    color: colors.textMuted,
  },
  productsList: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    marginBottom: 20,
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  productEmoji: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  productEmojiText: {
    fontSize: 20,
  },
  productRowInfo: {
    flex: 1,
  },
  productRowTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 3,
  },
  productRowStat: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  productRowRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  productRowPrice: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
  },
  emptyProducts: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'dashed',
    marginBottom: 20,
  },
  emptyIcon: {
    fontSize: 36,
    color: colors.primary,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 20,
  },
  emptyButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  emptyButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  emptyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
