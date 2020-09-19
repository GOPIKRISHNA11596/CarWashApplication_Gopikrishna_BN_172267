module.exports = {
    apps : [{
        name       : "server",
        script     : "./server.js",
        instances  : 0,
        exec_mode  : "cluster",
        watch       : true,
        error_file : "./log/err.log",
        out_file : "./log/out.log",
      env: {
        "NODE_ENV": "development",
        "PORT": 3000,
      },
      env_production : {
         "NODE_ENV": "production",
         "PORT": 80
      }
    },{
        name       : "worker-app",
        script     : "./server.js",
        instances  : 0,
        exec_mode  : "cluster",
        watch       : true,
      env: {
        "NODE_ENV": "development",
        "PORT": 3000,
      },
      env_production : {
         "NODE_ENV": "production",
         "PORT": 80
      }
    }]
  }