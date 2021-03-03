chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.type == "OPEN_FULLSCREEN") {
            chrome.tabs.create({url: request.url});
        }
    }
);
