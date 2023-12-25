//sepeate utillity file that exports a function to handle authentication and returns the Oauth tokens
import { AuthChangeEvent, Session } from '@supabase/supabase-js';

export interface AuthTokens {  //think of it like a class with 2 properties
  providerToken?: string;
  providerRefreshToken?: string;
}

export function handleAuthChange(event: AuthChangeEvent, session: Session | null): AuthTokens {  //we are exporting out the handleAuthChange function so that it can be reused in other files
  console.log('event:', event);
  console.log('session:', session);

  const authTokens: AuthTokens = {};

  if (session) {
    authTokens.providerToken = session.provider_token || '';
    authTokens.providerRefreshToken = session.provider_refresh_token || '';
    window.localStorage.setItem('oauth_provider_token', authTokens.providerToken);
    window.localStorage.setItem('oauth_provider_refresh_token', authTokens.providerRefreshToken);
  }

  if (event === 'SIGNED_OUT') {
    window.localStorage.removeItem('oauth_provider_token');  //remove the token after signing out
    window.localStorage.removeItem('oauth_provider_refresh_token');
  }

  return authTokens;
}

export function checkTokens(tokens: AuthTokens): boolean { 
    return !!tokens.providerToken; // Returns true if providerToken exists, false otherwise
  }
