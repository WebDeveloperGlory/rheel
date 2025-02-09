import axiosInstance from "../axios";

export const getAgents = async () => {
    try {
        const response = await axiosInstance.get(
            '/admin/agents'
        );
        const {data, status} = response;
        if (!status) {
            throw response;
        }
        return data;
    } catch (error) {
        console.error('Error fetching agents: ', error);
        return null;
    }
} 

export const createAgent = async (formData) => {
    try {
        const form = new FormData();
        
        // Required fields with correct field names
        const textFields = {
            first_name: formData.first_name,      // Changed from firstname
            last_name: formData.last_name,        // Changed from lastname
            email: formData.email,
            phone_number: formData.phone_number,   // Changed from phone
            company_name: formData.company_name,
            city: formData.city,
            postcode: formData.postcode,
            status: 'ACTIVE'
        };

        // Append all text fields
        Object.keys(textFields).forEach(key => {
            if (textFields[key]) {
                form.append(key, textFields[key]);
            }
        });
        
        // Handle logo file
        if (formData.logo instanceof File) {
            form.append('logo', formData.logo);
        }

        // Debug log
        console.log('Sending form data with correct field names:');
        for (let pair of form.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }

        const response = await axiosInstance.post('/admin/agents/add', form, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json'
            }
        });
        
        console.log('Server response:', response);

        return {
            data: response.data,
            status: response.status === 200 || response.status === 201
        };
        
    } catch (error) {
        console.error('Error details:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            data: error.response?.data
        });
        
        return {
            status: false,
            error: error.response?.data?.message || 'Failed to create agent'
        };
    }
};

export const getAgentById = async (id) => {
    try {
        const response = await axiosInstance.get(`/admin/agents/${id}`);
        const { data, status } = response;
        if (!status) {
            throw response;
        }
        return data;
    } catch (error) {
        console.error('Error fetching agent: ', error);
        return null;
    }
}

