import Categories from "@/components/categories/Categories";
import Foods from "@/components/foods/Foods";
import Header from "@/components/header/Header";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <ScrollView>
        <Header />
        <Categories />
        <Foods />
      </ScrollView>
    </SafeAreaView>
  );
}
