import CubeViz from "@/components/visualizers/CubeViz";
import InfinitySquares from "@/components/visualizers/InfinitySquares";
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
      {/* pink2 misogi */}
      {currVisualizer === "InfinitySquares" && (
        <InfinitySquares audioBands={bandsRef} />
      )}
      {currVisualizer === "Cube" && (
        <CubeViz audioBands={bandsRef} rotationSpeed={40} shakeIntensity={6} />
      )}
    </motion.div>
  );
}

export default VisualizerPage;
