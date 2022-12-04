import React, { useState } from "react";
import { Alert, Keyboard } from "react-native";
import { Heading, Text, VStack, useToast, Toast } from "native-base";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

import Logo from "../assets/logo.svg";
import { api } from "../services/api";

export function New() {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  async function handlePoolCreate() {
    if(!value.trim()){
      return toast.show({
        title: 'Informe um nome para o bolão',
        placement: 'top',
        bgColor: 'red.500'
      })
    }

    try{
      setIsLoading(true);
      await api.post('pools', { title: value})

      toast.show({
        title: 'Bolão criado com sucesso',
        placement: 'top',
        bgColor: 'green.500'
      })

      setValue("")
      Keyboard.dismiss();
    }
    catch(error){
      console.log('error=', error)
      toast.show({
        title: 'Não foi possivel criar o bolão',
        placement: 'top',
        bgColor: 'red.500'
      })
    }
    finally{
      setIsLoading(false);
    }

  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Criar novo bolão" onShare={() => {}} />
      <VStack mt={8} mx={5} alignItems="center">
        <Logo />
        <Heading
          fontFamily={"heading"}
          color="white"
          fontSize="xl"
          textAlign={"center"}
          my={8}
        >
          Crie seu próprio bolão da copa{"\n"} e compartilhe entre amigos!
        </Heading>
        <Input
          mb={4}
          placeholder="Qual o nome do seu bolão"
          value={value}
          onChangeText={setValue}
        />
        <Button title="CRIAR MEU BOLÃO" onPress={handlePoolCreate} isLoading={isLoading}/>
        <Text color="gray.200" fontSize="sm" textAlign="center" px={10} mt={5}>
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas.
        </Text>
      </VStack>
    </VStack>
  );
}
