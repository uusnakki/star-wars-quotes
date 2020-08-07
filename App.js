import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Alert,
  Button,
} from "react-native";

const App = () => {
  const [quote, setQuote] = useState({});
  const [showedQuote, setShowedQuote] = useState('');
  const darkSide = require('./deathstar.png')
  const lighSide = require('./light.png')
  const [sideImage, setSideImage] = useState(darkSide)
  const [hasError, setErrors] = useState(false);

  useEffect(() => {
    async function fetchQuote() {
      const res = await fetch(
        "http://swquotesapi.digitaljedi.dk/api/SWQuote/RandomStarWarsQuote"
      );
      res
        .json()
        .then((res) => setQuote(res.starWarsQuote))
        .catch((err) => setErrors(err));
    }
    fetchQuote();
  });

const switchToLight = () => {
  setSideImage(lighSide)
}
const switchToDark = () => {
  setSideImage(darkSide)
}

  const quoteAlert = () => {
    setShowedQuote(quote)
    setTimeout(() => {
      setShowedQuote(null)
    }, 5000)
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Star Wars {'\n'} Quote of the day</Text>
      <Button color="#00bfff" title="Light Side" onPress={switchToLight}/>
      <Button color="#dc143c" title="Dark Side" onPress={switchToDark}/>
      <Image source={sideImage} style={styles.image}  />
      <Text style={styles.quote}>{showedQuote}</Text>
      <Text style={styles.datext}>
        Today in a galaxy {"\n"} far far away...
      </Text>
      <TouchableHighlight style={styles.button} onPress={quoteAlert}>
        <Text style={styles.buttonText}> See what's going on! </Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    marginBottom: 10,
    marginTop: 20,
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "American Typewriter",
    textAlign: 'center'
  },
  datext: {
    marginBottom: 5,
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Trebuchet MS"
  },
  quote: {
    fontSize: 20,
    fontFamily: "Trebuchet MS"
  },
  button: {
    backgroundColor: "#000000",
    padding: 20,
    alignItems: "center",
    borderRadius: 15,
    marginBottom: 10,
  },
  buttonText: {
    fontFamily: "American Typewriter",
    color: "#00ced2",
    fontSize: 15
  },
  image: {
    marginBottom: 2,
    marginTop: 20,
    height: "45%",
    width: "60%",
  },
});

export default App;
