import React, { useState, useCallback } from "react";
import { View, Text } from "react-native";

import { styles } from "./styles";
import { FlatList } from "react-native-gesture-handler";

import { Profile } from "../../components/Profile";
import { Load } from "../../components/Load";
import { ButtonAdd } from "../../components/ButtonAdd";
import { CategorySelect } from "../../components/CategorySelect";
import { ListHeader } from "../../components/ListHeader";
import { Appointment, AppointmentProps } from "../../components/Appointment";
import { ListDivider } from "../../components/ListDivider";
import { Background } from "../../components/Background";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { COLLECTION_APPOINTMENTS } from "../../configs/database";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Home() {
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState<AppointmentProps[]>([]);

  const navigation = useNavigation();

  function handleCategorySelect(categoryId: string) {
    categoryId === category ? setCategory("") : setCategory(categoryId);
  }

  function handleAppointmentDetails(guildSelected: AppointmentProps) {
    navigation.navigate("AppointmentDetails", { guildSelected });
  }

  function handleAppointmentCreate() {
    navigation.navigate("AppointmentCreate");
  }

  async function loadAppointments() {
    const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
    const storage: AppointmentProps[] = response ? JSON.parse(response) : [];

    if (category) {
      setAppointments(appointments.filter((item) => item.category === category));
    } else {
      setAppointments(appointments);
    }

    setLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      loadAppointments();
    }, [category])
  );

  return (
    <Background>
      <View style={styles.header}>
        <Profile />
        <ButtonAdd onPress={handleAppointmentCreate} />
      </View>

      <CategorySelect categorySelected={category} setCategory={handleCategorySelect} />

      {loading ? (
        <Load />
      ) : (
        <>
          <ListHeader title="Partidas Agendadas" subtitle={`Total ${appointments.length}`} />

          <FlatList
            data={appointments}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Appointment data={item} onPress={() => handleAppointmentDetails(item)} />}
            style={styles.matches}
            ItemSeparatorComponent={() => <ListDivider />}
            contentContainerStyle={{ paddingBottom: 69 }}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
    </Background>
  );
}
