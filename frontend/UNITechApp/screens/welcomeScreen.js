import { ImageBackground, SafeAreaView, StyleSheet, Text, View, Dimensions, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react"
import Spacing from "../constants/Spacing"
import FontSize from "../constants/FontSize"
import Colors from "../constants/Colors"
import * as Font from 'expo-font';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get("window");


const Welcome = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView>
            <View>
                <ImageBackground
                    style={{
                        height: height / 1.7,
                    }}
                    resizeMode="contain"
                    source={require("../assets/home-image.png")}
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
                        Bem vindo ao UNITech App!
                    </Text>

                    <Text
                        style={{
                            fontSize: FontSize.small,
                            color: Colors.text,
                            textAlign: "center",
                            marginTop: Spacing * 2,
                        }}
                    >
                        Estude de uma forma mais motivadora, inove seus estudos
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
                            Cadastrar
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Welcome;

const styles = StyleSheet.create({});
