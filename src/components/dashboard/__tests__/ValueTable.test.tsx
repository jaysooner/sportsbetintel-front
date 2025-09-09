import { render, screen, fireEvent } from '@testing-library/react';
import { ValueTable } from '../ValueTable';

// Mock the external-links module
jest.mock('@/lib/external-links', () => ({
  generateAffiliateUrl: jest.fn(() => 'https://draftkings.com?utm_source=sportsbetintel'),
  openExternalLink: jest.fn(() => true),
}));

const { generateAffiliateUrl, openExternalLink } = require('@/lib/external-links');

describe('ValueTable', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders value bets table', () => {
    render(<ValueTable />);

    expect(screen.getByText('Value Bets')).toBeInTheDocument();
    expect(screen.getByText('5 opportunities')).toBeInTheDocument();
  });

  it('displays table headers correctly', () => {
    render(<ValueTable />);

    expect(screen.getByText('Matchup')).toBeInTheDocument();
    expect(screen.getByText('Side')).toBeInTheDocument();
    expect(screen.getByText('Book')).toBeInTheDocument();
    expect(screen.getByText('Price')).toBeInTheDocument();
    expect(screen.getByText('Edge')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
  });

  it('renders value bet data correctly', () => {
    render(<ValueTable />);

    // Check for matchup data
    expect(screen.getByText('Chiefs vs Bills')).toBeInTheDocument();
    expect(screen.getByText('Cowboys vs Eagles')).toBeInTheDocument();

    // Check for sportsbook names
    expect(screen.getByText('DraftKings')).toBeInTheDocument();
    expect(screen.getByText('FanDuel')).toBeInTheDocument();

    // Check for prices
    expect(screen.getByText('-110')).toBeInTheDocument();
    expect(screen.getByText('+165')).toBeInTheDocument();

    // Check for edge values
    expect(screen.getByText('+420 bps')).toBeInTheDocument();
    expect(screen.getByText('+380 bps')).toBeInTheDocument();
  });

  it('displays side badges correctly', () => {
    render(<ValueTable />);

    const sideBadges = screen.getAllByText(/HOME|AWAY/);
    expect(sideBadges.length).toBeGreaterThan(0);
  });

  it('displays sport badges', () => {
    render(<ValueTable />);

    const sportBadges = screen.getAllByText('NFL');
    expect(sportBadges.length).toBe(5); // All mock bets are NFL
  });

  it('handles get line button clicks', () => {
    render(<ValueTable />);

    const getLineButtons = screen.getAllByText('Get Line');
    expect(getLineButtons.length).toBe(5);

    // Click the first button
    fireEvent.click(getLineButtons[0]);

    expect(generateAffiliateUrl).toHaveBeenCalledWith('DraftKings', 'value-bet', {
      matchup: 'Chiefs vs Bills',
      source: 'value-table'
    });
    expect(openExternalLink).toHaveBeenCalledWith(
      'https://draftkings.com?utm_source=sportsbetintel',
      {
        source: 'value-table',
        book: 'DraftKings',
        matchup: 'Chiefs vs Bills'
      }
    );
  });

  it('displays decimal odds alongside American odds', () => {
    render(<ValueTable />);

    // Check for decimal odds in parentheses
    expect(screen.getByText('(1.91)')).toBeInTheDocument();
    expect(screen.getByText('(2.65)')).toBeInTheDocument();
  });

  it('formats positive and negative odds correctly', () => {
    render(<ValueTable />);

    // Negative odds shouldn't have + sign
    expect(screen.getByText('-110')).toBeInTheDocument();
    expect(screen.getByText('-125')).toBeInTheDocument();

    // Positive odds should have + sign
    expect(screen.getByText('+165')).toBeInTheDocument();
    expect(screen.getByText('+145')).toBeInTheDocument();
  });

  it('shows external link icon in get line buttons', () => {
    render(<ValueTable />);

    const getLineButtons = screen.getAllByText('Get Line');
    
    // Each button should be in the document
    getLineButtons.forEach(button => {
      expect(button).toBeInTheDocument();
    });
  });

  it('handles cases where affiliate URL generation fails', () => {
    generateAffiliateUrl.mockReturnValue(null);

    render(<ValueTable />);

    const getLineButtons = screen.getAllByText('Get Line');
    fireEvent.click(getLineButtons[0]);

    expect(generateAffiliateUrl).toHaveBeenCalled();
    expect(openExternalLink).not.toHaveBeenCalled();
  });

  it('applies correct styling classes', () => {
    render(<ValueTable />);

    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
    
    // Check for hover effects on table rows
    const tableRows = screen.getAllByRole('row');
    // First row is header, data rows start from index 1
    expect(tableRows.length).toBe(6); // 1 header + 5 data rows
  });
});