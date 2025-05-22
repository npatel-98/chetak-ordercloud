import { useEffect, useState } from 'react';

interface Props {
  children: React.ReactNode;
}

const ClientOnly: React.FC<Props> = ({ children, ...delegated }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <div {...delegated} className=''>{children}</div>;
};
export default ClientOnly;
