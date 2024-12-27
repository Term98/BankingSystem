import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';
import type { Profile, Account, Transaction } from '../types';
import TransactionList from '../components/TransactionList';
import { Helmet } from 'react-helmet-async';

interface CustomerWithAccount extends Profile {
  accounts: Account[];
}

export default function BankerDashboard() {
  const { signOut } = useAuthStore();
  const [customers, setCustomers] = useState<CustomerWithAccount[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    if (selectedCustomer) {
      fetchCustomerTransactions(selectedCustomer);
    }
  }, [selectedCustomer]);

  async function fetchCustomers() {
    const { data } = await supabase
      .from('profiles')
      .select(`
        *,
        accounts (*)
      `)
      .eq('user_type', 'customer');

    setCustomers(data || []);
    setLoading(false);
  }

  async function fetchCustomerTransactions(customerId: string) {
    const { data: accountData } = await supabase
      .from('accounts')
      .select('id')
      .eq('user_id', customerId)
      .single();

    if (accountData) {
      const { data } = await supabase
        .from('transactions')
        .select('*')
        .eq('account_id', accountData.id)
        .order('created_at', { ascending: false });

      setTransactions(data || []);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <Helmet>
        <title>Banker's Dashboard</title>
      </Helmet>
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Customer Accounts</h1>
          <button
            onClick={signOut}
            className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Customers</h2>
            <div className="space-y-2">
              {customers.map((customer) => (
                <button
                  key={customer.id}
                  onClick={() => setSelectedCustomer(customer.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedCustomer === customer.id
                      ? 'bg-blue-50 text-blue-700'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <p className="font-medium">{customer.full_name || customer.email}</p>
                  <p className="text-sm text-gray-500">
                    Balance: ${customer.accounts[0]?.balance.toFixed(2) || '0.00'}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Transaction History</h2>
            {selectedCustomer ? (
              <TransactionList transactions={transactions} />
            ) : (
              <p className="text-gray-500">Select a customer to view transactions</p>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
