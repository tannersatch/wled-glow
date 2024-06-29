import Zeroconf, { Service } from 'react-native-zeroconf';
import { StyleSheet } from 'react-native';
import { ActivityIndicator, Button, Text } from 'react-native-paper';
import { useCallback, useEffect, useState } from 'react';
import WLED from '@/api/wled-json';
import FoundDeviceItem from './FoundDeviceItem';

type ScanStateType = {
  isScanning: boolean;
  selectedService: any;
  services: Service[];
};

const FoundDevices = () => {
  const zeroconf = new Zeroconf();
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
    });

    zeroconf.on('stop', () => {
      setScanState((prev) => ({ ...prev, isScanning: false }));
    });

    zeroconf.on('resolved', async (service: Service) => {
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

    zeroconf.on('error', () => {
      setScanState((prev) => ({ ...prev, isScanning: false }));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const styles = StyleSheet.create({
    text: {
      alignSelf: 'center',
    },
    scanningText: {
      width: '100%',
      textAlign: 'center',
    },
  });

  return scanState.isScanning ? (
    <>
      <Text style={styles.scanningText}>Scanning for devices...</Text>
      <ActivityIndicator />
    </>
  ) : (
    <>
      {scanState.services.length === 0 ? (
        <Text style={styles.text}>No devices found!</Text>
      ) : null}
      {scanState.services.map((device) => (
        <FoundDeviceItem key={device.host} device={device} />
      ))}
      <Button onPress={refreshFoundDevices} icon="refresh">
        Refresh
      </Button>
    </>
  );
};

export default FoundDevices;
