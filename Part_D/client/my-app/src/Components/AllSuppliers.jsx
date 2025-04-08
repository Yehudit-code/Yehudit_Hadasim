
const AllSuppliers = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // קריאה לשרת לקבלת הספקים
        const fetchSuppliers = async () => {
            try {
                const response = await axios.get('/api/suppliers'); // כתובת ה־API שלך
                setSuppliers(response.data); // עדכון המצב עם הספקים שהתקבלו
            } catch (err) {
                setError('Failed to fetch suppliers'); // טיפול בשגיאה
            }
        };

        fetchSuppliers(); // קריאה לפונקציה
    }, []); // ריק כדי שהקריאה תקרה רק פעם אחת כשהקומפוננטה נטענת

    if (error) {
        return <div>{error}</div>;
    }
    return (<>
        <div>
            <h1>List of Suppliers</h1>
            <ul>
                {suppliers.map((supplier) => (
                    <li key={supplier._id}>
                        {supplier.name} {/* החלף לפי השדות הקיימים בספק */}
                    </li>
                ))}
            </ul>
        </div>
    </>)
}

export default AllSuppliers