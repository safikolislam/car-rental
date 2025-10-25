import { ClipLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-white">
      <ClipLoader color="#3B82F6" size={50} />
    </div>
  );
};

export default Loading;
