"use client";
import { Typewriter } from "react-simple-typewriter";

export default function HomeTypewriter() {
  const warehouseTerms: string[] = [
    "Inventory",
    "Logistics",
    "Storage",
    "Fulfillment",
    "Distribution",
    "Procurement",
    "Supply Chain",
    "Stockpile",
    "Warehousing",
    "Operations",
  ];
  return (
    <Typewriter
      words={warehouseTerms}
      loop={5}
      cursor
      cursorStyle="_"
      typeSpeed={70}
      deleteSpeed={50}
      delaySpeed={1000}
    />
  );
}
