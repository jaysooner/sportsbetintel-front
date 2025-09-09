"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Calendar, 
  Globe, 
  Filter, 
  Sparkles,
  ChevronDown,
  Loader2 
} from "lucide-react";
import { fetchLiveOdds, processOddsForValueBets, getSportKey, getApiUsage, ProcessedBet } from "@/lib/odds-api";

interface NavBarProps {
  onScanComplete: (valueBets: ProcessedBet[]) => void;
  isScanning: boolean;
  setIsScanning: (scanning: boolean) => void;
}

export function NavBar({ onScanComplete, isScanning, setIsScanning }: NavBarProps) {
  const [lastScanTime, setLastScanTime] = useState<string | null>(null);
  const [selectedSport, setSelectedSport] = useState('NFL');
  const [selectedDate, setSelectedDate] = useState('Today');
  const [selectedRegion, setSelectedRegion] = useState('US');

  const handleRunScan = async () => {
    setIsScanning(true);
    
    try {
      // Get the sport key for API call
      const sportKey = getSportKey(selectedSport);
      console.log(`Scanning for ${selectedSport} opportunities...`);
      
      // Fetch live odds from The Odds API
      const games = await fetchLiveOdds(sportKey);
      console.log(`Fetched ${games.length} games from Odds API`);
      
      // Process odds to find value bets
      const valueBets = processOddsForValueBets(games);
      console.log(`Found ${valueBets.length} value betting opportunities`);
      
      // Get API usage info
      const usage = await getApiUsage();
      if (usage) {
        console.log(`API Usage - Used: ${usage.used}, Remaining: ${usage.remaining}`);
      }
      
      // Update last scan time
      setLastScanTime(new Date().toLocaleTimeString());
      
      // Pass the value bets to parent component
      onScanComplete(valueBets);
      
      // Log success message
      console.log('Scan completed! New opportunities found.');
    } catch (error) {
      console.error('Scan failed:', error);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <nav 
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container flex h-16 items-center px-6">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Sparkles className="h-8 w-8 text-accent" aria-hidden="true" />
          <h1 className="text-xl font-bold tracking-tight">
            <span className="text-foreground">SPORTS</span>
            <span className="text-primary">BET</span>
            <span className="text-accent">INTEL</span>
          </h1>
        </div>
        
        <Separator orientation="vertical" className="mx-6 h-6" />
        
        {/* Filters */}
        <div className="flex items-center space-x-4" role="group" aria-label="Filters">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8"
              aria-label="Select sport filter"
              aria-haspopup="listbox"
              aria-expanded="false"
              onClick={() => {
                const sports = ['NFL', 'NBA', 'MLB', 'NHL', 'NCAAF'];
                const currentIndex = sports.indexOf(selectedSport);
                const nextSport = sports[(currentIndex + 1) % sports.length];
                setSelectedSport(nextSport);
                console.log(`Sport filter changed to: ${nextSport}`);
              }}
            >
              {selectedSport} <ChevronDown className="ml-1 h-3 w-3" aria-hidden="true" />
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8"
              aria-label="Select date filter"
              aria-haspopup="listbox"
              aria-expanded="false"
              onClick={() => {
                const dates = ['Today', 'Tomorrow', 'This Week', 'Next Week'];
                const currentIndex = dates.indexOf(selectedDate);
                const nextDate = dates[(currentIndex + 1) % dates.length];
                setSelectedDate(nextDate);
                console.log(`Date filter changed to: ${nextDate}`);
              }}
            >
              {selectedDate} <ChevronDown className="ml-1 h-3 w-3" aria-hidden="true" />
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <Globe className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8"
              aria-label="Select region filter"
              aria-haspopup="listbox"
              aria-expanded="false"
              onClick={() => {
                const regions = ['US', 'UK', 'EU', 'AU'];
                const currentIndex = regions.indexOf(selectedRegion);
                const nextRegion = regions[(currentIndex + 1) % regions.length];
                setSelectedRegion(nextRegion);
                console.log(`Region filter changed to: ${nextRegion}`);
              }}
            >
              {selectedRegion} <ChevronDown className="ml-1 h-3 w-3" aria-hidden="true" />
            </Button>
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1" />
        
        {/* Last Scan Time */}
        {lastScanTime && (
          <div className="text-xs text-muted-foreground mr-4">
            Last scan: {lastScanTime}
          </div>
        )}
        
        {/* Run Scan Button */}
        <Button 
          className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
          aria-label="Start scanning for betting opportunities"
          onClick={handleRunScan}
          disabled={isScanning}
        >
          {isScanning ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Scanning...
            </>
          ) : (
            'Run Scan'
          )}
        </Button>
      </div>
    </nav>
  );
}