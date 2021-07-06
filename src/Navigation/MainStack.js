import React from 'react';

import navigationStrings from '../constants/navigationStrings';
import { CheckoutScreen, ProductListing } from '../Screens';


export default function (Stack) {
  return (
    <>
      <Stack.Screen
        name={navigationStrings.PRODUCT_LISTING}
        component={ProductListing}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={navigationStrings.CHECKOUT_SCREEN}
        component={CheckoutScreen}
        options={{headerShown: false}}
      />
      

    </>
  );
}