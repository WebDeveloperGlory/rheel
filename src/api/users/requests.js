import axiosInstance from "../axios";

export const getUsers = async () => {
    try {
        const response = await axiosInstance.get(
            `/admin/get-users`,
            // {
            //     withCredentials: true
            // }
        );
        const { data, status } = response;

        if( !status ) {
            throw response;
        }
        return data; 
    } catch( err ) {
        console.error('Error fetching archived users: ', err );
        return null;
    }
}