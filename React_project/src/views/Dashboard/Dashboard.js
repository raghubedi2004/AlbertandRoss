import React, {Component} from 'react';
import Iframe from 'react-iframe';
var __html = require('./TELUS.html');
var template = { __html: __html };

class Test extends Component {

    componentDidMount() {
      var ifrm = document.getElementById('buyIframe');
      ifrm = ifrm.contentWindow || ifrm.contentDocument.document || ifrm.contentDocument;
      ifrm.document.open();
      ifrm.document.write(__html);
      ifrm.document.close();
    }
	  render() {

    return (
      <div>
      <iframe id="buyIframe" src="./TELUS.html" styles={{width: "100%"}}></iframe>
      </div>

    );
  }
}

export default Test;
