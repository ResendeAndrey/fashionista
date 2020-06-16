import React, {useState, useEffect} from 'react';

import { useHistory } from 'react-router-dom'

import axios from 'axios';

import Header from '../../components/Header'

import './styles.css'

const Home = () => {
    const history = useHistory()
    const [products, setProducts] = useState([])
    


    useEffect(() => {
        axios.get('https://5e9935925eabe7001681c856.mockapi.io/api/v1/catalog').then(res => {

            setProducts(res.data)
        })
        
    }, []) 

    function handleSelectItem(id) {

        axios.get('https://5e9935925eabe7001681c856.mockapi.io/api/v1/catalog')
            .then(item => {
               item.data.forEach(item => {
                   const productsId = item.code_color
                   if(productsId === id) {
                       history.push(`/detail/${id}`)
                   }
                   
               }, ) 
               
            })
            
        }

        if(!products) {
            return null
        }

        

    return (
        <div id="page-home">
            <Header handleSelectProduct={products.length} />
            <main>
            <div className="total-items">
                <span>{products.length} items</span>
            </div>
                <div className="container">
                    <div className="card-home">
                        {products.map(product => (
                        <div className="card" key={product.code_color} onClick={() => handleSelectItem(product.code_color)}>
                            <img src={product.image.length > 0 ? product.image : 'https://via.placeholder.com/470x594/FFFFFF/?text=Imagem+Indispon%C3%ADvel'} alt={product.name}/>
                            <h3> {product.name} </h3>
                            <p className="card-price__regular">{product.regular_price === product.actual_price ? '' : product.regular_price} </p>
                            <p> {product.actual_price} </p>
                            <p className="card-discount"> {product.discount_percentage.length>0 ? "-" + product.discount_percentage : "" } </p>
                        </div>
                        ))}
                    </div>
                    
                </div>
            </main>
        </div>
    )
}

export default Home