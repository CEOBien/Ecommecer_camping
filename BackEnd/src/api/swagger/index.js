"use strict"

var path = require("path")
var http = require("http")

var oas3Tools = require("oas3-tools")
var serverPort = 6345

// swaggerRouter configuration
var options = {
  routing: {
    controllers: path.join(__dirname, "./controllers"),
  },
}

var expressAppConfig = oas3Tools.expressAppConfig(
  path.join(__dirname, "api/openapi.yaml"),
  options
)
var app = expressAppConfig.getApp()

// Initialize the Swagger middleware
http.createServer(app).listen(serverPort, function () {
  console.log(
    "Your server is listening on port %d (http://um.novasquare.vn:%d)",
    serverPort,
    serverPort
  )
  console.log(
    "Swagger-ui is available on http://um.novasquare.vn:%d/docs",
    serverPort
  )
})
