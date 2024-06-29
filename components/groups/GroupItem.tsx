/* eslint-disable react/jsx-no-useless-fragment */
import { List, Switch } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import DeviceItem from '../devices/MyDeviceItem';

const GroupItem = () => {
  const powerSwitch = () => (
    <Switch
      value
      onValueChange={() => {}}
      style={{ marginLeft: 10, alignSelf: 'center' }}
    />
  );

  const styles = StyleSheet.create({
    accordion: {
      marginHorizontal: 10,
      paddingVertical: 0,
    },
  });

  return (
    <List.Accordion
      title="AF Home"
      description="1 device"
      left={powerSwitch}
      style={styles.accordion}
    >
      <>
        <DeviceItem nested />
      </>
    </List.Accordion>
  );
};

export default GroupItem;
