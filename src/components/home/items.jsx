import img from "../../assets/main.png";
const ItemCard = ({ ...item }) => {
  return (
    <div className="relative flex flex-col items-center pt-6 mt-2 bgCol1 w-80 border border-black">
      <img src={img} className="w-48 " alt="thumb" />
      {item.printStyle == "prompt" ? (
        <img
          src={item.image}
          className="absolute w-20 top-[40%] left-[51%] transform -translate-x-1/2 -translate-y-1/2"
          alt="centered-logo"
        />
      ) : (
        <div className="absolute w-24 top-[35%] left-[51%] transform -translate-x-1/2 -translate-y-1/2">
          <h1 className={`${item.fontSyle}`}>{item.text}</h1>
        </div>
      )}
      <br />
      <button className="itembuy">Buy Now</button>
    </div>
  );
};

export default ItemCard;
