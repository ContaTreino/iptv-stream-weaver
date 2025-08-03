import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Settings, 
  Volume2, 
  VolumeX, 
  Fullscreen, 
  Menu,
  Tv,
  Signal
} from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  onToggleSidebar: () => void;
  isConnected: boolean;
}

export const Header = ({ onToggleSidebar, isConnected }: HeaderProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="bg-gradient-header border-b border-border h-16 flex items-center justify-between px-4 z-50">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onToggleSidebar}
          className="hover:bg-channel-hover"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="flex items-center gap-2">
          <Tv className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">IPTV Stream Weaver</span>
        </div>
        
        <Badge 
          variant={isConnected ? "default" : "destructive"}
          className="flex items-center gap-1"
        >
          <Signal className="h-3 w-3" />
          {isConnected ? "Conectado" : "Desconectado"}
        </Badge>
      </div>

      <div className="flex items-center gap-4 flex-1 max-w-md mx-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar canais..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-sidebar-bg border-border"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsMuted(!isMuted)}
          className="hover:bg-channel-hover"
        >
          {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-channel-hover"
          onClick={() => {
            const elem = document.documentElement;
            if (elem.requestFullscreen) {
              elem.requestFullscreen();
            }
          }}
        >
          <Fullscreen className="h-5 w-5" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-channel-hover"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};