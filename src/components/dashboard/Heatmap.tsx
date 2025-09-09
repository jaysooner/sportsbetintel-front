"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Flame,
  TrendingUp,
  TrendingDown,
  Minus
} from "lucide-react";

interface HeatmapData {
  team: string;
  books: {
    book: string;
    deviation: number;
    trend: 'up' | 'down' | 'neutral';
  }[];
}

const mockHeatmapData: HeatmapData[] = [
  {
    team: 'Chiefs',
    books: [
      { book: 'DK', deviation: 4.2, trend: 'up' },
      { book: 'FD', deviation: -2.1, trend: 'down' },
      { book: 'MGM', deviation: 1.8, trend: 'up' },
      { book: 'CZR', deviation: -0.5, trend: 'neutral' },
      { book: 'PB', deviation: 3.4, trend: 'up' }
    ]
  },
  {
    team: 'Bills',
    books: [
      { book: 'DK', deviation: -1.8, trend: 'down' },
      { book: 'FD', deviation: 2.9, trend: 'up' },
      { book: 'MGM', deviation: -3.2, trend: 'down' },
      { book: 'CZR', deviation: 0.8, trend: 'neutral' },
      { book: 'PB', deviation: -1.1, trend: 'down' }
    ]
  },
  {
    team: 'Cowboys',
    books: [
      { book: 'DK', deviation: 2.1, trend: 'up' },
      { book: 'FD', deviation: -4.5, trend: 'down' },
      { book: 'MGM', deviation: 1.2, trend: 'up' },
      { book: 'CZR', deviation: 3.8, trend: 'up' },
      { book: 'PB', deviation: -2.3, trend: 'down' }
    ]
  },
  {
    team: 'Eagles',
    books: [
      { book: 'DK', deviation: -2.8, trend: 'down' },
      { book: 'FD', deviation: 1.5, trend: 'up' },
      { book: 'MGM', deviation: -1.9, trend: 'down' },
      { book: 'CZR', deviation: 2.7, trend: 'up' },
      { book: 'PB', deviation: 0.3, trend: 'neutral' }
    ]
  },
  {
    team: 'Packers',
    books: [
      { book: 'DK', deviation: 3.6, trend: 'up' },
      { book: 'FD', deviation: -1.2, trend: 'down' },
      { book: 'MGM', deviation: 4.1, trend: 'up' },
      { book: 'CZR', deviation: -2.9, trend: 'down' },
      { book: 'PB', deviation: 1.8, trend: 'up' }
    ]
  }
];

function getIntensityColor(deviation: number): string {
  const absDeviation = Math.abs(deviation);
  if (absDeviation >= 3) {
    return deviation > 0 ? 'bg-[#20C997]/30' : 'bg-[#FF5C5C]/30';
  } else if (absDeviation >= 2) {
    return deviation > 0 ? 'bg-[#20C997]/20' : 'bg-[#FF5C5C]/20';
  } else if (absDeviation >= 1) {
    return deviation > 0 ? 'bg-[#20C997]/10' : 'bg-[#FF5C5C]/10';
  }
  return 'bg-muted/10';
}

function getTrendIcon(trend: 'up' | 'down' | 'neutral') {
  switch (trend) {
    case 'up':
      return <TrendingUp className="h-3 w-3 text-[#20C997]" />;
    case 'down':
      return <TrendingDown className="h-3 w-3 text-[#FF5C5C]" />;
    default:
      return <Minus className="h-3 w-3 text-muted-foreground" />;
  }
}

export function Heatmap() {
  const books = ['DK', 'FD', 'MGM', 'CZR', 'PB'];

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Flame className="h-5 w-5 text-accent" />
            <h3 className="text-lg font-semibold text-foreground">Line Movement Heatmap</h3>
          </div>
          <Badge variant="outline" className="text-muted-foreground">
            Deviation from median %
          </Badge>
        </div>

        <div className="space-y-1">
          {/* Header Row */}
          <div className="grid grid-cols-6 gap-2 mb-2">
            <div className="text-sm font-medium text-muted-foreground px-3 py-2">
              Team
            </div>
            {books.map((book) => (
              <div key={book} className="text-sm font-medium text-center text-muted-foreground px-3 py-2">
                {book}
              </div>
            ))}
          </div>

          {/* Data Rows */}
          {mockHeatmapData.map((row) => (
            <div key={row.team} className="grid grid-cols-6 gap-2 hover:bg-muted/5 rounded-lg transition-colors">
              <div className="text-sm font-medium text-foreground px-3 py-3 flex items-center">
                {row.team}
              </div>
              {row.books.map((bookData) => (
                <div
                  key={bookData.book}
                  className={`
                    relative px-3 py-3 rounded-lg border border-border/30 text-center
                    ${getIntensityColor(bookData.deviation)}
                    hover:scale-105 transition-all duration-200 cursor-pointer
                  `}
                  title={`${row.team} - ${bookData.book}: ${bookData.deviation > 0 ? '+' : ''}${bookData.deviation.toFixed(1)}% deviation`}
                >
                  <div className="flex items-center justify-center space-x-1">
                    <span className="text-xs font-mono font-semibold text-foreground">
                      {bookData.deviation > 0 ? '+' : ''}{bookData.deviation.toFixed(1)}
                    </span>
                    {getTrendIcon(bookData.trend)}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded bg-[#20C997]/30"></div>
              <span>Positive deviation</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded bg-[#FF5C5C]/30"></div>
              <span>Negative deviation</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded bg-muted/10"></div>
              <span>Neutral</span>
            </div>
          </div>
          <span>Updated: 2 min ago</span>
        </div>
      </div>
    </Card>
  );
}