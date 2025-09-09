/**
 * Secure external link handling utilities
 */

import { config } from './config';

// Whitelist of trusted sportsbook domains
const TRUSTED_SPORTSBOOK_DOMAINS = [
  'draftkings.com',
  'fanduel.com',
  'betmgm.com',
  'caesars.com',
  'pointsbet.com',
  'bet365.com',
  'betway.com',
  '1xbet.com',
  'pinnacle.com',
  '888sport.com'
] as const;

/**
 * Validates if a URL is safe to open externally
 */
export function isValidExternalUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url);
    
    // Only allow HTTPS for security
    if (parsedUrl.protocol !== 'https:') {
      return false;
    }
    
    // Check if domain is in our whitelist
    const domain = parsedUrl.hostname.toLowerCase();
    const isWhitelisted = TRUSTED_SPORTSBOOK_DOMAINS.some(trusted => 
      domain === trusted || domain.endsWith(`.${trusted}`)
    );
    
    return isWhitelisted;
  } catch {
    return false;
  }
}

/**
 * Safely opens an external URL with security measures
 */
export function openExternalLink(url: string, analytics?: {
  source: string;
  book: string;
  matchup: string;
  side?: string;
}): boolean {
  if (!isValidExternalUrl(url)) {
    console.warn('Attempted to open untrusted URL:', url);
    return false;
  }
  
  try {
    // Track analytics if enabled and data provided
    if (config.features.analyticsEnabled && analytics) {
      trackAffiliateClick(analytics.book, analytics.source.includes('arbitrage') ? 'arbitrage' : 'value');
    }
    
    // Open with security flags
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    
    if (!newWindow) {
      console.warn('Popup was blocked for URL:', url);
      return false;
    }
    
    // Additional security: remove reference to parent window
    newWindow.opener = null;
    
    return true;
  } catch (error) {
    console.error('Failed to open external link:', error);
    return false;
  }
}

/**
 * Gets affiliate URL for a sportsbook with fallback handling
 */
export function getAffiliateUrl(bookName: string): string {
  const affiliateUrls: Record<string, string> = {
    'DraftKings': config.affiliates.draftkings || 'https://draftkings.com',
    'FanDuel': config.affiliates.fanduel || 'https://fanduel.com',
    'BetMGM': config.affiliates.betmgm || 'https://betmgm.com',
    'Caesars': config.affiliates.caesars || 'https://caesars.com',
    'PointsBet': config.affiliates.pointsbet || 'https://pointsbet.com',
    'Bet365': 'https://bet365.com',
    'Betway': 'https://betway.com',
    '1xBet': 'https://1xbet.com',
    'Pinnacle': 'https://pinnacle.com',
    '888 Sport': 'https://888sport.com'
  };
  
  return affiliateUrls[bookName] || '#';
}

/**
 * Generates affiliate URL with tracking parameters
 */
export function generateAffiliateUrl(
  bookName: string,
  betType: 'value-bet' | 'arbitrage',
  metadata: {
    matchup: string;
    side?: string;
    source: string;
  }
): string | null {
  if (!config.features.affiliateLinksEnabled) {
    return null;
  }

  const baseUrl = getAffiliateUrl(bookName);
  if (baseUrl === '#') {
    return null;
  }

  try {
    const url = new URL(baseUrl);
    
    // Add tracking parameters
    url.searchParams.set('utm_source', 'sportsbetintel');
    url.searchParams.set('utm_medium', betType);
    url.searchParams.set('utm_campaign', metadata.source);
    
    if (metadata.side) {
      url.searchParams.set('utm_content', metadata.side);
    }
    
    return url.toString();
  } catch {
    // If URL construction fails, return base URL
    return baseUrl;
  }
}

/**
 * Track affiliate click for analytics
 */
export function trackAffiliateClick(bookName: string, betType: 'value' | 'arbitrage'): void {
  // In production, send to analytics service
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'affiliate_click', {
      event_category: 'engagement',
      event_label: `${bookName}_${betType}`,
      value: 1
    });
  }
  
  console.log(`Affiliate click tracked: ${bookName} (${betType})`);
}

// TypeScript declaration for gtag (would normally be in types file)
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}