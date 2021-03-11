isOpenedInFullscreen = () => document.body.style.display == 'none';

isTasksWidgetLoaded = () => {
    // TODO: find more robust way
    let titleDiv = document.querySelectorAll("h2")[0].parentElement.parentElement;

    let hasTitle = document.querySelectorAll("h2").length != 0;
    let hasCloseButton = !!titleDiv.parentElement.querySelectorAll("[role='button']")[1];

    return hasTitle && hasCloseButton;
}

applyFullscreenButton = () => {
    let titleDiv = document.querySelectorAll("h2")[0].parentElement.parentElement;

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

    // TODO: fix, doesn't work now, jscontroller and jsAction should be invalidated
    newButton.setAttribute("data-tooltip", "Fullscreen");
    newButton.setAttribute("aria-label", "Fullscreen");

    // TODO: find more gentle way to prevent it from calling the same events as initial button did
    newButton.removeAttribute("jscontroller");
    newButton.removeAttribute("jsAction");
}
