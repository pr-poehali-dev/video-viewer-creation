import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface Video {
  id: number;
  title: string;
  genre: string;
  year: number;
  rating: number;
  duration: string;
  thumbnail: string;
  trailer: string;
  isFeatured?: boolean;
  isNew?: boolean;
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Все');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState('Главная');

  const genres = ['Все', 'Боевик', 'Драма', 'Научная фантастика', 'Комедия', 'Триллер', 'Документальный'];

  const videos: Video[] = [
    {
      id: 1,
      title: 'Киберпанк 2077',
      genre: 'Научная фантастика',
      year: 2024,
      rating: 8.9,
      duration: '2ч 15м',
      thumbnail: 'https://cdn.poehali.dev/projects/73ee0877-dd14-4505-836b-bef7674e64c4/files/03a69053-9896-4238-aa60-9f22f37da5fa.jpg',
      trailer: 'https://example.com/trailer1.mp4',
      isFeatured: true,
      isNew: true
    },
    {
      id: 2,
      title: 'Взрывная Миссия',
      genre: 'Боевик',
      year: 2024,
      rating: 7.8,
      duration: '1ч 58м',
      thumbnail: 'https://cdn.poehali.dev/projects/73ee0877-dd14-4505-836b-bef7674e64c4/files/f2a947bc-113a-430e-9a18-08d348dfd876.jpg',
      trailer: 'https://example.com/trailer2.mp4',
      isNew: true
    },
    {
      id: 3,
      title: 'Эхо Прошлого',
      genre: 'Драма',
      year: 2023,
      rating: 9.1,
      duration: '2ч 30м',
      thumbnail: 'https://cdn.poehali.dev/projects/73ee0877-dd14-4505-836b-bef7674e64c4/files/526b3f12-e3eb-4c6c-a37d-4f10e7814a86.jpg',
      trailer: 'https://example.com/trailer3.mp4'
    },
    {
      id: 4,
      title: 'Город Теней',
      genre: 'Триллер',
      year: 2024,
      rating: 8.2,
      duration: '1ч 45м',
      thumbnail: 'https://cdn.poehali.dev/projects/73ee0877-dd14-4505-836b-bef7674e64c4/files/03a69053-9896-4238-aa60-9f22f37da5fa.jpg',
      trailer: 'https://example.com/trailer4.mp4'
    },
    {
      id: 5,
      title: 'Последний Рубеж',
      genre: 'Боевик',
      year: 2023,
      rating: 7.5,
      duration: '2ч 05м',
      thumbnail: 'https://cdn.poehali.dev/projects/73ee0877-dd14-4505-836b-bef7674e64c4/files/f2a947bc-113a-430e-9a18-08d348dfd876.jpg',
      trailer: 'https://example.com/trailer5.mp4'
    },
    {
      id: 6,
      title: 'Искусственный Разум',
      genre: 'Научная фантастика',
      year: 2024,
      rating: 8.7,
      duration: '2ч 20м',
      thumbnail: 'https://cdn.poehali.dev/projects/73ee0877-dd14-4505-836b-bef7674e64c4/files/03a69053-9896-4238-aa60-9f22f37da5fa.jpg',
      trailer: 'https://example.com/trailer6.mp4',
      isNew: true
    }
  ];

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === 'Все' || video.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const featuredVideo = videos.find(v => v.isFeatured);
  const newVideos = videos.filter(v => v.isNew);
  const popularVideos = videos.filter(v => v.rating >= 8.0);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  const getDisplayVideos = () => {
    switch (activeTab) {
      case 'Каталог':
        return filteredVideos;
      case 'Популярное':
        return popularVideos;
      case 'Новинки':
        return newVideos;
      case 'Избранное':
        return videos.filter(v => favorites.includes(v.id));
      default:
        return filteredVideos;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Icon name="Film" size={32} className="text-primary" />
              <h1 className="text-3xl font-bold">CineStream</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Поиск фильмов..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-secondary border-border"
                />
              </div>
              <Button variant="ghost" size="icon">
                <Icon name="Bell" size={24} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="User" size={24} />
              </Button>
            </div>
          </div>
          
          <nav className="flex gap-6">
            {['Главная', 'Каталог', 'Жанры', 'Популярное', 'Новинки', 'Подборки', 'Избранное'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeTab === tab ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="pt-32 pb-12">
        {activeTab === 'Главная' && featuredVideo && (
          <section className="relative h-[70vh] mb-12">
            <div className="absolute inset-0">
              <img 
                src={featuredVideo.thumbnail} 
                alt={featuredVideo.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 gradient-overlay" />
            </div>
            <div className="relative container mx-auto px-4 h-full flex flex-col justify-end pb-12 animate-fade-in">
              <Badge className="w-fit mb-4 bg-primary text-primary-foreground">Рекомендуем</Badge>
              <h2 className="text-6xl font-bold mb-4 max-w-2xl">{featuredVideo.title}</h2>
              <div className="flex items-center gap-4 mb-6 text-sm">
                <span className="flex items-center gap-1">
                  <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                  {featuredVideo.rating}
                </span>
                <span>{featuredVideo.year}</span>
                <span>{featuredVideo.duration}</span>
                <Badge variant="outline">{featuredVideo.genre}</Badge>
              </div>
              <div className="flex gap-4">
                <Button size="lg" className="gap-2">
                  <Icon name="Play" size={20} />
                  Смотреть
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  <Icon name="Info" size={20} />
                  Подробнее
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => toggleFavorite(featuredVideo.id)}
                >
                  <Icon 
                    name={favorites.includes(featuredVideo.id) ? "Heart" : "Heart"} 
                    size={20}
                    className={favorites.includes(featuredVideo.id) ? "fill-primary text-primary" : ""}
                  />
                </Button>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'Жанры' && (
          <section className="container mx-auto px-4 mb-12">
            <h2 className="text-3xl font-bold mb-6">Выберите жанр</h2>
            <div className="flex flex-wrap gap-3">
              {genres.map((genre) => (
                <Button
                  key={genre}
                  onClick={() => setSelectedGenre(genre)}
                  variant={selectedGenre === genre ? "default" : "outline"}
                  size="lg"
                >
                  {genre}
                </Button>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'Подборки' && (
          <section className="container mx-auto px-4 mb-12">
            <h2 className="text-3xl font-bold mb-6">Тематические подборки</h2>
            <div className="grid gap-6">
              {['Лучшее в 2024', 'Кино выходного дня', 'Шедевры режиссуры', 'Для всей семьи'].map((collection) => (
                <Card key={collection} className="p-6 bg-card hover-scale cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{collection}</h3>
                      <p className="text-muted-foreground">12 фильмов в подборке</p>
                    </div>
                    <Icon name="ChevronRight" size={32} className="text-muted-foreground" />
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        <section className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">
              {activeTab === 'Избранное' ? 'Избранное' : 
               activeTab === 'Новинки' ? 'Новинки' :
               activeTab === 'Популярное' ? 'Популярное' : 'Каталог'}
            </h2>
            {activeTab === 'Жанры' && selectedGenre !== 'Все' && (
              <Button variant="ghost" onClick={() => setSelectedGenre('Все')}>
                Сбросить фильтр
              </Button>
            )}
          </div>

          {getDisplayVideos().length === 0 ? (
            <div className="text-center py-20">
              <Icon name="Film" size={64} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">Ничего не найдено</h3>
              <p className="text-muted-foreground">
                {activeTab === 'Избранное' 
                  ? 'Добавьте фильмы в избранное, нажав на иконку сердца'
                  : 'Попробуйте изменить параметры поиска'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {getDisplayVideos().map((video, index) => (
                <Card 
                  key={video.id} 
                  className="group overflow-hidden bg-card border-border hover-scale cursor-pointer animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative aspect-[2/3] overflow-hidden">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button size="lg" className="gap-2">
                        <Icon name="Play" size={24} />
                        Трейлер
                      </Button>
                    </div>
                    {video.isNew && (
                      <Badge className="absolute top-3 right-3 bg-primary">Новинка</Badge>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(video.id);
                      }}
                      className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm rounded-full p-2 hover:bg-black/70 transition-colors"
                    >
                      <Icon 
                        name="Heart" 
                        size={20}
                        className={favorites.includes(video.id) ? "fill-primary text-primary" : "text-white"}
                      />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2 line-clamp-1">{video.title}</h3>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                      <span>{video.year}</span>
                      <span className="flex items-center gap-1">
                        <Icon name="Star" size={14} className="text-yellow-500 fill-yellow-500" />
                        {video.rating}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">{video.genre}</Badge>
                      <span className="text-xs text-muted-foreground">{video.duration}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Index;
