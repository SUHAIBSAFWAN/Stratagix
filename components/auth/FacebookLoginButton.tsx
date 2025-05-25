'use client'

import { supabase } from '@/lib/supabaseClient'



import { Button } from '@/components/ui/button'

export default function FacebookLoginButton() {
  const loginWithFacebook = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'facebook',
      options: {
        redirectTo: 'http://localhost:3000/dashboard', // or your own route
      },
    })
    if (error) {
      console.error('Facebook login failed:', error.message)
    }
  }

  return (
    <Button
      onClick={loginWithFacebook}
      className="w-full mt-4"
      variant="outline"
    >
      Continue with Facebook
    </Button>
  )
}
