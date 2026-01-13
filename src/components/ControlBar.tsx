import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppStore } from "@/store/appStore";
import { useAudioCaptureStore } from "@/store/audioCapture";
import { MonitorPlay } from "lucide-react";
import CaptureAudioBtn from "./CaptureAudioBtn";
import { Button } from "./ui/button";

const VisualizerSwitcher = () => {
  const {
    setCurrVisualizer,
    currVisualizer,
    visualizersWithLabel,
    visualizersNameObj,
  } = useAppStore();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <MonitorPlay className="" />
          {visualizersNameObj[currVisualizer]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {visualizersWithLabel.map((viz) => (
          <DropdownMenuItem
            key={viz.type}
            onClick={() => setCurrVisualizer(viz.type)}
            className={currVisualizer === viz.type ? "bg-accent" : ""}
          >
            {viz.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ControlBar = () => {
  const { isCapturing } = useAudioCaptureStore();
  return (
    <div className="fixed z-50 bottom-0 w-full p-4 backdrop-blur-xs">
      <div className="flex justify-between gap-4 items-center">
        <div className="flex items-center gap-2">
          <VisualizerSwitcher />
          <CaptureAudioBtn />
          <span className="text-sm italic text-muted-foreground">
            {isCapturing ? "Capturing Audio" : "Not Capturing Audio"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {/* <ThemeToggleBtn /> */}
        </div>
      </div>
    </div>
  );
};

export default ControlBar;
