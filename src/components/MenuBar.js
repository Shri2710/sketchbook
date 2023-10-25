import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPencil, faEraser, faRotateLeft,faRotateRight, faFileArrowDown} from '@fortawesome/free-solid-svg-icons';

const MenuBar = () => {
  return (
    <div className='menu-container'>
        <div className='icon-wrapper'>
            <FontAwesomeIcon icon={faPencil} />
        </div>
        <div className='icon-wrapper'>
            <FontAwesomeIcon icon={faEraser} />
        </div>
        <div className='icon-wrapper'>
            <FontAwesomeIcon icon={faRotateLeft} />
        </div>
        <div className='icon-wrapper'>
            <FontAwesomeIcon icon={faRotateRight} />
        </div>
        <div className='icon-wrapper'>
            <FontAwesomeIcon icon={faFileArrowDown} />
        </div>
    </div>
  )
}

export default MenuBar;