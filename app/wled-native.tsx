import Header from '@/components/navigation/Header';
import { ImageBackground, StyleSheet, ImageSourcePropType } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import untypedBackground from '@/assets/images/background.png';

export default function ColorsScreen() {
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
      />
    </ImageBackground>
  );
}
