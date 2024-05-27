import { Image, ImageSourcePropType, StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import untypedHeader from '@/assets/images/header.webp';
import { router } from 'expo-router';
import { List, useTheme } from 'react-native-paper';
import { Style } from 'react-native-paper/lib/typescript/components/List/utils';

const partialHeader = untypedHeader as ImageSourcePropType;

export default function HomeScreen() {
  const theme = useTheme();

  const styles = StyleSheet.create({
    titleContainer: {
      backgroundColor: theme.colors.background,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    stepContainer: {
      gap: 8,
      marginBottom: 8,
    },
    reactLogo: {
      height: 178,
      width: '100%',
      bottom: 0,
      left: 0,
      position: 'absolute',
      resizeMode: 'cover',
    },
  });

  type ListItemRightLeftProps = { color: string; style?: Style | undefined };

  const lightOnIcon = (props: ListItemRightLeftProps) => (
    <List.Icon {...props} icon="lightbulb-on" />
  );

  const lightOffIcon = (props: ListItemRightLeftProps) => (
    <List.Icon {...props} icon="lightbulb-off" />
  );

  return (
    <ParallaxScrollView
      headerImage={<Image source={partialHeader} style={styles.reactLogo} />}
    >
      <List.Item
        title="Satchwell Holiday Lights"
        description="192.168.4.212"
        right={lightOnIcon}
        onPress={() => router.navigate('tabs')}
      />
      <List.Item
        title="Holiday Lights!!!"
        description="192.168.4.18"
        right={lightOnIcon}
        onPress={() => router.navigate('tabs')}
      />
      <List.Item
        title="Cool Office Lighting"
        description="192.168.4.24"
        right={lightOnIcon}
        onPress={() => router.navigate('tabs')}
      />
    </ParallaxScrollView>
  );
}
