
import React from 'react';
import NavigatorConatiner from './src/navigation/NavigatorContainer';
import { Provider as AuthProvider } from './src/contexts/AuthContext'
import { Provider as CartProvider } from './src/contexts/CartContext'



const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <NavigatorConatiner />
      </CartProvider>
    </AuthProvider>
  )
}



export default App;
