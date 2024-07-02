

import AdminOrders from "../features/admin/component/AdminOrders";
// import AdminProductDetail from "../features/admin/component.jsx/AdminProductDetail";
import NavBar from "../features/navbar/Navbar";

function AdminOrdersPage(){
    return (
        <NavBar>
            <AdminOrders></AdminOrders>
        </NavBar>
    );

}
export default AdminOrdersPage;