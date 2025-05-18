import { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchModalStore } from '../../store/useSearchModalStore';


const SearchModal = () => {
  const [inputValue, setInputValue] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const { closeSearch, setSearchParams, isOpen } = useSearchModalStore()
  
  const handleClose = useCallback(() => {
    setInputValue('');
    closeSearch();
  }, [closeSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams(inputValue.trim());
    handleClose();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (formRef.current && !formRef.current.contains(e.target as Node)) {
      handleClose();
    }
  };
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleClose]);

   if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-10 px-2"
      onClick={handleOverlayClick}
    >
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow p-4 w-full max-w-md"
      >
        <input
          type="text"
          autoFocus
          placeholder="Search..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </form>
    </div>
  );
};

export default SearchModal;
