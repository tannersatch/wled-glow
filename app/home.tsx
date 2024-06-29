import { Image, ImageSourcePropType, StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/layout/ParallaxScrollView';
import untypedLogo from '@/assets/images/logo-white.png';
import { Text } from 'react-native-paper';
import AddDevice from '@/components/menus/AddDevice';
import { usePathname } from 'expo-router';
import MyDevices from '@/components/devices/MyDevices';
import GlowBackground from '@/components/layout/GlowBackground';

const logo = untypedLogo as ImageSourcePropType;

export default function HomeScreen() {
  const pathname = usePathname();

  const styles = StyleSheet.create({
    title: {
      paddingHorizontal: 20,
      paddingTop: 20,
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
        <GlowBackground>
          <Image source={logo} style={styles.headerImage} />
        </GlowBackground>
      }
    >
      <Text style={styles.title}>MY DEVICES</Text>
      <MyDevices />

      {pathname === '/' || pathname === '/home' ? <AddDevice /> : null}
    </ParallaxScrollView>
  );
}
