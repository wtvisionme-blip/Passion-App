import React, { useRef } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  Animated,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function GradientButton({
  label,
  onPress,
  disabled = false,
  loading = false,
  icon,
  iconRight,
  colors: gradientColors = ['#A855F7', '#EC4899'],
  style,
  textStyle,
  height = 54,
  borderRadius = 14,
  variant = 'gradient', // 'gradient' | 'outline' | 'ghost'
}) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
      speed: 50,
      bounciness: 0,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const content = (
    <>
      {loading ? (
        <ActivityIndicator color="#fff" size="small" />
      ) : (
        <View style={styles.content}>
          {icon && !iconRight && (
            <Ionicons name={icon} size={20} color="#fff" />
          )}
          <Text style={[styles.label, textStyle]}>{label}</Text>
          {icon && iconRight && (
            <Ionicons name={icon} size={20} color="#fff" />
          )}
        </View>
      )}
    </>
  );

  return (
    <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, style]}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        activeOpacity={1}
        style={[styles.wrapper, { borderRadius, opacity: disabled ? 0.6 : 1 }]}
      >
        {variant === 'gradient' ? (
          <LinearGradient
            colors={disabled ? ['#374151', '#374151'] : gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.button, { height, borderRadius }]}
          >
            {content}
          </LinearGradient>
        ) : (
          <View style={[styles.button, styles.outlineButton, { height, borderRadius }]}>
            {content}
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    overflow: 'hidden',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: '#A855F7',
    backgroundColor: 'transparent',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
