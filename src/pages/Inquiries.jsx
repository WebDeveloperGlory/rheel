import React, { useState, useEffect } from 'react'
import { getInquiries } from '../api/inquiries/requests'
import TopSection from '../components/inquiries/TopSection';
import InquiriesMetrics from '../components/inquiries/InquiriesMetrics';
import megaphone from '../assets/images/megaphone.png'

const Inquiries = () => {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getInquiries();
                console.log('Fetched inquiries:', response); // Debug log

                if (response.status && Array.isArray(response.data)) {
                    setInquiries(response.data);
                } else {
                    console.warn('Invalid inquiries data:', response);
                    setInquiries([]);
                    setError('Invalid data received from server');
                }
            } catch (error) {
                console.error('Error in fetchData:', error);
                setError(error.message || 'Failed to fetch inquiries');
                setInquiries([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Debug log
    useEffect(() => {
        console.log('Current inquiries state:', inquiries);
    }, [inquiries]);

    const inquiriesMetricsData = [
        {
            name: 'Total Inquiries',
            value: Array.isArray(inquiries) ? inquiries.length : 0,
            image: megaphone
        }
    ];

    if (loading) {
        return (
            <div className="p-4">
                <TopSection />
                <div className="bg-white p-4 rounded-lg">
                    <div className="animate-pulse space-y-4">
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4">
            <TopSection />
            <InquiriesMetrics metrics={inquiriesMetricsData} />
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
};

export default Inquiries;