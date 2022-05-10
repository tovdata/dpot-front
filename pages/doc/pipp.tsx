import { useState } from 'react';
// Component
import { CreateDocumentForm, PIPPTable } from '../../components/PIPP';

/** [Interface] Document info */
interface DocumentInfo {
  name: string;
  uuid: string;
}

const Page = () => {
  // Set a default state
  const defaultDoc: DocumentInfo = { name: '', uuid: '' };
  // Set a state
  const [doc, setDoc] = useState<DocumentInfo>(defaultDoc);

  // Create a event handler (onSelectDoc / contain a create)
  const onSelectDoc = (value: DocumentInfo) => setDoc(value);
  // Create a event handler (onBack)
  const onBack = () => setDoc(defaultDoc);

  return (
    <>
      {doc.uuid === '' ? (
        <PIPPTable onSelect={onSelectDoc} />
      ) : (
        <CreateDocumentForm onBack={onBack} />
      )}
    </>
  );
}

export default Page;