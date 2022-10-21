import { Fragment } from 'react';
import classes from './Modal.module.css';
import  ReactDOM  from 'react-dom';

const Backdrop = props => {
    return <div className={classes.backdrop} onClick={props.onHideCart}></div>
};

const ModalOverlay = props =>{
    return <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
    </div>
};

const portalElement = document.getElementById('overlays'); // Ezzel adom meg, hogy hol akarom használni a Portal segítségével

function Modal(props) {
    return ( 
        <Fragment>
            {ReactDOM.createPortal(<Backdrop onHideCart={props.onHideCart}></Backdrop>, portalElement)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
        </Fragment>
     );
}

export default Modal;