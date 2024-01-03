import { useEffect } from 'react';
import { useAuth } from './authProvider';
import { useRouter } from 'next/router';
import LoadingDots from './ui/LoadingDots';
export default function ProtectedRoute({ children }: any) {
  const { isLoading, isAuthenticated, user } = useAuth();
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="w-full h-full bg-black">
        <LoadingDots color="black" props={''} />
      </div>
    );
  } else {
    if (!isLoading && !isAuthenticated && (router.pathname.includes('/dashboard') || router.pathname.includes('/test'))) {
      router.push('/404');
    } else {
      return children;
    }
  }
}
