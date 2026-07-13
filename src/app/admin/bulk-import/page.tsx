"use client";

import { useState } from "react";

export default function BulkImportPage() {
  const [file, setFile] = useState<File | null>(null);
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState<any>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;

    setImporting(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/bulk-import", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setResult(data);
    } catch {
      setResult({ error: "Import failed" });
    } finally {
      setImporting(false);
    }
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Bulk Import Products</h1>
      <p className="text-gray-500 mb-8">
        Upload a CSV file with columns: name, price, description, category, sizes, colors, stock
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          accept=".csv"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full"
        />
        <button
          type="submit"
          disabled={!file || importing}
          className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-400"
        >
          {importing ? "Importing..." : "Import"}
        </button>
      </form>

      {result && (
        <div className="mt-8 p-6 bg-white rounded-xl shadow-sm">
          <h2 className="font-bold mb-2">Import Result</h2>
          {result.error ? (
            <p className="text-red-500">{result.error}</p>
          ) : (
            <>
              <p>Imported: {result.imported} products</p>
              {result.errors?.length > 0 && (
                <div className="mt-2">
                  <p className="text-red-500">Errors:</p>
                  <ul className="list-disc list-inside text-sm text-red-500">
                    {result.errors.map((err: string, i: number) => (
                      <li key={i}>{err}</li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
