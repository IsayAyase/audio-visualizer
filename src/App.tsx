import ControlBar from "./components/ControlBar";
import VisualizerPage from "./pages/VisualizerPage";
import { AudioAnalysisProvider } from "./providers/AudioAnalysisProvider";

const App = () => {
  return (
    <div className="w-dvw h-dvh flex items-center justify-center">
      <AudioAnalysisProvider noOfBands={20}>
        <VisualizerPage />
      </AudioAnalysisProvider>
      <ControlBar />
    </div>
  );
};

export default App;
