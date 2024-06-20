import Header from '@/components/navigation/Header';
import { ImageBackground, StyleSheet, ImageSourcePropType } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import untypedBackground from '@/assets/images/background.png';
// import { useTheme } from 'react-native-paper';

export default function ColorsScreen() {
  // const theme = useTheme();
  const insets = useSafeAreaInsets();

  const background = untypedBackground as ImageSourcePropType;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingBottom: insets.bottom,
    },
    webview: {
      flex: 1,
    },
  });

  return (
    <ImageBackground source={background} style={styles.container}>
      <Header title="Satchwell Holiday Lights" />
      <WebView
        style={styles.webview}
        source={{ uri: 'http://192.168.4.212' }}
        // injectedJavaScript={`
        //   document.body.style.backgroundColor = '${theme.colors.background}';
        //   true; // note: this is required, or you'll sometimes get silent failures
        // `}
        // onMessage={() => null}
      />
    </ImageBackground>
  );
}
