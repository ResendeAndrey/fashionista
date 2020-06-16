import React, {useState, useEffect, useRef} from 'react';

import { FiSearch, FiShoppingBag, FiArrowLeft } from 'react-icons/fi'
import { useHistory } from 'react-router-dom';

import './styles.css';
import {useSelector, useDispatch} from 'react-redux'
import {removeItem} from '../store/ducks/Cart/index'
import axios from 'axios'

const Header = () => {

    const _isMouted = useRef(true)
    const history = useHistory()
    const dispatch = useDispatch()

    const [ shoppingCart, setShoppingCart] = useState(false)
    const [serach, setsearch] = useState(false)
    const [productSearch, setProductSearch] = useState([])
    const [searchItems, setSearchItems] = useState([])
    const [subTotal, setSubTotal] = useState([0])
    const [total, SetTotal] = useState([0])
    

    const cart = useSelector(state =>  state)
    const length = useSelector(state => state.length)
    const qtd = 0


    
    function handleNavigateBack () {
        history.push('/')
    }
    
    function handleClickShopIcon() { 

        setShoppingCart(true)
        
        if(shoppingCart === true) {
            setShoppingCart(false)
        }
    }

    function handleClickSearchIcon() { 

        setsearch(true)
        
        if(serach === true) {
            setsearch(false)
        }
    }
    
    useEffect(() => {
        axios.get('https://5e9935925eabe7001681c856.mockapi.io/api/v1/catalog')
            .then(res => {          
            setProductSearch(res.data)
            })
        
            
    }, [])
    
    

    function handleSearchProducts (event) {
        
    event = event.trim().toLowerCase()
        
        
    if(event.length > 0) {
        const filtered = productSearch.filter(item => item.name.toLowerCase().includes(event))
        setSearchItems(filtered)
    } else {
        setSearchItems([])
    }    
}

   useEffect(() => {
    const counts = cart.map(item => item.productid.actual_price)
    
    const newTotal = counts.reduce((total, item) => (total += Number(item.replace(/R\$ /g, '').replace(',', '.'))),0)
    
    setSubTotal(newTotal)
    return () => {
        _isMouted.current = false
    }
    
    }, [cart]) 

    console.log(cart)
   function removeItemCart (productId){
       
     dispatch(removeItem(productId))
    }

    function handleNavigateToID(id){
        history.push(`/detail/${id}`)
    }



    return (          
    
        
 
    <>
    <header>
        <div className="container">
            <nav className="navbar-top">
                 <h1 onClick={handleNavigateBack}>Fashionista</h1> 
                <div className="navbar-top__icons">
                    <span className="navbar-top__searchicon">
                        <FiSearch size={20} onClick={handleClickSearchIcon}/>
                    </span>
                    <div className="navbar-top__shopcart">
                        <span className="navbar-top__shopicon" onClick={handleClickShopIcon}>
                            <FiShoppingBag size={20}/> 
                            <span className="navbar-products__selected">{length}</span>
                        </span>
                    </div>
                </div>
            </nav>
        </div>
    </header>
    {shoppingCart === true ? (
        <div className="shoppingcart-background">
            <div className="shoppingcart">
                <div className="shoppingcart-title">
                    <FiArrowLeft size={20} className="navbar-top-icon__fiarrowleft" onClick={handleClickShopIcon}/>
                    <h3>Sacola({length})</h3>
                </div>
                <div className={length === 0 ? 'shoppingcart-body' : 'shoppingcart-body__full'}>
                    {length === 0 ? <p> Sua sacola está vazia :\</p> 
                    :
                    <> 
                    {cart.map((item, index) => (
                        
                        <div key={index} className="items-cart" >
                            <div className="items-cart__image">
                                <img src={item.productid.image} alt={item.productid.name}/>
                                <p className="items-cart__remove" onClick={() => removeItemCart(item.productid.code_color)}> Remover Item</p>
                            </div>
                            <div className="items-cart__items">
                                <div className="items-cart__nameprice">
                                    <p>{item.productid.name}</p>
                                    <span>{item.productid.actual_price}</span>
                                </div>
                                <div className="items-cart__sizeinstallments">
                                   <span> Tam: {item.sizes}</span>
                                    <span> {item.productid.installments}</span>
                                </div>
                            </div>
                        </div>
                    
                    ))}
                  
                    </>
                    }
                </div>
                <div className="shoppingcart-total">
                    <h3>Subtotal - R$ {subTotal}</h3>
                </div>
            </div>
        </div>
    ) : null }
    
    {serach === true ? (
        <div className="shoppingcart-background">
            <div className="shoppingcart">
                <div className="shoppingcart-title">
                    <FiArrowLeft size={20} className="navbar-top-icon__fiarrowleft" onClick={handleClickSearchIcon}/>
                    <h3>Buscar Produtos</h3>
                    <input type="text" placeholder="Buscar por produto..." onChange={(e) => handleSearchProducts(e.target.value)}/>
                </div>
                <div className={searchItems.length === 0 ? 'shoppingcart-body' : 'shoppingcart-search__full' }>
                    {searchItems.length === 0 ? <p> Nenhum Produto Encontrado :\</p> 
                    :
                    <> 
                    {searchItems.map(item => (
                        <div key={item.code_color} className="search-items-card" onClick={() => handleNavigateToID(item.code_color)}>
                            <div className="search-image">
                                <img src={item.image} alt={item.name}/>
                            </div>
                            <div className="items-cart__items">
                                <div className="items-cart__nameprice">
                                    <p>{item.name}</p>
                                    <span>{item.actual_price}</span>
                                </div>
                                <div className="search-items__installments">
                                    <span> {item.installments}</span>
                                </div>
                            </div>
                        </div>
                    ))}

                  
                    </>
                    }
                </div>
            </div>
        </div>
    ) : null }
    


   </> 
   
   )
}

export default Header