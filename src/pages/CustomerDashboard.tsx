import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useAccount } from '../hooks/useAccount';
import TransactionModal from '../components/TransactionModal';
import TransactionList from '../components/TransactionList';
import { Helmet } from 'react-helmet-async';

export default function CustomerDashboard() {
  const { user, signOut } = useAuthStore();
  const { account, transactions, loading, handleTransaction } = useAccount(user?.id || '');
  const [modalType, setModalType] = useState<'deposit' | 'withdrawal' | null>(null);

  if (loading || !account) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <Helmet>
        <title>Customer's Dashboard</title>
      </Helmet>
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Welcome, {user?.full_name || user?.email}</h1>
          <button
            onClick={signOut}
            className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <p className="text-sm text-blue-600 mb-1">Available Balance</p>
            <p className="text-4xl font-bold text-blue-700">
              ${account.balance.toFixed(2)}
            </p>
          </div>

          <div className="mt-6 flex space-x-4">
            <button
              onClick={() => setModalType('deposit')}
              className="flex-1 bg-green-500 text-white p-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
            >
              Deposit
            </button>
            <button
              onClick={() => setModalType('withdrawal')}
              className="flex-1 bg-red-500 text-white p-3 rounded-lg font-semibold hover:bg-red-600 transition-colors"
            >
              Withdraw
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
          <TransactionList transactions={transactions} />
        </div>

        {modalType && (
          <TransactionModal
            isOpen={!!modalType}
            onClose={() => setModalType(null)}
            onSubmit={(amount) => handleTransaction(modalType, amount)}
            type={modalType}
            balance={account.balance}
          />
        )}
      </div>
    </div>
    </>
  );
}
