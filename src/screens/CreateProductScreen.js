import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Switch,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { useApp } from '../context/AppContext';

const CATEGORIES = ['Template', 'Preset', 'Design', 'eBook', 'Code', 'Course', 'Other'];
const EMOJIS = ['📊', '📱', '🎬', '🎨', '⚡', '✨', '📚', '🎯', '🚀', '💡', '🎵', '🖼️', '📝', '🔧', '🌟', '💻'];
const PRICE_SUGGESTIONS = [9, 19, 29, 49, 79, 99, 149, 199];

export default function CreateProductScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [emoji, setEmoji] = useState('📦');
  const [tags, setTags] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { addProduct } = useApp();
  const insets = useSafeAreaInsets();

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    else if (title.trim().length < 3) newErrors.title = 'Title must be at least 3 characters';
    if (!description.trim()) newErrors.description = 'Description is required';
    else if (description.trim().length < 10) newErrors.description = 'Description must be at least 10 characters';
    if (!price) newErrors.price = 'Price is required';
    else if (isNaN(parseFloat(price)) || parseFloat(price) <= 0) newErrors.price = 'Enter a valid price';
    if (!category) newErrors.category = 'Please select a category';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = async () => {
    if (!validate()) return;
    setIsLoading(true);
    try {
      const tagsArray = tags
        .split(',')
        .map(t => t.trim().toLowerCase())
        .filter(t => t.length > 0);

      const product = await addProduct({
        title: title.trim(),
        description: description.trim(),
        price: parseFloat(price),
        category,
        type: category.toLowerCase(),
        emoji,
        tags: tagsArray,
        isPublished,
        featured: false,
      });

      navigation.replace('ProductDetail', { product });
    } catch (error) {
      Alert.alert('Error', 'Failed to create product. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveDraft = async () => {
    if (!title.trim()) {
      Alert.alert('Title Required', 'Please add a title before saving as draft.');
      return;
    }
    setIsLoading(true);
    try {
      const product = await addProduct({
        title: title.trim(),
        description: description.trim() || 'No description yet',
        price: parseFloat(price) || 0,
        category: category || 'Other',
        type: category?.toLowerCase() || 'other',
        emoji,
        tags: [],
        isPublished: false,
        featured: false,
      });
      Alert.alert('Saved!', 'Product saved as draft.', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to save draft.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
          <Ionicons name="close" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Product</Text>
        <TouchableOpacity
          onPress={handleSaveDraft}
          style={styles.draftButton}
          disabled={isLoading}
        >
          <Text style={styles.draftButtonText}>Save Draft</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Emoji Picker */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Product Icon</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.emojiScroll}>
            {EMOJIS.map(e => (
              <TouchableOpacity
                key={e}
                style={[styles.emojiButton, emoji === e && styles.emojiButtonActive]}
                onPress={() => setEmoji(e)}
              >
                <Text style={styles.emojiText}>{e}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Title */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Product Title *</Text>
          <TextInput
            style={[styles.textInput, errors.title && styles.inputError]}
            value={title}
            onChangeText={(text) => {
              setTitle(text);
              if (errors.title) setErrors(prev => ({ ...prev, title: null }));
            }}
            placeholder="e.g. Ultimate Notion Dashboard"
            placeholderTextColor={colors.textMuted}
            maxLength={80}
          />
          <View style={styles.inputMeta}>
            {errors.title ? (
              <Text style={styles.errorText}>{errors.title}</Text>
            ) : (
              <View />
            )}
            <Text style={styles.charCount}>{title.length}/80</Text>
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Description *</Text>
          <TextInput
            style={[styles.textArea, errors.description && styles.inputError]}
            value={description}
            onChangeText={(text) => {
              setDescription(text);
              if (errors.description) setErrors(prev => ({ ...prev, description: null }));
            }}
            placeholder="Describe what customers get with this product..."
            placeholderTextColor={colors.textMuted}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            maxLength={500}
          />
          <View style={styles.inputMeta}>
            {errors.description ? (
              <Text style={styles.errorText}>{errors.description}</Text>
            ) : (
              <View />
            )}
            <Text style={styles.charCount}>{description.length}/500</Text>
          </View>
        </View>

        {/* Category */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Category *</Text>
          <View style={styles.categoryGrid}>
            {CATEGORIES.map(cat => (
              <TouchableOpacity
                key={cat}
                style={[styles.categoryChip, category === cat && styles.categoryChipActive]}
                onPress={() => {
                  setCategory(cat);
                  if (errors.category) setErrors(prev => ({ ...prev, category: null }));
                }}
              >
                <Text style={[styles.categoryChipText, category === cat && styles.categoryChipTextActive]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {errors.category && <Text style={styles.errorText}>{errors.category}</Text>}
        </View>

        {/* Price */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Price (USD) *</Text>
          <View style={[styles.priceInputContainer, errors.price && styles.inputError]}>
            <Text style={styles.priceCurrency}>$</Text>
            <TextInput
              style={styles.priceInput}
              value={price}
              onChangeText={(text) => {
                setPrice(text);
                if (errors.price) setErrors(prev => ({ ...prev, price: null }));
              }}
              placeholder="0.00"
              placeholderTextColor={colors.textMuted}
              keyboardType="decimal-pad"
            />
          </View>
          {errors.price && <Text style={styles.errorText}>{errors.price}</Text>}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.priceSuggestions}>
            {PRICE_SUGGESTIONS.map(p => (
              <TouchableOpacity
                key={p}
                style={[styles.priceSuggestion, price === String(p) && styles.priceSuggestionActive]}
                onPress={() => setPrice(String(p))}
              >
                <Text style={[styles.priceSuggestionText, price === String(p) && styles.priceSuggestionTextActive]}>
                  ${p}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Tags */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Tags (optional)</Text>
          <TextInput
            style={styles.textInput}
            value={tags}
            onChangeText={setTags}
            placeholder="notion, template, productivity"
            placeholderTextColor={colors.textMuted}
            autoCapitalize="none"
          />
          <Text style={styles.hintText}>Separate with commas. Helps customers find your product.</Text>
        </View>

        {/* Publish Toggle */}
        <View style={styles.section}>
          <View style={styles.publishRow}>
            <View style={styles.publishInfo}>
              <Text style={styles.publishTitle}>Publish immediately</Text>
              <Text style={styles.publishSubtitle}>
                {isPublished ? 'Your product will be live right away' : 'Save as draft first'}
              </Text>
            </View>
            <Switch
              value={isPublished}
              onValueChange={setIsPublished}
              trackColor={{ false: colors.border, true: `${colors.primary}60` }}
              thumbColor={isPublished ? colors.primary : colors.textMuted}
            />
          </View>
        </View>

        {/* Create Button */}
        <TouchableOpacity
          onPress={handleCreate}
          disabled={isLoading}
          style={styles.createButtonWrapper}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={['#A855F7', '#EC4899']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.createButton}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <>
                <Ionicons name="rocket-outline" size={20} color="#fff" />
                <Text style={styles.createButtonText}>
                  {isPublished ? 'Publish Product' : 'Create Product'}
                </Text>
              </>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
  },
  draftButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  draftButtonText: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  emojiScroll: {
    marginLeft: -4,
  },
  emojiButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  emojiButtonActive: {
    borderColor: colors.primary,
    backgroundColor: `${colors.primary}20`,
  },
  emojiText: {
    fontSize: 22,
  },
  textInput: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: colors.text,
    fontSize: 15,
  },
  textArea: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 14,
    color: colors.text,
    fontSize: 15,
    minHeight: 110,
  },
  inputError: {
    borderColor: colors.error,
  },
  inputMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  errorText: {
    fontSize: 12,
    color: colors.error,
  },
  charCount: {
    fontSize: 11,
    color: colors.textMuted,
  },
  hintText: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 6,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryChipActive: {
    backgroundColor: `${colors.primary}20`,
    borderColor: colors.primary,
  },
  categoryChipText: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  categoryChipTextActive: {
    color: colors.primary,
  },
  priceInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 16,
    height: 54,
  },
  priceCurrency: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textSecondary,
    marginRight: 8,
  },
  priceInput: {
    flex: 1,
    color: colors.text,
    fontSize: 20,
    fontWeight: '700',
  },
  priceSuggestions: {
    marginTop: 10,
  },
  priceSuggestion: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 8,
  },
  priceSuggestionActive: {
    backgroundColor: `${colors.primary}20`,
    borderColor: colors.primary,
  },
  priceSuggestionText: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  priceSuggestionTextActive: {
    color: colors.primary,
  },
  publishRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  publishInfo: {
    flex: 1,
  },
  publishTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 3,
  },
  publishSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  createButtonWrapper: {
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 8,
  },
  createButton: {
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
});
