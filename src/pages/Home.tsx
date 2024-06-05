import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import HeroSection from "../components/Home/HeroSection";

export default function Home() {
  const [count, setCount] = useState<number>(0);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  return (
    <div className="App">
      <HeroSection />
    </div>
  );
}
