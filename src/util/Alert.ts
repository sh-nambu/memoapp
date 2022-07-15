import { Alert, AlertButton } from "react-native";

/**
 * 通常ダイアログ.
 * @param message メッセージ
 * @param positiveButton ポジティブボタン
 * @param onPositive　ポジティブボタン押下時処理
 * @param negativeButton ネガティブボタン
 * @param onNegative ネガティブボタン押下時処理
 */
export const showAlert = (
  message: string,
  positiveButton: string,
  onPositive: () => void,
  negativeButton?: string,
  onNegative?: () => void,) => {
  const buttons: AlertButton[] = [
    {
      text: positiveButton,
      onPress: onPositive,
    },
  ];
  if (negativeButton != null) {
    buttons.unshift({
      text: negativeButton,
      onPress: onNegative,
      style: "cancel",
    });
  }
  Alert.alert("", message, buttons);
};

/**
 * エラーダイアログ.
 * @param message メッセージ
 * @param onPress ボタン押下時処理
 */
export const showErrorAlert = (  message: string,
  onPress?: () => void) => {
  Alert.alert("", message, [
    {
      text: "OK",
      onPress: onPress,
      style: "cancel",
    },
  ]);
};
