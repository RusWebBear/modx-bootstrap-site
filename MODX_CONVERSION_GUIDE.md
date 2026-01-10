# Инструкция по конвертации React → MODX Revolution 2.8.8

## Обзор проекта

Текущий проект построен на React + Vite + TypeScript + Tailwind CSS.
Для переноса на MODX Revolution 2.8.8 необходимо:

1. Конвертировать React-компоненты в HTML-шаблоны
2. Заменить Tailwind CSS на Bootstrap 5
3. Перенести динамическую логику на JavaScript/jQuery
4. Создать структуру чанков и сниппетов MODX

---

## Шаг 1: Анализ текущей структуры

### Страницы React (src/pages/)
- `Index.tsx` — Главная страница
- `ProjectDetail.tsx` — Детальная страница проекта
- `Blog.tsx` — Блог со статьями
- `Promotions.tsx` — Акции и спецпредложения
- `Reviews.tsx` — Отзывы клиентов

### Компоненты (src/components/)
- `Header.tsx` — Универсальная шапка с меню-бургером
- `ui/*` — UI-компоненты (shadcn/ui)

### Данные
- Проекты домов/бань (массив объектов)
- Статьи блога (массив объектов)
- Акции (массив объектов)
- Отзывы (массив объектов)

---

## Шаг 2: Подготовка к конвертации

### 2.1 Установка MODX Revolution 2.8.8
1. Скачайте MODX Revolution с официального сайта
2. Установите на локальный сервер (XAMPP/OpenServer)
3. Создайте базу данных MySQL

### 2.2 Подключение Bootstrap 5
В шаблоне MODX добавьте в `<head>`:
```html
<!-- Bootstrap 5 CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
<!-- Bootstrap Icons -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">

<!-- Custom CSS -->
<link href="/assets/css/custom.css" rel="stylesheet">
```

В конце `<body>`:
```html
<!-- Bootstrap 5 JS Bundle -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
<!-- Custom JS -->
<script src="/assets/js/custom.js"></script>
```

---

## Шаг 3: Маппинг React → MODX

### 3.1 React Компоненты → MODX Чанки

| React Component | MODX Chunk | Назначение |
|----------------|------------|------------|
| `Header.tsx` | `header` | Шапка сайта |
| `Footer` (в Index.tsx) | `footer` | Подвал сайта |
| Карточка проекта | `projectCard` | Карточка дома/бани |
| Карточка статьи | `blogCard` | Карточка статьи блога |
| Карточка акции | `promotionCard` | Карточка акции |
| Карточка отзыва | `reviewCard` | Карточка отзыва |

### 3.2 React Hooks → JavaScript

| React Hook | MODX/JS Решение |
|-----------|-----------------|
| `useState` | Vanilla JS переменные |
| `useNavigate` | `window.location.href` или `<a href="">` |
| `useSearchParams` | `URLSearchParams` или PHP `$_GET` |
| `onClick` события | Обычные `onclick` атрибуты |

### 3.3 Динамические данные → MODX Resources

**Проекты домов/бань:**
- Создать родительский ресурс "Проекты" (ID: например, 5)
- Каждый проект = отдельный дочерний ресурс
- TV-поля: площадь, цена, количество комнат, тип (дом/баня), изображения

**Статьи блога:**
- Создать родительский ресурс "Блог" (ID: например, 10)
- Каждая статья = дочерний ресурс
- TV-поля: автор, дата, время чтения, категория, изображение

**Акции:**
- Создать родительский ресурс "Акции" (ID: например, 15)
- TV-поля: скидка, срок действия, условия, изображение, isHot

**Отзывы:**
- Создать родительский ресурс "Отзывы" (ID: например, 20)
- TV-поля: автор, город, рейтинг, проект, дата, изображение

---

## Шаг 4: Конвертация стилей Tailwind → Bootstrap

### 4.1 Соответствие классов

| Tailwind CSS | Bootstrap 5 | Примечание |
|-------------|-------------|------------|
| `flex` | `d-flex` | |
| `flex-col` | `flex-column` | |
| `items-center` | `align-items-center` | |
| `justify-between` | `justify-content-between` | |
| `gap-4` | `gap-3` | Bootstrap использует другую шкалу |
| `px-4 py-2` | `px-4 py-2` | Одинаково! |
| `text-lg` | `fs-5` | |
| `text-xl` | `fs-4` | |
| `text-2xl` | `fs-3` | |
| `text-3xl` | `fs-2` | |
| `font-bold` | `fw-bold` | |
| `rounded-lg` | `rounded` | |
| `shadow-lg` | `shadow-lg` | Одинаково! |
| `bg-primary` | `bg-primary` | Цвета настраиваются |
| `text-muted-foreground` | `text-muted` | |
| `hidden md:flex` | `d-none d-md-flex` | |
| `grid md:grid-cols-3` | `row` + `col-md-4` | |

### 4.2 Кастомные градиенты
Tailwind: `.gradient-primary` → Bootstrap + Custom CSS:
```css
.gradient-primary {
  background: linear-gradient(135deg, #F97316 0%, #FEC6A1 100%);
}
```

---

## Шаг 5: Создание структуры MODX

### 5.1 Дерево ресурсов
```
Главная (ID: 1) — шаблон: home.html
├── Проекты (ID: 5) — контейнер
│   ├── Дом "Северный" (ID: 6) — шаблон: project-detail.html
│   ├── Баня "Русская традиция" (ID: 7)
│   └── Дом "Скандинавия" (ID: 8)
├── Блог (ID: 10) — шаблон: blog.html
│   ├── Статья 1 (ID: 11) — шаблон: blog-post.html
│   └── Статья 2 (ID: 12)
├── Акции (ID: 15) — шаблон: promotions.html
│   ├── Акция 1 (ID: 16) — шаблон: promotion-detail.html
│   └── Акция 2 (ID: 17)
└── Отзывы (ID: 20) — шаблон: reviews.html
```

### 5.2 Template Variables (TV)

**Для проектов (домов/бань):**
- `project_area` (число) — Площадь в м²
- `project_price` (число) — Цена в рублях
- `project_rooms` (число) — Количество комнат
- `project_type` (список: дом/баня) — Тип объекта
- `project_features` (textarea) — Особенности (по одной на строку)
- `project_gallery` (migx/imageplus) — Галерея изображений
- `project_specs_floors` (число) — Этажей
- `project_specs_walls` (текст) — Материал стен
- `project_specs_roof` (текст) — Кровля
- `project_specs_foundation` (текст) — Фундамент
- `project_specs_buildtime` (текст) — Срок строительства

**Для статей блога:**
- `blog_author` (текст) — Автор
- `blog_date` (дата) — Дата публикации
- `blog_readtime` (текст) — Время чтения
- `blog_category` (список) — Категория
- `blog_excerpt` (textarea) — Краткое описание
- `blog_image` (изображение) — Главное изображение

**Для акций:**
- `promo_discount` (текст) — Размер скидки
- `promo_validuntil` (дата) — Действует до
- `promo_conditions` (textarea) — Условия (по одной на строку)
- `promo_ishot` (чекбокс) — Горячее предложение
- `promo_image` (изображение) — Изображение акции

**Для отзывов:**
- `review_name` (текст) — Имя клиента
- `review_location` (текст) — Город/область
- `review_rating` (число, 1-5) — Оценка
- `review_date` (дата) — Дата отзыва
- `review_project` (текст) — Название проекта
- `review_projecttype` (список: дом/баня) — Тип проекта
- `review_verified` (чекбокс) — Проверенный отзыв
- `review_images` (migx) — Фотографии

---

## Шаг 6: Использование сниппетов MODX

### 6.1 Вывод проектов (pdoResources)
```php
[[!pdoResources?
  &parents=`5`
  &tpl=`projectCard`
  &limit=`6`
  &sortby=`publishedon`
  &sortdir=`DESC`
  &includeTVs=`project_area,project_price,project_type,project_rooms`
]]
```

### 6.2 Фильтрация проектов (mFilter2 или pdoTools)
Установите пакет mFilter2 для фильтрации по TV-полям:
```php
[[!mFilter2?
  &parents=`5`
  &tpl=`projectCard`
  &filters=`project_type,project_area,project_price`
  &suggestionsRadio=`project_type`
  &tplFilter.outer.project_area=`@FILE chunks/filter_area.tpl`
]]
```

### 6.3 Вывод статей блога
```php
[[!pdoResources?
  &parents=`10`
  &tpl=`blogCard`
  &limit=`6`
  &includeTVs=`blog_author,blog_category,blog_readtime,blog_image`
]]
```

### 6.4 Вывод отзывов с фильтрацией
```php
[[!pdoResources?
  &parents=`20`
  &tpl=`reviewCard`
  &limit=`9`
  &includeTVs=`review_rating,review_location,review_project`
  &tvFilters=`review_rating==5`
]]
```

---

## Шаг 7: Миграция интерактивности

### 7.1 Фильтры проектов
**React:** useState + filter()
**MODX:** mFilter2 пакет + AJAX или Vanilla JS:

```javascript
// custom.js
document.querySelectorAll('.filter-button').forEach(btn => {
  btn.addEventListener('click', function() {
    const type = this.dataset.type;
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
      if (type === 'all' || card.dataset.type === type) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});
```

### 7.2 Мобильное меню
**React:** useState для toggle
**MODX:** Bootstrap Navbar (встроенный JS):

```html
<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
  <span class="navbar-toggler-icon"></span>
</button>
<div class="collapse navbar-collapse" id="navbarNav">
  <!-- меню -->
</div>
```

### 7.3 Модальные окна
**React:** useState + Dialog component
**MODX:** Bootstrap Modal:

```html
<button data-bs-toggle="modal" data-bs-target="#reviewModal">Оставить отзыв</button>

<div class="modal fade" id="reviewModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5>Оставить отзыв</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <!-- Форма -->
      </div>
    </div>
  </div>
</div>
```

### 7.4 Формы обратной связи
Используйте пакет **FormIt** для MODX:

```php
[[!FormIt?
  &hooks=`email,FormItSaveForm`
  &emailTo=`info@domabani.ru`
  &emailSubject=`Новая заявка с сайта`
  &validate=`name:required,email:required:email,phone:required`
]]
```

---

## Шаг 8: Адаптация изображений

### React:
```jsx
<img src="https://cdn.poehali.dev/projects/.../file.jpg" />
```

### MODX:
```html
<!-- Через TV -->
[[*project_image]]

<!-- Через MIGX галерею -->
[[pdoResources?
  &parents=`[[*id]]`
  &tpl=`@INLINE <img src="[[+image]]" alt="[[+title]]">`
]]

<!-- Загрузить в /assets/images/ -->
<img src="/assets/images/house-1.jpg" alt="Дом">
```

**Рекомендация:** Скачайте все изображения из CDN и разместите в `/assets/images/`.

---

## Шаг 9: SEO и метатеги

### React (vite + helmet):
Не используется

### MODX:
```html
<title>[[*pagetitle]] | Дома и Бани</title>
<meta name="description" content="[[*description]]">
<meta name="keywords" content="[[*keywords]]">

<!-- Open Graph -->
<meta property="og:title" content="[[*pagetitle]]">
<meta property="og:description" content="[[*description]]">
<meta property="og:image" content="[[*image]]">
```

Установите пакет **SEOPro** для автоматизации.

---

## Шаг 10: Чек-лист конвертации

- [ ] Установлен MODX Revolution 2.8.8
- [ ] Подключен Bootstrap 5 через CDN
- [ ] Созданы шаблоны (home, project-detail, blog, promotions, reviews)
- [ ] Созданы чанки (header, footer, projectCard, blogCard, reviewCard)
- [ ] Созданы TV-поля для всех типов контента
- [ ] Заполнены ресурсы (проекты, статьи, акции, отзывы)
- [ ] Установлены пакеты: pdoTools, mFilter2, FormIt
- [ ] Перенесены изображения в /assets/images/
- [ ] Написаны кастомные CSS (/assets/css/custom.css)
- [ ] Написаны кастомные JS (/assets/js/custom.js)
- [ ] Настроены формы обратной связи
- [ ] Проверена адаптивность на мобильных
- [ ] Настроен SEO (title, description для каждой страницы)
- [ ] Протестированы все страницы и фильтры

---

## Шаг 11: Рекомендуемые пакеты MODX

1. **pdoTools** — быстрый вывод ресурсов (замена getResources)
2. **mFilter2** — фильтрация и сортировка каталога
3. **FormIt** — обработка форм и отправка email
4. **MIGX** — управление галереями изображений
5. **TinyMCE/CKEditor** — визуальный редактор
6. **SEOPro** — автоматизация SEO
7. **Ace** — подсветка синтаксиса в админке
8. **Collections** — удобное управление блогом

---

## Шаг 12: Финальная проверка

### Функционал:
- ✅ Главная страница с hero, проектами, калькулятором
- ✅ Детальная страница проекта с табами и галереей
- ✅ Блог с поиском и фильтрацией по категориям
- ✅ Акции с условиями и датами
- ✅ Отзывы с рейтингом и формой добавления
- ✅ Мобильное меню-бургер
- ✅ Формы обратной связи работают
- ✅ Фильтры проектов работают (тип, площадь, цена)

### Производительность:
- Оптимизируйте изображения (WebP, compression)
- Включите кеширование MODX
- Минифицируйте CSS/JS
- Используйте CDN для Bootstrap

---

## Итоговая структура файлов MODX

```
/
├── assets/
│   ├── css/
│   │   ├── custom.css           # Кастомные стили (градиенты, цвета)
│   │   └── bootstrap.min.css    # (опционально, если локально)
│   ├── js/
│   │   ├── custom.js            # Фильтры, меню, модалки
│   │   └── bootstrap.bundle.min.js
│   └── images/
│       ├── house-1.jpg
│       ├── banya-1.jpg
│       └── ...
├── core/
│   └── components/
│       └── ...
└── manager/
    └── templates/
        ├── home.html
        ├── project-detail.html
        ├── blog.html
        ├── promotions.html
        └── reviews.html
```

---

## Полезные ссылки

- **MODX Documentation:** https://docs.modx.com/
- **Bootstrap 5 Docs:** https://getbootstrap.com/docs/5.3/
- **pdoTools:** https://docs.modx.pro/components/pdotools
- **mFilter2:** https://docs.modx.pro/components/mfilter2
- **FormIt:** https://docs.modx.com/current/en/extras/formit

---

## Заключение

Конвертация React → MODX — это трансформация:
- **Компонентов** → **Чанки**
- **Хуков** → **JavaScript**
- **Роутинга** → **Ресурсы MODX**
- **Tailwind** → **Bootstrap 5**
- **Массивов данных** → **TV-поля**

Следуя этой инструкции, вы получите полнофункциональный сайт на MODX Revolution 2.8.8 с Bootstrap 5, идентичный текущему React-приложению.

---

**Автор:** Юра, poehali.dev  
**Дата:** Январь 2024
