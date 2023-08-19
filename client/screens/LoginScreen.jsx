import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { BGImage, Logo } from "../assets";
import { UserTextInput } from "../components";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth, firestoreDB } from "../configs/firebase.config";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/User/userAuthSlice";

const LoginSreen = () => {
  const screenWidth = Math.round(Dimensions.get("window").width);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [getEmailValiation, setGetEmailValidation] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (getEmailValiation && email != "") {
      await signInWithEmailAndPassword(firebaseAuth, email, password)
        .then((userCreated) => {
          if (userCreated) {
            getDoc(doc(firestoreDB, "users", userCreated?.user.uid)).then(
              (docSnap) => {
                if (docSnap.exists()) {
                  dispatch(setUser(docSnap.data()));
                }
              }
            );
          }
        })
        .catch((err) => {
          console.log("error: ", err.message());
          if (err.message.includes("wrong-password")) {
            setAlert(true);
            setAlertMessage("Password Mismatch");
          } else if (err.message.includes("user-not-found")) {
            setAlert(true);
            setAlertMessage("User Not Found");
          } else {
            setAlert(true);
            setAlertMessage("Invalid Email");
          }
          setInterval(() => {
            setAlert(false);
          }, 2000);
        });
    }
  };

  return (
    <View className="flex-1 items-center justify-start">
      <Image
        source={BGImage}
        resizeMode="cover"
        className="h-96"
        style={{ width: screenWidth }}
      />
      <View
        className={`${
          Platform.OS === "ios"
            ? "w-full h-full bg-white rounded-tl-[90px] -mt-44 items-center justify-start p-6 space-y-6"
            : "w-full h-full bg-white rounded-tl-[90px] -mt-60 items-center justify-start p-6 space-y-6"
        }`}
      >
        <Image source={Logo} className="w-16 h-16" resizeMode="contain" />
        <Text className="py-2 text-primaryText text-xl font-semibold">
          Welcome Back !
        </Text>
        <View className="w-full flex items-center justify-center">
          <Text className="text-base text-red-600">{alertMessage}</Text>
          <UserTextInput
            placeholder="Email"
            isPass={false}
            setStatValue={setEmail}
            setGetEmailValidation={setGetEmailValidation}
          />
          <UserTextInput
            placeholder="Password"
            isPass={true}
            setStatValue={setPassword}
          />
          <TouchableOpacity
            onPress={handleLogin}
            className="w-full px-4 py-2 rounded-xl bg-primary my-3 flex items-center justify-center"
          >
            <Text className="py-2 text-white text-xl font-semibold">
              Sign In
            </Text>
          </TouchableOpacity>
          <View className="w-full py-12 flex-row items-center justify-center space-x-2">
            <Text className="text-base text-primaryText">
              Don't have an account yet?
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("RegisterScreen")}
            >
              <Text className="text-base font-semibold text-primaryBold">
                Create Here
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LoginSreen;
