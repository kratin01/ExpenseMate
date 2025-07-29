const Alert = ({ type = 'info', message }) => {
  const alertStyles = {
    info: 'bg-blue-50 text-blue-800',
    success: 'bg-green-50 text-green-800',
    warning: 'bg-yellow-50 text-yellow-800',
    error: 'bg-red-50 text-red-800'
  };
  
  return (
    <div className={`${alertStyles[type]} p-4 rounded-md mb-4`}>
      {message}
    </div>
  );
};

export default Alert;