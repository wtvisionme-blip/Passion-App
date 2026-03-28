import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { useApp } from '../context/AppContext';

const MENU_ITEMS = [
  {
    section: 'Creator',
    items: [
      { id: 'edit_profile', icon: 'person-outline', label: 'Edit Profile', screen: 'EditProfile' },
      { id: 'notifications', icon: 'notifications-outline', label: 'Notifications', screen: 'Notifications', badge: true },
      { id: 'settings', icon: 'settings-outline', label: 'Settings', screen: 'Settings' },
    ],
  },
  {
    section: 'Store',
    items: [
      { id: 'my_products', icon: 'grid-outline', label: 'My Products', screen: 'MyProducts' },
      { id: 'analytics', icon: 'bar-chart-outline', label: 'Analytics', screen: null },
      { id: 'payouts', icon: 'wallet-outline', label: 'Payouts', screen: null },
    ],
  },
  {
    section: 'Support',
    items: [
      { id: 'help', icon: 'help-circle-outline', label: 'Help & Support', screen: null },
      { id: 'terms', icon: 'document-text-outline', label: 'Terms of Service', screen: null },
      { id: 'privacy', icon: 'shield-outline', label: 'Privacy Policy', screen: null },
    ],
  },
];

function MenuItem({ item, onPress, badgeCount }) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.menuItemLeft}>
        <View style={styles.menuItemIconContainer}>
          <Ionicons name={item.icon} size={20} color={colors.textSecondary} />
        </View>
        <Text style={styles.menuItemLabel}>{item.label}</Text>
        {item.badge && badgeCount > 0 && (
          <View style={styles.menuBadge}>
            <Text style={styles.menuBadgeText}>{badgeCount}</Text>
          </View>
        )}
      </View>
      <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
    </TouchableOpacity>
  );
}

export default function ProfileScreen({ navigation }) {
  const { user, myProducts, logout, unreadCount } = useApp();
  const insets = useSafeAreaInsets();

  const handleMenuPress = (item) => {
    if (item.screen) {
      navigation.navigate(item.screen);
    } else {
      Alert.alert('Coming Soon', `${item.label} will be available in a future update.`);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign Out', style: 'destructive', onPress: logout },
      ]
    );
  };

  const totalRevenue = myProducts.reduce((sum, p) => sum + p.revenue, 0);
  const totalSales = myProducts.reduce((sum, p) => sum + p.sales, 0);
  const published = myProducts.filter(p => p.isPublished).length;

  const initials = user?.name
    ?.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'U';

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => navigation.navigate('Settings')}
          >
            <Ionicons name="settings-outline" size={22} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <LinearGradient
          colors={['#1E0A3C', '#1A1A1A']}
          style={styles.profileCard}
        >
          <View style={styles.profileTop}>
            <TouchableOpacity
              style={styles.avatarContainer}
              onPress={() => navigation.navigate('EditProfile')}
            >
              <LinearGradient colors={['#A855F7', '#EC4899']} style={styles.avatar}>
                <Text style={styles.avatarText}>{initials}</Text>
              </LinearGradient>
              <View style={styles.avatarEdit}>
                <Ionicons name="camera" size={12} color="#fff" />
              </View>
            </TouchableOpacity>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{user?.name || 'Creator'}</Text>
              <Text style={styles.profileUsername}>@{user?.username || 'creator'}</Text>
              <Text style={styles.profileBio} numberOfLines={2}>{user?.bio || 'Digital creator'}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.editProfileButton}
            onPress={() => navigation.navigate('EditProfile')}
          >
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>

          {/* Stats */}
          <View style={styles.profileStats}>
            <View style={styles.profileStat}>
              <Text style={styles.profileStatValue}>{user?.followers?.toLocaleString() || '0'}</Text>
              <Text style={styles.profileStatLabel}>Followers</Text>
            </View>
            <View style={styles.profileStatDivider} />
            <View style={styles.profileStat}>
              <Text style={styles.profileStatValue}>{user?.following?.toLocaleString() || '0'}</Text>
              <Text style={styles.profileStatLabel}>Following</Text>
            </View>
            <View style={styles.profileStatDivider} />
            <View style={styles.profileStat}>
              <Text style={styles.profileStatValue}>{published}</Text>
              <Text style={styles.profileStatLabel}>Products</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Revenue Summary */}
        <View style={styles.revenueSummary}>
          <View style={styles.revenueItem}>
            <Text style={styles.revenueLabel}>Total Revenue</Text>
            <Text style={[styles.revenueValue, { color: colors.primary }]}>
              ${totalRevenue.toLocaleString()}
            </Text>
          </View>
          <View style={styles.revenueDivider} />
          <View style={styles.revenueItem}>
            <Text style={styles.revenueLabel}>Total Sales</Text>
            <Text style={styles.revenueValue}>{totalSales.toLocaleString()}</Text>
          </View>
          <View style={styles.revenueDivider} />
          <View style={styles.revenueItem}>
            <Text style={styles.revenueLabel}>Products</Text>
            <Text style={styles.revenueValue}>{myProducts.length}</Text>
          </View>
        </View>

        {/* Menu Sections */}
        {MENU_ITEMS.map((section) => (
          <View key={section.section} style={styles.menuSection}>
            <Text style={styles.menuSectionTitle}>{section.section}</Text>
            <View style={styles.menuCard}>
              {section.items.map((item, index) => (
                <React.Fragment key={item.id}>
                  <MenuItem
                    item={item}
                    onPress={() => handleMenuPress(item)}
                    badgeCount={item.id === 'notifications' ? unreadCount : 0}
                  />
                  {index < section.items.length - 1 && <View style={styles.menuDivider} />}
                </React.Fragment>
              ))}
            </View>
          </View>
        ))}

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.7}>
          <Ionicons name="log-out-outline" size={20} color={colors.error} />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>

        <Text style={styles.version}>Passion App v1.0.0</Text>
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
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  profileCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  profileTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    gap: 14,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 26,
    fontWeight: '800',
    color: '#fff',
  },
  avatarEdit: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.background,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 2,
  },
  profileUsername: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '500',
    marginBottom: 6,
  },
  profileBio: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  editProfileButton: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingVertical: 9,
    alignItems: 'center',
    marginBottom: 16,
  },
  editProfileText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  profileStats: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.08)',
    paddingTop: 16,
  },
  profileStat: {
    flex: 1,
    alignItems: 'center',
  },
  profileStatValue: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
  },
  profileStatLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  profileStatDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginVertical: 4,
  },
  revenueSummary: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 20,
  },
  revenueItem: {
    flex: 1,
    alignItems: 'center',
  },
  revenueLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    marginBottom: 4,
    fontWeight: '500',
  },
  revenueValue: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
  },
  revenueDivider: {
    width: 1,
    backgroundColor: colors.border,
    marginVertical: 4,
  },
  menuSection: {
    marginBottom: 20,
  },
  menuSectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  menuCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  menuItemIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItemLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.text,
    flex: 1,
  },
  menuBadge: {
    backgroundColor: colors.error,
    borderRadius: 8,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  menuBadgeText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '700',
  },
  menuDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: 64,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: `${colors.error}40`,
    backgroundColor: `${colors.error}10`,
    marginBottom: 16,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.error,
  },
  version: {
    textAlign: 'center',
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 8,
  },
});
