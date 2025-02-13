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

export const getPropertyById = async ( id ) => {
    try {
        const response = await axiosInstance.get(
            `/data/properties/${id}`,
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
        console.error('Error fetching property: ', err );
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

export const deleteProperty = async (propertyId) => {
    try {
        const response = await axiosInstance.delete(`/admin/properties/delete/${propertyId}`);
        return {
            status: response.status === 200,
            message: response.data?.message || 'Property deleted successfully'
        };
    } catch (error) {
        console.error('Error deleting property: ', error);
        return {
            status: false,
            message: error.response?.data?.message || 'Failed to delete property'
        };
    }
};

export const archiveProperty = async (propertyId) => {
    try {
        const response = await axiosInstance.post(`/admin/property-archive/add/${propertyId}`);
        return {
            status: response.status === 200,
            message: response.data?.message || 'Property archived successfully'
        };
    } catch (error) {
        console.error('Error archiving property: ', error);
        return {
            status: false,
            message: error.response?.data?.message || 'Failed to archive property'
        };
    }
}

export const unarchiveProperty = async (propertyId) => {
    try {
        const response = await axiosInstance.post(`/admin/property-archive/remove/${propertyId}`);
        return {
            status: response.status === 200,
            message: response.data?.message || 'Property unarchived successfully'
        };
    } catch (error) {
        console.error('Error unarchiving property: ', error);
        return {
            status: false,
            message: error.response?.data?.message || 'Failed to unarchive property'
        };
    }
}

export const getArchivedProperties = async () => {
    try {
        const response = await axiosInstance.get(
            `/admin/property-archive`,
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
        console.error('Error fetching archived properties: ', err );
        return null;
    }
} 