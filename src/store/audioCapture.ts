import { create } from "zustand";

interface AudioCaptureStore {
    isCapturing: boolean
    error: string | null
    mediaStream: MediaStream | null
    startCapture: () => Promise<void>
    cleanup: () => void
}

export const useAudioCaptureStore = create<AudioCaptureStore>((set, get) => ({
    isCapturing: false,
    error: null,
    mediaStream: null,
    startCapture: async () => {
        try {
            // stop existing capture
            get().cleanup()

            const stream = await navigator.mediaDevices.getDisplayMedia({
                audio: true,
            });


            // handle stop sharing!
            const videoStream = stream.getVideoTracks()[0];
            if (!videoStream) {
                throw new Error("No video track found");
            }
            set({ mediaStream: stream, isCapturing: true, error: null });
            videoStream.onended = () => {
                get().cleanup();
            }
        } catch (error) {
            set({
                mediaStream: null,
                isCapturing: false,
                error: error instanceof Error ? error.message : "Unknown error",
            })
        }
    },
    cleanup: () => {
        get().mediaStream?.getTracks().forEach((track) => track.stop());
        set({ mediaStream: null, isCapturing: false, error: null });
    },
}));
