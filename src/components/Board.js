import React, { useEffect, useRef, useLayoutEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { MENU_ITEMS } from './../constants';
import { menuItemClick, actionItemClick } from './../slice/menuSlice';
const Board = () => {
  const dispatch = useDispatch();
  const shouldDrawRef = useRef(false);
  const canvasRef = useRef(null);
  const { activeMenuItem, actionMenuItem } = useSelector((state) => state.menu);
  const drawHistory = useRef([]);
  const historPointer = useRef(null);
  const { color, size } = useSelector((state) => state.toolbox[activeMenuItem])


  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (actionMenuItem === MENU_ITEMS.DOWNLOAD) {
      const dataUrl = canvas.toDataURL()

      const anchor = document.createElement('a');
      anchor.href = dataUrl;
      anchor.download = 'sketch.jpg';
      anchor.click();

      dispatch(actionItemClick(null))
    } else if (actionMenuItem === MENU_ITEMS.UNDO || actionMenuItem === MENU_ITEMS.REDO) {
      if(actionMenuItem=== MENU_ITEMS.UNDO &&  historPointer.current > 0) historPointer.current-=1;

      if(actionMenuItem=== MENU_ITEMS.REDO &&  historPointer.current < drawHistory.current.length -1) historPointer.current+=1;

       const image = drawHistory.current[historPointer.current];
       context.putImageData(image,0,0);
       dispatch(actionItemClick(null))
    }
  }, [actionMenuItem]);


  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const changeConfig = () => {
      context.strokeStyle = color;
      context.lineWidth = size;
    }

    changeConfig();
  }, [color, size]);


  useLayoutEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const beginPath = (x, y) => {
      context.beginPath();
      context.moveTo(x, y);
    }

    const drawLine = (x, y) => {
      context.lineTo(x, y);
      context.stroke();
    }
    const handleMouseDown = (e) => {
      shouldDrawRef.current = true;

      beginPath(e.clientX, e.clientY)
    }

    const handleMouseMove = (e) => {

      if (!shouldDrawRef.current) return;

      drawLine(e.clientX, e.clientY);

    }

    const handleMouseUp = (e) => {
      shouldDrawRef.current = false;

      const imageData=context.getImageData(0,0,canvas.width,canvas.height);

      drawHistory.current.push(imageData);
      historPointer.current = drawHistory.current.length - 1;
    }
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  console.log(color, size);
  return (
    <canvas ref={canvasRef}></canvas>
  )
}

export default Board