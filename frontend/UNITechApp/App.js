import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useEffect, useState } from "react"

// Importe a definição das suas fontes aqui
import * as Font from 'expo-font';

// Importe o componente Navigation ou substitua pelo componente de navegação do seu app
import Navigation from './navigation';

export default function App() {
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
    <SafeAreaProvider>
      <Navigation />
      <StatusBar />
    </SafeAreaProvider>
  );
}
