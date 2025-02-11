import { Upload, X, Loader2 } from 'lucide-react';

const BannerModal = ({ show, onClose, onSubmit, formData, onChange, error, isSubmitting }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full md:w-[400px] max-w-lg max-h-[570px] overflow-y-auto">
        <div className="p-6 flex justify-between items-center">
          <h2 className="text-xl font-bold text-[#48505E]">
            Add New Banner
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={onSubmit}>
          <div className="space-y-2 p-2 px-5">
            <label className="block text-[14px] font-medium text-[#383E49]">Banner Image</label>
            <div className="flex justify-center items-start gap-5">
              <div className="border border-dashed border-[#9D9D9D] bg-white w-[100px] h-[100px] rounded-lg relative hover:bg-gray-50 transition-colors cursor-pointer overflow-hidden">
                {formData.banner_image ? (
                  <img
                    src={URL.createObjectURL(formData.banner_image)}
                    alt="Banner Preview"
                    className="absolute inset-0 w-full h-full object-cover"
                    onLoad={(e) => URL.revokeObjectURL(e.target.src)}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Upload className="w-6 h-6 text-gray-400" />
                  </div>
                )}
                <input
                  type="file"
                  name="banner_image"
                  accept="image/*"
                  onChange={onChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
              <div className='w-[100px]'>
                <p className="text-[12px] text-[#858D9D]">Drop an image here or click to upload</p>
                <p className="text-xs text-[#80D3A1] mt-1">Must be 1280×768 pixels</p>
              </div>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>

          <div className="flex justify-between items-center p-2 px-5 mt-2">
            <label className="block text-[14px] font-medium text-[#383E49]">Redirect Link</label>
            <input
              type="text"
              name="redirect_link"
              value={formData.redirect_link}
              onChange={onChange}
              className="w-[60%] border rounded-lg p-2 text-sm placeholder:text-[14px] focus:outline-none border-[#D0D5DD]"
              placeholder="Enter redirect link"
            />
          </div>

          <div className="flex justify-end gap-4 py-8 px-5">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-6 py-2 border rounded-lg text-sm hover:bg-gray-50 transition-colors cursor-pointer disabled:opacity-50"
            >
              Discard
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !formData.banner_image || !formData.redirect_link}
              className="px-6 py-2 bg-[#4DA981] text-sm text-white rounded-lg cursor-pointer disabled:opacity-80 flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Add Banner'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BannerModal;
