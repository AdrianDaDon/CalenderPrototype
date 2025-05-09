"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import SplashScreen from "../components/SplashScreen";
import AuthForm from "./login/page";

import { redirect } from "next/navigation";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);

  return (
    <main className="min-h-screen">
      {isLoading ? (
        <SplashScreen />
      ) : 
        redirect("/login")

      }
    </main>
  );
}
