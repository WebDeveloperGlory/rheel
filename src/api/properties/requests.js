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
        console.error('Error fetching properties: ', err );
        return null;
    }
}

export const createProperty = async ( formData ) => {
    try {
        const response = await axiosInstance.post( 
            `/admin/properties/add`,
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
        console.error('Error creating property: ', err );
        return null;
    }
}

export const updateProperty = async ( propertyId, formData ) => {
    try {
        const response = await axiosInstance.put( 
            `/admin/properties/edit/${ propertyId }`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        console.log('response: ', response);
        const { data, status } = response;

        if( !status ) {
            throw response;
        }
        return data;
    } catch( err ) {
        console.error('Error updating property: ', err );
        return null;
    }
}

export const deleteProperty = async ( propertyId ) => {
    try {
        const response = await axiosInstance.delete( 
            `/admin/properties/delete/${ propertyId }`
        );
        const { data, status } = response;

        if( !status ) {
            throw response;
        }
        return data;
    } catch( err ) {
        console.error('Error deleting property: ', err );
        return null;
    }
}