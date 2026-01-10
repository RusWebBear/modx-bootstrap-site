import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Promotion {
  id: number;
  title: string;
  description: string;
  discount: string;
  validUntil: string;
  image: string;
  conditions: string[];
  isHot: boolean;
}

const promotions: Promotion[] = [
  {
    id: 1,
    title: 'Весенняя скидка на строительство',
    description: 'Закажите строительство дома до конца марта и получите скидку 15% на все работы!',
    discount: '15%',
    validUntil: '31 марта 2024',
    image: 'https://cdn.poehali.dev/projects/df0694b9-1517-4cab-9596-6a5c31248373/files/b3bfd131-5bfb-4c73-bf85-f936b9a8347e.jpg',
    conditions: [
      'Скидка действует на проекты от 80 м²',
      'Предоплата 30%',
      'Акция не суммируется с другими предложениями'
    ],
    isHot: true
  },
  {
    id: 2,
    title: 'Баня в подарок',
    description: 'При заказе дома площадью от 150 м² — баня 4х4 метра в подарок!',
    discount: 'Подарок',
    validUntil: '15 апреля 2024',
    image: 'https://cdn.poehali.dev/projects/df0694b9-1517-4cab-9596-6a5c31248373/files/56ac0e15-c721-4f96-9e06-a203a8076b6a.jpg',
    conditions: [
      'Дом должен быть от 150 м²',
      'Баня из бруса 150х150 мм',
      'Установка на вашем участке'
    ],
    isHot: true
  },
  {
    id: 3,
    title: 'Рассрочка 0% на год',
    description: 'Постройте дом мечты сейчас, а платите потом. Рассрочка без переплат на 12 месяцев.',
    discount: '0%',
    validUntil: '30 июня 2024',
    image: 'https://cdn.poehali.dev/projects/df0694b9-1517-4cab-9596-6a5c31248373/files/4792b341-cc4c-4e20-b776-4db74c98d82e.jpg',
    conditions: [
      'Первый взнос от 20%',
      'Без процентов и переплат',
      'Оформление за 1 день'
    ],
    isHot: false
  },
  {
    id: 4,
    title: 'Комплект "Дом + Участок"',
    description: 'Покупайте дом вместе с земельным участком со скидкой 10% на строительство.',
    discount: '10%',
    validUntil: '31 мая 2024',
    image: 'https://cdn.poehali.dev/projects/df0694b9-1517-4cab-9596-6a5c31248373/files/b3bfd131-5bfb-4c73-bf85-f936b9a8347e.jpg',
    conditions: [
      'Участки от 6 соток',
      'Удобные коттеджные поселки',
      'Все коммуникации подведены'
    ],
    isHot: false
  },
  {
    id: 5,
    title: 'Приведи друга — получи бонус',
    description: 'Порекомендуйте нас другу, и получите 50 000 рублей на ваш счёт после сдачи его объекта.',
    discount: '50 000 ₽',
    validUntil: 'Бессрочно',
    image: 'https://cdn.poehali.dev/projects/df0694b9-1517-4cab-9596-6a5c31248373/files/4792b341-cc4c-4e20-b776-4db74c98d82e.jpg',
    conditions: [
      'Ваш друг должен заключить договор',
      'Бонус после сдачи объекта',
      'Можно потратить на дополнительные работы'
    ],
    isHot: false
  },
  {
    id: 6,
    title: 'Раннее бронирование лета',
    description: 'Забронируйте строительство на лето сейчас и получите фиксированную цену + скидку 7%.',
    discount: '7%',
    validUntil: '15 апреля 2024',
    image: 'https://cdn.poehali.dev/projects/df0694b9-1517-4cab-9596-6a5c31248373/files/b3bfd131-5bfb-4c73-bf85-f936b9a8347e.jpg',
    conditions: [
      'Цена фиксируется на момент брони',
      'Старт работ в мае-июне',
      'Предоплата от 15%'
    ],
    isHot: false
  }
];

const Promotions = () => {

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="py-16 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="gradient-primary mb-4 text-lg px-4 py-2">
              <Icon name="Sparkles" size={20} className="mr-2" />
              Выгодные предложения
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Акции и спецпредложения</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Строим дома и бани с выгодой до 15%. Успейте воспользоваться лучшими предложениями сезона!
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {promotions.map((promo) => (
              <Card key={promo.id} className={`overflow-hidden hover-scale cursor-pointer border-2 transition-all ${promo.isHot ? 'border-primary shadow-lg shadow-primary/20' : 'hover:border-primary'}`}>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={promo.image}
                    alt={promo.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    {promo.isHot && (
                      <Badge className="gradient-primary">
                        <Icon name="Flame" size={14} className="mr-1" />
                        Горячее
                      </Badge>
                    )}
                    <Badge variant="secondary" className="bg-white text-foreground">
                      {promo.discount}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{promo.title}</CardTitle>
                  <CardDescription className="text-base">
                    {promo.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon name="Calendar" size={16} className="text-primary" />
                    <span>Действует до: <strong>{promo.validUntil}</strong></span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold">Условия акции:</p>
                    <ul className="space-y-1">
                      {promo.conditions.map((condition, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Icon name="Check" size={16} className="text-secondary mt-0.5 flex-shrink-0" />
                          <span>{condition}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full gradient-primary">
                    <Icon name="Gift" size={16} className="mr-2" />
                    Воспользоваться акцией
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-secondary">
              <CardHeader className="text-center">
                <Icon name="Bell" size={48} className="mx-auto mb-4 text-secondary" />
                <CardTitle className="text-3xl">Узнавайте об акциях первыми</CardTitle>
                <CardDescription className="text-lg">
                  Подпишитесь на уведомления и не пропускайте выгодные предложения
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mb-3">
                      <Icon name="Mail" size={28} className="text-white" />
                    </div>
                    <p className="text-sm font-semibold">Email-рассылка</p>
                    <p className="text-xs text-muted-foreground">Раз в неделю</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full gradient-secondary flex items-center justify-center mb-3">
                      <Icon name="MessageCircle" size={28} className="text-white" />
                    </div>
                    <p className="text-sm font-semibold">Telegram-канал</p>
                    <p className="text-xs text-muted-foreground">Мгновенно</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-3">
                      <Icon name="Phone" size={28} className="text-accent" />
                    </div>
                    <p className="text-sm font-semibold">SMS-уведомления</p>
                    <p className="text-xs text-muted-foreground">Важные акции</p>
                  </div>
                </div>
                <div className="flex gap-2 pt-4">
                  <input
                    type="email"
                    placeholder="Ваш email или телефон"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                  <Button className="gradient-secondary">
                    Подписаться
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Часто задаваемые вопросы об акциях</h2>
            <div className="space-y-4">
              {[
                {
                  question: 'Можно ли совмещать несколько акций?',
                  answer: 'Как правило, акции не суммируются. Но вы можете выбрать наиболее выгодное предложение для вашего проекта.'
                },
                {
                  question: 'Как воспользоваться акцией?',
                  answer: 'Оставьте заявку через сайт или позвоните нам. При оформлении договора сообщите менеджеру о выбранной акции.'
                },
                {
                  question: 'Что если акция закончится во время строительства?',
                  answer: 'Скидка фиксируется в договоре на момент его заключения и не меняется во время строительства.'
                },
                {
                  question: 'Действуют ли акции на индивидуальные проекты?',
                  answer: 'Да, большинство акций распространяются и на индивидуальные проекты. Уточняйте условия у менеджера.'
                }
              ].map((faq, idx) => (
                <Card key={idx} className="border-2 hover:border-primary transition-all">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-start gap-3">
                      <Icon name="HelpCircle" size={24} className="text-primary flex-shrink-0" />
                      {faq.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground pl-9">{faq.answer}</p>
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

export default Promotions;