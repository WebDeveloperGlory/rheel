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
