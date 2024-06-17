import { Image, ImageSourcePropType, StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/layout/ParallaxScrollView';
import untypedLogo from '@/assets/images/logo.png';
import { router } from 'expo-router';
import { Card, List, Switch, Text } from 'react-native-paper';
import { Style } from 'react-native-paper/lib/typescript/components/List/utils';
import AddDevice from '@/components/menus/AddDevice';
import GroupItem from '@/components/groups/GroupItem';
import DeviceItem from '@/components/devices/DeviceItem';

const logo = untypedLogo as ImageSourcePropType;

export default function HomeScreen() {
  type ListItemRightLeftProps = { color: string; style?: Style | undefined };

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
    title: {
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    accordion: {
      marginHorizontal: 10,
      paddingVertical: 0,
    },
    card: {
      marginHorizontal: 10,
    },
    nestedCard: {
      marginLeft: 30,
    },
    nestedItem: {
      marginLeft: 0,
    },
    headerImage: {
      height: 178,
      width: '100%',
      bottom: 0,
      position: 'absolute',
      resizeMode: 'cover',
      // marginHorizontal: '5%',
    },
  });

  return (
    <ParallaxScrollView
      headerImage={
        <Image
          source={logo}
          // source={theme.dark ? logoWhite : logoBlack}
          style={styles.headerImage}
        />
      }
    >
      <Text style={styles.title}>GROUPS</Text>
      <GroupItem />
      <Text style={styles.title}>DEVICES</Text>
      <DeviceItem />

      <AddDevice />
    </ParallaxScrollView>
  );
}
