import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {MarketplaceStackParamList} from '@navigation/types';
import {Card, Badge} from '@components/common';
import {colors} from '@theme/colors';
import {spacing} from '@theme/spacing';
import {typography} from '@theme/typography';
import {useAppSelector} from '@store/store';

type Props = NativeStackScreenProps<MarketplaceStackParamList, 'ShopHome'>;

const ShopHomeScreen: React.FC<Props> = ({navigation}) => {
  const {itemCount} = useAppSelector(state => state.cart);

  const categories = [
    {id: '1', name: 'Food', icon: 'food', color: colors.accent},
    {id: '2', name: 'Toys', icon: 'basketball', color: colors.primary},
    {id: '3', name: 'Accessories', icon: 'tag', color: colors.secondary},
    {id: '4', name: 'Medicine', icon: 'pill', color: colors.error},
    {id: '5', name: 'Grooming', icon: 'content-cut', color: colors.info},
    {id: '6', name: 'Beds', icon: 'bed', color: colors.warning},
  ];

  const featuredProducts = [
    {
      id: '1',
      name: 'Premium Dog Food 10kg',
      price: 4500,
      discountPrice: 3999,
      rating: 4.8,
      reviews: 234,
      image: 'https://via.placeholder.com/150',
      inStock: true,
    },
    {
      id: '2',
      name: 'Cat Scratching Post',
      price: 1200,
      rating: 4.6,
      reviews: 89,
      image: 'https://via.placeholder.com/150',
      inStock: true,
    },
    {
      id: '3',
      name: 'Pet Carrier Bag',
      price: 2500,
      discountPrice: 1999,
      rating: 4.7,
      reviews: 156,
      image: 'https://via.placeholder.com/150',
      inStock: true,
    },
  ];

  const renderProduct = ({item}: {item: typeof featuredProducts[0]}) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetail', {productId: item.id})}>
      <Image source={{uri: item.image}} style={styles.productImage} />
      {item.discountPrice && (
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>
            -{Math.round(((item.price - item.discountPrice) / item.price) * 100)}%
          </Text>
        </View>
      )}
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>
          {item.name}
        </Text>
        <View style={styles.ratingRow}>
          <Icon name="star" size={14} color={colors.accent} />
          <Text style={styles.productRating}>{item.rating}</Text>
          <Text style={styles.productReviews}>({item.reviews})</Text>
        </View>
        <View style={styles.priceRow}>
          {item.discountPrice ? (
            <>
              <Text style={styles.productPrice}>₹{item.discountPrice}</Text>
              <Text style={styles.originalPrice}>₹{item.price}</Text>
            </>
          ) : (
            <Text style={styles.productPrice}>₹{item.price}</Text>
          )}
        </View>
        {!item.inStock && (
          <Badge label="Out of Stock" variant="error" style={styles.stockBadge} />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Pet Shop</Text>
          <Text style={styles.subtitle}>Everything for your pet</Text>
        </View>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => navigation.navigate('Cart')}>
          <Icon name="cart" size={24} color={colors.textPrimary} />
          {itemCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartCount}>{itemCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <TouchableOpacity style={styles.searchBar}>
          <Icon name="magnify" size={20} color={colors.textTertiary} />
          <Text style={styles.searchText}>Search products...</Text>
        </TouchableOpacity>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map(category => (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryChip}
                onPress={() =>
                  navigation.navigate('ProductCategory', {
                    categoryId: category.id,
                    categoryName: category.name,
                  })
                }>
                <View
                  style={[
                    styles.categoryIcon,
                    {backgroundColor: category.color + '20'},
                  ]}>
                  <Icon name={category.icon} size={24} color={category.color} />
                </View>
                <Text style={styles.categoryText}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Deals Banner */}
        <View style={styles.section}>
          <Card style={styles.dealsBanner}>
            <View>
              <Text style={styles.dealsTitle}>Weekend Special 🎉</Text>
              <Text style={styles.dealsSubtitle}>Up to 40% OFF on selected items</Text>
            </View>
            <Icon name="chevron-right" size={24} color={colors.white} />
          </Card>
        </View>

        {/* Featured Products */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Products</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={featuredProducts}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productsList}
          />
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
  },
  title: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs / 2,
  },
  cartButton: {
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: colors.error,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartCount: {
    color: colors.white,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundTertiary,
    marginHorizontal: spacing.lg,
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.lg,
  },
  searchText: {
    fontSize: typography.fontSize.md,
    color: colors.textTertiary,
    marginLeft: spacing.sm,
  },
  section: {
    paddingLeft: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: spacing.lg,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.textPrimary,
  },
  seeAll: {
    fontSize: typography.fontSize.sm,
    color: colors.primary,
    fontWeight: typography.fontWeight.medium,
  },
  categoryChip: {
    alignItems: 'center',
    marginRight: spacing.md,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  categoryText: {
    fontSize: typography.fontSize.sm,
    color: colors.textPrimary,
    fontWeight: typography.fontWeight.medium,
  },
  dealsBanner: {
    backgroundColor: colors.primary,
    padding: spacing.lg,
    marginRight: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dealsTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.white,
    marginBottom: spacing.xs / 2,
  },
  dealsSubtitle: {
    fontSize: typography.fontSize.sm,
    color: colors.white,
    opacity: 0.9,
  },
  productsList: {
    paddingRight: spacing.lg,
  },
  productCard: {
    width: 160,
    backgroundColor: colors.surface,
    borderRadius: 12,
    marginRight: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: colors.backgroundTertiary,
  },
  discountBadge: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    backgroundColor: colors.error,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderRadius: 12,
  },
  discountText: {
    color: colors.white,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
  },
  productInfo: {
    padding: spacing.sm,
  },
  productName: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
    marginBottom: spacing.xs / 2,
    height: 36,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  productRating: {
    fontSize: typography.fontSize.xs,
    color: colors.textPrimary,
    marginLeft: spacing.xs / 2,
  },
  productReviews: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginLeft: spacing.xs / 2,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  productPrice: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
  originalPrice: {
    fontSize: typography.fontSize.sm,
    color: colors.textTertiary,
    textDecorationLine: 'line-through',
  },
  stockBadge: {
    marginTop: spacing.xs,
  },
  bottomSpacing: {
    height: spacing.xl,
  },
});

export default ShopHomeScreen;
