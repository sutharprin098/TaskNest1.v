export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-900">Forgot password</h1>
        <p className="mt-3 text-sm text-gray-600">
          Password reset is not enabled yet. Please contact support or return to
          login.
        </p>
        <a
          href="/auth/login"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-gray-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-gray-800"
        >
          Back to login
        </a>
      </div>
    </div>
  );
}
