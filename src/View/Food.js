import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    ScrollView,
    ToastAndroid,
    Alert,
} from 'react-native';
import { onHandlerFood } from "../API/Food";
import { styles } from "../Style/Food";
import { Card } from 'react-native-paper';
import Icon from'react-native-vector-icons/FontAwesome5';
import {onHandlerCheckCart, onHandlerCheckFood, onHandlerUpdateQuantityUp, updateTotal} from '../API/Cart';
import { greendark, greenlight, white, yellow } from "../Style/colors";
import { useSelector, useDispatch } from 'react-redux'
import { AddCart, UpdateCart } from "../../Redux/Actions/CartAction";
import { getOrder } from "../API/Order";
import { AddOrder } from "../../Redux/Actions/OrderAction";
import {API_General} from '../API/API_General'
const renderItem = (item, setImage, setName, setPrice, name, setID) => {
    const onHandlerPress = () => {
        setID(item._id);
        setImage(item.img);
        setName(item.name)
        setPrice(item.price)
    }
    return (
        <View>
            {
                item.name == name ?
                <Card onPress={onHandlerPress} style={[styles.containerFood]}>
                    <Image source={{uri : item.img}}
                            style={[styles.image,{backgroundColor : yellow,  opacity : 0.4}]}
                            resizeMode='center'/>
                </Card>
                :
                <Card onPress={onHandlerPress} style={styles.containerFood}>
                    <Image source={{uri : item.img}}
                            style={styles.image}
                            resizeMode='center'/>
                </Card>
            }
        </View>
    )
}
export default Food = () => {
    const [image,setImage] = useState('https://gallery.yopriceville.com/var/resizes/Free-Clipart-Pictures/Decorative-Elements-PNG/Background_and_Blank_Effect_Transparent_PNG_Clip_Art_Image.png?m=1507172114');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [id, setID] = useState('');
    const [data, setData] = useState([]);
    const Account  = useSelector(state=>state.Login)
    const dispatch = useDispatch();
    const API = API_General+'/Cart'
    const onHandlerAddFood = () => {
        if(name.length == 0) {
            Alert.alert('Warning','Vui lòng nhấn vào món ăn để thêm vào giỏ hàng',[
                {
                    text : 'OK',
                }
            ])
        } else {
            fetch(API+'/checkCart',{
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify({
                    id_Account : Account.idAccount,
                })
            })
            .then(res =>res.json())
            .then(result => {
                if(result == null){
                    fetch(API+'/insert',{
                        method : 'POST',
                        headers : {
                            'Content-Type' : 'application/json',
                        },
                        body : JSON.stringify({
                            id_Account : Account.idAccount,
                            detail_Cart : [
                                {
                                    id_Food : id,
                                    quantity : 1,
                                    price : price,
                                }
                            ],
                            total : 0,
                            state : true,            
                        })
                    }).then(res=>res.json())
                    .then(result => {
                        dispatch(AddCart(id, 1, price));
                        updateTotal(Account.idAccount)
                    })
                    .catch(err=>console.log(err))
                } else {
                    fetch(API+'/checkFood',{
                        method : 'POST',
                        headers : {
                            'Content-Type' : 'application/json',
                        },
                        body : JSON.stringify({
                            id_Account : Account.idAccount,
                            id_Food : id, 
                        })
                    })
                    .then(res=>res.json())
                    .then(result=>{
                        if(result ==''){
                            fetch(API+'/insertFood', {
                                method : 'POST',
                                headers : {
                                    'Content-Type' : 'application/json',
                                },
                                body : JSON.stringify({
                                    id_Account : Account.idAccount,
                                    id_Food : id,
                                    price : price,
                                })
                            })
                            .then(res=>res.json())
                            .then(result=>{updateTotal(Account.idAccount)
                                        dispatch(AddCart(id, 1, price))
        })
                            .catch(err=>console.log(err))
                        } else {
                            fetch(API+'/updateQuantityUp', {
                                method : 'POST',
                                headers : {
                                    "Content-Type" : 'application/json'
                                },
                                body : JSON.stringify({
                                    id_Account : Account.idAccount,
                                    id_Food : id,
                                })
                            }).then(res=>res.json())
                            .then(result => {
                                var t, tt;
                                t = result.detail_Cart.filter(item=>item.id_Food == id)
                                tt = t[0];
                                dispatch(UpdateCart(id,tt.quantity, (tt.price/tt.quantity)*tt.quantity))
                                updateTotal(Account.idAccount)
                            })
                            .catch(err=>console.log(err))
                        }
                    })
                    .catch(err=>console.log(err))
                }
            })
            ToastAndroid.show('Món ăn đã được thêm vào giỏ hàng',ToastAndroid.SHORT);
        }
    }
    useEffect(()=>{
        onHandlerFood(setData);
    },[])
    return(
        <View style={styles.container}>
                <View style={{width : '100%', height : '23%',marginTop : 8}}>
                    <FlatList data={data}
                                renderItem={({item})=> renderItem(item,setImage,setName,setPrice,name,setID)}
                                horizontal={true}
                                keyExtractor={(item,index)=>item._id}
                                style={{width : '100%', height : '100%'}}/>
                </View>
                <View style={styles.containerDetail}>
                    <View style={styles.containerDetail2}>
                        <Image source={{uri : image}}
                                style={styles.imageDetail}
                                resizeMode ='cover'/>
                        <Text style={styles.text}>{name}</Text>
                        <Text style={styles.textDetail}>Sản phẩm được chế tác từ các nghệ nhân bậc nhất của đất nước Việt Nam</Text>
                        <Text style={styles.text}>{price}.000 VNĐ</Text>
                        <TouchableOpacity style={styles.button} onPress={onHandlerAddFood}>
                            <Icon name="cart-plus" color={white} size={32}/>
                        </TouchableOpacity>
                    </View>
                </View>
        </View>
    )
}