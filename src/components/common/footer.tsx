//import React from 'react'

import  logo  from '@/assets/logo.svg';
import socialMediaIcons from '@/assets/social-media-icons.svg'

function Footer() {
  return (
    <div className="flex flex-col items-center jusify-center 
                    mt-10 space-y-3 gap-5 pb-20 border-t pt-20">

        <div className="flex items-center gap-2 cursor-pointer">
            <img src={logo} alt="logo" className="w-8 h-8" />
            <span className="font-bold text-lg">Booky</span>

        </div>

        <div>
            <p>Discover inspiring stories & timeless knowledge, ready to borrow anytime. Explore online or visit our nearest library branch.</p>
        </div>

        <div>
            <p>Follow on Social Media</p>
        </div>

        <div>

            <img src={socialMediaIcons} alt="social media icons" className="h-auto" />
        </div>

        
    </div>
  )
}

export default Footer