import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LockKeyhole } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import AuthForm from '../components/AuthForm';
import { Helmet } from 'react-helmet-async';

export default function Signup() {
  const navigate = useNavigate();
  const { signUp, loading, error, clearError } = useAuthStore();

  React.useEffect(() => {
    clearError();
  }, [clearError]);

  const handleSignup = async (data: any) => {
    try {
      await signUp(data);
      navigate('/dashboard');
    } catch (err) {
      console.error('Signup failed:', err);
    }
  };

  return (
    <>
    <Helmet>
        <title>Signup - Banking System</title>
      </Helmet>
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-center mb-8">
          <div className="bg-blue-500 p-3 rounded-full">
            <LockKeyhole className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-8">Create Account</h2>
        
        <AuthForm
          type="signup"
          onSubmit={handleSignup}
          loading={loading}
          error={error}
        />

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:text-blue-600 font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
    </>
  );
}