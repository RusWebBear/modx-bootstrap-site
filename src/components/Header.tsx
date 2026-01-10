import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Header = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => navigate('/')}
          >
            <Icon name="Home" size={32} className="text-primary" />
            <h1 className="text-2xl font-bold bg-clip-text text-transparent gradient-primary">
              Дома и Бани
            </h1>
          </div>
          <nav className="hidden md:flex gap-6 items-center">
            <button 
              onClick={() => navigate('/')} 
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Главная
            </button>
            <button 
              onClick={() => { window.location.href = '/#projects'; }} 
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Проекты
            </button>
            <Button variant="ghost" size="sm" onClick={() => navigate('/blog')} className="text-sm font-medium">
              Блог
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate('/promotions')} className="text-sm font-medium">
              Акции
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate('/reviews')} className="text-sm font-medium">
              Отзывы
            </Button>
            <Button className="gradient-primary hover-scale ml-2">
              <Icon name="Phone" size={16} className="mr-2" />
              Заказать звонок
            </Button>
          </nav>
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={24} />
          </Button>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-2 animate-fade-in">
            <button 
              onClick={() => { navigate('/'); setMobileMenuOpen(false); }}
              className="w-full text-left px-4 py-2 text-sm font-medium hover:bg-muted rounded-lg transition-colors"
            >
              Главная
            </button>
            <button 
              onClick={() => { window.location.href = '/#projects'; setMobileMenuOpen(false); }}
              className="w-full text-left px-4 py-2 text-sm font-medium hover:bg-muted rounded-lg transition-colors"
            >
              Проекты
            </button>
            <button 
              onClick={() => { navigate('/blog'); setMobileMenuOpen(false); }}
              className="w-full text-left px-4 py-2 text-sm font-medium hover:bg-muted rounded-lg transition-colors"
            >
              Блог
            </button>
            <button 
              onClick={() => { navigate('/promotions'); setMobileMenuOpen(false); }}
              className="w-full text-left px-4 py-2 text-sm font-medium hover:bg-muted rounded-lg transition-colors"
            >
              Акции
            </button>
            <button 
              onClick={() => { navigate('/reviews'); setMobileMenuOpen(false); }}
              className="w-full text-left px-4 py-2 text-sm font-medium hover:bg-muted rounded-lg transition-colors"
            >
              Отзывы
            </button>
            <Button className="w-full gradient-primary mt-2">
              <Icon name="Phone" size={16} className="mr-2" />
              Заказать звонок
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
