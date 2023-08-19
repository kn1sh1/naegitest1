import {StyleSheet, Text, View} from 'react-native';
import {
  PaperProvider,
  TextInput,
  Divider,
  Button,
  Card,
} from 'react-native-paper';
import React, {useEffect, useState} from 'react';
import {Count} from '../Count';

const CountView: React.FunctionComponent<{
  item: Count;
}> = ({item}) => {
  const [allTotal, setAllTotal] = useState(0);
//   const [cc150, setCc150] = useState();
//   const [cc300, setCc150] = useState();
//   const [c24, setC24] = useState();
//   const [c40, setC40] = useState();
//   const [pot, setPot] = useState();
//   useEffect(() => {

//   }, []);

  return (
    <PaperProvider>
      <Text style={styles.title}>{item.key}</Text>
      <View style={styles.cardcon}>
        <TextInput
          style={{paddingLeft: 0, width: 100}}
          label="ポット"
          maxLength={5}
          inputMode="numeric"
          value={item.pot.toString()}
          onChangeText={text => (item.pot = parseInt(text, 10))}
        />
        <Text>株</Text>
      </View>
      <View style={styles.cardcon}>
        <Text>40穴</Text>
        <TextInput
          style={{paddingLeft: 0, width: 100}}
          label="コンテナ"
          maxLength={5}
          inputMode="numeric"
          value={item.c40.toString()}
          onChangeText={text => (item.c40 = parseInt(text, 10))}
        />
        <Text>=</Text>
        <TextInput
          style={{paddingLeft: 0, width: 100}}
          label="150cc"
          maxLength={5}
          inputMode="numeric"
          value={item.cc150.toString()}
          onChangeText={text => (item.cc150 = parseInt(text, 10))}
        />
        <Text>株</Text>
      </View>
      <View style={styles.cardcon}>
        <Text>24穴</Text>
        <TextInput
          style={{paddingLeft: 0, width: 100}}
          label="コンテナ"
          maxLength={5}
          inputMode="numeric"
          value={item.c24.toString()}
          onChangeText={text => (item.c24 = parseInt(text, 10))}
        />
        <Text>=</Text>
        <TextInput
          style={{paddingLeft: 0, width: 100}}
          label="300cc"
          maxLength={5}
          inputMode="numeric"
          value={item.cc300.toString()}
          onChangeText={text => (item.cc300 = parseInt(text, 10))}
        />
        <Text>株</Text>
      </View>
      <Divider />
      <Text>合計</Text>
      <Text>3000株</Text>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  divider: {
    marginTop: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 32,
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
    marginBottom: 5,
    marginRight: 5,
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
