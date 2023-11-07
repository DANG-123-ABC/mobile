// import { StyleSheet, Text, View, Pressable, Image } from "react-native";
// import React from "react";
// import Suit from "../../assets/suit.png";
import React, { useState , useEffect } from 'react';
import { View, Image, ScrollView, Dimensions, StyleSheet,Text,Pressable } from 'react-native';

// const OfferCard = () => {
//   return (
//     <View className="flex-row max-w-[250px] py-2 mr-6 max-h-[160px] overflow-hidden bg-[#c7c7c7] rounded-2xl">
//       <View className="px-4 py-2">
//         <Text className="font-extrabold text-2xl">50% Off</Text>
//         <Text className="text-lg">On everything today</Text>
//         <Text className="text-xs my-2">With code: FSCREATION</Text>

//         <Pressable className="bg-black w-20 rounded-2xl">
//           <Text className="text-white text-xs font-semibold mx-3 my-1">
//             Get Now
//           </Text>
//         </Pressable>
//       </View>
//       <View>
//         <Image source={Suit} className="object-contain h-[150px] w-[55px]" />
//       </View>
//     </View>
//   );
// };

// export default OfferCard;

// const styles = StyleSheet.create({});


const images = [
  'https://scontent.fhan14-4.fna.fbcdn.net/v/t39.30808-6/340583161_539754424983491_2424276536403477601_n.jpg?stp=cp6_dst-jpg&_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_ohc=EaqjX593vFcAX_bocsL&_nc_ht=scontent.fhan14-4.fna&cb_e2o_trans=t&oh=00_AfBRn0ebTZ3ZKdSjuCCMzfsoPGWS2qUIq0ENrGuY69p_7w&oe=654BDBEC',
  'https://scontent.fhan14-2.fna.fbcdn.net/v/t39.30808-6/314652746_659151052401915_4700286614345986728_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_ohc=mn2Y-xTgVLYAX-gIJqB&_nc_ht=scontent.fhan14-2.fna&cb_e2o_trans=t&oh=00_AfBP9yFqQNyAod-1u_f6LOZc93On3-oW-dh2SrZQBktITQ&oe=654C8A15',
  'https://scontent.fhan14-4.fna.fbcdn.net/v/t39.30808-6/305663145_607237017780458_6291059881702519282_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=jJ3jRswZjMMAX86lEpH&_nc_ht=scontent.fhan14-4.fna&cb_e2o_trans=t&oh=00_AfDvOeoyzUuOhJuLAxu1QTCCIw5LW1XAKu7n16EwtKTHkg&oe=654C820D',
  'https://scontent.fhan14-3.fna.fbcdn.net/v/t31.18172-8/10428409_704106136342329_6077627691700599974_o.jpg?_nc_cat=104&ccb=1-7&_nc_sid=2be8e3&_nc_ohc=SL8TtrXh72oAX-ZPLyn&_nc_ht=scontent.fhan14-3.fna&cb_e2o_trans=t&oh=00_AfCPnT53pmgYaBUsiXQpf7kEZFeo1z4NmRujSJIG5nRw1A&oe=656F35B7',
  'https://scontent.fhan14-2.fna.fbcdn.net/v/t39.30808-6/395140854_929065092077175_1794722730731340217_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_ohc=qAG9jBWvD34AX-JsLZ0&_nc_ht=scontent.fhan14-2.fna&cb_e2o_trans=t&oh=00_AfAJsHSvFxkkrkvaOxg8D0Y-crVUL6X2vltxFPCQmnHMnw&oe=654C4A08',
];

const OfferCard = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event) => {
    const slideWidth = Dimensions.get('window').width;
    const newIndex = Math.round(event.nativeEvent.contentOffset.x / slideWidth);
    setActiveIndex(newIndex);
  };

  useEffect(() => {
    const slideInterval = setInterval(() => {
      // Tự động chuyển đổi slider sau một khoảng thời gian
      const newIndex = (activeIndex + 1) % images.length;
      setActiveIndex(newIndex);
    }, 3000); // Thay đổi khoảng thời gian ở đây (3 giây = 3000 milliseconds)

    return () => {
      clearInterval(slideInterval); // Hủy bỏ interval khi component bị unmounted
    };
  }, [activeIndex]);

  return (
    <View style={styles.sliderContainer}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        contentOffset={{ x: activeIndex * Dimensions.get('window').width, y: 0 }}
      >
        {images.map((image, index) => (
          <Image key={index} source={{ uri: image }} style={styles.image} />
        ))}
      </ScrollView>
      <View style={styles.paginationContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              { backgroundColor: index === activeIndex ? 'black' : 'gray' },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    width: '100%',
    height: 200,
  },
  image: {
    width: Dimensions.get('window').width,
    height: 200,
  },
  paginationContainer: {
    display: 'none',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 5,
  },
});

export default OfferCard;


