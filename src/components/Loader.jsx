const Loader = ({ message = "Chargement en cours..." }) => {
  return (
    <div className="flex items-center justify-center py-10">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500 border-solid mr-4"></div>
      <span className="text-gray-600 text-sm">{message}</span>
    </div>
  );
};

export default Loader;
