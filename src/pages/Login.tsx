import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LockKeyhole } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import AuthForm from '../components/AuthForm';
import { Helmet } from 'react-helmet-async';

export default function Login() {
  const navigate = useNavigate();
  const { signIn, loading, error, clearError, user } = useAuthStore();

  React.useEffect(() => {
    clearError();
  }, [clearError]);

  React.useEffect(() => {
    if (user) {
      navigate(user.user_type === 'banker' ? '/banker' : '/dashboard');
    }
  }, [user, navigate]);

  const handleLogin = async (data: any) => {
    try {
      await signIn(data.email, data.password);
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login - Banking System</title>
      </Helmet>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <div className="flex justify-center mb-8">
            <div className="bg-blue-500 p-3 rounded-full">
              <LockKeyhole className="w-8 h-8 text-white" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-center mb-8">Sign In</h2>

          <AuthForm
            type="login"
            onSubmit={handleLogin}
            loading={loading}
            error={error}
          />

          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-500 hover:text-blue-600 font-medium">
              Sign up
            </Link>
          </p>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 font-medium mb-2">Test Accounts:</p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>Customer: harshadmehta@gmail.com / 12345678!</li>
              <li>Banker: sbi@gmail.com / 12345678!</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
