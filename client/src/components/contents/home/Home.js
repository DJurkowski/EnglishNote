import React, { useState } from 'react';
import styles from './Home.module.scss';
import cx from 'classnames';

const Home = () => {

    const [flip, setFlip] = useState(false);

    const frontpage = (
        <>
            <h2>Hello in English Note app</h2>
            <p>Take a look and start learning with us</p>
            <small>Tap the card!</small>
        </>
    );

    const backpage = (
        <>
            <h2>You made it!</h2>
            <p>See how easy it is</p>
            <p>Go login and start learning new words</p>
            <p>En(g)joy</p>
        </>
    );

    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <div onClick={()=> setFlip(!flip)} className={cx(styles.card, {[styles.flip]: flip})}>
                    
                    <div className={styles.front}>
                        {frontpage}
                    </div>
                    <div className={styles.back}>
                        {backpage}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;