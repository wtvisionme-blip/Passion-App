import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { useApp } from '../context/AppContext';

export default function SettingsScreen({ navigation }) {
  const { logout } = useApp();
  const insets = useSafeAreaInsets();

  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [salesAlerts, setSalesAlerts] = useState(true);
  const [reviewAlerts, setReviewAlerts] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This will permanently delete your account and all data. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete Account',
          style: 'destructive',
          onPress: () => Alert.alert('Request Submitted', 'Account deletion request has been submitted.'),
        },
      ]
    );
  };

  const SettingRow = ({ icon, label, description, value, onValueChange, type = 'toggle' }) => (
    <View style={styles.settingRow}>
      <View style={styles.settingIconContainer}>
        <Ionicons name={icon} size={20} color={colors.textSecondary} />
      </View>
      <View style={styles.settingInfo}>
        <Text style={styles.settingLabel}>{label}</Text>
        {description && <Text style={styles.settingDescription}>{description}</Text>}
      </View>
      {type === 'toggle' && (
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: colors.border, true: `${colors.primary}60` }}
          thumbColor={value ? colors.primary : colors.textMuted}
        />
      )}
    </View>
  );

  const SettingButton = ({ icon, label, color, onPress }) => (
    <TouchableOpacity style={styles.settingButton} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.settingIconContainer}>
        <Ionicons name={icon} size={20} color={color || colors.textSecondary} />
      </View>
      <Text style={[styles.settingLabel, { flex: 1, color: color || colors.text }]}>{label}</Text>
      <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.card}>
            <SettingRow
              icon="notifications-outline"
              label="Push Notifications"
              description="Get real-time app alerts"
              value={pushNotifications}
              onValueChange={setPushNotifications}
            />
            <View style={styles.divider} />
            <SettingRow
              icon="mail-outline"
              label="Email Notifications"
              description="Receive updates via email"
              value={emailNotifications}
              onValueChange={setEmailNotifications}
            />
            <View style={styles.divider} />
            <SettingRow
              icon="cash-outline"
              label="Sales Alerts"
              description="Notify me of new sales"
              value={salesAlerts}
              onValueChange={setSalesAlerts}
            />
            <View style={styles.divider} />
            <SettingRow
              icon="star-outline"
              label="Review Alerts"
              description="Notify me of new reviews"
              value={reviewAlerts}
              onValueChange={setReviewAlerts}
            />
            <View style={styles.divider} />
            <SettingRow
              icon="megaphone-outline"
              label="Marketing Emails"
              description="Tips, trends, and promotions"
              value={marketingEmails}
              onValueChange={setMarketingEmails}
            />
          </View>
        </View>

        {/* Security */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security</Text>
          <View style={styles.card}>
            <SettingRow
              icon="shield-checkmark-outline"
              label="Two-Factor Auth"
              description="Add an extra layer of security"
              value={twoFactorAuth}
              onValueChange={setTwoFactorAuth}
            />
            <View style={styles.divider} />
            <SettingButton
              icon="key-outline"
              label="Change Password"
              onPress={() => Alert.alert('Change Password', 'A password reset link will be sent to your email.')}
            />
            <View style={styles.divider} />
            <SettingButton
              icon="phone-portrait-outline"
              label="Active Sessions"
              onPress={() => Alert.alert('Active Sessions', 'You are currently signed in on 1 device.')}
            />
          </View>
        </View>

        {/* Payments */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payments & Billing</Text>
          <View style={styles.card}>
            <SettingButton
              icon="card-outline"
              label="Payment Methods"
              onPress={() => Alert.alert('Coming Soon', 'Payment settings will be available soon.')}
            />
            <View style={styles.divider} />
            <SettingButton
              icon="receipt-outline"
              label="Billing History"
              onPress={() => Alert.alert('Coming Soon', 'Billing history will be available soon.')}
            />
            <View style={styles.divider} />
            <SettingButton
              icon="wallet-outline"
              label="Payout Settings"
              onPress={() => Alert.alert('Coming Soon', 'Payout settings will be available soon.')}
            />
          </View>
        </View>

        {/* About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.card}>
            <SettingButton
              icon="document-text-outline"
              label="Terms of Service"
              onPress={() => Alert.alert('Terms of Service', 'Our terms govern your use of Passion App.')}
            />
            <View style={styles.divider} />
            <SettingButton
              icon="shield-outline"
              label="Privacy Policy"
              onPress={() => Alert.alert('Privacy Policy', 'We take your privacy seriously.')}
            />
            <View style={styles.divider} />
            <SettingButton
              icon="help-circle-outline"
              label="Help & Support"
              onPress={() => Alert.alert('Support', 'Contact us at support@passionapp.com')}
            />
            <View style={styles.divider} />
            <View style={styles.settingRow}>
              <View style={styles.settingIconContainer}>
                <Ionicons name="information-circle-outline" size={20} color={colors.textSecondary} />
              </View>
              <Text style={styles.settingLabel}>Version</Text>
              <Text style={styles.versionText}>1.0.0</Text>
            </View>
          </View>
        </View>

        {/* Danger Zone */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.card}>
            <TouchableOpacity style={styles.settingButton} onPress={logout} activeOpacity={0.7}>
              <View style={styles.settingIconContainer}>
                <Ionicons name="log-out-outline" size={20} color={colors.error} />
              </View>
              <Text style={[styles.settingLabel, { flex: 1, color: colors.error }]}>Sign Out</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.settingButton} onPress={handleDeleteAccount} activeOpacity={0.7}>
              <View style={styles.settingIconContainer}>
                <Ionicons name="warning-outline" size={20} color={colors.error} />
              </View>
              <Text style={[styles.settingLabel, { flex: 1, color: colors.error }]}>Delete Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 12,
  },
  settingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 12,
  },
  settingIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.text,
  },
  settingDescription: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: 62,
  },
  versionText: {
    fontSize: 14,
    color: colors.textMuted,
    fontWeight: '500',
  },
});
