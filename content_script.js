setTimeout(()  => {
    if (isOpenedInFullscreen()) {
        document.body.style.display = '';
    } else {
        waitAndExecute(isTasksWidgetLoaded, applyFullscreenButton)
    }
});

