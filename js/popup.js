document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');
    const intervalInput = document.getElementById('interval');
    const toggle = document.getElementById('toggle');

    // Load switch toggle state from storage
    chrome.storage.local.get(['active', 'interval'], function (data) {
        toggle.checked = data.active;
        intervalInput.value = data.interval;
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const interval = intervalInput.value;
        if (interval > 0) {
            chrome.runtime.sendMessage({ command: "start", interval: interval });
            chrome.storage.local.set({ interval: interval });
        }
    });

    toggle.addEventListener('change', function () {
        if (toggle.checked) {
            console.log('Extension enabled');
            chrome.runtime.sendMessage({ command: "enable" });
            chrome.browserAction.setIcon({ path: "../img/icon.png" });
        } else {
            console.log('Extension disabled');
            chrome.runtime.sendMessage({ command: "disable" });
            chrome.browserAction.setIcon({ path: "../img/icon-disabled.png" });
        }
        // Save switch toggle state to storage
        chrome.storage.local.set({ active: toggle.checked });
    });
});
