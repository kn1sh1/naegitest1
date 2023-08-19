import {StyleSheet, Text, View} from 'react-native';
import {
  PaperProvider,
  TextInput,
  Divider,
  Button,
  Card,
  IconButton,
  MD3Colors,
} from 'react-native-paper';
import React, {useEffect, useState} from 'react';
import {Count} from '../Count';
import {AllTotal} from '../AllTotal';

const CountView: React.FunctionComponent<{
  item: Count;
  alltotal: AllTotal;
}> = ({item, alltotal}) => {
  const [cc150, setCc150] = useState('');
  const [cc300, setCc300] = useState('');
  const [c24, setC24] = useState('');
  const [c40, setC40] = useState('');
  const [pot, setPot] = useState('');
  const [total, setTotal] = useState(0);
  const [pretotal, setPreTotal] = useState(0);
//   const [at, setAt] = useState(0);

  useEffect(() => {
    console.log('useEffect2');
    setPreTotal(item.total);
    setCc150(item.cc150.toString());
    setCc300(item.cc300.toString());
    setC24(item.c24.toString());
    setC40(item.c40.toString());
    setPot(item.pot.toString());
    let t =
      parseInt(item.cc150.toString(), 10) +
      parseInt(item.cc300.toString(), 10) +
      parseInt(item.pot.toString(), 10);
    setTotal(t);
    item.total = t;
    if (pretotal !== total) {
      let diff = total - pretotal;
      alltotal.alltotal += diff;
    }
  }, [
    item.c24,
    item.c40,
    item.cc150,
    item.cc300,
    item.pot,
    alltotal.alltotal,
    total,
    pretotal,
    alltotal,
    item.total,
    item,
  ]);

  return (
    <PaperProvider>
      <Text style={styles.title}>{item.key}</Text>
      <View style={styles.cardcon}>
        <TextInput
          style={{paddingLeft: 0, width: 100}}
          keyboardType="number-pad"
          label="ポット"
          maxLength={5}
          inputMode="numeric"
          value={pot.toString()}
          onChangeText={text => {
            let t = text;
            if (Number.isNaN(parseInt(text, 10))) {
              t = '0';
            }
            setPot(t);
            // TODO なぜitemだけで処理できないのか？useStateが関係ある？
            item.pot = parseInt(t, 10);
          }}
          onFocus={() => {
            // TODO あんまりコロコロ値変えるのはバグの元やね・・・
            // setPrepot(pot);
          }}
          onEndEditing={() => {
            // let diff = parseInt(pot, 10) - parseInt(prepot, 10);
            // item.total += diff;
            // setTotal(total + diff);
            // allTotal.alltotal += diff;
            // console.log('allTotal = ' + allTotal.alltotal);
          }}
        />
        <Text>株</Text>
      </View>
      <View style={styles.cardcon}>
        <Text>40穴</Text>
        <TextInput
          style={{paddingLeft: 0, width: 100}}
          keyboardType="number-pad"
          label="コンテナ"
          maxLength={5}
          inputMode="numeric"
          value={c40}
          onChangeText={text => {
            let t = text;
            if (Number.isNaN(parseInt(text, 10))) {
              t = '0';
            }
            setC40(t);
            // TODO なぜitemだけで処理できないのか？useStateが関係ある？
            item.c40 = parseInt(t, 10);
          }}
          onFocus={() => {
            console.log('Focus');
            // TODO あんまりコロコロ値変えるのはバグの元やね・・・
            // setPrec40(c40);
          }}
          onEndEditing={() => {
            console.log('EndEdit');
            // let diff = (parseInt(c40, 10) - parseInt(prec40, 10)) * 40;
            // setCc150((parseInt(cc150, 10) + diff).toString());
          }}
        />
        <IconButton
          icon="equal"
          iconColor={MD3Colors.secondary50}
          size={20}
          mode={'contained-tonal'}
          onPress={() => {
            let mul40 = item.c40 * 40;
            setCc150(mul40.toString());
            item.cc150 = mul40;
          }}
        />
        <TextInput
          style={{paddingLeft: 0, width: 100}}
          keyboardType="number-pad"
          label="150cc"
          maxLength={5}
          inputMode="numeric"
          value={cc150}
          onChangeText={text => {
            let t = text;
            if (Number.isNaN(parseInt(text, 10))) {
              t = '0';
            }
            setCc150(t);
            // TODO なぜitemだけで処理できないのか？useStateが関係ある？
            item.cc150 = parseInt(t, 10);
          }}
          onFocus={() => {
            // TODO あんまりコロコロ値変えるのはバグの元やね・・・
            // setPrec40(c40);
            // setPrecc150(cc150);
          }}
          onEndEditing={() => {
            // let diff = parseInt(cc150, 10) - parseInt(precc150, 10);
            // item.total = item.total + diff;
            // setTotal(total + diff);
          }}
        />
        <Text>株</Text>
      </View>
      <View style={styles.cardcon}>
        <Text>24穴</Text>
        <TextInput
          style={{paddingLeft: 0, width: 100}}
          keyboardType="number-pad"
          label="コンテナ"
          maxLength={5}
          inputMode="numeric"
          value={c24}
          onChangeText={text => {
            let t = text;
            if (Number.isNaN(parseInt(text, 10))) {
              t = '0';
            }
            setC24(t);
            // TODO なぜitemだけで処理できないのか？useStateが関係ある？
            item.c24 = parseInt(t, 10);
          }}
        />
        <IconButton
          icon="equal"
          iconColor={MD3Colors.secondary50}
          size={20}
          mode={'contained-tonal'}
          onPress={() => {
            let mul24 = item.c24 * 24;
            setCc300(mul24.toString());
            item.cc300 = mul24;
          }}
        />
        <TextInput
          style={{paddingLeft: 0, width: 100}}
          keyboardType="number-pad"
          label="300cc"
          maxLength={5}
          inputMode="numeric"
          value={cc300}
          onChangeText={text => {
            let t = text;
            if (Number.isNaN(parseInt(text, 10))) {
              t = '0';
            }
            setCc300(t);
            item.cc300 = parseInt(t, 10);
          }}
          onFocus={() => {
            // TODO あんまりコロコロ値変えるのはバグの元やね・・・
            // setPrec40(c40);
            // setPrecc300(cc300);
          }}
          onEndEditing={() => {
            // let diff = parseInt(cc300, 10) - parseInt(precc300, 10);
            // item.total = item.total + diff;
            // setTotal(total + diff);
          }}
        />
        <Text>株</Text>
      </View>
      <Divider />
      <View style={styles.total}>
        <Text>合計</Text>
        <Text>{total}</Text>
        <Text>株</Text>
      </View>
      <View style={styles.total}>
        <Text>総計</Text>
        <Text>{alltotal.alltotal}</Text>
        <Text>株</Text>
      </View>
      <Divider />

      <Divider />
      {/* <View style={styles.total}>
        <Text>総計</Text>
        <Text>{allTotal}</Text>
        <Text>株</Text>
      </View> */}
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  divider: {
    marginTop: 10,
    marginBottom: 15,
  },
  title: {
    // fontSize: 32,
  },
  label: {
    fontSize: 18,
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
    // marginBottom: 5,
    // marginRight: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  total: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CountView;

//   <Card style={styles.card}>
//     <Text style={styles.title}>23'</Text>
//     <Card.Content style={styles.cardcon}>
//       <Text style={styles.label}>40</Text>
//       <TextInput
//         style={{paddingLeft: 0, width: 100}}
//         label="コンテナ"
//         maxLength={5}
//         inputMode="numeric"
//       />
//       <Text style={styles.label}>=</Text>
//       <TextInput
//         style={{paddingLeft: 0, width: 100}}
//         label="150cc"
//         maxLength={5}
//         inputMode="numeric"
//       />
//       <Text style={styles.label}>株</Text>
//     </Card.Content>
//     <Card.Content style={styles.cardcon}>
//       <Text style={styles.label}>24</Text>
//       <TextInput
//         style={{paddingLeft: 0, width: 100}}
//         label="コンテナ"
//         maxLength={5}
//         inputMode="numeric"
//       />
//       <Text style={styles.label}>=</Text>
//       <TextInput
//         style={{marginBottom: 0, width: 100}}
//         label="300cc"
//         maxLength={5}
//         inputMode="numeric"
//       />
//       <Text style={styles.label}>株</Text>
//     </Card.Content>
//     <Card.Content style={styles.cardcon}>
//       <TextInput
//         style={{marginBottom: 0, width: 100}}
//         label="ポット"
//         maxLength={5}
//         inputMode="numeric"
//       />
//       <Text style={styles.label}>株</Text>
//     </Card.Content>
//     <Divider style={styles.divider} />
//     <Card.Content style={styles.cardcon}>
/* <TextInput
        style={{marginBottom: 0, width: 100, textAlign: 'left'}}
        label="小計"
        maxLength={5}
        inputMode="numeric"
        /> */
//   <Text>合計</Text>
//   <Text>3000</Text>
//   <Text style={styles.label}>株</Text>
//     </Card.Content>
//   </Card>
