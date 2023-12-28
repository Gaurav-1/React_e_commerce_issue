addBulk({id: '106def38-905e-4864-b9d6-8d8cec1a6630'})

function addBulk(qry){
    return new Promise((resolve,reject)=>{
        fetch('https://fakestoreapi.com/products')
        .then(res=>{ res.json(); })
        .then(res=>{
            let count=0;
            for(let i=0;i<10;i++){
                res.forEach(ele=>{
                    let ob ={
                        seller_id: qry.id,
                        name: ele.name,
                        description: ele.description,
                        price: ele.price,
                        quantity: 20,
                        image: ele.image
                    }
                    addSellerProduct(ob)
                    .then(res=>{
                        if(affectedRows!=0){
                            count++;
                        }
                    })
                })
            }
            if(count<1){
                reject('No product added')
            }
            else
                resolve(count)
        })
        
    })
}
