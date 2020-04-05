import PDFView from 'react-native-pdf-view';
import React, {Component} from 'react';

import {StyleSheet, View} from 'react-native';

export default class PDF extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    <PDFView
      ref={pdf => {
        this.pdfView = pdf;
      }}
      src={'sdcard/pdffile.pdf'}
      onLoadComplete={pageCount => {
        this.pdfView.setNativeProps({
          zoom: 1.5,
        });
      }}
      style={styles.pdf}
    />;
  }
}
var styles = StyleSheet.create({
  pdf: {
    flex: 1,
  },
});
