import React, { useState } from 'react';
import { Button } from '../ui/button';
import { captureBackView, captureFrontView } from '@/libs/canvas';

const PreviewBtn = ({
  view,
}) => {
  const [popupOpened, setPopupOpened] = useState(false);
  const [capturedFrontView, setCapturedFrontView] = useState(null);
  const [capturedBackView, setCapturedBackView] = useState(null);
  

  const handlePopupOpen = () => {
    setPopupOpened((pre) => !pre);
  };

  return (
    <div className='w-[50%] relative'>
      <button className="previewbtn" onClick={handlePopupOpen}>
        preview
      </button>
      {popupOpened && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-800 bg-opacity-75">
          <div className="bgCol1 rounded-lg p-8 w-[95%] lg:w-1/2">
            <div className='flex justify-between items-center mb-10'>
              <h1 className='myFont tex-xs'>
                {
                  view === "front" ? "Front View" : "Back View"
                }
              </h1>
              <button className="" onClick={handlePopupOpen}>
                <img src="/assets/close.svg"
                  className="w-8 h-8 sm:w-12 sm:h-12 hover:scale-105 hover:opacity-85 cursor-pointer"
                  alt="close" />
              </button>
            </div>
            <div>
              <h1 className='text-center text-xs md:text-sm myFont1 mb-1'>
                Please click update image button if you've changed anything
              </h1>
            </div>
            <div className="flex justify-center items-center w-full h-full">

              {
                view === "front" && capturedFrontView ? (
                  <img src={capturedFrontView} alt="front-view" className="rounded-lg object-cover" />
                ) : (
                  view === "back" && capturedBackView ? (
                    <img src={capturedBackView} alt="back-view" className="rounded-lg object-cover" />
                  ) : (
                    <p>No captured view available</p>
                  )
                )
              }

            </div>
            <div className='flex justify-end items-center mt-2'>
              <div className='flex justify-start items-center'>
                {
                  view === "front" && (
                    <Button className="myFont text-[8px] md:text-xs p-1 md:p-2"
                      onClick={() => captureFrontView(setCapturedFrontView)}>
                      update image
                    </Button>
                  )
                }
                {
                  view === "back" && (
                    <Button className="myFont text-[8px] md:text-xs p-1"
                      onClick={() => captureBackView(setCapturedBackView)}>
                      update image
                    </Button>
                  )
                }
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PreviewBtn