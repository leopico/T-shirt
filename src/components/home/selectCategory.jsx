import React from "react";

function selectCategory({ setCategory }) {
  return (
    <div className="box">
      <select
        className="myFont text-[14px] bgCol1"
        onChange={(e) => setCategory(e.target.value)}
      >
        <option disabled selected>
          Category
        </option>
        <option value="sweatshirt">Sweatshirt</option>
        <option value="tshirt">T-shirt</option>
      </select>
    </div>
  );
}

export default selectCategory;
