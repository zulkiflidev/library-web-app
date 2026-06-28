import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const userTabs = [
  { label: 'Profile', href: '/profile' },
  { label: 'Borrowed List', href: '/loans' },
  { label: 'Reviews', href: '/reviews' },
]

const adminTabs = [
  { label: 'Users', href: '/admin/users' },
  { label: 'Books', href: '/admin/books' },
  { label: 'Borrowed List', href: '/admin/loans' },
]

interface ProfileTabsProps {
  variant?: 'user' | 'admin'
}

function ProfileTabs({ variant = 'user' }: ProfileTabsProps) {
  const navigate = useNavigate()
  const location = useLocation()

  const tabs = variant === 'admin' ? adminTabs : userTabs

  return (

    <div className="flex flex-row justify-start w-1/2 bg-[#F5F5F5] gap-10 rounded-full">
      
      {
        tabs.map((tab:{ label: string, href: string }) => (

            <div key={tab.href} className="p-3 w-1/3 text-center">
            
            <Button
                onClick={
                    () => navigate(tab.href)
                }            
                variant={location.pathname === tab.href ? 'default' : 'ghost'}
                className={
                    location.pathname === tab.href ? 'bg-white text-black font-bold w-full' : 'w-full'
                }
            >
                {tab.label}
            </Button>
            </div>
        ))
      }

    </div>


  )
}

export default ProfileTabs