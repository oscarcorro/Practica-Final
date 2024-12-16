"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if(!token) {
      router.push("onBoarding");
    } else {
      router.push("/clients");
    }
  }, [router]);
  return (
    <>
      <div className="p-6">
        <p>Contenido</p>
      </div>
    </>    
  );
}
