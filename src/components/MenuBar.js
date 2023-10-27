import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPencil, faEraser, faRotateLeft,faRotateRight, faFileArrowDown} from '@fortawesome/free-solid-svg-icons';
import {useDispatch} from 'react-redux';
import {MENU_ITEMS} from './../constants';
import {menuItemClick,actionItemClick} from './../slice/menuSlice';
import {useSelector} from 'react-redux';

const MenuBar = () => {

    const dispatch = useDispatch();
    const activeMenuItem = useSelector((state)=>state.menu.activeMenuItem);  
    const handleMenuClick = (itemName)=>{
        dispatch(menuItemClick(itemName));
    }

    const handleActionItemClick = (itemName)=>{
        dispatch(actionItemClick(itemName));
    }
  return (
    <div className='menu-container'>
        <div className={`icon-wrapper ${activeMenuItem === MENU_ITEMS.PENCIL ? 'active' : ''}`} onClick={()=> handleMenuClick(MENU_ITEMS.PENCIL)}>
            <FontAwesomeIcon icon={faPencil} />
        </div>
        <div className={`icon-wrapper ${activeMenuItem === MENU_ITEMS.ERASER ? 'active' : ''}`} onClick={()=> handleMenuClick(MENU_ITEMS.ERASER)}>
            <FontAwesomeIcon icon={faEraser}  />
        </div>
        <div className='icon-wrapper' onClick={()=> handleActionItemClick(MENU_ITEMS.UNDO)}>
            <FontAwesomeIcon icon={faRotateLeft} />
        </div>
        <div className='icon-wrapper' onClick={()=> handleActionItemClick(MENU_ITEMS.REDO)}>
            <FontAwesomeIcon icon={faRotateRight} />
        </div>
        <div className='icon-wrapper' onClick={()=> handleActionItemClick(MENU_ITEMS.DOWNLOAD)}>
            <FontAwesomeIcon icon={faFileArrowDown} />
        </div>
    </div>
  )
}

export default MenuBar;