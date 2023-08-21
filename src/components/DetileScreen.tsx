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
  Divider,
  HelperText,
} from 'react-native-paper';
import {useNavigation, useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {AUD} from '../AUD';
import {Naegi} from '../Naegi';

export default function DetileScreen(): JSX.Element {
  const navigation = useNavigation();
  const route = useRoute();
  const isAdd = route.params.AUD === AUD.add;
  const id = route.params.id;

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

            ka: ka,
            zoku: zoku,
            shiyuui: shiyuui,
            jiseishu: jiseishu,
            rakujo: rakujo,
            shinkou: shinkou,
            seityou: seityou,
            ishoku: ishoku,
            youto: youto,

            kaikaf: kaikaf,
            kaikat: kaikat,
            ketsujituf: ketsujituf,
            ketsujitut: ketsujitut,
            hanshoku: hanshoku,
            ne: ne,
            seedmemo: seedmemo,

            nikkou: nikkou,
            mizuyari: mizuyari,
            kansou: kansou,
            shikke: shikke,
            samusa: samusa,
            atsusa: atsusa,
            risingmemo: risingmemo,

            youin: youin,
            height: height,
            kikou: kikou,
            seisoku: seisoku,
            hyoukouf: hyoukouf,
            hyoukout: hyoukout,
            plantmemo: plantmemo,
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
        .doc(id.toString())
        .update({
          name: name,

          ka: ka,
          zoku: zoku,
          shiyuui: shiyuui,
          jiseishu: jiseishu,
          rakujo: rakujo,
          shinkou: shinkou,
          seityou: seityou,
          ishoku: ishoku,
          youto: youto,

          kaikaf: kaikaf,
          kaikat: kaikat,
          ketsujituf: ketsujituf,
          ketsujitut: ketsujitut,
          hanshoku: hanshoku,
          ne: ne,
          seedmemo: seedmemo,

          nikkou: nikkou,
          mizuyari: mizuyari,
          kansou: kansou,
          shikke: shikke,
          samusa: samusa,
          atsusa: atsusa,
          risingmemo: risingmemo,

          youin: youin,
          height: height,
          kikou: kikou,
          seisoku: seisoku,
          hyoukouf: hyoukouf,
          hyoukout: hyoukout,
          plantmemo: plantmemo,
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
      let n: Naegi = {
        id: 0,
        count: '',
        name: '',
        ka: '',
        zoku: '',
        shiyuui: false,
        jiseishu: false,
        rakujo: 0,
        shinkou: 0,
        seityou: 0,
        ishoku: 0,
        youto: '',
        kaikaf: '',
        kaikat: '',
        ketsujituf: '',
        ketsujitut: '',
        hanshoku: 0,
        ne: 0,
        seedmemo: '',
        nikkou: 0,
        mizuyari: 0,
        kansou: 0,
        shikke: 0,
        samusa: 0,
        atsusa: 0,
        risingmemo: '',
        youin: 0,
        height: 0,
        kikou: 0,
        seisoku: 0,
        hyoukouf: '',
        hyoukout: '',
        plantmemo: '',
      };

      let doc = await firestore().collection('naegi').doc(id.toString()).get();
      if (doc.exists) {
        console.log('doc = ' + doc.data());
        n = Object.assign(doc.data());
        setName(n.name);
        setKa(n.ka);
        setZoku(n.zoku);
        setShiyuui(n.shiyuui);
        setJiseishu(n.jiseishu);
        setRakujo(n.rakujo);
        setShinkou(n.shinkou);
        setSeityou(n.seityou);
        setIshoku(n.ishoku);
        setYouto(n.youto);

        setKaikaf(n.kaikaf);
        setKaikat(n.kaikat);
        setKetsujituf(n.ketsujituf);
        setKetsujitut(n.ketsujitut);
        setHanshoku(n.hanshoku);
        setNe(n.ne);
        setSeedmemo(n.seedmemo);

        setNikkou(n.nikkou);
        setMizuyari(n.mizuyari);
        setKansou(n.kansou);
        setShikke(n.shikke);
        setSamusa(n.samusa);
        setAtsusa(n.atsusa);
        setRisingmemo(n.risingmemo);

        setYouin(n.youin);
        setHeight(n.height);
        setKikou(n.kikou);
        setSeisoku(n.seisoku);
        setHyoukouf(n.hyoukouf);
        setHyoukout(n.hyoukout);
        setPlantmemo(n.plantmemo);
      }
        // .then(doc => {
        //   if (doc.exists) {
        //     n = Object.assign(doc.data());
        //     setName(n.name);
        //     setKa(n.ka);
        //     setZoku(n.zoku);
        //     setShiyuui(n.shiyuui);
        //     setJiseishu(n.jiseishu);
        //     setRakujo(n.rakujo);
        //     setShinkou(n.shinkou);
        //     setSeityou(n.seityou);
        //     setIshoku(n.ishoku);
        //     setYouto(n.youto);

        //     setKaikaf(n.kaikaf);
        //     setKaikat(n.kaikat);
        //     setKetsujituf(n.ketsujituf);
        //     setKetsujitut(n.ketsujitut);
        //     setHanshoku(n.hanshoku);
        //     setNe(n.ne);
        //     setSeedmemo(n.seedmemo);

        //     setNikkou(n.nikkou);
        //     setMizuyari(n.mizuyari);
        //     setKansou(n.kansou);
        //     setShikke(n.shikke);
        //     setSamusa(n.samusa);
        //     setAtsusa(n.atsusa);
        //     setRisingmemo(n.risingmemo);

        //     setYouin(n.youin);
        //     setHeight(n.height);
        //     setKikou(n.kikou);
        //     setSeisoku(n.seisoku);
        //     setHyoukouf(n.hyoukouf);
        //     setHyoukout(n.hyoukout);
        //     setPlantmemo(n.plantmemo);
        //   }
        // });
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
  }, [id, navigation]);

  // TODO アイデア
  // 育苗
  // 苗の高さ平均とかいる？(1年生、２、３、、、)
  // <Text>播種期</Text>
  // <Text>発芽までの期間</Text>
  // <Text>発芽までの水やり</Text>

  const [name, setName] = useState('');
  const [ka, setKa] = useState('');
  const [zoku, setZoku] = useState('');
  const [shiyuui, setShiyuui] = useState(true);
  const [jiseishu, setJiseishu] = useState(true);
  const [rakujo, setRakujo] = useState(1);
  const [shinkou, setShinkou] = useState(1);
  const [seityou, setSeityou] = useState(3);
  const [ishoku, setIshoku] = useState(3);
  const [youto, setYouto] = useState('');

  const [kaikaf, setKaikaf] = useState('4');
  const [kaikat, setKaikat] = useState('5');
  const [ketsujituf, setKetsujituf] = useState('9');
  const [ketsujitut, setKetsujitut] = useState('11');
  const [hanshoku, setHanshoku] = useState(1);
  const [ne, setNe] = useState(1);
  const [seedmemo, setSeedmemo] = useState('');

  const [nikkou, setNikkou] = useState(3);
  const [mizuyari, setMizuyari] = useState(3);
  const [kansou, setKansou] = useState(3);
  const [shikke, setShikke] = useState(3);
  const [samusa, setSamusa] = useState(3);
  const [atsusa, setAtsusa] = useState(3);
  const [risingmemo, setRisingmemo] = useState('');

  const [youin, setYouin] = useState(2);
  const [height, setHeight] = useState(2);
  const [kikou, setKikou] = useState(3);
  const [seisoku, setSeisoku] = useState(0);
  const [hyoukouf, setHyoukouf] = useState('');
  const [hyoukout, setHyoukout] = useState('');
  const [plantmemo, setPlantmemo] = useState('');

  // const [, set] = useState('');

  const [seg, setSeg] = useState('about');

  const hasMonthErrors = (month: string) => {
    return !(parseInt(month, 10) >= 1 && parseInt(month, 10) <= 12);
  };

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
            <View style={styles.rowview}>
              <TextInput
                style={{marginBottom: 0, width: 100, height: 50}}
                label="科"
                onChangeText={text => setKa(text)}
                value={ka}
                numberOfLines={5}
              />
              <TextInput
                style={{marginBottom: 0, width: 100, height: 50}}
                label="属"
                onChangeText={text => setZoku(text)}
                value={zoku}
                // multiline
                numberOfLines={5}
              />
              <Button
                compact
                mode="contained-tonal"
                onPress={() => setShiyuui(!shiyuui)}>
                {shiyuui ? '雌雄異' : '雌雄同'}
              </Button>
              <Button
                compact
                mode="contained-tonal"
                onPress={() => setJiseishu(!jiseishu)}>
                {jiseishu ? '自生種' : '外来種'}
              </Button>
            </View>
            <Divider />
            <View style={styles.rowview}>
              <Button
                mode={rakujo === 1 ? 'contained-tonal' : 'elevated'}
                onPress={() => setRakujo(1)}>
                落葉
              </Button>
              <Button
                mode={rakujo === 2 ? 'contained-tonal' : 'elevated'}
                onPress={() => setRakujo(2)}>
                常緑
              </Button>
              <Button
                mode={shinkou === 1 ? 'contained-tonal' : 'elevated'}
                onPress={() => setShinkou(1)}>
                針葉
              </Button>
              <Button
                mode={shinkou === 2 ? 'contained-tonal' : 'elevated'}
                onPress={() => setShinkou(2)}>
                広葉
              </Button>
            </View>
            <Divider />
            <Text>成長</Text>
            <View style={styles.rowview}>
              <Button
                mode={seityou === 1 ? 'contained-tonal' : 'elevated'}
                onPress={() => setSeityou(1)}>
                早
              </Button>
              <Button
                mode={seityou === 2 ? 'contained-tonal' : 'elevated'}
                onPress={() => setSeityou(2)}>
                稍早
              </Button>
              <Button
                mode={seityou === 3 ? 'contained-tonal' : 'elevated'}
                onPress={() => setSeityou(3)}>
                普通
              </Button>
              <Button
                mode={seityou === 4 ? 'contained-tonal' : 'elevated'}
                onPress={() => setSeityou(4)}>
                稍遅
              </Button>
              <Button
                mode={seityou === 5 ? 'contained-tonal' : 'elevated'}
                onPress={() => setSeityou(5)}>
                遅
              </Button>
            </View>
            <Divider />
            <Text>移植</Text>
            <View style={styles.rowview}>
              <Button
                mode={ishoku === 1 ? 'contained-tonal' : 'elevated'}
                onPress={() => setIshoku(1)}>
                早
              </Button>
              <Button
                mode={ishoku === 2 ? 'contained-tonal' : 'elevated'}
                onPress={() => setIshoku(2)}>
                稍早
              </Button>
              <Button
                mode={ishoku === 3 ? 'contained-tonal' : 'elevated'}
                onPress={() => setIshoku(3)}>
                普通
              </Button>
              <Button
                mode={ishoku === 4 ? 'contained-tonal' : 'elevated'}
                onPress={() => setIshoku(4)}>
                稍遅
              </Button>
              <Button
                mode={ishoku === 5 ? 'contained-tonal' : 'elevated'}
                onPress={() => setIshoku(5)}>
                遅
              </Button>
            </View>
            <Divider />
            <TextInput
              style={{marginBottom: 0, height: 150}}
              label="用途"
              multiline
              onChangeText={text => setYouto(text)}
              value={youto}
              numberOfLines={6}
            />
            <Text>種・花・樹皮の写真載せれたら最高</Text>
          </View>
          <View style={seg === 'seed' ? styles.view : styles.nodisp}>
            <View style={styles.rowview}>
              <View>
                <TextInput
                  label="開花"
                  value={kaikaf}
                  onChangeText={text => setKaikaf(text)}
                  style={{width: 65, textAlign: 'center', height: 50}}
                  maxLength={2}
                />
                <HelperText type="error" visible={hasMonthErrors(kaikaf)}>
                  1~12月
                </HelperText>
              </View>
              <Text>月〜</Text>
              <View>
                <TextInput
                  label="開花"
                  value={kaikat}
                  onChangeText={text => setKaikat(text)}
                  style={{width: 65, textAlign: 'center', height: 50}}
                  maxLength={2}
                />
                <HelperText type="error" visible={hasMonthErrors(kaikat)}>
                  1~12月
                </HelperText>
              </View>
              <Text>月</Text>
              <View>
                <TextInput
                  label="結実"
                  value={ketsujituf}
                  onChangeText={text => setKetsujituf(text)}
                  style={{width: 65, textAlign: 'center', height: 50}}
                  maxLength={2}
                />
                <HelperText type="error" visible={hasMonthErrors(ketsujituf)}>
                  1~12月
                </HelperText>
              </View>
              <Text>月〜</Text>
              <View>
                <TextInput
                  label="結実"
                  value={ketsujitut}
                  onChangeText={text => setKetsujitut(text)}
                  style={{width: 65, textAlign: 'center', height: 50}}
                  maxLength={2}
                />
                <HelperText type="error" visible={hasMonthErrors(ketsujitut)}>
                  1~12月
                </HelperText>
              </View>
              <Text>月</Text>
            </View>
            <Text>繁殖</Text>
            <View style={styles.rowview}>
              <Button
                mode={hanshoku === 1 ? 'contained-tonal' : 'elevated'}
                onPress={() => setHanshoku(1)}>
                実生
              </Button>
              <Button
                mode={hanshoku === 2 ? 'contained-tonal' : 'elevated'}
                onPress={() => setHanshoku(2)}>
                挿木
              </Button>
              <Button
                mode={hanshoku === 3 ? 'contained-tonal' : 'elevated'}
                onPress={() => setHanshoku(3)}>
                その他
              </Button>
            </View>
            <Text>根</Text>
            <View style={styles.rowview}>
              <Button
                mode={ne === 1 ? 'contained-tonal' : 'elevated'}
                onPress={() => setNe(1)}>
                直
              </Button>
              <Button
                mode={ne === 2 ? 'contained-tonal' : 'elevated'}
                onPress={() => setNe(2)}>
                深
              </Button>
              <Button
                mode={ne === 3 ? 'contained-tonal' : 'elevated'}
                onPress={() => setNe(3)}>
                中
              </Button>
              <Button
                mode={ne === 4 ? 'contained-tonal' : 'elevated'}
                onPress={() => setNe(4)}>
                浅
              </Button>
            </View>
            <Text>採取貯蔵（できれば日付で管理したい）</Text>
            <TextInput
              style={{marginBottom: 0, height: 220}}
              label="種メモ"
              multiline
              onChangeText={text => setSeedmemo(text)}
              value={seedmemo}
              numberOfLines={6}
            />
          </View>
          <View style={seg === 'rising' ? styles.view : styles.nodisp}>
            <Text>日光強弱</Text>
            <View style={styles.rowview}>
              <Button
                mode={nikkou === 1 ? 'contained-tonal' : 'elevated'}
                onPress={() => setNikkou(1)}>
                強
              </Button>
              <Button
                mode={nikkou === 2 ? 'contained-tonal' : 'elevated'}
                onPress={() => setNikkou(2)}>
                稍強
              </Button>
              <Button
                mode={nikkou === 3 ? 'contained-tonal' : 'elevated'}
                onPress={() => setNikkou(3)}>
                普通
              </Button>
              <Button
                mode={nikkou === 4 ? 'contained-tonal' : 'elevated'}
                onPress={() => setNikkou(4)}>
                稍弱
              </Button>
              <Button
                mode={nikkou === 5 ? 'contained-tonal' : 'elevated'}
                onPress={() => setNikkou(5)}>
                弱
              </Button>
            </View>
            <Divider />
            <Text>水やり</Text>
            <View style={styles.rowview}>
              <Button
                mode={mizuyari === 1 ? 'contained-tonal' : 'elevated'}
                onPress={() => setMizuyari(1)}>
                多
              </Button>
              <Button
                mode={mizuyari === 2 ? 'contained-tonal' : 'elevated'}
                onPress={() => setMizuyari(2)}>
                稍多
              </Button>
              <Button
                mode={mizuyari === 3 ? 'contained-tonal' : 'elevated'}
                onPress={() => setMizuyari(3)}>
                普通
              </Button>
              <Button
                mode={mizuyari === 4 ? 'contained-tonal' : 'elevated'}
                onPress={() => setMizuyari(4)}>
                稍少
              </Button>
              <Button
                mode={mizuyari === 5 ? 'contained-tonal' : 'elevated'}
                onPress={() => setMizuyari(5)}>
                少
              </Button>
            </View>
            <Divider />
            <Text>乾燥強弱</Text>
            <View style={styles.rowview}>
              <Button
                mode={kansou === 1 ? 'contained-tonal' : 'elevated'}
                onPress={() => setKansou(1)}>
                強
              </Button>
              <Button
                mode={kansou === 2 ? 'contained-tonal' : 'elevated'}
                onPress={() => setKansou(2)}>
                稍強
              </Button>
              <Button
                mode={kansou === 3 ? 'contained-tonal' : 'elevated'}
                onPress={() => setKansou(3)}>
                普通
              </Button>
              <Button
                mode={kansou === 4 ? 'contained-tonal' : 'elevated'}
                onPress={() => setKansou(4)}>
                稍弱
              </Button>
              <Button
                mode={kansou === 5 ? 'contained-tonal' : 'elevated'}
                onPress={() => setKansou(5)}>
                弱
              </Button>
            </View>
            <Divider />
            <Text>湿気強弱</Text>
            <View style={styles.rowview}>
              <Button
                mode={shikke === 1 ? 'contained-tonal' : 'elevated'}
                onPress={() => setShikke(1)}>
                強
              </Button>
              <Button
                mode={shikke === 2 ? 'contained-tonal' : 'elevated'}
                onPress={() => setShikke(2)}>
                稍強
              </Button>
              <Button
                mode={shikke === 3 ? 'contained-tonal' : 'elevated'}
                onPress={() => setShikke(3)}>
                普通
              </Button>
              <Button
                mode={shikke === 4 ? 'contained-tonal' : 'elevated'}
                onPress={() => setShikke(4)}>
                稍弱
              </Button>
              <Button
                mode={shikke === 5 ? 'contained-tonal' : 'elevated'}
                onPress={() => setShikke(5)}>
                弱
              </Button>
            </View>
            <Divider />
            <Text>寒さ強弱</Text>
            <View style={styles.rowview}>
              <Button
                mode={samusa === 1 ? 'contained-tonal' : 'elevated'}
                onPress={() => setSamusa(1)}>
                強
              </Button>
              <Button
                mode={samusa === 2 ? 'contained-tonal' : 'elevated'}
                onPress={() => setSamusa(2)}>
                稍強
              </Button>
              <Button
                mode={samusa === 3 ? 'contained-tonal' : 'elevated'}
                onPress={() => setSamusa(3)}>
                普通
              </Button>
              <Button
                mode={samusa === 4 ? 'contained-tonal' : 'elevated'}
                onPress={() => setSamusa(4)}>
                稍弱
              </Button>
              <Button
                mode={samusa === 5 ? 'contained-tonal' : 'elevated'}
                onPress={() => setSamusa(5)}>
                弱
              </Button>
            </View>
            <Divider />
            <Text>暑さ強弱</Text>
            <View style={styles.rowview}>
              <Button
                mode={atsusa === 1 ? 'contained-tonal' : 'elevated'}
                onPress={() => setAtsusa(1)}>
                強
              </Button>
              <Button
                mode={atsusa === 2 ? 'contained-tonal' : 'elevated'}
                onPress={() => setAtsusa(2)}>
                稍強
              </Button>
              <Button
                mode={atsusa === 3 ? 'contained-tonal' : 'elevated'}
                onPress={() => setAtsusa(3)}>
                普通
              </Button>
              <Button
                mode={atsusa === 4 ? 'contained-tonal' : 'elevated'}
                onPress={() => setAtsusa(4)}>
                稍弱
              </Button>
              <Button
                mode={atsusa === 5 ? 'contained-tonal' : 'elevated'}
                onPress={() => setAtsusa(5)}>
                弱
              </Button>
            </View>
            <Divider />
            <Text>育苗メモ（できれば日付で管理したい）</Text>
            <TextInput
              style={{marginBottom: 0, height: 70}}
              label="育苗メモ"
              multiline
              onChangeText={text => setRisingmemo(text)}
              value={risingmemo}
              numberOfLines={2}
            />
          </View>
          <View style={seg === 'plant' ? styles.view : styles.nodisp}>
            <Text>植栽画面</Text>
            <View style={styles.rowview}>
              <Button
                mode={youin === 1 ? 'contained-tonal' : 'elevated'}
                onPress={() => setYouin(1)}>
                陽
              </Button>
              <Button
                mode={youin === 2 ? 'contained-tonal' : 'elevated'}
                onPress={() => setYouin(2)}>
                中
              </Button>
              <Button
                mode={youin === 3 ? 'contained-tonal' : 'elevated'}
                onPress={() => setYouin(1)}>
                陰
              </Button>
            </View>
            <Divider />
            <View style={styles.rowview}>
              <Button
                mode={height === 1 ? 'contained-tonal' : 'elevated'}
                onPress={() => setHeight(1)}>
                高
              </Button>
              <Button
                mode={height === 2 ? 'contained-tonal' : 'elevated'}
                onPress={() => setHeight(2)}>
                小高
              </Button>
              <Button
                mode={height === 3 ? 'contained-tonal' : 'elevated'}
                onPress={() => setHeight(3)}>
                低
              </Button>
              <Button
                mode={height === 4 ? 'contained-tonal' : 'elevated'}
                onPress={() => setHeight(4)}>
                つる
              </Button>
            </View>
            <Divider />
            <Text>気候帯</Text>
            <View style={styles.rowview}>
              <Button
                compact
                mode={kikou === 1 ? 'contained-tonal' : 'elevated'}
                onPress={() => setKikou(1)}>
                亜熱帯
              </Button>
              <Button
                compact
                mode={kikou === 2 ? 'contained-tonal' : 'elevated'}
                onPress={() => setKikou(2)}>
                暖温帯
              </Button>
              <Button
                compact
                mode={kikou === 3 ? 'contained-tonal' : 'elevated'}
                onPress={() => setKikou(3)}>
                冷温帯
              </Button>
              <Button
                compact
                mode={kikou === 4 ? 'contained-tonal' : 'elevated'}
                onPress={() => setKikou(4)}>
                亜高山帯
              </Button>
              <Button
                compact
                mode={kikou === 5 ? 'contained-tonal' : 'elevated'}
                onPress={() => setKikou(5)}>
                高山帯
              </Button>
            </View>
            <Divider />
            <Text>生息環境</Text>
            <View style={styles.rowview}>
              <Button
                compact
                mode={seisoku & 1 ? 'contained-tonal' : 'elevated'}
                onPress={() =>
                  seisoku & 1
                    ? setSeisoku(seisoku - 1)
                    : setSeisoku(seisoku + 1)
                }>
                丘陵
              </Button>
              <Button
                compact
                mode={seisoku & 2 ? 'contained-tonal' : 'elevated'}
                onPress={() =>
                  seisoku & 2
                    ? setSeisoku(seisoku - 2)
                    : setSeisoku(seisoku + 2)
                }>
                山地
              </Button>
              <Button
                compact
                mode={seisoku & 4 ? 'contained-tonal' : 'elevated'}
                onPress={() =>
                  seisoku & 4
                    ? setSeisoku(seisoku - 4)
                    : setSeisoku(seisoku + 4)
                }>
                尾根
              </Button>
              <Button
                compact
                mode={seisoku & 8 ? 'contained-tonal' : 'elevated'}
                onPress={() =>
                  seisoku & 8
                    ? setSeisoku(seisoku - 8)
                    : setSeisoku(seisoku + 8)
                }>
                谷沿
              </Button>
              <Button
                compact
                mode={seisoku & 16 ? 'contained-tonal' : 'elevated'}
                onPress={() =>
                  seisoku & 16
                    ? setSeisoku(seisoku - 16)
                    : setSeisoku(seisoku + 16)
                }>
                湿地
              </Button>
              <Button
                compact
                mode={seisoku & 32 ? 'contained-tonal' : 'elevated'}
                onPress={() =>
                  seisoku & 32
                    ? setSeisoku(seisoku - 32)
                    : setSeisoku(seisoku + 32)
                }>
                乾燥地
              </Button>
              <Button
                compact
                mode={seisoku & 64 ? 'contained-tonal' : 'elevated'}
                onPress={() =>
                  seisoku & 64
                    ? setSeisoku(seisoku - 64)
                    : setSeisoku(seisoku + 64)
                }>
                林内
              </Button>
              <Button
                compact
                mode={seisoku & 128 ? 'contained-tonal' : 'elevated'}
                onPress={() =>
                  seisoku & 128
                    ? setSeisoku(seisoku - 128)
                    : setSeisoku(seisoku + 128)
                }>
                林縁
              </Button>
            </View>
            <View style={styles.rowview}>
              <Button
                compact
                mode={seisoku & 256 ? 'contained-tonal' : 'elevated'}
                onPress={() =>
                  seisoku & 256
                    ? setSeisoku(seisoku - 256)
                    : setSeisoku(seisoku + 256)
                }>
                岩場
              </Button>
              <Button
                compact
                mode={seisoku & 512 ? 'contained-tonal' : 'elevated'}
                onPress={() =>
                  seisoku & 512
                    ? setSeisoku(seisoku - 512)
                    : setSeisoku(seisoku + 512)
                }>
                河原
              </Button>
              <Button
                compact
                mode={seisoku & 1024 ? 'contained-tonal' : 'elevated'}
                onPress={() =>
                  seisoku & 1024
                    ? setSeisoku(seisoku - 1024)
                    : setSeisoku(seisoku + 1024)
                }>
                道端
              </Button>
              <Button
                compact
                mode={seisoku & 2048 ? 'contained-tonal' : 'elevated'}
                onPress={() =>
                  seisoku & 2048
                    ? setSeisoku(seisoku - 2048)
                    : setSeisoku(seisoku + 2048)
                }>
                荒地
              </Button>
              <Button
                compact
                mode={seisoku & 4096 ? 'contained-tonal' : 'elevated'}
                onPress={() =>
                  seisoku & 4096
                    ? setSeisoku(seisoku - 4096)
                    : setSeisoku(seisoku + 4096)
                }>
                日向
              </Button>
              <Button
                compact
                mode={seisoku & 8192 ? 'contained-tonal' : 'elevated'}
                onPress={() =>
                  seisoku & 8192
                    ? setSeisoku(seisoku - 8192)
                    : setSeisoku(seisoku + 8192)
                }>
                日陰
              </Button>
            </View>
            <Text>標高</Text>
            <View style={styles.rowview}>
              <TextInput
                label="標高"
                value={hyoukouf}
                onChangeText={text => setHyoukouf(text)}
                style={{width: 85, textAlign: 'right', height: 50}}
                maxLength={5}
              />
              <Text>〜</Text>
              <TextInput
                label="標高"
                value={hyoukout}
                onChangeText={text => setHyoukout(text)}
                style={{width: 85, textAlign: 'right', height: 50}}
                maxLength={5}
              />
            </View>
            <Text>植栽記録（できれば日付で管理したい）</Text>
            <TextInput
              style={{marginBottom: 0, height: 90}}
              label="植栽記録"
              multiline
              onChangeText={text => setPlantmemo(text)}
              value={plantmemo}
              numberOfLines={3}
            />
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
    marginTop: 3,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0,
  },
  radiobutton: {
    width: 100,
    height: 50,
  },
  nodisp: {
    display: 'none',
  },
});
