chrome.webRequest.onBeforeRedirect.addListener(
  function (details) {
    console.log('request', details.redirectUrl);
  },
  {
    urls: ['*://github.com/*/pull/*']
  }
);