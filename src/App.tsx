import { useState, useEffect, useRef } from 'react';
import { Post } from './types';
import { mockPosts } from './mockData';
import { Sun, Moon, Search, AlertCircle, X, ArrowRight, BookOpen, Zap, Star, ChevronDown } from 'lucide-react';

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  'https://blinky-blogging-app-wfey-bawanis-projects.vercel.app/api';
// ────────────────────────────────────────────────────────────────
// Navbar
// ────────────────────────────────────────────────────────────────
function Navbar({
  darkMode,
  toggleDark,
  onScrollToPosts,
}: {
  darkMode: boolean;
  toggleDark: () => void;
  onScrollToPosts: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : 'navbar-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <img src="/logo.png" alt="BlinkyBlog logo" className="w-8 h-8 object-contain rounded-lg" />
          <span className={`text-xl font-black tracking-tight transition-colors duration-300 ${scrolled ? 'text-white' : 'text-white'}`}>
            Blinky<span style={{ color: '#a892ff' }}>Blog</span>
          </span>
        </div>

        {/* Desktop Nav Links */}
        <div className={`hidden md:flex items-center gap-8 text-sm font-medium transition-colors duration-300 ${scrolled ? 'text-gray-300' : 'text-white/80'}`}>
          <a href="#" className="hover:text-white transition-colors">Home</a>
          <a href="#" className="hover:text-white transition-colors">Topics</a>
          <a href="#" className="hover:text-white transition-colors">Writers</a>
          <a href="#" className="hover:text-white transition-colors">About</a>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            id="search-toggle-btn"
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 rounded-full transition-all hover:bg-white/10"
            aria-label="Toggle search"
          >
            <Search className="w-5 h-5 text-white/80" />
          </button>

          <button
            id="theme-toggle-btn"
            onClick={toggleDark}
            className="p-2 rounded-full transition-all hover:bg-white/10"
            aria-label="Toggle theme"
          >
            {darkMode
              ? <Sun className="w-5 h-5 text-yellow-400" />
              : <Moon className="w-5 h-5 text-white/80" />}
          </button>

          <button
            id="start-reading-btn"
            onClick={onScrollToPosts}
            className="btn-primary hidden md:inline-flex"
            style={{ padding: '10px 22px', fontSize: '0.85rem' }}
          >
            Start Reading
          </button>
        </div>
      </div>

      {/* Search Dropdown */}
      <div className={`transition-all duration-300 overflow-hidden ${searchOpen ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="max-w-7xl mx-auto px-6 pb-4">
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              id="global-search-input"
              type="text"
              placeholder="Search articles..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-11 pr-5 py-3 rounded-2xl text-sm outline-none"
              style={{
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'white',
              }}
              autoFocus
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

// ────────────────────────────────────────────────────────────────
// Hero Section
// ────────────────────────────────────────────────────────────────
function HeroSection({ onScrollToPosts }: { onScrollToPosts: () => void }) {
  return (
    <section id="hero" className="hero-section">
      {/* Background orbs */}
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />

      {/* Grid overlay */}
      <div className="hero-grid" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center" style={{ maxWidth: '900px' }}>


        {/* Heading */}
        <h1 className="hero-title">
          Where ideas{' '}
          <span className="hero-title-gradient">ignite</span>{' '}
          and knowledge{' '}
          <span className="hero-title-gradient">flows</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle">
          Dive into deep-dive articles, tutorials, and stories crafted by passionate engineers.
          From architecture patterns to cutting-edge tools — all in one place.
        </p>

        {/* CTA Buttons */}
        <div className="hero-cta-group">
          <button
            id="hero-read-stories-btn"
            className="btn-primary"
            onClick={onScrollToPosts}
          >
            <BookOpen className="w-4 h-4" />
            Read Stories
          </button>
          <button
            id="hero-explore-btn"
            className="btn-secondary"
            onClick={onScrollToPosts}
          >
            Explore Topics
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Stats */}
        <div className="hero-stats" style={{ animationDelay: '0.65s' }}>
          <div className="hero-stat-item">
            <div className="hero-stat-number">50+</div>
            <div className="hero-stat-label">Articles</div>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat-item">
            <div className="hero-stat-number">12K</div>
            <div className="hero-stat-label">Readers</div>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat-item">
            <div className="hero-stat-number">4.9</div>
            <div className="hero-stat-label flex items-center gap-1 justify-center">
              <Star className="w-3 h-3 inline" />Rating
            </div>
          </div>
        </div>

        {/* Floating author avatars */}
        <div
          className="flex items-center gap-3"
          style={{ animation: 'fade-slide-up 0.7s ease 0.8s both' }}
        >
          <div className="flex -space-x-3">
            {['#6c47ff', '#a855f7', '#ec4899', '#38bdf8'].map((color, i) => (
              <div
                key={i}
                className="w-9 h-9 rounded-full border-2 border-white/20 flex items-center justify-center text-white text-xs font-bold"
                style={{ background: color }}
              >
                {['A', 'B', 'C', 'D'][i]}
              </div>
            ))}
          </div>
          <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.875rem' }}>
            Join <strong style={{ color: 'white' }}>12,000+</strong> readers
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        id="hero-scroll-btn"
        className="hero-scroll-indicator"
        onClick={onScrollToPosts}
        aria-label="Scroll to posts"
      >
        <div className="scroll-mouse">
          <div className="scroll-mouse-dot" />
        </div>
        <span>Scroll</span>
        <ChevronDown className="w-4 h-4" />
      </button>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────
// Featured Post
// ────────────────────────────────────────────────────────────────
function FeaturedPost({ post, onClick }: { post: Post; onClick: () => void }) {
  return (
    <div className="featured-post" onClick={onClick} role="button" tabIndex={0} id={`featured-post-${post.id}`}>
      <img
        src={post.imageUrl}
        alt={post.title}
        loading="eager"
        onError={(e) => {
          e.currentTarget.src = 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=600&fit=crop';
        }}
      />
      <div className="featured-post-overlay" />
      <div className="featured-post-content">
        <div className="featured-badge">
          <Star className="w-3 h-3" />
          Featured
        </div>
        <h2 className="featured-post-title">{post.title}</h2>
        <p className="featured-post-excerpt">{post.message}</p>
        <div className="featured-post-meta">
          <span>5 min read</span>
          <span>·</span>
          <span>Technology</span>
          <span>·</span>
          <span>Just now</span>
          <span className="read-more-link" style={{ color: '#a892ff', marginLeft: 'auto' }}>
            Read article <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────
// Post Card
// ────────────────────────────────────────────────────────────────
function PostCard({ post, onClick, index }: { post: Post; onClick: () => void; index: number }) {
  const categories = ['Engineering', 'Design', 'Technology', 'Career'];
  const readTimes = ['4 min', '6 min', '5 min', '8 min'];

  return (
    <article
      className="post-card"
      onClick={onClick}
      id={`post-card-${post.id}`}
      style={{ animation: `fade-slide-up 0.5s ease ${0.1 + index * 0.1}s both` }}
    >
      <div className="post-card-image">
        <img
          src={post.imageUrl}
          alt={post.title}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop';
          }}
        />
        <div className="post-card-category">{categories[index % categories.length]}</div>
      </div>
      <div className="post-card-body">
        <div className="post-card-meta">
          <span>{readTimes[index % readTimes.length]} read</span>
          <div className="post-card-meta-dot" />
          <span>June 2026</span>
        </div>
        <h3 className="post-card-title">{post.title}</h3>
        <p className="post-card-excerpt">{post.message}</p>
        <div className="post-card-footer">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
            style={{ background: 'linear-gradient(135deg, #6c47ff, #a855f7)' }}
          >
            {post.title.charAt(0)}
          </div>
          <span className="read-more-link">
            Read more <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </article>
  );
}

// ────────────────────────────────────────────────────────────────
// Loading Skeleton
// ────────────────────────────────────────────────────────────────
function LoadingSkeleton() {
  return (
    <div className="space-y-12">
      <div className="skeleton w-full h-[520px] rounded-3xl" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-4">
            <div className="skeleton h-[220px] rounded-2xl" />
            <div className="skeleton h-4 rounded w-1/3" />
            <div className="skeleton h-6 rounded" />
            <div className="skeleton h-4 rounded" />
            <div className="skeleton h-4 rounded w-4/5" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────
// Post Modal
// ────────────────────────────────────────────────────────────────
function PostModal({ post, onClose }: { post: Post; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <div className="modal-overlay" id="post-modal">
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal-content">
        <button className="modal-close-btn" onClick={onClose} aria-label="Close" id="modal-close-btn">
          <X className="w-5 h-5" />
        </button>

        {/* Hero image */}
        <div style={{ height: '360px', overflow: 'hidden', borderRadius: '28px 28px 0 0', position: 'relative' }}>
          <img
            src={post.imageUrl}
            alt={post.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=600&fit=crop';
            }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)' }} />
        </div>

        {/* Content */}
        <div className="p-10 md:p-14">
          {/* Meta */}
          <div className="flex items-center gap-3 mb-6" style={{ fontSize: '0.8rem', color: 'var(--muted)', fontWeight: 500 }}>
            <span
              className="px-3 py-1 rounded-full font-bold text-xs uppercase tracking-wider"
              style={{ background: 'rgba(108,71,255,0.12)', color: 'var(--primary)' }}
            >
              Technology
            </span>
            <span>·</span>
            <span>5 min read</span>
            <span>·</span>
            <span>June 2026</span>
          </div>

          <h1
            style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, color: 'var(--text)', lineHeight: 1.2, marginBottom: '24px' }}
          >
            {post.title}
          </h1>

          {/* Author row */}
          <div className="flex items-center gap-3 mb-10 pb-10" style={{ borderBottom: '1px solid var(--card-border)' }}>
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold"
              style={{ background: 'linear-gradient(135deg, #6c47ff, #a855f7)' }}
            >
              {post.title.charAt(0)}
            </div>
            <div>
              <div style={{ fontWeight: 700, color: 'var(--text)', fontSize: '0.9rem' }}>Blinky Author</div>
              <div style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>Senior Engineer · Blinky Blog</div>
            </div>
          </div>

          <div style={{ fontSize: '1.1rem', lineHeight: 1.85, color: 'var(--muted)', whiteSpace: 'pre-wrap' }}>
            {post.message}
          </div>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────
// Main App
// ────────────────────────────────────────────────────────────────
function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const postsRef = useRef<HTMLDivElement>(null);

  const scrollToPosts = () => {
    postsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // System theme
  useEffect(() => {
    if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/posts`);
        if (!res.ok) throw new Error('API not available');
        let data = await res.json();
        if (!Array.isArray(data)) data = [data];
        setPosts(data.length > 0 ? data : mockPosts);
      } catch {
        setPosts(mockPosts);
        setError('Using demo content — API is offline.');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const featuredPost = filteredPosts[0];
  const remainingPosts = filteredPosts.slice(1);

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      {/* Navbar */}
      <Navbar
        darkMode={darkMode}
        toggleDark={() => setDarkMode(!darkMode)}
        onScrollToPosts={scrollToPosts}
      />

      {/* Hero */}
      <HeroSection onScrollToPosts={scrollToPosts} />

      {/* Posts Section */}
      <main
        ref={postsRef}
        id="posts-section"
        className="max-w-7xl mx-auto px-6 py-20"
      >
        {/* Section Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="section-label">Latest Articles</div>
            <h2 className="section-title">Insights &amp; Stories</h2>
          </div>
          {/* Inline search for posts */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--muted)' }} />
            <input
              id="posts-search-input"
              type="text"
              placeholder="Search articles…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-5 py-3 rounded-2xl text-sm outline-none transition-all"
              style={{
                background: 'var(--card)',
                border: '1px solid var(--card-border)',
                color: 'var(--text)',
              }}
            />
          </div>
        </div>

        {/* Error Banner */}
        {error && (
          <div
            className="mb-10 p-4 rounded-2xl flex items-start gap-3"
            style={{
              background: 'rgba(251, 191, 36, 0.08)',
              border: '1px solid rgba(251, 191, 36, 0.25)',
              color: '#fbbf24',
            }}
          >
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Content */}
        {loading ? (
          <LoadingSkeleton />
        ) : filteredPosts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <div className="w-20 h-20 rounded-3xl flex items-center justify-center"
              style={{ background: 'rgba(108,71,255,0.1)' }}>
              <Search className="w-9 h-9" style={{ color: 'var(--primary)' }} />
            </div>
            <h2 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>No results found</h2>
            <p style={{ color: 'var(--muted)' }}>Try a different search term.</p>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Featured */}
            {featuredPost && (
              <FeaturedPost post={featuredPost} onClick={() => setSelectedPost(featuredPost)} />
            )}

            {/* Grid */}
            {remainingPosts.length > 0 && (
              <>
                <div className="mb-2">
                  <div className="section-label">More to Explore</div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {remainingPosts.map((post, i) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      index={i}
                      onClick={() => setSelectedPost(post)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </main>

      {/* Newsletter Section */}
      <section
        id="newsletter-section"
        className="relative overflow-hidden py-24 px-6"
        style={{
          background: 'linear-gradient(135deg, #0f0e17 0%, #1a0a3c 50%, #0d0b2a 100%)',
        }}
      >
        <div className="hero-orb" style={{ width: 400, height: 400, background: 'radial-gradient(circle, #6c47ff 0%, transparent 70%)', top: -100, left: -100, opacity: 0.3, position: 'absolute' }} />
        <div className="hero-orb" style={{ width: 300, height: 300, background: 'radial-gradient(circle, #a855f7 0%, transparent 70%)', bottom: -80, right: -80, opacity: 0.3, position: 'absolute' }} />

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <div className="hero-badge" style={{ display: 'inline-flex', margin: '0 auto 24px' }}>
            <Zap className="w-3.5 h-3.5 text-purple-400" />
            Newsletter
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, color: 'white', marginBottom: 16, lineHeight: 1.2 }}>
            Stay in the loop
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.05rem', marginBottom: 36, lineHeight: 1.7 }}>
            Get the latest articles, tutorials, and insights delivered straight to your inbox — no spam, ever.
          </p>
          <div className="flex gap-3 flex-col sm:flex-row justify-center max-w-lg mx-auto">
            <input
              id="newsletter-email-input"
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-5 py-4 rounded-2xl text-sm outline-none"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'white',
                backdropFilter: 'blur(10px)',
              }}
            />
            <button
              id="newsletter-subscribe-btn"
              className="btn-primary"
              style={{ whiteSpace: 'nowrap', padding: '16px 28px' }}
            >
              Subscribe
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem', marginTop: 16 }}>
            Join 12,000+ developers already subscribed.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="site-footer"
        className="py-12 px-6"
        style={{ background: '#0a0914', borderTop: '1px solid rgba(108,71,255,0.12)' }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="BlinkyBlog logo" className="w-8 h-8 object-contain rounded-xl" />
              <span className="text-lg font-black text-white">
                Blinky<span style={{ color: '#a892ff' }}>Blog</span>
              </span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem' }}>
              © {new Date().getFullYear()} BlinkyBlog. Crafted with ❤️ for developers.
            </p>
          </div>

          <div className="flex gap-8" style={{ fontSize: '0.85rem' }}>
            {['Twitter', 'GitHub', 'LinkedIn', 'RSS'].map((link) => (
              <a
                key={link}
                href="#"
                id={`footer-${link.toLowerCase()}-link`}
                style={{ color: 'rgba(255,255,255,0.45)', fontWeight: 500, textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#a892ff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* Post Modal */}
      {selectedPost && (
        <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </div>
  );
}

export default App;
