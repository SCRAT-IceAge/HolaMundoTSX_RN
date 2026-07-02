import { createContext, useContext, useState, ReactNode } from 'react';

type CodigoContextType = {
  codigo: string;
  setCodigo: (c: string) => void;
};

const CodigoContext = createContext<CodigoContextType | null>(null);

export function CodigoProvider({ children }: { children: ReactNode }) {
  const [codigo, setCodigo] = useState('');
  return (
    <CodigoContext.Provider value={{ codigo, setCodigo }}>
      {children}
    </CodigoContext.Provider>
  );
}

export function useCodigo() {
  const ctx = useContext(CodigoContext);
  if (!ctx) throw new Error('useCodigo debe usarse dentro de CodigoProvider');
  return ctx;
}