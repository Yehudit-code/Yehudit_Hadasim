import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateOrder = ({ supplierId, goBack }) => {
    const [products, setProducts] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [orderDetails, setOrderDetails] = useState([]); // פרטי ההזמנה כולל מידע על המוצר

    //שליפת המוצרים של הספק
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(`http://localhost:1555/api/products/${supplierId}`);
                setProducts(res.data);
                console.log(res.data);
            } catch (err) {
                console.error("Error fetching products:", err);
            }
        };
        fetchProducts();
    }, [supplierId]);  // נכון לסיים את ה-useEffect

    const handleQuantityChange = (productId, quantity) => {
        setQuantities((prevQuantities) => {
            const newQuantities = { ...prevQuantities, [productId]: quantity };
            // עדכון פרטי ההזמנה בכל שינוי
            setOrderDetails(
                products.map((product) => {
                    if (newQuantities[product._id]) {
                        return {
                            productId: product._id,  // אנחנו שולחים רק את ה-ID של המוצר
                            quantity: newQuantities[product._id],
                        };
                    }
                    return null;
                }).filter(Boolean)  // מסנן ערכים ריקים
            );
            return newQuantities;
        });
    };

    //שליחת פרטי הזמנה לשרת
    const handleSubmitOrder = async () => {
        console.log("supplierId:", supplierId, "orderDetails:", orderDetails);
        try {
            const response = await axios.post('http://localhost:1555/api/orders', {
                supplierId,
                
                orderDetails  // שליחה של פרטי ההזמנה כולל המידע המלא על המוצרים
            })
            console.log('Order created successfully:', response.data);
        } catch (error) {
            console.error("Error creating order:", error);
        }
    };

    return (
        <div style={styles.orderPage}>
            <button style={styles.button} onClick={goBack}>Back to Suppliers</button>
            <h2>Create Order for Supplier {supplierId}</h2>
            <div>
                {products.map((product) => (
                    <div key={product._id} style={styles.productCard}>
                        <h3>{product.name}</h3>
                        <p><strong>Price:</strong> {product.pricePerUnit}</p>
                        <input
                            type="number"
                            min="0"
                            value={quantities[product._id] || 0}
                            onChange={(e) => handleQuantityChange(product._id, e.target.value)}
                        />
                    </div>
                ))}
            </div>
            <button style={styles.submitButton} onClick={handleSubmitOrder}>Confirm Order</button>
        </div>
    );
};

const styles = {
    orderPage: {
        padding: "20px",
        textAlign: "center",
    },
    button: {
        padding: "10px 20px",
        margin: "10px",
        backgroundColor: "#ddd",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
    productCard: {
        marginBottom: "15px",
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "5px",
    },
    submitButton: {
        padding: "10px 20px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
};

export default CreateOrder;
