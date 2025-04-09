import axios from 'axios';
import React, { useState } from 'react';
import { ListBox } from 'primereact/listbox';
import CreateOrder from './CreateOrder';


const OwnerPage = () => {
    const [showSuppliers, setShowSuppliers] = useState(false);
    const [suppliers, setSuppliers] = useState([]); // שמירת הספקים מהשרת
    const [showOrders, setShowOrders] = useState(false);
    const [showExistingOrders, setShowExistingOrders] = useState(false);
    const [existingOrders, setExistingOrders] = useState([]); // שמירת הספקים מהשרת
    const [orders, setOrders] = useState([]); // שמירת הספקים מהשרת

    const [products, setProducts] = useState([]); // שמירת המוצרים של הספק
    const [showProducts, setShowProducts] = useState(false); // האם להציג את המוצרים
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showCreateOrder, setShowCreateOrder] = useState(false);
    const [selectedSupplierId, setSelectedSupplierId] = useState(null);
    const [error, setError] = useState(null)
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
        try {
            const res = await axios.get("http://localhost:1555/api/orders/existingOrders");
            console.log(res.data);
            setExistingOrders(res.data);
            setShowExistingOrders(true);
        } catch (err) {
            console.error("Error fetching existing orders in client:", err);
        }
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
    const handleStatusClick = async (orderId) => {
        try {
            // עדכון הסטטוס ל-"בתהליך"
            await axios.put(`http://localhost:1555/api/orders/${orderId}`, {
                status: 'הושלמה',
            });

            // עדכון הרשימה בסטטוס החדש (בלי לקרוא שוב ל-fetchPendingOrders)
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order._id === orderId ? { ...order, status: 'בתהליך' } : order
                )
            );
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };
    const toggleStatus = async (orderId, currentStatus) => {
    let newStatus = null;

    if (currentStatus === "ממתין") {
        newStatus = "בתהליך";
    } else if (currentStatus === "בתהליך") {
        newStatus = "הושלמה";
    }

    if (!newStatus) return;

    try {
        await axios.put(`http://localhost:1555/api/orders/${orderId}`, {
            status: newStatus,
        });

        setExistingOrders((prevOrders) =>
            prevOrders.map((order) =>
                order._id === orderId ? { ...order, status: newStatus } : order
            )
        );
    } catch (err) {
        console.error("Error updating status:", err);
    }
};

    const handleBack = () => {
        setOrders([])
        setShowOrders(false)
        setError(null)
    }
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
        {showOrders && (<>
            <div className="back-button-container">
                <button className="back-button" onClick={handleBack}>Back</button>
            </div>
            <div className="orders-container">
                <h2>Orders</h2>
                <table className="orders-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Supplier</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{order.supplierId?.name || 'לא ידוע'}</td>
                                <td>{order.dateOrder ? new Date(order.dateOrder).toLocaleDateString() : '---'}</td>
                                <td>
                                    {order.status === "ממתין" ? (
                                        <button
                                            className="btn-status waiting"
                                            onClick={() => handleStatusClick(order._id)} // תיקון כאן
                                        >
                                            ממתין
                                        </button>
                                    ) : order.status === "בתהליך" ? (
                                        <span className="btn-status in-progress">⏳ בתהליך</span>
                                    ) : (
                                        <span className="btn-status completed">🔒 הושלמה</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
        )}
        {showExistingOrders && (
            <>
                <div className="back-button-container">
                    <button className="back-button" onClick={handleBack}>Back</button>
                </div>
                <div className="orders-container">
                    <h2>Orders</h2>
                    <table className="orders-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Supplier</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                        {existingOrders.map((order, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{order.supplierId?.name || 'לא ידוע'}</td>
                                    <td>{order.dateOrder ? new Date(order.dateOrder).toLocaleDateString() : '---'}</td>
                                    <td>
                                        {order.status === "הושלמה" ? (
                                            <span className="btn-status completed">🔒 הושלמה</span>
                                        ) : (
                                            <button
                                                className={`btn-status ${order.status === "ממתין" ? "waiting" : "in-progress"
                                                    }`}
                                                onClick={() => toggleStatus(order._id, order.status)}
                                            >
                                                {order.status === "ממתין" ? "ממתין" : "⏳ בתהליך"}
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </>
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
    }
    
};
export default OwnerPage;