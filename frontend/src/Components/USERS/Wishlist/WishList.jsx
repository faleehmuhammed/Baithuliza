import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { BsCartPlus } from "react-icons/bs";

import './Wishlist.css'

function WishList() {
    console.log('wish working');
    const [wishes, setwishes] = useState()


    const getWishlist = (txt) => {

        axios.get('http://localhost:8008/wishlist').then((response) => {
            console.log(response);

            setwishes(response.data.message[0].favs)
        })
    }

    useEffect(() => {
        getWishlist()
    }, [])
    return (
        <div className='wish-main' >
            <div className="wish-head">
                <div className="wish-card-container">
                {
                   wishes&& wishes.map((i) => (
                        
                            <div className="wish-card">
                                <div className="wish-card-top">
                                <img height='90%' width='80%' src={i.url} alt="" />
                                </div>
                                <div className="wish-card-bottom">
                                <h1>{i.Name}</h1>
                                <h1>{i.Category}</h1>
                                <h1>{i.Price}</h1>
                                <Button variant="outline-dark">Add to cart <BsCartPlus/></Button>{' '}
                                {/* <button  className='btn btn-primary' ></button> */}
                                </div>
                            </div>
                        
                    ))
                }
                </div>


            </div>

        </div>
    )
}

export default WishList;
