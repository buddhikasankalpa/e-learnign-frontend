import { use, useState } from "react"
import { createClient } from "@supabase/supabase-js";

export default function Tested(){

    const [count, setCount] = useState(0);
    const [initial, changing] = useState("☀️");

    return(
        <div className="h-full w-full bg-white flex flex-col justify-center items-center">
            <div className="h-[300px] w-[300px] bg-[#6299BC] flex items-center justify-center mb-[30px]">

                <button className="h-[30px] w-[100px] bg-[#45D1D9] text-center"
                onClick={()=>{
                    setCount(count-1)
                }}
                >
                    Decriment
                </button>

                <h1 className="h-[30px] w-[50px] text-center text-bold">
                    {count}
                </h1>
                
                <button className="h-[30px] w-[100px] bg-[#45D996] text-center"
                onClick={()=>{
                    setCount(count+1)
                }}
                >
                    Incriment
                </button>

            </div>


            <div className="h-[300px] w-[300px] bg-[#736CB2] flex flex-col items-center justify-center mt-[30px]">
                <h1>
                    {initial}

                </h1>
                <div className="">
                <button className="h-[30px] w-[100px] bg-[#45D1D9] text-center hover:bg-[#45D1D9]/30 mr-[30px]"
                onClick={()=>{
                    changing("🌙")
                }}>
                    Night Mode       
                </button>

                <button className="h-[30px] w-[100px] bg-[#45D996] text-center hover:bg-[#45D996]/30 ml-[30px]"
                onClick={()=>{
                    changing("☀️")
                }}>
                    Day Mode
                </button>
                </div>

            </div>
            
        </div>
    )
}