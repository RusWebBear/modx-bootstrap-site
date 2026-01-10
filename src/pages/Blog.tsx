import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  author: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Как выбрать правильный брус для строительства дома',
    excerpt: 'Профилированный, клееный или естественной влажности? Разбираем все виды бруса и помогаем сделать правильный выбор для вашего проекта.',
    category: 'Материалы',
    date: '15 января 2024',
    readTime: '5 мин',
    image: 'https://cdn.poehali.dev/projects/df0694b9-1517-4cab-9596-6a5c31248373/files/b3bfd131-5bfb-4c73-bf85-f936b9a8347e.jpg',
    author: 'Алексей Строев'
  },
  {
    id: 2,
    title: 'Топ-5 ошибок при строительстве бани',
    excerpt: 'Рассказываем о самых частых ошибках, которые допускают при строительстве бани, и как их избежать. Экономьте время и деньги!',
    category: 'Советы',
    date: '10 января 2024',
    readTime: '7 мин',
    image: 'https://cdn.poehali.dev/projects/df0694b9-1517-4cab-9596-6a5c31248373/files/56ac0e15-c721-4f96-9e06-a203a8076b6a.jpg',
    author: 'Мария Лесова'
  },
  {
    id: 3,
    title: 'Подготовка участка под строительство: чек-лист',
    excerpt: 'Полный список работ, которые нужно выполнить перед началом строительства. От геодезии до коммуникаций.',
    category: 'Подготовка',
    date: '5 января 2024',
    readTime: '6 мин',
    image: 'https://cdn.poehali.dev/projects/df0694b9-1517-4cab-9596-6a5c31248373/files/4792b341-cc4c-4e20-b776-4db74c98d82e.jpg',
    author: 'Дмитрий Плотников'
  },
  {
    id: 4,
    title: 'Современные тренды в деревянном домостроении',
    excerpt: 'Панорамные окна, smart-системы и экологичность. Рассказываем, что сейчас в моде в строительстве из бруса.',
    category: 'Тренды',
    date: '28 декабря 2023',
    readTime: '8 мин',
    image: 'https://cdn.poehali.dev/projects/df0694b9-1517-4cab-9596-6a5c31248373/files/b3bfd131-5bfb-4c73-bf85-f936b9a8347e.jpg',
    author: 'Алексей Строев'
  },
  {
    id: 5,
    title: 'Утепление деревянного дома: пошаговая инструкция',
    excerpt: 'Как правильно утеплить дом из бруса, чтобы снизить расходы на отопление и создать комфортный микроклимат.',
    category: 'Инструкции',
    date: '20 декабря 2023',
    readTime: '10 мин',
    image: 'https://cdn.poehali.dev/projects/df0694b9-1517-4cab-9596-6a5c31248373/files/4792b341-cc4c-4e20-b776-4db74c98d82e.jpg',
    author: 'Мария Лесова'
  },
  {
    id: 6,
    title: 'Какой фундамент выбрать для дома из бруса',
    excerpt: 'Ленточный, свайный или плитный? Сравниваем типы фундамента и помогаем определиться с выбором.',
    category: 'Фундамент',
    date: '15 декабря 2023',
    readTime: '6 мин',
    image: 'https://cdn.poehali.dev/projects/df0694b9-1517-4cab-9596-6a5c31248373/files/b3bfd131-5bfb-4c73-bf85-f936b9a8347e.jpg',
    author: 'Дмитрий Плотников'
  }
];

const Blog = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(blogPosts.map(post => post.category)))];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
                <Icon name="ArrowLeft" size={24} />
              </Button>
              <div className="flex items-center gap-2">
                <Icon name="Home" size={32} className="text-primary" />
                <h1 className="text-2xl font-bold bg-clip-text text-transparent gradient-primary">
                  Дома и Бани
                </h1>
              </div>
            </div>
            <Button className="gradient-primary hover-scale">
              <Icon name="Phone" size={16} className="mr-2" />
              Заказать звонок
            </Button>
          </div>
        </div>
      </header>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Блог о строительстве</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Полезные статьи, советы экспертов и актуальные новости из мира деревянного домостроения
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1">
              <div className="relative">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Поиск статей..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "gradient-primary" : ""}
                >
                  {category === 'all' ? 'Все' : category}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover-scale cursor-pointer border-2 hover:border-primary transition-all">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <Badge className="absolute top-4 right-4 gradient-secondary">
                    {post.category}
                  </Badge>
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Icon name="Calendar" size={14} />
                    <span>{post.date}</span>
                    <span>•</span>
                    <Icon name="Clock" size={14} />
                    <span>{post.readTime}</span>
                  </div>
                  <CardTitle className="text-xl line-clamp-2">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon name="User" size={16} className="text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground">{post.author}</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Icon name="ArrowRight" size={16} />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <Icon name="FileX" size={48} className="mx-auto mb-4 text-muted-foreground" />
              <p className="text-xl text-muted-foreground">Статьи не найдены</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <Card className="max-w-3xl mx-auto border-2 border-primary">
            <CardHeader className="text-center">
              <Icon name="Mail" size={48} className="mx-auto mb-4 text-primary" />
              <CardTitle className="text-3xl">Подпишитесь на рассылку</CardTitle>
              <CardDescription className="text-lg">
                Получайте свежие статьи и эксклюзивные материалы на почту
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input placeholder="Ваш email" type="email" />
                <Button className="gradient-primary">
                  Подписаться
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Blog;
