import {API_General} from'./API_General'
var API = API_General+'/Cart';
const onHandlerInsertCart = (id_Account, id_Food, price) => {
    fetch(API+'/insert',{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify({
            id_Account : id_Account,
            detail_Cart : [
                {
                    id_Food : id_Food,
                    quantity : 1,
                    price : price,
                }
            ],
            total : 0,
            state : true,            
        })
    }).then(res=>res.json())
    .then(result => console.log(result))
    .catch(err=>console.log(err))
}
const onHandlerInsertFood = (id_Account, id_Food, price) => {
    fetch(API+'/insertFood', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify({
            id_Account : id_Account,
            id_Food : id_Food,
            price : price,
        })
    })
    .then(res=>res.json())
    .then(result=>console.log(result))
    .catch(err=>console.log(err))
}

const onHandlerCheckFood = (id_Account, id_Food, price) => {
    fetch(API+'/checkFood',{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify({
            id_Account : id_Account,
            id_Food : id_Food, 
        })
    })
    .then(res=>res.json())
    .then(result=>{
        if(result ==''){
            onHandlerInsertFood(id_Account, id_Food, price)
        } else {
            onHandlerUpdateQuantityUp(id_Account, id_Food)
        }
    })
    .catch(err=>console.log(err))
}

export const onHandlerUpdateQuantityUp = (id_Account, id_Food) => {
    fetch(API+'/updateQuantityUp', {
        method : 'POST',
        headers : {
            "Content-Type" : 'application/json'
        },
        body : JSON.stringify({
            id_Account : id_Account,
            id_Food : id_Food,
        })
    }).then(res=>res.json())
    .then(result => {
        updateTotal(id_Account);
    })
    .catch(err=>console.log(err))
}
export const onHandlerUpdateQuantityDown = (id_Account, id_Food) => {
    fetch(API+'/updateQuantityDown', {
        method : 'POST',
        headers : {
            "Content-Type" : 'application/json'
        },
        body : JSON.stringify({
            id_Account : id_Account,
            id_Food : id_Food,
        })
    }).then(res=>res.json())
    .then(result => {
        updateTotal(id_Account)
    })
    .catch(err=>console.log(err))
}

export const onHandlerCheckCart = (id_Account, id_Food, price) => {
    fetch(API+'/checkCart',{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify({
            id_Account : id_Account,
        })
    })
    .then(res =>res.json())
    .then(result => {
        if(result == null){
            onHandlerInsertCart(id_Account, id_Food, price)
        } else {
            onHandlerCheckFood(id_Account, id_Food, price)
        }
    })
}

export const getCart = (id_Account, setData) => {
    fetch(API+'/get',{
        method : 'POST',
        headers :{
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            id_Account : id_Account,
        })
    })
    .then(res=>res.json())
    .then(result=>{setData(result); console.log(result)})
    .catch(err=>console.log(err))
}

export const getFood = (id_Food,setName, setImg) => {
    fetch(API+'/getFood',{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            _id : id_Food,
        })
    })
    .then(res=>res.json())
    .then(result=>{
        setName(result.name);
        setImg(result.img);
    })
    .catch(err=>console.log(err))
}

export const updateTotal = (id_Account) =>{
    fetch(API+'/updateTotal',{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify({
            id_Account : id_Account,
        })
    }).then(res=>res.json())
    .then(result=>console.log(result))
    .catch(err=>console.log(err))
}

export const getTotal = (id_Account, setTotal) => {
    fetch(API+'/getTotal',{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify({
            id_Account : id_Account
        })
    }).then(res=>res.json())
    .then(result =>{
        setTotal(result)
    })
    .catch(err=>err)
}
export const getTotal2 = (id_Account, setTotal, apply, setSum) => {
    fetch(API+'/getTotal',{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify({
            id_Account : id_Account
        })
    }).then(res=>res.json())
    .then(result =>{
        setTotal(result-apply)
        setSum(result)
    })
    .catch(err=>err)
}
export const getIdVoucher = (id_Account, setVoucher) => {
    fetch(API+'/getIdVoucher',{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify({
            id_Account : id_Account
        })
    }).then(res=>res.json())
    .then(result=>setVoucher(result))
    .catch(err=>console.log(err))
}
export const getVoucher = (id_Food, setVoucher) => {
    fetch(API+'/getVoucher',{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify({
            _id : id_Food,
        })
    }).then(res=>res.json())
    .then(result => {
        // console.log(result);
        setVoucher(result)
    })
    .catch(err=>console.log(err))
}
export const getQuantity = (id_Account, id_Food) => {
    fetch(API+'/getQuantity',{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            id_Account : id_Account,
            id_Food : id_Food,
        })
    }).then(res=>res.json())
    .then(result => console.log(result))
    .catch(err=>console.log(err))
}
export const RemoveItemCart = (id_Account, id_Food) => {
    fetch(API+'/delete', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify({
            id_Account : id_Account,
            id_Food : id_Food,
        })
    }).then(res=>res.json())
    .then(result=>console.log(result))
    .catch(err=>console.log(err))
}
export const checkVoucher = (_id) => {
    fetch(API_General+'/Cart/checkVoucher', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify({
            _id : _id,
        })
    })
    .then(res=>res.json())
    .then(res=>{
        if(res.length > 0) {
            console.log('Sử dụng được');
        } else {
            console.log('Không sử dụng được')
        }
    })
    .catch(err=>console.log(err))
}