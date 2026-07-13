import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="w-full max-w-md text-center">
      <h1 className="text-3xl font-bold mb-4">Forgot Password</h1>
      <p className="text-gray-500 mb-8">
        Password reset feature coming soon. Please contact support.
      </p>
      <Link
        href="/login"
        className="text-blue-600 hover:underline"
      >
        Back to Login
      </Link>
    </div>
  );
}
