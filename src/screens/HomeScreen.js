import { Text, View, Image, ScrollView, Pressable } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
//import UserLogo from "../../assets/user.png";
//import OfferCard from "../components/OfferCard";
import Slider from "../components/Slider";
import NewArrivalsCard from "../components/NewArrivalsCard";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthenticationModal from "../components/AuthenticationModal";
import AuthContext from "../features/authContext";
import ProductContext from "../features/productContext";
import { getProducts } from "../features/firebase/product";

const Home = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { isLoggedIn,currentUser} = useContext(AuthContext);
  const {products,setProducts} = useContext(ProductContext);

  const fetchAllProducts = async () => {
    const result = await getProducts()
    setProducts(result)
  }

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });

    fetchAllProducts()
  }, []);
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <View className="flex-row px-5 mt-6 justify-between items-center">
          <View className="bg-black rounded-full w-10 h-10 justify-center items-center">
            <MaterialIcons name="menu" size={24} color={"#fff"} />
          </View>
          {!isLoggedIn &&(
            <Pressable onPress={() => setModalVisible(!modalVisible)} className="flex-row items-center justify-center border border-slate-400 rounded-full ">
              <Image
                source={{uri: 'https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-6/393626857_924553462528338_5008131638680354205_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_ohc=FOZ8QHtc7SUAX9pdAsQ&_nc_ht=scontent.fhan14-1.fna&cb_e2o_trans=t&oh=00_AfDwczU-2mN-1ittsSa0gyEMz8QVFTmwYyWzHfWxWI6FPg&oe=654C668C'}}
                style={{
                  height: 40,
                  width: 40,
                  backgroundColor: "#aaaaaa",
                  borderRadius: 50,
                }}
                />
                <Text className="font-semibold py-2 pr-4 pl-2">Đăng nhập</Text>
            </Pressable>
          )}
        </View>

        <View className="mt-6 px-5">
          {/* <Text className="font-bold text-2xl"> <Text className="font-bold text-slate-500">{currentUser?.name}</Text></Text> */}
          <Text className="font-semibold text-xl text-black-500">
            Maverik Studio App
          </Text>
        </View>

        <View className="mt-7 px-5">
          <View className="flex-row bg-gray-200 p-2 px-3 items-center rounded-xl">
            <View className="">
              <MaterialIcons name="search" size={29} color={"#111"} />
            </View>
            <TextInput
              placeholder="Tìm kiếm..."
              placeholderTextColor={"#666666"}
              className="px-2"
            />
          </View>
        </View>

        <View className="mt-6 p-5">
          <Slider />
        </View>
        <View className="mt-4">
          <View className="flex-row justify-between items-center px-5">
            <Text className="text-lg font-extrabold">Sản phẩm mới</Text>
            <Pressable onPress={() => navigation.navigate("productlistscreen")}>
              <Text className="text-xs text-gray-500">Xem tất cả</Text>
            </Pressable>
          </View>
          <ScrollView
            className="mt-4 ml-5"
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            {products?.map(product=>
            <Pressable key={product.id} 
            onPress={() => navigation.navigate("detailscreen",
            {productId:product.id})}>
              <NewArrivalsCard title={product.title} image={product.image} price={product.price} brand={product.brand} />
            </Pressable>
              )}
            
          </ScrollView>
        </View>
        <AuthenticationModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
