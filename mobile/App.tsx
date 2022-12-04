import { NativeBaseProvider, Center, StatusBar } from "native-base";
import { THEME } from "./src/styles/theme";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { Loading } from "./src/components/Loading";
import { SignIn } from "./src/screens/SignIn";
import { AuthContextProvider } from "./src/Contexts/AuthContext";
import { New } from "./src/screens/New";
import { Routes } from "./src/routes";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  return (
    <NativeBaseProvider theme={THEME}>
      <AuthContextProvider>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        {fontsLoaded ? <Routes /> : <Loading />}
        {/* {fontsLoaded ? <SignIn /> : <Loading />} */}
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}
