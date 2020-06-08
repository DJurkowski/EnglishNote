import React, { useState } from 'react';
import styles from './Home.module.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cx from 'classnames';

const Home = ({auth: {isAuthenticated, loading, user}}) => {

    const [flip, setFlip] = useState(false);

    const frontpage = (
        !loading && isAuthenticated && user ? (
            <>
                <h2>Hello {user.name}</h2>
                <p>Take a look and start learning with us</p>
                <small>Tap the card!</small>
            </>
        ) : (
            <>
                <h2>Hello in English Note app</h2>
                <p>Take a look and start learning with us</p>
                <small>Tap the card!</small>
            </>
        )

    );

    const backpage = (

        !loading && isAuthenticated ? (
            <>
                <h2>You made it!</h2>
                <p>See how easy it is</p>
                <p>Go to the folders section and start learning</p>
                <p>En(g)joy</p>
            </>
        ) : (
            <>
                <h2>You made it!</h2>
                <p>See how easy it is</p>
                <p>Go login and start learning new words</p>
                <p>En(g)joy</p>
            </>
        )
        
    );

    return (
        <div className={styles.wrapper} data-test='wrapper'>
            <div className={styles.content}>
                <div onClick={()=> setFlip(!flip)} className={cx(styles.card, {[styles.flip]: flip})} data-test='card'>
                    
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

Home.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});


export default connect(mapStateToProps, null)(Home);