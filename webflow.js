window['StatsigHelper'] = window['StatsigHelper'] || {
  init: function(apiKey, options) {
    const script = document.createElement('script');
    
    if (options?.nonce) {
      script.nonce = options?.nonce;
    }

    script.src = 'https://cdn.jsdelivr.net/npm/statsig-js';
    script.addEventListener('load', () => {
      StatsigHelper._sdkLoaded = true;
      StatsigHelper.setupStatsigSdk(apiKey);
    });

    document.head.appendChild(script);
    console.log('Statsig initialized');
  },

  isFeatureEnabled: async function(experimentName, paramName) {
    if (!StatsigHelper._sdkLoaded) {
      console.error('Statsig SDK not loaded');
      return false;
    }

    const experimet = await StatsigHelper._statsig.getExperiment(experimentName);
    if (experimet) {
      return experimet.get(paramName, false);
    }

    return false
  },
};

if (document.currentScript && document.currentScript.src) {
  const url = new URL(document.currentScript.src);
  const apiKey = url.searchParams.get('apikey');
  const nonce = document.currentScript.nonce;
  StatsigHelper.init(apiKey, { nonce });
}