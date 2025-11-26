import { useSession } from 'next-auth/react';

export default function AdminLicenses() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="p-6">
        <p className="text-sm text-slate-300">
          Sign in as an admin to manage licenses.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-4">
      <h1 className="text-2xl font-semibold mb-1">State licenses</h1>
      <p className="text-sm text-slate-400 mb-4">
        This section will aggregate state license datasets and let you link
        them to brands, locations, and labs.
      </p>

      <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 text-sm text-slate-300">
        <p>
          <span className="font-semibold">Coming soon:</span> CSV imports,
          state-specific schemas, and license linkage to CartFax entities.
        </p>
      </div>
    </div>
  );
}
