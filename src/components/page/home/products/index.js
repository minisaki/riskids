import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import productApi from '../../../../api/productApi'

export default function Index() {
    const {id} = useParams()
    console.log(id)
    
    const [product, setProduct] = useState({})
    const [productId, setProductId] = useState(id)

    console.log(productId)

    useEffect(() => {
        (async () => {
          try {
            setProductId(id)
            // const { data } = await productApi.get(productId);
            // setProduct(data);
            // console.log({ data});
            console.log(productId)
          } catch (error) {
            console.log('Failed to fetch product: ', error);
          }
    
        //   setLoading(false);
        })();
      }, [productId]);
    return (
        <div style={{marginTop: 300}}>
            
        </div>
    )
}
