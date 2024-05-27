import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import untypedLogo from '@/assets/images/partial-react-logo.png';
import { Text, useTheme } from 'react-native-paper';
import ContentContainer from '@/components/ContentContainer';
import QuickMenu from '@/components/QuickMenu';

const partialLogo = untypedLogo as ImageSourcePropType;

export default function ColorsScreen() {
  const theme = useTheme();

  return (
    <ContentContainer>
      <QuickMenu />
      <Text>Colors!</Text>
    </ContentContainer>
  );
}
