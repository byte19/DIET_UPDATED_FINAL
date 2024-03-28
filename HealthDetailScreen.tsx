import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';

import COLORS from './src/conts/colors'
import Button from './src/views/components/Button';
import Input from './src/views/components/Input';
import Loader from './src/views/components/Loader';
const HealthDetailsScreen: React.FC = () => {
  const [hemoglobin, setHemoglobin] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [sugar, setSugar] = useState<string>('');
  const [bloodPressure, setBloodPressure] = useState<string>('');
  const [foodSuggestions, setFoodSuggestions] = useState<string[]>([]);


    const [inputs, setInputs] = React.useState({
        email: '',
        fullname: '',
        phone: '',
        password: '',
    });
    const [errors, setErrors] = React.useState({});
    const [loading, setLoading] = React.useState(false);

    const validate = () => {
        Keyboard.dismiss();
        let isValid = true;

        if (!inputs.email) {
            handleError('Please input email', 'email');
            isValid = false;
        } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
            handleError('Please input a valid email', 'email');
            isValid = false;
        }

        if (!inputs.fullname) {
            handleError('Please input fullname', 'fullname');
            isValid = false;
        }

        if (!inputs.phone) {
            handleError('Please input phone number', 'phone');
            isValid = false;
        }

        if (!inputs.password) {
            handleError('Please input password', 'password');
            isValid = false;
        } else if (inputs.password.length < 5) {
            handleError('Min password length of 5', 'password');
            isValid = false;
        }

        if (isValid) {
            register();
        }
    };

    const register = () => {
        setLoading(true);
        setTimeout(() => {
            try {
                setLoading(false);
                AsyncStorage.setItem('userData', JSON.stringify(inputs));
                navigation.navigate('LoginScreen');
            } catch (error) {
                Alert.alert('Error', 'Something went wrong');
            }
        }, 3000);
    };

    const handleOnchange = (text, input) => {
        setInputs(prevState => ({ ...prevState, [input]: text }));
    };
    const handleError = (error, input) => {
        setErrors(prevState => ({ ...prevState, [input]: error }));
    };


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
          <Text style={{ color: COLORS.black, fontSize: 40, fontWeight: 'bold' }}>
              Health Parameters
          </Text>
          <Text style={{ color: COLORS.grey, fontSize: 18, marginVertical: 10 }}>
              Enter Your Details to Register
          </Text>
          <View style={{ marginVertical: 20 }}>
              <Input
                  keyboardType="numeric"
                  onChangeText={text => handleOnchange(text, 'email')}
                  onFocus={() => handleError(null, 'email')}
                  iconName="email-outline"
                  label="Height"
                  placeholder="Enter your height"
              />

              <Input
                  keyboardType="numeric"
                  onChangeText={text => handleOnchange(text, 'fullname')}
                  onFocus={() => handleError(null, 'fullname')}
                  iconName="account-outline"
                  label="Weight"
                  placeholder="Enter your weight"
              />

              <Input
                  keyboardType="numeric"
                  onChangeText={text => handleOnchange(text, 'phone')}
                  onFocus={() => handleError(null, 'phone')}
                  iconName="phone-outline"
                  label="Hemoglobin Level"
                  placeholder="Enter your Hemoglobin Level"
              />
              <Input
                  keyboardType="numeric"
                  onChangeText={text => handleOnchange(text, 'password')}
                  onFocus={() => handleError(null, 'password')}
                  iconName="lock-outline"
                  label="Sugar Level"
                  placeholder="Enter your Sugar Level"
              />
              <Input
                  keyboardType="numeric"
                  onChangeText={text => handleOnchange(text, 'password')}
                  onFocus={() => handleError(null, 'password')}
                  iconName="lock-outline"
                  label="Blood Pressure"
                  placeholder="Enter your Blood pressure"
              />
              <Button title="Register"/>
              <Text
                  onPress={() => navigation.navigate('LoginScreen')}
                  style={{
                      color: COLORS.black,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      fontSize: 16,
                  }}>
                  Already have account ?Login
              </Text>
        </View>
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
