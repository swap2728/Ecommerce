



import NavBar from "../features/navbar/Navbar";
import ProductDetail from "../features/product/Component/ProductDetail";
import UserOrders from "../features/user/componenet/UserOrders";
// import ProductL from "../features/product/Component/productlist";

function UserOrdersPage(){
    return (
        <div>
            <NavBar>
                <h1 className="mx-auto text-2xl">My orders</h1>
            <UserOrders></UserOrders>
            </NavBar>
        </div>
    );
}

export default UserOrdersPage;