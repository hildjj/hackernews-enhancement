function handleMessage(request, sender, sendResponse) {
  browser.tabs.create({
    url: request,
    active: false
  })
  sendResponse('done');
}

browser.runtime.onMessage.addListener(handleMessage);