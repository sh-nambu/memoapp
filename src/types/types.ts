/**
 * メモ.
 * @param id id
 * @param text メモ
 * @param createAt 作成日時
 */
export type Memo = {
  id: string;
  text: string;
  createdAt: number;
};

/**
 * 画面.
 * @param Main メモ帳画面
 * @param Composn メモ作成画面
 */
export type StackParamList = {
  Main: undefined;
  Compose: { id: string | undefined };
};
