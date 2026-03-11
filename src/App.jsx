import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Header from "./assets/Components/Header";
import Footer from "./assets/Components/Footer";
import ProtectedRoute from "./assets/Components/ProtectedRoute";

import Home from "./assets/Pages/Home";
import PaginatedStocks from "./assets/Pages/PaginatedStocks";
import Watchlist from "./assets/Pages/Watchlist";
import Login from "./assets/Pages/Login";
import Register from "./assets/Pages/Register";

export default function App() {

  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white flex flex-col">

      <Header />

      <main className="flex-grow max-w-7xl mx-auto px-6 py-10">

        <AnimatePresence mode="wait">

          <Routes location={location} key={location.pathname}>

            <Route path="/" element={<Home />} />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route
              path="/paginated"
              element={
                <ProtectedRoute>
                  <PaginatedStocks />
                </ProtectedRoute>
              }
            />

            <Route
              path="/watchlist"
              element={
                <ProtectedRoute>
                  <Watchlist />
                </ProtectedRoute>
              }
            />

          </Routes>

        </AnimatePresence>

      </main>

      <Footer />

    </div>
  );
}