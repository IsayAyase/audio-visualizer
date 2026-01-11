import { create } from "zustand";

type VisualizerType = "InfinitySquares" | "Cube";

interface AudioCaptureStore {
    visualizers: VisualizerType[];
    currVisualizer: VisualizerType;
    setCurrVisualizer: (visualizer: VisualizerType) => void;
}

export const useAppStore = create<AudioCaptureStore>((set) => ({
    visualizers: ["InfinitySquares", "Cube"],
    currVisualizer: "Cube",
    setCurrVisualizer: (visualizer: VisualizerType) => set({ currVisualizer: visualizer }),
}));
