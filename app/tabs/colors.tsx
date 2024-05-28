import { Text } from 'react-native-paper';
import ContentContainer from '@/components/layout/ContentContainer';
import QuickMenu from '@/components/QuickMenu';
import Header from '@/components/navigation/Header';
import Light from '@/components/peek/Light';
import { View } from 'react-native';
import FABMenu from '@/components/FABMenu';

export default function ColorsScreen() {
  return (
    <>
      <Header title="Colors" />
      <ContentContainer>
        <>
          <QuickMenu />
          <Text>Colors!</Text>
          <View style={{ flexDirection: 'row' }}>
            <Light color="red" />
            <Light color="red" />
            <Light color="red" />
            <Light color="red" />
            <Light color="red" />
            <Light color="green" />
            <Light color="green" />
            <Light color="green" />
            <Light color="green" />
            <Light color="blue" />
            <Light color="blue" />
            <Light color="blue" />
          </View>
          <FABMenu />
        </>
      </ContentContainer>
    </>
  );
}
