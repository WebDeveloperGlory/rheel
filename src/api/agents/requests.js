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

