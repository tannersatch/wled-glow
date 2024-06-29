import { StyleSheet, View } from 'react-native';
import {
  Card,
  Divider,
  IconButton,
  List,
  Menu,
  Switch,
} from 'react-native-paper';
import { router } from 'expo-router';
import { ListItemRightLeftProps } from '@/types/rnp-custom-types';
import { Service } from 'react-native-zeroconf';
import { useAppState } from '@/contexts/AppStateProvider';
import useWled from '@/hooks/useWled';
import { useState } from 'react';
import { Swipeable } from 'react-native-gesture-handler';
import useGlowTheme from '@/hooks/useGlowTheme';

export type MyDeviceItemProps = {
  nested?: boolean;
  device: Service;
};

const MyDeviceItem = ({ nested, device }: MyDeviceItemProps) => {
  const { setState } = useAppState();
  const { wled, isReady, retry } = useWled(device.addresses[0]);
  const [visible, setVisible] = useState(false);
  const theme = useGlowTheme();

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

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

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
    menu: {
      borderRadius: 10,
    },
    swipeable: {
      overflow: 'visible',
    },
    actionWrapper: {
      flexDirection: 'row',
    },
    action: {
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },
  });

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      contentStyle={styles.menu}
      anchorPosition="bottom"
      anchor={
        <Swipeable
          containerStyle={styles.swipeable}
          renderRightActions={() => (
            <View style={styles.actionWrapper}>
              <View
                style={[
                  styles.action,
                  {
                    marginRight: 10,
                    backgroundColor: theme.colors.errorContainer,
                  },
                ]}
              >
                <IconButton
                  icon="trash-can"
                  onPress={removeFromMyDevices}
                  iconColor={theme.colors.onErrorContainer}
                />
              </View>
            </View>
          )}
          renderLeftActions={() => (
            <View style={styles.actionWrapper}>
              <View
                style={[
                  styles.action,
                  {
                    marginLeft: 10,
                    backgroundColor: theme.colors.successContainer,
                  },
                ]}
              >
                <IconButton
                  icon="refresh"
                  onPress={removeFromMyDevices}
                  iconColor={theme.colors.onSuccessContainer}
                />
              </View>
              <View
                style={[
                  styles.action,
                  {
                    marginLeft: 10,
                    backgroundColor: theme.colors.warningContainer,
                  },
                ]}
              >
                <IconButton
                  icon="restart"
                  onPress={removeFromMyDevices}
                  iconColor={theme.colors.onWarningContainer}
                />
              </View>
            </View>
          )}
        >
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
                  : retry()
              }
              onLongPress={openMenu}
              style={nested ? styles.nestedItem : {}}
            />
          </Card>
        </Swipeable>
      }
    >
      <Menu.Item
        title="Refresh"
        leadingIcon="refresh"
        onPress={() => wled?.init()}
      />
      <Menu.Item onPress={() => {}} title="Reboot" leadingIcon="restart" />
      <Menu.Item onPress={() => {}} title="Rename" leadingIcon="pencil" />
      <Divider />
      <Menu.Item
        title="Remove"
        leadingIcon="minus-circle"
        onPress={removeFromMyDevices}
      />
    </Menu>
  );
};

export default MyDeviceItem;
