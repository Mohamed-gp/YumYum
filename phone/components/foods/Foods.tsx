import customAxios from "@/axios/customAxios";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";

export default function Foods() {
  const [foodsList, setFoodsList] = useState([]);

  const getAllFoodListed = async () => {
    try {
      const { data } = await customAxios.get("/products/listed");
      setFoodsList(data.data);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllFoodListed();
  }, []);

  return (
    <View className=" my-6 ">
      {foodsList.length > 0 ? (
        <View>
          {foodsList.map((foodList) => (
            <View
              key={foodList.category}
              className="bg-white  rounded-xl my-6 "
            >
              <View className="flex justify-between flex-row my-4 mx-6">
                <Text className="font-bold">{foodList.category}</Text>
                {foodList.elements.length > 0 && (
                  <Text className="text-mainColor-base font-bold">See All</Text>
                )}
              </View>
              {foodList.elements.length > 0 ? (
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  className="rounded-xl w-full  "
                >
                  {foodList.elements.map((food) => (
                    <View
                      className="flex flex-col  items-center justify-center mx-4 my-2 "
                      key={food._id}
                      style={styles.shadowContainer} // Apply shadow style here
                    >
                      <Image
                        source={{
                          uri: food.image,
                        }}
                        className="w-[200px] h-[200px] rounded-full"
                      />
                      <View className="flex flex-row rounded-b-xl px-6 py-6  justify-between bg-mainColor-base/70">
                        <Text className="flex-1 text-white  mr-4
                        ">{food.name}</Text>
                        <Text className="text-red-500 font-extrabold ">
                          ${food.basePrice}
                        </Text>
                      </View>
                    </View>
                  ))}
                </ScrollView>
              ) : (
                <Text className="text-mainColor-base font-bold text-center text-xl my-12">
                  There Is No Food In This Category Yet
                </Text>
              )}
            </View>
          ))}
        </View>
      ) : (
        <Text className="text text-center flex justify-center items-center h-[500px] text-mainColor-base text-4xl">
          Loading...
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  shadowContainer: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5, // Add elevation for Android
    backgroundColor: "white", // Ensure background color is set for shadow to be visible
    borderRadius: 10, // Optional: Add border radius if needed
  },
});
