import React, { useState, useEffect } from 'react';
import { Star, BookOpen, Users, MessageSquare, Search, Filter, Heart, Share2, Calendar, Award, TrendingUp, User, Plus, Eye, ThumbsUp, Clock, BookmarkPlus } from 'lucide-react';

  const [activeTab, setActiveTab] = useState('home');
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [discussions, setDiscussions] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, text: '', bookId: null });
  const [userProfile, setUserProfile] = useState({ name: 'Sarah Mitchell', booksRead: 47, reviewsWritten: 23, discussions: 89 });
  

  // Sample data
  const featuredBooks = [
    { id: 1, title: "The Seven Husbands of Evelyn Hugo", author: "Taylor Jenkins Reid", cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop", rating: 4.8, reviews: 1247, genre: "Fiction", description: "A captivating tale of love, ambition, and the price of fame in old Hollywood." },
    { id: 2, title: "Where the Crawdads Sing", author: "Delia Owens", cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop", rating: 4.6, reviews: 892, genre: "Mystery", description: "A coming-of-age mystery set in the marshlands of North Carolina." },
    { id: 3, title: "The Midnight Library", author: "Matt Haig", cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop", rating: 4.7, reviews: 1156, genre: "Fantasy", description: "Between life and death there is a library, and within that library, the shelves go on forever." },
    { id: 4, title: "Educated", author: "Tara Westover", cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop", rating: 4.9, reviews: 2103, genre: "Memoir", description: "A powerful memoir about education, transformation, and the struggle for self-invention." },
    { id: 5, title: "The Song of Achilles", author: "Madeline Miller", cover: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=300&h=400&fit=crop", rating: 4.8, reviews: 1689, genre: "Historical Fiction", description: "A tale of gods, kings, immortal fame, and the human heart." },
    { id: 6, title: "Atomic Habits", author: "James Clear", cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop", rating: 4.7, reviews: 934, genre: "Self-Help", description: "An easy and proven way to build good habits and break bad ones." }
  ];

  const bookClubs = [
    { id: 1, name: "Modern Fiction Lovers", members: 1247, currentBook: "The Seven Husbands of Evelyn Hugo", nextMeeting: "2025-09-20", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
    { id: 2, name: "Mystery & Thriller Society", members: 892, currentBook: "Gone Girl", nextMeeting: "2025-09-18", image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=100&h=100&fit=crop" },
    { id: 3, name: "Fantasy Realm", members: 1456, currentBook: "The Name of the Wind", nextMeeting: "2025-09-22", image: "https://images.unsplash.com/photo-1518373714866-3f1478910cc0?w=100&h=100&fit=crop" },
    { id: 4, name: "Non-Fiction Enthusiasts", members: 678, currentBook: "Sapiens", nextMeeting: "2025-09-25", image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=100&h=100&fit=crop" }
  ];

  const genres = ['all', 'Fiction', 'Mystery', 'Fantasy', 'Historical Fiction', 'Romance', 'Self-Help', 'Memoir', 'Science Fiction'];

  const sampleDiscussions = [
    { id: 1, title: "What did you think about the ending of 'The Seven Husbands'?", author: "Emma Davis", replies: 23, likes: 45, timeAgo: "2 hours ago", bookTitle: "The Seven Husbands of Evelyn Hugo" },
    { id: 2, title: "Character development in Where the Crawdads Sing", author: "Michael Chen", replies: 17, likes: 32, timeAgo: "5 hours ago", bookTitle: "Where the Crawdads Sing" },
    { id: 3, title: "The philosophy behind The Midnight Library", author: "Sophie Wilson", replies: 41, likes: 78, timeAgo: "1 day ago", bookTitle: "The Midnight Library" },
    { id: 4, title: "Real-life applications from Atomic Habits", author: "David Park", replies: 56, likes: 89, timeAgo: "2 days ago", bookTitle: "Atomic Habits" }
  ];

  const filteredBooks = featuredBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === 'all' || book.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const StarRating = ({ rating, interactive = false, onRatingChange }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={() => interactive && onRatingChange && onRatingChange(star)}
          />
        ))}
      </div>
    );
  };

  const BookCard = ({ book, onClick, variant = 'default' }) => (
    <div 
      className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 group ${variant === 'featured' ? 'border-2 border-purple-200' : ''}`}
      onClick={() => onClick(book)}
    >
      <div className="relative overflow-hidden rounded-t-2xl">
        <img src={book.cover} alt={book.title} className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300" />
        <div className="absolute top-4 right-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Heart className="w-5 h-5 text-red-500" />
          </div>
        </div>
        {variant === 'featured' && (
          <div className="absolute top-4 left-4">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Featured
            </div>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">{book.title}</h3>
        <p className="text-gray-600 mb-3">{book.author}</p>
        <div className="flex items-center justify-between mb-3">
          <StarRating rating={book.rating} />
          <span className="text-sm text-gray-500">{book.reviews} reviews</span>
        </div>
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">{book.description}</p>
        <div className="flex justify-between items-center">
          <span className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {book.genre}
          </span>
          <div className="flex gap-2">
            <BookmarkPlus className="w-5 h-5 text-gray-400 hover:text-purple-500 transition-colors" />
            <Share2 className="w-5 h-5 text-gray-400 hover:text-purple-500 transition-colors" />
          </div>
        </div>
      </div>
    </div>
  );

  const BookModal = ({ book, onClose }) => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-3xl font-bold text-gray-800">{book.title}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <img src={book.cover} alt={book.title} className="w-full rounded-2xl shadow-lg" />
            </div>
            <div className="md:col-span-2 space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">About this book</h3>
                <p className="text-gray-600 leading-relaxed">{book.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Author</p>
                  <p className="font-semibold text-gray-800">{book.author}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Genre</p>
                  <p className="font-semibold text-gray-800">{book.genre}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Rating</p>
                  <div className="flex items-center gap-2">
                    <StarRating rating={book.rating} />
                    <span className="font-semibold text-gray-800">{book.rating}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Reviews</p>
                  <p className="font-semibold text-gray-800">{book.reviews}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all">
                  Join Discussion
                </button>
                <button className="border-2 border-purple-500 text-purple-500 px-6 py-3 rounded-2xl font-semibold hover:bg-purple-50 transition-all">
                  Add to Reading List
                </button>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h4 className="text-xl font-semibold text-gray-800 mb-4">Write a Review</h4>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">Your Rating</p>
                <StarRating 
                  rating={newReview.rating} 
                  interactive={true}
                  onRatingChange={(rating) => setNewReview({...newReview, rating})}
                />
              </div>
              <textarea
                placeholder="Share your thoughts about this book..."
                className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none resize-none h-32"
                value={newReview.text}
                onChange={(e) => setNewReview({...newReview, text: e.target.value})}
              />
              <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all">
                Submit Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const DiscussionCard = ({ discussion }) => (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800 mb-2 hover:text-purple-600 cursor-pointer transition-colors">
            {discussion.title}
          </h3>
          <p className="text-sm text-gray-500 mb-2">discussing: <span className="font-medium text-purple-600">{discussion.bookTitle}</span></p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <User className="w-4 h-4" />
              {discussion.author}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {discussion.timeAgo}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          <span className="flex items-center gap-2 text-sm text-gray-600 hover:text-purple-600 cursor-pointer transition-colors">
            <MessageSquare className="w-4 h-4" />
            {discussion.replies} replies
          </span>
          <span className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-500 cursor-pointer transition-colors">
            <ThumbsUp className="w-4 h-4" />
            {discussion.likes} likes
          </span>
        </div>
        <button className="text-purple-500 hover:text-purple-700 font-medium text-sm transition-colors">
          Join Discussion →
        </button>
      </div>
    </div>
  );

  const ClubCard = ({ club }) => (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="flex items-start gap-4 mb-4">
        <img src={club.image} alt={club.name} className="w-16 h-16 rounded-2xl object-cover" />
        <div className="flex-1">
          <h3 className="font-bold text-gray-800 mb-1">{club.name}</h3>
          <p className="text-sm text-gray-600 flex items-center gap-1">
            <Users className="w-4 h-4" />
            {club.members} members
          </p>
        </div>
      </div>
      <div className="space-y-3">
        <div>
          <p className="text-sm text-gray-500">Currently Reading</p>
          <p className="font-medium text-gray-800">{club.currentBook}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Next Meeting</p>
          <p className="font-medium text-gray-800 flex items-center gap-1">
            <Calendar className="w-4 h-4 text-purple-500" />
            {club.nextMeeting}
          </p>
        </div>
        <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-2xl font-semibold hover:shadow-lg transition-all">
          Join Club
        </button>
      </div>
    </div>
  );

  const ProfileStats = () => (
    <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
          <User className="w-8 h-8" />
        </div>
        <div>
          <h3 className="text-xl font-bold">{userProfile.name}</h3>
          <p className="text-white/80">Book Enthusiast</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold">{userProfile.booksRead}</div>
          <div className="text-sm text-white/80">Books Read</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">{userProfile.reviewsWritten}</div>
          <div className="text-sm text-white/80">Reviews</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">{userProfile.discussions}</div>
          <div className="text-sm text-white/80">Discussions</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  LitHub
                </h1>
                <p className="text-xs text-gray-500">Where Stories Connect</p>
              </div>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              {['home', 'books', 'clubs', 'discussions'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`capitalize font-medium transition-colors ${
                    activeTab === tab 
                      ? 'text-purple-600 border-b-2 border-purple-600' 
                      : 'text-gray-600 hover:text-purple-600'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <div className="relative hidden sm:block">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search books..."
                  className="pl-10 pr-4 py-2 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none bg-white/50 backdrop-blur-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-2xl font-medium hover:shadow-lg transition-all">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <div className="md:hidden bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around">
          {['home', 'books', 'clubs', 'discussions'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`capitalize py-2 px-4 rounded-xl font-medium transition-all ${
                activeTab === tab 
                  ? 'bg-purple-100 text-purple-600' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

     <button
  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
  className="p-2 rounded-full border border-gray-300 dark:border-gray-600"
>
  {theme === "light" ? "🌙" : "☀️"}
</button>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'home' && (
          <div className="space-y-12">
            {/* Hero Section */}
            <section className="text-center py-12">
              <h1 className="text-5xl font-bold text-gray-800 mb-6">
                Welcome to Your Literary Journey
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Connect with fellow book lovers, discover your next great read, and dive into meaningful discussions about the stories that shape us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-2xl transition-all transform hover:-translate-y-1">
                  Start Exploring
                </button>
                <button className="border-2 border-purple-500 text-purple-500 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-purple-50 transition-all">
                  Join a Book Club
                </button>
              </div>
            </section>

            {/* Stats Section */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20">
                <BookOpen className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-800 mb-2">10K+</div>
                <div className="text-gray-600">Books Catalogued</div>
              </div>
              <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20">
                <Users className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-800 mb-2">25K+</div>
                <div className="text-gray-600">Active Members</div>
              </div>
              <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20">
                <MessageSquare className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-800 mb-2">50K+</div>
                <div className="text-gray-600">Discussions</div>
              </div>
              <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20">
                <Award className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-800 mb-2">200+</div>
                <div className="text-gray-600">Book Clubs</div>
              </div>
            </section>

            {/* Featured Books */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">Featured Books</h2>
                  <p className="text-gray-600">Discover the most talked-about books this month</p>
                </div>
                <button className="flex items-center gap-2 text-purple-600 font-medium hover:text-purple-700 transition-colors">
                  View All <TrendingUp className="w-5 h-5" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {featuredBooks.slice(0, 4).map((book) => (
                  <BookCard key={book.id} book={book} onClick={setSelectedBook} variant="featured" />
                ))}
              </div>
            </section>

            {/* Profile & Recent Activity */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div>
                <ProfileStats />
              </div>
              <div className="lg:col-span-2">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Recent Discussions</h3>
                <div className="space-y-4">
                  {sampleDiscussions.slice(0, 3).map((discussion) => (
                    <DiscussionCard key={discussion.id} discussion={discussion} />
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'books' && (
          <div className="space-y-8">
            {/* Search and Filter */}
            <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1">
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search books by title or author..."
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-gray-500" />
                  <select
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                    className="px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none bg-white"
                  >
                    {genres.map((genre) => (
                      <option key={genre} value={genre}>
                        {genre === 'all' ? 'All Genres' : genre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Books Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} onClick={setSelectedBook} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'clubs' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Book Clubs</h2>
              <p className="text-gray-600 mb-8">Join a community of readers who share your passion</p>
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-lg transition-all flex items-center gap-2 mx-auto">
                <Plus className="w-5 h-5" />
                Create New Club
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {bookClubs.map((club) => (
                <ClubCard key={club.id} club={club} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'discussions' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Discussions</h2>
                <p className="text-gray-600">Join conversations about your favorite books</p>
              </div>
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Start Discussion
              </button>
            </div>
            
            <div className="space-y-6">
              {sampleDiscussions.map((discussion) => (
                <DiscussionCard key={discussion.id} discussion={discussion} />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Book Modal */}
      {selectedBook && (
        <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} />
      )}
    </div>
  );

export default BookClubSite;