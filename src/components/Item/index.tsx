import { Text, TouchableOpacity, View } from "react-native";
import {Trash2} from "lucide-react-native";
import { styles } from "./styles";
import { StatusIcon } from "../StatusIcon";
import { FilterStatus } from "@/types/FilterStatus";

type ItemData = {
  status: FilterStatus;
  description: string;
}

type Props = {
  data: ItemData;
  onRemove: () => void;
  onChangeStatus: () => void;
}

export function Item({data, onChangeStatus, onRemove}: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.7} onPress={onChangeStatus}>
        <StatusIcon status={data.status} />
      </TouchableOpacity>

      <Text style={styles.description}>
        {data.description}
      </Text>

      <TouchableOpacity activeOpacity={0.7} onPress={onRemove}>
        <Trash2 size={18} color="#828282" />
      </TouchableOpacity>
    </View>
  );
}