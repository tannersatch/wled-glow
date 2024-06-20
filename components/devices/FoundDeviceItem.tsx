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
  const { setState } = useAppState();

  const addIcon = (props: ListItemRightLeftProps) => (
    <List.Icon {...props} icon="plus" />
  );

  const addToMyDevices = () => {
    setState((prevState) => ({
      ...prevState,
      myDevices: [...prevState.myDevices, device],
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
        right={addIcon}
        onPress={addToMyDevices}
        style={nested ? styles.nestedItem : {}}
      />
    </Card>
  );
};

export default FoundDeviceItem;
