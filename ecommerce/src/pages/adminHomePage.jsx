import AdminProductList from "../features/admin/component/AdminProductList";
import NavBar from "../features/navbar/Navbar";

function AdminHomePage(){
    return (
        <NavBar>
            <AdminProductList></AdminProductList>
        </NavBar>
    );

}
export default AdminHomePage;