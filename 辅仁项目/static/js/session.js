const session = {
    get: function(key) {
        return JSON.parse(sessionStorage.getItem(key));
    },
    set: function(key, value) {
        sessionStorage.setItem(key, JSON.stringify(value));
    },
    remove: function(key) {
        sessionStorage.removeItem(key);
    }
};

export default session;
