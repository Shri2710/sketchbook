import React from 'react';
import { COLORS, MENU_ITEMS } from '../constants';
import {useSelector,useDispatch} from 'react-redux';
import {changeColor , changeBrushSize} from './../slice/toolBoxSlice';
import { socket } from '../socket';
const ToolBox = () => {

  const dispatch = useDispatch();
  const activeMenuItem = useSelector((state)=>state.menu.activeMenuItem); 
  const {color,size} = useSelector((state)=> state.toolbox[activeMenuItem]) 
  const updateBrushSize = (e)=>{
      dispatch(changeBrushSize({item:activeMenuItem,size:e.target.value}));
      socket.emit("changeConfig",{color,size:e.target.value})
  }

  const updateColor = (newColor)=>{
    dispatch(changeColor({item:activeMenuItem,color:newColor}));
    socket.emit("changeConfig",{color:newColor,size})
  };
  return (
    <div className='toolbox-container'>
       {activeMenuItem === MENU_ITEMS.PENCIL && <div className='tool-item'>
           <h4 className='tool-text'>Stroke</h4>
           <div className='items-container'>
             <div className={`color-box ${color === COLORS.BLACK ? 'active' : ''}`} style={{backgroundColor:COLORS.BLACK}} onClick={()=> updateColor(COLORS.BLACK)} />
             <div className={`color-box ${color === COLORS.RED ? 'active' : ''}`} style={{backgroundColor:COLORS.RED}} onClick={()=> updateColor(COLORS.RED)}/>
             <div className={`color-box ${color === COLORS.GREEN ? 'active' : ''}`} style={{backgroundColor:COLORS.GREEN}} onClick={()=> updateColor(COLORS.GREEN)}/>
             <div className={`color-box ${color === COLORS.BLUE ? 'active' : ''}`} style={{backgroundColor:COLORS.BLUE}} onClick={()=> updateColor(COLORS.BLUE)}/>
             <div className={`color-box ${color === COLORS.ORANGE ? 'active' : ''}`} style={{backgroundColor:COLORS.ORANGE}} onClick={()=> updateColor(COLORS.ORANGE)}/>
             <div className={`color-box ${color === COLORS.YELLOW  ? 'active' : ''}`} style={{backgroundColor:COLORS.YELLOW}} onClick={()=> updateColor(COLORS.YELLOW)}/>
           </div> 
        </div>}
        <div className='tool-item'>
           <h4 className='tool-text'>Brush Size</h4>
           <div className='items-container'>
              <input type='range' min={1} max={10} step={1} onChange={updateBrushSize} value={size}/>
           </div>
        </div>
    </div>
  )
}

export default ToolBox