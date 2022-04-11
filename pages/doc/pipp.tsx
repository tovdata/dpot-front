import { useState } from 'react';
// Component
import { PIPPTable } from '../../components/PIPP';

const Page = () => {
  // Set a state
  const [create, setCreate] = useState<boolean>(false);
  const [doc, setDoc] = useState<any>({});

  return (
    <PIPPTable />
  )
}

export default Page;