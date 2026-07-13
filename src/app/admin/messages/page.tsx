import prisma from "@/lib/prisma";

export default async function AdminMessagesPage() {
  const messages = await prisma.contact.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Messages</h1>

      <div className="space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="font-medium">{msg.name}</p>
                <p className="text-sm text-gray-500">{msg.email}</p>
              </div>
              <p className="text-xs text-gray-400">
                {new Date(msg.createdAt).toLocaleString("en-PK")}
              </p>
            </div>
            {msg.phone && <p className="text-sm text-gray-500 mb-2">Phone: {msg.phone}</p>}
            <p className="text-gray-700">{msg.message}</p>
          </div>
        ))}
        {messages.length === 0 && (
          <p className="text-gray-500 text-center py-12">No messages yet.</p>
        )}
      </div>
    </div>
  );
}
