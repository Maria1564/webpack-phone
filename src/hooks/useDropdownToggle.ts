import { useEffect, useState } from 'react';

export const useDropdownToggle = (
  ref: React.RefObject<HTMLDivElement | null>
): { isOpen: boolean; openModal: () => void; closeModal: () => void } => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = ref.current;

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (dropdownRef && !dropdownRef.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    window.addEventListener('click', handleClick);

    return () => window.removeEventListener('click', handleClick);
  }, [dropdownRef]);

  const openModal = () => setIsOpen(true);

  const closeModal = () => setIsOpen(false);

  return { isOpen, openModal, closeModal };
};
