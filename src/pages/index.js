/**
 * @jsx React.DOM
 */
var React = require('React');
var Application = require('../components/core/Application');

var index = React.createClass({
  render: function() {
    return (
      <html>
        <head>
          <title>MFFM</title>
          <link rel="stylesheet/less" type="text/css" href="./css/styles.less" />
          <script src="./js/less.js"></script>
          <link href="//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css" rel="stylesheet"/>
        </head>
        <body id="app">
        </body>
      </html>
    );
  }
});

module.exports = index;
