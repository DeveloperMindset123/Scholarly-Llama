import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from 'lib/initSupabase';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    supabase.auth.api.
};

export default handler; 