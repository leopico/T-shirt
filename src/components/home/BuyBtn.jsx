import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';

const BuyBtn = ({
    size,
    category,
}) => {
    const [popupOpened, setPopupOpened] = useState(false);
    const [finalFrontView, setFinalFrontView] = useState(null);
    const [finalBackView, setFinalBackView] = useState(null);

    const updateFinal = () => {
        const storedFrontData = localStorage.getItem('capturedFrontView');
        const storedBackData = localStorage.getItem('capturedBackView');
        if (!storedFrontData && !storedBackData) {
            return alert("Please update image front and back views");
        }
        setFinalFrontView(storedFrontData);
        setFinalBackView(storedBackData);
    };

    const handlePopupOpen = () => {
        setPopupOpened((pre) => !pre);
    };

    return (
        <div className='w-[50%] relative'>
            <button className="paydbtn flex justify-center items-center text-[2px]" onClick={handlePopupOpen}>
                Buy
            </button>
            {popupOpened && (
                <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-800 bg-opacity-75">
                    <div className="bgCol1 rounded-lg p-8 w-[95%] lg:w-1/2">
                        <div className='flex justify-between items-center mb-10'>
                            <h1 className='myFont tex-xs'>
                                Final view
                            </h1>
                            <button className="" onClick={handlePopupOpen}>
                                <img src="/assets/close.svg"
                                    className="w-8 h-8 sm:w-12 sm:h-12 hover:scale-105 hover:opacity-85 cursor-pointer"
                                    alt="close" />
                            </button>
                        </div>
                        <div>
                            <h1 className='text-center text-xs md:text-sm myFont1 mb-1'>
                                This is final view of front and back
                            </h1>
                        </div>
                        <div>
                            {
                                finalFrontView && finalBackView ? (
                                    <div className="grid grid-cols-2 gap-x-1 md:gap-x-2">
                                        <div className='col-span-1'>
                                            <img src={finalFrontView} alt="front-view"
                                                className="rounded-lg object-cover min-h-52 min-w-28" />
                                        </div>
                                        <div className='col-span-1'>
                                            <img src={finalBackView} alt="back-view"
                                                className="rounded-lg object-cover min-h-52 min-w-28" />
                                        </div>
                                    </div>
                                ) : (
                                    <p className='text-center'>No captured view available</p>
                                )
                            }
                        </div>
                        <div className='mt-2 flex flex-col justify-start space-y-1 myFont1 font-semibold'>
                            <span>size: {size ? size : "please choose size"}</span>
                            <span>category: {category ? category : "please choose category"}</span>
                        </div>
                        <div className='flex justify-between items-center mt-2'>
                            <Button className="myFont text-[8px] md:text-xs p-1 md:p-2"
                                onClick={() => updateFinal()}>
                                final update
                            </Button>
                            <Button className="myFont text-[8px] md:text-xs p-1 md:p-2"
                                onClick={() => alert("Coming soon!")}>
                                Buy now
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default BuyBtn