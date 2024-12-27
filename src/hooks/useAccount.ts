import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Account, Transaction } from '../types';

export function useAccount(userId: string) {
  const [account, setAccount] = useState<Account | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAccount();
    fetchTransactions();
  }, [userId]);

  async function fetchAccount() {
    const { data } = await supabase
      .from('accounts')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    setAccount(data);
    setLoading(false);
  }

  async function fetchTransactions() {
    const { data: accountData } = await supabase
      .from('accounts')
      .select('id')
      .eq('user_id', userId)
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

  async function handleTransaction(type: 'deposit' | 'withdrawal', amount: number) {
    if (!account) return;

    const newBalance = type === 'deposit' 
      ? account.balance + amount 
      : account.balance - amount;

    const { error: transactionError } = await supabase
      .from('transactions')
      .insert({
        account_id: account.id,
        amount,
        type
      });

    if (transactionError) throw transactionError;

    const { error: accountError } = await supabase
      .from('accounts')
      .update({ balance: newBalance })
      .eq('id', account.id);

    if (accountError) throw accountError;

    await fetchAccount();
    await fetchTransactions();
  }

  return {
    account,
    transactions,
    loading,
    handleTransaction
  };
}