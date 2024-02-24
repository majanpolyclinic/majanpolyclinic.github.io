var majanWebsite = window.majanWebsite || {};
majanWebsite.mainBodyInstance = null;

const bc = new BroadcastChannel('majan-website-channel');
bc.onmessage = function (message) {
    if (message && message.data == "new-version-found") {
        notifyAppUpdateToUser();
    } else if (message && message.data == "reload-page") {
        setTimeout(function () {
            //location.reload();
            window.location.href = window.location.href;
        }, 500);
    }
}

function notifyAppUpdateToUser() {
    setTimeout(function () {
        if (majanWebsite.mainBodyInstance) {
            majanWebsite.mainBodyInstance.invokeMethodAsync('ShowUpdateVersion').then(function () { }, function (er) {
                setTimeout(notifyAppUpdateToUser, 5000);
            });
        }
    }, 2000);
}
majanWebsite.onUserUpdate = function () {
    setTimeout(function () {
        bc.postMessage("skip-waiting");
    }, 300);
}

var mainBodyInstance;
function setRef(ref) {
    majanWebsite.mainBodyInstance = ref;
}