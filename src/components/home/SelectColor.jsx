import { tshirtImages } from "@/constants/constant";

const SelectColor = ({ color, handleColorClick }) => {

  return (
    <div className="flex space-x-1 sm:space-x-3 mx-auto cursor-pointer">
      
      {tshirtImages.map((tshirt, index) => (
        <div
          key={index}
          onClick={() => handleColorClick(tshirt.color)}
          className={`
            ${color === tshirt.color ? "border-black/75 border-2" : ""}
            w-[20px] h-[20px] lg:w-[30px] lg:h-[30px]  
            bg-[${tshirt.colorCode}] border hover:border-3 duration-100
            `}
        ></div>
      ))}

    </div>
  );
};

export default SelectColor;
