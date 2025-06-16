import { useLoaderData } from "react-router";

const MyBookings = () => {
    const data = useLoaderData();
    const car = data?.data || [];

    return (
        <div className="min-h-screen">
            <h1>My Bookings</h1>
            <table  border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Car Name</th>
                        <th>Booking Date</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {car.length > 0 ? (
                        car.map((booking, index) => (
                            <tr key={booking.id || index}>
                                <td>{index + 1}</td>
                                <td>{booking.model || "N/A"}</td>
                                <td>{booking.date || "N/A"}</td> 
                                <td>{booking.price ? `$${booking.price}` : "N/A"}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" style={{ textAlign: "center" }}>No bookings found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default MyBookings;

