const handlers = Object.fromEntries([
    ["READY", require("./READY")],
    ["MESSAGE_CREATE", require("./MESSAGE_CREATE")]
])


module.exports = handlers;
