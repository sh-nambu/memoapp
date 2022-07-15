import Storage from "react-native-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Memo } from "../types/types";

const storage: Storage = new Storage({
  // 最大容量
  size: 1000,
  // バックエンドにAsyncStorageを使う
  storageBackend: AsyncStorage,
  // キャッシュ期限(null=期限なし)
  defaultExpires: null,
  // メモリにキャッシュするかどうか
  enableCache: true,
});

export const save = async (memo: Memo) => {
  return await storage.save({
    key: "memo",
    id: memo.id,
    data: {
      id: memo.id,
      text: memo.text,
      createdAt: memo.createdAt,
    },
  });
};

export const load = async (id: string): Promise<Memo> => {
  return await storage.load({
    key: "memo",
    id: id,
  });
};

export const loadAll = async (): Promise<Memo[]> => {
  const memos = await storage.getAllDataForKey("memo");
  // 日付が新しい順
  return memos.sort((first, second) => second.createdAt - first.createdAt);
};

export const remove = async (id: string) => {
  return await storage.remove({
    key: "memo",
    id: id,
  });
};
