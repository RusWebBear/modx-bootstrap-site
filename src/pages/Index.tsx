import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Project {
  id: number;
  title: string;
  type: 'house' | 'banya';
  area: number;
  price: number;
  image: string;
  rooms?: number;
  features: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Дом "Северный"',
    type: 'house',
    area: 120,
    price: 3500000,
    rooms: 4,
    image: 'https://cdn.poehali.dev/projects/df0694b9-1517-4cab-9596-6a5c31248373/files/b3bfd131-5bfb-4c73-bf85-f936b9a8347e.jpg',
    features: ['Панорамные окна', 'Терраса', 'Гараж']
  },
  {
    id: 2,
    title: 'Баня "Русская традиция"',
    type: 'banya',
    area: 45,
    price: 1200000,
    image: 'https://cdn.poehali.dev/projects/df0694b9-1517-4cab-9596-6a5c31248373/files/56ac0e15-c721-4f96-9e06-a203a8076b6a.jpg',
    features: ['Парная', 'Комната отдыха', 'Веранда']
  },
  {
    id: 3,
    title: 'Дом "Скандинавия"',
    type: 'house',
    area: 95,
    price: 2800000,
    rooms: 3,
    image: 'https://cdn.poehali.dev/projects/df0694b9-1517-4cab-9596-6a5c31248373/files/4792b341-cc4c-4e20-b776-4db74c98d82e.jpg',
    features: ['Эко-материалы', 'Энергоэффективность', 'Минимализм']
  },
  {
    id: 4,
    title: 'Баня "Премиум"',
    type: 'banya',
    area: 65,
    price: 1800000,
    image: 'https://cdn.poehali.dev/projects/df0694b9-1517-4cab-9596-6a5c31248373/files/56ac0e15-c721-4f96-9e06-a203a8076b6a.jpg',
    features: ['Бассейн', 'Купель', 'Барбекю']
  },
  {
    id: 5,
    title: 'Дом "Семейный"',
    type: 'house',
    area: 150,
    price: 4200000,
    rooms: 5,
    image: 'https://cdn.poehali.dev/projects/df0694b9-1517-4cab-9596-6a5c31248373/files/b3bfd131-5bfb-4c73-bf85-f936b9a8347e.jpg',
    features: ['Два этажа', 'Камин', 'Балкон']
  },
  {
    id: 6,
    title: 'Баня "Компактная"',
    type: 'banya',
    area: 30,
    price: 850000,
    image: 'https://cdn.poehali.dev/projects/df0694b9-1517-4cab-9596-6a5c31248373/files/56ac0e15-c721-4f96-9e06-a203a8076b6a.jpg',
    features: ['Печь-каменка', 'Душевая', 'Предбанник']
  }
];

const Index = () => {
  const navigate = useNavigate();
  const [priceRange, setPriceRange] = useState<number[]>([500000, 5000000]);
  const [areaRange, setAreaRange] = useState<number[]>([30, 200]);
  const [selectedType, setSelectedType] = useState<'all' | 'house' | 'banya'>('all');

  const filteredProjects = projects.filter(project => {
    const matchesType = selectedType === 'all' || project.type === selectedType;
    const matchesPrice = project.price >= priceRange[0] && project.price <= priceRange[1];
    const matchesArea = project.area >= areaRange[0] && project.area <= areaRange[1];
    return matchesType && matchesPrice && matchesArea;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Home" size={32} className="text-primary" />
              <h1 className="text-2xl font-bold bg-clip-text text-transparent gradient-primary">
                Дома и Бани
              </h1>
            </div>
            <nav className="hidden md:flex gap-6">
              <a href="#projects" className="text-sm font-medium hover:text-primary transition-colors">Проекты</a>
              <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">О компании</a>
              <a href="#calculator" className="text-sm font-medium hover:text-primary transition-colors">Калькулятор</a>
              <a href="#contacts" className="text-sm font-medium hover:text-primary transition-colors">Контакты</a>
            </nav>
            <Button className="gradient-primary hover-scale">
              <Icon name="Phone" size={16} className="mr-2" />
              Заказать звонок
            </Button>
          </div>
        </div>
      </header>

      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Дома и бани из бруса
              <span className="block text-primary mt-2">под ключ</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Современные проекты с использованием экологичных материалов. Гарантия качества и быстрые сроки строительства.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="gradient-primary hover-scale text-lg px-8">
                <Icon name="Home" size={20} className="mr-2" />
                Выбрать дом
              </Button>
              <Button size="lg" variant="outline" className="hover-scale text-lg px-8 border-2 border-primary">
                <Icon name="Droplet" size={20} className="mr-2" />
                Выбрать баню
              </Button>
              <Button size="lg" variant="secondary" className="gradient-secondary hover-scale text-lg px-8">
                <Icon name="Pencil" size={20} className="mr-2" />
                Свой проект
              </Button>
            </div>
            <div className="mt-12 flex flex-wrap gap-8 justify-center text-center">
              <div className="flex flex-col items-center">
                <div className="text-4xl font-bold text-primary mb-2">34</div>
                <div className="text-sm text-muted-foreground">Построено объектов</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-4xl font-bold text-secondary mb-2">12</div>
                <div className="text-sm text-muted-foreground">Лет опыта</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-4xl font-bold text-accent mb-2">100%</div>
                <div className="text-sm text-muted-foreground">Довольных клиентов</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Наши проекты</h2>
            <p className="text-xl text-muted-foreground">Выберите готовый проект или закажите индивидуальный</p>
          </div>

          <div className="mb-8 bg-card rounded-xl p-6 shadow-lg border border-border">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="text-sm font-medium mb-3 block flex items-center gap-2">
                  <Icon name="Filter" size={16} />
                  Тип объекта
                </label>
                <Tabs value={selectedType} onValueChange={(v) => setSelectedType(v as any)} className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="all">Все</TabsTrigger>
                    <TabsTrigger value="house">Дома</TabsTrigger>
                    <TabsTrigger value="banya">Бани</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div>
                <label className="text-sm font-medium mb-3 block flex items-center gap-2">
                  <Icon name="Ruler" size={16} />
                  Площадь: {areaRange[0]} - {areaRange[1]} м²
                </label>
                <Slider
                  min={30}
                  max={200}
                  step={5}
                  value={areaRange}
                  onValueChange={setAreaRange}
                  className="mt-2"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-3 block flex items-center gap-2">
                  <Icon name="Wallet" size={16} />
                  Цена: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                </label>
                <Slider
                  min={500000}
                  max={5000000}
                  step={100000}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mt-2"
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden hover-scale group cursor-pointer border-2 border-border hover:border-primary transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <Badge className="absolute top-4 right-4 gradient-primary">
                    {project.type === 'house' ? 'Дом' : 'Баня'}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <CardDescription className="flex items-center gap-4 text-base">
                    <span className="flex items-center gap-1">
                      <Icon name="Maximize" size={16} />
                      {project.area} м²
                    </span>
                    {project.rooms && (
                      <span className="flex items-center gap-1">
                        <Icon name="DoorOpen" size={16} />
                        {project.rooms} комн.
                      </span>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.features.map((feature, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-2xl font-bold text-primary">
                    {formatPrice(project.price)}
                  </div>
                </CardContent>
                <CardFooter className="gap-2">
                  <Button className="flex-1 gradient-primary" onClick={() => navigate(`/project?id=${project.id}`)}>
                    <Icon name="Eye" size={16} className="mr-2" />
                    Подробнее
                  </Button>
                  <Button variant="outline" size="icon">
                    <Icon name="Heart" size={16} />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <Icon name="Search" size={48} className="mx-auto mb-4 text-muted-foreground" />
              <p className="text-xl text-muted-foreground">Проекты не найдены. Попробуйте изменить фильтры.</p>
            </div>
          )}
        </div>
      </section>

      <section id="calculator" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-secondary opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto">
            <Card className="border-2 border-secondary shadow-2xl">
              <CardHeader className="text-center">
                <Icon name="Calculator" size={48} className="mx-auto mb-4 text-secondary" />
                <CardTitle className="text-3xl">Калькулятор стоимости</CardTitle>
                <CardDescription className="text-lg">
                  Узнайте примерную стоимость строительства за 1 минуту
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <Button variant="outline" size="lg" className="h-24 flex-col gap-2 hover:border-secondary hover:text-secondary">
                    <Icon name="Home" size={32} />
                    <span>Дом</span>
                  </Button>
                  <Button variant="outline" size="lg" className="h-24 flex-col gap-2 hover:border-secondary hover:text-secondary">
                    <Icon name="Droplet" size={32} />
                    <span>Баня</span>
                  </Button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Желаемая площадь</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="Например, 120"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      />
                      <span className="flex items-center text-muted-foreground">м²</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Количество комнат</label>
                    <input
                      type="number"
                      placeholder="Например, 4"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button size="lg" className="w-full gradient-secondary text-lg">
                  <Icon name="Send" size={20} className="mr-2" />
                  Получить расчёт
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Преимущества строительства из бруса</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: 'Leaf', title: 'Экологичность', desc: 'Натуральные материалы без химии' },
              { icon: 'Clock', title: 'Быстрота', desc: 'Строительство за 2-3 месяца' },
              { icon: 'Shield', title: 'Долговечность', desc: 'Служит более 50 лет' },
              { icon: 'Zap', title: 'Энергоэффективность', desc: 'Низкие затраты на отопление' }
            ].map((advantage, idx) => (
              <Card key={idx} className="text-center hover-scale cursor-pointer border-2 hover:border-primary transition-all">
                <CardHeader>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full gradient-primary flex items-center justify-center">
                    <Icon name={advantage.icon as any} size={32} className="text-white" />
                  </div>
                  <CardTitle className="text-xl">{advantage.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{advantage.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Home" size={24} className="text-primary" />
                <span className="font-bold text-lg">Дома и Бани</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Строительство деревянных домов и бань из бруса под ключ
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Контакты</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  <span>+7 (999) 123-45-67</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  <span>info@domabani.ru</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Навигация</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div><a href="#projects" className="hover:text-primary transition-colors">Проекты</a></div>
                <div><a href="#about" className="hover:text-primary transition-colors">О компании</a></div>
                <div><a href="#calculator" className="hover:text-primary transition-colors">Калькулятор</a></div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Соцсети</h3>
              <div className="flex gap-3">
                <Button size="icon" variant="outline" className="hover:border-primary">
                  <Icon name="MessageCircle" size={20} />
                </Button>
                <Button size="icon" variant="outline" className="hover:border-primary">
                  <Icon name="Send" size={20} />
                </Button>
                <Button size="icon" variant="outline" className="hover:border-primary">
                  <Icon name="Phone" size={20} />
                </Button>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© 2024 Дома и Бани. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;