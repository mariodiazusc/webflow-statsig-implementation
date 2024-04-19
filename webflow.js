window['Statsig'] = window['Statsig'] || {
  init: function(apiKey, options) {
    const script = document.createElement('script');
    
    if (options?.nonce) {
      script.nonce = options?.nonce;
    }

    script.src = 'https://cdn.jsdelivr.net/npm/statsig-js';
    script.addEventListener('load', () => {
      Statsig._sdkLoaded = true;
      Statsig.setupStatsigSdk(apiKey);
    });

    document.head.appendChild(script);
    console.log('Statsig initialized');
  },

  getExperiment: function(experimentName) {
    return Statsig._sdkLoaded ? Statsig.getExperiment(experimentName) : null;
  },
};

if (document.currentScript && document.currentScript.src) {
  const url = new URL(document.currentScript.src);
  const apiKey = url.searchParams.get('apikey');
  const nonce = document.currentScript.nonce;
  Statsig.init(apiKey, { nonce });
}