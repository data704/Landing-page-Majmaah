import React from "react"

const Chip = ({ children, color, className }: {
    children: React.ReactNode, color?: string, className?: string
}) => {
    return (
        <div className={`inline-flex items-center justify-center px-2 py-1 rounded-full  ${className}`}
            style={{
                backgroundColor: color ? `${color}1A` : undefined,
                color: color
            }}
        >{children}</div>
    )
}

export default Chip