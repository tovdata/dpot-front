import { useState } from 'react';
// Component
import { CreateDocumentForm, PIPPTable } from '../../components/PIPP';

/** [Interface] Document info */
interface DocumentInfo {
  uuid: string;
  status: string;
}

const Page = () => {
  // Set a default state
  const defaultDoc: DocumentInfo = { uuid: '', status: '' };
  // Set a state
  const [doc, setDoc] = useState<DocumentInfo>(defaultDoc);

  // Create a event handler (onSelectDoc / contain a create)
  const onCreate = (value: DocumentInfo) => setDoc(value);
  // Create a event handler (onBack)
  const onBack = () => setDoc({ uuid: '', status: '' });

  return (
    <>
      {doc.uuid === '' ? (
        <PIPPTable onCreate={onCreate} />
      ) : (
        <CreateDocumentForm onBack={onBack} />
      )}
    </>
  );
}

export default Page;