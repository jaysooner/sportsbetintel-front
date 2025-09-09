/**
 * Odds API integration for fetching real betting data
 */

import { config } from './config';

export interface OddsApiGame {
  id: string;
  sport_key: string;
  sport_title: string;
  commence_time: string;
  home_team: string;
  away_team: string;
  bookmakers: {
    key: string;
    title: string;
    last_update: string;
    markets: {
      key: string;
      outcomes: {
        name: string;
        price: number;
      }[];
    }[];
  }[];
}

export interface ProcessedBet {
  id: string;
  homeTeam: string;
  awayTeam: string;
  side: 'HOME' | 'AWAY';
  book: string;
  price: number;
  decimal: number;
  edgeBps: number;
  sport: string;
  commenceTime: string;
}

/**
 * Fetches live odds from The Odds API via our internal API route
 */
export async function fetchLiveOdds(sport: string = 'americanfootball_nfl'): Promise<OddsApiGame[]> {
  try {
    const response = await fetch(`/api/odds?sport=${encodeURIComponent(sport)}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API error: ${response.status} - ${errorData.error || 'Unknown error'}`);
    }

    const data = await response.json();
    console.log(`Fetched ${data.count} games from Odds API for ${data.sport}`);
    
    // Store usage info globally for the getApiUsage function
    (global as any).lastApiUsage = data.usage;
    
    return data.games;
  } catch (error) {
    console.error('Failed to fetch odds:', error);
    return [];
  }
}

/**
 * Processes raw odds data to find value bets
 */
export function processOddsForValueBets(games: OddsApiGame[]): ProcessedBet[] {
  const valueBets: ProcessedBet[] = [];

  games.forEach(game => {
    game.bookmakers.forEach(bookmaker => {
      const h2hMarket = bookmaker.markets.find(m => m.key === 'h2h');
      if (!h2hMarket) return;

      h2hMarket.outcomes.forEach(outcome => {
        // Simple value bet detection: find odds with significant edge
        // In production, this would use sophisticated fair odds calculations
        const edgeBps = Math.floor(Math.random() * 500 + 100); // Mock edge calculation
        
        if (edgeBps > 200) { // Only include bets with >2% edge
          valueBets.push({
            id: `${game.id}-${bookmaker.key}-${outcome.name}`,
            homeTeam: game.home_team,
            awayTeam: game.away_team,
            side: outcome.name === game.home_team ? 'HOME' : 'AWAY',
            book: bookmaker.title,
            price: outcome.price,
            decimal: outcome.price > 0 ? (outcome.price / 100) + 1 : (100 / Math.abs(outcome.price)) + 1,
            edgeBps,
            sport: game.sport_title,
            commenceTime: game.commence_time
          });
        }
      });
    });
  });

  return valueBets.sort((a, b) => b.edgeBps - a.edgeBps).slice(0, 10); // Top 10 value bets
}

/**
 * Maps sport filter to Odds API sport key
 */
export function getSportKey(sport: string): string {
  const sportMapping: Record<string, string> = {
    'NFL': 'americanfootball_nfl',
    'NBA': 'basketball_nba',
    'MLB': 'baseball_mlb',
    'NHL': 'icehockey_nhl',
    'NCAAF': 'americanfootball_ncaaf'
  };

  return sportMapping[sport] || 'americanfootball_nfl';
}

/**
 * Gets remaining API requests for the current month
 */
export async function getApiUsage(): Promise<{ used: number; remaining: number } | null> {
  try {
    // Use the stored usage info from the last fetchLiveOdds call
    const lastUsage = (global as any).lastApiUsage;
    
    if (lastUsage) {
      return {
        used: lastUsage.used ? parseInt(lastUsage.used) : 0,
        remaining: lastUsage.remaining ? parseInt(lastUsage.remaining) : 0
      };
    }
    
    // Fallback: make a quick API call to get usage info
    const response = await fetch('/api/odds?sport=americanfootball_nfl');
    
    if (response.ok) {
      const data = await response.json();
      return {
        used: data.usage.used ? parseInt(data.usage.used) : 0,
        remaining: data.usage.remaining ? parseInt(data.usage.remaining) : 0
      };
    }
    
    return null;
  } catch (error) {
    console.error('Failed to get API usage:', error);
    return null;
  }
}