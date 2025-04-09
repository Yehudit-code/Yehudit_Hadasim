import axios from 'axios';
import React, { useState } from 'react';
import { ListBox } from 'primereact/listbox';
import CreateOrder from './CreateOrder';


const OwnerPage = () => {
    const [showSuppliers, setShowSuppliers] = useState(false);
    const [suppliers, setSuppliers] = useState([]); // שמירת הספקים מהשרת
    const [showOrders, setShowOrders] = useState(false);
    const [orders, setOrders] = useState([]); // שמירת הספקים מהשרת
    const [products, setProducts] = useState([]); // שמירת המוצרים של הספק
    const [showProducts, setShowProducts] = useState(false); // האם להציג את המוצרים
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showCreateOrder, setShowCreateOrder] = useState(false);
    const [selectedSupplierId, setSelectedSupplierId] = useState(null);

    const handleViewSuppliers = async () => {
        try {
            const res = await axios.get("http://localhost:1555/api/users");
            setSuppliers(res.data);
            setShowSuppliers(true);
            console.log(res.data);
        } catch (err) {
            console.error("Error fetching suppliers:", err);
        }
    };

    const handleViewOrders = async () => {
        try {
            const res = await axios.get("http://localhost:1555/api/orders");
            setOrders(res.data);
            setShowOrders(true);
            console.log(res.data);
        } catch (err) {
            console.error("Error fetching existing orders:", err);
        }
    };

    const handleViewExistingOrders = async () => {
        const res = await fetch("/api/existing-orders");
        const data = await res.json();
        console.log(data);
    };

    const handleViewProducts = async (supplierId) => {
        try {
            const res = await axios.get(`http://localhost:1555/api/products/${supplierId}`);
            setProducts(res.data);
            setShowProducts(true); // מציג את המוצרים של הספק
            console.log(res);

        } catch (err) {
            console.error("Error fetching products:", err);
        }
    };
    const goBackToSuppliers = () => {
        setShowCreateOrder(false);
    };
    const handleCreateOrder = (supplierId) => {
        setSelectedSupplierId(supplierId);
        setShowCreateOrder(true);
    };
    return (<>
        <div style={styles.topBar}>
            <button style={styles.button} onClick={handleViewSuppliers}>
                View Suppliers
            </button>
            <button style={styles.button} onClick={handleViewOrders}>
                View Orders
            </button>
            <button style={styles.button} onClick={handleViewExistingOrders}>
                View Existing Orders
            </button>
        </div>
        <div style={styles.welcomeText}>ברוך הבא, בעל מכולת!</div>
        {showSuppliers && !showCreateOrder && (
            <div style={styles.supplierList}>
                <h2>All Suppliers</h2>
                {suppliers.map((supplier) => (
                    <div key={supplier._id} style={styles.supplierCard}>
                        <h3>{supplier.name}</h3>
                        <p><strong>Email:</strong> {supplier.email}</p>
                        <p><strong>Phone:</strong> {supplier.phone}</p>
                        <button
                            style={styles.viewProductsButton}
                            onClick={() => handleViewProducts(supplier._id)}>
                            View Products
                        </button>
                        <button
                            style={styles.viewProductsButton}
                            onClick={() => handleCreateOrder(supplier._id)}>
                            Create Order
                        </button>
                    </div>
                ))}
            </div>
        )}
        {showProducts && (
            <div style={styles.productList}>
                <h2>Products of Selected Supplier:</h2>
                <div className="card flex justify-content-center">
                    <ListBox filter value={selectedProduct} onChange={(e) => setSelectedProduct(e.value)} options={products} optionLabel="name" className="w-full md:w-14rem" />
                </div>
            </div>
        )}
        {showOrders && (
            <div style={styles.supplierList}>
                <h2>All Orders</h2>
                {orders.map((order) => (
                    <div key={order.name} style={styles.supplierCard}>
                        <h3>{order.name}</h3>
                        <p><strong>dateOrder:</strong> {order.dateOrder}</p>
                        <p><strong>status:</strong> {order.status}</p>
                    </div>

                ))}

            </div>
        )}
        {showCreateOrder && (
            <CreateOrder supplierId={selectedSupplierId} goBack={goBackToSuppliers} />
        )}
    </>
    );
};

const styles = {
    topBar: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: "#f3f3f3",
        padding: "10px",
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        zIndex: 1000
    },
    button: {
        padding: "10px 20px",
        borderRadius: "6px",
        border: "none",
        backgroundColor: "#ddd",
        cursor: "pointer",
        fontWeight: "bold",
    },
    welcomeText: {
        marginTop: "80px",
        textAlign: "center",
        fontSize: "24px",
        fontWeight: "bold",
    },
};
export default OwnerPage;