import { Routes, Route } from 'react-router-dom';
import Product from '../pages/Product/Product.jsx';
import Work from '../pages/Work/Work.jsx';
import Contact from '../pages/Contact/Contact.jsx';
import Admin from '../pages/Admin/Admin.jsx';
import Layout from '../Layout/Layout.jsx';
import About from '../pages/About/About.jsx';

function Routese() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index path="about" element={<About />} /> 
                <Route path="product" element={<Product />} />
                <Route path="work" element={<Work />} />
                <Route path="contact" element={<Contact />} />
                <Route path="admin12345" element={<Admin />} />
            </Route>
        </Routes>
    );
}

export default Routese;
