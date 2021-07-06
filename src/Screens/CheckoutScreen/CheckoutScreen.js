import React, { useEffect , useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  
} from 'react-native';
import {useSelector} from 'react-redux';
import Header from '../../Components/Header';
import imagePath from '../../constants/imagePath';
import strings from '../../constants/lang';
import actions from '../../redux/actions';
import { moderateScale, moderateScaleVertical } from '../../styles/responsiveSize';


export default function CheckoutScreen() {
  const cartAry = useSelector(state => state.main.cartAry);
  console.log(cartAry);
  const [total, setTotal] = useState()
  const [totalPrice2, settotalPrice2] = useState()

  const common = () => {
    

    let check = cartAry.length;
    let totalHere = 0;
    let totalHerePrice2 = 0;

    for (let i = 0; i < check; i++) {
      totalHere += cartAry[i].price1 * cartAry[i].quantity;
      totalHerePrice2 += cartAry[i].price2 * cartAry[i].quantity;
    }

    
      setTotal(totalHere)
      settotalPrice2(totalHerePrice2)
    
  };


  useEffect(() => {
   
    common()
  }, [])


  const _renderItem = ({item, index}) => {
    return (
      <View>
        <View style={styles.rowDirection}>
          <Image source={item.photo} style={styles.photo} />
          <View style={styles.colDirection}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
              <TouchableOpacity onPress={() => {actions.deleteFromCart(item.id) ,common()}}>
                <Image source={imagePath.delete} style={styles.delete} />
              </TouchableOpacity>
            </View>

            <Text style={styles.line} numberOfLines={2}>{item.line}</Text>
            {/* <Text style={styles.line}>Size:8</Text> */}
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.line}> Rs {item.price1}</Text>
              <Text style={styles.line2}> Rs {item.price2}</Text>
              <Text style={styles.line3}>({item.offer})</Text>
              <Text></Text>
            </View>

            <View style={styles.newView}>
              <TouchableOpacity onPress={() => {actions.sub(cartAry ,index), common()}}>
                <Text style={styles.sub}>-</Text>
              </TouchableOpacity>
              <Text style={styles.count}>{item.quantity}</Text>
              <TouchableOpacity onPress={() => {actions.add(cartAry ,index) , common()}}>
                <Text style={styles.add}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex:1}}>

<Header
        centerTitle={strings.CART}
        rightIcon={imagePath.shoppingcart}
        rightIconStyle={styles.rightIconStyle}
        
      />

        <ScrollView>
        <FlatList
        data={cartAry}
        // showsVerticalScrollIndicator={false}
        // numColumns={2}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={{marginBottom: 10}} />}
        renderItem={(item, index) => _renderItem(item, index)}
      />



<View>
            <Text style={{marginTop: 7, fontWeight: 'bold', marginLeft: 8}}>
              PRICE DETAILS ({cartAry.length} Items)
            </Text>
            <View
              style={{
                backgroundColor: 'gray',
                height: 1,
                opacity: 0.5,
                marginLeft: 8,
                marginRight: 8,
                marginBottom: 8,
                marginTop: 5,
              }}></View>

            <View style={styles.paymentRow}>
              <Text style={{opacity: 0.7}}>Total MRP</Text>
              <Text style={{marginLeft: 'auto'}}>Rs. {totalPrice2}</Text>
            </View>
            <View style={styles.paymentRow}>
              <Text style={{opacity: 0.7}}>Discount on MRP</Text>
              <Text style={{marginLeft: 'auto'}}>
                {' '}
                - Rs. {totalPrice2 - total}
              </Text>
            </View>
            <View style={styles.paymentRow}>
              <Text style={{opacity: 0.7}}>Convenience Fee</Text>
              <Text
                style={{
                  marginLeft: 'auto',
                  textDecorationLine: 'line-through',
                }}>
                Rs.99
              </Text>
              <Text > FREE</Text>
            </View>
            <View
              style={{
                backgroundColor: 'gray',
                height: 1,
                opacity: 0.5,
                marginLeft: 8,
                marginRight: 8,
                marginBottom: 8,
                marginTop: 5,
              }}></View>
            <View style={styles.paymentRow}>
              <Text style={{opacity: 0.7, fontWeight: 'bold'}}>
                Total Amount
              </Text>
              <Text style={{marginLeft: 'auto', fontWeight: 'bold'}}>
                Rs. {total}
              </Text>
            </View>
          </View>
        </ScrollView>
     
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
  photo: {
    width: 150,
    height: 200,
    borderRadius:10,
    marginVertical:5,
    marginHorizontal:5

  },
  rowDirection: {
    flexDirection: 'row',
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 3,
    marginLeft: 3,
    marginTop: 2,
    borderRadius:10
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    width:150
  },
  colDirection: {
    flexDirection: 'column',
    marginLeft: 20,
  },
  add: {
    fontSize: 25,
    paddingLeft: 12,
    paddingTop: 2,

    borderRadius: 50,
    width: 40,
    height: 40,
    color: "black",
    marginTop:15,
  },
  count: {
    fontSize: 20,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 20,
  },
  sub: {
    fontSize: 35,
    paddingLeft: 16,

    borderRadius: 100,
    width: 40,
    height: 40,
    color: "black",
    marginTop:9,
  },
  line: {
    marginTop: 10,
    fontSize: 15,
  },
  line2: {
    marginTop: 13,
    fontSize: 15,
    fontSize: 12,
    textDecorationLine: 'line-through',
  },
  line3: {
    marginTop: 10,
    fontSize: 15,
    color: '#54baa4',
  },
  newView: {
    // marginLeft:-40,
    flexDirection: 'row',
  },
  paymentRow: {
    flexDirection: 'row',
    marginTop: 5,
    marginRight: 8,
    marginLeft: 8,
  },
  placeOrder: {
    height: 50,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 5,
  },
  delete: {
    width: 20,
    height: 20,
    // backgroundColor: '#FF3F6D',
    marginHorizontal: 20,
    marginTop: 25,
    marginLeft: 50,
  },
  deleteTouch: {
    width: 80,
    height: 80,
  },
});
