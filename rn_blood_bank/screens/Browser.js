import React, {Component} from 'react';
import {WebView} from 'react-native-webview';
import {BackHandler} from 'react-native';
import {ActivityIndicator, StyleSheet} from 'react-native';
class Browser extends Component {
  LoadingIndicatorView() {
    return (
      <ActivityIndicator
        color="#009b88"
        size="large"
        style={styles.ActivityIndicatorStyle}
      />
    );
  }
  webView = {
    canGoBack: false,
    ref: null,
  };

  onAndroidBackPress = () => {
    if (this.webView.canGoBack && this.webView.ref) {
      this.webView.ref.goBack();
      return true;
    }
    return false;
  };

  componentWillMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener(
        'hardwareBackPress',
        this.onAndroidBackPress,
      );
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress');
    }
  }
  render() {
    const {params} = this.props.navigation.state;
    return (
      <WebView
        source={{uri: params.link}}
        renderLoading={this.LoadingIndicatorView}
        startInLoadingState={true}
        ref={webView => {
          this.webView.ref = webView;
        }}
        onNavigationStateChange={navState => {
          this.webView.canGoBack = navState.canGoBack;
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  ActivityIndicatorStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Browser;
