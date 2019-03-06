const exposureMediator = (function () {
    const subscribers = {};
    return {
        on: function (event, callback) {
            subscribers[event] = subscribers[event] || new Set();
            subscribers[event].add(callback);
        },

        off: function (event, callback) {
            if (subscribers[event]) {
                subscribers[event].delete(callback);
            } else {
                throw Error(`Reference Error: event "${event}" hasn't exist`);
            }
        },

        emit: function (event, ...rest) {
            if (subscribers[event]) {
                subscribers[event].forEach((callback) => {
                    callback(...rest);
                });
            } else {
                throw Error(`Reference Error: event "${event}" hasn't exist`);
            }
        }
    };
})();

export {exposureMediator};