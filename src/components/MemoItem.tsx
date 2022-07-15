import { format } from "date-fns";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Caption, Subheading } from "react-native-paper";
import { Memo } from "../types/types";

type Props = { item: Memo; onPress: () => void };
export const MemoItem: React.FC<Props> = ({ item, onPress }) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <Subheading numberOfLines={5}>{item.text}</Subheading>
    <Caption style={styles.caption}>
      更新日時：{format(item.createdAt, "yyyy.MM.dd HH:mm")}
    </Caption>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    margin: 8,
  },
  caption: {
    alignSelf: "flex-end",
  },
});
