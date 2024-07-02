import ProductForm from "../features/admin/component/ProductForms";
import NavBar from "../features/navbar/Navbar";
export default function AdminProductFormPage(){
    return (
        <div>
            <NavBar>
                <ProductForm></ProductForm>
            </NavBar>
        </div>
    );
}

