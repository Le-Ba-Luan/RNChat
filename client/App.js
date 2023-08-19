import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  ChatScreen,
  HomeScreen,
  LoginScreen,
  NewChatScreen,
  ProfileScreen,
  RegisterScreen,
  SplashScreen,
} from "./screens";
import { Provider } from "react-redux";
import store from "./redux/store";

const Stack = createNativeStackNavigator();

// const DismissKeyboard = ({ children }) => {
//   return (
//     <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
//       {children}
//     </TouchableWithoutFeedback>
//   );
// };

const App = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="NewChatScreen" component={NewChatScreen} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
