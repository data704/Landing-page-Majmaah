import Image from "next/image"
import { useRef } from "react";
import { useScrambleText } from "@/app/hooks/useScrambleText";

const ESGIndexContent = () => {
    const container = useRef<HTMLDivElement>(null);
    useScrambleText ({
        selector: ".stats",
        scope: container,
        chars: "0123456789μg/m³%°C",
    })
    return (
        <div ref={container} className="flex-1 flex flex-col gap-6 rounded-2xl bg-[#0F172A] border border-[#33415580] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] backdrop-blur-xl p-5">
            <div className="flex items-center justify-between h-full">
                <p className="text-[16px] font-semibold leading-6 tracking-[-0.4px] text-[#FFFFFF] ">Environmental Dashboard</p>
                <p className="text-xs font-normal leading-4 text-[#94A3B8]">Real-time monitoring</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4">

                {/* Left Large AQI Card */}
                <div className="flex flex-col items-center justify-center gap-2 bg-[#1E293B80] p-4 rounded-2xl">
                    <Image src="/icons/42-AQI.svg" alt="AQI Icon" width={128} height={128} />
                    <div className="px-3 py-1.5 rounded-full bg-[#00B8A5]/10 text-[#00B8A5] inline-flex items-center justify-center">
                        Good
                    </div>
                </div>

                {/* Right Smaller Cards */}
                <div className="grid grid-cols-2 gap-2">

                    {/* Temperature */}
                    <div className="flex flex-col items-center justify-center gap-1 bg-[#1E293B80] p-3 rounded-2xl">
                        <Image src="/icons/temp.svg" alt="Temp Icon" width={16} height={16} />
                        <p className="text-white font-bold text-lg leading-7 stats">24°C</p>
                        <p className="text-[#94A3B8] text-[10px] leading-2">Temp</p>
                    </div>

                    {/* Humidity */}
                    <div className="flex flex-col items-center justify-center gap-1 bg-[#1E293B80] p-3 rounded-2xl">
                        <Image src="/icons/humadity.svg" alt="Humidity Icon" width={16} height={16} />
                        <p className="text-white font-bold text-lg leading-7 stats">65%</p>
                        <p className="text-[#94A3B8] text-[10px] leading-2">Humidity</p>
                    </div>

                    {/* PM2.5 */}
                    <div className="flex flex-col items-center justify-center gap-1 bg-[#1E293B80] p-3 rounded-2xl col-auto md:col-span-2">
                        <Image src="/icons/pmg2.5.svg" alt="PMG Icon" width={16} height={16} />
                        <p className="text-white font-bold text-lg leading-7 stats">12 μg/m³</p>
                        <p className="text-[#94A3B8] text-[10px] leading-2">PM2.5</p>
                    </div>
                </div>
            </div>
            <div>
                <Image src="/icons/areas.svg" alt="Areas Image" width={490} height={170} />
            </div>

        </div>
    )
}

export default ESGIndexContent