import { Text } from 'react-native-paper';
import ContentContainer from '@/components/layout/ContentContainer';
import Header from '@/components/navigation/Header';

export default function PresetsScreen() {
  return (
    <>
      <Header title="Presets" />
      <ContentContainer>
        <Text>Presets!</Text>
      </ContentContainer>
    </>
  );
}
