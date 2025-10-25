import { useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { AuthContext } from "../../Provider/AuthProvider"; 

const AddCar = () => {
  const { user } = useContext(AuthContext);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const imageFile = e.target.files[0];
    if (!imageFile) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

      const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/image/upload`;
      const res = await axios.post(cloudinaryUrl, formData);

      setUploadedImageUrl(res.data.secure_url);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error("Image upload failed!");
      setUploadedImageUrl("");
    } finally {
      setUploading(false);
    }
  };

  const handleAddCar = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const CarData = Object.fromEntries(formData.entries());

    if (!uploadedImageUrl) {
      toast.error("Please upload an image before submitting!");
      return;
    }

    if (!user?.email) {
      toast.error("You must be logged in to add a car!");
      return;
    }

    const newCarData = {
      ...CarData,
      imageUrl: uploadedImageUrl,
      addedBy: user.email, 
    };

    axios
      .post(`${import.meta.env.VITE_API_URL}/add-car`, newCarData)
      .then(() => {
        Swal.fire({
          title: "Good job!",
          text: "Car added successfully!",
          icon: "success",
        });
        form.reset();
        setUploadedImageUrl("");
      })
      .catch((err) => {
        toast.error(err.response?.data?.error || "Failed to add car!");
      });
  };

  return (
    <div className="max-w-xl mx-auto mt-10 px-6 py-8 bg-base-100 rounded-lg shadow-md">
      <title>Add Car | Rentify Car</title>
      <h2 className="text-2xl font-bold text-center mb-6 bg-base-200">
        Add New Car
      </h2>

      <form onSubmit={handleAddCar} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Car Model
          </label>
          <input
            type="text"
            name="model"
            placeholder="e.g. Toyota Corolla"
            className="input input-bordered w-full mt-1"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Daily Rental Price ($)
          </label>
          <input
            type="number"
            name="price"
            placeholder="e.g. 45"
            className="input input-bordered w-full mt-1"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Vehicle Registration Number
          </label>
          <input
            type="text"
            name="registration"
            placeholder="e.g. ABC-1234"
            className="input input-bordered w-full mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Features
          </label>
          <input
            type="text"
            name="features"
            placeholder="e.g. GPS, AC, Bluetooth"
            className="input input-bordered w-full mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            name="location"
            placeholder="e.g. New York, NY"
            className="input input-bordered w-full mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Upload Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="file-input file-input-bordered w-full mt-1"
          />
          {uploading && (
            <p className="text-sm text-blue-500 mt-1">Uploading image...</p>
          )}
          {uploadedImageUrl && (
            <img
              src={uploadedImageUrl}
              alt="Car preview"
              className="w-32 h-24 object-cover mt-2 rounded"
            />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            rows="3"
            placeholder="Write a brief description..."
            className="textarea textarea-bordered w-full mt-1"
          ></textarea>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="btn bg-black text-white w-full"
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Add Car"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCar;

 