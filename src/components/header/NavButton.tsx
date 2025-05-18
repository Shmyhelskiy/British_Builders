import React from 'react';
import Vector from '../../assets/Vector.svg';
import clsx from 'clsx';

interface NavButtonProps {
  id: number;
  icon: string;
  label: string;
  activeId: number | null;
  setActiveId: (id: number | null) => void;
}

const NavButton: React.FC<NavButtonProps> = ({ id, icon, label,  activeId, setActiveId}) => {
  return (
    <button 
      className={clsx('flex flex-col items-center gap-3 rounded-sm px-2 py-1 cursor-pointer',  
      id === activeId ? 'bg-[#B5B8FF]' : '')}
      onClick={() => {setActiveId(id)}}
    >
      <img src={icon} alt={label} width={24} height={24} />
      <div className='flex items-center gap-1 text-sm'>
        <span className='hidden sm:block'>{label}</span>
        <img src={Vector} alt='Vector' width={12} height={24} />
      </div>
    </button>
  );
};

export default NavButton;