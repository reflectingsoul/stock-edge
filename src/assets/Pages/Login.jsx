import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (
      storedUser &&
      storedUser.email === email &&
      storedUser.password === password
    ) {
      localStorage.setItem("loggedIn", "true");

      navigate("/");
    } else {
      alert("Invalid credentials");
    }
  };

  return (

    <div className="max-w-md mx-auto bg-gray-900 p-8 rounded-xl">

      <h2 className="text-2xl font-bold mb-6 text-center">
        Login
      </h2>

      <form onSubmit={handleLogin} className="flex flex-col gap-4">

        <input
          type="email"
          placeholder="Email"
          required
          className="p-3 rounded bg-gray-800"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          className="p-3 rounded bg-gray-800"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-indigo-600 py-2 rounded">
          Login
        </button>

      </form>

    </div>

  );
}