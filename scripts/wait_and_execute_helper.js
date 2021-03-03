waitAndExecute = (checkExitCondition, callback) => {
    setTimeout(() => {
        if (checkExitCondition() == true) {
            callback();
        } else {
            waitAndExecute(checkExitCondition, callback);
        }
    }, 200)
}