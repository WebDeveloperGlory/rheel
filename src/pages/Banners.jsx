import React, { useState, useEffect } from 'react';
import { Upload } from 'lucide-react';
import { createBanner, deleteBanner, getBanners } from '../api/banners/requests';
import TopSection from '../components/banners/TopSection';
import BannerModal from '../components/banners/BannerModal';
import BannerList from '../components/banners/BannerList';
import BannerMetrics from '../components/banners/BannerMetrics';

const initialFormState = {
  banner_image: null,
  redirect_link: '',
};

const BannerManagement = () => {
  const [banners, setBanners] = useState([]);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ ...initialFormState });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getBanners();
      setBanners(data.data);
      setLoading(false);
    };

    if (loading) fetchData();
  }, [loading]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const img = new Image();
      const objectUrl = URL.createObjectURL(files[0]);

      img.onload = () => {
        if (img.width === 1280 && img.height === 768) {
          setFormData((prevData) => ({
            ...prevData,
            banner_image: files[0],
          }));
          setError("");
        } else {
          setError("Image must be exactly 1280×768 pixels.");
        }
        URL.revokeObjectURL(objectUrl);
      };

      img.src = objectUrl;
    } else {
      setFormData((prevData) => ({
        ...prevData,
        redirect_link: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.banner_image && formData.redirect_link) {
      const updatedFormData = new FormData();
      updatedFormData.append("redirect_link", formData.redirect_link);
      updatedFormData.append("banner_image", formData.banner_image);

      const data = await createBanner(updatedFormData);
      
      if (data && data.status) {
        window.alert('Banner created successfully');
        setShowModal(false);
        setFormData({ ...initialFormState });
        setLoading(true);
      } else {
        window.alert('An Error Occurred');
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this banner?')) {
      const data = await deleteBanner(id);
      if (data.status) {
        window.alert('Banner deleted successfully');
        setLoading(true);
      } else {
        window.alert('An Error Occurred');
      }
    }
  };

  const BannerMetricsData = [
    {name: 'Total Banners', value: banners.length},
    {name: 'Total Links', value: banners.filter(banner => banner.redirect_link).length},
  ]

  return (
    <div className="p-4">
      <TopSection />
      <BannerMetrics metrics={BannerMetricsData} />
      <div className='flex flex-col gap-3 items-start mb-5'>
      <h1 className='font-bold'>Banners</h1>
      <button
        onClick={() => setShowModal(true)}
        className='bg-[#348875] text-white py-3 px-5 text-[13px] cursor-pointer'
      >
        Add Banner
      </button>
    </div>

      <BannerList 
        banners={banners} 
        onDelete={handleDelete} 
        loading={loading} 
      />

      <BannerModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
        formData={formData}
        onChange={handleInputChange}
        error={error}
      />
    </div>
  );
};

export default BannerManagement;