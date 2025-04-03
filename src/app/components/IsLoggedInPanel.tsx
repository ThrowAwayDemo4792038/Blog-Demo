import { createClient } from '@/utils/supabase/server'
import React from 'react'

async function IsLoggedInPanel() {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser()

    return (
        <div>
            {
                data?.user 
                ?

                <p>You are logged in</p> 
                : 
                <p>You are not logged in</p>
            }
        </div>
    )
}

export default IsLoggedInPanel