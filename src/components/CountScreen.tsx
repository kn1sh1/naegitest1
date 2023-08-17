import {StyleSheet, Text} from 'react-native';
import {
  PaperProvider,
  TextInput,
  Divider,
  Button,
  Card,
} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

export default function CountScreen(): JSX.Element {
  const navigation = useNavigation();

  const onPressSave = () => {
    navigation.goBack();
  };

  return (
    <PaperProvider>
      <Card style={styles.card}>
        <Text style={styles.title}>2023'</Text>
        <Card.Content style={styles.cardcon}>
          <Text style={styles.label}>40</Text>
          <TextInput
            style={{paddingLeft: 0, width: 100}}
            label="コンテナ"
            placeholder="コンテナ"
            maxLength={5}
            inputMode="numeric"
          />
          <Text style={styles.label}>=</Text>
          <TextInput
            style={{paddingLeft: 0, width: 100}}
            label="150cc"
            placeholder="150cc"
            maxLength={5}
            inputMode="numeric"
          />
          <Text style={styles.label}>株</Text>
        </Card.Content>
        <Card.Content style={styles.cardcon}>
          <Text style={styles.label}>24</Text>
          <TextInput
            style={{paddingLeft: 0, width: 100}}
            label="コンテナ"
            placeholder="コンテナ"
            maxLength={5}
            inputMode="numeric"
          />
          <Text style={styles.label}>=</Text>
          <TextInput
            style={{marginBottom: 0, width: 100}}
            label="300cc"
            placeholder="300cc"
            maxLength={5}
            inputMode="numeric"
          />
          <Text style={styles.label}>株</Text>
        </Card.Content>
        <Card.Content style={styles.cardcon}>
          <TextInput
            style={{marginBottom: 0, width: 100}}
            label="ポット"
            placeholder="ポット"
            maxLength={5}
            inputMode="numeric"
          />
          <Text style={styles.label}>株</Text>
        </Card.Content>
        <Divider style={styles.divider} />
        <Card.Content style={styles.cardcon}>
          <TextInput
            style={{marginBottom: 0, width: 100, textAlign: 'left'}}
            label="小計"
            placeholder="小計"
            maxLength={5}
            inputMode="numeric"
          />
          <Text style={styles.label}>株</Text>
        </Card.Content>
      </Card>
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
