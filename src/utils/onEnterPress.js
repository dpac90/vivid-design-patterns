export default (callback, event) => {
    if (event.defaultPrevented) {
        return;
    }

    const { key, keyCode, keyIdentifier } = event;
    console.log(key);
    console.log(keyCode);
    console.log(keyIdentifier);

    if (key === 'ENTER') {
        callback();
    } else if (keyIdentifier === 13) {
        callback();
    } else if (keyCode === 13) {
        callback();
    }
};

// https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
