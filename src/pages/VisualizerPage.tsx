import { smooth } from "@/lib/band";
import { useAudioAnalysis } from "@/providers/AudioAnalysisProvider";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
} from "framer-motion";

function VisualizerPage() {
  const { bandsRef } = useAudioAnalysis();

  const band1 = useMotionValue(0);
  const band2 = useMotionValue(0);
  const band3 = useMotionValue(0);
  const band4 = useMotionValue(0);
  const band5 = useMotionValue(0);
  const band6 = useMotionValue(0);
  const band7 = useMotionValue(0);
  const band8 = useMotionValue(0);
  const band9 = useMotionValue(0);
  const band10 = useMotionValue(0);
  const band11 = useMotionValue(0);
  const band12 = useMotionValue(0);
  const band13 = useMotionValue(0);
  const band14 = useMotionValue(0);
  const band15 = useMotionValue(0);
  const band16 = useMotionValue(0);
  const band17 = useMotionValue(0);
  const band18 = useMotionValue(0);
  const band19 = useMotionValue(0);
  const band20 = useMotionValue(0);

  useAnimationFrame(() => {
    if (!bandsRef) return;
    const bands = bandsRef.current;
    if (!bands) return;

    band1.set(smooth(band1.get(), bands[0]));
    band2.set(smooth(band2.get(), bands[1]));
    band3.set(smooth(band3.get(), bands[2]));
    band4.set(smooth(band4.get(), bands[3]));
    band5.set(smooth(band5.get(), bands[4]));
    band6.set(smooth(band6.get(), bands[5]));
    band7.set(smooth(band7.get(), bands[6]));
    band8.set(smooth(band8.get(), bands[7]));
    band9.set(smooth(band9.get(), bands[8]));
    band10.set(smooth(band10.get(), bands[9]));
    band11.set(smooth(band11.get(), bands[10]));
    band12.set(smooth(band12.get(), bands[11]));
    band13.set(smooth(band13.get(), bands[12]));
    band14.set(smooth(band14.get(), bands[13]));
    band15.set(smooth(band15.get(), bands[14]));
    band16.set(smooth(band16.get(), bands[15]));
    band17.set(smooth(band17.get(), bands[16]));
    band18.set(smooth(band18.get(), bands[17]));
    band19.set(smooth(band19.get(), bands[18]));
    band20.set(smooth(band20.get(), bands[19]));
  });

  const band1Val = useTransform(band1, (v) => v * 600);
  const band2Val = useTransform(band2, (v) => v * 600);
  const band3Val = useTransform(band3, (v) => v * 600);
  const band4Val = useTransform(band4, (v) => v * 600);
  const band5Val = useTransform(band5, (v) => v * 600);
  const band6Val = useTransform(band6, (v) => v * 600);
  const band7Val = useTransform(band7, (v) => v * 600);
  const band8Val = useTransform(band8, (v) => v * 600);
  const band9Val = useTransform(band9, (v) => v * 600);
  const band10Val = useTransform(band10, (v) => v * 600);
  const band11Val = useTransform(band11, (v) => v * 600);
  const band12Val = useTransform(band12, (v) => v * 600);
  const band13Val = useTransform(band13, (v) => v * 600);
  const band14Val = useTransform(band14, (v) => v * 600);
  const band15Val = useTransform(band15, (v) => v * 600);
  const band16Val = useTransform(band16, (v) => v * 600);
  const band17Val = useTransform(band17, (v) => v * 600);
  const band18Val = useTransform(band18, (v) => v * 600);
  const band19Val = useTransform(band19, (v) => v * 600);
  const band20Val = useTransform(band20, (v) => v * 600);

  return (
    <motion.div className="w-dvw h-full">
      <div className="flex justify-center items-end gap-2 h-180 my-10">
        <motion.div
          className="w-4"
          style={{
            height: band1Val,
            backgroundColor: "white",
          }}
        />
        <motion.div
          className="w-4"
          style={{
            height: band2Val,
            backgroundColor: "white",
          }}
        />
        <motion.div
          className="w-4"
          style={{
            height: band3Val,
            backgroundColor: "white",
          }}
        />
        <motion.div
          className="w-4"
          style={{
            height: band4Val,
            backgroundColor: "white",
          }}
        />
        <motion.div
          className="w-4"
          style={{
            height: band5Val,
            backgroundColor: "white",
          }}
        />
        <motion.div
          className="w-4"
          style={{
            height: band6Val,
            backgroundColor: "white",
          }}
        />
        <motion.div
          className="w-4"
          style={{
            height: band7Val,
            backgroundColor: "white",
          }}
        />
        <motion.div
          className="w-4"
          style={{
            height: band8Val,
            backgroundColor: "white",
          }}
        />
        <motion.div
          className="w-4"
          style={{
            height: band9Val,
            backgroundColor: "white",
          }}
        />
        <motion.div
          className="w-4"
          style={{
            height: band10Val,
            backgroundColor: "white",
          }}
        />
        <motion.div
          className="w-4"
          style={{
            height: band11Val,
            backgroundColor: "white",
          }}
        />
        <motion.div
          className="w-4"
          style={{
            height: band12Val,
            backgroundColor: "white",
          }}
        />
        <motion.div
          className="w-4"
          style={{
            height: band13Val,
            backgroundColor: "white",
          }}
        />
        <motion.div
          className="w-4"
          style={{
            height: band14Val,
            backgroundColor: "white",
          }}
        />
        <motion.div
          className="w-4"
          style={{
            height: band15Val,
            backgroundColor: "white",
          }}
        />
        <motion.div
          className="w-4"
          style={{
            height: band16Val,
            backgroundColor: "white",
          }}
        />
        <motion.div
          className="w-4"
          style={{
            height: band17Val,
            backgroundColor: "white",
          }}
        />
        <motion.div
          className="w-4"
          style={{
            height: band18Val,
            backgroundColor: "white",
          }}
        />
        <motion.div
          className="w-4"
          style={{
            height: band19Val,
            backgroundColor: "white",
          }}
        />
        <motion.div
          className="w-4"
          style={{
            height: band20Val,
            backgroundColor: "white",
          }}
        />
      </div>
    </motion.div>
  );
}

export default VisualizerPage;
