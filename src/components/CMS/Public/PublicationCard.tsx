import React from 'react';
import { Link } from '@tanstack/react-router';

interface PublicationCardProps {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt?: number;
  featured?: boolean;
  readingTime?: number;
}

const PublicationCard: React.FC<PublicationCardProps> = ({
  id,
  title,
  excerpt,
  category,
  publishedAt,
  featured = false,
  readingTime,
}) => {
  const formatDate = (timestamp?: number) => {
    if (!timestamp) return '';
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'revues-hebdo': 'bg-blue-100 text-blue-800',
      'revues-mensuelles': 'bg-green-100 text-green-800',
      'teaser-dividende': 'bg-yellow-100 text-yellow-800',
      'marches': 'bg-purple-100 text-purple-800',
      'analyses': 'bg-red-100 text-red-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <article className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${featured ? 'ring-2 ring-blue-500' : ''}`}>
      {/* Featured Badge */}
      {featured && (
        <div className="bg-blue-500 text-white text-xs font-semibold px-3 py-1">
          Featured
        </div>
      )}

      <div className="p-6">
        {/* Category */}
        <div className="mb-3">
          <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(category)}`}>
            {category.replace('-', ' ').toUpperCase()}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          <Link
            to={`/publications/${id}`}
            className="hover:text-blue-600 transition-colors"
          >
            {title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 mb-4 line-clamp-3">
          {excerpt}
        </p>

        {/* Meta Information */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            {publishedAt && (
              <span>{formatDate(publishedAt)}</span>
            )}
            {readingTime && (
              <span>{readingTime} min read</span>
            )}
          </div>
          <Link
            to={`/publications/${id}`}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Read More →
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PublicationCard;
