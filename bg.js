chrome.tabs.onActivated.addListener(info => {
    chrome.tabs.get(info.tabId, tab => {
        if (tab.status === 'complete' && tab.url.startsWith('https://live.bilibili.com/')) {
            chrome.tabs.sendMessage(info.tabId, null);
        }
    });
});