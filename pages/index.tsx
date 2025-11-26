import SearchAlgolia from '../components/SearchAlgolia';
import MapWithSearch from '../components/MapWithSearch';

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="grid gap-6 md:grid-cols-[3fr,2fr] items-start">
        <div className="space-y-4">
          <span className="inline-flex items-center rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
            BETA · Honest data on legal cannabis
          </span>

          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
            The <span className="text-emerald-400">Carfax for cannabis</span>
            <br />
            retailers & batches.
          </h1>

          <p className="text-slate-300 text-sm md:text-base max-w-xl">
            CartFax aggregates third-party lab results, batch metadata, and
            retailer info so you can verify what&apos;s in your cart before you
            check out.
          </p>

          <ul className="text-xs md:text-sm text-slate-400 space-y-1">
            <li>• Dispensary directory (legal U.S. markets only)</li>
            <li>• Batch-level potency & contaminant summaries</li>
            <li>• Independent lab PDFs attached — not just marketing claims</li>
          </ul>

          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 mt-4">
            <h2 className="text-sm font-semibold mb-2 text-slate-100">
              Search retailers & batches
            </h2>
            <SearchAlgolia />
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
          <h2 className="text-sm font-semibold text-slate-100 mb-2">
            Map view (prototype)
          </h2>
          <MapWithSearch />
          <p className="mt-2 text-[11px] text-slate-500">
            Geolocation + Algolia aroundLatLng coming online as data is added.
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3 text-xs md:text-sm">
        <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
          <div className="text-emerald-400 font-semibold mb-1 text-xs">
            FOR PATIENTS & ADULT-USE
          </div>
          <div className="font-medium mb-1">Trust, not hype.</div>
          <p className="text-slate-400">
            See where a retailer sources its products, how often batches are
            tested, and whether lab results are independent and recent.
          </p>
        </div>
        <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
          <div className="text-emerald-400 font-semibold mb-1 text-xs">
            FOR OPERATORS
          </div>
          <div className="font-medium mb-1">Verified batch history.</div>
          <p className="text-slate-400">
            Attach lab PDFs, batch IDs, and product lines so customers and
            regulators see a clean, verifiable trail.
          </p>
        </div>
        <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
          <div className="text-emerald-400 font-semibold mb-1 text-xs">
            FOR ANALYSTS
          </div>
          <div className="font-medium mb-1">A better data layer.</div>
          <p className="text-slate-400">
            Normalize batch and retailer metadata across markets to compare
            categories, brands, and lab results over time.
          </p>
        </div>
      </section>
    </div>
  );
}
