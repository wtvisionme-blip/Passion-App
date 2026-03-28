import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

const VARIANTS = {
  success: { bg: `${colors.success}20`, text: colors.success },
  error: { bg: `${colors.error}20`, text: colors.error },
  warning: { bg: `${colors.warning}20`, text: colors.warning },
  primary: { bg: `${colors.primary}20`, text: colors.primary },
  secondary: { bg: `${colors.secondary}20`, text: colors.secondary },
  muted: { bg: `${colors.textMuted}20`, text: colors.textMuted },
};

export default function Badge({ label, variant = 'primary', dot = false, style }) {
  const v = VARIANTS[variant] || VARIANTS.primary;

  return (
    <View style={[styles.badge, { backgroundColor: v.bg }, style]}>
      {dot && <View style={[styles.dot, { backgroundColor: v.text }]} />}
      <Text style={[styles.text, { color: v.text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    gap: 4,
    alignSelf: 'flex-start',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  text: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
});
