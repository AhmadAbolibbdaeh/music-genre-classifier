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
        rms_mean: results.rms !== undefined ? results.rms : 0,
        spectral_centroid_mean: results.spectralCentroid !== undefined ? results.spectralCentroid : 0,
        spectral_bandwidth_mean: results.spectralBandwidth !== undefined ? results.spectralBandwidth : 0,
        rolloff_mean: results.spectralRolloff !== undefined ? results.spectralRolloff : 0,
        zero_crossing_rate_mean: results.zeroCrossingRate !== undefined ? results.zeroCrossingRate : 0,
        mfcc: results.mfcc !== undefined ? results.mfcc : []
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