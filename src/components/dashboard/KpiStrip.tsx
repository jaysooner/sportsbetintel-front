"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Target,
  TrendingUp,
  Radar,
  Activity
} from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { ProcessedBet } from "@/lib/odds-api";

const sparklineData = [
  { value: 45 },
  { value: 52 },
  { value: 48 },
  { value: 61 },
  { value: 58 },
  { value: 67 },
  { value: 72 }
];

interface KpiCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative';
  sparkline?: boolean;
}

function KpiCard({ icon, title, value, change, changeType, sparkline }: KpiCardProps) {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50 p-6 hover:bg-card/70 transition-all duration-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-primary/10">
            {icon}
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-mono font-bold text-foreground">{value}</p>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-2">
          {change && (
            <Badge 
              variant="outline" 
              className={`${
                changeType === 'positive' 
                  ? 'text-[#20C997] border-[#20C997]/30' 
                  : 'text-destructive border-destructive/30'
              }`}
            >
              {change}
            </Badge>
          )}
          {sparkline && (
            <div className="w-16 h-8">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sparklineData}>
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#20C997" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

interface KpiStripProps {
  valueBets: ProcessedBet[];
}

export function KpiStrip({ valueBets }: KpiStripProps) {
  const avgEdge = valueBets.length > 0 
    ? (valueBets.reduce((sum, bet) => sum + bet.edgeBps, 0) / valueBets.length / 100).toFixed(1)
    : "4.2";
  
  const arbitrages = Math.floor(valueBets.length * 0.2); // Approximate arbitrages as 20% of value bets
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <KpiCard
        icon={<Target className="h-5 w-5 text-primary" />}
        title="Value Bets"
        value={valueBets.length.toString()}
        change={valueBets.length > 0 ? `+${valueBets.length}` : "+12"}
        changeType="positive"
      />
      <KpiCard
        icon={<TrendingUp className="h-5 w-5 text-accent" />}
        title="Avg Edge"
        value={`${avgEdge}%`}
        change="+0.8%"
        changeType="positive"
      />
      <KpiCard
        icon={<Radar className="h-5 w-5 text-primary" />}
        title="Arbitrages"
        value={arbitrages.toString()}
        change={arbitrages > 0 ? `+${arbitrages}` : "+3"}
        changeType="positive"
      />
      <KpiCard
        icon={<Activity className="h-5 w-5 text-accent" />}
        title="CLV Trend"
        value="67.3%"
        change="+5.2%"
        changeType="positive"
        sparkline={true}
      />
    </div>
  );
}