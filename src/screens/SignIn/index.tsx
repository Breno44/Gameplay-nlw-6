import React from "react";
import { View, Text, Image, Alert, ActivityIndicator } from "react-native";
import { styles } from "./styles";

import IllustrationImg from "../../assets/illustration.png";

import { ButtonIcon } from "../../components/ButtonIcon";
import { Background } from "../../components/Background";

import { useAuth } from "../../hooks/Auth";
import { theme } from "../../global/styles/theme";

export function SignIn() {
  const { user, signIn, loading } = useAuth();
  console.log(user);

  async function handleSignIn() {
    try {
      await signIn();
    } catch (err) {
      Alert.alert(err);
    }
  }

  return (
    <Background>
      <View style={styles.container}>
        <Image source={IllustrationImg} style={styles.img} resizeMode="stretch" />
        <View style={styles.content}>
          <Text style={styles.title}>
            Conecte-se {`\n`}e organize suas {`\n`}
            jogatinas
          </Text>
          <Text style={styles.subtitle}>
            Crie Grupos para jogar seus games {`\n`}
            favoritos com seus amigos
          </Text>

          {loading ? (
            <ActivityIndicator color={theme.colors.primary} />
          ) : (
            <ButtonIcon title="Entrar com Discord" onPress={handleSignIn} />
          )}
        </View>
      </View>
    </Background>
  );
}
