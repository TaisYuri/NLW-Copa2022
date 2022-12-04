import React, { useEffect, useState } from "react";
import { Share } from "react-native";
import { HStack, useToast, VStack } from "native-base";
import { useRoute } from "@react-navigation/native";
import { api } from "../services/api";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { PoolCardProps } from "../components/PoolCard";
import { PoolHeader } from "../components/PoolHeader";
import { Option } from "../components/Option";
import { EmptyMyPoolList } from "../components/EmptyMyPoolList";

interface routeParams {
  id: string;
  title: string;
}
export function Details() {
  const [loading, setLoading] = useState(true);
  const [optionSelected, setOptionSelected] = useState<"guesses" | "ranking">(
    "guesses"
  );
  const [poolDetails, setPoolDetails] = useState<PoolCardProps>(
    {} as PoolCardProps
  );
  const toast = useToast();

  const route = useRoute();
  const { id, title } = route.params as routeParams;

  async function getPool() {
    try {
      setLoading(true);
      const response = await api.get(`/pools/${id}`);
      setPoolDetails(response?.data?.pool);
      //   console.log('bolaoooo',response?.data?.pool.participants)
    } catch (error) {
      console.log("error=", error);

      toast.show({
        title: "Não foi possivel acessar os detalhes do bolão",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleCodeShare() {
    await Share.share({
      message: `${poolDetails.code} ${"\n"} ${title}`,
    });
  }

  useEffect(() => {
    getPool();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header
        title={title}
        onShare={handleCodeShare}
        showBackButton
        showShareButton
      />

      {poolDetails._count?.participants > 0 ? (
        <VStack flex={1} px={5}>
          <PoolHeader data={poolDetails} />
          <HStack bgColor="gray.800" p={1} mb={5} rounded="sm">
            <Option
              title="Seus palpites"
              onPress={() => setOptionSelected("guesses")}
              isSelected={optionSelected === "guesses"}
            />
            <Option
              title="Ranking do grupo"
              onPress={() => setOptionSelected("ranking")}
              isSelected={optionSelected === "ranking"}
            />
          </HStack>
        </VStack>
      ) : (
        <EmptyMyPoolList code={poolDetails.code} />
      )}
    </VStack>
  );
}
