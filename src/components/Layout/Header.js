import React,{Fragment} from 'react';
import mealsImage from '../../assets/meals.jpg';
import HeaderCartButton from './HeaderCartButton';
import classes from './Header.module.css';
const Header=props=>{
    return <Fragment>
        <header className={classes.header}>
            <h2>Amitex Food Court</h2>
            <HeaderCartButton onClick={props.onShowCart}></HeaderCartButton>
        </header>
        <img src={mealsImage} alt="Amitex" className={classes['main-image']}></img>
    </Fragment>
}
export default Header;