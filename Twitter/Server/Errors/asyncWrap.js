function asyncWrap(fn) {
    return function (req, res, next) {
        const result = fn(req, res, next);
        if (result instanceof Promise) {
            result.catch((err) => next(err));
          }
    }
}

module.exports = {
    asyncWrap,
}