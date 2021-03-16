const { addLessLoader, override } = require('customize-cra');
const webpack = require("webpack");

// var config = {};
module.exports =
  override(
    addLessLoader({
      javascriptEnabled: true,
      modifyVars: {
        '@primary-color': '#f48549', // customize as needed
        '@link-color': '#e6a07c', // customize as needed
        '@font-size-base': '18px' // customize as needed
      }
    })
  )