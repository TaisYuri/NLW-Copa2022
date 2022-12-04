import { createContext, useEffect, useState } from "react";
import { ReactNode } from "react";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";

import { api } from "../services/api";
import { AuthContextDataProps, AuthProviderProps, UserProps } from "./types";

WebBrowser.maybeCompleteAuthSession();

//Criação do contexto
export const AuthContext = createContext({} as AuthContextDataProps);

//Criação do provider para compartilhar o contexto
export function AuthContextProvider({ children }: AuthProviderProps) {
  //Informações do usuário
  const [user, setUser] = useState<UserProps>({} as UserProps);

  const [isUserLoading, setIsUserLoading] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      "970165786069-mepimibcg0pfot198of2v0i5l7n3s0e4.apps.googleusercontent.com",
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ["profile", "email"],
  });

  async function signIn() {
    try {
      setIsUserLoading(true);
      await promptAsync();
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsUserLoading(false);
    }
  }

  async function signInWithGoogle(access_token: string) {
    // console.log("TOKEN DE AUTENTICAÇÃO =>", access_token);
    
    try {
      setIsUserLoading(true);
      const tokenResponse = await api.post("/users", { access_token }); //envia o token para adquirir o JWT
      // console.log("userInfoResponse =>", tokenResponse);
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${tokenResponse.data.token}`;
      
      const userInfoResponse = await api.get("/me");
      setUser(userInfoResponse.data.user);
    } 
    catch (error) {
      console.log(error);
      throw error;
    } 
    finally {
      setIsUserLoading(false);
    }
  }

  useEffect(() => {
    if (response?.type === "success" && response.authentication?.accessToken) {
      signInWithGoogle(response.authentication.accessToken);
    }
  }, [response]);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        isUserLoading,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
