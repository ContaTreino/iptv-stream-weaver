import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Image as ImageIcon, Sparkles } from "lucide-react";
import { toast } from "sonner";
import html2canvas from "html2canvas";
import GIF from "gif.js";

const BACKGROUND_IMAGES = [
  { id: "bg1", url: "https://i.ibb.co/JwVCZKDG/football-stadium-lights-1epkivymicba3lny-1.webp", name: "Stadium Lights" },
  { id: "bg2", url: "https://i.ibb.co/8Q4Psg5/nfl-football-stadium-lvwmv48ww9gg4dqv.webp", name: "NFL Stadium" },
  { id: "bg3", url: "https://i.ibb.co/FLxvVM21/fulham-fc-championship-playoff-aiinz25rvgait00k.webp", name: "Fulham FC" },
];

const TEAM_LOGOS = [
  { id: "ceara", url: "https://i.ibb.co/TDsDqDTC/Cear.png", name: "Ceará" },
  { id: "botafogo", url: "https://i.ibb.co/ccfmfxVY/Botafogo.png", name: "Botafogo" },
  { id: "palmeiras", url: "https://i.ibb.co/xSSkWNk9/Palmeiras.png", name: "Palmeiras" },
  { id: "internacional", url: "https://i.ibb.co/GYHC026/Internacional.png", name: "Internacional" },
  { id: "fluminense", url: "https://i.ibb.co/Cpy1m57m/Fluminense.png", name: "Fluminense" },
  { id: "fortaleza", url: "https://i.ibb.co/jZvk3JhV/Fortaleza.png", name: "Fortaleza" },
  { id: "atletico-mg", url: "https://i.ibb.co/fGy8BKKV/Atl-tico-Mineiro.png", name: "Atlético-MG" },
  { id: "flamengo", url: "https://i.ibb.co/84sb31rN/Flamengo.png", name: "Flamengo" },
  { id: "cruzeiro", url: "https://i.ibb.co/MyjRGCkZ/Cruzeiro.png", name: "Cruzeiro" },
];

const VECTOR_STYLES = [
  { id: "modern", name: "Moderno", gradient: "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))" },
  { id: "neon", name: "Neon", gradient: "linear-gradient(135deg, rgba(0,255,255,0.2), rgba(255,0,255,0.2))" },
  { id: "classic", name: "Clássico", gradient: "linear-gradient(135deg, rgba(34,193,195,0.3), rgba(253,187,45,0.3))" },
  { id: "fire", name: "Fogo", gradient: "linear-gradient(135deg, rgba(255,0,0,0.3), rgba(255,154,0,0.3))" },
  { id: "ice", name: "Gelo", gradient: "linear-gradient(135deg, rgba(0,150,255,0.3), rgba(0,255,255,0.3))" },
];

const BannerGenerator = () => {
  const [selectedBg, setSelectedBg] = useState(BACKGROUND_IMAGES[0].url);
  const [customBg, setCustomBg] = useState("");
  const [team1Logo, setTeam1Logo] = useState(TEAM_LOGOS[0].url);
  const [team2Logo, setTeam2Logo] = useState(TEAM_LOGOS[2].url);
  const [team1Name, setTeam1Name] = useState("Ceará");
  const [team2Name, setTeam2Name] = useState("Palmeiras");
  const [competition, setCompetition] = useState("Brasileirão Série A");
  const [matchTime, setMatchTime] = useState("21h30");
  const [matchDate, setMatchDate] = useState("Sábado, 25/11");
  const [channel, setChannel] = useState("GLOBO, PREMIERE FC");
  const [vectorStyle, setVectorStyle] = useState(VECTOR_STYLES[0]);
  
  const [logo1Size, setLogo1Size] = useState([100]);
  const [logo2Size, setLogo2Size] = useState([100]);
  const [logo1PosX, setLogo1PosX] = useState([30]);
  const [logo1PosY, setLogo1PosY] = useState([45]);
  const [logo2PosX, setLogo2PosX] = useState([65]);
  const [logo2PosY, setLogo2PosY] = useState([45]);
  
  const bannerRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCustomBg(event.target?.result as string);
        setSelectedBg(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>, team: 1 | 2) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (team === 1) {
          setTeam1Logo(event.target?.result as string);
        } else {
          setTeam2Logo(event.target?.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const exportAsPNG = async () => {
    if (!bannerRef.current) return;
    
    setIsGenerating(true);
    try {
      const canvas = await html2canvas(bannerRef.current, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
      });
      
      const link = document.createElement("a");
      link.download = `banner-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      
      toast.success("Banner PNG gerado com sucesso!");
    } catch (error) {
      toast.error("Erro ao gerar PNG");
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const exportAsGIF = async () => {
    if (!bannerRef.current) return;
    
    setIsGenerating(true);
    try {
      const gif = new GIF({
        workers: 2,
        quality: 10,
        width: 850,
        height: 200,
        workerScript: "https://cdn.jsdelivr.net/npm/gif.js@0.2.0/dist/gif.worker.js"
      });

      // Captura múltiplos frames com animação
      for (let i = 0; i < 10; i++) {
        const canvas = await html2canvas(bannerRef.current, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
        });
        gif.addFrame(canvas, { delay: 100 });
      }

      gif.on("finished", (blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = `banner-${Date.now()}.gif`;
        link.href = url;
        link.click();
        toast.success("Banner GIF gerado com sucesso!");
        setIsGenerating(false);
      });

      gif.render();
    } catch (error) {
      toast.error("Erro ao gerar GIF");
      console.error(error);
      setIsGenerating(false);
    }
  };

  const exportAsVideo = async () => {
    if (!bannerRef.current) return;
    
    setIsGenerating(true);
    try {
      const stream = await (navigator.mediaDevices as any).getDisplayMedia({
        video: { mediaSource: "screen" },
      });
      
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "video/webm;codecs=vp9",
      });
      
      const chunks: Blob[] = [];
      
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = `banner-${Date.now()}.webm`;
        link.href = url;
        link.click();
        stream.getTracks().forEach((track: any) => track.stop());
        toast.success("Banner de vídeo gerado com sucesso!");
        setIsGenerating(false);
      };
      
      mediaRecorder.start();
      setTimeout(() => mediaRecorder.stop(), 3000);
    } catch (error) {
      toast.error("Erro ao gerar vídeo");
      console.error(error);
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center gap-3 mb-8">
          <Sparkles className="w-8 h-8 text-primary" />
          <h1 className="text-4xl font-bold text-foreground">Gerador de Banners Profissional</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Preview */}
          <Card className="p-6 bg-card border-border">
            <h2 className="text-xl font-semibold mb-4 text-foreground">Preview do Banner</h2>
            <div 
              ref={bannerRef}
              className="relative w-full aspect-[17/4] rounded-xl overflow-hidden shadow-2xl"
              style={{
                backgroundImage: `url(${selectedBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Overlay com gradiente e vetor */}
              <div 
                className="absolute inset-0" 
                style={{ 
                  background: `${vectorStyle.gradient}, linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.9))` 
                }}
              />
              
              {/* Efeitos decorativos */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 left-0 w-32 h-32 bg-primary rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-accent rounded-full blur-3xl" />
              </div>

              {/* Competição */}
              <div className="absolute top-4 left-0 right-0 text-center">
                <h3 className="text-lg md:text-xl font-bold text-white tracking-wide drop-shadow-lg">
                  {competition}
                </h3>
              </div>

              {/* Logo Time 1 */}
              <div 
                className="absolute transform -translate-x-1/2 -translate-y-1/2 drop-shadow-2xl"
                style={{
                  left: `${logo1PosX[0]}%`,
                  top: `${logo1PosY[0]}%`,
                  width: `${logo1Size[0]}px`,
                  height: `${logo1Size[0]}px`,
                }}
              >
                <img 
                  src={team1Logo} 
                  alt={team1Name}
                  className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                  style={{ border: "3px solid rgba(255,255,255,0.3)", borderRadius: "50%", padding: "8px" }}
                />
              </div>

              {/* VS */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary blur-xl opacity-50" />
                  <span className="relative text-5xl md:text-6xl font-black text-white drop-shadow-2xl" style={{ 
                    textShadow: "0 0 20px rgba(255,255,255,0.5), 0 0 40px rgba(142,229,122,0.5)" 
                  }}>
                    VS
                  </span>
                </div>
              </div>

              {/* Logo Time 2 */}
              <div 
                className="absolute transform -translate-x-1/2 -translate-y-1/2 drop-shadow-2xl"
                style={{
                  left: `${logo2PosX[0]}%`,
                  top: `${logo2PosY[0]}%`,
                  width: `${logo2Size[0]}px`,
                  height: `${logo2Size[0]}px`,
                }}
              >
                <img 
                  src={team2Logo} 
                  alt={team2Name}
                  className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                  style={{ border: "3px solid rgba(255,255,255,0.3)", borderRadius: "50%", padding: "8px" }}
                />
              </div>

              {/* Nomes dos Times */}
              <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 flex justify-between px-8">
                <div className="text-left">
                  <h2 className="text-2xl md:text-4xl font-black text-white drop-shadow-lg" style={{ 
                    textShadow: "3px 3px 6px rgba(0,0,0,0.8), 0 0 10px rgba(255,255,255,0.3)",
                    WebkitTextStroke: "1px rgba(255,255,255,0.2)"
                  }}>
                    {team1Name}
                  </h2>
                </div>
                <div className="text-right">
                  <h2 className="text-2xl md:text-4xl font-black text-white drop-shadow-lg" style={{ 
                    textShadow: "3px 3px 6px rgba(0,0,0,0.8), 0 0 10px rgba(255,255,255,0.3)",
                    WebkitTextStroke: "1px rgba(255,255,255,0.2)"
                  }}>
                    {team2Name}
                  </h2>
                </div>
              </div>

              {/* Info do Jogo */}
              <div className="absolute bottom-4 left-0 right-0 text-center">
                <div className="inline-block bg-black/60 backdrop-blur-sm px-6 py-2 rounded-full border border-white/20">
                  <p className="text-white font-bold text-sm md:text-base tracking-wide">
                    {matchTime} • {matchDate} • {channel}
                  </p>
                </div>
              </div>
            </div>

            {/* Export Buttons */}
            <div className="mt-6 flex flex-wrap gap-3">
              <Button onClick={exportAsPNG} disabled={isGenerating} className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                Exportar PNG
              </Button>
              <Button onClick={exportAsGIF} disabled={isGenerating} variant="secondary" className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                Exportar GIF
              </Button>
              <Button onClick={exportAsVideo} disabled={isGenerating} variant="outline" className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                Exportar Vídeo
              </Button>
            </div>
          </Card>

          {/* Controls */}
          <Card className="p-6 bg-card border-border">
            <Tabs defaultValue="background" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="background">Background</TabsTrigger>
                <TabsTrigger value="teams">Times</TabsTrigger>
                <TabsTrigger value="info">Info</TabsTrigger>
                <TabsTrigger value="style">Estilo</TabsTrigger>
              </TabsList>

              {/* Background Tab */}
              <TabsContent value="background" className="space-y-4">
                <div>
                  <Label>Backgrounds Predefinidos</Label>
                  <div className="grid grid-cols-3 gap-3 mt-2">
                    {BACKGROUND_IMAGES.map((bg) => (
                      <div
                        key={bg.id}
                        onClick={() => setSelectedBg(bg.url)}
                        className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                          selectedBg === bg.url ? "border-primary scale-105" : "border-border hover:border-primary/50"
                        }`}
                      >
                        <img src={bg.url} alt={bg.name} className="w-full h-20 object-cover" />
                        <p className="text-xs text-center py-1 bg-secondary text-secondary-foreground">{bg.name}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="bg-upload">Upload Background Personalizado</Label>
                  <Input
                    id="bg-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleBgUpload}
                    className="mt-2"
                  />
                </div>
              </TabsContent>

              {/* Teams Tab */}
              <TabsContent value="teams" className="space-y-6">
                {/* Time 1 */}
                <div className="space-y-4 p-4 rounded-lg bg-secondary/50">
                  <h3 className="font-semibold text-foreground">Time 1</h3>
                  
                  <div>
                    <Label>Logo do Time 1</Label>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {TEAM_LOGOS.slice(0, 6).map((logo) => (
                        <div
                          key={logo.id}
                          onClick={() => {
                            setTeam1Logo(logo.url);
                            setTeam1Name(logo.name);
                          }}
                          className={`cursor-pointer rounded-lg p-2 border-2 transition-all ${
                            team1Logo === logo.url ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
                          }`}
                        >
                          <img src={logo.url} alt={logo.name} className="w-full h-12 object-contain" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="team1-upload">Upload Logo</Label>
                    <Input
                      id="team1-upload"
                      type="file"
                      accept="image/png"
                      onChange={(e) => handleLogoUpload(e, 1)}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="team1-name">Nome do Time 1</Label>
                    <Input
                      id="team1-name"
                      value={team1Name}
                      onChange={(e) => setTeam1Name(e.target.value)}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label>Tamanho Logo 1: {logo1Size[0]}px</Label>
                    <Slider
                      value={logo1Size}
                      onValueChange={setLogo1Size}
                      min={50}
                      max={200}
                      step={5}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label>Posição Horizontal Logo 1: {logo1PosX[0]}%</Label>
                    <Slider
                      value={logo1PosX}
                      onValueChange={setLogo1PosX}
                      min={10}
                      max={45}
                      step={1}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label>Posição Vertical Logo 1: {logo1PosY[0]}%</Label>
                    <Slider
                      value={logo1PosY}
                      onValueChange={setLogo1PosY}
                      min={30}
                      max={60}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                </div>

                {/* Time 2 */}
                <div className="space-y-4 p-4 rounded-lg bg-secondary/50">
                  <h3 className="font-semibold text-foreground">Time 2</h3>
                  
                  <div>
                    <Label>Logo do Time 2</Label>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {TEAM_LOGOS.slice(0, 6).map((logo) => (
                        <div
                          key={logo.id}
                          onClick={() => {
                            setTeam2Logo(logo.url);
                            setTeam2Name(logo.name);
                          }}
                          className={`cursor-pointer rounded-lg p-2 border-2 transition-all ${
                            team2Logo === logo.url ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
                          }`}
                        >
                          <img src={logo.url} alt={logo.name} className="w-full h-12 object-contain" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="team2-upload">Upload Logo</Label>
                    <Input
                      id="team2-upload"
                      type="file"
                      accept="image/png"
                      onChange={(e) => handleLogoUpload(e, 2)}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="team2-name">Nome do Time 2</Label>
                    <Input
                      id="team2-name"
                      value={team2Name}
                      onChange={(e) => setTeam2Name(e.target.value)}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label>Tamanho Logo 2: {logo2Size[0]}px</Label>
                    <Slider
                      value={logo2Size}
                      onValueChange={setLogo2Size}
                      min={50}
                      max={200}
                      step={5}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label>Posição Horizontal Logo 2: {logo2PosX[0]}%</Label>
                    <Slider
                      value={logo2PosX}
                      onValueChange={setLogo2PosX}
                      min={55}
                      max={90}
                      step={1}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label>Posição Vertical Logo 2: {logo2PosY[0]}%</Label>
                    <Slider
                      value={logo2PosY}
                      onValueChange={setLogo2PosY}
                      min={30}
                      max={60}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Info Tab */}
              <TabsContent value="info" className="space-y-4">
                <div>
                  <Label htmlFor="competition">Competição</Label>
                  <Input
                    id="competition"
                    value={competition}
                    onChange={(e) => setCompetition(e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="time">Horário</Label>
                  <Input
                    id="time"
                    value={matchTime}
                    onChange={(e) => setMatchTime(e.target.value)}
                    placeholder="21h30"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="date">Data e Dia da Semana</Label>
                  <Input
                    id="date"
                    value={matchDate}
                    onChange={(e) => setMatchDate(e.target.value)}
                    placeholder="Sábado, 25/11"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="channel">Canal / Transmissão</Label>
                  <Input
                    id="channel"
                    value={channel}
                    onChange={(e) => setChannel(e.target.value)}
                    placeholder="GLOBO, PREMIERE FC"
                    className="mt-2"
                  />
                </div>
              </TabsContent>

              {/* Style Tab */}
              <TabsContent value="style" className="space-y-4">
                <div>
                  <Label>Estilo de Vetor/Efeito</Label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {VECTOR_STYLES.map((style) => (
                      <div
                        key={style.id}
                        onClick={() => setVectorStyle(style)}
                        className={`cursor-pointer rounded-lg p-4 border-2 transition-all ${
                          vectorStyle.id === style.id ? "border-primary scale-105" : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div
                          className="w-full h-16 rounded-md mb-2"
                          style={{ background: style.gradient }}
                        />
                        <p className="text-sm text-center font-medium text-foreground">{style.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BannerGenerator;