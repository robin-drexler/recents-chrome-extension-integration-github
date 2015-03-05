(function () {

  const RECENTS_EXTENSION_ID = 'kikdapioncmdjjcjldidpcfohcibnmpc';
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

      // retrieve url and title from tab and send it to Recents extension
      chrome.tabs.get(details.tabId, function (tab) {
        chrome.runtime.sendMessage(RECENTS_EXTENSION_ID, {
          action: 'add',
          url: tab.url,
          title: tab.title
        }, function (response) {
          console.log('response from recents', response);
        });
      });
    }
  }, {
    urls: ['*://github.com/*/pull/*']
  });
})();
