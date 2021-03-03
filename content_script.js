isTasksWidgetLoaded = () => {
    let titleDiv = document.querySelectorAll("h2")[0].parentElement;

    let hasTitle = document.querySelectorAll("h2").length != 0;
    let hasCloseButton = !!titleDiv.parentElement.querySelectorAll("[role='button']")[1];

    return hasTitle && hasCloseButton;
}

waitAndExecute = (checkExitCondition, callback) => {
    setTimeout(() => {
        if (checkExitCondition() == true) {
            callback();
        } else {
            waitAndExecute(checkExitCondition, callback);
        }
    }, 200)
}

applyFullscreenButton = () => {
    let titleDiv = document.querySelectorAll("h2")[0].parentElement;

    let closeButton = titleDiv.parentElement.querySelectorAll("[role='button']")[1];
    let newButton = closeButton.cloneNode(true);

    titleDiv.parentElement.insertBefore(newButton, closeButton);

    newButton.onclick = function () {
        chrome.runtime.sendMessage({
            type: "OPEN_FULLSCREEN",
            url: document.location.href,
        });
    }

    newButton.querySelectorAll("[aria-hidden='true']")[0].innerText = 'open_in_new';

    newButton.setAttribute("data-tooltip", "Fullscreen");
    newButton.setAttribute("aria-label", "Fullscreen");

    newButton.removeAttribute("jscontroller");
    newButton.removeAttribute("jsAction");
}

setTimeout(async ()  => {
    let isOpenedInFullscreen = document.body.style.display == 'none';

    if (isOpenedInFullscreen) {
        document.body.style.display = '';
    } else {
        waitAndExecute(isTasksWidgetLoaded, applyFullscreenButton)
    }
});

