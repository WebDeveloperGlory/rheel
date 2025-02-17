import axiosInstance from "../axios";

export const getAdmins = async () => {
  try {
    const response = await axiosInstance.get('/admin/get-admins');
    
    if (!response.data) {
      throw new Error('No data received from server');
    }

    return {
      data: Array.isArray(response.data) ? response.data : 
            response.data.data ? response.data.data : [] // Handle nested data property
    };
  } catch (error) {
    console.error('Error fetching admins:', error.message);
    throw error; // Let the component handle the error
  }
};

export const createAdmin = async (formData) => {
    try {
        const response = await axiosInstance.post('/admin/auth/register-admin', formData);
        
        if (!response.data) {
            throw new Error('No response from server');
        }

        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Failed to create admin';
        throw new Error(errorMessage);
    }
};