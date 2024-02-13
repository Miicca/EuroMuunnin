import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet} from 'react-native';
import { Picker } from '@react-native-picker/picker';


const App = () => {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('EUR');
  const [currencies, setCurrencies] = useState([]);
  const [convertedAmount, setConvertedAmount] = useState('');

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const fetchCurrencies = async () => {
    try {
      const response = await fetch('https://api.apilayer.com/exchangerates_data/latest', {
        headers: {
          'apikey': '5Wvaewh1t5gg3eSKRgVAhAgTsMLrEI36'
        }
      });
      const data = await response.json();
      const currencyCodes = Object.keys(data.rates);
      setCurrencies(currencyCodes);
    } catch (error) {
      console.error('Error fetching currencies:', error);
    }
  };

  const convertCurrency = async () => {
    try {
      const response = await fetch(`https://api.apilayer.com/exchangerates_data/latest?apikey=5Wvaewh1t5gg3eSKRgVAhAgTsMLrEI36`);
      const data = await response.json();
      const rate = data.rates[currency];
      const converted = (parseFloat(amount) / rate).toFixed(2);
      setConvertedAmount(converted);
    } catch (error) {
      console.error('Error converting currency:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Euro Muunnin</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Amount:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={amount}
          onChangeText={text => setAmount(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Currency:</Text>
        <Picker
          selectedValue={currency}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setCurrency(itemValue)}>
          {currencies.map(currency => (
            <Picker.Item key={currency} label={currency} value={currency} />
          ))}
        </Picker>
      </View>
      <Button title="Convert" onPress={convertCurrency} />
      <Text style={styles.result}> {convertedAmount} €</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    marginRight: 10,
    fontSize: 16,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  picker: {
    flex: 1,
    height: 40,
  },
  result: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
    fontSize: 18,
  },
});

export default App;