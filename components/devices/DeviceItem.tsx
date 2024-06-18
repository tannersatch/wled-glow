import { StyleSheet } from 'react-native';
import { Card, List, Switch } from 'react-native-paper';
import { router } from 'expo-router';
import { ListItemRightLeftProps } from '@/types/rnp-custom-types';

export type DeviceItemProps = {
  nested?: boolean;
};

const DeviceItem = ({ nested }: DeviceItemProps) => {
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
        title="Satchwell Holiday Lights"
        description="192.168.4.212"
        left={powerSwitch}
        right={drillInIcon}
        onPress={() => router.navigate('wled-native')}
        // onPress={() => router.navigate('tabs')}
        style={nested ? styles.nestedItem : {}}
      />
    </Card>
  );
};

export default DeviceItem;
