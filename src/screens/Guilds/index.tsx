import React from "react";

import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Guild, GuildProps } from "../../components/Guild";
import { ListDivider } from "../../components/ListDivider";

import { styles } from "./styles";

type Props = {
  handleGuildsSelect: (guild: GuildProps) => void;
};

export function Guilds({ handleGuildsSelect }: Props) {
  const guilds = [
    {
      id: "1",
      name: "Lendários",
      icon: "icon.png",
      owner: true,
    },
    {
      id: "2",
      name: "Amigos Do Neymar",
      icon: "icon.png",
      owner: true,
    },
    {
      id: "3",
      name: "Indianos",
      icon: "icon.png",
      owner: true,
    },
    {
      id: "4",
      name: "Burgueses",
      icon: "icon.png",
      owner: true,
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={guilds}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Guild data={item} onPress={() => handleGuildsSelect(item)} />}
        contentContainerStyle={{ paddingBottom: 69, paddingTop: 103 }}
        ItemSeparatorComponent={() => <ListDivider isCentered />}
        ListHeaderComponent={() => <ListDivider isCentered />}
        style={styles.guilds}
      />
    </View>
  );
}
