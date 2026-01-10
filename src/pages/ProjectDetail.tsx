import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
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
  description: string;
  specs: {
    floors: number;
    walls: string;
    roof: string;
    foundation: string;
    buildTime: string;
  };
  gallery: string[];
}

const projects: Record<string, Project> = {
  '1': {
    id: 1,
    title: 'Дом "Северный"',
    type: 'house',
    area: 120,
    price: 3500000,
    rooms: 4,
    image: 'https://cdn.poehali.dev/projects/df0694b9-1517-4cab-9596-6a5c31248373/files/b3bfd131-5bfb-4c73-bf85-f936b9a8347e.jpg',
    features: ['Панорамные окна', 'Терраса', 'Гараж'],
    description: 'Современный дом из профилированного бруса с панорамными окнами. Идеально подходит для круглогодичного проживания. Просторная планировка с открытыми зонами и большими окнами создает ощущение простора и света.',
    specs: {
      floors: 2,
      walls: 'Профилированный брус 200x200 мм',
      roof: 'Металлочерепица',
      foundation: 'Ленточный',
      buildTime: '3-4 месяца'
    },
    gallery: [
      'https://cdn.poehali.dev/projects/df0694b9-1517-4cab-9596-6a5c31248373/files/b3bfd131-5bfb-4c73-bf85-f936b9a8347e.jpg',
      'https://cdn.poehali.dev/projects/df0694b9-1517-4cab-9596-6a5c31248373/files/4792b341-cc4c-4e20-b776-4db74c98d82e.jpg',
    ]
  },
  '2': {
    id: 2,
    title: 'Баня "Русская традиция"',
    type: 'banya',
    area: 45,
    price: 1200000,
    image: 'https://cdn.poehali.dev/projects/df0694b9-1517-4cab-9596-6a5c31248373/files/56ac0e15-c721-4f96-9e06-a203a8076b6a.jpg',
    features: ['Парная', 'Комната отдыха', 'Веранда'],
    description: 'Классическая русская баня из натурального бруса. Отличное решение для загородного участка. Включает просторную парную, комфортную комнату отдыха и открытую веранду для релаксации на свежем воздухе.',
    specs: {
      floors: 1,
      walls: 'Брус естественной влажности 150x150 мм',
      roof: 'Ондулин',
      foundation: 'Свайно-винтовой',
      buildTime: '1-2 месяца'
    },
    gallery: [
      'https://cdn.poehali.dev/projects/df0694b9-1517-4cab-9596-6a5c31248373/files/56ac0e15-c721-4f96-9e06-a203a8076b6a.jpg',
    ]
  },
  '3': {
    id: 3,
    title: 'Дом "Скандинавия"',
    type: 'house',
    area: 95,
    price: 2800000,
    rooms: 3,
    image: 'https://cdn.poehali.dev/projects/df0694b9-1517-4cab-9596-6a5c31248373/files/4792b341-cc4c-4e20-b776-4db74c98d82e.jpg',
    features: ['Эко-материалы', 'Энергоэффективность', 'Минимализм'],
    description: 'Компактный дом в скандинавском стиле с максимальной энергоэффективностью. Минималистичный дизайн, натуральные материалы и продуманная планировка создают уютное пространство для комфортной жизни.',
    specs: {
      floors: 1,
      walls: 'Клееный брус 180x180 мм',
      roof: 'Гибкая черепица',
      foundation: 'Плитный',
      buildTime: '2-3 месяца'
    },
    gallery: [
      'https://cdn.poehali.dev/projects/df0694b9-1517-4cab-9596-6a5c31248373/files/4792b341-cc4c-4e20-b776-4db74c98d82e.jpg',
      'https://cdn.poehali.dev/projects/df0694b9-1517-4cab-9596-6a5c31248373/files/b3bfd131-5bfb-4c73-bf85-f936b9a8347e.jpg',
    ]
  }
};

const ProjectDetail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get('id') || '1';
  const project = projects[projectId];

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Проект не найден</h1>
          <Button onClick={() => navigate('/')}>Вернуться на главную</Button>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
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

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="space-y-4">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-[500px] object-cover rounded-2xl shadow-lg"
            />
            <div className="grid grid-cols-2 gap-4">
              {project.gallery.slice(1).map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${project.title} - фото ${idx + 2}`}
                  className="w-full h-40 object-cover rounded-lg hover-scale cursor-pointer"
                />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <Badge className="gradient-primary mb-4">
                {project.type === 'house' ? 'Дом' : 'Баня'}
              </Badge>
              <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
              <p className="text-lg text-muted-foreground mb-6">
                {project.description}
              </p>
              <div className="text-4xl font-bold text-primary mb-6">
                {formatPrice(project.price)}
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center">
                  <Icon name="Maximize" size={24} className="text-white" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Площадь</div>
                  <div className="text-xl font-semibold">{project.area} м²</div>
                </div>
              </div>

              {project.rooms && (
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg gradient-secondary flex items-center justify-center">
                    <Icon name="DoorOpen" size={24} className="text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Комнат</div>
                    <div className="text-xl font-semibold">{project.rooms}</div>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                  <Icon name="Layers" size={24} className="text-accent" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Этажей</div>
                  <div className="text-xl font-semibold">{project.specs.floors}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                  <Icon name="Clock" size={24} className="text-foreground" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Срок</div>
                  <div className="text-xl font-semibold">{project.specs.buildTime}</div>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Особенности проекта</h3>
              <div className="flex flex-wrap gap-2">
                {project.features.map((feature, idx) => (
                  <Badge key={idx} variant="secondary" className="text-sm py-1 px-3">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button size="lg" className="flex-1 gradient-primary">
                <Icon name="ShoppingCart" size={20} className="mr-2" />
                Заказать проект
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-primary">
                <Icon name="Download" size={20} className="mr-2" />
                Скачать PDF
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="specs" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="specs">Характеристики</TabsTrigger>
            <TabsTrigger value="plan">Планировка</TabsTrigger>
            <TabsTrigger value="materials">Материалы</TabsTrigger>
          </TabsList>

          <TabsContent value="specs">
            <Card>
              <CardHeader>
                <CardTitle>Технические характеристики</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <Icon name="Layers" size={24} className="text-primary mt-1" />
                    <div>
                      <div className="font-semibold mb-1">Количество этажей</div>
                      <div className="text-muted-foreground">{project.specs.floors}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Box" size={24} className="text-primary mt-1" />
                    <div>
                      <div className="font-semibold mb-1">Материал стен</div>
                      <div className="text-muted-foreground">{project.specs.walls}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Tent" size={24} className="text-primary mt-1" />
                    <div>
                      <div className="font-semibold mb-1">Кровля</div>
                      <div className="text-muted-foreground">{project.specs.roof}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Landmark" size={24} className="text-primary mt-1" />
                    <div>
                      <div className="font-semibold mb-1">Фундамент</div>
                      <div className="text-muted-foreground">{project.specs.foundation}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Clock" size={24} className="text-primary mt-1" />
                    <div>
                      <div className="font-semibold mb-1">Срок строительства</div>
                      <div className="text-muted-foreground">{project.specs.buildTime}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Wallet" size={24} className="text-primary mt-1" />
                    <div>
                      <div className="font-semibold mb-1">Стоимость</div>
                      <div className="text-muted-foreground">{formatPrice(project.price)}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="plan">
            <Card>
              <CardHeader>
                <CardTitle>Планировка помещений</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <Icon name="FileImage" size={48} className="mx-auto mb-2" />
                    <p>План помещений будет доступен после запроса</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="materials">
            <Card>
              <CardHeader>
                <CardTitle>Используемые материалы</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 border border-border rounded-lg">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name="Box" size={24} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">Брус</div>
                      <div className="text-sm text-muted-foreground">{project.specs.walls}</div>
                    </div>
                    <Badge className="gradient-primary">Премиум</Badge>
                  </div>
                  <div className="flex items-center gap-4 p-4 border border-border rounded-lg">
                    <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                      <Icon name="Tent" size={24} className="text-secondary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">Кровля</div>
                      <div className="text-sm text-muted-foreground">{project.specs.roof}</div>
                    </div>
                    <Badge className="gradient-secondary">Качество</Badge>
                  </div>
                  <div className="flex items-center gap-4 p-4 border border-border rounded-lg">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                      <Icon name="Landmark" size={24} className="text-accent" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">Фундамент</div>
                      <div className="text-sm text-muted-foreground">{project.specs.foundation}</div>
                    </div>
                    <Badge variant="secondary">Надёжность</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="border-2 border-primary shadow-lg">
              <CardHeader className="text-center">
                <Icon name="MessageCircle" size={48} className="mx-auto mb-4 text-primary" />
                <CardTitle className="text-3xl">Остались вопросы?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-center text-muted-foreground">
                  Оставьте заявку и наш специалист свяжется с вами для консультации
                </p>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                  <input
                    type="tel"
                    placeholder="Телефон"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                  <textarea
                    placeholder="Ваш вопрос (необязательно)"
                    rows={3}
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>
                <Button size="lg" className="w-full gradient-primary text-lg">
                  <Icon name="Send" size={20} className="mr-2" />
                  Отправить заявку
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;
