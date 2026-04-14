import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Share,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { useApp } from '../context/AppContext';

export default function ProductDetailScreen({ navigation, route }) {
  const { product: initialProduct } = route.params;
  const { myProducts, togglePublish, deleteProduct, toggleWishlist, isWishlisted, addToCart, isInCart, user } = useApp();
  const insets = useSafeAreaInsets();

  // Get the latest product state
  const product = myProducts.find(p => p.id === initialProduct.id) || initialProduct;
  const isOwner = product.creatorId === user?.id;
  const wishlisted = isWishlisted(product.id);
  const inCart = isInCart(product.id);

  const [purchaseLoading, setPurchaseLoading] = useState(false);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out "${product.title}" on Passion App - $${product.price}`,
        title: product.title,
      });
    } catch (error) {
      // ignored
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Product',
      `Delete "${product.title}"? This cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteProduct(product.id);
            navigation.goBack();
          },
        },
      ]
    );
  };

  const handlePurchase = () => {
    setPurchaseLoading(true);
    setTimeout(() => {
      setPurchaseLoading(false);
      Alert.alert(
        '🎉 Purchase Successful!',
        `You now have access to "${product.title}". Check your email for download instructions.`,
        [{ text: 'Awesome!' }]
      );
    }, 1200);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <View style={[styles.container]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Hero */}
        <LinearGradient
          colors={['#2D1B69', '#1E0A3C', '#0D0D0D']}
          style={[styles.hero, { paddingTop: insets.top + 60 }]}
        >
          <Text style={styles.heroEmoji}>{product.emoji || '📦'}</Text>
          <View style={[styles.categoryBadge, { backgroundColor: `${colors.primary}30` }]}>
            <Text style={styles.categoryBadgeText}>{product.category}</Text>
          </View>
        </LinearGradient>

        {/* Content */}
        <View style={styles.content}>
          {/* Title & Actions */}
          <View style={styles.titleRow}>
            <View style={styles.titleLeft}>
              <Text style={styles.title}>{product.title}</Text>
              <View style={styles.metaRow}>
                {product.rating > 0 && (
                  <View style={styles.ratingRow}>
                    <Ionicons name="star" size={14} color="#F59E0B" />
                    <Text style={styles.ratingText}>{product.rating}</Text>
                    <Text style={styles.reviewCount}>({product.reviews} reviews)</Text>
                  </View>
                )}
                {product.sales > 0 && (
                  <Text style={styles.salesText}>{product.sales.toLocaleString()} sales</Text>
                )}
              </View>
            </View>
            <Text style={styles.price}>${product.price}</Text>
          </View>

          {/* Owner Stats */}
          {isOwner && (
            <View style={styles.ownerStats}>
              <LinearGradient colors={['#1E0A3C', '#1A1A1A']} style={styles.ownerStatsGradient}>
                <View style={styles.ownerStat}>
                  <Text style={styles.ownerStatValue}>{product.sales}</Text>
                  <Text style={styles.ownerStatLabel}>Sales</Text>
                </View>
                <View style={styles.ownerStatDivider} />
                <View style={styles.ownerStat}>
                  <Text style={[styles.ownerStatValue, { color: colors.primary }]}>
                    ${product.revenue.toLocaleString()}
                  </Text>
                  <Text style={styles.ownerStatLabel}>Revenue</Text>
                </View>
                <View style={styles.ownerStatDivider} />
                <View style={styles.ownerStat}>
                  <View style={[styles.liveIndicator, { backgroundColor: product.isPublished ? `${colors.success}20` : `${colors.textMuted}15` }]}>
                    <View style={[styles.liveDot, { backgroundColor: product.isPublished ? colors.success : colors.textMuted }]} />
                    <Text style={[styles.liveText, { color: product.isPublished ? colors.success : colors.textMuted }]}>
                      {product.isPublished ? 'Live' : 'Draft'}
                    </Text>
                  </View>
                  <Text style={styles.ownerStatLabel}>Status</Text>
                </View>
              </LinearGradient>
            </View>
          )}

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{product.description}</Text>
          </View>

          {/* Tags */}
          {product.tags?.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Tags</Text>
              <View style={styles.tagsContainer}>
                {product.tags.map(tag => (
                  <View key={tag} style={styles.tag}>
                    <Text style={styles.tagText}>#{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Product Info */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Product Info</Text>
            <View style={styles.infoCard}>
              <View style={styles.infoRow}>
                <Ionicons name="calendar-outline" size={16} color={colors.textMuted} />
                <Text style={styles.infoLabel}>Created</Text>
                <Text style={styles.infoValue}>{formatDate(product.createdAt)}</Text>
              </View>
              <View style={styles.infoDivider} />
              <View style={styles.infoRow}>
                <Ionicons name="pricetag-outline" size={16} color={colors.textMuted} />
                <Text style={styles.infoLabel}>Category</Text>
                <Text style={styles.infoValue}>{product.category}</Text>
              </View>
              <View style={styles.infoDivider} />
              <View style={styles.infoRow}>
                <Ionicons name="download-outline" size={16} color={colors.textMuted} />
                <Text style={styles.infoLabel}>Format</Text>
                <Text style={styles.infoValue}>Instant Download</Text>
              </View>
            </View>
          </View>

          {/* Owner Actions */}
          {isOwner ? (
            <View style={styles.ownerActions}>
              <TouchableOpacity
                style={styles.publishToggleButton}
                onPress={() => togglePublish(product.id)}
                activeOpacity={0.7}
              >
                <LinearGradient
                  colors={product.isPublished ? ['#374151', '#1F2937'] : ['#A855F7', '#EC4899']}
                  style={styles.publishToggleGradient}
                >
                  <Ionicons
                    name={product.isPublished ? 'cloud-offline-outline' : 'cloud-upload-outline'}
                    size={20}
                    color="#fff"
                  />
                  <Text style={styles.publishToggleText}>
                    {product.isPublished ? 'Unpublish' : 'Publish Now'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
              <View style={styles.ownerActionRow}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => navigation.navigate('EditProduct', { product })}
                  activeOpacity={0.7}
                >
                  <Ionicons name="pencil-outline" size={18} color={colors.text} />
                  <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={handleDelete}
                  activeOpacity={0.7}
                >
                  <Ionicons name="trash-outline" size={18} color={colors.error} />
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            /* Buyer Actions */
            <View style={styles.buyerActions}>
              <TouchableOpacity
                style={styles.wishlistButton}
                onPress={() => toggleWishlist(product.id)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={wishlisted ? 'heart' : 'heart-outline'}
                  size={22}
                  color={wishlisted ? colors.error : colors.text}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cartButton}
                onPress={() => addToCart(product)}
                disabled={inCart}
                activeOpacity={0.7}
              >
                <Ionicons name={inCart ? 'checkmark' : 'cart-outline'} size={20} color={inCart ? colors.success : colors.text} />
                <Text style={[styles.cartButtonText, inCart && { color: colors.success }]}>
                  {inCart ? 'In Cart' : 'Add to Cart'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buyButtonWrapper}
                onPress={handlePurchase}
                disabled={purchaseLoading}
                activeOpacity={0.85}
              >
                <LinearGradient
                  colors={['#A855F7', '#EC4899']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.buyButton}
                >
                  <Text style={styles.buyButtonText}>
                    {purchaseLoading ? 'Processing...' : `Buy for $${product.price}`}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Floating Header */}
      <View style={[styles.floatingHeader, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.floatingRight}>
          <TouchableOpacity style={styles.floatingButton} onPress={handleShare}>
            <Ionicons name="share-outline" size={22} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  floatingHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  floatingButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingRight: {
    flexDirection: 'row',
    gap: 8,
  },
  hero: {
    alignItems: 'center',
    paddingBottom: 40,
    paddingHorizontal: 16,
  },
  heroEmoji: {
    fontSize: 80,
    marginBottom: 16,
  },
  categoryBadge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  categoryBadgeText: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  content: {
    paddingHorizontal: 16,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
    gap: 12,
  },
  titleLeft: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    lineHeight: 28,
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
  },
  reviewCount: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  salesText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  price: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.primary,
  },
  ownerStats: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  ownerStatsGradient: {
    flexDirection: 'row',
    padding: 16,
  },
  ownerStat: {
    flex: 1,
    alignItems: 'center',
  },
  ownerStatValue: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  ownerStatLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 4,
  },
  ownerStatDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginVertical: 4,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  liveText: {
    fontSize: 12,
    fontWeight: '600',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: `${colors.primary}15`,
    borderWidth: 1,
    borderColor: `${colors.primary}30`,
  },
  tagText: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '500',
  },
  infoCard: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 10,
  },
  infoLabel: {
    flex: 1,
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '600',
  },
  infoDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: 44,
  },
  ownerActions: {
    gap: 12,
    marginTop: 8,
  },
  publishToggleButton: {
    borderRadius: 14,
    overflow: 'hidden',
  },
  publishToggleGradient: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  publishToggleText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  ownerActionRow: {
    flexDirection: 'row',
    gap: 12,
  },
  editButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 50,
    borderRadius: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  editButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  deleteButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 50,
    borderRadius: 14,
    backgroundColor: `${colors.error}10`,
    borderWidth: 1,
    borderColor: `${colors.error}30`,
  },
  deleteButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.error,
  },
  buyerActions: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  wishlistButton: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    height: 50,
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cartButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  buyButtonWrapper: {
    flex: 1,
    borderRadius: 14,
    overflow: 'hidden',
  },
  buyButton: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
});
