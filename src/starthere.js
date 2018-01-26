window.startHere = window.startHere || {};
window.startHere.onLine = true;

function checkNetwork(callback) {
    var xhr = new XMLHttpRequest();
    // todo: replace this file with the real file in the measurements live server
    var url = '/resources/checkNetwork.txt';
    // We don't need to fetch the content
    xhr.open('HEAD', url);
    // In IE, the timeout property may be set only after calling open method and before calling the send method
    xhr.timeout = 3000;

    xhr.ontimeout = function(e) {
        xhr.abort();
        if (!window.startHere.onLine) {
            window.startHere.onLine = false;
        }
        callback();
    }

    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) {
            return;
        }

        if (xhr.status === 200) {
            if (!window.startHere.onLine) {
                window.startHere.onLine = true;
            }
        } else if (xhr.status === 0 && window.startHere.onLine) {
            window.startHere.onLine = false;
        } else if (xhr.status !== 0 && !window.startHere.onLine) {
            window.startHere.onLine = true;
        }

        callback();
    };
    xhr.send();
}

checkNetwork(function () {
    setTimeout(function() {
        if (window.startHere.onLine) {
            // open online gettingstarted.html
            window.location = 'http://127.0.0.1:8081/src/gettingstarted.html';
        } else {
            // open offline gettingstarted.html
            window.location = 'gettingstarted.html'
        }
    }, 2000);
});


