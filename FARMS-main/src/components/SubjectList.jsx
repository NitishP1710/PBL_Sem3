import { BookOpen } from 'lucide-react';

export default function SubjectList() {
  return (
    <div className="bg-white shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Subject List</h2>
          <BookOpen className="h-6 w-6 text-blue-500" />
        </div>
        <ul className="space-y-2">
          {[
            "MicroProcessor",
            "Software Engineering",
            "Principles of Programming Languages",
            "Data Structures And Algorithms",
            "Engineering Mathematics-3",
            "Project Based Learning",
            "Microprocessor Lab",
            "Maths Tutorial",
            "Code Of Conduct",
            "DSA Lab",
          ].map((subject, index) => (
            <li key={index} className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              {subject}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}