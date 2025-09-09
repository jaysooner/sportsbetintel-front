"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Crown, 
  Zap, 
  Shield,
  ArrowRight
} from "lucide-react";

export function FooterCta() {
  return (
    <div className="sticky bottom-0 z-40 border-t border-border/40 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Crown className="h-5 w-5 text-accent" />
              <span className="font-semibold text-foreground">Unlock Full Board</span>
            </div>
            
            <Separator orientation="vertical" className="h-6" />
            
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4 text-primary" />
                <span>Real-time updates</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-accent" />
                <span>Advanced filters</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>Unlimited value bets</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="flex items-center space-x-2 mb-1">
                <Badge variant="outline" className="text-accent border-accent/30 text-xs">
                  LIMITED TIME
                </Badge>
                <span className="text-sm text-muted-foreground line-through">$99/mo</span>
                <span className="text-lg font-bold text-foreground">$49/mo</span>
              </div>
              <div className="text-xs text-muted-foreground">
                Cancel anytime
              </div>
            </div>
            
            <Button 
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}