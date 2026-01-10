import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface Review {
  id: number;
  name: string;
  location: string;
  rating: number;
  date: string;
  text: string;
  project: string;
  projectType: 'house' | 'banya';
  images?: string[];
  verified: boolean;
}

const reviews: Review[] = [
  {
    id: 1,
    name: 'Алексей Петров',
    location: 'Московская область, Истра',
    rating: 5,
    date: '15 января 2024',
    text: 'Построили дом за 3 месяца точно в срок. Качество работы на высоте, бригада профессиональная. Живём уже год — очень довольны! Особенно понравилась работа прораба — всегда на связи, отвечал на все вопросы. Дом тёплый, уютный, никаких проблем.',
    project: 'Дом "Северный" 120 м²',
    projectType: 'house',
    images: ['https://cdn.poehali.dev/projects/df0694b9-1517-4cab-9596-6a5c31248373/files/b3bfd131-5bfb-4c73-bf85-f936b9a8347e.jpg'],
    verified: true
  },
  {
    id: 2,
    name: 'Мария Соколова',
    location: 'Ленинградская область, Всеволожск',
    rating: 5,
    date: '10 января 2024',
    text: 'Заказывали баню под ключ. Ребята сделали всё идеально, даже больше чем обещали. Теперь каждые выходные паримся с семьёй! Печь топится отлично, парная прогревается быстро. Спасибо за качественную работу!',
    project: 'Баня "Русская традиция" 45 м²',
    projectType: 'banya',
    images: ['https://cdn.poehali.dev/projects/df0694b9-1517-4cab-9596-6a5c31248373/files/56ac0e15-c721-4f96-9e06-a203a8076b6a.jpg'],
    verified: true
  },
  {
    id: 3,
    name: 'Дмитрий Волков',
    location: 'Краснодарский край, Анапа',
    rating: 5,
    date: '5 января 2024',
    text: 'Отличная компания! Помогли с выбором проекта, провели все коммуникации. Цена честная, без скрытых платежей. Рекомендую! Дом получился просторный, светлый. Дети в восторге от своих комнат.',
    project: 'Дом "Скандинавия" 95 м²',
    projectType: 'house',
    images: ['https://cdn.poehali.dev/projects/df0694b9-1517-4cab-9596-6a5c31248373/files/4792b341-cc4c-4e20-b776-4db74c98d82e.jpg'],
    verified: true
  },
  {
    id: 4,
    name: 'Екатерина Новикова',
    location: 'Тверская область, Конаково',
    rating: 5,
    date: '28 декабря 2023',
    text: 'Построили баню-гостевой домик на участке. Всё сделано качественно и в срок. Брус отличный, без трещин. Ребята — профессионалы своего дела. Теперь планируем заказать у них основной дом.',
    project: 'Баня "Премиум" 65 м²',
    projectType: 'banya',
    verified: true
  },
  {
    id: 5,
    name: 'Сергей Иванов',
    location: 'Ярославская область, Ростов',
    rating: 5,
    date: '20 декабря 2023',
    text: 'Долго выбирали подрядчика, остановились на этой компании — не пожалели. Дом большой, просторный, для всей семьи. Качество материалов отличное, работа выполнена на совесть. Спасибо!',
    project: 'Дом "Семейный" 150 м²',
    projectType: 'house',
    verified: true
  },
  {
    id: 6,
    name: 'Ольга Смирнова',
    location: 'Владимирская область, Суздаль',
    rating: 5,
    date: '15 декабря 2023',
    text: 'Компактная баня для дачи — то, что нужно! Построили быстро, качественно. Печка отличная, прогревается за полчаса. Очень довольны результатом. Рекомендуем всем знакомым!',
    project: 'Баня "Компактная" 30 м²',
    projectType: 'banya',
    verified: true
  },
  {
    id: 7,
    name: 'Андрей Козлов',
    location: 'Калужская область, Обнинск',
    rating: 5,
    date: '10 декабря 2023',
    text: 'Построили дом мечты! Всё как мы и хотели. Менеджер помог с выбором проекта, дизайнер предложил отличные решения. Строители работали аккуратно. Дом готов, живём и радуемся!',
    project: 'Дом "Северный" 120 м²',
    projectType: 'house',
    verified: true
  },
  {
    id: 8,
    name: 'Виктория Лебедева',
    location: 'Псковская область, Печоры',
    rating: 5,
    date: '5 декабря 2023',
    text: 'Баня получилась шикарная! Просторная парная, уютная комната отдыха, большая терраса. Все друзья теперь к нам в гости ездят попариться. Качество работы — на высшем уровне!',
    project: 'Баня "Русская традиция" 45 м²',
    projectType: 'banya',
    verified: true
  }
];

const Reviews = () => {
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState<'all' | 'house' | 'banya'>('all');

  const filteredReviews = reviews.filter(review => 
    filterType === 'all' || review.projectType === filterType
  );

  const stats = {
    total: reviews.length,
    houses: reviews.filter(r => r.projectType === 'house').length,
    banyas: reviews.filter(r => r.projectType === 'banya').length,
    avgRating: (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
  };

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

      <section className="py-16 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Отзывы наших клиентов</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Более {stats.total} довольных клиентов доверили нам строительство своего дома мечты
            </p>
            <div className="flex flex-wrap gap-6 justify-center">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center">
                  <span className="text-white font-bold text-xl">{stats.avgRating}</span>
                </div>
                <div className="text-left">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Icon key={i} name="Star" size={16} className="text-primary fill-primary" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">Средняя оценка</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                  <Icon name="Home" size={24} className="text-secondary" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-xl">{stats.houses}</p>
                  <p className="text-sm text-muted-foreground">Домов построено</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                  <Icon name="Droplet" size={24} className="text-accent" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-xl">{stats.banyas}</p>
                  <p className="text-sm text-muted-foreground">Бань построено</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs value={filterType} onValueChange={(v) => setFilterType(v as any)} className="mb-8">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
              <TabsTrigger value="all">Все ({stats.total})</TabsTrigger>
              <TabsTrigger value="house">Дома ({stats.houses})</TabsTrigger>
              <TabsTrigger value="banya">Бани ({stats.banyas})</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReviews.map((review) => (
              <Card key={review.id} className="hover-scale border-2 hover:border-primary transition-all">
                {review.images && review.images.length > 0 && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={review.images[0]}
                      alt={review.project}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon name="User" size={24} className="text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-lg">{review.name}</CardTitle>
                          {review.verified && (
                            <Badge variant="secondary" className="text-xs">
                              <Icon name="CheckCircle" size={12} className="mr-1" />
                              Проверен
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{review.location}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Icon key={i} name="Star" size={16} className="text-primary fill-primary" />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">{review.date}</span>
                  </div>
                  <Badge variant="outline" className="text-xs w-fit">
                    {review.project}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-4">{review.text}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="w-full">
                    Читать полностью
                    <Icon name="ChevronRight" size={16} className="ml-2" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="border-2 border-primary">
              <CardHeader className="text-center">
                <Icon name="MessageSquare" size={48} className="mx-auto mb-4 text-primary" />
                <CardTitle className="text-3xl">Оставьте свой отзыв</CardTitle>
                <p className="text-muted-foreground">
                  Ваше мнение очень важно для нас. Поделитесь опытом сотрудничества с нашей компанией.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="lg" className="w-full gradient-primary text-lg">
                      <Icon name="PenSquare" size={20} className="mr-2" />
                      Написать отзыв
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Оставить отзыв</DialogTitle>
                      <DialogDescription>
                        Расскажите о вашем опыте работы с нами
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Ваше имя</label>
                        <Input placeholder="Иван Иванов" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Город</label>
                        <Input placeholder="Москва" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Проект</label>
                        <Input placeholder='Например: Дом "Северный"' />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Ваша оценка</label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Button key={star} variant="outline" size="icon">
                              <Icon name="Star" size={20} />
                            </Button>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Ваш отзыв</label>
                        <Textarea
                          placeholder="Расскажите о вашем опыте..."
                          rows={5}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button className="gradient-primary w-full">
                        <Icon name="Send" size={16} className="mr-2" />
                        Отправить отзыв
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Почему нам доверяют</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: 'Shield',
                  title: 'Гарантия качества',
                  desc: '5 лет гарантии на все работы'
                },
                {
                  icon: 'Users',
                  title: 'Опытная команда',
                  desc: 'Более 12 лет на рынке'
                },
                {
                  icon: 'Award',
                  title: 'Только лучшее',
                  desc: 'Премиум материалы'
                }
              ].map((item, idx) => (
                <Card key={idx} className="text-center border-2 hover:border-secondary transition-all hover-scale">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full gradient-secondary flex items-center justify-center">
                      <Icon name={item.icon as any} size={32} className="text-white" />
                    </div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reviews;
