import React from 'react';
import { useParams } from '@tanstack/react-router';
import PublicationForm from '@/components/CMS/Admin/PublicationForm';

const PublicationFormPage: React.FC = () => {
  const { publicationId } = useParams({ from: '/admin/publications/$publicationId' });

  // If publicationId is 'new', treat it as creating a new publication
  const actualPublicationId = publicationId === 'new' ? undefined : publicationId;

  return <PublicationForm publicationId={actualPublicationId} />;
};

export default PublicationFormPage;
