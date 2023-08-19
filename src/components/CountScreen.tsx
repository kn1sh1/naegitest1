import {FlatList, StyleSheet, Text, View} from 'react-native';
import {
  PaperProvider,
  TextInput,
  Divider,
  Button,
  Card,
  List,
} from 'react-native-paper';
import {useNavigation, useRoute} from '@react-navigation/native';
import CountView from './CountView';
import {Count} from '../Count';
import {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';

export default function CountScreen(): JSX.Element {
  const navigation = useNavigation();
  const route = useRoute();
  const [counts, setCounts] = useState(Array<Count>);
  const [selected, setSelected] = useState<Count>({
    cc150: 0,
    cc300: 0,
    c24: 0,
    c40: 0,
    pot: 0,
    key: '',
    total: 0,
  });
  // const [selected, setSelected] = useState<Count>();

  const onPressSave = () => {
    navigation.goBack();
  };

  // TODO 本当はこんなファンクション作りたくない・・・
  // TODO parseIntしたくない
  // TODO この書き方嘘やろ・・・
  function p(b: number): number {
    return parseInt(b.toString(), 10);
  }

  useEffect(() => {
    console.log('useEffect');

    const initialize = async () => {
      let c: Count;
      let list: Array<Count> = [];
      // let nendo = new Date().getFullYear() - 2;
      // let keynendo: number;
      console.log('sid = ' + route.params.sid);
      let sid = route.params.sid;
      console.log('sid = ' + sid);
      console.log('initialize');
      await firestore()
        .collection('naegi')
        .doc(sid.toString())
        .collection('count')
        .get()
        .then(docs => {
          if (docs.empty === false) {
            docs.forEach(doc => {
              c = Object.assign(doc.data());
              c.key = doc.id;
              c.total = p(c.cc150) + p(c.cc300) + p(c.pot);
              console.log('a' + parseInt(c.key, 10));
              list.push(c);
            });
            console.log(list);
            setCounts(list);
            setSelected(list[0]);
            console.log('counts = ' + counts);
            console.log('selected = ' + selected);
            console.log('slice = ' + counts.slice(0, 1)[0]);
            console.log('[] = ' + counts[0]);
            console.log('at = ' + counts.at(0));
            console.log('list[0] = ' + list[0]);
          }
        });
    };
    const unsubscribe = navigation.addListener('focus', initialize);
    return unsubscribe;
  }, [counts, navigation, selected]);

  return (
    <PaperProvider>
      <CountView item={selected} />
      <View>
        <FlatList
          // style={styles.list}
          data={counts}
          keyExtractor={item => `${item.key}`}
          renderItem={({item}) => {
            return (
              <View>
                <List.Item
                  title={item.key}
                  titleStyle={styles.memoTitle}
                  style={styles.list}
                />
                {/* <Text>{item.key}</Text> */}
              </View>
            );
          }}
        />
      </View>
      <Button icon="check" mode="text" onPress={onPressSave}>
        登録
      </Button>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  divider: {
    marginTop: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 50,
  },
  label: {
    fontSize: 30,
    marginRight: 5,
  },
  list: {
    flex: 1,
  },
  card: {
    // marginBottom: 15,
    // marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 15,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    // paddingLeft: 15,
    // paddingRight: 15,
  },
  cardcon: {
    marginBottom: 5,
    marginRight: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
