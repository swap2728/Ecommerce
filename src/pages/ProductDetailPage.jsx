

import NavBar from "../features/navbar/Navbar";
import ProductDetail from "../features/product/Component/ProductDetail";
// import ProductL from "../features/product/Component/productlist";

function ProductDetailPage(){
    return (
        <div>
            <NavBar>
            <ProductDetail></ProductDetail>
            </NavBar>
        </div>
    );
}

export default ProductDetailPage;