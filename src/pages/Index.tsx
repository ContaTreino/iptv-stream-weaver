import { useState } from "react";
import { Header } from "@/components/Header";
import { ChannelSidebar } from "@/components/ChannelSidebar";
import { PlayerControls } from "@/components/PlayerControls";
import { StreamStats } from "@/components/StreamStats";
import { cn } from "@/lib/utils";

interface Channel {
  id: string;
  name: string;
  category: string;
  logo?: string;
  isLive: boolean;
  isFavorite: boolean;
  quality: "HD" | "FHD" | "4K";
}

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isConnected, setIsConnected] = useState(true);
  const [selectedChannel, setSelectedChannel] = useState<Channel>({
    id: "1",
    name: "SporTV",
    category: "Esportes",
    isLive: true,
    isFavorite: false,
    quality: "HD"
  });

  const handleChannelSelect = (channel: Channel) => {
    setSelectedChannel(channel);
    // Aqui você integraria com o player real
  };

  return (
    <div className="min-h-screen bg-background dark flex flex-col">
      <Header 
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        isConnected={isConnected}
      />
      
      <div className="flex flex-1 overflow-hidden">
        <ChannelSidebar 
          isOpen={sidebarOpen}
          onChannelSelect={handleChannelSelect}
          selectedChannel={selectedChannel}
        />
        
        <main className="flex-1 flex flex-col relative">
          {/* Player Container */}
          <div className="flex-1 bg-player-bg relative">
            <iframe 
              src="/iptv-player-v9-v3.html" 
              className="w-full h-full border-0"
              title="IPTV Player V9"
              allowFullScreen
            />
            
            {/* Overlay Controls */}
            <div className="absolute bottom-4 left-4 right-4 z-10">
              <PlayerControls 
                isPlaying={isPlaying}
                onPlayPause={() => setIsPlaying(!isPlaying)}
                currentChannel={selectedChannel}
              />
            </div>
          </div>
        </main>
        
        {/* Stats Sidebar */}
        <aside className={cn(
          "w-80 bg-sidebar-bg border-l border-border transition-all duration-300",
          "hidden xl:block"
        )}>
          <div className="p-4 space-y-4">
            <StreamStats />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Index;
