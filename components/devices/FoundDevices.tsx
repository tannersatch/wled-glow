import { Service } from 'react-native-zeroconf';
import { useAppState } from '@/contexts/AppStateProvider';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import FoundDeviceItem from './FoundDeviceItem';

export type FoundDevicesProps = {
  devices: Service[];
  isScanning?: boolean;
};

const FoundDevices = ({ devices, isScanning = false }: FoundDevicesProps) => {
  const { state } = useAppState();

  const foundDevices = devices.filter(
    (device) => state.myDevices.findIndex((i) => i.host === device.host) < 0,
  );

  const styles = StyleSheet.create({
    text: {
      alignSelf: 'center',
    },
  });

  if (foundDevices.length === 0 && !isScanning) {
    return <Text style={styles.text}>No devices found!</Text>;
  }

  return foundDevices.map((device) => (
    <FoundDeviceItem key={device.host} device={device} />
  ));
};

export default FoundDevices;
