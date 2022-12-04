import React, { useCallback, useEffect, useState } from "react";
import { Box, FlatList, Icon, useToast, VStack } from "native-base";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Octicons } from "@expo/vector-icons";
import { api } from "../services/api";
import { Loading } from "../components/Loading";
import { PoolCard, PoolCardProps } from "../components/PoolCard";
import { EmptyPoolList } from "../components/EmptyPoolList";

export function Pools() {
  const [pools, setPools] = useState<PoolCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const toast = useToast();

  async function fetchPools() {
    try {
      setLoading(true);
      const response = await api.get("/pools");
      setPools(response.data.pools);
    } catch (error) {
      console.log("error=", error);

      toast.show({
        title: "Não foi possivel carregar os bolões",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchPools();
    }, [])
  );

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Meus bolões" onShare={() => {}} />
      <VStack
        mt={6}
        mx={5}
        borderBottomWidth={1}
        borderBottomColor="gray.600"
        pb={4}
        mb={4}
      >
        <Button
          title="BUSCAR BOLÃO POR CÓDIGO"
          leftIcon={
            <Icon as={Octicons} name="search" color="black" size="md" />
          }
          onPress={() => navigation.navigate("find")}
        />
      </VStack>
      {loading ? (
        <Loading />
      ) : (
        <>

          <FlatList
            data={pools}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <PoolCard
                data={item}
                onPress={() =>
                  navigation.navigate("details", {
                    id: item.id,
                    title: item.title,
                  })
                }
              />
            )}
            showsVerticalScrollIndicator={false}
            px={5}
            _contentContainerStyle={{ pb: 400 }}
            ListEmptyComponent={<EmptyPoolList />}
          />
        </>
      )}
    </VStack>
  );
}
