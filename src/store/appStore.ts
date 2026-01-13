import { create } from "zustand";

type VisualizerType = "InfinitySquares" | "CubeViz" | "Ripple";

interface AudioCaptureStore {
    visualizersWithLabel: {
        label: string;
        type: VisualizerType;
    }[];
    visualizersNameObj: Record<VisualizerType, string>;
    currVisualizer: VisualizerType;
    setCurrVisualizer: (visualizer: VisualizerType) => void;
}

const visualizers = {
    CubeViz: "3D Cube",
    Ripple: "Beat Ripple",
    InfinitySquares: "Infinity Squares",
}

export const useAppStore = create<AudioCaptureStore>((set) => ({
    visualizersNameObj: visualizers,
    visualizersWithLabel: Object.entries(visualizers).map(([type, label]) => ({ label: label, type: type as VisualizerType })),
    currVisualizer: "CubeViz",
    setCurrVisualizer: (visualizer: VisualizerType) => set({ currVisualizer: visualizer }),
}));
