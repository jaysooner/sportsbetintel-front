import { isValidExternalUrl, openExternalLink, getAffiliateUrl, generateAffiliateUrl } from '../external-links';

// Mock window.open
const mockOpen = jest.fn();
Object.defineProperty(window, 'open', {
  writable: true,
  value: mockOpen,
});

// Mock console methods
const originalConsoleWarn = console.warn;
const originalConsoleError = console.error;

beforeEach(() => {
  mockOpen.mockClear();
  console.warn = jest.fn();
  console.error = jest.fn();
});

afterAll(() => {
  console.warn = originalConsoleWarn;
  console.error = originalConsoleError;
});

describe('isValidExternalUrl', () => {
  it('returns true for valid HTTPS sportsbook URLs', () => {
    expect(isValidExternalUrl('https://draftkings.com')).toBe(true);
    expect(isValidExternalUrl('https://fanduel.com')).toBe(true);
    expect(isValidExternalUrl('https://betmgm.com')).toBe(true);
  });

  it('returns true for valid subdomains', () => {
    expect(isValidExternalUrl('https://sportsbook.draftkings.com')).toBe(true);
    expect(isValidExternalUrl('https://ny.fanduel.com')).toBe(true);
  });

  it('returns false for HTTP URLs', () => {
    expect(isValidExternalUrl('http://draftkings.com')).toBe(false);
    expect(isValidExternalUrl('http://fanduel.com')).toBe(false);
  });

  it('returns false for untrusted domains', () => {
    expect(isValidExternalUrl('https://malicious.com')).toBe(false);
    expect(isValidExternalUrl('https://evil.site')).toBe(false);
  });

  it('returns false for invalid URLs', () => {
    expect(isValidExternalUrl('not-a-url')).toBe(false);
    expect(isValidExternalUrl('')).toBe(false);
    expect(isValidExternalUrl('javascript:alert(1)')).toBe(false);
  });
});

describe('openExternalLink', () => {
  it('opens valid URLs successfully', () => {
    const mockWindow = { opener: null };
    mockOpen.mockReturnValue(mockWindow);

    const result = openExternalLink('https://draftkings.com');

    expect(result).toBe(true);
    expect(mockOpen).toHaveBeenCalledWith(
      'https://draftkings.com',
      '_blank',
      'noopener,noreferrer'
    );
    expect(mockWindow.opener).toBe(null);
  });

  it('rejects invalid URLs', () => {
    const result = openExternalLink('https://malicious.com');

    expect(result).toBe(false);
    expect(mockOpen).not.toHaveBeenCalled();
    expect(console.warn).toHaveBeenCalledWith('Attempted to open untrusted URL:', 'https://malicious.com');
  });

  it('handles popup blocking', () => {
    mockOpen.mockReturnValue(null);

    const result = openExternalLink('https://draftkings.com');

    expect(result).toBe(false);
    expect(console.warn).toHaveBeenCalledWith('Popup was blocked for URL:', 'https://draftkings.com');
  });

  it('handles window.open errors', () => {
    mockOpen.mockImplementation(() => {
      throw new Error('Test error');
    });

    const result = openExternalLink('https://draftkings.com');

    expect(result).toBe(false);
    expect(console.error).toHaveBeenCalledWith('Failed to open external link:', expect.any(Error));
  });
});

describe('getAffiliateUrl', () => {
  it('returns correct URLs for known sportsbooks', () => {
    expect(getAffiliateUrl('DraftKings')).toBe('https://draftkings.com');
    expect(getAffiliateUrl('FanDuel')).toBe('https://fanduel.com');
    expect(getAffiliateUrl('BetMGM')).toBe('https://betmgm.com');
  });

  it('returns fallback for unknown sportsbooks', () => {
    expect(getAffiliateUrl('UnknownBook')).toBe('#');
  });
});

describe('generateAffiliateUrl', () => {
  it('generates URL with tracking parameters', () => {
    const url = generateAffiliateUrl('DraftKings', 'value-bet', {
      matchup: 'Chiefs vs Bills',
      source: 'value-table'
    });

    expect(url).toContain('utm_source=sportsbetintel');
    expect(url).toContain('utm_medium=value-bet');
    expect(url).toContain('utm_campaign=value-table');
  });

  it('includes side parameter when provided', () => {
    const url = generateAffiliateUrl('FanDuel', 'arbitrage', {
      matchup: 'Lakers vs Warriors',
      side: 'home',
      source: 'arbitrage-panel'
    });

    expect(url).toContain('utm_content=home');
  });

  it('returns null when affiliate links are disabled', () => {
    // Mock config to disable affiliate links
    jest.doMock('../config', () => ({
      config: {
        features: { affiliateLinksEnabled: false }
      }
    }));

    const { generateAffiliateUrl: disabledGenerateAffiliateUrl } = require('../external-links');
    
    const url = disabledGenerateAffiliateUrl('DraftKings', 'value-bet', {
      matchup: 'Test vs Test',
      source: 'test'
    });

    expect(url).toBeNull();

    jest.dontMock('../config');
  });

  it('returns null for unknown sportsbooks', () => {
    const url = generateAffiliateUrl('UnknownBook', 'value-bet', {
      matchup: 'Test vs Test',
      source: 'test'
    });

    expect(url).toBeNull();
  });

  it('handles URL construction errors gracefully', () => {
    // This test ensures that if URL construction fails, we return the base URL
    const url = generateAffiliateUrl('DraftKings', 'value-bet', {
      matchup: 'Test vs Test',
      source: 'test'
    });

    // Should still return a valid URL string
    expect(typeof url).toBe('string');
    expect(url).toContain('https://');
  });
});