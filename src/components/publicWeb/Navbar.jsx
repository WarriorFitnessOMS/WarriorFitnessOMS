import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { assets } from '../../assets/assets';
import { useNavigate, useLocation } from 'react-router-dom';


const Navbar = () => {

  const navigate = useNavigate()
  const location = useLocation();
  
  const isHome = location.pathname === '/';

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTopBarHidden, setIsTopBarHidden] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setisScrolled] = useState(false);


  const handleNavClick = (sectionId) => {
    if (!sectionId) return;

    if (isHome) {
      document.getElementById(sectionId)?.scrollIntoView({ behavior : 'smooth'})

    } else {
      navigate('/');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior : 'smooth'})
      }, 150)
    }

    setIsMobileMenuOpen(false);
  }


  useEffect(() => {
    const handleScroll = () => {
      const scrolledY = window.scrollY > 50;
      setisScrolled(scrolledY);

      setIsTopBarHidden(window.scrollY > 100);

      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / scrollHeight) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'HOME', sectionId: 'home' },
    { label: 'ABOUT', sectionId: 'about' },
    { label: 'SUCCESS STORIES', sectionId: 'stories' },
    { label: 'ACHIEVEMENTS', sectionId: 'achievements' },
    { label: 'FAQ', sectionId: 'faq' },
    { label: 'CALCULATORS', sectionId: 'calculators' },
  ];

  return (
    <>
      <style>{`
        @keyframes textGlow {
          0%, 100% { text-shadow: 0 0 10px rgba(251,146,60,0.6),0 0 20px rgba(251,146,60,0.4); }
          50% { text-shadow: 0 0 20px rgba(251,146,60,0.9),0 0 30px rgba(251,146,60,0.6); }
        }
        @keyframes buttonGlow {
          0%,100% { box-shadow: 0 0 10px rgba(251,146,60,0.6),0 0 20px rgba(251,146,60,0.4); }
          50% { box-shadow:0 0 20px rgba(251,146,60,0.9),0 0 30px rgba(251,146,60,0.6); }
        }
        .nav-link-glow:hover { color:#ffffff; animation:textGlow 1.5s ease-in-out infinite; }
        .register-btn-glow:hover { animation:buttonGlow 1.5s ease-in-out infinite; }
      `}</style>

      {/* TOPBAR */}
      <div className={`bg-orange-500 text-white text-center py-2 text-xs md:text-sm transition-all duration-300 ${isTopBarHidden ? '-translate-y-full' : 'translate-y-0'}`}>
        <p>🔥 Limited Time Offer: Join Now and Get 20% Off Your First Month!</p>
      </div>

      {/* NAVBAR */}
      <nav className={`fixed z-50 w-full border-orange-500/20 transition-all duration-300 ${isTopBarHidden ? 'top-0' : 'top-10'} ${isScrolled ? 'backdrop-blur-md' : ''}`}>
        <div className="mx-auto px-6 md:px-16 lg:px-24 xl:px-48 py-3">
          <div className="flex items-center justify-between">

            {/* LOGO */}
            <button 
              className="flex items-center gap-2 shrink-0 w-12 md:w-16 rounded-lg cursor-pointer"
              onClick={() => navigate('/')}
            >     
              <img
                src={assets.logo} 
                alt="Warrior Fitness Logo" 
                className="w-full h-auto"
              />
              <span className="text-white font-bold text-base md:text-3xl flex flex-col">
                <h2 className='text-red-500'>WARRIOR</h2>
                <h2 className='text-white -mt-1'>FITNESS</h2>
              </span>
            </button>

            {/* DESKTOP NAV */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.sectionId)}
                  className="nav-link-glow text-sm font-medium text-gray-300 transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* BUTTONS - LOGIN/REGISTER */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => navigate('/login')}
                className="px-5 py-2 rounded-lg bg-red-600 text-white font-bold cursor-pointer hover:bg-red-500 transition-all"
              >
                LOGIN
              </button>
            </div>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-orange-500 p-2"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* SCROLL PROGRESS */}
          <div className="absolute bottom-0 left-0 h-1 bg-orange-500 transition-all duration-300" style={{ width: `${scrollProgress}%` }}></div>
        </div>

        {/* MOBILE MENU */}
        {isMobileMenuOpen && (
          <div className="md:hidden h-screen bg-black/50 border-t border-orange-500/20 p-4 backdrop-blur-md">
            <div className="space-y-2 mb-4">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.sectionId)}
                  className="nav-link-glow block text-sm font-medium py-3 px-3 rounded-lg text-gray-300 hover:bg-orange-500/10 transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-2 pt-4 border-t border-orange-500/20">
              <button
                onClick={() => { navigate('/login'); setIsMobileMenuOpen(false); }}
                className="w-full px-5 py-3 rounded-lg bg-red-600 text-white font-bold hover:bg-red-500 transition-all text-sm"
              >
                LOGIN
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
