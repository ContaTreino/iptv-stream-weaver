import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronDown, 
  ChevronRight, 
  Play, 
  Star, 
  StarOff,
  Filter,
  Tv2,
  Radio,
  Film,
  Music,
  Globe
} from "lucide-react";
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

interface ChannelSidebarProps {
  isOpen: boolean;
  onChannelSelect: (channel: Channel) => void;
  selectedChannel?: Channel;
}

export const ChannelSidebar = ({ isOpen, onChannelSelect, selectedChannel }: ChannelSidebarProps) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["Esportes"]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [filterText, setFilterText] = useState("");

  const mockChannels: Channel[] = [
    { id: "1", name: "SporTV", category: "Esportes", isLive: true, isFavorite: false, quality: "HD" },
    { id: "2", name: "ESPN", category: "Esportes", isLive: true, isFavorite: true, quality: "FHD" },
    { id: "3", name: "Globo", category: "Abertos", isLive: true, isFavorite: true, quality: "HD" },
    { id: "4", name: "Netflix", category: "Filmes", isLive: false, isFavorite: false, quality: "4K" },
    { id: "5", name: "HBO Max", category: "Filmes", isLive: false, isFavorite: false, quality: "4K" },
    { id: "6", name: "MTV", category: "Música", isLive: true, isFavorite: false, quality: "HD" },
    { id: "7", name: "Discovery", category: "Documentários", isLive: true, isFavorite: false, quality: "FHD" },
    { id: "8", name: "CNN", category: "Notícias", isLive: true, isFavorite: false, quality: "HD" },
    { id: "9", name: "BBC", category: "Internacional", isLive: true, isFavorite: false, quality: "FHD" },
  ];

  const categories = Array.from(new Set(mockChannels.map(c => c.category)));
  
  const filteredChannels = mockChannels.filter(channel => 
    channel.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleFavorite = (channelId: string) => {
    setFavorites(prev => 
      prev.includes(channelId)
        ? prev.filter(id => id !== channelId)
        : [...prev, channelId]
    );
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Esportes": return <Tv2 className="h-4 w-4" />;
      case "Filmes": return <Film className="h-4 w-4" />;
      case "Música": return <Music className="h-4 w-4" />;
      case "Notícias": return <Radio className="h-4 w-4" />;
      case "Internacional": return <Globe className="h-4 w-4" />;
      default: return <Tv2 className="h-4 w-4" />;
    }
  };

  if (!isOpen) return null;

  return (
    <aside className="w-80 bg-sidebar-bg border-r border-border flex flex-col h-full">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="h-4 w-4 text-primary" />
          <span className="font-semibold">Canais</span>
        </div>
        
        <Input
          placeholder="Filtrar canais..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="bg-background border-border"
        />
      </div>

      <ScrollArea className="flex-1 p-2">
        {categories.map(category => {
          const categoryChannels = filteredChannels.filter(c => c.category === category);
          const isExpanded = expandedCategories.includes(category);
          
          if (categoryChannels.length === 0) return null;

          return (
            <div key={category} className="mb-2">
              <Button
                variant="ghost"
                onClick={() => toggleCategory(category)}
                className="w-full justify-start p-2 h-auto hover:bg-channel-hover"
              >
                {isExpanded ? <ChevronDown className="h-4 w-4 mr-2" /> : <ChevronRight className="h-4 w-4 mr-2" />}
                {getCategoryIcon(category)}
                <span className="ml-2 font-medium">{category}</span>
                <Badge variant="secondary" className="ml-auto">
                  {categoryChannels.length}
                </Badge>
              </Button>

              {isExpanded && (
                <div className="ml-4 space-y-1">
                  {categoryChannels.map(channel => (
                    <div
                      key={channel.id}
                      className={cn(
                        "flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors",
                        "hover:bg-channel-hover",
                        selectedChannel?.id === channel.id && "bg-channel-active text-primary-foreground"
                      )}
                      onClick={() => onChannelSelect(channel)}
                    >
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <div className="w-8 h-8 bg-muted rounded flex items-center justify-center flex-shrink-0">
                          <Play className="h-3 w-3" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm truncate">{channel.name}</div>
                          <div className="flex items-center gap-1 mt-1">
                            <Badge 
                              variant={channel.isLive ? "default" : "secondary"}
                              className="text-xs px-1 py-0"
                            >
                              {channel.isLive ? "AO VIVO" : "VOD"}
                            </Badge>
                            <Badge variant="outline" className="text-xs px-1 py-0">
                              {channel.quality}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(channel.id);
                        }}
                        className="flex-shrink-0 p-1 h-auto"
                      >
                        {favorites.includes(channel.id) ? 
                          <Star className="h-4 w-4 fill-primary text-primary" /> : 
                          <StarOff className="h-4 w-4" />
                        }
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </ScrollArea>
    </aside>
  );
};