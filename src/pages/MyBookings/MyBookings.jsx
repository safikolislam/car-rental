import React, { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Loading from "../../Components/Loading";
import { format } from "date-fns";
import ReactECharts from "echarts-for-react";
import { useNavigate } from "react-router";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [editingBooking, setEditingBooking] = useState(null);


  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["myBookings", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/bookings`);
      return res.data.filter((b) => b.userEmail === user.email);
    },
  });


  const cancelMutation = useMutation({
    mutationFn: async (id) => axios.delete(`${import.meta.env.VITE_API_URL}/bookings/${id}`),
    onSuccess: () => {
      Swal.fire("Canceled!", "Your booking has been canceled.", "success");
      queryClient.invalidateQueries(["myBookings", user?.email]);
    },
    onError: () => Swal.fire("Error", "Failed to cancel booking.", "error"),
  });

  const handleCancel = (booking) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) cancelMutation.mutate(booking._id);
    });
  };


  const modifyMutation = useMutation({
    mutationFn: async ({ id, bookingDate, returnDate }) => {
      const res = await axios.put(`${import.meta.env.VITE_API_URL}/bookings/${id}`, { bookingDate, returnDate });
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Updated!", "Booking dates have been updated.", "success");
      setEditingBooking(null);
      queryClient.invalidateQueries(["myBookings", user?.email]);
    },
    onError: () => Swal.fire("Error", "Failed to update booking.", "error"),
  });

  const handleModifySubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (editingBooking) {
      modifyMutation.mutate({
        id: editingBooking._id,
        bookingDate: formData.get("bookingDate"),
        returnDate: formData.get("returnDate"),
      });
    }
  };

  if (!user) return <p className="p-6">Please login to view your bookings.</p>;
  if (isLoading) return <Loading />;

  
  const bookingsWithTotals = bookings.map((b) => {
    const start = new Date(b.bookingDate);
    const end = new Date(b.returnDate || b.bookingDate);
    const days = Math.max(Math.ceil((end - start) / (1000 * 60 * 60 * 24)), 1);
    const totalPrice = (b.pricePerDay || 0) * days;
    return { ...b, days, totalPrice };
  });


  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const aggregatedData = weekdays.map((day) => ({ day, totalDays: 0, totalRevenue: 0 }));

  bookingsWithTotals.forEach((b) => {
    let dayIndex = new Date(b.bookingDate).getDay() - 1;
    if (dayIndex === -1) dayIndex = 6;
    aggregatedData[dayIndex].totalDays += b.days;
    aggregatedData[dayIndex].totalRevenue += b.totalPrice;
  });

  const chartOption = {
    title: { text: "Bookings Overview (Weekdays)", left: "center" },
    tooltip: {
      trigger: "axis",
      formatter: (params) => {
        const days = params.find((p) => p.seriesName === "Days")?.data || 0;
        const revenue = params.find((p) => p.seriesName === "Revenue")?.data || 0;
        return `${params[0].axisValue}<br/>Total Days: ${days}<br/>Revenue: $${revenue.toFixed(2)}`;
      },
    },
    xAxis: { type: "category", data: weekdays },
    yAxis: { type: "value" },
    legend: { data: ["Days", "Revenue"], top: 30 },
    series: [
      { name: "Days", type: "line", smooth: true, data: aggregatedData.map((d) => d.totalDays) },
      { name: "Revenue", type: "line", smooth: true, data: aggregatedData.map((d) => d.totalRevenue) },
    ],
  };


  const totalPayment = bookingsWithTotals.reduce((sum, b) => sum + b.totalPrice, 0);

  return (
    <div className="p-4 md:p-6 min-h-screen bg-base-100 mx-auto max-w-7xl">
      <h2 className="text-2xl md:text-3xl font-bold mb-4">My Bookings</h2>
      <p className="mb-6 font-semibold text-lg md:text-xl">
        Total Payment: <span className="text-primary">${totalPayment.toFixed(2)}</span>
      </p>

      {bookingsWithTotals.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <>
        
          <div className="p-4 bg-base-200 rounded-lg shadow mb-6 overflow-x-auto">
            <ReactECharts option={chartOption} style={{ height: 300, width: "100%" }} />
          </div>

        
          <div className="overflow-x-auto shadow-lg rounded-lg border border-base-300">
            <table className="table w-full table-zebra text-sm md:text-base">
              <thead className="bg-base-200">
                <tr>
                  <th>Car</th>
                  <th>Model</th>
                  <th>Booking Date</th>
                  <th>Return Date</th>
                  <th>Days</th>
                  <th>Total Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookingsWithTotals.map((b) => (
                  <tr key={b._id} className="hover:bg-gray-100">
                    <td>
                      <img
                        src={b.carImage}
                        alt={b.carModel}
                        className="w-16 h-10 md:w-20 md:h-12 object-cover rounded"
                      />
                    </td>
                    <td>{b.carModel}</td>
                    <td>{format(new Date(b.bookingDate), "dd-MM-yyyy HH:mm")}</td>
                    <td>{format(new Date(b.returnDate || b.bookingDate), "dd-MM-yyyy HH:mm")}</td>
                    <td>{b.days}</td>
                    <td>${b.totalPrice.toFixed(2)}</td>
                    <td>
                      <span
                        className={`badge ${
                          b.status === "Confirmed"
                            ? "badge-success"
                            : b.status === "Canceled"
                            ? "badge-error"
                            : "badge-warning"
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="flex flex-wrap gap-2">
                      <button
                        className="btn btn-xs md:btn-sm btn-info"
                        onClick={() => setEditingBooking(b)}
                      >
                        Modify
                      </button>
                      {b.status !== "Canceled" && (
                        <>
                          <button
                            className="btn btn-xs md:btn-sm btn-error"
                            onClick={() => handleCancel(b)}
                          >
                            Cancel
                          </button>
                          <button
                            className="btn btn-xs md:btn-sm btn-primary"
                            onClick={() => navigate(`/payment/${b._id}`)}
                          >
                            Payment
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

         
          {editingBooking && (
            <dialog open className="modal modal-open">
              <div className="modal-box">
                <h3 className="font-bold text-lg mb-4">Modify Booking Dates</h3>
                <form onSubmit={handleModifySubmit} className="space-y-4">
                  <label className="flex flex-col">
                    Start Date
                    <input
                      type="datetime-local"
                      name="bookingDate"
                      defaultValue={new Date(editingBooking.bookingDate).toISOString().slice(0, 16)}
                      className="input input-bordered w-full"
                      required
                    />
                  </label>
                  <label className="flex flex-col">
                    End Date
                    <input
                      type="datetime-local"
                      name="returnDate"
                      defaultValue={new Date(editingBooking.returnDate || editingBooking.bookingDate)
                        .toISOString()
                        .slice(0, 16)}
                      className="input input-bordered w-full"
                      required
                    />
                  </label>
                  <div className="modal-action flex justify-end gap-2 flex-wrap">
                    <button
                      type="button"
                      className="btn btn-ghost"
                      onClick={() => setEditingBooking(null)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Confirm
                    </button>
                  </div>
                </form>
              </div>
            </dialog>
          )}
        </>
      )}
    </div>
  );
};

export default MyBookings;













