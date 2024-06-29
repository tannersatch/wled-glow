import { Text } from 'react-native-paper';
import ContentContainer from '@/components/layout/ContentContainer';
import Header from '@/components/navigation/Header';

export default function SegmentsScreen() {
  return (
    <>
      <Header title="Segments" />
      <ContentContainer>
        <Text>Segments!</Text>
      </ContentContainer>
    </>
  );
}
