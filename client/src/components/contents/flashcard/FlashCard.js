import React, { useState } from 'react';
import styles from './FlashCard.module.scss';

const FlashCard = ({word}) => {

    const [flip, setFlip] = useState(false);

    const handleFlipButton = () => {
        const parent = document.getElementById('card' + word._id); 
        setFlip(!flip);
        if(flip) {
            parent.classList.add(styles.flip);
        } else {
            parent.classList.remove(styles.flip);
        }
    };

    const backpage = (
        word.synonyms.length > 0 ?
        <div className={styles.back} data-test='back'>
            <h3>{word.polishword}</h3>
            <p>{word.synonyms.map(synonym => synonym + ' ' )}</p>
        </div>
        :
        <h3>{word.polishword}</h3>
    );

    return (
        <div id={'card' + word._id} onClick={handleFlipButton} className={styles.card} data-test='card'>
             <div className={styles.front} data-test='front'><h3>{word.englishword}</h3></div>
             {backpage} 
        </div>
    );
};

export default FlashCard;