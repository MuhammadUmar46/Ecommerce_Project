import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import { useCart } from "../../context/cart";
import { Badge } from "antd";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Succesfully");
  };
  return (
    <>
      <nav className="bg-gray-800 flex items-center justify-between shadow-md py-4 ">
        <Link to="/" className="flex ml-5 font-bold text-xl text-white px-5">
          Toys Ecommerce Website
        </Link>
        <div className="flex space-x-4 mr-10 font-bold text-xl">
          <Link to="/" className="text-white">
            Home
          </Link>
          <Link to="/about" className="text-white">
            About
          </Link>
          {!auth.user ? (
            <>
              <Link to="/register" className="text-white">
                Register
              </Link>
              <Link to="/login" className="text-white">
                Login
              </Link>
            </>
          ) : (
            <>
              <Link
                className="nav-link dropdown-toggle text-white"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {auth?.user?.name}
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link
                    to={`/dashboard/${
                      auth?.user.role === 1 ? "admin" : "user"
                    }`}
                    className="text-black ml-4"
                  >
                    Dashboard
                  </Link>
                </li>
                <Link
                  onClick={handleLogout}
                  to="/login"
                  className="text-black ml-4"
                >
                  Logout
                </Link>
              </ul>
            </>
          )}
          <Badge count={cart?.length} showZero>
            <Link to="/cart" className="text-white text-xl">
              Cart
            </Link>
          </Badge>
        </div>
      </nav>
    </>
  );
};

export default Header;
