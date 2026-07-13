export default function SizeGuidePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Size Guide</h1>

      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Men&apos;s Shoes</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">UK</th>
                  <th className="border p-2 text-left">US</th>
                  <th className="border p-2 text-left">EU</th>
                  <th className="border p-2 text-left">CM</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { uk: "6", us: "7", eu: "39", cm: "24.5" },
                  { uk: "7", us: "8", eu: "40", cm: "25.5" },
                  { uk: "8", us: "9", eu: "42", cm: "26.5" },
                  { uk: "9", us: "10", eu: "43", cm: "27.5" },
                  { uk: "10", us: "11", eu: "44", cm: "28.5" },
                  { uk: "11", us: "12", eu: "45", cm: "29.5" },
                  { uk: "12", us: "13", eu: "46", cm: "30.5" },
                ].map((row) => (
                  <tr key={row.uk} className="border">
                    <td className="p-2">{row.uk}</td>
                    <td className="p-2">{row.us}</td>
                    <td className="p-2">{row.eu}</td>
                    <td className="p-2">{row.cm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Women&apos;s Shoes</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">UK</th>
                  <th className="border p-2 text-left">US</th>
                  <th className="border p-2 text-left">EU</th>
                  <th className="border p-2 text-left">CM</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { uk: "3", us: "5", eu: "36", cm: "22.5" },
                  { uk: "4", us: "6", eu: "37", cm: "23.5" },
                  { uk: "5", us: "7", eu: "38", cm: "24.5" },
                  { uk: "6", us: "8", eu: "39", cm: "25.5" },
                  { uk: "7", us: "9", eu: "40", cm: "26.5" },
                  { uk: "8", us: "10", eu: "41", cm: "27.5" },
                ].map((row) => (
                  <tr key={row.uk} className="border">
                    <td className="p-2">{row.uk}</td>
                    <td className="p-2">{row.us}</td>
                    <td className="p-2">{row.eu}</td>
                    <td className="p-2">{row.cm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="p-6 bg-gray-50 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">How to Measure</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-600">
            <li>Place your foot on a piece of paper</li>
            <li>Mark the longest point of your foot (heel to toe)</li>
            <li>Measure the distance in centimeters</li>
            <li>Use the chart above to find your size</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
