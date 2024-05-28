import { Image, ImageSourcePropType, StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/layout/ParallaxScrollView';
import untypedHeader from '@/assets/images/header.webp';
import { router } from 'expo-router';
import { Card, List, Switch, Text } from 'react-native-paper';
import { Style } from 'react-native-paper/lib/typescript/components/List/utils';

const partialHeader = untypedHeader as ImageSourcePropType;

export default function HomeScreen() {
  const styles = StyleSheet.create({
    title: {
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    card: {
      marginHorizontal: 10,
    },
    headerImage: {
      height: 178,
      width: '100%',
      bottom: 0,
      left: 0,
      position: 'absolute',
      resizeMode: 'cover',
    },
  });

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

  return (
    <ParallaxScrollView
      headerImage={<Image source={partialHeader} style={styles.headerImage} />}
    >
      <Text style={styles.title}>DEVICES</Text>
      <Card style={styles.card}>
        <List.Item
          title="Satchwell Holiday Lights"
          description="192.168.4.212"
          left={powerSwitch}
          right={drillInIcon}
          onPress={() => router.navigate('tabs')}
        />
      </Card>
      <Card style={styles.card}>
        <List.Item
          title="Holiday Lights!!!"
          description="192.168.4.18"
          left={powerSwitch}
          right={drillInIcon}
          onPress={() => router.navigate('tabs')}
        />
      </Card>
      <Card style={styles.card}>
        <List.Item
          title="Cool Office Lighting"
          description="192.168.4.24"
          left={powerSwitch}
          right={drillInIcon}
          onPress={() => router.navigate('tabs')}
        />
      </Card>
    </ParallaxScrollView>
  );
}
