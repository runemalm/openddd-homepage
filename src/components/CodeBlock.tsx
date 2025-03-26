
import React, { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css'; // Dark theme
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-markup'; // HTML
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
  className?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'csharp',
  title,
  showLineNumbers = true,
  className,
}) => {
  const [copied, setCopied] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState('');

  useEffect(() => {
    // Initialize Prism
    if (typeof window !== 'undefined') {
      Prism.highlightAll();
    }
  }, []);

  useEffect(() => {
    // Map the language prop to Prism's language format
    const languageMap: Record<string, string> = {
      csharp: 'csharp',
      cs: 'csharp',
      js: 'javascript',
      ts: 'typescript',
      typescript: 'typescript',
      javascript: 'javascript',
      html: 'markup',
      css: 'css',
      json: 'json',
    };

    const prismLanguage = languageMap[language.toLowerCase()] || 'csharp';
    
    // Highlight the code
    if (code && Prism.languages[prismLanguage]) {
      const highlighted = Prism.highlight(
        code,
        Prism.languages[prismLanguage],
        prismLanguage
      );
      setHighlightedCode(highlighted);
    } else {
      setHighlightedCode(code);
    }
  }, [code, language]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Split the code into lines for line numbers
  const codeLines = code.split('\n');

  return (
    <div className={cn("rounded-lg overflow-hidden border border-border bg-[#2d2d2d] text-white my-4", className)}>
      {title && (
        <div className="flex items-center justify-between px-4 py-2 bg-[#1d1d1d] border-b border-border">
          <span className="text-sm font-medium text-white/90">{title}</span>
          <button
            onClick={copyToClipboard}
            className="p-1.5 rounded-md hover:bg-white/10 transition-colors"
            aria-label="Copy code"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-400" />
            ) : (
              <Copy className="h-4 w-4 text-white/80" />
            )}
          </button>
        </div>
      )}
      <div className="relative overflow-x-auto">
        {showLineNumbers ? (
          <div className="flex">
            <div className="select-none pr-4 text-foreground/40 text-right py-4 pl-4">
              {codeLines.map((_, index) => (
                <div key={index}>{index + 1}</div>
              ))}
            </div>
            <pre className="p-4 pt-4 pb-4 pl-0 text-sm font-mono overflow-x-auto flex-1">
              <code
                className={`language-${language}`}
                dangerouslySetInnerHTML={{ __html: highlightedCode }}
              />
            </pre>
          </div>
        ) : (
          <pre className="p-4 text-sm font-mono overflow-x-auto">
            <code
              className={`language-${language}`}
              dangerouslySetInnerHTML={{ __html: highlightedCode }}
            />
          </pre>
        )}
      </div>
    </div>
  );
};

export default CodeBlock;
