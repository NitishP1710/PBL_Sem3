export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-6 mt-8">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Database Attack Prevention System
        </p>
        <p className="text-xs mt-2">
          PBL Project
        </p>
      </div>
    </footer>
  );
}