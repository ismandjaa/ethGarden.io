const path = require("path");

module.exports = {
    // See <http://truffleframework.com/docs/advanced/configuration>
    // to customize your Truffle configuration!
    contracts_build_directory: path.join(__dirname, "client/src/contracts"),
    networks: {
        develop: {
            host: "127.0.0.1",
            port: 7545,
            network_id: "*", // Match any network id
            from: "cfe2f9f0b78692170d554255d92642055370744238548fdd88e3d564eaa8603a"

        },
    }
};