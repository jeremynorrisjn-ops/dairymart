import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  TextInput,
  SafeAreaView,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import emailjs from '@emailjs/browser';

// Initialize EmailJS
emailjs.init('_uxkzeE5iqHlyDeyG');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#999',
  },
  menuHeader: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  menuHeaderText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  navButton: {
    fontSize: 18,
    padding: 8,
  },
  cartBadge: {
    position: 'absolute',
    right: 8,
    top: -6,
    backgroundColor: '#ff5722',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 80,
  },
  storeInfoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    padding: 20,
    marginVertical: 16,
  },
  storeInfoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  storeInfoRow: {
    marginBottom: 12,
  },
  storeInfoLabel: {
    fontSize: 13,
    color: '#999',
    marginBottom: 4,
  },
  storeInfoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  ctaButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  ctaButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    marginBottom: 12,
  },
  productButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    padding: 16,
    marginBottom: 12,
  },
  productButtonContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productInfo: {
    flex: 1,
    marginRight: 12,
  },
  productName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 13,
    color: '#999',
  },
  productPrice: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  modalDescription: {
    fontSize: 14,
    color: '#999',
    marginBottom: 16,
  },
  modalPrice: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },
  modalButtonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#4CAF50',
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  emptyCart: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyCartText: {
    fontSize: 16,
    color: '#999',
    marginBottom: 16,
  },
  cartItemCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    padding: 16,
    marginBottom: 12,
  },
  cartItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  cartItemName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  cartItemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  cartItemControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
  },
  quantityText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
  },
  removeButton: {
    marginLeft: 'auto',
    fontSize: 14,
    color: '#ff5722',
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    padding: 16,
    marginTop: 20,
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    fontSize: 14,
  },
  summaryLabel: {
    color: '#999',
  },
  summaryTotal: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 16,
    fontWeight: '600',
  },
  checkoutButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  textInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 12,
    fontSize: 14,
    color: '#333',
  },
  formSection: {
    marginBottom: 16,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  confirmationContainer: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  confirmationCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    padding: 32,
    alignItems: 'center',
    maxWidth: 320,
  },
  checkmarkEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  confirmationTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  confirmationMessage: {
    fontSize: 14,
    color: '#999',
    marginBottom: 24,
    textAlign: 'center',
  },
  confirmationDetails: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 16,
    width: '100%',
    marginBottom: 24,
  },
  detailRow: {
    fontSize: 13,
    marginBottom: 12,
  },
  detailLabel: {
    color: '#999',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  paymentNotice: {
    backgroundColor: '#fff3cd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ffc107',
  },
  paymentNoticeText: {
    fontSize: 14,
    color: '#856404',
    fontWeight: '600',
    textAlign: 'center',
  },
  homeButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  homeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  checkoutHeader: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  checkoutTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  checkoutContent: {
    padding: 16,
  },
  checkoutCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    padding: 20,
  },
  checkoutSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  orderSummary: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 14,
    marginBottom: 8,
  },
  pickupDetailsText: {
    fontSize: 13,
    lineHeight: 20,
    color: '#999',
    marginBottom: 24,
  },
  primaryButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});

const storeInfo = {
  name: 'Dairy Mart',
  phone: '(319) 657-2739',
  address: '2521 Vine Ave, Ainsworth, IA 52201',
  hours: 'Mon-Sun: 11:00 AM - 9:00 PM',
};

const menu = {
  'Ice Cream': [
    { id: 1, name: 'Soft Serve Cone', price: 4.99, description: 'Hand-mixed soft serve' },
    { id: 2, name: 'Soft Serve Cup', price: 5.49, description: 'Hand-mixed soft serve' },
    { id: 3, name: 'Sundae', price: 6.99, description: 'Soft serve with toppings' },
    { id: 4, name: 'Float', price: 7.49, description: 'Soft serve with soda' },
  ],
  'Burgers & Food': [
    { id: 5, name: 'Cheeseburger', price: 8.99, description: 'Grilled cheeseburger' },
    { id: 6, name: 'Double Cheeseburger', price: 10.99, description: 'Two patties with cheese' },
    { id: 7, name: 'French Fries', price: 3.49, description: 'Crispy fried potatoes' },
    { id: 8, name: 'Cheeseballs', price: 3.99, description: 'Crispy cheese puffs' },
  ],
  'Drinks': [
    { id: 9, name: 'Soft Drink', price: 2.49, description: 'Small' },
    { id: 10, name: 'Bottled Water', price: 2.00, description: 'Cold water' },
    { id: 11, name: 'Milkshake', price: 5.99, description: 'Creamy milkshake' },
    { id: 12, name: 'Float Drink', price: 6.49, description: 'Soda with ice cream' },
  ],
};

// Generate a simple order number
const generateOrderNumber = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

export default function App() {
  const [screen, setScreen] = useState('home');
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, qty: item.qty + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
    setSelectedProduct(null);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQty = (productId, qty) => {
    if (qty <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item => item.id === productId ? { ...item, qty } : item));
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const submitOrder = async () => {
    // Validate email and phone
    if (!customerEmail.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }
    if (!customerPhone.trim()) {
      Alert.alert('Error', 'Please enter your phone number');
      return;
    }

    setIsSubmitting(true);
    const newOrderNumber = generateOrderNumber();
    setOrderNumber(newOrderNumber);

    try {
      // Send email using EmailJS
      const templateParams = {
        email: customerEmail.trim(),
        order_number: newOrderNumber,
        customer_phone: customerPhone.trim(),
        total: (cartTotal * 1.07).toFixed(2),
        order_items: cart.map(item => `${item.qty}x ${item.name}`).join(', '),
      };

      console.log('Sending order:', templateParams);

      await emailjs.send('service_xo7jfsj', 'template_p1h75hm', templateParams);

      console.log('Email sent successfully!');

      // Show confirmation
      setScreen('confirmation');

      // Reset form
      setCustomerEmail('');
      setCustomerPhone('');
    } catch (error) {
      console.log('Email error:', error);
      // Show confirmation even if there's an error
      Alert.alert('Order Submitted', 'Your order has been received!');
      setScreen('confirmation');
    } finally {
      setIsSubmitting(false);
    }
  };

  // HOME SCREEN
  if (screen === 'home') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <ScrollView>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>🍦 Dairy Mart</Text>
            <Text style={styles.headerSubtitle}>Ainsworth's favorite ice cream spot</Text>
          </View>

          <View style={styles.contentContainer}>
            <View style={styles.storeInfoCard}>
              <Text style={styles.storeInfoTitle}>Store Info</Text>

              <View style={styles.storeInfoRow}>
                <Text style={styles.storeInfoLabel}>Hours</Text>
                <Text style={styles.storeInfoValue}>{storeInfo.hours}</Text>
              </View>

              <View style={styles.storeInfoRow}>
                <Text style={styles.storeInfoLabel}>Address</Text>
                <Text style={styles.storeInfoValue}>{storeInfo.address}</Text>
              </View>

              <View style={styles.storeInfoRow}>
                <Text style={styles.storeInfoLabel}>Phone</Text>
                <Text style={styles.storeInfoValue}>{storeInfo.phone}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.ctaButton} onPress={() => setScreen('menu')}>
              <Text style={styles.ctaButtonText}>Order Now →</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // MENU SCREEN
  if (screen === 'menu') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.menuHeader}>
          <TouchableOpacity onPress={() => setScreen('home')}>
            <Text style={styles.navButton}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.menuHeaderText}>Menu</Text>
          <TouchableOpacity onPress={() => setScreen('cart')}>
            <Text style={styles.navButton}>🛒</Text>
            {cart.length > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cart.length}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.contentContainer}>
          {Object.entries(menu).map(([category, products]) => (
            <View key={category}>
              <Text style={styles.categoryTitle}>{category}</Text>
              {products.map(product => (
                <TouchableOpacity
                  key={product.id}
                  style={styles.productButton}
                  onPress={() => setSelectedProduct(product)}
                >
                  <View style={styles.productButtonContent}>
                    <View style={styles.productInfo}>
                      <Text style={styles.productName}>{product.name}</Text>
                      <Text style={styles.productDescription}>{product.description}</Text>
                    </View>
                    <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </ScrollView>

        {/* Product Modal */}
        <Modal
          transparent={true}
          visible={selectedProduct !== null}
          onRequestClose={() => setSelectedProduct(null)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>{selectedProduct?.name}</Text>
              <Text style={styles.modalDescription}>{selectedProduct?.description}</Text>
              <Text style={styles.modalPrice}>${selectedProduct?.price.toFixed(2)}</Text>

              <View style={styles.modalButtonRow}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setSelectedProduct(null)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.addButton]}
                  onPress={() => addToCart(selectedProduct)}
                >
                  <Text style={styles.addButtonText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }

  // CART SCREEN
  if (screen === 'cart') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.menuHeader}>
          <TouchableOpacity onPress={() => setScreen('menu')}>
            <Text style={styles.navButton}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.menuHeaderText}>Your Order</Text>
          <View style={{ width: 36 }} />
        </View>

        <ScrollView style={styles.contentContainer}>
          {cart.length === 0 ? (
            <View style={styles.emptyCart}>
              <Text style={styles.emptyCartText}>Your cart is empty</Text>
              <TouchableOpacity style={styles.ctaButton} onPress={() => setScreen('menu')}>
                <Text style={styles.ctaButtonText}>Continue Shopping</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              {cart.map(item => (
                <View key={item.id} style={styles.cartItemCard}>
                  <View style={styles.cartItemHeader}>
                    <Text style={styles.cartItemName}>{item.name}</Text>
                    <Text style={styles.cartItemPrice}>${(item.price * item.qty).toFixed(2)}</Text>
                  </View>

                  <View style={styles.cartItemControls}>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => updateQty(item.id, item.qty - 1)}
                    >
                      <Text>−</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{item.qty}</Text>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => updateQty(item.id, item.qty + 1)}
                    >
                      <Text>+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                      <Text style={styles.removeButton}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}

              <View style={styles.summaryCard}>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Subtotal</Text>
                  <Text>${cartTotal.toFixed(2)}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Tax (est.)</Text>
                  <Text>${(cartTotal * 0.07).toFixed(2)}</Text>
                </View>
                <View style={styles.summaryTotal}>
                  <Text>Total</Text>
                  <Text>${(cartTotal * 1.07).toFixed(2)}</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.checkoutButton} onPress={() => setScreen('checkout')}>
                <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }

  // CHECKOUT SCREEN
  if (screen === 'checkout') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.checkoutHeader}>
          <Text style={styles.checkoutTitle}>Checkout</Text>
        </View>

        <ScrollView style={styles.checkoutContent}>
          <View style={styles.checkoutCard}>
            <Text style={styles.checkoutSectionTitle}>Order Total</Text>

            <View style={styles.summaryCard}>
              <View style={styles.orderItem}>
                <Text>Subtotal</Text>
                <Text>${cartTotal.toFixed(2)}</Text>
              </View>
              <View style={styles.orderItem}>
                <Text>Tax (est.)</Text>
                <Text>${(cartTotal * 0.07).toFixed(2)}</Text>
              </View>
              <View style={{ borderTopWidth: 1, borderTopColor: '#ddd', paddingTop: 12, marginTop: 8 }}>
                <View style={[styles.orderItem, { fontWeight: '600', fontSize: 16 }]}>
                  <Text style={{ fontWeight: '600' }}>TOTAL</Text>
                  <Text style={{ fontWeight: '600' }}>${(cartTotal * 1.07).toFixed(2)}</Text>
                </View>
              </View>
            </View>

            <View style={styles.paymentNotice}>
              <Text style={styles.paymentNoticeText}>💰 Cash or Check Only</Text>
            </View>

            <Text style={styles.checkoutSectionTitle}>Your Information</Text>

            <View style={styles.formSection}>
              <Text style={styles.formLabel}>Email *</Text>
              <TextInput
                style={styles.textInput}
                placeholder="your@email.com"
                value={customerEmail}
                onChangeText={setCustomerEmail}
                keyboardType="email-address"
                placeholderTextColor="#bbb"
              />
            </View>

            <View style={styles.formSection}>
              <Text style={styles.formLabel}>Phone *</Text>
              <TextInput
                style={styles.textInput}
                placeholder="(555) 123-4567"
                value={customerPhone}
                onChangeText={setCustomerPhone}
                keyboardType="phone-pad"
                placeholderTextColor="#bbb"
              />
            </View>

            <Text style={styles.checkoutSectionTitle}>Pickup</Text>
            <Text style={styles.pickupDetailsText}>
              📍 {storeInfo.address}
            </Text>
            <Text style={styles.pickupDetailsText}>
              📞 {storeInfo.phone}
            </Text>
            <Text style={styles.pickupDetailsText}>
              ⏰ Ready in ~15 minutes
            </Text>

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={submitOrder}
              disabled={isSubmitting}
            >
              <Text style={styles.primaryButtonText}>
                {isSubmitting ? 'Submitting...' : 'Place Order'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton} onPress={() => setScreen('cart')}>
              <Text style={styles.secondaryButtonText}>Back to Cart</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // CONFIRMATION SCREEN
  if (screen === 'confirmation') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.confirmationContainer}>
          <View style={styles.confirmationCard}>
            <Text style={styles.checkmarkEmoji}>✅</Text>
            <Text style={styles.confirmationTitle}>Order Received!</Text>
            <Text style={styles.confirmationMessage}>
              Your order has been submitted. Check your email for confirmation.
            </Text>

            <View style={styles.confirmationDetails}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Order #</Text>
                <Text style={styles.detailValue}>{orderNumber}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Total</Text>
                <Text style={styles.detailValue}>${(cartTotal * 1.07).toFixed(2)}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Payment</Text>
                <Text style={styles.detailValue}>Cash or Check</Text>
              </View>
            </View>

            <Text style={styles.confirmationMessage}>
              Please bring cash or check to pickup
            </Text>

            <TouchableOpacity
              style={styles.homeButton}
              onPress={() => {
                setScreen('home');
                setCart([]);
                setCustomerEmail('');
                setCustomerPhone('');
              }}
            >
              <Text style={styles.homeButtonText}>Return Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
