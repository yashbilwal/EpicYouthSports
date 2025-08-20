// src/pages/BlogDetail.tsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, Clock, ArrowLeft, Share, Facebook, Twitter, Linkedin, Heart, MessageCircle, Bookmark } from 'lucide-react';
import blogPosts from '../content/blogPosts.json';

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  metaTitle: string;
  metaDescription: string;
}

interface SubscriptionStatus {
  message: string;
  isError: boolean;
}

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<SubscriptionStatus | null>(null);

  useEffect(() => {
    // Find the current post
    const currentPost = blogPosts.find((p: BlogPost) => p.id === Number(id));
    setPost(currentPost || null);
    
    if (currentPost) {
      // Set initial like count (random for demo)
      setLikeCount(Math.floor(Math.random() * 100) + 20);
      
      // Find related posts (same category, excluding current post)
      const related = blogPosts
        .filter((p: BlogPost) => p.category === currentPost.category && p.id !== currentPost.id)
        .slice(0, 3);
      setRelatedPosts(related);
    }
  }, [id]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const sharePost = (platform: string) => {
    const url = window.location.href;
    const title = post?.title || '';
    
    let shareUrl;
    switch(platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      default:
        return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setStatus({ message: "Please enter a valid email", isError: true });
      return;
    }

    setStatus({ message: "Sending...", isError: false });

    try {
      const response = await fetch("https://epicyouthsports.onrender.com/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus({ message: "Subscribed successfully! 🎉", isError: false });
        setEmail("");
      } else {
        setStatus({ message: "Subscription failed. Please try again.", isError: true });
      }
    } catch (error) {
      console.error(error);
      setStatus({ message: "Error connecting to server.", isError: true });
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Post not found</h2>
          <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist or has been moved.</p>
          <Link 
            to="/blog" 
            className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm py-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            to="/blog" 
            className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
        </div>
      </nav>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Featured Image */}
          <div className="relative h-64 md:h-80 lg:h-96">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {post.category}
              </span>
            </div>
          </div>

          {/* Article Content */}
          <div className="p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 mb-6 text-gray-600">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                <span className="text-sm">{post.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span className="text-sm">{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span className="text-sm">{post.readTime}</span>
              </div>
            </div>

            {/* Excerpt */}
            <p className="text-lg text-gray-700 mb-8 leading-relaxed border-l-4 border-blue-600 pl-4 py-2 bg-blue-50 rounded-r">
              {post.excerpt}
            </p>

            {/* Engagement Buttons */}
            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isLiked 
                    ? 'bg-red-100 text-red-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                <span>{likeCount}</span>
              </button>
              
              <div className="relative">
                <button
                  onClick={() => setIsShareMenuOpen(!isShareMenuOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Share className="h-5 w-5" />
                  <span>Share</span>
                </button>
                
                {isShareMenuOpen && (
                  <div className="absolute left-0 mt-2 bg-white rounded-lg shadow-lg p-3 z-10 flex space-x-2">
                    <button
                      onClick={() => sharePost('facebook')}
                      className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                      aria-label="Share on Facebook"
                    >
                      <Facebook className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => sharePost('twitter')}
                      className="p-2 rounded-full bg-blue-400 text-white hover:bg-blue-500 transition-colors"
                      aria-label="Share on Twitter"
                    >
                      <Twitter className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => sharePost('linkedin')}
                      className="p-2 rounded-full bg-blue-800 text-white hover:bg-blue-900 transition-colors"
                      aria-label="Share on LinkedIn"
                    >
                      <Linkedin className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Article Content */}
            <div 
              className="prose prose-lg max-w-none text-gray-800"
              style={{
                lineHeight: '1.7',
                fontFamily: 'Inter, system-ui, sans-serif'
              }}
            >
              <div 
                dangerouslySetInnerHTML={{ __html: post.content }} 
                style={{
                  fontSize: '1.125rem'
                }}
              />
            </div>

            {/* Author Bio */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    {post.author.split(' ').map((name) => name[0]).join('')}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{post.author}</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Coach at Epic Youth Sports with years of experience training young athletes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPosts.map(relatedPost => (
              <article key={relatedPost.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <Link to={`/blog/${relatedPost.id}`} className="block h-full">
                  <img
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-5">
                    <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded mb-3">
                      {relatedPost.category}
                    </span>
                    <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                    <div className="flex items-center text-xs text-gray-500">
                      <span>{formatDate(relatedPost.date)}</span>
                      <span className="mx-2">•</span>
                      <span>{relatedPost.readTime}</span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Subscribe Section */}
      <section className="py-12 bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Stay in the Game</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Get exclusive updates, early access to new programs, special offers, and tips
            to help your young athlete succeed.
          </p>

          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-6 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-700 transition-colors whitespace-nowrap"
                  disabled={status?.message === "Sending..."}
                >
                  {status?.message === "Sending..." ? "Sending..." : "Subscribe Now"}
                </button>
              </div>
              {status && (
                <p className={`mt-4 text-sm ${status.isError ? 'text-red-500' : 'text-green-600'}`}>
                  {status.message}
                </p>
              )}
              <p className="text-sm text-gray-600 mt-4">
                No spam, just the good stuff. Unsubscribe anytime.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-10"
        aria-label="Back to top"
      >
        ↑
      </button>
    </div>
  );
};

export default BlogDetail;