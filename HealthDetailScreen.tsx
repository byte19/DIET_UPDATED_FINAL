import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';

const HealthDetailsScreen: React.FC = () => {
  const [hemoglobin, setHemoglobin] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [sugar, setSugar] = useState<string>('');
  const [bloodPressure, setBloodPressure] = useState<string>('');
  const [foodSuggestions, setFoodSuggestions] = useState<string[]>([]);

  const handleSubmission = async () => {
    const options = {
      method: 'GET',
      url: 'https://nutrition-by-api-ninjas.p.rapidapi.com/v1/nutrition',
      params: {
        query: 'chicken'
      },
      headers: {
        'X-RapidAPI-Key': '1d47d196fdmsh81f54d8315c3a95p128c07jsnc282d20f8458',
        'X-RapidAPI-Host': 'nutrition-by-api-ninjas.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response.data[0]);
      // Assuming the API returns an array of food items, map them to a list of strings for the suggestions
      // This mapping will depend on the actual structure of the response
      const suggestions = response.data.map((item: { name: any; }) => item.name); // Adjust this based on actual API response
      // const suggestions = response.data.d.map((item: FoodItem.Title) => item.Title);
      console.log(typeof suggestions)
      setFoodSuggestions(suggestions);
    } catch (error) {
      console.error(error);
      setFoodSuggestions([]); // Reset suggestions on error
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text>Height</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your Height"
        value={height}
        onChangeText={setHeight}
        keyboardType="numeric"
      />
      <Text>Weight</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your Weight"
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
      />
      <Text>Hemoglobin Level</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your hemoglobin level"
        value={hemoglobin}
        onChangeText={setHemoglobin}
        keyboardType="numeric"
      />
      <Text>Sugar Level</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your sugar level"
        value={sugar}
        onChangeText={setSugar}
        keyboardType="numeric"
      />
      <Text>Blood Pressure</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your blood pressure"
        value={bloodPressure}
        onChangeText={setBloodPressure}
        keyboardType="numeric"
      />
      <Button title="Submit" onPress={handleSubmission} />
      {foodSuggestions.length > 0 && (
        <View>
          <Text>Food Suggestions:</Text>
          {foodSuggestions.map((food, index) => (
            <Text key={index}>{food}</Text>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default HealthDetailsScreen;
