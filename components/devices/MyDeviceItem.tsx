import { StyleSheet } from 'react-native';
import { Card, List, Switch } from 'react-native-paper';
import { router } from 'expo-router';
import { ListItemRightLeftProps } from '@/types/rnp-custom-types';
import { Service } from 'react-native-zeroconf';
import { useAppState } from '@/contexts/AppStateProvider';

export type MyDeviceItemProps = {
  nested?: boolean;
  device: Service;
};

const MyDeviceItem = ({ nested, device }: MyDeviceItemProps) => {
  const { setState } = useAppState();
  const drillInIcon = (props: ListItemRightLeftProps) => (
    <List.Icon {...props} icon="chevron-right" />
  );

  const powerSwitch = () => (
    <Switch
      value
      onValueChange={() => {}}
      style={{ marginLeft: 10, alignSelf: 'center' }}
    />
  );

  const removeFromMyDevices = () => {
    setState((prevState) => ({
      ...prevState,
      myDevices: prevState.myDevices.filter((d) => d.host !== device.host),
    }));
  };

  const styles = StyleSheet.create({
    card: {
      marginHorizontal: 10,
    },
    nestedCard: {
      marginLeft: 30,
    },
    nestedItem: {
      marginLeft: 0,
    },
  });

  return (
    <Card style={[styles.card, nested ? styles.nestedCard : {}]}>
      <List.Item
        title={device.fullName}
        description={device.addresses[0]}
        left={powerSwitch}
        right={drillInIcon}
        onPress={() => router.navigate('wled-native')}
        // onPress={() => router.navigate('tabs')}
        onLongPress={removeFromMyDevices}
        style={nested ? styles.nestedItem : {}}
      />
    </Card>
  );
};

export default MyDeviceItem;
