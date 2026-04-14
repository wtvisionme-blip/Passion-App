import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppContext = createContext(null);

const STORAGE_KEYS = {
  USER: '@passion_user',
  PRODUCTS: '@passion_products',
  NOTIFICATIONS: '@passion_notifications',
};

const SAMPLE_PRODUCTS = [
  {
    id: '1',
    title: 'Ultimate Notion Dashboard',
    description: 'A comprehensive Notion workspace template with 50+ pages for productivity, project management, and personal organization.',
    price: 29,
    category: 'Template',
    type: 'template',
    image: null,
    emoji: '📊',
    tags: ['notion', 'productivity', 'workspace'],
    sales: 342,
    revenue: 9918,
    rating: 4.8,
    reviews: 127,
    creatorId: 'demo_user',
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    featured: true,
    isPublished: true,
  },
  {
    id: '2',
    title: 'Lightroom Cinematic Presets',
    description: 'Professional cinematic color grading presets for Lightroom. Transform your photos with Hollywood-style looks.',
    price: 19,
    category: 'Preset',
    type: 'preset',
    image: null,
    emoji: '🎬',
    tags: ['lightroom', 'photography', 'editing'],
    sales: 891,
    revenue: 16929,
    rating: 4.9,
    reviews: 312,
    creatorId: 'demo_user',
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    featured: true,
    isPublished: true,
  },
  {
    id: '3',
    title: 'UI Design System Kit',
    description: 'Complete Figma UI kit with 500+ components, dark/light modes, and comprehensive design tokens.',
    price: 49,
    category: 'Design',
    type: 'design',
    image: null,
    emoji: '🎨',
    tags: ['figma', 'ui', 'design-system'],
    sales: 215,
    revenue: 10535,
    rating: 4.7,
    reviews: 89,
    creatorId: 'demo_user',
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    featured: false,
    isPublished: true,
  },
  {
    id: '4',
    title: 'Social Media Growth Guide',
    description: 'Step-by-step guide to growing your audience from 0 to 100k followers. Includes strategies, templates, and scripts.',
    price: 37,
    category: 'eBook',
    type: 'ebook',
    image: null,
    emoji: '📱',
    tags: ['social-media', 'growth', 'marketing'],
    sales: 567,
    revenue: 20979,
    rating: 4.6,
    reviews: 203,
    creatorId: 'other_creator',
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    featured: false,
    isPublished: true,
  },
  {
    id: '5',
    title: 'Framer Motion Animations Pack',
    description: '40+ ready-to-use Framer Motion animation components for React. Speed up your development with beautiful animations.',
    price: 59,
    category: 'Code',
    type: 'code',
    image: null,
    emoji: '⚡',
    tags: ['react', 'animation', 'framer'],
    sales: 178,
    revenue: 10502,
    rating: 4.9,
    reviews: 61,
    creatorId: 'other_creator',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    featured: true,
    isPublished: true,
  },
  {
    id: '6',
    title: 'Brand Identity Starter Kit',
    description: 'Complete brand identity package with logo templates, color palettes, typography guides, and brand guidelines.',
    price: 79,
    category: 'Template',
    type: 'template',
    image: null,
    emoji: '✨',
    tags: ['branding', 'identity', 'design'],
    sales: 134,
    revenue: 10586,
    rating: 4.8,
    reviews: 47,
    creatorId: 'other_creator',
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    featured: false,
    isPublished: true,
  },
];

const SAMPLE_NOTIFICATIONS = [
  {
    id: 'n1',
    type: 'sale',
    title: 'New Sale!',
    message: 'Someone purchased "Ultimate Notion Dashboard"',
    time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    read: false,
    icon: '💰',
  },
  {
    id: 'n2',
    type: 'review',
    title: 'New Review',
    message: 'You got a 5-star review on "Lightroom Cinematic Presets"',
    time: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    read: false,
    icon: '⭐',
  },
  {
    id: 'n3',
    type: 'milestone',
    title: 'Milestone Reached!',
    message: 'Your store hit $10,000 in total revenue!',
    time: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    read: true,
    icon: '🎉',
  },
  {
    id: 'n4',
    type: 'sale',
    title: 'New Sale!',
    message: 'Someone purchased "UI Design System Kit"',
    time: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    read: true,
    icon: '💰',
  },
];

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState(SAMPLE_PRODUCTS);
  const [notifications, setNotifications] = useState(SAMPLE_NOTIFICATIONS);
  const [isLoading, setIsLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      const [storedUser, storedProducts, storedNotifications] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.USER),
        AsyncStorage.getItem(STORAGE_KEYS.PRODUCTS),
        AsyncStorage.getItem(STORAGE_KEYS.NOTIFICATIONS),
      ]);

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      if (storedProducts) {
        const parsed = JSON.parse(storedProducts);
        if (parsed.length > 0) setProducts(parsed);
      }
      if (storedNotifications) {
        const parsed = JSON.parse(storedNotifications);
        if (parsed.length > 0) setNotifications(parsed);
      }
    } catch (error) {
      console.error('Failed to load app data:', error);
    } finally {
      // Small delay for splash screen
      setTimeout(() => setIsLoading(false), 1500);
    }
  };

  const saveUser = async (userData) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
    } catch (error) {
      console.error('Failed to save user:', error);
    }
  };

  const saveProducts = async (prods) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(prods));
    } catch (error) {
      console.error('Failed to save products:', error);
    }
  };

  const saveNotifications = async (notifs) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifs));
    } catch (error) {
      console.error('Failed to save notifications:', error);
    }
  };

  // Auth actions
  const login = useCallback(async (email, password) => {
    const newUser = {
      id: 'demo_user',
      email,
      name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      username: email.split('@')[0],
      avatar: null,
      bio: 'Digital creator & entrepreneur',
      joinedAt: new Date().toISOString(),
      totalRevenue: 37382,
      totalSales: 1548,
      followers: 2840,
      following: 156,
    };
    setUser(newUser);
    await saveUser(newUser);
    return { success: true };
  }, []);

  const signup = useCallback(async (name, email, password) => {
    const newUser = {
      id: 'demo_user',
      email,
      name,
      username: email.split('@')[0],
      avatar: null,
      bio: 'New digital creator',
      joinedAt: new Date().toISOString(),
      totalRevenue: 0,
      totalSales: 0,
      followers: 0,
      following: 0,
    };
    setUser(newUser);
    await saveUser(newUser);
    return { success: true };
  }, []);

  const logout = useCallback(async () => {
    setUser(null);
    await AsyncStorage.removeItem(STORAGE_KEYS.USER);
  }, []);

  const updateUser = useCallback(async (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    await saveUser(updatedUser);
  }, [user]);

  // Product actions
  const addProduct = useCallback(async (productData) => {
    const newProduct = {
      ...productData,
      id: Date.now().toString(),
      creatorId: user?.id || 'demo_user',
      createdAt: new Date().toISOString(),
      sales: 0,
      revenue: 0,
      rating: 0,
      reviews: 0,
      isPublished: productData.isPublished ?? false,
    };
    const updated = [newProduct, ...products];
    setProducts(updated);
    await saveProducts(updated);

    // Add notification
    const notif = {
      id: Date.now().toString() + '_notif',
      type: 'product',
      title: 'Product Created!',
      message: `"${newProduct.title}" has been ${newProduct.isPublished ? 'published' : 'saved as draft'}`,
      time: new Date().toISOString(),
      read: false,
      icon: '🚀',
    };
    const updatedNotifs = [notif, ...notifications];
    setNotifications(updatedNotifs);
    await saveNotifications(updatedNotifs);

    return newProduct;
  }, [products, notifications, user]);

  const updateProduct = useCallback(async (productId, updates) => {
    const updated = products.map(p =>
      p.id === productId ? { ...p, ...updates } : p
    );
    setProducts(updated);
    await saveProducts(updated);
  }, [products]);

  const deleteProduct = useCallback(async (productId) => {
    const updated = products.filter(p => p.id !== productId);
    setProducts(updated);
    await saveProducts(updated);
  }, [products]);

  const togglePublish = useCallback(async (productId) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    const updated = products.map(p =>
      p.id === productId ? { ...p, isPublished: !p.isPublished } : p
    );
    setProducts(updated);
    await saveProducts(updated);

    const notif = {
      id: Date.now().toString() + '_notif',
      type: 'product',
      title: product.isPublished ? 'Product Unpublished' : 'Product Published!',
      message: `"${product.title}" is now ${product.isPublished ? 'a draft' : 'live'}`,
      time: new Date().toISOString(),
      read: false,
      icon: product.isPublished ? '📝' : '🚀',
    };
    const updatedNotifs = [notif, ...notifications];
    setNotifications(updatedNotifs);
    await saveNotifications(updatedNotifs);
  }, [products, notifications]);

  // Wishlist actions
  const toggleWishlist = useCallback((productId) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  }, []);

  const isWishlisted = useCallback((productId) => {
    return wishlist.includes(productId);
  }, [wishlist]);

  // Cart actions
  const addToCart = useCallback((product) => {
    setCart(prev => {
      if (prev.find(item => item.id === product.id)) return prev;
      return [...prev, product];
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  }, []);

  const isInCart = useCallback((productId) => {
    return cart.some(item => item.id === productId);
  }, [cart]);

  // Notification actions
  const markNotificationRead = useCallback(async (notifId) => {
    const updated = notifications.map(n =>
      n.id === notifId ? { ...n, read: true } : n
    );
    setNotifications(updated);
    await saveNotifications(updated);
  }, [notifications]);

  const markAllNotificationsRead = useCallback(async () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    await saveNotifications(updated);
  }, [notifications]);

  const clearNotifications = useCallback(async () => {
    setNotifications([]);
    await saveNotifications([]);
  }, []);

  const unreadCount = useMemo(
    () => notifications.filter(n => !n.read).length,
    [notifications]
  );

  const myProducts = useMemo(
    () => products.filter(p => p.creatorId === user?.id),
    [products, user?.id]
  );

  const publishedProducts = useMemo(
    () => products.filter(p => p.isPublished),
    [products]
  );

  const value = useMemo(() => ({
    user,
    products,
    myProducts,
    publishedProducts,
    notifications,
    unreadCount,
    wishlist,
    cart,
    isLoading,
    login,
    signup,
    logout,
    updateUser,
    addProduct,
    updateProduct,
    deleteProduct,
    togglePublish,
    toggleWishlist,
    isWishlisted,
    addToCart,
    removeFromCart,
    isInCart,
    markNotificationRead,
    markAllNotificationsRead,
    clearNotifications,
  }), [
    user, products, myProducts, publishedProducts, notifications, unreadCount,
    wishlist, cart, isLoading,
    login, signup, logout, updateUser,
    addProduct, updateProduct, deleteProduct, togglePublish,
    toggleWishlist, isWishlisted, addToCart, removeFromCart, isInCart,
    markNotificationRead, markAllNotificationsRead, clearNotifications,
  ]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
