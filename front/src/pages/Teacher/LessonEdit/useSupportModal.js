import { useState } from 'react';

export const useSupportModal = () => {
  const [open, setOpen] = useState(false);

  const openSupportModal = () => {
    setOpen(true);
  };

  return { open, setOpen, openSupportModal };
};
