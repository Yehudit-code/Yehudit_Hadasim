import Supplier from "./Supplier";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AllSuppliers = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // קריאה לשרת לקבלת הספקים
    const fetchSuppliers = async () => {
        try {
            const response = await axios.get('http://localhost:1555/api/users'); // כתובת ה־API שלך
            setSuppliers(response.data); // עדכון המצב עם הספקים שהתקבלו
        } catch (err) {
            setError('Failed to fetch suppliers'); // טיפול בשגיאה
        }
    };

    useEffect(() => {
        
        useEffect(() => {
            // קריאת נתונים מהשרת כשנטען הקומפוננט
            axios.get('http://localhost:1555/api/users') // כתובת ה-API שלך
              .then(response => {
                setSuppliers(response.data); // שומר את כל הספקים
              })
              .catch(error => {
                console.error('Error fetching suppliers:', error);
              });
          }, []);
    }, []); // ריק כדי שהקריאה תקרה רק פעם אחת כשהקומפוננטה נטענת

    const goToSupplierPage = () => {
        // שולח את כל הספקים לקומפוננטת Supplier דרך state
        navigate('/supplier', { state: { suppliers } });
      };
    return (<>
        <div>
            <h1>All Suppliers</h1>
            <ul>
                {suppliers.map((supplier) => (
                    <div>  <Supplier supplier={supplier} />
                   </div>
                ))}
            </ul>
        </div>
    </>)
}

export default AllSuppliers