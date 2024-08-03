
import React, { useState } from 'react';
import { IMAGE_URL_W300 } from '../services/constants';
import "../styles/cards.css";

const Card = ({ item, type, onClick }) => {
    return (
        <div className="card" onClick={() => onClick(item)}>
            <img
                src={`${IMAGE_URL_W300}${item.poster_path}`}
                alt={type === 'movie' ? item.title : item.name}
            />
        </div>
    );
};

export default Card;
