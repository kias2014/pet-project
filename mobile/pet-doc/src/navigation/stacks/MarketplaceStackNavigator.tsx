import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MarketplaceStackParamList} from '../types';

// Import screens
import ShopHomeScreen from '@screens/marketplace/ShopHomeScreen';
import ProductCategoryScreen from '@screens/marketplace/ProductCategoryScreen';
import ProductDetailScreen from '@screens/marketplace/ProductDetailScreen';
import CartScreen from '@screens/marketplace/CartScreen';
import CheckoutScreen from '@screens/marketplace/CheckoutScreen';
import OrdersScreen from '@screens/marketplace/OrdersScreen';
import OrderDetailScreen from '@screens/marketplace/OrderDetailScreen';
import TrackOrderScreen from '@screens/marketplace/TrackOrderScreen';

const Stack = createNativeStackNavigator<MarketplaceStackParamList>();

const MarketplaceStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ShopHome"
        component={ShopHomeScreen}
        options={{title: 'Shop'}}
      />
      <Stack.Screen
        name="ProductCategory"
        component={ProductCategoryScreen}
        options={{title: 'Products'}}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{title: 'Product Details'}}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{title: 'Shopping Cart'}}
      />
      <Stack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{title: 'Checkout'}}
      />
      <Stack.Screen
        name="Orders"
        component={OrdersScreen}
        options={{title: 'My Orders'}}
      />
      <Stack.Screen
        name="OrderDetail"
        component={OrderDetailScreen}
        options={{title: 'Order Details'}}
      />
      <Stack.Screen
        name="TrackOrder"
        component={TrackOrderScreen}
        options={{title: 'Track Order'}}
      />
    </Stack.Navigator>
  );
};

export default MarketplaceStackNavigator;
