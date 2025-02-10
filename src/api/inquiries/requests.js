import axiosInstance from "../axios";

export const getInquiries = async () => {
    try {
        const response = await axiosInstance.get("/admin/inquiries");
        
        // Log response for debugging
        console.log('Inquiries API Response:', response);

        // Check if response has data property
        if (response && response.data) {
            return {
                status: true,
                data: response.data
            };
        }

        throw new Error('No data received from API');
    } catch (error) {
        console.error('Error fetching inquiries:', error);
        return {
            status: false,
            data: [],
            error: error.message
        };
    }
};