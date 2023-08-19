import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { BGImage, Logo } from "../assets";
import { UserTextInput } from "../components";
import { useNavigation } from "@react-navigation/native";
import { avatars } from "../utils/support";
import { MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth, firestoreDB } from "../configs/firebase.config";
import { doc, setDoc } from "firebase/firestore";

const RegisterScreen = () => {
  const screenWidth = Math.round(Dimensions.get("window").width);
  const screenHeight = Math.round(Dimensions.get("window").height);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(avatars[0]?.image.asset.url);
  const [avatarChoose, setAvatarChoose] = useState(false);
  const [getEmailValiation, setGetEmailValidation] = useState(false);

  const navigation = useNavigation();

  const handleAvatarClick = (item) => {
    setAvatar(item?.image.asset.url);
    setAvatarChoose(false);
  };

  const handleSignUp = async () => {
    if (getEmailValiation && email != "") {
      await createUserWithEmailAndPassword(firebaseAuth, email, password).then(
        (userCreated) => {
          const data = {
            _id: userCreated?.user.uid,
            fullname: name,
            profilePic: avatar,
            providerData: userCreated?.user.providerData[0],
          };
          setDoc(doc(firestoreDB, "users", userCreated?.user.uid), data).then(
            () => {
              navigation.navigate("LoginScreen");
            }
          );
        }
      );
    }
  };

  return (
    <View className="flex-1 items-center justify-start">
      <Image
        source={BGImage}
        resizeMode="cover"
        className="h-2/5"
        style={{ width: screenWidth }}
      />
      {avatarChoose && (
        <>
          <View
            className="absolute inset-0 z-10"
            style={{ width: screenWidth, height: screenHeight }}
          >
            <ScrollView>
              <BlurView
                className="w-full h-full px-4 py-16 flex-row flex-wrap items-center justify-evenly"
                tint="light"
                intensity={30}
                style={{ width: screenWidth, height: screenHeight }}
              >
                {avatars?.map((item) => (
                  <TouchableOpacity
                    key={item._id}
                    onPress={() => handleAvatarClick(item)}
                    className="w-20 m-3 h-20 p-1 rounded-full border-2 border-primary relative"
                  >
                    <Image
                      source={{ uri: item?.image.asset.url }}
                      className="w-full h-full"
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                ))}
              </BlurView>
            </ScrollView>
          </View>
        </>
      )}
      <View className="w-full h-full bg-white rounded-tl-[90px] -mt-44 items-center justify-start py-6 px-6 space-y-6">
        <Image source={Logo} className="w-16 h-16" resizeMode="contain" />
        <Text className="py-2 text-primaryText text-xl font-semibold">
          Join with us !
        </Text>
        <View className="w-full flex items-center justify-center relative -my-4">
          <TouchableOpacity
            onPress={() => setAvatarChoose(true)}
            className="w-20 h-20 p-1 rounded-full border-2 border-primary relative"
          >
            <Image
              source={{ uri: avatar }}
              className="w-full h-full"
              resizeMode="contain"
            />
            <View className="w-6 h-6 bg-primary rounded-full absolute top-0 right-0 flex items-center justify-center">
              <MaterialIcons name="edit" size={18} color={"#fff"} />
            </View>
          </TouchableOpacity>
        </View>
        <View className="w-full flex items-center justify-center">
          <UserTextInput
            placeholder="Fullname"
            isPass={false}
            setStatValue={setName}
          />
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
            onPress={handleSignUp}
            className="w-full px-4 py-2 rounded-xl bg-primary my-3 flex items-center justify-center"
          >
            <Text className="py-2 text-white text-xl font-semibold">
              Sign Up
            </Text>
          </TouchableOpacity>
          <View className="w-full py-12 flex-row items-center justify-center space-x-2">
            <Text className="text-base text-primaryText">Have an account?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("LoginScreen")}
            >
              <Text className="text-base font-semibold text-primaryBold">
                Login Here
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RegisterScreen;
