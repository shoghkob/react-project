import React from "react";
import "./cart.css";
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom'
const Cart = ({ cart, setCart }) => {

    // +
    const incqty = (product) => {
        const exist = cart.find((x) => {
            return x.id === product.id
        })
        setCart(cart.map((curElm) => {
            return curElm.id === product.id ? {...exist, qty: exist.qty + 1} : curElm
        }))
    }
    // - 
    const decqty = (product) => {
        const exist = cart.find((x) => {
            return x.id === product.id
        })
        setCart(cart.map((curElm) => {
            return curElm.id === product.id ? {...exist, qty: exist.qty - 1} : curElm
        }))
    }

    //remove
    const removeproduct = (product) => {
        const exist = cart.find((x) => {
            return x.id === product.id
        })
        if(exist.qty > 0) {
            setCart(cart.filter((curElm) => {
                return curElm.id !== product.id 
            }))
        }
    }

    //total price
    const total = cart.reduce((price, item) => price + item.qty * item.price, 0)
    return (
        <div className="cart">
            <h3>#cart</h3>
            {
                cart.length === 0 &&
                <>
                    <div className="empty_cart">
                        <h2>Your Shopping cart is empty</h2>
                        <Link to="/shop"><button>Shop Now</button></Link>
                    </div>
                </>
            }
            <div className="container">
                {
                    cart.map((curElm) => {
                        return (
                            <>
                                <div className="box">
                                    <div className="img_box">
                                        <img src={curElm.image} alt=""></img>
                                    </div>
                                    <div className="detail">
                                        <div className="info">
                                            <h4>{curElm.cat}</h4>
                                            <h3>{curElm.Name}</h3>
                                            <p>Price: ${curElm.price}</p>
                                            <p>Total: ${curElm.price * curElm.qty}</p>
                                        </div>

                                        <div className="quantity">
                                            <button onClick={() => incqty (curElm)}>+</button>
                                            <input type="number" value={curElm.qty}></input>
                                            <button onClick={() => decqty (curElm)}>-</button>
                                        </div>
                                        <div className="icon">
                                            <li onClick={() => removeproduct(curElm)}><AiOutlineClose /></li>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    })
                }
            </div>
            <div className="bottom">
                {
                    cart.length > 0 && 
                    <>
                    <div className="total">
                        <h4>Total: ${total}</h4>
                    </div>
                    <button>checkout</button>
                    </>
                }
            </div>
        </div>
    )
}

export default Cart