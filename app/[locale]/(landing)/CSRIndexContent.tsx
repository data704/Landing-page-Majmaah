import Image from 'next/image'
import { useRef } from 'react'
import FlexBetween from './components/FlexBetween'
import { useScrambleText } from '@/app/hooks/useScrambleText'
import Chip from './components/Chip'

const CSRIndexContent = () => {
    const container = useRef<HTMLDivElement>(null);
    useScrambleText({
        selector: ".stats",
        scope: container,
        chars: "0123459,.23%",
    })
    return (
        <>
            <div ref={container} className="flex-1 flex flex-col gap-6 rounded-2xl bg-[#0F172A] border border-[#33415580] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] backdrop-blur-xl p-5">
                <div className="flex items-center justify-center gap-3 h-full">
                    <Image 
                        src="/icons/tree-green-bg-icon.svg" alt="Tree Icon" width={40} height={40}
                        className="rounded-2xl object-cover"
                    />
                    <div className="flex flex-col">
                        <p className="text-[14px] font-semibold leading-6 tracking-[-0.5px] text-[#FFFFFF] ">PROJECT AMAZONIA REFORESTATION</p>
                        <p className="text-xs font-normal leading-4 text-[#94A3B8]">Last updated: 2 hours ago</p>
                    </div>
                    <FlexBetween className="flex items-center gap-2">
                        <Chip color="#00B8A5" className="text-xs leading-4 font-medium px-3 py-1">Verified</Chip>
                        <Chip color="#305F43" className="text-xs leading-4 font-medium">Active</Chip>
                    </FlexBetween>
                </div>
                <div className="flex items-center justify-center gap-4">
                    <div className="rounded-lg bg-[#1E293B80] p-4 text-center w-full">
                        <p className="text-[#FFFFFF] font-bold text-[clamp(16px, 4vw, 24px)] leading-8 mb-1 stats">12,450</p>
                        <p className="text-[#94A3B8] font-normal text-xs leading-4">Trees Detected</p>
                    </div>
                    <div className="rounded-lg bg-[#00B8A51A] p-4 text-center justify-center w-full">
                        <div className="flex items-center justify-center gap-1">
                            <Image src="/icons/rate-icon.svg" alt="Rate Icon" width={16} height={16} />
                            <p className="text-(--color-primary) font-bold text-[clamp(16px, 4vw, 24px)] leading-8 stats">15%</p>
                        </div>
                        <p className="text-[#94A3B8] font-normal text-xs leading-4">Canopy Growth</p>
                    </div>
                    <div className="rounded-lg bg-[#305F431A] p-4 text-center w-full">
                        <div className="flex items-center justify-center gap-1">
                            <Image src="/icons/heart.svg" alt="Heart Icon" width={16} height={16} />
                            <p className="text-[#305F43] font-bold text-[clamp(16px, 4vw, 24px)] leading-8 stats">98.2%</p>
                        </div>
                        <p className="text-[#94A3B8] font-normal text-xs leading-4">Survival Rate</p>
                    </div>
                </div>
                <div className=" flex flex-col gap-2 w-full">
                    <div className="flex items-center justify-between">
                        <p className="text-[#94A3B8] text-sm leading-5">Project Completion</p>
                        <p className="text-white font-medium text-sm leading-5 stats">78%</p>
                    </div>
                    <div className="flex w-full h-2 bg-[#334155] rounded-full">
                        <div className="w-10/12 rounded-full bg-linear-to-r from-[#00B8A5] to-[#305F43]" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default CSRIndexContent