
module.exports = {
  contracts_build_directory: './client/src/artifacts',
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 7545,            // Standard Ethereum port (default: none)
      network_id: "*", 
      gas: 6721975,
      gasPrice: 20000000000
    },
  },
  mocha: {
  },
  bsc: {
    provider: () => {
      return new HDWalletProvider(mnemonic, "https://bsc-dataseed2.binance.org")
    },

    network_id: 56,
    skipDryRun: true,
    gasPrice: 10 * 1e9,
    timeoutBlocks: 1,
    confirmations: 0,
  },
  compilers: {
    solc: {
    }
  },

  db: {
    enabled: false
  }
};
