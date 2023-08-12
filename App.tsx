/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

// import Firebase from 'react-native-firebase';
// import {firebase} from '@react-native-firebase/database';
// import database from '@react-native-firebase/database';
// import firestore from '@react-native-firebase/firestore';
import firestore from '@react-native-firebase/firestore';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  firestore()
    .collection('naegi')
    .onSnapshot(
      QuerySnapshot => {
        if (QuerySnapshot.size > 0) {
          QuerySnapshot.forEach(documentSnapshot => {
            console.log(documentSnapshot.data());
          });
        }
      },
      error => {
        console.log(error);
      },
    );

  // const reference = firebase
  //   .app()
  //   .database(
  //     'https://naegitest1-default-rtdb.asia-southeast1.firebasedatabase.app/',
  //   )
  //   .ref('/List');
  // console.log(reference);
  // console.log(database.ServerValue);
  // const reference = database(
  //   'https://naegitest1-default-rtdb.asia-southeast1.firebasedatabase.app/',
  //   ).ref('/List');
  // console.log(reference);

  // const database = firebase
  //   .app()
  //   .database(
  //     'https://naegitest1-default-rtdb.asia-southeast1.firebasedatabase.app/',
  //   );

  // データベースのインスタンスを作成
  // let db = Firebase.database();
  // db.ref('List')
  //   .on('value', snapshot => {
  //     console.log(snapshot.val());
  //   })
  //   .bind(db);

  // db.ref('List')
  //   .set({
  //     title: 'aaaa',
  //   })
  //   .then(() => {
  //     console.log('update ok');
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
