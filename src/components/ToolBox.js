import React from 'react'
import { COLORS } from '../constants'
const ToolBox = () => {

  const updateBrushSize = ()=>{}
  return (
    <div className='toolbox-container'>
        <div className='tool-item'>
           <h4 className='tool-text'>Stroke</h4>
           <div className='items-container'>
             <div className='color-box' style={{backgroundColor:COLORS.BLACK}} />
             <div className='color-box' style={{backgroundColor:COLORS.RED}} />
             <div className='color-box' style={{backgroundColor:COLORS.GREEN}} />
             <div className='color-box' style={{backgroundColor:COLORS.BLUE}} />
             <div className='color-box' style={{backgroundColor:COLORS.ORANGE}} />
             <div className='color-box' style={{backgroundColor:COLORS.YELLOW}} />
           </div> 
        </div>
        <div className='tool-item'>
           <h4 className='tool-text'>Brush Size</h4>
           <div className='items-container'>
              <input type='range' min={1} max={10} step={1} onChange={updateBrushSize} />
           </div>
        </div>
    </div>
  )
}

export default ToolBox