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
  FAB,
  IconButton,
} from 'react-native-paper';
import {useNavigation, useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {AUD} from '../AUD';
import {Naegi} from '../Naegi';

export default function MemoEditScreen(): JSX.Element {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(1);
  const [memo, setMemo] = useState('');

  return (
    <PaperProvider>
      <Text>MemoEditScreen</Text>
      <View>
        <TextInput
          style={{marginBottom: 3, height: 50}}
          // placeholder="樹種名"
          label="タイトル"
          onChangeText={text => setTitle(text)}
          value={title}
          mode={'outlined'}
        />
      </View>
      <Divider />
      <Text>カテゴリー</Text>
      <View style={styles.rowview}>
        <Button
          compact
          mode={category === 1 ? 'contained-tonal' : 'elevated'}
          onPress={() => setCategory(1)}>
          全般
        </Button>
        <Button
          compact
          mode={category === 2 ? 'contained-tonal' : 'elevated'}
          onPress={() => setCategory(2)}>
          種
        </Button>
        <Button
          compact
          mode={category === 3 ? 'contained-tonal' : 'elevated'}
          onPress={() => setCategory(3)}>
          育苗
        </Button>
        <Button
          compact
          mode={category === 4 ? 'contained-tonal' : 'elevated'}
          onPress={() => setCategory(4)}>
          植栽
        </Button>
      </View>
      <Divider />
      <TextInput
        style={{marginBottom: 3, height: 380}}
        label="内容"
        onChangeText={text => setMemo(text)}
        value={memo}
        mode={'outlined'}
        multiline
      />
      <FAB
        style={{
          position: 'absolute',
          right: 16,
          bottom: 16,
        }}
        icon="plus"
        // onPress={onPressAdd}
      />
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
