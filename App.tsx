import React, { useState } from 'react';
// Import other necessary components and types
import {
  View,
  StyleSheet,
  SafeAreaView,
  useColorScheme,
  Button,
  Text,
} from 'react-native';

import HealthDetailsScreen from './HealthDetailScreen'; // Ensure the path is correct

const Colors = {
  darker: '#101010',
  lighter: '#F3F3F3',
  white: '#FFFFFF',
  black: '#000000',
  light: '#F8F8F8',
  dark: '#333333',
};


function App(): React.JSX.Element {
  type SectionProps = {
    title: string;
    children: React.ReactNode;
  };

  const Section: React.FC<SectionProps> = ({ title, children }) => {
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {children}
      </View>
    );
  };

  
  // Add state to toggle the health screen's visibility
  const [showHealthScreen, setShowHealthScreen] = useState(false);

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  if (showHealthScreen) {
    return <HealthDetailsScreen />;
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      {/* Your existing code for StatusBar, ScrollView, etc. */}
      <Section title="Health Details">
        <Button
          title="Enter Health Details"
          onPress={() => setShowHealthScreen(true)}
        />
      </Section>
      {/* The rest of your existing sections */}
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
});
// Your existing styles and any additional ones you need

export default App;