import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  SafeAreaView,
  View,
  Text,
} from 'react-native';
import {
  TextInput,
  Button,
  SegmentedButtons,
  PaperProvider,
  Checkbox,
  RadioButton,
  Divider,
  HelperText,
} from 'react-native-paper';
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
            count: 0,
          })
          .then(() => {
            console.log('User added!');
          });
        // TODO うまく書こう
        // 過去４年間のデータを表示したいので-2（今年、１年前、２年前、３年前）
        // TODO ４月から次の年度にする？芽を出した時期なら４月からがいいかも
        // let before3nen = new Date().getFullYear() - 3;
        // let nendo123 = parseInt(before3nen.toString(), 10);
        // const keynendo = {nendo1, nendo1 + 1, nendo1 + 2, nendo1 + 3};
        let nendo = new Date().getFullYear();
        let nendomin1 = nendo - 1;
        let nendomin2 = nendo - 2;
        let nendomin3 = nendo - 3;
        let nendolist: Array<number> = [nendo, nendomin1, nendomin2, nendomin3];
        nendolist.forEach(async n => {
          await newDoc.collection('count').doc(n.toString()).set({
            cc150: 0,
            cc300: 0,
            c24: 0,
            c40: 0,
            pot: 0,
          });
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
        })
        .then(() => {
          console.log('User updated!');
        });
      navigation.goBack();
    } else {
      console.log('del');
    }
  };

  useEffect(() => {
    console.log('Detile useEffect');

    const initialize = async () => {
      console.log('Detile initialize');
    };
    // const initialize = async () => {
    //   let c: Count;
    //   let list: Array<Count> = [];
    //   let al: AllTotal = {alltotal: 0};

    //   console.log('initialize');
    //   await firestore()
    //     .collection('naegi')
    //     .doc(route.params.sid.toString())
    //     .collection('count')
    //     .get()
    //     .then(docs => {
    //       if (!docs.empty) {
    //         docs.forEach(doc => {
    //           c = Object.assign(doc.data());
    //           c.key = doc.id;
    //           c.total = p(c.cc150) + p(c.cc300) + p(c.pot);
    //           al.alltotal += c.total;
    //           console.log('a' + parseInt(c.key, 10));
    //           list.push(c);
    //         });
    //         console.log(list);
    //         // TODO reverse()ちょっと微妙。たまたまうまくいってるだけ。
    //         setCounts(list.reverse());
    //         setSelected(list[0]);
    //         setAllTotal(al);
    //       }
    //     });
    // };
    const unsubscribe = navigation.addListener('focus', initialize);
    return unsubscribe;
  }, [navigation]);

  const [name, setName] = useState('');
  const [ka, setKa] = useState('');
  const [zoku, setZoku] = useState('');
  const [shiyuui, setShiyuui] = useState(true);
  const [jiseishu, setJiseishu] = useState(true);
  const [rakujo, setRakujo] = useState('1');
  const [shinkou, setShinkou] = useState('1');
  const [seityou, setSeityou] = useState('3');
  const [ishoku, setIshoku] = useState('3');
  const [youto, setYouto] = useState('');

  const [kaikaf, setKaikaf] = useState('');
  const [kaikat, setKaikat] = useState('');
  const [ketsujituf, setKetsujituf] = useState('');
  const [ketsujitut, setKetsujitut] = useState('');
  const [hanshoku, setHanshoku] = useState('1');
  const [ne, setNe] = useState('1');

  const [kansou, setKansou] = useState('');
  const [shikke, setShikke] = useState('');
  const [samusa, setSamusa] = useState('');
  const [atsusa, setAtsusa] = useState('');
  const [nikkou, setNikkou] = useState('');

  // const [, set] = useState('');

  const [seg, setSeg] = useState('about');

  // const hasMonthErrors = (month: string) => {
  //   return !(parseInt(month, 10) >= 1 && parseInt(month, 10) <= 12);
  // };

  return (
    <PaperProvider>
      <KeyboardAvoidingView style={styles.container}>
        <TextInput
          style={{marginBottom: 3, height: 50}}
          // placeholder="樹種名"
          label="樹種名"
          onChangeText={text => setName(text)}
          value={name}
        />
        <SafeAreaView style={styles.safeview}>
          <SegmentedButtons
            value={seg}
            onValueChange={setSeg}
            buttons={[
              {
                value: 'about',
                label: 'About',
                // icon: 'information',
                // icon: 'book-information-variant',
                // icon: 'folder-information',
                // icon: 'script-text',
                icon: 'file-document-edit',

              },
              {
                value: 'seed',
                label: '種',
                icon: 'seed',
              },
              {
                value: 'rising',
                label: '育苗',
                icon: 'flower',
                // icon: 'pot-mix',
                // icon: 'leaf',
                // icon: 'seedling',
              },
              {
                value: 'plant',
                label: '植栽',
                icon: 'forest',
              },
            ]}
          />
          <View style={seg === 'about' ? styles.view : styles.nodisp}>
            <Text>情報画面</Text>
            <View style={styles.rowview}>
              <TextInput
                style={{marginBottom: 0, width: 100}}
                label="科"
                onChangeText={text => setKa(text)}
                value={ka}
                numberOfLines={5}
              />
              <TextInput
                style={{marginBottom: 0, width: 100}}
                label="属"
                onChangeText={text => setZoku(text)}
                value={zoku}
                // multiline
                numberOfLines={5}
              />
            </View>
            <View style={styles.rowview}>
              <Checkbox.Item
                label={shiyuui ? '雌雄異' : '雌雄同'}
                status={shiyuui ? 'unchecked' : 'unchecked'}
                onPress={() => {
                  setShiyuui(!shiyuui);
                }}
              />
              <Checkbox.Item
                label={jiseishu ? '自生種' : '外来種'}
                status={jiseishu ? 'unchecked' : 'unchecked'}
                onPress={() => {
                  setJiseishu(!jiseishu);
                }}
              />
            </View>
            <Divider />
            <View style={styles.rowview}>
              <RadioButton.Group
                onValueChange={v => setRakujo(v)}
                value={rakujo}>
                <View style={styles.rowview}>
                  <RadioButton.Item label="落葉" value="1" />
                  <RadioButton.Item label="常緑" value="2" />
                </View>
              </RadioButton.Group>
              <RadioButton.Group
                onValueChange={v => setShinkou(v)}
                value={shinkou}>
                <View style={styles.rowview}>
                  <RadioButton.Item label="針葉" value="1" />
                  <RadioButton.Item label="広葉" value="2" />
                </View>
              </RadioButton.Group>
            </View>
            <Divider />
            <Text>成長</Text>
            <View style={styles.rowview}>
              <RadioButton.Group
                onValueChange={v => setSeityou(v)}
                value={seityou}>
                <View style={styles.rowview}>
                  <RadioButton.Item label="早" value="1" />
                  <RadioButton.Item label="稍早" value="2" />
                  <RadioButton.Item label="普通" value="3" />
                  <RadioButton.Item label="稍遅" value="4" />
                  <RadioButton.Item label="遅" value="5" />
                </View>
              </RadioButton.Group>
            </View>
            <Divider />
            <Text>移植</Text>
            <View style={styles.rowview}>
              <RadioButton.Group
                onValueChange={v => setIshoku(v)}
                value={ishoku}>
                <View style={styles.rowview}>
                  <RadioButton.Item label="易" value="1" />
                  <RadioButton.Item label="稍易" value="2" />
                  <RadioButton.Item label="普通" value="3" />
                  <RadioButton.Item label="稍難" value="4" />
                  <RadioButton.Item label="難" value="5" />
                </View>
              </RadioButton.Group>
            </View>
            <TextInput
              style={{marginBottom: 0}}
              // placeholder="樹種名"
              label="用途"
              onChangeText={text => setYouto(text)}
              value={youto}
            />
            <Text>種・花・樹皮の写真載せれたら最高</Text>
          </View>
          <View style={seg === 'seed' ? styles.view : styles.nodisp}>
            <Text>種画面</Text>
            <Text>開花期</Text>
            <Text>結実期</Text>
            <View style={styles.rowview}>
              {/* <View> */}
              <TextInput
                label="開花"
                value={kaikaf}
                onChangeText={text => setKaikaf(text)}
                style={{width: 65, textAlign: 'center', height: 50}}
                maxLength={2}
              />
              <Text>月〜</Text>
              {/* <HelperText type="error" visible={hasMonthErrors(kaikaf)}>
                  1~12の間で入力してください。
                </HelperText> */}
              {/* </View> */}
              {/* <View> */}
              <TextInput
                label="開花"
                value={kaikat}
                onChangeText={text => setKaikat(text)}
                style={{width: 65, textAlign: 'center', height: 50}}
                maxLength={2}
              />
              <Text>月</Text>
              {/* <HelperText type="error" visible={hasMonthErrors(kaikat)}>
                  1~12の間で入力してください。
                </HelperText> */}
              {/* <View> */}
              <TextInput
                label="結実"
                value={ketsujituf}
                onChangeText={text => setKetsujituf(text)}
                style={{width: 65, textAlign: 'center', height: 50}}
                maxLength={2}
              />
              <Text>月〜</Text>
              {/* <HelperText type="error" visible={hasMonthErrors(kaikaf)}>
                  1~12の間で入力してください。
                </HelperText> */}
              {/* </View>
              <View> */}
              <TextInput
                label="結実"
                value={ketsujitut}
                onChangeText={text => setKetsujitut(text)}
                style={{width: 65, textAlign: 'center', height: 50}}
                maxLength={2}
              />
              <Text>月</Text>
              {/* <HelperText type="error" visible={hasMonthErrors(kaikat)}>
                  1~12の間で入力してください。
                </HelperText> */}
              {/* </View> */}
            </View>
            <Text>繁殖</Text>
            <View style={styles.rowview}>
              <RadioButton.Group
                onValueChange={v => setHanshoku(v)}
                value={hanshoku}>
                <View style={styles.rowview}>
                  <RadioButton.Item
                    label="実生"
                    value="1"
                    position="leading"
                    status="unchecked"
                  />
                  <RadioButton.Item label="挿木" value="2" position='leading'/>
                </View>
              </RadioButton.Group>
            </View>
            <Text>根</Text>
            <View style={styles.rowview}>
              <RadioButton.Group onValueChange={v => setNe(v)} value={ne}>
                <View style={styles.rowview}>
                  <RadioButton.Item label="直" value="1" />
                  <RadioButton.Item label="深" value="2" />
                  <RadioButton.Item label="中" value="3" />
                  <RadioButton.Item label="浅" value="4" />
                </View>
              </RadioButton.Group>
            </View>
            <Text>採取貯蔵（できれば日付で管理したい）</Text>
          </View>
          {/* <Text>播種期</Text> */}
          {/* <Text>発芽までの期間</Text>
          <Text>発芽までの水やり</Text> */}
          <View style={seg === 'rising' ? styles.view : styles.nodisp}>
            <Text>育苗画面</Text>
            <Text>乾燥強弱</Text>
            <Text>湿気強弱</Text>
            <Text>寒さ強弱</Text>
            <Text>暑さ強弱</Text>
            <Text>日光強弱</Text>
            <Text>育苗メモ（できれば日付で管理したい）</Text>
          </View>
          <View style={seg === 'plant' ? styles.view : styles.nodisp}>
            <Text>植栽画面</Text>
            <Text>陽中陰</Text>
            <Text>高・小高・低・つる</Text>
            <Text>気候帯 亜熱帯・暖温帯・冷温帯・亜高山帯・高山帯</Text>
            <Text>
              生育環境
              丘陵・山地・尾根・谷沿・湿地・乾燥地・林内・林縁・岩場・河原・道端・荒地・日向・日陰(chipで出来んかな？)
            </Text>
            <Text>標高</Text>
            <Text>植栽記録（できれば日付で管理したい）</Text>
          </View>
        </SafeAreaView>
        <Button icon="check" mode="text" onPress={onPressSave}>
          登録
        </Button>
      </KeyboardAvoidingView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  safeview: {
    flex: 1,
    // display: 'none',
    // alignItems: 'center',
  },
  view: {
    flex: 1,
  },
  rowview: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    // flex: 1,
  },
  radiobutton: {
    width: 100,
    height: 50,
  },
  nodisp: {
    display: 'none',
  },
});
