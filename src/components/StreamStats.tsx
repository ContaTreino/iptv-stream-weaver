import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Activity, 
  Users, 
  Wifi, 
  Clock,
  TrendingUp,
  Server
} from "lucide-react";
import { useState, useEffect } from "react";

export const StreamStats = () => {
  const [stats, setStats] = useState({
    viewers: 1247,
    uptime: "02:34:56",
    bitrate: "8.5 Mbps",
    latency: "1.2s",
    quality: "1080p60",
    bufferHealth: 95,
    cpuUsage: 23,
    memoryUsage: 67
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        viewers: prev.viewers + Math.floor(Math.random() * 10 - 5),
        bufferHealth: Math.max(85, Math.min(100, prev.bufferHealth + Math.floor(Math.random() * 6 - 3))),
        cpuUsage: Math.max(15, Math.min(45, prev.cpuUsage + Math.floor(Math.random() * 6 - 3))),
        memoryUsage: Math.max(50, Math.min(85, prev.memoryUsage + Math.floor(Math.random() * 6 - 3)))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (value: number, thresholds: { good: number; warning: number }) => {
    if (value >= thresholds.good) return "text-green-500";
    if (value >= thresholds.warning) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <Card className="bg-card/95 backdrop-blur-sm border-border">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Estatísticas do Stream</h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Espectadores</span>
              </div>
              <Badge variant="secondary" className="font-mono">
                {stats.viewers.toLocaleString()}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Tempo Online</span>
              </div>
              <Badge variant="outline" className="font-mono">
                {stats.uptime}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Bitrate</span>
              </div>
              <Badge variant="default" className="font-mono">
                {stats.bitrate}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wifi className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Latência</span>
              </div>
              <Badge 
                variant="outline" 
                className={`font-mono ${getStatusColor(parseFloat(stats.latency), { good: 2, warning: 1 })}`}
              >
                {stats.latency}
              </Badge>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Qualidade</span>
              <Badge variant="default">
                {stats.quality}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm">Buffer</span>
              <div className="flex items-center gap-2">
                <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ${
                      stats.bufferHealth >= 90 ? 'bg-green-500' : 
                      stats.bufferHealth >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${stats.bufferHealth}%` }}
                  />
                </div>
                <span className="text-xs font-mono">{stats.bufferHealth}%</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Server className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">CPU</span>
              </div>
              <Badge 
                variant="outline" 
                className={`font-mono ${getStatusColor(100 - stats.cpuUsage, { good: 70, warning: 55 })}`}
              >
                {stats.cpuUsage}%
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm">Memória</span>
              <Badge 
                variant="outline" 
                className={`font-mono ${getStatusColor(100 - stats.memoryUsage, { good: 30, warning: 15 })}`}
              >
                {stats.memoryUsage}%
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};