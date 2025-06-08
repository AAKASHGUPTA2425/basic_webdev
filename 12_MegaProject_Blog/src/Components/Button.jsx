import React from 'react'

function Button({
    children,
    type='button',
    bgcolor='bg-blue-600',
    textcolor='text-white',
    classname='',
    ...props
}) {
    return (
        <button className={`px-4 py-2 rounded-lg ${classname} ${textcolor} ${bgcolor}`}
         {...props}>
            {children}
         </button>
    )
}

export default Button
