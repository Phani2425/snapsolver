import { ColorSwatch, Group } from '@mantine/core';
import { Button } from '@/components/ui/button';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Draggable from 'react-draggable';
import {SWATCHES} from '@/constants';
import { MenuIcon } from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetFooter,
    SheetClose,
    SheetTrigger
    
  } from "@/components/ui/sheet"
  
// import {LazyBrush} from 'lazy-brush';

interface GeneratedResult {
    expression: string;
    answer: string;
}

interface Response {
    expr: string;
    result: string;
    assign: boolean;
}

// MathJax type definitions
declare global {
    interface MathJaxConfig {
      tex2jax: {
        inlineMath: [string, string][];
      };
    }
  
    interface MathJaxHub {
      Config: (config: MathJaxConfig) => void;
      Queue: (args: (string | unknown[])[]) => void;
      Typeset: (element?: HTMLElement | null) => void;
    }
  
    interface Window {
      MathJax: {
        Hub: MathJaxHub;
      }
    }
  }

export default function Home() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [color, setColor] = useState('rgb(255, 255, 255)');
    const [reset, setReset] = useState(false);
    const [dictOfVars, setDictOfVars] = useState({});
    const [result, setResult] = useState<GeneratedResult>();
    const [latexPosition, setLatexPosition] = useState({ x: 10, y: 200 });
    const [latexExpression, setLatexExpression] = useState<Array<string>>([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // const lazyBrush = new LazyBrush({
    //     radius: 10,
    //     enabled: true,
    //     initialPoint: { x: 0, y: 0 },
    // });



    useEffect(() => {
        if (result) {
            renderLatexToCanvas(result.expression, result.answer);
        }
    }, [result]);

    useEffect(() => {
        if (reset) {
            resetCanvas();
            setLatexExpression([]);
            setResult(undefined);
            setDictOfVars({});
            setReset(false);
        }
    }, [reset]);

    useEffect(() => {
        const canvas = canvasRef.current;
    
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight - canvas.offsetTop;
                ctx.lineCap = 'round';
                ctx.lineWidth = 3;
            }

        }


    }, []);


    useEffect(() => {
        const initMathJax = (): HTMLScriptElement => {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.9/MathJax.js?config=TeX-MML-AM_CHTML';
            script.async = true;
            
            script.onload = () => {
                if (window.MathJax) {
                    const config: MathJaxConfig = {
                        tex2jax: {
                            inlineMath: [['$', '$'], ['\\(', '\\)']]
                        }
                    };
                    window.MathJax.Hub.Config(config);
                }
            };
            
            document.head.appendChild(script);
            return script;
        };

        const script = initMathJax();
        return () => {
            if (script && document.head.contains(script)) {
                document.head.removeChild(script);
            }
        };
    }, []);


    useEffect(() => {
        if (latexExpression.length > 0 && window.MathJax) {
            // Use type assertion to help TypeScript understand the argument structure
            const typesetArg: [string, unknown] = ["Typeset", window.MathJax.Hub];
            setTimeout(() => {
                window.MathJax.Hub.Queue([typesetArg]);
            }, 0);
        }
    }, [latexExpression]);

    const renderLatexToCanvas = (expression: string, answer: string) => {
        const latex = `\\(\\LARGE{${expression} = ${answer}}\\)`;
        setLatexExpression([...latexExpression, latex]);

        // Clear the main canvas
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        }
    };


    const resetCanvas = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        }
    };

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.style.background = 'black';
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.beginPath();
                ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
                setIsDrawing(true);
            }
        }
    };
    const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing) {
            return;
        }
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.strokeStyle = color;
                ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
                ctx.stroke();
            }
        }
    };
    const stopDrawing = () => {
        setIsDrawing(false);
    };  

    const runRoute = async () => {
        const canvas = canvasRef.current;
    
        if (canvas) {
            const response = await axios({
                method: 'post',
                url: `${import.meta.env.VITE_API_URL}/calculate`,
                data: {
                    image: canvas.toDataURL('image/png'),
                    dict_of_vars: dictOfVars
                }
            });

            const resp = await response.data;
            console.log('Response', resp);
            resp.data.forEach((data: Response) => {
                if (data.assign === true) {
                    // dict_of_vars[resp.result] = resp.answer;
                    setDictOfVars({
                        ...dictOfVars,
                        [data.expr]: data.result
                    });
                }
            });
            const ctx = canvas.getContext('2d');
            const imageData = ctx!.getImageData(0, 0, canvas.width, canvas.height);
            let minX = canvas.width, minY = canvas.height, maxX = 0, maxY = 0;

            for (let y = 0; y < canvas.height; y++) {
                for (let x = 0; x < canvas.width; x++) {
                    const i = (y * canvas.width + x) * 4;
                    if (imageData.data[i + 3] > 0) {  // If pixel is not transparent
                        minX = Math.min(minX, x);
                        minY = Math.min(minY, y);
                        maxX = Math.max(maxX, x);
                        maxY = Math.max(maxY, y);
                    }
                }
            }

            const centerX = (minX + maxX) / 2;
            const centerY = (minY + maxY) / 2;

            setLatexPosition({ x: centerX, y: centerY });
            resp.data.forEach((data: Response) => {
                setTimeout(() => {
                    setResult({
                        expression: data.expr,
                        answer: data.result
                    });
                }, 1000);
            });
        }
    };

    const openRef = useRef<HTMLButtonElement>(null);
    const closeRef = useRef<HTMLButtonElement>(null);

    const handleOpenChange = (open:boolean) => {
        setIsMenuOpen(open);
    }

    return (
        <>

             
                <Sheet onOpenChange={handleOpenChange}>

                <SheetTrigger>
        <Button variant="outline" className='hidden' ref={openRef} >Open</Button>
      </SheetTrigger>
                
                <SheetContent side={'left'} className='bg-slate-950'>
                  <SheetHeader >
                    <SheetTitle><div className='font-semibold text-2xl text-white '>SnapSolver</div></SheetTitle>
                    <SheetDescription>
                      
                    </SheetDescription>
                  </SheetHeader>

                  <div className=' grid-cols-1 gap-4 mt-3 grid'>
                <Button
                    onClick={() => {setReset(true);setIsMenuOpen(false);}}
                    className='z-20 bg-black text-white font-bold text-xl'
                    variant='default' 
                    color='black'
                >
                    Reset
                </Button>
                <Button
                     
                    onClick={() => {runRoute();setIsMenuOpen(false);}}
                    className='z-20 bg-black text-white font-bold text-xl'
                    variant='default'
                    color='white'
                >
                    Run
                </Button>
                <Group className='z-20 flex '>
                    {SWATCHES.map((swatch) => (
                        <ColorSwatch className='cursor-pointer hover:scale-110' key={swatch} color={swatch} onClick={() => setColor(swatch)} />
                    ))}
                </Group>
               
            </div>
                  
                  <SheetFooter>
                    <SheetClose>
                      <Button onClick={() => setIsMenuOpen(false)} ref={closeRef} className='hidden'></Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            


            <div className='w-full h-14 bg-slate-900 z-20 top-0 left-0 block fixed md:hidden  '>
                <div className='flex w-10/12 mx-auto justify-between items-center h-full'>
                <div className='font-semibold text-2xl text-white '>SnapSolver</div>
                <div className='p-2 bg-slate-700 rounded-full cursor-pointer hover:scale-105' onClick={() => {
                    
                
                    if(isMenuOpen){
                        closeRef?.current?.click();
                        
                    }else{
                        openRef?.current?.click();
                    }
    
                
                } }><MenuIcon className='text-white'/></div>
                </div>
            </div>
            <div className=' grid-cols-3 gap-2 hidden md:grid'>
                <Button
                    onClick={() => setReset(true)}
                    className='z-20 bg-black text-white font-bold text-xl'
                    variant='default' 
                    color='black'
                >
                    Reset
                </Button>
                <Group className='z-20'>
                    {SWATCHES.map((swatch) => (
                        <ColorSwatch className='cursor-pointer hover:scale-110' key={swatch} color={swatch} onClick={() => setColor(swatch)} />
                    ))}
                </Group>
                <Button
                    onClick={runRoute}
                    className='z-20 bg-black text-white font-bold text-xl'
                    variant='default'
                    color='white'
                >
                    Run
                </Button>
            </div>
            <canvas
                ref={canvasRef}
                id='canvas'
                className='absolute top-0 left-0 w-full h-full bg-black'
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseOut={stopDrawing}
            />

            {latexExpression && latexExpression.map((latex, index) => (
                <Draggable
                    key={index}
                    defaultPosition={latexPosition}
                    onStop={(_, data) => setLatexPosition({ x: data.x, y: data.y })}
                >
                    <div className="absolute p-2 text-white rounded shadow-md">
                        <div className="latex-content">{latex}</div>
                    </div>
                </Draggable>
            ))}
        </>
    );
}