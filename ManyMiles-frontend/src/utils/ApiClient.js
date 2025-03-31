
import { useauthService } from "../components/Authentication/authService";
export const apiClient = {
   
    fetch: async (url, options = {}) => {
      // Get the token
      const {getToken}=useauthService();
      const token = getToken();
      
      // Add authorization header if token exists
      const headers = {
        ...options.headers,
        'Content-Type': 'application/json',
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      // Make the request
      const response = await fetch(url, {
        ...options,
        headers
      });
      
      // Handle 401 Unauthorized (token expired)
      if (response.status === 401) {
        // Clear auth data and redirect to login
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.location.href = '/';
        return;
      }
      
      return response;
    }
  };