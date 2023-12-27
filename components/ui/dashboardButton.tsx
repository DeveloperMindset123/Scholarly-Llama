import { Button } from '@/components/ui/button';
import { supabase } from 'lib/initSupabase';
import { useAuth } from '../authProvider';
import { useRouter } from 'next/router';
export default function DashboardButton() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  return (
    <Button
      size="xl"
      className="w-full font-bold "
      variant="brand"
      onClick={async() => {
        if (isAuthenticated) {
          router.push('/dashboard');
        } else {
          await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
              redirectTo: '/dashboard',
              queryParams: {
                prompt: 'consent',
              },
            },
          });
        }
      }}
    >
      Get Started
    </Button>
  );
}
