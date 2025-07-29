// client/src/components/transactions/ReceiptUploader.js
import { useState } from 'react';
import toast from 'react-hot-toast';
import { extractReceipt } from '../../api/transactions';

const ReceiptUploader = ({ onDataExtracted }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast.error('Invalid file type. Please upload JPEG, PNG, or WEBP image.');
      return;
    }

    setIsProcessing(true);
    
    try {
      const formData = new FormData();
      formData.append('receipt', file);
      
      const response = await extractReceipt(formData);
      onDataExtracted(response.data);
      toast.success('Receipt processed successfully!');
    } catch (error) {
      console.error('Receipt processing error:', error);
      toast.error(error.response?.data?.error || 'Failed to process receipt');
    } finally {
      setIsProcessing(false);
      // Reset input to allow same file re-upload
      e.target.value = null;
    }
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Upload Receipt
      </label>
      
      <div className="flex items-center">
        <label
          htmlFor="receipt-upload"
          className={`flex-1 py-2 px-4 bg-gray-100 border border-dashed border-gray-300 rounded-lg text-center cursor-pointer transition-colors ${
            isProcessing ? 'opacity-50' : 'hover:bg-gray-200'
          }`}
        >
          {isProcessing ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing receipt...
            </span>
          ) : (
            'Select Receipt Image'
          )}
        </label>
        
        <input
          id="receipt-upload"
          type="file"
          accept="image/jpeg, image/png, image/webp"
          className="hidden"
          onChange={handleFileChange}
          disabled={isProcessing}
        />
      </div>
      
      <p className="mt-2 text-xs text-gray-500">
        Supported formats: JPEG, PNG, WEBP. Max size: 10MB
      </p>
    </div>
  );
};

export default ReceiptUploader;