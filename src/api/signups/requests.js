import axiosInstance from "../axios";

export const getSignups = async () => {
    try {
        const response = await axiosInstance.get('/admin/recent-signups');
        
        if (response?.data) {
            // Transform the data to match the table structure
            const formattedData = response.data.data.map(signup => ({
                id: signup.id,
                date: new Date(signup.created_at).toLocaleDateString(),
                name: signup.name,
                phone: 'N/A', // Since phone isn't in the API response
                email: signup.email.toLowerCase()
            }));

            return {
                status: true,
                data: formattedData
            };
        }

        return {
            status: false,
            data: []
        };
    } catch (error) {
        console.error('Error fetching signups:', error);
        return {
            status: false,
            data: []
        };
    }
};