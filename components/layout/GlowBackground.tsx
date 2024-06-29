import {
  ImageBackground,
  StyleSheet,
  ImageSourcePropType,
  ImageBackgroundProps,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import untypedBackground from '@/assets/images/background.png';

export default function GlowBackground({ children }: ImageBackgroundProps) {
  const insets = useSafeAreaInsets();

  const background = untypedBackground as ImageSourcePropType;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingBottom: insets.bottom,
    },
  });

  return (
    <ImageBackground source={background} style={styles.container}>
      {children}
    </ImageBackground>
  );
}
