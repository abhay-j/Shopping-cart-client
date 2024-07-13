
import React, { useState, useEffect } from 'react';
import {  useNavigate } from "react-router-dom";
import axios from 'axios';
import {
  Card,
  CardBody,
  Typography,
  Button,
  Input,
} from "@material-tailwind/react";

export function Cart({ shoppingCartResponse, user }) {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [couponCode, setCouponCode] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      if (shoppingCartResponse && shoppingCartResponse.success) {
        try {
          const response = await axios.get(`https://shopping-cart-rest-4cb8bc3adabc.herokuapp.com/api/carts/${shoppingCartResponse.cartId}/items`, {
            headers: {
              Authorization: `Bearer ${user.accessToken}`
            }
          });
          setCartItems(response.data);
        } catch (err) {
          console.error('Error fetching cart items:', err);
          setError('Failed to fetch cart items. Please try again later.');
        }
      }
    };

    fetchCartItems();
  }, [shoppingCartResponse, user.accessToken]);

  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    setTotalPrice(total);
  }, [cartItems]);

  const handleDeleteItem = async (itemId) => {
    try {
      await axios.delete(`https://shopping-cart-rest-4cb8bc3adabc.herokuapp.com/api/carts/${shoppingCartResponse.cartId}/items/${itemId}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`
        }
      });
      setCartItems(cartItems.filter(item => item.id !== itemId));
    } catch (err) {
      console.error('Error deleting cart item:', err);
      setError('Failed to delete item. Please try again later.');
    }
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    // Implement the API call to update quantity
    setCartItems(cartItems.map(item => 
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const handleCheckout = () => {
    // Implement coupon logic here
    console.log('checkout:');
    navigate("/checkout")
  };

  const continueShopping = () => {
    // Implement coupon logic here
   
    navigate("/")
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-4">
            Cart Items
          </Typography>
          <div className="overflow-x-auto">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Image</th>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Name</th>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Price</th>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Quantity</th>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(({ id, product, quantity }) => (
                  <tr key={id}>
                    <td className="p-4">
                      <img src={product.url} alt={product.title} className="h-16 w-16 object-cover rounded" />
                    </td>
                    <td className="p-4">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {product.title}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        ${product.price.toFixed(2)}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button 
                          size="sm" 
                          color="blue-gray" 
                          variant="outlined"
                          onClick={() => handleQuantityChange(id, Math.max(1, quantity - 1))}
                        >
                          -
                        </Button>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {quantity}
                        </Typography>
                        <Button 
                          size="sm" 
                          color="blue-gray" 
                          variant="outlined"
                          onClick={() => handleQuantityChange(id, quantity + 1)}
                        >
                          +
                        </Button>
                      </div>
                    </td>
                    <td className="p-4">
                      <Button
                        color="red"
                        size="sm"
                        onClick={() => handleDeleteItem(id)}
                      >
                        X
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8 flex flex-col md:flex-row justify-between items-start md:items-center">
            {/* <div className="w-full md:w-1/2 mb-4 md:mb-0">
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Discount Coupon Codes
              </Typography>
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <Button color="blue" onClick={handleApplyCoupon}>
                  Apply Coupon
                </Button>
              </div>
            </div> */}
            <div className="w-full md:w-1/2">
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Cart Totals
              </Typography>
              <div className="flex justify-between mb-2">
                <Typography variant="small">Subtotal:</Typography>
                <Typography variant="small" className="font-semibold">${totalPrice.toFixed(2)}</Typography>
              </div>
              <div className="flex justify-between mb-2">
                <Typography variant="small">Shipping:</Typography>
                <Typography variant="small" className="font-semibold">$5.00</Typography>
              </div>
              <div className="flex justify-between">
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h6" className="font-semibold">${(totalPrice + 5).toFixed(2)}</Typography>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-between">
            <Button className="bg-red-900" onClick={continueShopping}>Continue Shopping</Button>
            <Button className="bg-red-900" onClick={handleCheckout}>Checkout</Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}