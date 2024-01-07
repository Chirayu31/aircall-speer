import React from 'react'

const Container = ({ children }) => {
    return (
        <div className='w-full h-screen flex justify-center items-center' >
            <div className='bg-gray-200 h-[750px] w-[450px] rounded-[30px] drop-shadow-2xl overflow-y-auto	no-scrollbar'>
                {children}
            </div>
        </div>
    )
}

export default Container