import axiosInstance from "../axios";

export const getProperties = async () => {
    try {
        const response = await axiosInstance.get(
            `/data/properties`,
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
        console.error('Error logging in: ', err );
        return null;
    }
}