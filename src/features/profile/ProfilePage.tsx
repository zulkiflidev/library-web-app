//import React from 'react'

import useProfile from '@/hooks/useProfile';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';




function ProfilePage() {

  const { data, isLoading, isError } = useProfile();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error!</div>;
  if (!data) return null;

//   const { profile, loanStats, reviewsCount } = data;
  const { profile  } = data;


  return (
    <div className="max-w-2xl mx-auto space-y-8 px-4 md:px-20">
        

        <div className="flex items-center gap-6">
            <Avatar className="w-20 h-20">

                <AvatarImage src={ profile.profilePhoto  ?? undefined } />
                <AvatarFallback> {profile.name.charAt(0).toUpperCase()}  </AvatarFallback>

            </Avatar>

            <div className="space-y-1">
                <h1 className="text-2xl font-bold"> { profile.name } </h1>
                <p className="text-muted-foreground"> { profile.email } </p>
                <p className="text-muted-foreground"> { profile.phone } </p>

            </div>

            {/* Statitik Loan, perlukah? kayaknya pending dulu deh... */}


        </div>


    </div>
  )
}

export default ProfilePage