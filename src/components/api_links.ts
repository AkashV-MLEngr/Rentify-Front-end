// axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',  // Adjust URL as per your server setup
  timeout: 5000,  // Timeout after 5 seconds if no response
  headers: {
    'Content-Type': 'application/json',
    // Add any other headers if required, such as Authorization header for tokens
  },
});

export default axiosInstance;


// User Auth
export const linkUserLogin = "http://127.0.0.1:5000/api/login"
export const linkUserRegister = "http://127.0.0.1:5000/api/register"
export const linkUserLogout = "http://127.0.0.1:5000/logout"

// Seller Flow
export const linkAddProperty = "http://127.0.0.1:5000/api/properties"
export const linkGetSellerPropertyById = "http://127.0.0.1:5000/api/properties/:id"
export const linkUpdateProperty = "http://127.0.0.1:5000/api/properties/:id"
export const linkDeleteProperty = "http://127.0.0.1:5000/api/properties/:id"
export const linkGetSellerProperties = "http://127.0.0.1:5000/api/sellers/:id/properties"


// Buyer Flow
export const linkSearchProperties = "http://127.0.0.1:5000/api/properties"
export const linkGetAllProperties = "http://127.0.0.1:5000/api/properties"
export const linkGetSellarDetails = "http://127.0.0.1:5000/api/sellers/:id"

