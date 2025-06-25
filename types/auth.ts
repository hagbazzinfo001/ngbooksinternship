export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
}

export interface SignupFormData {
  fullName: string;
  phoneNumber?: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export interface SigninFormData {
  email: string;
  password: string;
}

export interface SignupResult {
  success: boolean;
  error?: string;
}

export interface SigninResult {
  success: boolean;
  error?: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signin: (data: SigninFormData) => Promise<SigninResult>;
  signup: (data: SignupFormData) => Promise<SignupResult>;
  signout: () => void;
}
