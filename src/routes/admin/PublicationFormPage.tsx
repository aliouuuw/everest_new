import React from 'react';
import { useParams } from '@tanstack/react-router';
import PublicationForm from '@/components/CMS/Admin/PublicationForm';

const PublicationFormPage: React.FC = () => {
  const { id } = useParams({ from: '/admin/publications/$id/edit' });

  // If id is 'new', treat it as creating a new publication
  const actualPublicationId = id === 'new' ? undefined : id;

  return <PublicationForm publicationId={actualPublicationId} />;
};

export default PublicationFormPage;
