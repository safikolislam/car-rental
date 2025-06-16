import axios from "axios";
import Swal from 'sweetalert2';



const AddCar = () => {

    const handleAddCar = e => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const CarData = Object.fromEntries(formData.entries());
       
 
      axios.post(`${import.meta.env.VITE_API_URL}/add-car`, CarData)
      .then(data => {
        console.log(data)
        Swal.fire({
          title: 'Good job!',
          text: 'Data Added Successfully',
          icon: 'success',
        })
      
      })
      .catch(err => {
        console.log(err)
      })
      
      
    };

    return (
        <div className="max-w-xl mx-auto mt-10 px-6 py-8 bg-white rounded-lg shadow-md">
       
                <title>Add Car | Rentify Car</title>
          
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Add New Car</h2>

            <form onSubmit={handleAddCar} className="space-y-5">
                <div>
                    <label  className="block text-sm font-medium text-gray-700">Car Model</label>
                    <input
                        type="text"
                        id="model"
                        name="model"
                        placeholder="e.g. Toyota Corolla"
                        className="input input-bordered w-full mt-1"
                    />
                </div>

                <div>
                    <label  className="block text-sm font-medium text-gray-700">Daily Rental Price ($)</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        placeholder="e.g. 45"
                        className="input input-bordered w-full mt-1"
                    />
                </div>

                <div>
                    <label  className="block text-sm font-medium text-gray-700">Vehicle Registration Number</label>
                    <input
                        type="text"
                        id="registration"
                        name="registration"
                        placeholder="e.g. ABC-1234"
                        className="input input-bordered w-full mt-1"
                    />
                </div>

                <div>
                    <label  className="block text-sm font-medium text-gray-700">Features</label>
                    <input
                        type="text"
                        id="features"
                        name="features"
                        placeholder="e.g. GPS, AC, Bluetooth"
                        className="input input-bordered w-full mt-1"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        placeholder="e.g. New York, NY"
                        className="input input-bordered w-full mt-1"
                    />
                </div>

                <div>
                    <label  className="block text-sm font-medium text-gray-700">Image URL</label>
                    <input
                        type="url"
                        id="imageUrl"
                        name="imageUrl"
                        placeholder="e.g. https://example.com/car.jpg"
                        className="input input-bordered w-full mt-1"
                    />
                </div>

                <div>
                    <label  className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        rows="3"
                        placeholder="Write a brief description..."
                        className="textarea textarea-bordered w-full mt-1"
                    ></textarea>
                </div>
               <div>
  <label className="block text-sm font-medium text-gray-700">Availability</label>
  <select
    id="availability"
    name="availability"
    className="select select-bordered w-full mt-1"
    defaultValue="Available"
  >
    <option value="Available">Available</option>
    <option value="Unavailable">Unavailable</option>
  </select>
</div>
                <div className="text-center">
                    <button type="submit" className="btn bg-red-300 w-full">Add Car</button>
                </div>
            </form>
        </div>
    );
};

export default AddCar;

 