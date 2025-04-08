// src/components/LoginForm.jsx
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ userType }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false); // ניהול סטייט התחברות
    
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log(`${userType} Login`, { username, password });
        // פה אפשר להוסיף קריאה ל-API
        try {
            // שולחים את הבקשה לשרת עם הנתונים מהטופס
            const response = await axios.post('http://localhost:1555/api/auth/login', {
                username,
                password,
            })
            // אם ההתחברות הצליחה, השרת יחזיר תשובה בהצלחה
            console.log(response.data); // "Logged In"

            if (userType === 'supplier') {
                navigate('/supplier');
            }
            if (userType === 'owner') {
                navigate('/owner');
            }
        } catch (error) {
            // במקרה של שגיאה, נציג את הודעת השגיאה
            if (error.response) {
                // השרת החזיר תשובה עם שגיאה (סטטוס לא 200)
                console.error(error.response.data.message);
            } else {
                // אם השגיאה לא מהשרת, אז יש בעיה בתקשורת או בקוד
                console.error('Error:', error.message);
            }
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white">
            <button
                onClick={() => navigate('/')}
                className="mb-4 px-4 py-2 bg-gray-100 rounded-md shadow hover:bg-gray-200"
            >
                choose {userType === 'admin' ? 'supplier' : 'admin'}
            </button>

            <h1 className="text-2xl font-bold mb-6 text-gray-800 capitalize">
                {userType} Login
            </h1>

            <form onSubmit={handleLogin} className="w-80 space-y-4">
                <input
                    type="username"
                    placeholder="Username"
                    className="w-full px-4 py-2 border rounded-md shadow"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-2 border rounded-md shadow"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-gray-100 text-black py-2 rounded-md shadow hover:bg-gray-200"
                >
                    Login
                </button>
            </form>

            <p className="mt-4 text-sm text-gray-700">
                Not registered?{' '}
                <span
                    onClick={() => navigate(`/register/${userType}`)}
                    className="text-blue-600 hover:underline cursor-pointer"
                >
                    Click here to register
                </span>
            </p>
        </div>
    );
};

export default LoginForm;
