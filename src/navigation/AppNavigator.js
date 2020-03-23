import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import HomeScreen from '../screens/app/HomeScreen';
import CartScreen from '../screens/app/CartScreen';
import { View, Text, StyleSheet, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Animated from 'react-native-reanimated';
import {Context} from '../contexts/AuthContext';
import OrderScreen from '../screens/app/OrderScreen';
import OrderSiteView from '../screens/app/OrderSiteView';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const AppScreen = ({ navigation, style }) => {
    return (
        <Animated.View style={StyleSheet.flatten([styles.stack, style])}>

            <Stack.Navigator headerMode="none">
                <Stack.Screen name="Home">{(props) => <HomeScreen {...props}/>}</Stack.Screen>
                <Stack.Screen name="Cart">{(props) => <CartScreen {...props} />}</Stack.Screen>
                <Stack.Screen name="Order">{(props) => <OrderScreen {...props} />}</Stack.Screen>
                <Stack.Screen name="OrderSite">{(props) => <OrderSiteView {...props} />}</Stack.Screen>
            </Stack.Navigator>
        </Animated.View>
    )
}

const DrawerContent = (props) => {
    const {logout} = useContext(Context);
    return (
        <DrawerContentScrollView {...props} scrollEnabled={false} contentContainerStyle={{ flex: 1 }}>
            <View>
                <View style={{ marginLeft: 20, marginTop : 80 }}>
                    <Image
                        source={{
                            uri: 'https://react-ui-kit.com/assets/img/react-ui-kit-logo-green.png',
                            height: 60,
                            width: 60,
                            scale: 0.5,
                        }}
                        resizeMode="center"
                        style={styles.avatar}
                    />
                    <Text style={{ color: 'white' }}>
                        React UI Kit11
                    </Text>
                    <Text style={{ color: 'white', fontSize: 12 }}>
                        contact@react-ui-kit.com
                    </Text>
                </View>

                <View>
                    <DrawerItem
                        label="Home"
                        labelStyle={styles.drawerLabel}
                        style={styles.drawerItem}
                        onPress={() => props.navigation.navigate('Home')}
                        icon={() => <AntDesign name="home" color="white" size={16} />}
                    />
                    <DrawerItem
                        label="Cart"
                        labelStyle={{ color: 'white', marginLeft: -16 }}
                        style={{ alignItems: 'flex-start', marginVertical: 0 }}
                        onPress={() => props.navigation.navigate('Cart')}
                        icon={() => <AntDesign name="shoppingcart" color="white" size={16} />}
                    />
                    <DrawerItem
                        label="Order"
                        labelStyle={{ color: 'white', marginLeft: -16 }}
                        style={{ alignItems: 'flex-start', marginVertical: 0 }}
                        onPress={() => props.navigation.navigate('Order')}
                        icon={() => <AntDesign name="taobao-square" color="white" size={16} />}
                    />
                </View>

            </View>
            <View >
                <DrawerItem
                    label="Logout"
                    labelStyle={{ color: 'white' }}
                    icon={() => <AntDesign name="logout" color="white" size={16} />}
                    onPress={()=>logout()}
                />
            </View>
        </DrawerContentScrollView>
    )
}

const MainDrawer = () => {
    const [progress, setProgress] = React.useState(new Animated.Value(0));
    const scale = Animated.interpolate(progress, {
        inputRange: [0, 1],
        outputRange: [1, 0.8],
    });
    const borderRadius = Animated.interpolate(progress, {
        inputRange: [0, 1],
        outputRange: [0, 16],
    });

    const animatedStyle = { borderRadius, transform: [{ scale }] };
    return (
        <LinearGradient style={{ flex: 1 }} colors={['#77A1D3','#79CBCA' ,'#E684AE']}>
            <Drawer.Navigator
                drawerType="slide"
                overlayColor="transparent"
                drawerStyle={styles.drawerStyles}
                contentContainerStyle={{ flex: 1 }}
                drawerContentOptions={{
                    activeBackgroundColor: 'transparent',
                    activeTintColor: 'white',
                    inactiveTintColor: 'white',
                }}
                sceneContainerStyle={{ backgroundColor: 'transparent' }}
                drawerContent={props => {
                    setProgress(props.progress);
                    return <DrawerContent {...props} />
                }
                }
            >
                <Drawer.Screen name="App">{(props) => <AppScreen {...props} style={animatedStyle} />}</Drawer.Screen>
            </Drawer.Navigator>
        </LinearGradient>

    )
}

const styles = StyleSheet.create({
    stack: {
        flex: 1,
        shadowColor: '#FFF',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 5,
        // overflow: 'scroll',
        // borderWidth: 1,
    },
    drawerStyles: { flex: 1, width: '50%', backgroundColor: 'transparent' },
    drawerItem: { alignItems: 'flex-start', marginVertical: 0 },
    drawerLabel: { color: 'white', marginLeft: -16 },
    avatar: {
        borderRadius: 60,
        marginBottom: 16,
        borderWidth: StyleSheet.hairlineWidth,
    },
});
export default MainDrawer;



