export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  user_type: 'customer' | 'banker';
  created_at: string;
}

export interface Account {
  id: string;
  user_id: string;
  balance: number;
  created_at: string;
}

export interface Transaction {
  id: string;
  account_id: string;
  amount: number;
  type: 'deposit' | 'withdrawal';
  created_at: string;
}

export interface SignUpData {
  email: string;
  password: string;
  fullName: string;
}