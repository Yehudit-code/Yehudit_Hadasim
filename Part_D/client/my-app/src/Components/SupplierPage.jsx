import React, { useState } from 'react'
import axios from 'axios'
import './SupplierPage.css' 

const SupplierPage = () => {
  const [orders, setOrders] = useState([])
  const [error, setError] = useState(null)
  const [showOrders, setShowOrders] = useState(false)

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get('http://localhost:1555/api/orders')
      setOrders(response.data)
      setError(null)
      setShowOrders(true)
    } catch (err) {
      setError(err.response?.data || 'error fetchAllOrders')
      setOrders([])
    }
  }

  const fetchPendingOrders = async () => {
    try {
      const response = await axios.get('http://localhost:1555/api/orders/pendingOrders')
      setOrders(response.data)
      setError(null)
      setShowOrders(true) // מציג את הטבלה
    } catch (err) {
      setError(err.response?.data || 'שגיאה בשליפת הזמנות ממתינות')
      setOrders([])
    }
  }

  const handleStatusClick = async (orderId) => {
    try {
      // עדכון הסטטוס ל-"בתהליך"
      await axios.put(`http://localhost:1555/api/orders/${orderId}`, {
        status: 'בתהליך',
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
  

  const handleBack = () => {
    setOrders([])
    setShowOrders(false)
    setError(null)
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <span className="icon">🛒</span>
        <h1>Supplier Orders Dashboard</h1>
      </header>

      <div className="button-group">
        <button onClick={fetchAllOrders} className="btn blue">View All Orders</button>
        <button onClick={fetchPendingOrders} className="btn green">View Pending Orders</button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {showOrders && (
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
    </div>
  )
}

export default SupplierPage
