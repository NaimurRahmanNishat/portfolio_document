// src/components/shared/Header.tsx
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../public/logo.png';
import NavItems from './NavItems';
import Resume from './Resume';
import MobileMenu from './MobileMenu';

const Header = () => {
  return (
<header className="h-20 border-b md:border-0 flex items-center justify-between w-full bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="max-w-7xl container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Image
                  src={logo}
                  alt="logo_image"
                  width={40}
                  height={40}
                  priority
                  className="w-10 h-10"
                />
              </Link>
            </div>
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-center flex-1">
              <NavItems />
            </div>
            {/* Desktop Actions (Theme + Resume) */}
            <div className="hidden md:flex items-center gap-4">
              <Resume />
            </div>
            {/* Mobile Actions (Theme + Resume + Menu) */}
            <div className="flex md:hidden items-center gap-2">
              <Resume />
              <MobileMenu />
            </div>
          </div>
        </div>
      </header>
  )
}

export default Header;
