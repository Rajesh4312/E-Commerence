export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between text-sm">
        <p>© {new Date().getFullYear()} RadiShop</p>
        <p className="text-gray-500">Built with Next.js + Tailwind</p>
      </div>
    </footer>
  );
}
