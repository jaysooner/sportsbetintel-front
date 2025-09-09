import { NextRequest, NextResponse } from 'next/server';
import { config } from '@/lib/config';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sport = searchParams.get('sport') || 'americanfootball_nfl';
  
  const apiKey = config.api.oddsApiKey;
  
  if (!apiKey) {
    return NextResponse.json({ error: 'Odds API key not configured' }, { status: 500 });
  }

  try {
    const response = await fetch(
      `https://api.the-odds-api.com/v4/sports/${sport}/odds?` +
      new URLSearchParams({
        api_key: apiKey,
        regions: 'us',
        markets: 'h2h',
        oddsFormat: 'american',
        bookmakers: 'draftkings,fanduel,betmgm,caesars,pointsbet'
      })
    );

    if (!response.ok) {
      throw new Error(`Odds API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Return both the data and the API usage headers
    const usage = {
      used: response.headers.get('x-requests-used'),
      remaining: response.headers.get('x-requests-remaining'),
      last: response.headers.get('x-requests-last')
    };
    
    return NextResponse.json({ 
      games: data, 
      usage,
      sport,
      count: data.length 
    });
  } catch (error) {
    console.error('Failed to fetch odds:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch odds', 
      message: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}