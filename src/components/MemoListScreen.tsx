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
import { Timestamp } from 'react-native-reanimated';

type Memo = {
  id: number;
  category: number;
  memo: string;
  createat: Timestamp;
  updateat: Timestamp;
};

export default function MemoListScreen(): JSX.Element {
  const [memos, setMemos] = useState(Array<Memo>);
  const navigation = useNavigation();

  useEffect(() => {
    const initialize = async () => {
      console.log('init');
      let a: Memo = {
        id: 1,
        category: 1,
        memo: 'testtest',
        createat: Date.now(),
        updateat: Date.now(),
      };
      let b: Memo = {
        id: 2,
        memo: 'dsjdajfoajsfakjsofjaojfjijfijfljlwjfew',
        createat: Date.now(),
        updateat: Date.now(),
        category: 1,
      };
      if (memos.length === 0) {
        memos.push(a);
        memos.push(b);
      }
    };
    const unsubscribe = navigation.addListener('focus', initialize);
    return unsubscribe;
  }, [memos, navigation]);

  const onPressEdit = (id: string) => {
    navigation.navigate('MemoEdit', id);
  };

  const onPressAdd = () => {
    navigation.navigate('MemoEdit');
  };

  return (
    <PaperProvider>
      <View>
        <Text>MemoListScreen</Text>
        <FlatList
          data={memos}
          keyExtractor={item => `${item.id}`}
          renderItem={({item}) => {
            return (
              <View style={styles.memoContainer}>
                <List.Item
                  title={item.memo}
                  titleStyle={styles.memoTitle}
                  style={styles.list}
                  titleNumberOfLines={1}
                  description={`テスト\n最終更新日時:${item.updateat}`}
                  descriptionStyle={{
                    textAlign: 'right',
                    fontSize: 12,
                  }}
                  onPress={() => {
                    onPressEdit(item.id.toString());
                  }}
                  onLongPress={() => {
                    console.log('long press');
                  }}
                />
              </View>
            );
          }}
        />
      </View>
      <FAB
        style={{
          position: 'absolute',
          right: 16,
          bottom: 16,
        }}
        icon="plus"
        onPress={onPressAdd}
      />
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
});
