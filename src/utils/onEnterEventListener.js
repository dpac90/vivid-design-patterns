export default (e, callback) => {
    const noop = () => {};

    console.info(e);

    return e && e.keyCode === 13 ? callback : noop;
};
