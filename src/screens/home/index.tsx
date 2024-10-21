import { useEffect, useRef, useState } from "react"


const Home = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setisDrawing] = useState<boolean>(false);

    useEffect(() => {

        const canvas = canvasRef.current;
        if(canvas) {
            const ctx = canvas.getContext("2d");
            if(ctx){
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight - canvas.offsetTop;
                ctx.lineCap = 'round';
                ctx.lineWidth = 3;
            }
        }

    },[]);

    const startDrawing = (e:React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if(canvas){
            const ctx = canvas.getContext('2d');
            if(ctx){
                ctx.beginPath();
                ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
                setisDrawing(true);
            } 
        }
    }

    const endDrawing = () => {
        setisDrawing(false);
    }

    //actual drawing method
    const draw = (e:React.MouseEvent<HTMLCanvasElement>) => {
        if(!isDrawing) return ;

        const canvas  = canvasRef.current;
        if(canvas) {
            const ctx = canvas.getContext('2d');
            if(ctx){
                ctx.strokeStyle = 'white';
                ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
                ctx.stroke();
            }
        }
    }



  return (
    <>

    <canvas
    ref={canvasRef}
    id="canvas"
    className="absolute top-0 left-0 w-full h-full bg-black"
    onMouseDown={startDrawing}
    onMouseUp={endDrawing}
    onMouseMove={draw}
    />
    
    </>
  )
}

export default Home