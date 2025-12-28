import { readFileSync } from 'fs';
import { join } from 'path';
import GuestbookForm from './GuestbookForm';
import PageHeader from '../components/PageHeader';

interface GuestbookEntry {
  id: number;
  name: string;
  message: string;
  date: string;
  website?: string;
}

export default function Guestbook() {
  const filePath = join(process.cwd(), 'public', 'guestbook-entries.json');
  const fileContents = readFileSync(filePath, 'utf8');
  const entries: GuestbookEntry[] = JSON.parse(fileContents);

  return (
    <div className="h-screen w-screen bg-white dark:bg-slate-900 overflow-hidden flex flex-col">
      <PageHeader
        title="Guestbook"
        description="Leave a message and let me know you stopped by!"
      />

      <div className="flex-1 overflow-y-auto px-8 py-6">
        <GuestbookForm />

        {/* Entries List */}
        <div className="space-y-4">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="bg-slate-50 dark:bg-slate-800 rounded-lg p-5 border border-slate-200 dark:border-slate-700"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                  {entry.website ? (
                    <a
                      href={entry.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {entry.name}
                    </a>
                  ) : (
                    entry.name
                  )}
                </h3>
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  {new Date(entry.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {entry.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
