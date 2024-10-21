import { useEffect, useRef, useState } from "react"
import { SWATCHES } from "@/CONSTANTS";
import { ColorSwatch,Group } from "@mantine/core";
import { Button } from "@/components/ui/button";
import axios from "axios";

interface Response {
    expr:string;
    result:string;
    assign:string;
}

interface GeneratedResult{
    expression: string;
    answer: string;
}

const Home = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setisDrawing] = useState<boolean>(false);
    const [brushColor,setbrushColor] = useState<string>('white');
    const [reset,setreset] = useState<boolean>(false);
    const [result,setresult] = useState<GeneratedResult>();
    const [dictOfVars,setdictOfVars] = useState({});

    //function for sending data to the backend for calculation
    const sendData = async() => {
        const canvas = canvasRef.current;
        if(canvas){
            const Response = await axios({
                method:'POST',
                url:`${process.env.API_URL}/calculate`,
                data:{
                    image: canvas.toDataURL('image/png'),
                    dict_of_vars:dictOfVars
                }
            })

            console.log('response received',Response);
        }
    }

    useEffect(()=>{
       if(reset){
        resetCanvas();
        setreset(false);
       }
    },[reset])

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

    const resetCanvas = ( ) => {
        const canvas = canvasRef.current;
        if(canvas) {
            const ctx = canvas.getContext('2d');
            if(ctx){
                ctx.clearRect(0,0, canvas.width, canvas.height);
            }
        }
    }

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
                ctx.strokeStyle = `${brushColor}`;
                ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
                ctx.stroke();
            }
        }
    }



  return (
    <>

    <div className="grid grid-cols-3 gap-2 mt-6">
        <Button onClick={() => setreset(true)} className="z-20 bg-black text-white font-bold text-xl" variant='default' color='black'>Reset</Button>
        <Group className="z-20">
        {
            SWATCHES && SWATCHES.map((color,index) => 
              <ColorSwatch className="cursor-pointer hover:scale-110" key={index} color={color} onClick={() => setbrushColor(color)}  /> 
            )
        }
    </Group>
    <Button onClick={() => sendData()} className="z-20 bg-black text-white font-bold text-xl" variant='default' color='black'>Run</Button>

    </div>

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