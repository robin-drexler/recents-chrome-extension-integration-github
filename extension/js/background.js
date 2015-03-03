(function () {
  var wasRedirected = false;

  chrome.webRequest.onBeforeRedirect.addListener(function (details) {
    // will be used in one of the next onCompleted listeners to extract the title
    // and send it to the recents extension
    wasRedirected = true;
  }, {
    urls: ['*://github.com/*/pull/*']
  });

  chrome.webRequest.onCompleted.addListener(function (details) {
    if (wasRedirected) {
      console.log('was redirected', details.tabId);

      // unset so consecutive calls don't send the request to recents again
      wasRedirected = false;
    }
  }, {
    urls: ['*://github.com/*/pull/*']
  });
})();
