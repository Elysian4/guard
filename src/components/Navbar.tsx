import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Shield } from 'lucide-react';
import { cn } from '../lib/utils';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Live Map', href: '/live-map' },
  { name: 'Tracking History', href: '/tracking' },
  { name: 'Safety Alerts', href: '/alerts' },
  { name: 'Device Pairing', href: '/devices' },
  { name: 'Help & Support', href: '/help' },
  { name: 'Privacy & Security', href: '/privacy' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
      isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
    )}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <NavLink to="/" className="-m-1.5 p-1.5 flex items-center gap-2">
            <Shield className="h-8 w-8 text-indigo-600" />
            <span className="font-semibold text-xl">AI Safety</span>
          </NavLink>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) => cn(
                'text-sm font-semibold leading-6',
                isActive ? 'text-indigo-600' : 'text-gray-900 hover:text-indigo-600'
              )}
            >
              {item.name}
            </NavLink>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <NavLink
            to="/logout"
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600"
          >
            Logout
          </NavLink>
        </div>
      </nav>
      
      {/* Mobile menu */}
      <div className={cn(
        'lg:hidden',
        mobileMenuOpen ? 'fixed inset-0 z-50' : 'hidden'
      )}>
        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <NavLink to="/" className="-m-1.5 p-1.5 flex items-center gap-2">
              <Shield className="h-8 w-8 text-indigo-600" />
              <span className="font-semibold text-xl">AI Safety</span>
            </NavLink>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) => cn(
                      '-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7',
                      isActive ? 'bg-gray-50 text-indigo-600' : 'text-gray-900 hover:bg-gray-50'
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
              <div className="py-6">
                <NavLink
                  to="/logout"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Logout
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}