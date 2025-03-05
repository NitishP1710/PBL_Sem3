import { AlertTriangle } from 'lucide-react';

export default function BacklogSubjects() {
  return (
    <div className="bg-white shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Backlog Subjects</h2>
          <AlertTriangle className="h-6 w-6 text-red-500" />
        </div>
        <ul className="space-y-3">
          {["Fundamentals of Data Structures", "Computer Graphics"].map((subject, index) => (
            <li key={index} className="flex items-center text-red-600 bg-red-50 p-2 rounded-lg">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
              {subject}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}