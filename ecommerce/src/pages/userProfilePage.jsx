

import NavBar from "../features/navbar/Navbar";
import UserProfile from "../features/user/componenet/UserProfile";
// import ProductL from "../features/product/Component/productlist";

function UserProfilePage(){
    return (
        <div>
            <NavBar>
                <h1 className="mx-auto text-2xl">My orders</h1>
            <UserProfile></UserProfile>
            </NavBar>
        </div>
    );
}

export default UserProfilePage;