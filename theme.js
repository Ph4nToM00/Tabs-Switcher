window.onload = function() {
    let sun = document.getElementById('sun');
    let moon = document.getElementById('moon');
    let link = document.querySelector('.github');
    let heart = document.getElementById('heart');
    let root = document.documentElement;

    // Load saved background color
    chrome.storage.local.get('backgroundColor', function(data) {
        if (data.backgroundColor) {
            document.body.style.backgroundColor = data.backgroundColor;
            if (data.backgroundColor === 'white') {
                sun.style.display = 'none';
                moon.style.display = 'block';
                document.body.style.color = 'black';
                link.style.color = 'black';
                heart.style.color = 'red';
                root.style.setProperty('--border-color', 'black');
            } else {
                moon.style.display = 'none';
                sun.style.display = 'block';
                document.body.style.color = 'white';
                link.style.color = 'white';
                heart.style.color = 'white';
                root.style.setProperty('--border-color', 'white');
            }
        }
    });

    sun.addEventListener('click', function() {
        document.body.style.backgroundColor = 'white';
        document.body.style.color = 'black';
        chrome.storage.local.set({ backgroundColor: 'white' });
        sun.style.display = 'none';
        moon.style.display = 'block';
        link.style.color = 'black';
        heart.style.color = 'red';
        root.style.setProperty('--border-color', 'black');
    });
    
    moon.addEventListener('click', function() {
        document.body.style.backgroundColor = 'midnightblue';
        document.body.style.color = 'white';
        chrome.storage.local.set({ backgroundColor: 'midnightblue' });
        moon.style.display = 'none';
        sun.style.display = 'block';
        link.style.color = 'white';
        heart.style.color = 'white';
        root.style.setProperty('--border-color', 'white');
    });
}
