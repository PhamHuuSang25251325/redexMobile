import React, { useContext, useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../../shared/CustomHeader';
import { WebView } from 'react-native-webview';
import {Context} from '../../contexts/CartContext';


const OrderSiteView = ({ navigation, route }) => {
    const {addItem} = useContext(Context);
    const { uri, title } = route.params;
    const [visible, setVisible] = useState(true);



    const showSpinner = () => {
        setVisible(true);
    }

    const hideSpinner = () => {
        setVisible(false);
    }

    const handleMessageAddToCart = e => {
        const data = JSON.parse(e.nativeEvent.data);
        addItem(data);
    }


    const myScript = `
        var css = ".sang-style{background: #FFF; position : fixed;bottom : 0; width : 100%; z-index : 99999999999; padding: 5px 10px}.sang-style input{width: 100%; padding: 8px 10px; border-radius: 2px; margin-bottom: 5px; border: 1px solid #ddd}.sang-style button{width:50%; padding: 10px 10px;color:#FFF;background:rgb(1, 82, 230);border:none}.sang-style button:last-child{background:rgb(230, 64, 1)}";
        var myStyle = document.createElement("style");
        myStyle.innerText = css;
        const head = document.getElementsByTagName("head")[0];
        head.appendChild(myStyle);
        const body = document.getElementsByTagName("body")[0];

        function getStringAttribute(){
            let text = '';
            const selectedTextElement = document.querySelector(".modal-sku-title .modal-sku-title-selected-text");
            if(selectedTextElement){
                text = selectedTextElement.innerText;
            }
            return text;
        }
        
        function getPrice(){
            let price = 0;
            const priceTextElement = document.querySelector(".modal-sku-title .modal-sku-title-price");
            if(priceTextElement){
                price= priceTextElement.innerText;
                if(!isNaN(price)){
                    price=+price;
                }
            }

            return price;
        }

        function getQuantity(){
            let quantity = 0;
            const quantityDiv = document.querySelector(".modal-sku-content-quantity .sku-number");
            if(quantityDiv){
                const inputQuantity = quantityDiv.getElementsByTagName('input');
                if(inputQuantity && inputQuantity.length){
                    quantity = inputQuantity[0].value;
                    if(!isNaN(quantity)){
                        quantity=+quantity;
                    }
                }
            }
            return quantity;
        }

        function getProductName() {
            let name= '';
            const divNameTitle = document.querySelector(".title-wrapper .title");
            
            if(divNameTitle){
                const fontWrraper = divNameTitle.childNodes;
                name= divNameTitle.innerText;
                
            }
            return name;
            
        }

        function getShopName(){
            let shop_name = '';
            const shopTitle = document.querySelector(".shop-title-wrapper .shop-title");
            const pTitle= shopTitle.getElementsByTagName("p");
            if(pTitle && pTitle.length){
                shop_name = pTitle[0].innerText;
            }
            return shop_name;
        }

        function getShopLogo(){
            let shop_logo = '';
            const shopTitle = document.querySelector(".shop-title-wrapper .shop-image");
            const imgLogo= shopTitle.getElementsByTagName("img");
            if(imgLogo && imgLogo.length){
                shop_logo= imgLogo[0].getAttribute('src');
            }
            return shop_logo;
        }

        function getShopId(prop) {
            const shop = document.querySelector(".shop-wrapper .shop-title-wrapper");
            if (shop) {
                if (prop === 'shop_id' || prop === 'item_id') {
                    let href = 'https:' + shop.getAttribute('href');
                    if (href) {
                        const url = new URL(href);
                        if (prop === 'shop_id') {
                            return url.searchParams.get("user_id");
                        }
                        return url.searchParams.get("item_id");
                    }
                    return '';
                }

            }
            return '';

        }

        function getImgLink() {
            try {
                let img_src = "";
                // taobao.com
                const modal_image = document.getElementsByClassName('modal-sku-image');
                if (modal_image.length) {

                    const img = modal_image[0].getElementsByTagName('img');
                    if (img.length) {
                        img_src = img[0].getAttribute('src');
                        return  img_src;
                    }
                }

            } catch (e) {
                return "";
            }
        }

        function createDialog() {
            var myDialog = document.createElement("div");
            myDialog.classList.add("sang-style");
            const inputNote = document.createElement("input");
            inputNote.placeholder = "Ghi chú";
            myDialog.appendChild(inputNote);
            const btnViewCart = document.createElement("button");
            btnViewCart.innerText = "Xem thuộc tính";
            btnViewCart.style.width = '50%'
            btnViewCart.addEventListener('click', function () {
                const xx = document.getElementsByClassName('sku card');
                xx[0].click();
            })
            myDialog.appendChild(btnViewCart);
            const btnAdd = document.createElement("button");
            btnAdd.innerText = "Cho vào giỏ hàng";
            btnAdd.addEventListener('click', function () {
                const props = document.getElementsByClassName('modal-sku-content');
                if (props.length) {
                    let count = 0;
                    for (var i = 0; i < props.length; i++) {
                        const selected_props = props[i].getElementsByClassName('modal-sku-content-item-active');
                        if (selected_props != null && selected_props != 'undefined')
                            count += selected_props.length;
                    }
                    if (count < props.length) {
                        alert('Chưa chọn đủ thuộc tính SP')
                    } else {
                        const img_link = getImgLink();
                        const url_sp=window.location.href;
                        const attibute = getStringAttribute();
                        const price = getPrice();
                        const quantity = getQuantity();
                        const shop_logo = getShopLogo();
                        const shop_name = getShopName();
                        const product_name = getProductName();
                      
                        window.ReactNativeWebView.postMessage(JSON.stringify({
                            image_link : img_link,
                            url : url_sp,
                            attibute : attibute,
                            price : price,
                            quantity : quantity,
                            shop_logo : shop_logo,
                            shop_name : shop_name,
                            product_name : product_name
                        }))
                    }
                } else {
                    alert('SP k can chon thuoc tinh')
                }

            })
            myDialog.appendChild(btnAdd);
            body.appendChild(myDialog);
        }
        createDialog();
    `;
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <CustomHeader title={title} navigation={navigation} />
            <WebView
                style={styles.WebViewStyle}
                source={{ uri }}
                onLoadStart={showSpinner}
                onLoad={hideSpinner}
                javaScriptEnabled={true}
                injectedJavaScript={myScript}
                onMessage={handleMessageAddToCart}
            />
            {visible && (
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <ActivityIndicator
                        size="large"
                    />
                </View>
            )}

        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    WebViewStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginTop: 20,
    },
})



export default OrderSiteView;