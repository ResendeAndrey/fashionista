import React, {useState, useEffect, useRef } from 'react';
import {useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './styles.css'

import Header from '../../components/Header'

import axios from 'axios'

import { addItem, increment, decrement } from '../../store/ducks/Cart/index'

const Detail = () => {

  

    const dispatch = useDispatch()
    const _isMouted = useRef(true)
    const code_color = useParams()
    const [produtSelected, setprodutSelected] = useState([]);
    const [productSize, setProductSize] = useState([])
    const [sizes, setSize] = useState([])
    const cart = useSelector(state => state)

    useEffect(() => {
    
         axios.get('https://5e9935925eabe7001681c856.mockapi.io/api/v1/catalog')
            .then(res => {
                if(_isMouted.current) {
                    res.data.forEach(item => {
                          if(item.code_color === code_color.style) {
                            setprodutSelected(item)
                            setProductSize(item.sizes)
                          }
                      })
                }
            })
            return () => {
                _isMouted.current = false
            }
    },[produtSelected, code_color])
    
    function handleSizeClick(id) {
        setSize(id)
        
    }

    function addItemcart (productid) {
 
        if(sizes.length === 0) {
            return 
        } else {
               dispatch(addItem({
                    productid, 
                    sizes,
                }))   
            }
    }
    return (
        <div className="" id="page-detail">
            <Header  />
            <div className="product-detail container">
                <div className="image-detail">
                    <img src={produtSelected.image === '' ? 'https://via.placeholder.com/470x594/FFFFFF/?text=Imagem+Indispon%C3%ADvel' : produtSelected.image} alt={produtSelected.name}/>
                </div>
                <div className="product-characteristics">
                    <h2> {produtSelected.name} </h2>
                    <div className="product-price">
                        <div className="regular-price">
                            {produtSelected.actual_price}
                        </div>
                        <div className="installments">
                          em até  {produtSelected.installments}
                        </div>
                    </div>
                    <div className="product-size">
                        <h4>Escolha o Tamanho</h4>
                        {sizes.length === 0 ? (
                            <p className='product-warning'>Voce precisa escolher um tamanho</p>
                        ) : ''}
                        <div className="sizes"> 
                        {productSize.map(tamanhos => (
            
                            <span key={tamanhos.sku} onClick={() => handleSizeClick(tamanhos.size)} className={tamanhos.available === true ? '' : 'sizes-null'} >                                        
                               <p className={sizes === tamanhos.size ? 'sizes-active' : 'sizes-title'}>
                                    {tamanhos.available === true ?  tamanhos.size : ''} 
                               </p>
                            </span>                        
                        
                        ))}
                        </div>
                    </div>
                    <button  onClick={() => addItemcart(produtSelected)}> Adicionar à Sacola</button>
                </div>
            </div>
        </div>
    )
}

export default Detail