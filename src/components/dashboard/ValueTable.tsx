"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ExternalLink, Zap, Loader2 } from "lucide-react";
import { openExternalLink, generateAffiliateUrl } from "@/lib/external-links";
import { ProcessedBet } from "@/lib/odds-api";

interface ValueTableProps {
  valueBets: ProcessedBet[];
  isScanning: boolean;
}

const mockValueBets: ValueBet[] = [
  {
    id: '1',
    homeTeam: 'Chiefs',
    awayTeam: 'Bills',
    side: 'HOME',
    book: 'DraftKings',
    price: -110,
    decimal: 1.91,
    edgeBps: 420,
    sport: 'NFL'
  },
  {
    id: '2',
    homeTeam: 'Cowboys',
    awayTeam: 'Eagles',
    side: 'AWAY',
    book: 'FanDuel',
    price: +165,
    decimal: 2.65,
    edgeBps: 380,
    sport: 'NFL'
  },
  {
    id: '3',
    homeTeam: 'Packers',
    awayTeam: 'Vikings',
    side: 'HOME',
    book: 'BetMGM',
    price: -125,
    decimal: 1.80,
    edgeBps: 310,
    sport: 'NFL'
  },
  {
    id: '4',
    homeTeam: 'Ravens',
    awayTeam: 'Steelers',
    side: 'AWAY',
    book: 'Caesars',
    price: +145,
    decimal: 2.45,
    edgeBps: 290,
    sport: 'NFL'
  },
  {
    id: '5',
    homeTeam: '49ers',
    awayTeam: 'Rams',
    side: 'HOME',
    book: 'PointsBet',
    price: -105,
    decimal: 1.95,
    edgeBps: 275,
    sport: 'NFL'
  }
];

function handleBookClick(book: string, matchup: string) {
  const url = generateAffiliateUrl(book, 'value-bet', {
    matchup,
    source: 'value-table'
  });
  
  if (url) {
    openExternalLink(url, {
      source: 'value-table',
      book,
      matchup
    });
  }
}

export function ValueTable({ valueBets, isScanning }: ValueTableProps) {
  const displayBets = valueBets.length > 0 ? valueBets : mockValueBets;
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 id="value-bets-heading" className="text-lg font-semibold text-foreground flex items-center gap-2">
            Value Bets
            {isScanning && <Loader2 className="h-4 w-4 animate-spin text-primary" />}
          </h3>
          <Badge 
            variant="outline" 
            className="text-accent border-accent/30"
            aria-label={`${displayBets.length} betting opportunities available`}
          >
            {displayBets.length} opportunities
          </Badge>
        </div>
        
        <div className="rounded-lg border border-border/50 overflow-hidden">
          <Table aria-labelledby="value-bets-heading">
            <TableHeader>
              <TableRow className="hover:bg-muted/5">
                <TableHead className="text-muted-foreground font-medium">Matchup</TableHead>
                <TableHead className="text-muted-foreground font-medium">Side</TableHead>
                <TableHead className="text-muted-foreground font-medium">Book</TableHead>
                <TableHead className="text-muted-foreground font-medium">Price</TableHead>
                <TableHead className="text-muted-foreground font-medium">Edge</TableHead>
                <TableHead className="text-muted-foreground font-medium w-20">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayBets.map((bet) => (
                <TableRow key={bet.id} className="hover:bg-muted/5 transition-colors">
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Zap className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                      <span className="font-medium text-foreground">
                        {bet.homeTeam} vs {bet.awayTeam}
                      </span>
                      <Badge variant="outline" className="text-xs" aria-label={`Sport: ${bet.sport}`}>
                        {bet.sport}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className={bet.side === 'HOME' ? 'text-primary border-primary/30' : 'text-accent border-accent/30'}
                    >
                      {bet.side}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium text-foreground">
                    {bet.book}
                  </TableCell>
                  <TableCell>
                    <div className="font-mono">
                      <span className="text-foreground font-semibold">
                        {bet.price > 0 ? '+' : ''}{bet.price}
                      </span>
                      <span className="text-muted-foreground text-sm ml-2">
                        ({bet.decimal.toFixed(2)})
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-[#20C997]/10 text-[#20C997] border-[#20C997]/30 font-mono">
                      +{bet.edgeBps} bps
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button 
                      size="sm" 
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                      onClick={() => handleBookClick(bet.book, `${bet.homeTeam} vs ${bet.awayTeam}`)}
                      aria-label={`Get betting line for ${bet.homeTeam} vs ${bet.awayTeam} at ${bet.book}`}
                    >
                      <ExternalLink className="h-3 w-3 mr-1" aria-hidden="true" />
                      Get Line
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Card>
  );
}