import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native';
import ParallaxScrollView from '@/components/layout/ParallaxScrollView';
import untypedLogo from '@/assets/images/logo-white.png';
import untypedBackground from '@/assets/images/background.png';
import { ActivityIndicator, Button, Text } from 'react-native-paper';
import AddDevice from '@/components/menus/AddDevice';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePathname } from 'expo-router';
import Zeroconf, { Service } from 'react-native-zeroconf';
import { useCallback, useEffect, useState } from 'react';
import MyDevices from '@/components/devices/MyDevices';
import FoundDevices from '@/components/devices/FoundDevices';
import WLED from '@/api/wled-json';
import { useAppState } from '@/contexts/AppStateProvider';

type ScanStateType = {
  isScanning: boolean;
  selectedService: any;
  services: Service[];
};

const logo = untypedLogo as ImageSourcePropType;
const background = untypedBackground as ImageSourcePropType;

export default function HomeScreen() {
  const zeroconf = new Zeroconf();
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const { state, setState } = useAppState();
  const [scanState, setScanState] = useState<ScanStateType>({
    isScanning: false,
    selectedService: null,
    services: [],
  });

  const refreshFoundDevices = useCallback(() => {
    if (scanState.isScanning) {
      return;
    }

    setScanState((prev) => ({ ...prev, services: [] }));
    zeroconf.scan('http', 'tcp', 'local.');
    setTimeout(() => {
      zeroconf.stop();
    }, 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scanState.isScanning]);

  useEffect(() => {
    refreshFoundDevices();
    zeroconf.on('start', () => {
      setScanState((prev) => ({ ...prev, isScanning: true }));
      console.log('[Start]');
    });

    zeroconf.on('stop', () => {
      setScanState((prev) => ({ ...prev, isScanning: false }));
      console.log('[Stop]');
    });

    zeroconf.on('resolved', async (service: Service) => {
      console.log('[Resolve]', JSON.stringify(service, null, 2));

      const wled = new WLED({ host: service.addresses[0] });
      await wled.init().catch((error) => {
        console.error('[Error]', error);
      });

      if (wled.isReady && wled.info) {
        service.fullName = wled?.info?.name ?? service.fullName;
        if (
          scanState.services.findIndex((s) => s.host === service.host) === -1
        ) {
          setScanState((prev) => ({
            ...prev,
            services: [...prev.services, service],
          }));
        }
      }
    });

    zeroconf.on('error', (err: any) => {
      setScanState((prev) => ({ ...prev, isScanning: false }));
      console.log('[Error]', err);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const styles = StyleSheet.create({
    title: {
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    headerBackground: {
      height: 178 + insets.top,
      width: '100%',
      resizeMode: 'cover',
    },
    headerImage: {
      height: 150,
      maxWidth: '80%',
      alignSelf: 'center',
      resizeMode: 'contain',
      position: 'absolute',
      bottom: 14,
    },
    scanningText: {
      width: '100%',
      textAlign: 'center',
    },
  });

  return (
    <ParallaxScrollView
      headerImage={
        <View>
          <Image
            source={background}
            // source={theme.dark ? logoWhite : logoBlack}
            style={styles.headerBackground}
          />
          <Image
            source={logo}
            // source={theme.dark ? logoWhite : logoBlack}
            style={styles.headerImage}
          />
        </View>
      }
    >
      {/* <Text style={styles.title}>GROUPS</Text>
      <GroupItem /> */}

      <Text style={styles.title}>MY DEVICES</Text>
      <MyDevices devices={state.myDevices} />

      <Text style={styles.title}>OTHER FOUND DEVICES</Text>
      <FoundDevices
        devices={scanState.services}
        isScanning={scanState.isScanning}
      />

      {scanState.isScanning ? (
        <>
          <Text style={styles.scanningText}>scanning for devices...</Text>
          <ActivityIndicator />
        </>
      ) : (
        <Button onPress={refreshFoundDevices} icon="refresh">
          Refresh
        </Button>
      )}

      {pathname === '/' || pathname === '/home' ? <AddDevice /> : null}
    </ParallaxScrollView>
  );
}
