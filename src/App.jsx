
// import { useState, useEffect } from 'react'
// import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
// import { CustomNavBar } from './components/Navbar'
// import { Menu } from './components/Menu'
// import { Signup } from './components/SignUp';
// import { Login } from './components/Login';
// import { Cart } from './components/Cart'
// import { CheckoutForm } from './components/CheckoutForm'
// import { GuestCart } from './components/GuestCart'

// function App() {
//   const [user, setUser] = useState(null);
//   const [shoppingCartResponse, setShoppingCartResponse] = useState(null);
//   const [guestCart, setGuestCart] = useState(() => {
//     const savedCart = localStorage.getItem('guestCart');
//     return savedCart ? JSON.parse(savedCart) : [];
//   });

//   useEffect(() => {
//     localStorage.setItem('guestCart', JSON.stringify(guestCart));
//   }, [guestCart]);

//   const handleLogin = (userData, shoppingCartResponseData) => {
//     setUser(userData);
//     console.log(userData);
//     localStorage.setItem('token', userData.accessToken);
//     console.log("this is from app.jsx. State has been updated");
//     setShoppingCartResponse(shoppingCartResponseData);

//     // Transfer guest cart items to user's cart if there are any
//     if (guestCart.length > 0) {
//       // Here you would typically make an API call to add these items to the user's cart
//       console.log("Transferring guest cart items to user's cart:", guestCart);
//       // After successfully transferring, clear the guest cart
//       setGuestCart([]);
//     }
//   };

//   const handleLogout = () => {
//     setUser(null);
//     localStorage.removeItem('token');
//     setShoppingCartResponse(null);
//     navigate("/");
//   };

//   const addToGuestCart = (item) => {
//     setGuestCart(prevCart => {
//       const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
//       if (existingItem) {
//         return prevCart.map(cartItem =>
//           cartItem.id === item.id
//             ? { ...cartItem, quantity: cartItem.quantity + 1 }
//             : cartItem
//         );
//       } else {
//         return [...prevCart, { ...item, quantity: 1 }];
//       }
//     });
//   };

//   return (
    
//       <div style={{ backgroundColor: '#fff9f4' }}>
//         <CustomNavBar user={user} onLogout={handleLogout} />
//         <div className=''>
//           <Routes>
//             <Route path="/" element={<Menu user={user} shoppingCartResponse={shoppingCartResponse} addToGuestCart={addToGuestCart} />} />
//             {user 
//               ? <Route path="/cart" element={<Cart user={user} shoppingCartResponse={shoppingCartResponse} />} />
//               : <Route path="/cart" element={<GuestCart guestCart={guestCart} setGuestCart={setGuestCart} />} />
//             }
//             <Route path="/login" element={<Login onLogin={handleLogin} />} />
//             <Route path="/signup" element={<Signup />} />
//             <Route 
//               path="/checkout" 
//               element={
//                 <CheckoutFormWrapper 
//                   user={user} 
//                   guestCart={guestCart} 
//                   shoppingCartResponse={shoppingCartResponse} 
//                 />
//               } 
//             />
//           </Routes>
//         </div>
//       </div>
   
//   )
// }

// function CheckoutFormWrapper({ user, guestCart, shoppingCartResponse }) {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const cartItems = location.state?.cartItems || (user ? shoppingCartResponse?.items : guestCart);

//   return <CheckoutForm cartItems={cartItems} navigate={navigate} />;
// }

// export default App
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CustomNavBar } from './components/Navbar'
import { Menu } from './components/Menu'
import { Signup } from './components/SignUp';
import { Login } from './components/Login';
import { Cart } from './components/Cart'
import { CheckoutForm } from './components/CheckoutForm'
import { GuestCart } from './components/GuestCart'

function App() {
 const [user, setUser] = useState(null);
 const [shoppingCartResponse, setShoppingCartResponse] = useState(null);
 const [cartItems, setCartItems] = useState([]);
 const [guestCart, setGuestCart] = useState(() => {
   const savedCart = localStorage.getItem('guestCart');
   return savedCart ? JSON.parse(savedCart) : [];
 });

 useEffect(() => {
   localStorage.setItem('guestCart', JSON.stringify(guestCart));
 }, [guestCart]);

 useEffect(() => {
   if (user && shoppingCartResponse) {
     fetchCartItems();
   }
 }, [user, shoppingCartResponse]);

 const fetchCartItems = async () => {
   try {
     const response = await axios.get(`https://shopping-cart-rest-4cb8bc3adabc.herokuapp.com/api/carts/${shoppingCartResponse.cartId}/items`, {
       headers: {
         Authorization: `Bearer ${user.accessToken}`
       }
     });
     setCartItems(response.data);
   } catch (error) {
     console.error('Error fetching cart items:', error);
   }
 };
 const handleLogin = (userData, shoppingCartResponseData) => {
   setUser(userData);
  
   localStorage.setItem('token', userData.accessToken);
   console.log("this is from app.jsx. State has been updated");
   setShoppingCartResponse(shoppingCartResponseData);

   // Transfer guest cart items to user's cart if there are any
   if (guestCart.length > 0) {
     // Here you would typically make an API call to add these items to the user's cart
     console.log("Transferring guest cart items to user's cart:", guestCart);
     // After successfully transferring, clear the guest cart
     setGuestCart([]);
   }
 };

 const handleLogout = () => {
   setUser(null);
   localStorage.removeItem('token');
   setShoppingCartResponse(null);
   setCartItems([]);
   navigate("/");
 };

 const addToGuestCart = (item) => {
   setGuestCart(prevCart => {
     const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
     if (existingItem) {
       return prevCart.map(cartItem =>
         cartItem.id === item.id
           ? { ...cartItem, quantity: cartItem.quantity + 1 }
           : cartItem
       );
     } else {
       return [...prevCart, { ...item, quantity: 1 }];
     }
   });
 };

 const updateCartItemQuantity = (itemId, newQuantity) => {
  setCartItems(prevItems =>
    prevItems.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    )
  );
};
const updateCartItems = (newItem) => {
  setCartItems(prevItems => {
    const existingItemIndex = prevItems.findIndex(item => item.id === newItem.id);
    if (existingItemIndex !== -1) {
      // If the item already exists, update its quantity
      const updatedItems = [...prevItems];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        quantity: updatedItems[existingItemIndex].quantity + newItem.quantity
      };
      return updatedItems;
    } else {
      // If it's a new item, add it to the array
      return [...prevItems, newItem];
    }
  });
};

const removeCartItem = (itemId) => {
  setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
};

console.log(cartItems)
 return (
   <div style={{ backgroundColor: '#fff9f4' }}>
     <CustomNavBar user={user} onLogout={handleLogout} />
     <div className=''>
       <Routes>
         <Route path="/" element={<Menu user={user} shoppingCartResponse={shoppingCartResponse} addToGuestCart={addToGuestCart}   updateCartItems={updateCartItems}/>} />
        
         {user
           ? <Route path="/cart" element={<Cart user={user} shoppingCartResponse={shoppingCartResponse} cartItems={cartItems} updateCartItemQuantity={updateCartItemQuantity}
           removeCartItem={removeCartItem}/>} />
           : <Route path="/cart" element={<GuestCart guestCart={guestCart} setGuestCart={setGuestCart} />} />
         }
        
        
         <Route path="/login" element={<Login onLogin={handleLogin} />} />
         <Route path="/signup" element={<Signup />} />
         <Route
           path="/checkout"
           element={
             <CheckoutFormWrapper
               user={user}
               guestCart={guestCart}
               cartItems={cartItems}
             />
           }
         />
       </Routes>
     </div>
   </div>
 )
}

function CheckoutFormWrapper({ user, guestCart, cartItems }) {
 const location = useLocation();
 const navigate = useNavigate();
 const itemsToCheckout = user ? cartItems : guestCart;

 return <CheckoutForm user={user} cartItems={itemsToCheckout} navigate={navigate} />;
}

export default App