import { PartyPopper } from 'lucide-react';

export default function EventsList() {
  return (
    <div className="bg-white shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Events</h2>
          <PartyPopper className="h-6 w-6 text-blue-500" />
        </div>
        <ul className="space-y-3">
          {["Impetus and Concepts (InC)", "Addiction", "Xenia"].map((event, index) => (
            <li key={index} className="flex items-center text-blue-600 bg-blue-50 p-2 rounded-lg">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              {event}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}