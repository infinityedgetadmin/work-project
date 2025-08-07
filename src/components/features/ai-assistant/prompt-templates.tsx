import { useState } from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

interface Template {
  icon: React.ElementType;
  title: string;
  prompt: string;
  category: string;
}

interface PromptTemplatesProps {
  templates: Template[];
  onSelectTemplate: (prompt: string) => void;
}

export function PromptTemplates({ templates, onSelectTemplate }: PromptTemplatesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredTemplate, setHoveredTemplate] = useState<number | null>(null);

  const categories = [...new Set(templates.map(t => t.category))];
  const filteredTemplates = selectedCategory 
    ? templates.filter(t => t.category === selectedCategory)
    : templates;

  return (
    <div className="py-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          What can I help you with today?
        </h2>
        <p className="text-gray-600">
          Choose from common tasks or type your own question below
        </p>
      </div>

      {/* Category Filters */}
      <div className="flex items-center justify-center space-x-2 mb-6">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            !selectedCategory
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Templates
        </button>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {filteredTemplates.map((template, index) => {
          const Icon = template.icon;
          return (
            <button
              key={index}
              onClick={() => onSelectTemplate(template.prompt)}
              onMouseEnter={() => setHoveredTemplate(index)}
              onMouseLeave={() => setHoveredTemplate(null)}
              className={`group relative p-4 bg-white border rounded-lg text-left transition-all ${
                hoveredTemplate === index
                  ? 'border-blue-500 shadow-lg scale-105'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg transition-colors ${
                  hoveredTemplate === index
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                }`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {template.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {template.prompt}
                  </p>
                  <span className="inline-flex items-center mt-2 text-xs text-blue-600 font-medium">
                    Use this template
                    <ChevronRightIcon className="h-3 w-3 ml-1" />
                  </span>
                </div>
              </div>
              
              {/* Category Badge */}
              <div className="absolute top-2 right-2">
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  {template.category}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Quick Tips */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg max-w-2xl mx-auto">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">
          💡 Pro Tips
        </h3>
        <ul className="space-y-1 text-sm text-blue-800">
          <li>• Be specific about your requirements for better results</li>
          <li>• You can reference epics, tickets, or meetings for context</li>
          <li>• Ask follow-up questions to refine the responses</li>
          <li>• Use &quot;regenerate&quot; if you need a different approach</li>
        </ul>
      </div>
    </div>
  );
}