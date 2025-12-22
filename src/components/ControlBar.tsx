import { ThemeToggleBtn } from "@/providers/ThemeProvider";
import { useAudioCaptureStore } from "@/store/audioCapture";
import CaptureAudioBtn from "./CaptureAudioBtn";

const ControlBar = () => {
  const { isCapturing } = useAudioCaptureStore();
  return (
    <div className="fixed z-50 bottom-0 w-full p-4 backdrop-blur-xs">
      <div className="flex justify-between gap-4 items-center">
        <div className="flex items-center gap-2">
          <CaptureAudioBtn />
          <span className="text-sm italic text-muted-foreground">
            {isCapturing ? "Capturing Audio" : "Not Capturing Audio"}
          </span>
        </div>
        <ThemeToggleBtn />
      </div>
    </div>
  );
};

export default ControlBar;
