import React from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import Header from '../../Components/Header';
import FoodDetailsCard from '../../Components/FoodDetailsCard';
import imagePath from '../../constants/imagePath';
import strings from '../../constants/lang';
import navigationStrings from '../../constants/navigationStrings';
import actions from '../../redux/actions';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../styles/responsiveSize';

export default function ProductListing({navigation}) {
  const myData = [
    {
      id: 0,

      photo: imagePath.food1,
      name: 'Kathmandu Chinese Fast Food',
      line: 'Chinese, Fast Food, Pasta',
      price1: 299,
      price2: 359,
      offer: '30% OFF',
      quantity: 0,
    },
    {
      id: 1,
      photo: imagePath.food2,
      name: 'Doaba Sweets',
      line: 'Mithai, South Indian',
      price1: 209,
      price2: 305,
      offer: '20% OFF',
      quantity: 0,
    },
    {
      id: 2,
      photo: imagePath.food3,
      name: 'Noodles With Manchurian',
      line: ' Fast Food, Pasta',
      price1: 159,
      price2: 250,
      offer: '40% OFF',
      quantity: 0,
    },
    {
      id: 3,
      photo: imagePath.food4,
      name: 'Masala Dosa',
      line: 'North Indian, South Indian',
      price1: 299,
      price2: 359,
      offer: '35% OFF',
      quantity: 0,
    },
    {
      id: 4,
      photo: imagePath.food5,
      name: 'Small Gulab Jamun',
      line: ', Beverages, Fast',
      price1: 299,
      price2: 399,
      offer: '25% OFF',
      quantity: 0,
    },
  ];

  const footer = () => {
    return (
      <TouchableOpacity
        style={styles.checkout}
        onPress={() => navigation.navigate(navigationStrings.CHECKOUT_SCREEN)}>
        <Text style={styles.buyText}>Checkout</Text>
      </TouchableOpacity>
    );
  };

  const buyNow = id => {
    let newfoodItemAry = [...myData];
    let index = newfoodItemAry.findIndex(item => item.id === id);
    actions.addCart(newfoodItemAry, index);
  };

  return (
    <View style={{flex: 1}}>
      <Header
        centerTitle={strings.APPTUNIX}
        rightIcon={imagePath.shoppingcart}
        rightIconStyle={styles.rightIconStyle}
        onPressRight={()=>navigation.navigate(navigationStrings.CHECKOUT_SCREEN)}
      />

      <FlatList
        data={myData}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={{marginBottom: 10}} />}
        renderItem={({item}) => <FoodDetailsCard data={item} buyNow={buyNow} />}
        ListFooterComponent={footer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  rightIconStyle: {
    height: moderateScaleVertical(40),
    width: moderateScale(40),
    bottom:8,
    resizeMode:"cover"
  },
  checkout: {
    height: 50,
    width: "95%",
    marginVertical: 30,
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: 'black',
  },
  buyText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
});
