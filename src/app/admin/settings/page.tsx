export default function AdminSettingsPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-8">Settings</h1>

      <div className="bg-white rounded-xl p-6 shadow-sm space-y-6">
        <div>
          <h2 className="font-bold mb-4">Delivery Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Delivery Fee
              </label>
              <input
                type="number"
                defaultValue={150}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Free Shipping Minimum (Rs.)
              </label>
              <input
                type="number"
                defaultValue={2000}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Estimated Delivery Days
              </label>
              <input
                type="text"
                defaultValue="3-5 business days"
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <h2 className="font-bold mb-4">COD Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Minimum COD Order (Rs.)
              </label>
              <input
                type="number"
                defaultValue={0}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Maximum COD Order (Rs.)
              </label>
              <input
                type="number"
                defaultValue={50000}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
          </div>
        </div>

        <button className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800">
          Save Settings
        </button>
      </div>
    </div>
  );
}
