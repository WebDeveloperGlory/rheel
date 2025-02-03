import React, { useState, useEffect } from 'react';
import { Camera, Upload, X } from 'lucide-react';
import { createBanner, getBanners } from '../api/banners/requests';

const initialBannerState = [
    {
        id: 1,
        banner_link: 'https://umfqnvnitnkjlxrvzcqt.supabase.co/storage/v1/object/public/properties_images/banner_logo/2024-10-16_18-33-07_banner.png',
        redirect_link: null
    },
    {
        id: 2,
        banner_link: 'https://apidoc.rheel.ng/assets/1737463138735-144526559-Screenshot 2024-03-10 134320.png',
        redirect_link: 'https://ajala.ng'
    },
];
const initialFormState = {
    banner_image: null,
    redirect_link: '',
}

const BannerManagement = () => {
    const [ banners, setBanners ] = useState([ ...initialBannerState ]);
    const [ error, setError ] = useState( "" );
    const [ showModal, setShowModal ] = useState( false );
    const [ loading, setLoading ] = useState( true );
    const [ formData, setFormData ] = useState({ ...initialFormState });

    useEffect(() => {
        const fetchData = async () => {
            const data = await getBanners();
            setBanners( data.data );
            console.log( data )
            setLoading( false );
        }

        if( loading ) fetchData();
    }, [ loading ])

    const handleInputChange = ( e ) => {
        const { name, value, files } = e.target;

        if ( files ) {
            // setFormData( ( prevData ) => ({
            //     ...prevData,
            //     banner_image: files[ 0 ],
            // }) );
            const img = new Image();
            const objectUrl = URL.createObjectURL(files[ 0 ]);

            img.onload = () => {
                if (img.width === 1280 && img.height === 768) {
                    setFormData((prevData) => ({
                        ...prevData,
                        banner_image: files[ 0 ],
                    }));
                    setError(""); // Clear any previous error
                } else {
                    setError("Image must be exactly 1280×768 pixels.");
                }
                URL.revokeObjectURL(objectUrl);
            };

            img.src = objectUrl;
        } else {
            setFormData( ( prevData ) => ({
                ...prevData,
                redirect_link: value,
            }))
        }
        // if ( name === 'banner_image' ) {
        //     setFormData( ( prevData ) => ({ ...prevData, [ name ]: files[ 0 ] }) );
        // } else {
        //     setFormData( ( prevData ) => ({ ...prevData, [ name ]: value }) );
        // }
    };

    const handleSubmit = async ( e ) => {
        e.preventDefault();
        if ( formData.banner_image && formData.redirect_link ) {

             // Create a new FormData object
            const updatedFormData = new FormData();

            // Append all key-value pairs from the object
            updatedFormData.append("redirect_link", formData.redirect_link);
            updatedFormData.append(`banner_image`, formData.banner_image);

            // const newBanner = {
            //     id: banners.length + 1,
            //     banner_link: URL.createObjectURL( formData.banner_image ),
            //     redirect_link: formData.redirect_link
            // };
            // setBanners([...banners, newBanner]);

            const data = await createBanner( updatedFormData );
            if( data.status ) {
                console.log('Banner created successfully: ', data );
                window.alert('Banner created successfully');
                setShowModal(false);
                setFormData({
                    banner_image: null,
                    redirect_link: '',
                });    
                setLoading( true );
            } else {
                window.alert('An Error Occurred');
            }
        }
    };

    const handleDelete = ( id ) => {
        setBanners( banners.filter( ( banner ) => banner.id !== id ) );
    };

  return (
    <div className="p-4">
        <h1 className="text-3xl font-bold mb-6">Banner Management</h1>
        <div className="mb-6">
            <button
                onClick={() => setShowModal(true)}
                className="bg-black text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors cursor-pointer"
            >
                <Upload className="w-5 h-5" /> Add Banner
            </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {
                banners.map( ( banner ) => (
                    <div
                        key={ banner.id }
                        className="bg-white rounded-lg overflow-hidden shadow-lg"
                    >
                        <img
                            src={ banner.banner_link }
                            alt="Banner"
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <p className="font-medium mb-2">
                                Redirect Link: <a href={ banner.redirect_link ? banner.redirect_link : '/'} className='underline underline-offset-2 hover:underline-offset-4'>{ banner.redirect_link || 'None' }</a>
                            </p>
                            <div className="flex justify-end">
                                <button
                                    onClick={() => handleDelete(banner.id)}
                                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                                >
                                    <X className="w-5 h-5 text-red-500" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>

        {
            showModal && (
                <div className="fixed inset-0 bg-black/10 bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg w-full max-w-2xl">
                        <div className="p-6 border-b flex justify-between items-center">
                            <h2 className="text-2xl font-bold">Add New Banner</h2>
                            <button
                                onClick={ () => setShowModal( false ) }
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={ handleSubmit } className="p-6 space-y-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Banner Image
                                </label>
                                <label 
                                    className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer block"
                                >
                                    {formData.banner_image ? (
                                        <img
                                            src={URL.createObjectURL(formData.banner_image)}
                                            alt="Banner Preview"
                                            className="w-full h-32 object-contain mb-4"
                                            onLoad={(e) => URL.revokeObjectURL(e.target.src)}
                                        />
                                    ) : (
                                        <>
                                            <Camera className="w-8 h-8 mx-auto mb-4 text-gray-400" />
                                            <p className="text-sm text-gray-600">
                                                Drop files here or click to upload
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                Maximum file size: 10MB
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                Must be exactly 1280×768 pixels
                                            </p>
                                        </>
                                    )}
                                    <input
                                        type="file"
                                        name="banner_image"
                                        accept="image/*"
                                        onChange={handleInputChange}
                                        className="hidden"
                                    />
                                </label>
                                { error && <p className="text-red-500 text-sm mt-2">{error}</p> }
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Redirect Link
                                </label>
                                <input
                                    type="text"
                                    name="redirect_link"
                                    value={ formData.redirect_link }
                                    onChange={ handleInputChange }
                                    className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
                                    placeholder="Enter redirect link"
                                />
                            </div>

                            <div className="flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={ () => setShowModal( false ) }
                                    className="px-6 py-2 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
                                >
                                    Add Banner
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )
        }
    </div>
  );
};

export default BannerManagement;