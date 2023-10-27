import React, { useEffect, useRef, useLayoutEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';

const Board = () => {
  const shouldDrawRef = useRef(false);
  const canvasRef = useRef(null);
  const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);
  const { color, size } = useSelector((state) => state.toolbox[activeMenuItem])

  useEffect(() => {
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