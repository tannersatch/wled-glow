import { Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { useAppState } from '@/contexts/AppStateProvider';
import DeviceItem from './MyDeviceItem';

const MyDevices = () => {
  const { state } = useAppState();

  const styles = StyleSheet.create({
    text: {
      alignSelf: 'center',
    },
  });

  if (state.myDevices.length === 0) {
    return <Text style={styles.text}>You don't have any devices!</Text>;
  }
  return state.myDevices.map((device) => (
    <DeviceItem key={device.host} device={device} />
  ));
};

export default MyDevices;
