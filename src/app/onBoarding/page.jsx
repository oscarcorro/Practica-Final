"use client";
import { useState } from "react";
import Register from "@/components/onBoarding/Register";
import Validation from "@/components/onBoarding/Validation";
import Login from "@/components/onBoarding/Login";

export default function OnBoarding() {
  const [paso, setPaso] = useState("register");

  const handleNextPaso = (nextPaso) => {
    setPaso(nextPaso); 
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-black">
      <div className="bg-white p-8 rounded shadow-md w-96">
      {paso === "register" && <Register onNext={(nextPaso) => handleNextPaso(nextPaso || "validation")} />}
      {paso === "validation" && <Validation onNext={() => handleNextPaso("login")} />}
        {paso === "login" && <Login onLoginSuccess={() => window.location.href = "/"} />}
      </div>
    </div>
  );
}
