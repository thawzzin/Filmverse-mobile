import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import MyText from "../TextStyle/MyText";
import Api from "../../Api";
import { useNavigation } from "@react-navigation/native";

const SimilarMovies = ({ id, type, onPressTouch }) => {
  const [similar, setSimilar] = useState([]);
  const poster = "https://image.tmdb.org/t/p/original";
  const navigation = useNavigation();

  let url;

  if (type === "movie") {
    url = `/movie/${id}/similar`;
  } else if (type === "tv") {
    url = `/tv/${id}/similar`;
  }

  const api = () => {
    Api.get(url)
      .then((res) => {
        setSimilar(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    api();
  }, [id]);

  return (
    <View style={{ marginTop: 20 }}>
      <MyText style={{ fontSize: 20, marginBottom: 10 }}>
        {type === "movie" ? "Similar Movies" : "Similar Tv Series"}
      </MyText>
      <FlatList
        horizontal
        data={similar}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              onPressTouch();
              navigation.navigate("Detail", { id: item.id, type: type });
            }}
          >
            <View style={styles.container}>
              {item.poster_path ? (
                <Image
                  style={styles.poster}
                  source={{ uri: poster + item.poster_path }}
                />
              ) : (
                <Image
                  style={styles.poster}
                  source={require("../../../assets/Image/NoImage.png")}
                />
              )}
              <MyText style={styles.title}>
                {" "}
                {item.title ? item.title : item.name}{" "}
              </MyText>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default SimilarMovies;

const styles = StyleSheet.create({
  container: {
    width: 100,
    marginRight: 20,
    marginBottom: 15,
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 10,
    marginBottom: 5,
  },
  title: {
    fontSize: 13,
    textAlign: "center",
  },
});