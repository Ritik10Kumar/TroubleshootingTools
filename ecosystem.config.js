module.exports = {
  apps : [{
              name: "newbackend",
              script: "./index.js",
              env: {
                            NODE_ENV: "development",
                          },
              env_production: {
                            NODE_ENV: "production",
                            port: 8181
                          }
            },
                     ]
}
