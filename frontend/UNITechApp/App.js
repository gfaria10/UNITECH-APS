// import React, { useState } from 'react';
// import { View, TextInput, TouchableOpacity, StyleSheet, Text, Image, Keyboard } from 'react-native';
// import GradientInput from './components/gradientInput';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// const LoginScreen = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = () => {
//     console.log('Email:', email);
//     console.log('Password:', password);
//   };

//   return (
//     <KeyboardAwareScrollView
//       behavior="padding"
//       contentContainerStyle={styles.container}
//       resetScrollToCoords={{ x: 0, y: 0 }}
//       scrollEnabled={false}
//       keyboardVerticalOffset={0}
//       extraScrollHeight={100}
//     >
//       <Image
//         style={styles.logo}
//         source={require('./assets/logitech-85.png')}
//       />
//       <TouchableOpacity onPress={Keyboard.dismiss} style={styles.outerContainer}>
//         <Text style={styles.welcomeText}>Bem-vindo</Text>
//         <Text style={styles.legendText}>Faça o login para continuar</Text>
//         <View style={styles.spacing} />
//         <View style={styles.form}>
//           <GradientInput
//             placeholder="Email"
//             onChangeText={setEmail}
//           />
//           <GradientInput
//             placeholder="Senha"
//             secureTextEntry
//             onChangeText={setPassword}
//           />
//           <TouchableOpacity style={styles.button} onPress={handleLogin}>
//             <Text style={styles.buttonText}>Entrar</Text>
//           </TouchableOpacity>
//         </View>
//       </TouchableOpacity>
//     </KeyboardAwareScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#262E3D',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   outerContainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: '80%',
//   },
//   form: {
//     width: '90%',
//     marginBottom: 90
//   },
//   spacing: {
//     height: 40,
//   },
//   welcomeText: {
//     fontSize: 30,
//     fontWeight: 'bold',
//     color: '#FFF',
//     marginTop: 40,
//     marginBottom: 10,
//   },
//   legendText: {
//     fontSize: 15,
//     fontWeight: 'normal',
//     color: '#FFF',
//     marginBottom: 80,
//   },
//   nameApp: {
//     fontSize: 15,
//     fontWeight: 'normal',
//     color: '#FFF',
//     marginBottom: 120,
//   },
//   button: {
//     height: 50,
//     borderRadius: 40,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#007AFF',
//   },
//   buttonText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#FFF',
//   },
//   logo: {
//     width: 150,
//     height: 160,
//     marginTop: 50,
//     marginBottom: 80
//   },
// });

// export default LoginScreen;


import { ImageBackground, SafeAreaView, StyleSheet, Text, View, Dimensions, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react"
import Spacing from "./constants/Spacing"
import FontSize from "./constants/FontSize"
import Colors from "./constants/Colors"
// import Font from "./constants/Font"
import * as Font from 'expo-font';

const { height } = Dimensions.get("window");


const LoginScreen = () => {

  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
        'Poppins-Regular': require('./assets/fonts/Poppins-Bold.ttf'),
        'Poppins-SemiBold': require('./assets/fonts/Poppins-Bold.ttf'),
      });

      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; // Renderizar um componente de carregamento ou qualquer outro indicador
  }

  return (
    <SafeAreaView>
      <View>
        <ImageBackground
          style={{
            height: height / 1.7,
          }}
          resizeMode="contain"
          source={require("./assets/home-image.png")}
        />
        <View
          style={{
            paddingHorizontal: Spacing * 4,
            paddingTop: Spacing * 0.5,
          }}
        >
          <Text
            style={{
              fontSize: FontSize.xxLarge,
              color: Colors.primary,
              fontFamily: "Poppins-Bold",
              textAlign: "center",
            }}
          >
            Discover Your Dream Job here
          </Text>

          <Text
            style={{
              fontSize: FontSize.small,
              color: Colors.text,
              textAlign: "center",
              marginTop: Spacing * 2,
            }}
          >
            Explore all the existing job roles based or your interest and study
            major
          </Text>
        </View>
        <View
          style={{
            paddingHorizontal: Spacing * 2,
            paddingTop: Spacing * 6,
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            onPress={() => navigate("Login")}
            style={{
              backgroundColor: Colors.primary,
              paddingVertical: Spacing * 1.5,
              paddingHorizontal: Spacing * 2,
              width: "48%",
              borderRadius: Spacing,
              shadowColor: Colors.primary,
              shadowOffset: {
                width: 0,
                height: Spacing,
              },
              shadowOpacity: 0.3,
              shadowRadius: Spacing,
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins-Regular",
                color: Colors.onPrimary,
                fontSize: FontSize.large,
                textAlign: "center",
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigate("Register")}
            style={{
              paddingVertical: Spacing * 1.5,
              paddingHorizontal: Spacing * 2,
              width: "48%",
              borderRadius: Spacing,
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins-Regular",
                color: Colors.text,
                fontSize: FontSize.large,
                textAlign: "center",
              }}
            >
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
