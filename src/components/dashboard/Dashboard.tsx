"use client";

import { useState } from "react";
import { NavBar } from "./NavBar";
import { KpiStrip } from "./KpiStrip";
import { ValueTable } from "./ValueTable";
import { ArbPanel } from "./ArbPanel";
import { Heatmap } from "./Heatmap";
import { FooterCta } from "./FooterCta";
import { motion, Variants } from "framer-motion";
import { ProcessedBet } from "@/lib/odds-api";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] // easeOut bezier curve
    }
  }
};

export function Dashboard() {
  const [valueBets, setValueBets] = useState<ProcessedBet[]>([]);
  const [isScanning, setIsScanning] = useState(false);

  const handleScanComplete = (newValueBets: ProcessedBet[]) => {
    setValueBets(newValueBets);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <NavBar 
        onScanComplete={handleScanComplete} 
        isScanning={isScanning}
        setIsScanning={setIsScanning}
      />
      
      {/* Main Content */}
      <main 
        className="container mx-auto px-6 py-8 pb-24"
        role="main"
        aria-label="Sports betting dashboard"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* KPI Strip */}
          <motion.div variants={itemVariants}>
            <KpiStrip valueBets={valueBets} />
          </motion.div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Left Column - Value Bets Table */}
            <motion.div variants={itemVariants} className="xl:col-span-2">
              <section aria-labelledby="value-bets-heading">
                <ValueTable valueBets={valueBets} isScanning={isScanning} />
              </section>
            </motion.div>

            {/* Right Column - Arbitrage Panel */}
            <motion.div variants={itemVariants} className="xl:col-span-1">
              <section aria-labelledby="arbitrage-radar-heading">
                <ArbPanel valueBets={valueBets} />
              </section>
            </motion.div>
          </div>

          {/* Heatmap */}
          <motion.div variants={itemVariants}>
            <Heatmap />
          </motion.div>
        </motion.div>
      </main>

      {/* Footer CTA */}
      <FooterCta />
    </div>
  );
}