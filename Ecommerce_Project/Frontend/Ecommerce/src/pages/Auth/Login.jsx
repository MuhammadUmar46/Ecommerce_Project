import React, {useState} from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [auth,setAuth] = useAuth()

    const navigate = useNavigate()
    const location = useLocation()
  
    const handleLogin =  async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post('http://localhost:5000/auth/login', {
          email,
          password,
        });
        if(res && res.data.message) {
          toast.success(res.data && res.data.message)
          setAuth({
            ...auth,
            user: res.data.user,
            token: res.data.token,
          });
          localStorage.setItem('auth', JSON.stringify(res.data))
          navigate(location.state || "/")
        }else{
          toast.error(res.data.message)
        }
      } catch (error) {
        console.log(error)
        toast.error('Something went wrong')
      }
    };
    
  return (
    <Layout>
      <div className="h-screen">
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
            Login to your Account
          </h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-600 text-sm font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-600 text-sm font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <button
                type="submit"
                className="w-full bg-gray-800 text-white p-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring focus:border-blue-300"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
