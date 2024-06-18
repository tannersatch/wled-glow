import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native';
import ParallaxScrollView from '@/components/layout/ParallaxScrollView';
import untypedLogo from '@/assets/images/logo-white.png';
import untypedBackground from '@/assets/images/background.png';
import { Text } from 'react-native-paper';
import AddDevice from '@/components/menus/AddDevice';
// import GroupItem from '@/components/groups/GroupItem';
import DeviceItem from '@/components/devices/DeviceItem';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePathname } from 'expo-router';

const logo = untypedLogo as ImageSourcePropType;
const background = untypedBackground as ImageSourcePropType;

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();

  const styles = StyleSheet.create({
    title: {
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    headerBackground: {
      height: 178 + insets.top,
      width: '100%',
      resizeMode: 'cover',
    },
    headerImage: {
      height: 150,
      maxWidth: '80%',
      alignSelf: 'center',
      resizeMode: 'contain',
      position: 'absolute',
      bottom: 14,
    },
  });

  return (
    <ParallaxScrollView
      headerImage={
        <View>
          <Image
            source={background}
            // source={theme.dark ? logoWhite : logoBlack}
            style={styles.headerBackground}
          />
          <Image
            source={logo}
            // source={theme.dark ? logoWhite : logoBlack}
            style={styles.headerImage}
          />
        </View>
      }
    >
      {/* <Text style={styles.title}>GROUPS</Text>
      <GroupItem /> */}
      <Text style={styles.title}>DEVICES</Text>

      <DeviceItem />

      {pathname === '/' || pathname === '/home' ? <AddDevice /> : null}
    </ParallaxScrollView>
  );
}
