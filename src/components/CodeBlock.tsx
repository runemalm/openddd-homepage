
import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Split the code into lines for line numbers
  const codeLines = code.split('\n');

  return (
    <div className={cn("rounded-lg overflow-hidden border border-border bg-black text-white my-4", className)}>
      {title && (
        <div className="flex items-center justify-between px-4 py-2 bg-foreground/5 border-b border-border">
          <span className="text-sm font-medium text-foreground/80">{title}</span>
          <button
            onClick={copyToClipboard}
            className="p-1.5 rounded-md hover:bg-foreground/10 transition-colors"
            aria-label="Copy code"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4 text-foreground/70" />
            )}
          </button>
        </div>
      )}
      <div className="relative overflow-x-auto">
        <pre className="p-4 text-sm font-mono overflow-x-auto">
          {showLineNumbers ? (
            <div className="flex">
              <div className="select-none pr-4 text-foreground/40 text-right">
                {codeLines.map((_, index) => (
                  <div key={index}>{index + 1}</div>
                ))}
              </div>
              <code className="flex-1">
                {codeLines.map((line, index) => (
                  <div key={index}>{line || ' '}</div>
                ))}
              </code>
            </div>
          ) : (
            <code>{code}</code>
          )}
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;
