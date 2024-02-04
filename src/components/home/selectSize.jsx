import React from "react";

function selectSize({ setSize }) {
  const handleSize = (e) => {
    setSize(e.target.value);
  };
  return (
    <div className="box">
      <select className="myFont text-sm bgCol1 w-3 sm:w-auto cursor-pointer" onChange={handleSize}>
        <option disabled selected>
          Mousepad
        </option>
        <option value="S">coming</option>
        <option value="M">coming</option>
      </select>
    </div>
  );
}

export default selectSize;
