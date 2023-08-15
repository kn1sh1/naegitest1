import React, {useState, useEffect} from 'react';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {List, FAB} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import {Naegi} from '../Naegi';
import {AUD} from '../AUD';

export default function ListScreen(): JSX.Element {
  const navigation = useNavigation();
  const [naegis, setNaegis] = useState(Array<Naegi>);
  useIsFocused();

  console.log('ここからスタート2');
  useEffect(() => {
    console.log('useEffect');

    const initialize = async () => {
      console.log('initialize');
      let n: Naegi = {
        id: 0,
        name: '',
        count: '',
      };
      let list: Array<Naegi> = [];
      const db = firestore().collection('naegi');
      let docs = (await db.get()).docs;
      console.log('length' + docs.length);
      if (docs.length > 0) {
        docs.forEach(doc => {
          n = Object.assign(doc.data());
          list.push(n);
        });
        naegis.splice(0);
        setNaegis(list);
      }
    };
    const unsubscribe = navigation.addListener('focus', initialize);
    return unsubscribe;
  }, [naegis, navigation]);
  // useEffect(() => {
  //   console.log('useEffectここきてる？');

  // const initialize = async () => {
  //   let n: Naegi = {
  //     id: 0,
  //     name: '',
  //     count: '',
  //   };
  //   let list: Array<Naegi> = [];
  //   console.log('initializeここきてる？');
  //   console.log('naegisの中身:' + naegis);

  //   const db = firestore().collection('naegi');
  //   db.onSnapshot(
  //     query => {
  //       if (query.size > 0) {
  //         query.forEach(doc => {
  //           n = Object.assign(doc.data());
  //           // if (naegis.find(v => v.id !== n.id)) {
  //           if (naegis.filter(v => v.id === n.id).length === 0) {
  //             list.push(n);
  //           }
  //         });
  //       }
  //       // console.log('リストの中身：' + list.length);
  //       // setNaegis(new Array<Naegi>());
  //       // naegis.splice(0);
  //       // console.log('listの中身:' + list);
  //       setNaegis(list);
  //       // console.log(naegis);
  //     },
  //     error => {
  //       console.log(error);
  //     },
  //   );
  //   };
  //   const unsubscribe = navigation.addListener('focus', initialize);
  //   return unsubscribe;
  // }, [naegis, navigation]);

  const onPressAdd = () => {
    navigation.navigate('Detile', {AUD: AUD.add});
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={naegis}
        keyExtractor={item => `${item.id}`}
        renderItem={({item}) => {
          return (
            <View style={styles.memoContainer}>
              {/* TODO itemを外で使用しないとListItem表示されず？ */}
              <Text style={styles.memoTitle}>{item.name}</Text>
              <List.Item
                title={''}
                style={styles.list}
                titleNumberOfLines={1}
                description={`${item.count}株`}
                descriptionStyle={{textAlign: 'right'}}
                onLongPress={() =>
                  navigation.navigate('Detile', {item: item, AUD: AUD.upd})
                }
              />
            </View>
          );
        }}
      />
      <FAB
        style={{
          position: 'absolute',
          right: 16,
          bottom: 16,
        }}
        icon="plus"
        onPress={onPressAdd}
      />
    </View>
    // <View style={styles.Container}>
    //   <Text>Hello ListScreen</Text>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  list: {
    flex: 1,
  },
  memoContainer: {
    marginTop: 8,
    paddingBottom: 0,
    borderBottomWidth: 1,
  },
  memoTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    verticalAlign: 'bottom',
  },
  memoText: {
    // fontSize: 16,
    // marginTop: 8
  },
});
