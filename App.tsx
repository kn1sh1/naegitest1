/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {PaperProvider} from 'react-native-paper';

import ListScreen from './src/components/ListScreen';
import DetailScreen from './src/components/DetileScreen';
import CountScreen from './src/components/CountScreen';

const Stack = createStackNavigator();

export default function App(): JSX.Element {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="List">
          <Stack.Screen
            name="List"
            component={ListScreen}
            options={{
              title: '一覧',
            }}
          />
          <Stack.Screen
            name="Detile"
            component={DetailScreen}
            options={{
              title: '',
            }}
          />
          <Stack.Screen
            name="Count"
            component={CountScreen}
            options={{
              title: '',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
    // <View style={styles.Container}>
    //   <Text>Hello ListScreen</Text>
    // </View>
  );
}

// const styles = StyleSheet.create({
//   Container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// useEffect(() => {
//   const initialize = async () => {
//     firestore()
//       .collection('naegi')
//       .onSnapshot(
//         QuerySnapshot => {
//           if (QuerySnapshot.size > 0) {
//             QuerySnapshot.forEach(documentSnapshot => {
//               console.log(documentSnapshot.data());
//               console.log(Object.keys(documentSnapshot.data()));
//               Object.assign(documentSnapshot.data());
//               b.push(a);
//               console.log('bcount2 is ' + b.length);
//             });
//           }
//         },
//         error => {
//           console.log(error);
//         },
//       );
//   };
// });
