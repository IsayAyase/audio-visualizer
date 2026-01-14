import CubeViz from "@/components/visualizers/CubeViz";
import ImageBoom from "@/components/visualizers/ImageBoom";
import InfinitySquares from "@/components/visualizers/InfinitySquares";
import Ripple from "@/components/visualizers/Ripple";
import { useAudioAnalysis } from "@/providers/AudioAnalysisProvider";
import { useAppStore } from "@/store/appStore";
import { motion } from "framer-motion";

function VisualizerPage() {
  const { bandsRef } = useAudioAnalysis();
  const { currVisualizer } = useAppStore();
  const BAND_COUNT = bandsRef?.current.length;

  if (!bandsRef || !BAND_COUNT) return null;

  return (
    <motion.div className="w-dvw h-full">
      {currVisualizer === "InfinitySquares" && (
        <InfinitySquares audioBands={bandsRef} />
      )}
      {currVisualizer === "CubeViz" && (
        <CubeViz audioBands={bandsRef} rotationSpeed={40} shakeIntensity={6} />
      )}
      {currVisualizer === "Ripple" && <Ripple audioBands={bandsRef} />}
      {currVisualizer === "ImageBoom" && (
        <ImageBoom audioBands={bandsRef} />
      )}
    </motion.div>
  );
}

export default VisualizerPage;
