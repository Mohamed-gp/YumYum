import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View, ScrollView } from "react-native";
import customAxios from "@/axios/customAxios";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  const getAllCategoriesHandler = async () => {
    try {
      const { data } = await customAxios.get("/categories");
      setCategories(data.data);
    } catch (error: any) {
     
    }
  };

  useEffect(() => {
    getAllCategoriesHandler();
  }, []);

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      horizontal
      className="pb-4 bg-white"
    >
      {categories.map((category) => (
        <View
          key={category._id}
          className="flex items-center justify-center w-[100px]"
        >
          <Image
            source={{
              uri: category.image,
            }}
            className="w-[70px] h-[70px]"
            style={styles.image}
          />
          <Text className="font-bold">{category.name}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

{
  /* <Image
  source={{
    uri: "https://c4.wallpaperflare.com/wallpaper/108/140/869/digital-digital-art-artwork-fantasy-art-drawing-hd-wallpaper-preview.jpg",
  }}
  className="w-full h-[200px]"
/> */
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 150,
  },
});
