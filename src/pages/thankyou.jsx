const ThankYou = () => {
  return (
    <center className="h-screen flex flex-col justify-center items-center text-center">
      <div className="flex w-fit  gap-2 items-center  mx-auto">
        <h1 className="myFont1 md:text-3xl sm:text-2xl text-xl">
          payment successful{" "}
        </h1>
        <h1 className="md:text-3xl sm:text-2xl text-xl -mt-4">🏎️</h1>
      </div>
      <h1 className="md:w-[500px] w-[90%] md:text-2xl sm:text-xl text-lg mx-auto md:my-5 my-3">
        thankyou for shopping with us! you’ll receive updates soon on your
        email.
      </h1>
    </center>
  );
};
export default ThankYou;
