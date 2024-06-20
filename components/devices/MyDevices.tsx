import { Service } from 'react-native-zeroconf';
import { Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import DeviceItem from './MyDeviceItem';

export type MyDevicesProps = {
  devices: Service[];
};

const MyDevices = ({ devices }: MyDevicesProps) => {
  const styles = StyleSheet.create({
    text: {
      alignSelf: 'center',
    },
  });

  if (devices.length === 0) {
    return (
      <Text style={styles.text}>
        You don't have any devices! Add them below.
      </Text>
    );
  }
  return devices.map((device) => (
    <DeviceItem key={device.host} device={device} />
  ));
};

export default MyDevices;
