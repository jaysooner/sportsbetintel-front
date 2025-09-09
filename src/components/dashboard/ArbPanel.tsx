"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { 
  Radar, 
  HelpCircle, 
  ExternalLink,
  Calculator
} from "lucide-react";
import { openExternalLink, generateAffiliateUrl } from "@/lib/external-links";
import { ProcessedBet } from "@/lib/odds-api";

interface ArbitrageOpportunity {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeBook: string;
  awayBook: string;
  homePrice: number;
  awayPrice: number;
  inverseSum: number;
  roi: number;
  sport: string;
}

const mockArbitrages: ArbitrageOpportunity[] = [
  {
    id: '1',
    homeTeam: 'Lakers',
    awayTeam: 'Warriors',
    homeBook: 'DraftKings',
    awayBook: 'FanDuel',
    homePrice: +105,
    awayPrice: +110,
    inverseSum: 0.952,
    roi: 5.0,
    sport: 'NBA'
  },
  {
    id: '2',
    homeTeam: 'Celtics',
    awayTeam: 'Heat',
    homeBook: 'BetMGM',
    awayBook: 'Caesars',
    homePrice: -110,
    awayPrice: +115,
    inverseSum: 0.978,
    roi: 2.2,
    sport: 'NBA'
  },
  {
    id: '3',
    homeTeam: 'Nuggets',
    awayTeam: 'Suns',
    homeBook: 'PointsBet',
    awayBook: 'DraftKings',
    homePrice: +100,
    awayPrice: +105,
    inverseSum: 0.988,
    roi: 1.2,
    sport: 'NBA'
  }
];

function handleArbBookClick(book: string, matchup: string, side: 'home' | 'away') {
  const url = generateAffiliateUrl(book, 'arbitrage', {
    matchup,
    side,
    source: 'arbitrage-panel'
  });
  
  if (url) {
    openExternalLink(url, {
      source: 'arbitrage-panel',
      book,
      matchup,
      side
    });
  }
}

interface ArbPanelProps {
  valueBets: ProcessedBet[];
}

export function ArbPanel({ valueBets }: ArbPanelProps) {
  const arbitrageCount = Math.floor(valueBets.length * 0.2); // Mock arbitrage count
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Radar className="h-5 w-5 text-primary" aria-hidden="true" />
            <h3 id="arbitrage-radar-heading" className="text-lg font-semibold text-foreground">Arbitrage Radar</h3>
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 w-6 p-0"
                  aria-label="Learn more about arbitrage opportunities"
                >
                  <HelpCircle className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" side="bottom">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Arbitrage Opportunities</h4>
                  <p className="text-sm text-muted-foreground">
                    When the sum of inverse odds is less than 1.0, you can guarantee profit 
                    by betting on both sides across different sportsbooks.
                  </p>
                  <div className="text-xs font-mono text-muted-foreground">
                    Formula: 1/odds_a + 1/odds_b &lt; 1.0
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <Badge 
            variant="outline" 
            className="text-accent border-accent/30"
            aria-label={`${mockArbitrages.length} arbitrage opportunities available`}
          >
            {mockArbitrages.length} arbs
          </Badge>
        </div>

        <div className="space-y-4" role="list" aria-labelledby="arbitrage-radar-heading">
          {mockArbitrages.map((arb) => (
            <div 
              key={arb.id} 
              role="listitem"
              className="rounded-lg border border-border/30 bg-card/30 p-4 hover:bg-card/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-foreground">
                    {arb.homeTeam} vs {arb.awayTeam}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {arb.sport}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-accent/10 text-accent border-accent/30 font-mono text-xs">
                    ARB
                  </Badge>
                  <Badge variant="outline" className="font-mono text-xs">
                    {arb.roi.toFixed(1)}% ROI
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{arb.homeBook}</span>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="h-6 px-2 text-xs"
                      onClick={() => handleArbBookClick(arb.homeBook, `${arb.homeTeam} vs ${arb.awayTeam}`, 'home')}
                      aria-label={`Place bet on ${arb.homeTeam} at ${arb.homeBook}`}
                    >
                      <ExternalLink className="h-3 w-3 mr-1" aria-hidden="true" />
                      Bet
                    </Button>
                  </div>
                  <div className="font-mono text-sm">
                    <span className="text-primary font-semibold">
                      {arb.homePrice > 0 ? '+' : ''}{arb.homePrice}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{arb.awayBook}</span>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="h-6 px-2 text-xs"
                      onClick={() => handleArbBookClick(arb.awayBook, `${arb.homeTeam} vs ${arb.awayTeam}`, 'away')}
                      aria-label={`Place bet on ${arb.awayTeam} at ${arb.awayBook}`}
                    >
                      <ExternalLink className="h-3 w-3 mr-1" aria-hidden="true" />
                      Bet
                    </Button>
                  </div>
                  <div className="font-mono text-sm">
                    <span className="text-primary font-semibold">
                      {arb.awayPrice > 0 ? '+' : ''}{arb.awayPrice}
                    </span>
                  </div>
                </div>
              </div>

              <Separator className="my-3" />

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calculator className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Inverse Sum:
                  </span>
                  <span className="font-mono text-sm font-semibold text-foreground">
                    {arb.inverseSum.toFixed(3)}
                  </span>
                </div>
                {arb.inverseSum < 1.0 && (
                  <Badge className="bg-[#20C997]/10 text-[#20C997] border-[#20C997]/30">
                    Profit Guaranteed
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}