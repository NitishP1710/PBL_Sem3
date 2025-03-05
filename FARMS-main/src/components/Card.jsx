export default function Card({ icon, title, description }) {
    return (
      <div className="bg-white shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
        <div className="p-6 text-center">
          <div className="flex items-center justify-center mb-4">
            {icon}
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    );
  }