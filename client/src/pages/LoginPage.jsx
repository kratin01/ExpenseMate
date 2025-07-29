import Login from "../component/auth/Login";

const LoginPage = () => {
  // The Login component itself now handles the entire page layout.
  // We just need to render it here.
  return( 
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Login />
    </div>
  );
};

export default LoginPage;