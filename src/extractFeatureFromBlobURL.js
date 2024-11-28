import Meyda from 'meyda';

async function extractFeaturesFromBlobURL(blobURL) {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  try {
    const response = await fetch(blobURL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    // List of requested features
    const requestedFeatures = [
      'chroma',
      'rms',
      'spectralCentroid',
      'spectralBandwidth',
      'spectralRolloff',
      'zeroCrossingRate',
      'mfcc'
    ];

    // Filter only valid features
    const validFeatures = requestedFeatures.filter(feature => typeof Meyda.featureExtractors[feature] === 'function');
    console.log('Valid Features:', validFeatures); // Log valid features for debugging

    // Ensure buffer size is a power of 2
    const bufferSize = 512; // Example buffer size
    const signal = audioBuffer.getChannelData(0).slice(0, bufferSize);

    if (validFeatures.length > 0) {
      const results = Meyda.extract(validFeatures, signal);
      console.log('Extracted Features:', results); // Log extracted features for debugging

      // Ensure the results are structured as an object with keys matching the feature names
      const formattedResults = {
        chroma_stft_mean: results.chroma ? results.chroma.reduce((a, b) => a + b, 0) / results.chroma.length : 0,
        chroma_stft_var: results.chroma ? results.chroma.reduce((a, b) => a + (b - results.chroma_stft_mean) ** 2, 0) / results.chroma.length : 0,
        rms_mean: results.rms !== undefined ? results.rms : 0,
        rms_var: results.rms !== undefined ? results.rms ** 2 : 0,
        spectral_centroid_mean: results.spectralCentroid !== undefined ? results.spectralCentroid : 0,
        spectral_centroid_var: results.spectralCentroid !== undefined ? results.spectralCentroid ** 2 : 0,
        spectral_bandwidth_mean: results.spectralBandwidth !== undefined ? results.spectralBandwidth : 0,
        spectral_bandwidth_var: results.spectralBandwidth !== undefined ? results.spectralBandwidth ** 2 : 0,
        rolloff_mean: results.spectralRolloff !== undefined ? results.spectralRolloff : 0,
        rolloff_var: results.spectralRolloff !== undefined ? results.spectralRolloff ** 2 : 0,
        zero_crossing_rate_mean: results.zeroCrossingRate !== undefined ? results.zeroCrossingRate : 0,
        zero_crossing_rate_var: results.zeroCrossingRate !== undefined ? results.zeroCrossingRate ** 2 : 0,
        mfcc1_mean: results.mfcc !== undefined && results.mfcc.length > 0 ? results.mfcc[0] : 0,
        mfcc1_var: results.mfcc !== undefined && results.mfcc.length > 0 ? results.mfcc[0] ** 2 : 0,
        mfcc2_mean: results.mfcc !== undefined && results.mfcc.length > 1 ? results.mfcc[1] : 0,
        mfcc2_var: results.mfcc !== undefined && results.mfcc.length > 1 ? results.mfcc[1] ** 2 : 0,
        mfcc3_mean: results.mfcc !== undefined && results.mfcc.length > 2 ? results.mfcc[2] : 0,
        mfcc3_var: results.mfcc !== undefined && results.mfcc.length > 2 ? results.mfcc[2] ** 2 : 0,
        mfcc4_mean: results.mfcc !== undefined && results.mfcc.length > 3 ? results.mfcc[3] : 0,
        mfcc4_var: results.mfcc !== undefined && results.mfcc.length > 3 ? results.mfcc[3] ** 2 : 0,
        mfcc5_mean: results.mfcc !== undefined && results.mfcc.length > 4 ? results.mfcc[4] : 0,
        mfcc5_var: results.mfcc !== undefined && results.mfcc.length > 4 ? results.mfcc[4] ** 2 : 0,
        mfcc6_mean: results.mfcc !== undefined && results.mfcc.length > 5 ? results.mfcc[5] : 0,
        mfcc6_var: results.mfcc !== undefined && results.mfcc.length > 5 ? results.mfcc[5] ** 2 : 0,
        mfcc7_mean: results.mfcc !== undefined && results.mfcc.length > 6 ? results.mfcc[6] : 0,
        mfcc7_var: results.mfcc !== undefined && results.mfcc.length > 6 ? results.mfcc[6] ** 2 : 0,
        mfcc8_mean: results.mfcc !== undefined && results.mfcc.length > 7 ? results.mfcc[7] : 0,
        mfcc8_var: results.mfcc !== undefined && results.mfcc.length > 7 ? results.mfcc[7] ** 2 : 0,
        mfcc9_mean: results.mfcc !== undefined && results.mfcc.length > 8 ? results.mfcc[8] : 0,
        mfcc9_var: results.mfcc !== undefined && results.mfcc.length > 8 ? results.mfcc[8] ** 2 : 0,
        mfcc10_mean: results.mfcc !== undefined && results.mfcc.length > 9 ? results.mfcc[9] : 0,
        mfcc10_var: results.mfcc !== undefined && results.mfcc.length > 9 ? results.mfcc[9] ** 2 : 0,
        mfcc11_mean: results.mfcc !== undefined && results.mfcc.length > 10 ? results.mfcc[10] : 0,
        mfcc11_var: results.mfcc !== undefined && results.mfcc.length > 10 ? results.mfcc[10] ** 2 : 0,
        mfcc12_mean: results.mfcc !== undefined && results.mfcc.length > 11 ? results.mfcc[11] : 0,
        mfcc12_var: results.mfcc !== undefined && results.mfcc.length > 11 ? results.mfcc[11] ** 2 : 0,
        mfcc13_mean: results.mfcc !== undefined && results.mfcc.length > 12 ? results.mfcc[12] : 0,
        mfcc13_var: results.mfcc !== undefined && results.mfcc.length > 12 ? results.mfcc[12] ** 2 : 0,
        mfcc14_mean: results.mfcc !== undefined && results.mfcc.length > 13 ? results.mfcc[13] : 0,
        mfcc14_var: results.mfcc !== undefined && results.mfcc.length > 13 ? results.mfcc[13] ** 2 : 0,
        mfcc15_mean: results.mfcc !== undefined && results.mfcc.length > 14 ? results.mfcc[14] : 0,
        mfcc15_var: results.mfcc !== undefined && results.mfcc.length > 14 ? results.mfcc[14] ** 2 : 0,
        mfcc16_mean: results.mfcc !== undefined && results.mfcc.length > 15 ? results.mfcc[15] : 0,
        mfcc16_var: results.mfcc !== undefined && results.mfcc.length > 15 ? results.mfcc[15] ** 2 : 0,
        mfcc17_mean: results.mfcc !== undefined && results.mfcc.length > 16 ? results.mfcc[16] : 0,
        mfcc17_var: results.mfcc !== undefined && results.mfcc.length > 16 ? results.mfcc[16] ** 2 : 0,
        mfcc18_mean: results.mfcc !== undefined && results.mfcc.length > 17 ? results.mfcc[17] : 0,
        mfcc18_var: results.mfcc !== undefined && results.mfcc.length > 17 ? results.mfcc[17] ** 2 : 0,
        mfcc19_mean: results.mfcc !== undefined && results.mfcc.length > 18 ? results.mfcc[18] : 0,
        mfcc19_var: results.mfcc !== undefined && results.mfcc.length > 18 ? results.mfcc[18] ** 2 : 0,
        mfcc20_mean: results.mfcc !== undefined && results.mfcc.length > 19 ? results.mfcc[19] : 0,
        mfcc20_var: results.mfcc !== undefined && results.mfcc.length > 19 ? results.mfcc[19] ** 2 : 0,
      };

      return formattedResults;
    } else {
      throw new Error('No valid feature extractors found.');
    }
  } catch (error) {
    console.error('Error processing song:', error);
    return null;
  }
}

export default extractFeaturesFromBlobURL;
