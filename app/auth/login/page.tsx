import FacebookLoginButton from '@/components/auth/FacebookLoginButton'

export default function LoginPage() {
  return (
    <div className="w-full max-w-md mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Login to Strategix</h1>

      {/* Your existing login form (email/password) here */}

      <div className="mt-8 border-t pt-4">
        <p className="text-sm text-center text-gray-500">Or continue with</p>

        {/* Facebook Button */}
        <FacebookLoginButton />
      </div>
    </div>
  )
}
