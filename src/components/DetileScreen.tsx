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
        return b.data().count;
      };
      getNewNaegiId().then((newId: number) => {
        console.log('asyncの結果=' + a);
        newId++;
        firestore()
          .collection('naegi')
          .doc(newId.toString())
          .set({
            id: newId,
            name: name,
            count: count,
          })
          .then(() => {
            console.log('User added!');
          });
      });
    } else if (route.params.AUD === AUD.upd) {
      console.log('upd');
      console.log(route.params.item.id);
      console.log(name);
      console.log(count);
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
    } else {
      console.log('del');
    }
    // firestore()
    //   .collection('naegi')
    //   .doc('j0OFhPetTzEKfvHZdwr8')
    //   .delete()
    //   .then(() => {
    //     console.log('User added!');
    //   });
    navigation.goBack();
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
        mode="outlined"
        placeholder="樹種名"
        multiline
        onChangeText={text => setName(text)}
        value={name}
      />
      <TextInput
        style={{marginBottom: 16}}
        mode="outlined"
        placeholder="株数"
        onChangeText={text => setCount(text)}
        value={count}
      />
      <Button mode="contained" onPress={onPressSave} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
