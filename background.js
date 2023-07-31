let switchIntervalId = null;
let switchEnabled = false; // Variable to store the state of the extension.

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log('Received message', request);
    switch (request.command) {
        case 'start':
            if (switchEnabled) {
                if (switchIntervalId !== null) {
                    clearInterval(switchIntervalId);
                }
                switchIntervalId = setInterval(switchTab, request.interval * 1000);
            }
            break;
        case 'enable':
            switchEnabled = true;
            chrome.storage.local.get('interval', function (data) {
                if (data.interval) {
                    if (switchIntervalId !== null) {
                        clearInterval(switchIntervalId);
                    }
                    switchIntervalId = setInterval(switchTab, data.interval * 1000);
                }
            });
            break;
        case 'disable':
            switchEnabled = false;
            if (switchIntervalId !== null) {
                clearInterval(switchIntervalId);
                switchIntervalId = null;
            }
            break;
    }
});

function switchTab() {
    chrome.tabs.query({ currentWindow: true }, function(tabs) {
        if (tabs.length <= 1) {
            return;
        }

        chrome.tabs.query({ currentWindow: true, active: true }, function(activeTabs) {
            let activeTab = activeTabs[0];
            let nextIndex = (activeTab.index + 1) % tabs.length;
            
            chrome.tabs.query({ currentWindow: true, index: nextIndex }, function(nextTabs) {
                chrome.tabs.update(nextTabs[0].id, { active: true });
            });
        });
    });
}



chrome.storage.local.get(['active', 'interval'], function (data) {
    switchEnabled = data.active;
    if (switchEnabled) {
        if (data.interval) {
            switchIntervalId = setInterval(switchTab, data.interval * 1000);
        }
    }
});
