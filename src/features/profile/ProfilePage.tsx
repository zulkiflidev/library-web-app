//import React from 'react'

import useProfile from '@/hooks/useProfile';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// import Breadcrumb from '@/components/common/Breadcrumb';
import defaultPhoto from '@/assets/DefaultPhoto.png';
import { Button } from '@/components/ui/button';

// import { useNavigate } from 'react-router-dom'
import ProfileTabs from '@/components/common/ProfileTabs';

function ProfilePage() {

//   const navigate = useNavigate();    
  const { data, isLoading, isError } = useProfile();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error!</div>;
  if (!data) return null;

//   const { profile, loanStats, reviewsCount } = data;
  const { profile  } = data;


  return (
    <div className="space-y-8 px-4 md:px-20">
       
        {/* <Breadcrumb items={
            [
                { label: 'Home', href: '/' },
                { label: 'My Profile' },
            ]
        } 
        />         */}
    
        <ProfileTabs />

        <h1 className="text-2xl font-bold">My Profile</h1>

        <div className="flex flex-col items-start gap-6 border rounded-lg p-4 space-y-3 w-1/3">
            
            <Avatar className="w-20 h-20">
                <AvatarImage src={ profile.profilePhoto  ?? undefined } />
                <AvatarFallback> 
                    {/* {profile.name.charAt(0).toUpperCase()}   */}
                    <img src={defaultPhoto} 
                        alt="default photo" 
                        className="w-full h-full rounded-full object-cover" />

                </AvatarFallback>

            </Avatar>

            <div className="w-full">
                
                <div className="flex justify-between w-full gap-1">
                    <p className="text-sm"> Name </p>
                    <p className="text-sm font-bold"> { profile.name } </p>
                </div>

                <div className="flex justify-between w-full gap-1">
                    <p className="text-sm"> Email </p>
                    <p className="text-sm font-bold"> { profile.email } </p>
                </div>


                <div className="flex justify-between w-full gap-1">
                    <p className="text-sm"> Phone Number </p>
                    <p className="text-sm font-bold"> { profile.phone } </p>
                </div>

                <Button className="bg-[#1C65DA] text-white mt-5 w-full" variant="ghost">
                    Update Profile
                </Button>


{/* 
                <p className="text-2xl font-bold"> { profile.name } </p>
                <p className="text-muted-foreground"> { profile.email } </p>
                <p className="text-muted-foreground"> { profile.phone } </p>
 */}
            </div>

            {/* Statitik Loan, perlukah? kayaknya pending dulu deh... */}


        </div>


    </div>
  )
}

export default ProfilePage