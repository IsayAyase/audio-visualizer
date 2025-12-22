import { useAudioCaptureStore } from "@/store/audioCapture";
import { Button } from "./ui/button";

const CaptureAudioBtn = () => {
  const { startCapture, isCapturing, cleanup } = useAudioCaptureStore();
  const handleToggleBtn = () => (isCapturing ? cleanup() : startCapture());
  return (
    <Button onClick={handleToggleBtn}>
      {isCapturing ? "Stop" : "Capture"}
    </Button>
  );
};

export default CaptureAudioBtn;
