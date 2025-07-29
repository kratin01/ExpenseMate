// src/components/Spinner.jsx


const Spinner = ({
  fullScreen = false,
  size = 48,
  colorClassName = "border-t-indigo-600",
  trackClassName = "border-slate-200",
}) => {
 
  const wrapperClasses = fullScreen
    ? "fixed inset-0 z-50 flex justify-center items-center bg-gray-100/70 backdrop-blur-sm"
    : "flex justify-center items-center py-8";

  // Spinner classes combined
  const spinnerClasses = `animate-spin rounded-full border-4 ${trackClassName} ${colorClassName}`;

  return (
    <div className={wrapperClasses}>
      <div
        className={spinnerClasses}
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      ></div>
    </div>
  );
};

export default Spinner;