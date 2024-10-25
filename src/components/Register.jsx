import React, { useState } from "react";
import axios from 'axios'

const Register = ({ openLogin }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [file, setFile] = useState(null)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);
        formData.append("image", file)
        try{
          const response = await axios.post('http://localhost:5000/chat/user/Register', formData)
          console.log(response)
          if(response.data.msg === "success") {
            openLogin()
          }
        } catch(error) {
            console.log(error)
        }
    }
    return (
        <div>
            <h2 className="text-2x1 font-bold mb-4">Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Username:</label>
                    <input type="text" className="w-full px-3 py-2 border" 
                    onChange={(e) => setUsername(e.target.value)} placeholder="Enter Username" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password:</label>
                    <input type="password" className="w-full px-3 py-2 border" 
                    onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Upload Image</label>
                    <input
                      type="file"
                      onChange={(e) => setFile(e.target.files[0])}
                      className="border p-2 block w-full text-sm text-gray-500
                                 file:mr-4 file:py-2 file:px-4
                                 file:rounded-full file:border-0
                                 file:text-sm file:font-semibold
                                 file:bg-blue-500 file:text-white
                                 hover:file:bg-blue-700"
                    />             
                </div>
                <div className="mb-4">
                    <button type="submit" className="w-full bg-blue-600 text-white py-2">Sign Up</button>
                </div>
            </form>
            <div className="text-center">
                <span className="text-gray-700">Already Have an Accout?</span>
                <button className="text-red-600" onClick={openLogin}>Login</button>
            </div>
        </div>
    )
}

export default Register;