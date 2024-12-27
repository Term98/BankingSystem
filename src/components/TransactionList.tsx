import { ArrowDownCircle, ArrowUpCircle } from 'lucide-react';
import type { Transaction } from '../types';

interface TransactionListProps {
  transactions: Transaction[];
}

export default function TransactionList({ transactions }: TransactionListProps) {
  if (transactions.length === 0) {
    return <p className="text-gray-500">No transactions found</p>;
  }

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between"
        >
          <div className="flex items-center space-x-3">
            {transaction.type === 'deposit' ? (
              <ArrowDownCircle className="w-6 h-6 text-green-500" />
            ) : (
              <ArrowUpCircle className="w-6 h-6 text-red-500" />
            )}
            <div>
              <p className="font-medium capitalize">{transaction.type}</p>
              <p className="text-sm text-gray-500">
                {new Date(transaction.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
          <p
            className={`font-bold ${
              transaction.type === 'deposit' ? 'text-green-500' : 'text-red-500'
            }`}
          >
            ${transaction.amount.toFixed(2)}
          </p>
        </div>
      ))}
    </div>
  );
}
