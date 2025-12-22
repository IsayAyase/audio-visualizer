type Band = [number, number];

export function createFrequencyBands(
    noOfBands: number,
    lowFreq: number,
    highFreq: number
): Band[] {
    if (noOfBands <= 0) {
        throw new Error("noOfBands must be > 0");
    }

    if (lowFreq <= 0 || highFreq <= lowFreq) {
        throw new Error("Invalid frequency range");
    }

    const bands: Band[] = [];

    const logLow = Math.log10(lowFreq);
    const logHigh = Math.log10(highFreq);
    const step = (logHigh - logLow) / noOfBands;

    for (let i = 0; i < noOfBands; i++) {
        const min = Math.pow(10, logLow + step * i);
        const max = Math.pow(10, logLow + step * (i + 1));

        bands.push([Math.round(min), Math.round(max)]);
    }

    return bands;
}

export const BANDS = createFrequencyBands(20, 20, 16000);

export function getBandEnergy(
    data: Uint8Array,
    sampleRate: number,
    fftSize: number,
    minHz: number,
    maxHz: number
) {
    const hzPerBin = sampleRate / fftSize;
    const start = Math.floor(minHz / hzPerBin);
    const end = Math.ceil(maxHz / hzPerBin);

    let sum = 0;
    for (let i = start; i <= end; i++) {
        sum += data[i];
    }

    return sum / (end - start + 1) / 255; // normalized 0–1
}

export function smooth(current: number, target: number, factor = 0.25) {
    return current + (target - current) * factor;
}
