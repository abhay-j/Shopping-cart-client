
// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import {
//   Card,
//   CardBody,
//   Typography,
//   Button,
// } from "@material-tailwind/react";

// export function GuestCart({ guestCart, setGuestCart }) {
//   const navigate = useNavigate();

//   const removeItem = (id) => {
//     setGuestCart(prevCart => prevCart.filter(item => item.id !== id));
//   };

//   const updateQuantity = (id, newQuantity) => {
//     if (newQuantity < 1) return;
//     setGuestCart(prevCart =>
//       prevCart.map(item =>
//         item.id === id ? { ...item, quantity: newQuantity } : item
//       )
//     );
//   };

//   const total = guestCart.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   const continueShopping = () => {
//     navigate("/");
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <Card>
//         <CardBody>
//           <Typography variant="h5" color="blue-gray" className="mb-4">
//             Guest Cart Items
//           </Typography>
//           {guestCart.length === 0 ? (
//             <Typography>Your cart is empty.</Typography>
//           ) : (
//             <>
//               <div className="overflow-x-auto">
//                 <table className="w-full min-w-max table-auto text-left">
//                   <thead>
//                     <tr>
//                       <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Image</th>
//                       <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Name</th>
//                       <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Price</th>
//                       <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Quantity</th>
//                       <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {guestCart.map((item) => (
//                       <tr key={item.id}>
//                         <td className="p-4">
//                           <img src={item.url} alt={item.title} className="h-16 w-16 object-cover rounded" />
//                         </td>
//                         <td className="p-4">
//                           <Typography variant="small" color="blue-gray" className="font-normal">
//                             {item.title}
//                           </Typography>
//                         </td>
//                         <td className="p-4">
//                           <Typography variant="small" color="blue-gray" className="font-normal">
//                             ${item.price.toFixed(2)}
//                           </Typography>
//                         </td>
//                         <td className="p-4">
//                           <div className="flex items-center gap-2">
//                             <Button 
//                               size="sm" 
//                               color="blue-gray" 
//                               variant="outlined"
//                               onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
//                             >
//                               -
//                             </Button>
//                             <Typography variant="small" color="blue-gray" className="font-normal">
//                               {item.quantity}
//                             </Typography>
//                             <Button 
//                               size="sm" 
//                               color="blue-gray" 
//                               variant="outlined"
//                               onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                             >
//                               +
//                             </Button>
//                           </div>
//                         </td>
//                         <td className="p-4">
//                           <Button
//                             color="red"
//                             size="sm"
//                             onClick={() => removeItem(item.id)}
//                           >
//                             X
//                           </Button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//               <div className="mt-8 flex flex-col md:flex-row justify-between items-start md:items-center">
//                 <div className="w-full md:w-1/2">
//                   <Typography variant="h6" color="blue-gray" className="mb-2">
//                     Cart Totals
//                   </Typography>
//                   <div className="flex justify-between mb-2">
//                     <Typography variant="small">Subtotal:</Typography>
//                     <Typography variant="small" className="font-semibold">${total.toFixed(2)}</Typography>
//                   </div>
//                   <div className="flex justify-between mb-2">
//                     <Typography variant="small">Shipping:</Typography>
//                     <Typography variant="small" className="font-semibold">$5.00</Typography>
//                   </div>
//                   <div className="flex justify-between">
//                     <Typography variant="h6">Total:</Typography>
//                     <Typography variant="h6" className="font-semibold">${(total + 5).toFixed(2)}</Typography>
//                   </div>
//                 </div>
//               </div>
//               <div className="mt-6 flex justify-between">
//                 <Button className="bg-red-900" onClick={continueShopping}>Continue Shopping</Button>
//                 <Link to="/checkout">
//                   <Button className="bg-red-900"> Checkout</Button>
//                 </Link>
//               </div>
//             </>
//           )}
//         </CardBody>
//       </Card>
//     </div>
//   );
// }

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Card,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";

export function GuestCart({ guestCart, setGuestCart }) {
  const navigate = useNavigate();

  const removeItem = (id) => {
    setGuestCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setGuestCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const total = guestCart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const continueShopping = () => {
    navigate("/");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-4">
            Guest Cart Items
          </Typography>
          {guestCart.length === 0 ? (
            <Typography>Your cart is empty.</Typography>
          ) : (
            <>
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
                    {guestCart.map((item) => (
                      <tr key={item.id}>
                        <td className="p-4">
                          <img src={item.url} alt={item.title} className="h-16 w-16 object-cover rounded" />
                        </td>
                        <td className="p-4">
                          <Typography variant="small" color="blue-gray" className="font-normal">
                            {item.title}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography variant="small" color="blue-gray" className="font-normal">
                            ${item.price.toFixed(2)}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Button 
                              size="sm" 
                              color="blue-gray" 
                              variant="outlined"
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            >
                              -
                            </Button>
                            <Typography variant="small" color="blue-gray" className="font-normal">
                              {item.quantity}
                            </Typography>
                            <Button 
                              size="sm" 
                              color="blue-gray" 
                              variant="outlined"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              +
                            </Button>
                          </div>
                        </td>
                        <td className="p-4">
                          <Button
                            color="red"
                            size="sm"
                            onClick={() => removeItem(item.id)}
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
                <div className="w-full md:w-1/2">
                  <Typography variant="h6" color="blue-gray" className="mb-2">
                    Cart Totals
                  </Typography>
                  <div className="flex justify-between mb-2">
                    <Typography variant="small">Subtotal:</Typography>
                    <Typography variant="small" className="font-semibold">${total.toFixed(2)}</Typography>
                  </div>
                  <div className="flex justify-between mb-2">
                    <Typography variant="small">Shipping:</Typography>
                    <Typography variant="small" className="font-semibold">$5.00</Typography>
                  </div>
                  <div className="flex justify-between">
                    <Typography variant="h6">Total:</Typography>
                    <Typography variant="h6" className="font-semibold">${(total + 5).toFixed(2)}</Typography>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-between">
                <Button className="bg-red-900" onClick={continueShopping}>Continue Shopping</Button>
                <Link to="/checkout" state={{ cartItems: guestCart }}>
                  <Button className="bg-red-900">Checkout</Button>
                </Link>
              </div>
            </>
          )}
        </CardBody>
      </Card>
    </div>
  );
}