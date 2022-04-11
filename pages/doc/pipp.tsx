import { useState } from 'react';
// Component
import { PersonalInfoProcessingPolicy } from '../../components/PIPPTable';
import { CreateForm } from '../../components/CreatePIPP';

const Page = () => {
  // Set a state
  const [create, setCreate] = useState<boolean>(false);
  const [doc, setDoc] = useState<any>({});

  return (
    <CreateForm />
  )
}

export default Page;