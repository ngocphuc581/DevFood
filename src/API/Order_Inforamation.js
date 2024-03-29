import {API_General} from './API_General'
const API = API_General+'/OrderDetail'
export const getCart = (id_Cart, setCart) => {
    fetch(API+'/getCart',{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify({
            _id : id_Cart,
        })
    }).then(res=>res.json())
    .then(res=>{
        // console.log(res)
        setCart(res);
    }).catch(err=>console.log(err))
}
export const getFood = (id_Food, setFood) => {
    fetch(API+'/getFood', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify({
            _id : id_Food,
        })
    }).then(res=>res.json())
    .then(res=>setFood(res))
    .catch(err=>console.log(err))
}
export const totalCart = (id_Cart, setTotal) => {
    fetch(API+'/getTotalCart',{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify({
            _id : id_Cart
        })
    }).then(res=>res.json())
    .then(res=>setTotal(res))
    .catch(err=>console.log(err))
}
export const totalQuantity = (id_Cart, setQuantity) => {
    fetch(API+'/getTotalQuantity',{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify({
            _id : id_Cart,
        })
    }).then(res=>res.json())
    .then(res=>setQuantity(res))
    .catch(err=>console.log(err))
}
export const getVoucher = (detail_Voucher, setVoucher) => {
    fetch(API+'/getVoucher', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify({
            _id : detail_Voucher,
        })
    }).then(res=>res.json())
    .then(res=>{
            setVoucher(res);
            console.log(res);
    })
}