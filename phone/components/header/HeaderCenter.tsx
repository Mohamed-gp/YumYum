import { Product } from "@/interfaces/dbInterfaces";
import { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Button, Image, Pressable, Text, TextInput, View } from "react-native";
import { Tabs } from "expo-router";
import { TabBarIcon } from "../navigation/TabBarIcon";
import { TouchableOpacity } from "react-native-gesture-handler";

// import customAxios from "../../utils/axios/customAxios";
// import { Link, useNavigate } from "react-router-dom";
// import { Product } from "../../interfaces/dbInterfaces";

export default function HeaderCenter() {
  const [search, setSearch] = useState("");
  // const navigate = useNavigate();
  // const searchHandler = () => {
  //   try {
  //     // navigate(`/store?search=${search.split(" ").join("+")}`);
  //     setSearch("");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const [changeHandlerProducts, setChangeHandlerProduct] = useState<Product[]>(
    []
  );
  // const onChangeHandler = async () => {
  //   try {
  //     // const { data } = await customAxios.get(`/products?search=${search}`);
  //     setChangeHandlerProduct(data.data.slice(0, 4));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   if (search != "") {
  //     onChangeHandler();
  //   }
  // }, [search]);

  return (
    <View className="flex mx-6 my-2 flex-row items-center rounded-2xl border-2 border-solid border-[#dddddd] text-base">
      <View className="flex items-center justify-center rounded-l-xl p-2">
        <Ionicons name="search" size={20} color="black" />
      </View>
      <View className="relative flex-1">
        <TextInput
          value={search}
          onChangeText={setSearch}
          className=" pl-1  w-full rounded-r-2xl placeholder:text-red-400     flex-1 relative  focus:outline-none "
          placeholder="Search for products"
        />
        <View
          className="absolute left-0 top-12 flex-col w-full"
          // onpress={() => setSearch("")}
        >
          {search != "" && (
            <>
              {changeHandlerProducts.map((product) => (
                <View className="relative  hidden">
                  <Tabs.Screen
                    name="explore"
                    options={{
                      title: "Explore",
                      tabBarIcon: ({ color, focused }) => (
                        <View className="img w-12 h-12 flex ">
                          <Image
                            src={product?.images[0]}
                            alt={product?._id}
                            className=""
                          />
                          <Text className="">{product?.name}</Text>
                        </View>
                      ),
                    }}
                  />

                  {/* <View
                    className="absolute w-screen h-screen left-0 top-0 -z-[1]"
                    // onClick={() => setSearch("")}
                  ></View> */}
                </View>
              ))}
            </>
          )}
        </View>
      </View>
      <Pressable
        className="bg-mainColor-base  flex justify-center items-center rounded-r-xl px-3 py-2 text-sm hover:opacity-90 duration-300"
        // onClick={() => searchHandler()}

        // disabled={search == ""}
        // className="bg-mainColor disabled:opacity-50 h-full rounded-r-xl px-3 py-2 text-sm text-[white] hover:opacity-90 duration-300"
      >
        <Text className="text-white">Search</Text>
      </Pressable>
      {/* <Text className=" bg-mainColor-base  text-white">Search</Text> */}
    </View>
  );
}

// blue: {
//   accent: "#0085ff",
//   dark: "#5a49d9",
// },
