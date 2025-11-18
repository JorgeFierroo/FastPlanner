import React from "react";

interface ProgressBarProps {
    percentage: number;
}

export default function ProgressBar({percentage}: ProgressBarProps) {
    return (
        <div className="w-full bg-[#efe0b4] rounded-full h-4">
            <div className="bg-[#8C7A4E] h-4 rounded-full transition-all duration-300" 
            style={{width: `${percentage}%`}}></div>
        </div>
    );
}