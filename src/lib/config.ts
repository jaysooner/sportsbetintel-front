interface AppConfig {
  app: {
    url: string;
    name: string;
    version: string;
  };
  analytics: {
    gaId?: string;
    gtmId?: string;
    enabled: boolean;
  };
  affiliates: {
    draftkings?: string;
    fanduel?: string;
    betmgm?: string;
    caesars?: string;
    pointsbet?: string;
  };
  api: {
    oddsApiKey?: string;
    rapidApiKey?: string;
  };
  features: {
    analyticsEnabled: boolean;
    affiliateLinksEnabled: boolean;
    errorReportingEnabled: boolean;
    rateLimitEnabled: boolean;
  };
  rateLimit: {
    maxRequestsPerMinute: number;
  };
  database?: {
    url: string;
  };
  auth?: {
    secret: string;
    url: string;
  };
  isDevelopment: boolean;
  isProduction: boolean;
}

export const config: AppConfig = {
  app: {
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    name: process.env.NEXT_PUBLIC_APP_NAME || 'SportsBetIntel',
    version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
  },
  analytics: {
    gaId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    gtmId: process.env.NEXT_PUBLIC_GTM_ID,
    enabled: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
  },
  affiliates: {
    draftkings: process.env.DRAFTKINGS_AFFILIATE_URL,
    fanduel: process.env.FANDUEL_AFFILIATE_URL,
    betmgm: process.env.BETMGM_AFFILIATE_URL,
    caesars: process.env.CAESARS_AFFILIATE_URL,
    pointsbet: process.env.POINTSBET_AFFILIATE_URL,
  },
  api: {
    oddsApiKey: process.env.ODDS_API_KEY,
    rapidApiKey: process.env.RAPID_API_KEY,
  },
  features: {
    analyticsEnabled: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
    affiliateLinksEnabled: process.env.NEXT_PUBLIC_ENABLE_AFFILIATE_LINKS !== 'false',
    errorReportingEnabled: process.env.NEXT_PUBLIC_ENABLE_ERROR_REPORTING === 'true',
    rateLimitEnabled: process.env.NEXT_PUBLIC_RATE_LIMIT_ENABLED === 'true',
  },
  rateLimit: {
    maxRequestsPerMinute: parseInt(process.env.NEXT_PUBLIC_MAX_REQUESTS_PER_MINUTE || '60', 10),
  },
  database: process.env.DATABASE_URL ? {
    url: process.env.DATABASE_URL,
  } : undefined,
  auth: process.env.NEXTAUTH_SECRET ? {
    secret: process.env.NEXTAUTH_SECRET,
    url: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  } : undefined,
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
};

export function validateConfig(): void {
  if (config.isProduction) {
    const requiredProductionVars = [
      'NEXT_PUBLIC_APP_URL',
      'NEXTAUTH_SECRET',
    ];

    const missing = requiredProductionVars.filter(varName => !process.env[varName]);
    
    if (missing.length > 0) {
      throw new Error(`Missing required environment variables for production: ${missing.join(', ')}`);
    }
  }

  if (config.features.affiliateLinksEnabled) {
    const hasAnyAffiliateUrl = Object.values(config.affiliates).some(url => url);
    
    if (!hasAnyAffiliateUrl) {
      console.warn('Affiliate links are enabled but no affiliate URLs are configured');
    }
  }
}

validateConfig();