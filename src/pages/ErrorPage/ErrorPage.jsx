import { Link } from 'react-router';
import Error from '../../assets/ErrorImage.jpg';

const ErrorPage = () => {
    return (
        <> 
            <title>Error Page</title>
            
            <div className="text-center py-10">
                <img className="mx-auto" src={Error} alt="Error" />
                <h1 className="text-red-400 text-2xl font-bold mt-5">404 - Page Not Found</h1>
                <p className="mt-2 mb-4">Oops! The page you're looking for doesn't exist.</p>
                
                <Link
                    to="/"
                    className="inline-block bg-red-300 text-white px-4 py-2 rounded"
                >
                    Go to Homepage
                </Link>
            </div>
        </>
    );
};

export default ErrorPage;
