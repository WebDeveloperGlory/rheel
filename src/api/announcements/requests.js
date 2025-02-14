import axiosInstance from "../axios";

export const getAnnouncements = async () => {
    try {
        const response = await axiosInstance.get(
            `/data/announcements`,
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
        console.error('Error fetching announcements: ', err );
        return null;
    }
}

export const createAnnouncement = async ( formData ) => {
    try {
        const response = await axiosInstance.post( 
            `/admin/announcements/add`,
            formData,
        );
        const { data, status } = response;

        if( !status ) {
            throw response;
        }
        return data;
    } catch( err ) {
        console.error('Error creating announcement: ', err );
        return null;
    }
}

export const updateAnnouncement = async ( announcementId, formData ) => {
    try {
        const response = await axiosInstance.put( 
            `/admin/announcements/edit/${ announcementId }`,
            formData
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

export const deleteAnnouncement = async ( announcementId ) => {
    try {
        const response = await axiosInstance.delete( 
            `/admin/announcements/delete/${ announcementId }`
        );
        const { data, status } = response;

        if( !status ) {
            throw response;
        }
        return data;
    } catch( err ) {
        console.error('Error deleting announcement: ', err );
        return null;
    }
}