import Items from "./items";

const Cart = ({ price }) => {
  return (
    <div className="bgCol1 w-full px-5 py-3 border border-black rounded-lg">
      <h3 className="flex md:text-2xl text-xl myFont1">Order Summary</h3>
      <div className="w-full px-3 pt-4 md:text-lg text-md font-[400]">
        <div className="w-full flex justify-between md:text-xl text-lg myFont1">
          <span className="underline underline-offset-2"></span>
          <span className="underline underline-offset-2">amount:</span>
        </div>
        <div className="w-full flex justify-between py-2">
          <span className="">product</span>
          <span className="">RS {price}</span>
        </div>
        <div className="flex justify-between py-2">
          <span className="">shipping</span>
          <span className="">RS 60</span>
        </div>
        {/* <Items />
        <Items />
        <Items /> */}
      </div>

      <hr className="bg-black h-[2px] w-full mt-3" />
      <div className="flex justify-between text-xl myFont1 py-4">
        <span className="">Order Total</span>
        <span className="">Rs {price + 60}</span>
      </div>
    </div>
  );
};

export default Cart;
