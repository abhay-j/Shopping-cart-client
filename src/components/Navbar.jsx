
import React,{useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";

export function CustomNavBar({user, onLogout}) {
  const [openNav, setOpenNav] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navItems = [
    { name: "Menu", path: "/" },
    // { name: "Cart", path: "/cart" },
    { name: "Login", path: "/login" },
    {name:"Signup", path:"/signup"},
   
  ];

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {/* {navItems.map((item) => (
        <Typography
          key={item.name}
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          <Link to={item.path} className="flex items-center">
            {item.name}
          </Link>
     </Typography>
      ))} */}
      <Typography
      key="Menu"
      as="li"
      variant="small"
      color="blue-gray"
      className="p-1 font-normal"
    >
      <Link to="/" className="flex item-center font-semibold text-gray-600  hover:text-red-500">
        Menu
      </Link>
      </Typography>
      
      {
      <Typography
      key="Cart"
      as="li"
      variant="small"
      color="blue-gray"
      className="p-1 font-normal"
    >
      <Link to="/cart" className="flex item-center">
        Cart
      </Link>
      </Typography>}

      
    </ul>
  );
  //h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4

  return (
    <Navbar className="sticky top-0 z-10 mx-auto max-w-none rounded-none px-4 py-2 lg:px-8 lg:py-4">
      <div className=" container flex items-center justify-between text-blue-gray-900">
        <Link to="/" className="mr-4 cursor-pointer py-1.5 font-medium">
          <img src="/api/placeholder/100/50" alt="OMG Hot Chicken Logo" className="h-12 w-auto" />
        </Link>
        <div className="flex items-center gap-4">
          <div className="mr-4 hidden lg:flex items-center gap-x-5">{navList}
          <div className="flex   items-center gap-x-2">
          {
                user? <Button
                
                size="sm"
                className="bg-red-900 text-white font-bold px-6 py-3 rounded-none hover:bg-red-600"
                onClick={onLogout}
              >
                <span>Logout</span>
              </Button> : <> <Button
                variant="text"
                size="sm"
                className="bg-red-900 text-white font-medium px-6 py-3 border rounded-none border-transparent hover:border-red-500 hover:text-red-500 hover:bg-white"
                onClick={() => navigate("/login")}
              >
                <span>Log In</span>
              </Button>
              <Button
               
                size="sm"
                className="bg-white text-red-300 font-bold px-6 py-3 rounded-none hover:bg-red-900 hover:text-white"
                onClick={() => navigate("/signup")}
              >
                <span>Sign up</span>
              </Button>
              </>
              }
             
            </div>
             
          </div>

          {/* {lgoin and logout buttons} */}
          
          <Typography className="hidden lg:inline-block">
            <a href="tel:+12674670787" className="text-red-500 font-bold">
              +1 267 467 0787
            </a>
          </Typography>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
      </div>
      <MobileNav open={openNav}>
        {navList}
        <div className="flex items-center gap-x-1">
               
              {
                user? <Button fullWidth variant="gradient" className="bg-red-900" size="sm" onClick={onLogout}>
                <span>Logout</span>
              </Button> : <> <Button fullWidth className="bg-red-900 text-white" variant="text" size="sm" onClick={() => navigate("/login")}>
              <span>Log In</span>
            </Button>
            <Button fullWidth  className="bg-red-900 text-white" size="sm" onClick={() => navigate("/signup")}>
              <span>Sign up</span>
            </Button></>
              }
          
            
          </div>
              
        <Typography className="font-normal">
          <a href="tel:+12674670787" className="text-red-900 font-bold">
            +1 267 467 0787
          </a>
        </Typography>
      </MobileNav>
    </Navbar>
  );
}
