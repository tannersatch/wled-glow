import { StyleSheet, View } from 'react-native';

const Light = ({ color }: { color: string }) => {
  const styles = StyleSheet.create({
    housing: {
      backgroundColor: 'gray',
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 100,
      width: 10,
      height: 10,
    },
    bulb: {
      width: 3,
      height: 3,
      borderRadius: 100,
      backgroundColor: color,
      shadowColor: color,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 1,
      shadowRadius: 3,
      elevation: 5,
    },
    bulb1: {
      marginTop: 0.5,
      alignSelf: 'center',
    },
    bulb2: {
      alignSelf: 'flex-start',
    },
    bulb3: {},
    bulbRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
  });

  return (
    <View style={styles.housing}>
      <View style={[styles.bulb, styles.bulb1]} />
      <View style={styles.bulbRow}>
        <View style={[styles.bulb, styles.bulb2]} />
        <View style={[styles.bulb, styles.bulb3]} />
      </View>
    </View>
  );
};

export default Light;
