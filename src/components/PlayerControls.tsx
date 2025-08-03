import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  Settings,
  Maximize,
  Monitor,
  Smartphone,
  Cast
} from "lucide-react";
import { useState } from "react";

interface PlayerControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  currentChannel?: {
    name: string;
    category: string;
    quality: string;
    isLive: boolean;
  };
}

export const PlayerControls = ({ isPlaying, onPlayPause, currentChannel }: PlayerControlsProps) => {
  const [volume, setVolume] = useState([75]);
  const [quality, setQuality] = useState("AUTO");

  return (
    <Card className="bg-card/95 backdrop-blur-sm border-border">
      <div className="p-4">
        {/* Channel Info */}
        {currentChannel && (
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-lg">{currentChannel.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline">{currentChannel.category}</Badge>
                <Badge variant={currentChannel.isLive ? "default" : "secondary"}>
                  {currentChannel.isLive ? "AO VIVO" : "VOD"}
                </Badge>
                <Badge variant="outline">{currentChannel.quality}</Badge>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Cast className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Monitor className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Smartphone className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Main Controls */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <Button variant="ghost" size="sm">
            <SkipBack className="h-5 w-5" />
          </Button>
          
          <Button 
            onClick={onPlayPause}
            size="lg"
            className="rounded-full w-12 h-12"
          >
            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
          </Button>
          
          <Button variant="ghost" size="sm">
            <SkipForward className="h-5 w-5" />
          </Button>
        </div>

        {/* Volume and Quality Controls */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-1">
            <Volume2 className="h-4 w-4" />
            <Slider
              value={volume}
              onValueChange={setVolume}
              max={100}
              step={1}
              className="flex-1 max-w-32"
            />
            <span className="text-sm text-muted-foreground w-8">{volume[0]}%</span>
          </div>

          <div className="flex items-center gap-2">
            <select 
              value={quality}
              onChange={(e) => setQuality(e.target.value)}
              className="bg-background border border-border rounded px-2 py-1 text-sm"
            >
              <option value="AUTO">AUTO</option>
              <option value="4K">4K</option>
              <option value="FHD">FHD</option>
              <option value="HD">HD</option>
              <option value="SD">SD</option>
            </select>
            
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            
            <Button variant="ghost" size="sm">
              <Maximize className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};