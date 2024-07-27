
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import axios from "axios";

export function MenuItem({ data, user, shoppingCartResponse, addToGuestCart, updateCartItems }) {
  //console.log("MenuItem props:", { updateCartItems });

  const { category, description, id, price, title, url } = data;

  // const handleAddToCart = async () => {
  //   if (!user) {
  //     addToGuestCart(data);
  //     return;
  //   }

  //   try {
  //     if (!shoppingCartResponse || !shoppingCartResponse.cartId) {
  //       console.error('Shopping cart information is not available');
  //       return;
  //     }

  //     const response = await axios.post(`http://localhost:8080/api/carts/${shoppingCartResponse.cartId}/items`, {
  //       product: {
  //         id: data.id,
  //       },
  //       quantity: 1
  //     }, {
  //       headers: {
  //         Authorization: `Bearer ${user.accessToken}`
  //       }
  //     });

  //     console.log("from addItem to cart",response.data);
  //     // Update the cart items in the parent component
  //     updateCartItems(response.data);
  //   } catch (error) {
  //     console.error('Error adding item to cart:', error);
  //   }
  // }
  const handleAddToCart = async () => {
    if (!user) {
      addToGuestCart(data);
      return;
    }
  
    try {
      if (!shoppingCartResponse || !shoppingCartResponse.cartId) {
        console.error('Shopping cart information is not available');
        return;
      }
  
      const response = await axios.post(`https://shopping-cart-rest-4cb8bc3adabc.herokuapp.com/api/carts/${shoppingCartResponse.cartId}/items`, {
        product: {
          id: data.id,
          title: data.title,
    price: data.price,
    url: data.url
        },
        quantity: 1
      }, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`
        }
      });
  
      console.log("from addItem to cart", response.data);
      
      // Check if updateCartItems is a function before calling it
      if (typeof updateCartItems === 'function') {
        updateCartItems(response.data);
      } else {
        console.error('updateCartItems is not a function:', updateCartItems);
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  }

  return (
    <div>
      <Card className="w-full max-w-[320px] rounded-none">
        <CardHeader shadow={false} floated={false} className="h-64 sm:h-80">
          <img
            src={url}
            alt="card-image"
            className="h-full w-full object-cover"
          />
        </CardHeader>
        <CardBody>
          <div className="mb-2 flex items-center justify-between">
            <Typography color="blue-gray" className="font-medium">
              {title}
            </Typography>
            <Typography color="blue-gray" className="font-medium">
              $ {price}
            </Typography>
          </div>
          <Typography
            variant="small"
            color="gray"
            className="font-normal opacity-75"
          >
            {description}
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            ripple={false}
            fullWidth={true}
            className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}