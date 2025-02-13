import axiosInstance from "../axios";

export const getAffiliates = async () => {
    try {
        const response = await axiosInstance.get('/admin/affiliates');
        if (response.status !== 200) {
            throw new Error(`Unexpected status code: ${response.status}`);
        }

        const data = response.data;
        return Array.isArray(data) ? data : []; // Ensure it's always an array
    } catch (error) {
        console.error('Error fetching affiliates:', error);
        return []; // Always return an array to prevent `null` issues
    }
};

export const createAffliate = async (formData) => {
    try {
        const payload = {
            first_name: formData.first_name,
            last_name: formData.last_name,
            phone_number: formData.phone_number,
            property_count: parseInt(formData.property_count) || 0,
            value: String(formData.value || 0),
            status: formData.status || 'Activated',
            payment_status: formData.payment_status || 'Pending' // Send as-is, no uppercase conversion
        };

        console.log('Sending payload:', payload); // Add this for debugging

        const response = await axiosInstance.post('/admin/affiliate-register', payload);

        return {
            data: response.data,
            status: response.status === 200 || response.status === 201,
            message: response.data?.message
        };
    } catch (error) {
        console.error('Error details:', error.response?.data || error.message);
        return {
            status: false,
            error: error.response?.data?.message || 'Failed to create affiliate'
        };
    }
};
