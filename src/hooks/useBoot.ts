import { createContext, useContext } from 'react';

/** True once the preloader has finished and the page may play its intro. */
export const BootContext = createContext(false);

export const useBooted = () => useContext(BootContext);
