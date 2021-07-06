import React, { useEffect } from 'react';
import {Text, View, Image, TouchableOpacity, StyleSheet} from 'react-native';


import {
  textScale,
  moderateScale,
  moderateScaleVertical,
} from '../styles/responsiveSize';
import imagePath from '../constants/imagePath';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const Header = ({
  leftIcon = imagePath.back,
  centerTitle,
  textStyle,
  horizontLine = true,
  rightIcon = '',
  rightIconStyle="",
  onPressLeft,
  onPressRight,
  customRight,
  hideRight=true
}) => {
  const cartAry = useSelector(state => state.main.cartAry);
  const navigation = useNavigation();
  return (
    <>
      <View
        style={{
          ...styles.headerStyle,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <View style={{alignItems:'flex-start',minWidth:moderateScale(72)}}>
        <TouchableOpacity
         
          activeOpacity={0.7}
          onPress={
            !!onPressLeft
              ? onPressLeft
              : () => {
                  navigation.goBack();
                }
          }>
          <Image resizeMode="contain" source={leftIcon} />
        </TouchableOpacity>
        </View>
        <Text
          style={{
            ...styles.textStyle,
            ...textStyle,
            width:150
          }}>
          {centerTitle}
        </Text>
        <View style={{alignItems:'flex-end',minWidth:moderateScale(72)}}>
          <Text style={styles.lenghtText}>{cartAry.length}</Text>
        {!!rightIcon ? (
          <TouchableOpacity onPress={onPressRight}>
            <Image source={rightIcon} style={rightIconStyle} />
          </TouchableOpacity>
        ) : !!customRight ? (
          customRight()
        ) : (
         hideRight? <View style={{width: 25}} />:<Image source={imagePath.cartShop}/>
        )}
        </View>
      </View>
    </>
  );
};
export default Header;
const styles = StyleSheet.create({
  headerStyle: {
    marginHorizontal:10
  },

  textStyle: {

    fontSize: textScale(22),
    lineHeight: textScale(28),
    textAlign: 'center',
    
  },
  lenghtText:{
top:18,
right:12
  }
});
