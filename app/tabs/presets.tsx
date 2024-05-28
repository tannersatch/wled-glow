import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native';
import ParallaxScrollView from '@/components/layout/ParallaxScrollView';
import untypedLogo from '@/assets/images/partial-react-logo.png';
import { Text } from 'react-native-paper';

const partialLogo = untypedLogo as ImageSourcePropType;

export default function PresetsScreen() {
  return (
    <ParallaxScrollView
      headerImage={<Image source={partialLogo} style={styles.reactLogo} />}
    >
      <View style={styles.titleContainer}>
        <Text>Presets!</Text>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
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
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
