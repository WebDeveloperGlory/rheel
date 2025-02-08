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
        const response = await axiosInstance.post(
            '/admin/agents/add',
            formData,
        );
        const {data, status} = response;
        if (!status) {
            throw response;
        }
        return data;
    } catch (error) {
        console.error('Error creating agent: ', error);
        return null;
    }
 }

