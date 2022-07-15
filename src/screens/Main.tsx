import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import { Divider, FAB } from "react-native-paper";
import { MemoItem } from "../components/MemoItem";
import { loadAll, save } from "../model/store";
import { Memo, StackParamList } from "../types/types";
import { showErrorAlert } from "../util/Alert";

type NavigationProps = StackScreenProps<StackParamList, "Main">;

export const Main: React.FC<NavigationProps> = ({ navigation }) => {
  const [memos, setMemos] = useState<Memo[]>([]);

  useEffect(() => {
    // 戻ってきた時も再取得されるように、Listenerで更新するようにする
    const unsubscribe = navigation.addListener("focus", async () => {
      await loadAll()
        .then((result) => {
          console.log(`load all successfull:${JSON.stringify(result)}`);
          setMemos(result);
        })
        .catch((error: unknown) => {
          console.error(error);
          showErrorAlert("エラーが発生しました。もう一度お試しください。");
        });
    });
    return unsubscribe;
  }, [navigation]);

  type Props = {
    item: Memo;
  };
  const renderItem: React.FC<Props> = ({ item }) => {
    return (
      <View style={styles.container}>
        <MemoItem
          item={item}
          onPress={() =>
            navigation.navigate("Compose", {
              id: item.id,
            })
          }
        />
        <Divider />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.list}
        data={memos}
        renderItem={renderItem}
        keyExtractor={(memo) => memo.id}
      />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() =>
          navigation.navigate("Compose", {
            id: undefined,
          })
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 12,
  },
  list: {
    flex: 1,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
