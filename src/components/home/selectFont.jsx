import React, { useState } from "react";

function SelectFont({ frontPrintStyle, frontText, setFrontText }) {
  const [showList, setShowList] = useState(false);

  const fontOptions = [
    {
      value: "printFont1 text-lg",
      label: "Dingos",
      print: "printFont1 text-lg",
    },
    {
      value: "printFont2 text-2xl",
      label: "Lucidity",
      print: "printFont2 text-2xl",
    },
    {
      value: "printFont3 text-3xl",
      label: "Harlow",
      print: "printFont3 text-3xl -ml-4",
    },
    {
      value: "printFont4 text-xl",
      label: "Cubao",
      print: "printFont4 text-xl -ml-5",
    },
    {
      value: "printFont5 text-2xl",
      label: "Rubik One",
      print: "printFont5 text-2xl -ml-3",
    },
    {
      value: "printFont6 text-2xl",
      label: "More Sugar",
      print: "printFont6 text-2xl",
    },
  ];

  return (
    <div>
      {frontPrintStyle === "text" && (
        <div className="relative">
          <button
            className={`h-[40px] px-4 py-2 ${frontText.value}`}
            onClick={() => setShowList(!showList)}
          >
            {frontText.label}
          </button>
          <ul className="absolute w-[200px] font-list bgCol1 text-start">
            {showList &&
              fontOptions.map((option, index) => (
                <div key={index}>
                  {/* <div
                    onClick={() => setShowList(!showList)}
                    className="fixed bg-red-200 z-0 top-0 left-0 w-screen h-screen flex items-center justify-center"
                  ></div> */}
                  <li
                    key={option.value}
                    className={`h-[40px] z-30 ${option.value} ${
                      option.label == frontText.label && "selected"
                    }`}
                    onClick={() => {
                      setFrontText({
                        ...frontText,
                        value: option.value,
                        label: option.label,
                        print: option.print,
                      });
                      setShowList(false);
                    }}
                  >
                    {option.label}
                  </li>
                </div>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SelectFont;
