import { useState } from "react";
import logo from "../../assets/Logo.svg";
import message from "../../assets/message.svg";
import notification from "../../assets/notification.svg";
import partner from "../../assets/partner.svg";
import settings from "../../assets/settings.svg";
import UserPhoto from "../../assets/UserPhoto.svg";
import { navButtons } from "../../data/navButtons.ts";
import NavButton from "./NavButton.tsx";
import { Menu, X } from "lucide-react";
import clsx from "clsx";


const Header = () => {
  const userName  = 'Kate';
  const [activeId, setActiveId] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header>
      <div className="flex justify-between my-4">
        <section className="flex items-center gap-8">
          <img src={logo} alt="Company Logo" width={32} height={32}/>
          <h1 className="text-xl font-bold">Hi {userName}!</h1>
        </section>


      <button
        className='sm:hidden'
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

        <nav 
          aria-label="User navigation"
          className={clsx('items-center gap-4 absolute right-12 top-16 flex-col sm:static sm:flex sm:flex-row', isOpen? 'flex' : 'hidden')}
        >
          <img src={message} alt="Messages" width={24} height={24}/>
          <img src={notification} alt="Notifications" width={24} height={24}/>
          <img src={partner} alt="Partners" width={24} height={24}/>
          <img src={settings} alt="Settings" width={24} height={24}/>
          <img src={UserPhoto} alt="User Profile" width={32} height={32}/>
        </nav>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 py-3 gap-y-4">
        {navButtons.map((button) => {
          return <NavButton 
            key={button.id} 
            id={button.id} 
            icon={button.icon} 
            label={button.label} 
            setActiveId={setActiveId} 
            activeId={activeId}/>
        })}
      </div>
    </header>
  )
}

export default Header