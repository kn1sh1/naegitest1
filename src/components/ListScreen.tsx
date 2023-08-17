import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {
  PaperProvider,
  Modal,
  Portal,
  List,
  FAB,
  Searchbar,
  DataTable,
  IconButton,
  MD3Colors,
} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import {Naegi} from '../Naegi';
import {Count} from '../Count';
import {AUD} from '../AUD';

export default function ListScreen(): JSX.Element {
  const navigation = useNavigation();
  const [naegis, setNaegis] = useState(Array<Naegi>);
  const [counts, setCounts] = useState(Array<Count>);
  // useIsFocused();
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  // TODO selectedIDandName あとでいい方法考える
  const [sid, setSid] = useState(0);
  const [sname, setSname] = useState('');

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

  const onPressAdd = () => {
    navigation.navigate('Detile', {AUD: AUD.add});
  };

  const showDetileSc = (item: Naegi) => {
    navigation.navigate('Detile', {item: item, AUD: AUD.upd})
  };

  const onPressModalButton = (item: Naegi) => {
    setSid(item.id);
    setSname(item.name);

    function a(b: number): number {
      return parseInt(b.toString(), 10);
    }

    async function initialize() {
      console.log('count initialize');
      let c: Count;
      // TODO 表示対象ではないカウント
      let c2: Count = {
        cc150: 0,
        cc300: 0,
        c24: 0,
        c40: 0,
        pot: 0,
        key: '',
        total: 0,
      };
      let list: Array<Count> = [];
      // let nendo: number = DateTime.Today.AddMonths(-3).Year;
      // 過去３年間のデータを表示したいので-2（今年、１年前、２年前）
      // let nendo = new Date().setFullYear(-2);
      // TODO ４月から次の年度にする？芽を出した時期なら４月からがいいかも
      let nendo = new Date().getFullYear() - 2;
      console.log('nendo = ' + nendo);

      await firestore()
        .collection('naegi')
        .doc('1')
        .collection('count')
        .get()
        .then(docs => {
          if (docs.size > 0) {
            docs.forEach(doc => {
              c = Object.assign(doc.data());
              // TODO parseIntしたくない
              c.key = doc.id;
              // c.total =
              //   parseInt(c.cc150.toString(), 10) +
              //   parseInt(c.cc300.toString(), 10) +
              //   parseInt(c.pot.toString(), 10);
              c.total = a(c.cc150) + a(c.cc300) + a(c.pot);
              console.log('a' + parseInt(c.key, 10));
              if (nendo <= parseInt(c.key, 10)) {
                // TODO この書き方嘘やろ・・・
                list.push(c);
              } else {
                console.log(c.key);
                // c2.c24 = a(c.c24) + a(c2.c24);
                // c2.c40 = a(c.c40) + a(c2.c40);
                c2.cc150 = a(c.cc150) + a(c2.cc150);
                c2.cc300 = a(c.cc300) + a(c2.cc300);
                c2.total = a(c.c24) + a(c2.total);
              }
            });
            c2.key = '以外';
            list.push(c2);
            console.log(list);
            counts.splice(0);
            setCounts(list);
          }
        });
    }
    initialize();
    setVisible(true);
  };

  return (
    <PaperProvider>
      <Searchbar placeholder="Search" mode="view" />
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          data={naegis}
          keyExtractor={item => `${item.id}`}
          renderItem={({item}) => {
            return (
              <View style={styles.memoContainer}>
                <List.Item
                  title={item.name}
                  titleStyle={styles.memoTitle}
                  style={styles.list}
                  titleNumberOfLines={1}
                  description={`${item.count}株`}
                  descriptionStyle={{
                    textAlign: 'right',
                    fontSize: 18,
                  }}
                  onPress={() => {
                    onPressModalButton(item);
                    // console.log('モーダルきてる？');
                    // console.log(visible);
                    // TODO showModalではできない？
                    // console.log(visible);
                  }}
                  onLongPress={() =>
                    // navigation.navigate('Detile', {item: item, AUD: AUD.upd})
                    showDetileSc(item)
                  }
                />
              </View>
            );
          }}
        />
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={styles.modal}>
            <View style={styles.modalview1}>
              <IconButton
                icon="pencil"
                iconColor={MD3Colors.secondary50}
                size={20}
                onPress={() => navigation.navigate('Count')}
                style={styles.iconstyle}
                mode={'contained-tonal'}
              />
            </View>
            <View style={styles.modalview2}>
              <Text style={styles.countText}>{sname}</Text>
            </View>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>年生</DataTable.Title>
                <DataTable.Title numeric>150cc</DataTable.Title>
                <DataTable.Title numeric>300cc</DataTable.Title>
                <DataTable.Title numeric>ポット</DataTable.Title>
                <DataTable.Title numeric>小計</DataTable.Title>
              </DataTable.Header>
              {counts.map(item => (
                <DataTable.Row>
                  <DataTable.Cell>{item.key}</DataTable.Cell>
                  <DataTable.Cell numeric>{item.cc150}</DataTable.Cell>
                  <DataTable.Cell numeric>{item.cc300}</DataTable.Cell>
                  <DataTable.Cell numeric>{item.pot}</DataTable.Cell>
                  <DataTable.Cell numeric>{item.total}</DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </Modal>
        </Portal>
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
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingLeft: 15,
    // paddingRight: 15,
  },
  list: {
    flex: 1,
  },
  memoContainer: {
    marginTop: 0,
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
  modal: {
    backgroundColor: 'white',
    padding: 20,
    // fontSize: 16,
    // marginTop: 8
  },
  countText: {
    fontSize: 24,
    marginTop: 8,
  },
  surface: {
    padding: 8,
    height: 80,
    width: 335,
    // alignItems: 'stretch',
    alignItems: 'center',
    flexDirection: 'row',
    // verticalAlign: 'middle',
    // alignContent: 'center',
    // justifyContent: 'flex-end',
  },
  iconstyle: {
    alignContent: 'center',
  },
  modalview1: {
    // flex: 1,
    // flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'flex-end',
    // flexDirection: 'row',
    // backgroundColor: '#F5FCFF',
  },
  modalview2: {
    // flex: 1,
    // flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'flex-start',
    // flexDirection: 'row',
    // backgroundColor: '#F5FCFF',
  },
});
