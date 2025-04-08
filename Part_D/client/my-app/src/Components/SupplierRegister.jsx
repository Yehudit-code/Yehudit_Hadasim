import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";


const SupplierRegister = () => {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        password: '',
        email: '',
        companyName: '',
        phoneNumber: '',
        representativeName: '',
        address: '',
        phone: '',
    });

    const [products, setProducts] = useState([]);
    const [supplierId, setSupplierId]= useState("")
    const [isRegistered, setIsRegistered] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleProductChange = (index, field, value) => {
        const updated = [...products];
        updated[index][field] = value;
        setProducts(updated);
    };

    const addProduct = () => {
        setProducts([...products, { name: '', price: '', minQuantity: '', supplierId: '' }]);
    };

    const removeProduct = (index) => {
        const updated = [...products];
        updated.splice(index, 1);
        setProducts(updated);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(`supplier Registration`, formData);
        const res = await axios.post('http://localhost:1555/api/users/supplier', { name: formData.name, username: formData.username, password: formData.password, email: formData.email })
        console.log(res.data._id);
        setSupplierId(res.data._id)
        if (res.data.success) {
            setIsRegistered(true);
        
        
        console.log(supplierId);
        
        }
    }
    const handleAddProducts = async () => {
        try {
            // שולחים את המוצרים לשרת עם ה-ID של הספק
            const res = await axios.post('http://localhost:1555/api/products', {
                supplierId: supplierId, // תוסיף את ה-SupplierId אם יש לך במידע של הספק
                products: products.map(product => ({
                    name: product.name,
                    pricePerUnit: product.price,
                    quantity: 0, // כמות כללית (או 0 אם אתה לא רוצה להוסיף כמות בהתחלה)
                    minimumQuantity: product.minQuantity
                }))
            });
    
            console.log('מוצרים נוספו בהצלחה:', res.data);
            // תוכל להציג הודעה למשתמש שהמוצרים נוספו בהצלחה
        } catch (error) {
            console.error('שגיאה בהוספת מוצרים:', error);
            // הצג הודעת שגיאה אם יש בעיה
        }
    };


    return (<>
        <div className="flex flex-col items-center justify-start min-h-screen bg-white px-4 pt-8">
            <button
                onClick={() => navigate(`/login/supplier`)}
                className="mb-4 px-4 py-2 bg-gray-100 rounded-md shadow hover:bg-gray-200"
            >
                חזרה להתחברות
            </button>

            <h2 className="text-xl font-bold mb-6">
                {isRegistered ? 'הוסף מוצרים לספק' : 'רישום ספק חדש'}
            </h2>

            <form onSubmit={handleSubmit} className="w-full max-w-2xl space-y-4">
                {/* שדות בסיסיים */}
                {!isRegistered && (
                    <>
                        <div className="grid grid-cols-2 gap-4">
                            <input name="name" placeholder="שם" onChange={handleChange} className="input" />
                            <input name="username" placeholder="שם משתמש" onChange={handleChange} className="input" />
                            <input name="password" placeholder="סיסמה" type="password" onChange={handleChange} className="input" />
                            <input name="companyName" placeholder="שם החברה" onChange={handleChange} className="input" />
                            <input name="phoneNumber" placeholder="טלפון" onChange={handleChange} className="input" />
                            <input name="representativeName" placeholder="שם נציג" onChange={handleChange} className="input" />
                            <input name="email" placeholder="אימייל" onChange={handleChange} className="input" />
                            <input name="address" placeholder="כתובת" onChange={handleChange} className="input" />
                        </div>
                        <button
                            type="submit"
                            className="bg-purple-600 text-white px-4 py-2 rounded-md shadow hover:bg-purple-700"
                        >
                            רשום
                        </button>
                        {/* שלב הוספת מוצרים */}
                        <div className="mt-6">
                            <h3 className="font-bold mb-2">מוצרים</h3>
                            {products.map((product, index) => (
                                <div key={index} className="flex gap-2 mb-2">
                                    <input
                                        placeholder="שם מוצר"
                                        className="input flex-1"
                                        value={product.name}
                                        onChange={(e) => handleProductChange(index, 'name', e.target.value)}
                                    />
                                    <input
                                        placeholder="מחיר ליחידה"
                                        className="input w-32"
                                        value={product.price}
                                        onChange={(e) => handleProductChange(index, 'price', e.target.value)}
                                    />
                                    <input
                                        placeholder="כמות מינימלית"
                                        className="input w-32"
                                        value={product.minQuantity}
                                        onChange={(e) => handleProductChange(index, 'minQuantity', e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="text-red-600 hover:text-red-800"
                                        onClick={() => removeProduct(index)}
                                    >
                                        🗑
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                className="text-purple-600 mt-2 hover:underline"
                                onClick={addProduct}
                            >
                                ➕ הוסף מוצר
                            </button>
                            <button
                                type="button"
                                className="bg-purple-600 text-white px-4 py-2 rounded-md shadow hover:bg-purple-700 mt-4"
                                onClick={handleAddProducts}
                            >
                                שלח מוצרים
                            </button>
                        </div>
                    </>
                )}

                {/* {userType === 'owner' && (
          <div className="grid grid-cols-2 gap-4">
            <input name="name" placeholder="שם" onChange={handleChange} className="input" />
            <input name="username" placeholder="שם משתמש" onChange={handleChange} className="input" />
            <input name="password" placeholder="סיסמה" type="password" onChange={handleChange} className="input" />
          </div>
        )} */}


            </form>
        </div>


    </>
        // <div className="flex flex-col items-center justify-center h-screen bg-white">
        //     <button
        //         onClick={() => navigate(`/login/supplier`)}
        //         className="mb-4 px-4 py-2 bg-gray-100 rounded-md shadow hover:bg-gray-200"
        //     >
        //         Back to login
        //     </button>

        //     <h1 className="text-2xl font-bold mb-6 text-gray-800 capitalize">
        //         supplier Registration
        //     </h1>

        //     <form onSubmit={handleSubmit} className="w-80 space-y-4">
        //         <input
        //             type="text"
        //             name="fullName"
        //             placeholder="Full Name"
        //             className="w-full px-4 py-2 border rounded-md shadow"
        //             onChange={handleChange}
        //             value={formData.fullName}
        //             required
        //         />
        //         <input
        //             type="email"
        //             name="email"
        //             placeholder="Email"
        //             className="w-full px-4 py-2 border rounded-md shadow"
        //             onChange={handleChange}
        //             value={formData.email}
        //             required
        //         />
        //         <input
        //             type="password"
        //             name="password"
        //             placeholder="Password"
        //             className="w-full px-4 py-2 border rounded-md shadow"
        //             onChange={handleChange}
        //             value={formData.password}
        //             required
        //         />
        //         <button
        //             type="submit"
        //             className="w-full bg-gray-100 text-black py-2 rounded-md shadow hover:bg-gray-200"
        //         >
        //             Sign Up
        //         </button>
        //     </form>
        // </div>
    );
};

export default SupplierRegister;
