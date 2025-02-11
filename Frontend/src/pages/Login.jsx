import  { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate, backEndUrl } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  console.log(currentState);
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(currentState);
    
    try {
      if (currentState === "Sign Up") {
        try {
          const response = await axios.post(`${backEndUrl}/api/user/register`, {
            name,
            email,
            password,
          });
          //console.log(response.data);
          if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            toast.success("Registered successfully!");
          } else {
            toast.error(response.data.message); // Show backend-provided message
          }
        } catch (error) {
          if (error.response) {
            // Handle specific error responses
            if (error.response.status === 409) {
              toast.error("User already exists! Try logging in.");
            } else {
              toast.error(error.response.data.message || "Registration failed!");
            }
          } else {
            toast.error("Network error. Please try again later.");
          }
        }
      }
       else {
        const response = await axios.post(`${backEndUrl}/api/user/login`, {
          email,
          password,
        });
        console.log(response.data);
        
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
useEffect(()=>{
 if(token){
  navigate('/')
 }
// eslint-disable-next-line react-hooks/exhaustive-deps
},[token])
  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {/* Name input only visible on Sign Up */}
      {currentState === "Login" ? (
        ""
      ) : (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
          type="text"
          required
        />
      )}
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        type="email"
        required
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        type="password"
        required
      />

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot Your password ?</p>
        {/* Toggle between Login and Sign Up */}
        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer"
          >
            Create account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer"
          >
            Login here
          </p>
        )}
      </div>
      <button className="bg-black text-white font-light px-8 py-2 mt-4">
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
