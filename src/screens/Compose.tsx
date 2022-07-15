import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { StackScreenProps } from "@react-navigation/stack";
import { StackParamList } from "../types/types";
import { load, save } from "../model/store";
import { showAlert, showErrorAlert } from "../util/Alert";

type NavigationProps = StackScreenProps<StackParamList, "Compose">;

export const Compose: React.FC<NavigationProps> = ({ route, navigation }) => {
  const { id } = route.params;
  const [text, setText] = useState("");

  useEffect(() => {
    if (id) {
      // 引数で受け取ったidのメモをストレージから取得する
      load(id)
        .then((result) => {
          setText(result.text);
        })
        .catch((error: unknown) => {
          console.error(error);
          showErrorAlert("エラーが発生しました。もう一度お試しください。");
        });
    } else {
      setText("");
    }
  }, [id]);

  /**
   * メモ保存処理.
   */
  const onPressSave = () => {
    const date = new Date().getTime();
    save({
      id: id ?? String(date),
      text: text,
      createdAt: date,
    })
      .then(() => {
        console.log(`save successfull id:${id}`);
        // 保存成功ダイアログを表示する
        showAlert(
          "メモを保存しました",
          "OK",
          () => navigation.goBack() // 前の画面に戻る
        );
      })
      .catch((error: unknown) => {
        console.error(error);
        showErrorAlert("エラーが発生しました。もう一度お試しください。");
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View>
        <TextInput
          mode="outlined"
          style={styles.inputText}
          placeholder="入力してください"
          value={text}
          multiline
          onChangeText={(text) => setText(text)}
        />
        <Button mode="contained" disabled={!text} onPress={onPressSave}>
          保存する
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 12,
  },
  inputText: {
    marginBottom: 16,
  },
});
