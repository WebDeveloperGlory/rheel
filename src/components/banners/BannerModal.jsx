import { Camera, X } from 'lucide-react';

const BannerModal = ({ show, onClose, onSubmit, formData, onChange, error }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/10 bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold">Add New Banner</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Banner Image</label>
            <label className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer block">
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
                  <p className="text-sm text-gray-600">Drop files here or click to upload</p>
                  <p className="text-xs text-gray-500 mt-1">Maximum file size: 10MB</p>
                  <p className="text-xs text-gray-500 mt-1">Must be exactly 1280×768 pixels</p>
                </>
              )}
              <input
                type="file"
                name="banner_image"
                accept="image/*"
                onChange={onChange}
                className="hidden"
              />
            </label>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Redirect Link</label>
            <input
              type="text"
              name="redirect_link"
              value={formData.redirect_link}
              onChange={onChange}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter redirect link"
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              disabled={!formData.banner_image || !formData.redirect_link}
            >
              Add Banner
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BannerModal;
