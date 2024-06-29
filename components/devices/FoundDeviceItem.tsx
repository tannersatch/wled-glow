import { StyleSheet } from 'react-native';
import { Card, List } from 'react-native-paper';
import { ListItemRightLeftProps } from '@/types/rnp-custom-types';
import { Service } from 'react-native-zeroconf';
import { useAppState } from '@/contexts/AppStateProvider';

export type FoundDeviceItemProps = {
  nested?: boolean;
  device: Service;
};

const FoundDeviceItem = ({ nested, device }: FoundDeviceItemProps) => {
  const { state, setState } = useAppState();
  const isAdded =
    state.myDevices.findIndex((d) => d.host === device.host) !== -1;

  const addIcon = (props: ListItemRightLeftProps) => (
    <List.Icon {...props} icon="plus" />
  );

  const removeIcon = (props: ListItemRightLeftProps) => (
    <List.Icon {...props} icon="check" color="limegreen" />
  );

  const addToMyDevices = () => {
    setState((prevState) => ({
      ...prevState,
      myDevices: [...prevState.myDevices, device],
    }));
  };

  const removeFromMyDevices = () => {
    setState((prevState) => ({
      ...prevState,
      myDevices: prevState.myDevices.filter((d) => d.host !== device.host),
    }));
  };

  const styles = StyleSheet.create({
    card: {
      marginHorizontal: 0,
      marginBottom: 10,
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
        description={
          isAdded ? 'Already added! Tap to remove' : device.addresses[0]
        }
        right={isAdded ? removeIcon : addIcon}
        onPress={isAdded ? removeFromMyDevices : addToMyDevices}
        style={nested ? styles.nestedItem : {}}
      />
    </Card>
  );
};

export default FoundDeviceItem;
