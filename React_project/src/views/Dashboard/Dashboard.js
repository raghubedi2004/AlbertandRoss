import React, {Component} from 'react';
var __html = require('./TELUS.html');
var template = { __html: __html };

class Test extends Component {

	  render() {

    return (
      <div dangerouslySetInnerHTML={template} />

    );
  }
}

export default Test;
