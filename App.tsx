import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as PaperProvider, Title } from "react-native-paper";
import { Compose } from "./src/screens/Compose";
import { Main } from "./src/screens/Main";
import { StackParamList } from "./src/types/types";

const Stack = createStackNavigator<StackParamList>();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen
            name="Main"
            component={Main}
            options={{ title: "メモ帳" }}
          ></Stack.Screen>
          <Stack.Screen
            name="Compose"
            component={Compose}
            options={{ title: "メモの作成" }}
          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
