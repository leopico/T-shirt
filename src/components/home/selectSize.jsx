import React from "react";

function selectSize({ setSize }) {
  const handleSize = (e) => {
    setSize(e.target.value);
  };
  return (
    <div className="box">
      <select className="myFont text-[14px] bgCol1 cursor-pointer w-3 sm:w-auto" onChange={handleSize}>
        <option disabled selected>
          Size
        </option>
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="L">L</option>
        <option value="XL">XL</option>
        <option value="XXL">XXL</option>
      </select>
    </div>
  );
}

export default selectSize;
