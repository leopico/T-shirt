
import Address from "./components/order/addressselect";
import OrderForm from "./components/order/form";
import Cart from "./components/order/ordercart";
// import Pay from "./components/order/paybtn";

const OrderPage1=()=>{
    return(
<>

<div className="rowtitle"><h2 className="pagetitle">1. Enter Details and Order Summary</h2></div>

<center>
<div className="rowsec">
<div className="colsecm">
<Address/>
<button className="useaddbtn">Use this address</button><br/>

</div>
<div className="colsec">
<Cart/>
{/* <Pay/> */}
</div>


</div>

</center>
<div className="pagetxtbox">
<h2 className="pagetxt">2.Pay method</h2>
<h2 className="pagetxt">3.Review Items and Delivery</h2>
</div>
</>
    );
}

export default OrderPage1;