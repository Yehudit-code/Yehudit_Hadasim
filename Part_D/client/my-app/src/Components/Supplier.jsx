const Supplier =()=>{

    const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/suppliers')
      .then(response => {
        setSuppliers(response.data);
      })
      .catch(error => {
        console.error('Error fetching suppliers:', error);
      });
  }, []);
    return(<>
    <div className="p-6">
      <div className="text-right mb-6">
        <div>helloooooooooooooooooo</div>
        <button className="bg-white border px-4 py-2 rounded shadow">
          🏡 חזרה לדף הבית
        </button>
      </div>

      <h1 className="text-4xl font-bold text-center mb-4">All Suppliers</h1>
      <p className="text-center text-2xl mb-6">Admin ID: 1</p>

      <div className="grid justify-center">
        {suppliers.map((supplier) => (
          <div key={supplier.id} className="border p-6 rounded-lg shadow-md w-80 mb-4">
            <h2 className="text-xl font-bold text-center mb-2">{supplier.name}</h2>
            <p><strong>Contact:</strong> {supplier.contact}</p>
            <p><strong>Email:</strong> {supplier.email}</p>
            <p><strong>Phone:</strong> {supplier.phone}</p>

            <p className="font-bold mt-3">:Products for sale</p>
            <select className="border px-2 py-1 rounded w-full mt-1 mb-3">
              {supplier.products.map((product, index) => (
                <option key={index}>{product}</option>
              ))}
            </select>

            <button className="bg-blue-500 text-white px-4 py-2 rounded w-full">
              Create Order
            </button>
          </div>
        ))}
      </div>
    </div>
    </>)

}
export default Supplier