import axiosInstance from "../axios";

export const getBanners = async () => {
    try {
        const response = await axiosInstance.get(
            `/data/banners`,
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
        console.error('Error fetching banners: ', err );
        return null;
    }
}

export const createBanner = async ( formData ) => {
    try {
        const response = await axiosInstance.post( 
            `/admin/banners/add`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        const { data, status } = response;

        if( !status ) {
            throw response;
        }
        return data;
    } catch( err ) {
        console.error('Error creating banner: ', err );
        return null;
    }
}