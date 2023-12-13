/* eslint-disable react/prop-types */
import { forwardRef, useId } from 'react'

function Select({
    options,
    lable,
    className,
    ...props
}, ref) {
    const id = useId()
    return (
        <div className="w-full">
            <label htmlFor={id} className=''>{lable}</label>
            <select
                id={id}
                ref={ref}
                {...props}
                className={`px-3 py-2 rounded-lg outline-none bg-white text-black focus:bg-gray-50 border border-gray-200 duration-200 w-full ${className}`}
            >
                {
                    options?.map((option) => (
                        <option
                            key={option}
                            value={option}

                        >
                            {option}
                        </option>
                    ))
                }
            </select>
        </div>
    )
}

export default forwardRef(Select)