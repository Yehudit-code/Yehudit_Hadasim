import axios from 'axios';
import React from 'react';

const OwnerPage = () => {
    const handleViewSuppliers = async () => {
        try {
            const res = await axios.get("http://localhost:1555/api/users");
            console.log(res.data);
          } catch (err) {
            console.error("Error fetching suppliers:", err);
          }
    };

    const handleViewOrders = async () => {
        try {
            const res = await axios.get("/api/existing-orders");
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