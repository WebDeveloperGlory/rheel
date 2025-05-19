import axiosInstance from "../axios";

const handleUploadProgress = (onProgress, formData) => (progressEvent) => {
    const { loaded, total } = progressEvent;
    const percentCompleted = Math.round((loaded * 100) / total);

    // Get sizes of each type of upload to determine which is being processed
    const propertyImagesSize = [...formData.getAll('property_images')].reduce((sum, file) => sum + file.size, 0);
    const videoSize = [...formData.getAll('video_upload')].reduce((sum, file) => sum + file.size, 0);
    const floorPlanSize = [...formData.getAll('floor_plan')].reduce((sum, file) => sum + file.size, 0);

    // Calculate progress ranges based on file sizes
    const totalSize = propertyImagesSize + videoSize + floorPlanSize;
    const ranges = {
        propertyImages: [0, propertyImagesSize],
        video: [propertyImagesSize, propertyImagesSize + videoSize],
        floorPlan: [propertyImagesSize + videoSize, totalSize]
    };

    // Determine which type of file is being uploaded based on loaded size
    if (loaded <= ranges.propertyImages[1]) {
        onProgress('property_images', null, percentCompleted);
    } else if (loaded <= ranges.video[1]) {
        onProgress('video_upload', null, percentCompleted);
    } else {
        onProgress('floor_plan', null, percentCompleted);
    }
};

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

export const createProperty = async (formData, onProgress) => {
    try {
        const response = await axiosInstance.post( 
            `/admin/properties/add`,
            formData,
            {   
                timeout: 3600000,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                onUploadProgress: handleUploadProgress(onProgress, formData)
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

export const updateProperty = async (propertyId, formData, onProgress) => {
    try {
        const response = await axiosInstance.put( 
            `/admin/properties/edit/${propertyId}`,
            formData,
            {
                timeout: 3600000,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                onUploadProgress: handleUploadProgress(onProgress, formData)
            }
        );
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