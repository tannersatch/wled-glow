import { StyleSheet } from 'react-native';
import { Card, List, Switch } from 'react-native-paper';
import { router } from 'expo-router';
import { ListItemRightLeftProps } from '@/types/rnp-custom-types';
import { Service } from 'react-native-zeroconf';
import { useAppState } from '@/contexts/AppStateProvider';
import useWled from '@/hooks/useWled';

export type MyDeviceItemProps = {
  nested?: boolean;
  device: Service;
};

const MyDeviceItem = ({ nested, device }: MyDeviceItemProps) => {
  const { setState } = useAppState();
  const { wled, isReady } = useWled(device.addresses[0]);

  const disconnectedIcon = (props: ListItemRightLeftProps) => (
    <List.Icon {...props} icon="cloud-off-outline" />
  );

  const powerSwitch = () => (
    <Switch
      value
      onValueChange={() => {}}
      style={{ marginLeft: 10, alignSelf: 'center' }}
    />
  );

  const drillInIcon = (props: ListItemRightLeftProps) => (
    <List.Icon {...props} icon="chevron-right" />
  );

  const refreshIcon = (props: ListItemRightLeftProps) => (
    <List.Icon {...props} icon="refresh" />
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
        left={wled && isReady ? powerSwitch : disconnectedIcon}
        right={wled && isReady ? drillInIcon : refreshIcon}
        onPress={() =>
          wled && isReady
            ? router.navigate(
                `wled-native/${JSON.stringify(device.addresses[0])}`,
              )
            : wled?.init()
        }
        // onPress={() =>
        //   router.navigate({ pathname: 'wled-native', params: device })
        // }
        // onPress={() => router.navigate('tabs')}
        onLongPress={removeFromMyDevices}
        style={nested ? styles.nestedItem : {}}
      />
    </Card>
  );
};

export default MyDeviceItem;
