export default (e, callback) => {
    const noop = () => {};

    return e && e.keyCode === 13 ? callback : noop;
};
