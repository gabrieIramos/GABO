import { Link } from 'react-router-dom';

interface PagePlaceholderProps {
  title: string;
  description: string;
}

export function PagePlaceholder({ title, description }: PagePlaceholderProps) {
  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-12 py-16 text-center">
      <h1 className="text-4xl tracking-tight mb-4">{title}</h1>
      <p className="text-xl text-gray-600 mb-8">{description}</p>
      <Link to="/" className="underline hover:no-underline">
        Voltar para Home
      </Link>
    </div>
  );
}
