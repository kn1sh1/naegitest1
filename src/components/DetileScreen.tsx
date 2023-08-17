import React, {useState} from 'react';
import {StyleSheet, KeyboardAvoidingView} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {useNavigation, useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {AUD} from '../AUD';

export default function DetileScreen(): JSX.Element {
  const navigation = useNavigation();
  const route = useRoute();
  const isAdd = route.params.AUD === AUD.add;

  const onPressSave = () => {
    if (isAdd) {
      const getNewNaegiId = async (): Promise<number> => {
        let db = firestore().collection('naegi');
        let b = await db.countFromServer().get();
        return b.data().count + 1;
      };
      async function addNaegi(newId: number) {
        let newDoc = firestore().collection('naegi').doc(newId.toString());
        await newDoc
          .set({
            id: newId,
            name: name,
            count: count,
          })
          .then(() => {
            console.log('User added!');
          });
      }
      getNewNaegiId().then((newId: number) => {
        addNaegi(newId).then(() => {
          // TODO ここでgoBackしないと新規が一覧に表示されない（一覧表示後、登録が完了するため）
          navigation.goBack();
        });
      });
    } else if (route.params.AUD === AUD.upd) {
      console.log('upd');
      firestore()
        .collection('naegi')
        .doc(route.params.item.id.toString())
        .update({
          name: name,
          count: count,
        })
        .then(() => {
          console.log('User updated!');
        });
      navigation.goBack();
    } else {
      console.log('del');
    }
  };

  // TODO なにこのきもい書き方 useStateは初期化時に設定しないとなぜか無限ループに入る？
  const [name, setName] = useState(isAdd ? '' : route.params.item.name);
  const [count, setCount] = useState(isAdd ? '' : route.params.item.count);
  var a: number = 0;
  // firestore()
  //   .collection('naegi')
  //   .onSnapshot(QuerySnapshot => console.log(QuerySnapshot.size + 1));
  firestore()
    .collection('naegi')
    .onSnapshot(QuerySnapshot => {
      a = QuerySnapshot.size + 1;
      console.log(a);
    });
  console.log(a);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <TextInput
        style={{marginBottom: 16}}
        // placeholder="樹種名"
        placeholder="樹種名"
        label="樹種名"
        onChangeText={text => setName(text)}
        value={name}
      />
      <TextInput
        style={{marginBottom: 16}}
        placeholder="株数"
        label="株数"
        onChangeText={text => setCount(text)}
        value={count}
      />
      <Button icon="check" mode="text" onPress={onPressSave}>
        登録
      </Button>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
