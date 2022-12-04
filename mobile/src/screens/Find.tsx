import React, { useCallback, useState } from "react";
import { Heading, useToast, VStack } from "native-base";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { api } from "../services/api";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export function Find() {
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const toast = useToast();
  const navigation = useNavigation();

  async function handleJoinPool() {
    try {
      setLoading(true);

      if (!code.trim()) {
        return toast.show({
          title: "Informe o código para o bolão",
          placement: "top",
          bgColor: "red.500",
        });
      }

      await api.post("/pools/join", { code });

      toast.show({
        title: "Você entrou no bolão com sucesso",
        placement: "top",
        bgColor: "green.500",
      });

      navigation.navigate("pools");
    } catch (error) {
      console.log("error=", error);
      setLoading(false);

      if (error.response?.data?.mesage === "Pool not found") {
        return toast.show({
          title: "Bolão não encontrado",
          placement: "top",
          bgColor: "red.500",
        });
      }
      if (error.response?.data?.mesage === "You already joined this pool") {
        return toast.show({
          title: "Você já está participando deste bolão",
          placement: "top",
          bgColor: "red.500",
        });
      }

      toast.show({
        title: "Não foi possivel entrar no bolão",
        placement: "top",
        bgColor: "red.500",
      });
    }
  }

  useFocusEffect(
    useCallback(() => {
      setLoading(false);
      setCode("");
    }, [])
  );

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Buscar por código" onShare={() => {}} showBackButton />
      <VStack mt={8} mx={5} alignItems="center">
        <Heading
          fontFamily={"heading"}
          color="white"
          fontSize="xl"
          textAlign={"center"}
          mb={8}
        >
          Encontre um bolão através de{"\n"} seu código único
        </Heading>
        <Input
          mb={2}
          placeholder="Qual o código do bolão"
          value={code}
          onChangeText={setCode}
          autoCapitalize="characters"
        />
        <Button
          title="BUSCAR BOLÃO"
          isLoading={loading}
          onPress={handleJoinPool}
        />
      </VStack>
    </VStack>
  );
}
