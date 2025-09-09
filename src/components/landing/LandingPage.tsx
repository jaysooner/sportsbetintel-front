"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles,
  Target,
  TrendingUp,
  Radar,
  Activity,
  ArrowRight,
  CheckCircle2,
  Zap,
  BarChart3,
  Shield,
  Clock,
  DollarSign,
  Users
} from "lucide-react";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/60 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-8 w-8 text-accent" />
              <span className="text-xl font-bold tracking-tight">
                <span className="text-foreground">SPORTS</span>
                <span className="text-primary">BET</span>
                <span className="text-accent">INTEL</span>
              </span>
            </div>
            <Link href="/dashboard">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Launch Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <motion.div {...fadeInUp}>
            <Badge className="bg-accent/10 text-accent border-accent/30 mb-6">
              🚀 Real-Time Sports Betting Intelligence
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
              Find Value Bets
              <br />
              <span className="text-accent">Maximize Profits</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Advanced AI-powered analytics to identify profitable betting opportunities, 
              arbitrage situations, and line movements across all major sportsbooks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6">
                  <Zap className="mr-2 h-5 w-5" />
                  Start Finding Value Bets
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                <BarChart3 className="mr-2 h-5 w-5" />
                View Live Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-card/20">
        <div className="container mx-auto">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
          >
            {[
              { icon: Target, label: "Value Bets Found", value: "10,247", change: "+23%" },
              { icon: DollarSign, label: "Avg ROI", value: "12.4%", change: "+2.1%" },
              { icon: Users, label: "Active Users", value: "2,847", change: "+18%" },
              { icon: Clock, label: "Uptime", value: "99.9%", change: "24/7" }
            ].map((stat, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="p-6 text-center bg-card/50 border-border/50 hover:bg-card/70 transition-colors">
                  <stat.icon className="h-8 w-8 text-accent mx-auto mb-3" />
                  <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-muted-foreground text-sm mb-2">{stat.label}</div>
                  <Badge variant="outline" className="text-[#20C997] border-[#20C997]/30">
                    {stat.change}
                  </Badge>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Everything You Need to
              <span className="text-primary"> Win More</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional-grade tools powered by advanced algorithms and real-time data
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Target,
                title: "Value Bet Detection",
                description: "AI algorithms analyze thousands of lines across major sportsbooks to identify profitable opportunities with positive expected value.",
                features: ["Real-time line monitoring", "Expected value calculations", "Risk assessment"]
              },
              {
                icon: Radar,
                title: "Arbitrage Scanner",
                description: "Automatically detect risk-free arbitrage opportunities across different bookmakers for guaranteed profits.",
                features: ["Cross-book comparison", "Profit calculations", "Instant alerts"]
              },
              {
                icon: Activity,
                title: "Line Movement Tracking",
                description: "Track line movements and closing line value to identify sharp money and market inefficiencies.",
                features: ["Historical data", "Movement alerts", "CLV analysis"]
              }
            ].map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="p-8 h-full bg-card/30 border-border/50 hover:bg-card/50 transition-colors">
                  <feature.icon className="h-12 w-12 text-accent mb-6" />
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground mb-6">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.features.map((item, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <CheckCircle2 className="h-4 w-4 text-[#20C997] mr-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-6 bg-card/20">
        <div className="container mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Simple, Transparent
              <span className="text-accent"> Pricing</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Choose the plan that fits your betting strategy
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            {[
              {
                name: "Starter",
                price: "$29",
                period: "/month",
                description: "Perfect for casual bettors",
                features: [
                  "Up to 100 value bets/day",
                  "Basic arbitrage detection",
                  "5 supported sportsbooks",
                  "Email alerts",
                  "Discord community"
                ],
                popular: false
              },
              {
                name: "Pro",
                price: "$79",
                period: "/month",
                description: "For serious sports bettors",
                features: [
                  "Unlimited value bets",
                  "Advanced arbitrage scanner",
                  "15+ supported sportsbooks",
                  "Real-time push notifications",
                  "Line movement tracking",
                  "Custom filters",
                  "Priority support"
                ],
                popular: true
              },
              {
                name: "Elite",
                price: "$199",
                period: "/month",
                description: "Professional betting operations",
                features: [
                  "Everything in Pro",
                  "API access",
                  "Custom bet sizing",
                  "Portfolio management",
                  "Advanced analytics",
                  "Dedicated account manager",
                  "White-label options"
                ],
                popular: false
              }
            ].map((plan, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className={`p-8 relative ${plan.popular ? 'border-primary bg-primary/5' : 'bg-card/50 border-border/50'} hover:scale-105 transition-transform`}>
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                      Most Popular
                    </Badge>
                  )}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <div className="text-4xl font-bold mb-2">
                      {plan.price}<span className="text-lg text-muted-foreground">{plan.period}</span>
                    </div>
                    <p className="text-muted-foreground">{plan.description}</p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <CheckCircle2 className="h-4 w-4 text-[#20C997] mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-primary text-primary-foreground hover:bg-primary/90' : ''}`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    Get Started
                  </Button>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Start
              <span className="text-accent"> Winning More?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of successful bettors who use SportsBetIntel to find profitable opportunities
            </p>
            <Link href="/dashboard">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 py-6">
                <Target className="mr-2 h-5 w-5" />
                Launch Dashboard Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-card/50 py-12 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="h-6 w-6 text-accent" />
                <span className="font-bold">SportsBetIntel</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Advanced sports betting analytics powered by AI
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Value Bets</li>
                <li>Arbitrage Scanner</li>
                <li>Line Tracking</li>
                <li>API Access</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>About</li>
                <li>Blog</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
                <li>Disclaimer</li>
                <li>Support</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/40 mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2025 SportsBetIntel. All rights reserved. | Betting responsibly is important.
          </div>
        </div>
      </footer>
    </div>
  );
}