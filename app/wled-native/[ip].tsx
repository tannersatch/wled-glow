import Header from '@/components/navigation/Header';
import { StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';
import { useLocalSearchParams } from 'expo-router';
import WLED from '@/api/wled-json';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import GlowBackground from '@/components/layout/GlowBackground';
import { useEffect, useState } from 'react';

const Loading = () => {
  const styles = StyleSheet.create({
    view: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <GlowBackground>
      <Header title="Loading..." />
      <View style={styles.view}>
        <ActivityIndicator size="large" />
      </View>
    </GlowBackground>
  );
};

export default function WledNative() {
  const theme = useTheme();
  const { ip } = useLocalSearchParams<{ ip: string }>();
  const cleanIp = ip?.replaceAll('"', '');
  const [wled, setWled] = useState<WLED | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isWebViewLoading, setIsWebViewLoading] = useState(true);

  useEffect(() => {
    const initWled = async () => {
      if (cleanIp) {
        const wledInstance = new WLED({ host: cleanIp });
        await wledInstance.init();
        setWled(wledInstance);
        setIsReady(wledInstance.isReady);
      }
    };
    initWled();
  }, [cleanIp]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      justifyContent: 'center',
    },
    webview: {
      flex: isWebViewLoading ? 0 : 1,
    },
  });

  return isReady && wled?.info ? (
    <GlowBackground>
      <Header title={wled.info?.name ?? ''} />
      <View style={styles.container}>
        {isWebViewLoading ? (
          <View style={[styles.container]}>
            <ActivityIndicator />
          </View>
        ) : null}
        <WebView
          style={styles.webview}
          source={{ uri: `http://${cleanIp}` }}
          onLoadStart={() => setIsWebViewLoading(true)}
          onLoadEnd={() => setIsWebViewLoading(false)}
        />
      </View>
    </GlowBackground>
  ) : (
    <Loading />
  );
}
