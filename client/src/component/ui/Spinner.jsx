const Spinner = ({ fullScreen = false, size = "12", color = "from-blue-500 via-purple-500 to-pink-500" }) => {
  return (
    <div
      className={`flex justify-center items-center ${
        fullScreen ? "h-screen w-screen bg-white/50 backdrop-blur-sm" : "py-8"
      }`}
    >
      <div
        className={`animate-spin rounded-full h-${size} w-${size} border-4 border-transparent 
        bg-gradient-to-tr ${color} 
        bg-clip-border`}
        style={{
          borderTopColor: "transparent",
          borderRightColor: "transparent",
        }}
      ></div>
    </div>
  );
};

export default Spinner;
