import { AuthProvider } from './Components/AuthContext';
import './globals.css';
import HeaderNav from './Components/HeaderNav';


export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <body className="relative min-h-screen bg-gray-100">
      <AuthProvider>
      <header>
          <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
          <a href="/" className="flex items-center space-x-3">
            <img src="scheduler-svgrepo-com.svg" className="h-8" alt="Logo" />
            <span className="text-2xl font-semibold dark:text-white">TaskMate</span>
          </a>           
            <HeaderNav />
          </div>
        </header>

        <main className="pt-20 pb-24 px-4">
          {children}
        </main>

        <footer className="fixed bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow-sm md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023 <a href="https://flowbite.com/" className="hover:underline">Flowbite™</a>. All Rights Reserved.
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li><a href="#" className="hover:underline me-4 md:me-6">About</a></li>
            <li><a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline me-4 md:me-6">Licensing</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
          </ul>
        </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
