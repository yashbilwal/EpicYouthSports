import { useState } from 'react';
import { useRef } from "react";
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import blogPosts from '../content/blogPosts.json';

const Blog = () => {
  // const blogPosts = [
  //   {
  //     id: 1,
  //     title: "5 Essential Basketball Skills Every Young Player Should Master",
  //     excerpt: "Discover the fundamental basketball skills that form the foundation of great players. From dribbling to shooting, we break down what kids need to focus on first.",
  //     image: "https://images.pexels.com/photos/2834009/pexels-photo-2834009.jpeg?auto=compress&cs=tinysrgb&w=600",
  //     author: "Coach Michael Rodriguez",
  //     date: "March 15, 2025",
  //     category: "Basketball Tips",
  //     readTime: "5 min read"
  //   },
  //   {
  //     id: 2,
  //     title: "Building Confidence Through Youth Sports: A Parent's Guide",
  //     excerpt: "Learn how sports participation can dramatically boost your child's self-confidence and what you can do as a parent to support their journey.",
  //     image: "https://images.pexels.com/photos/8654089/pexels-photo-8654089.jpeg?auto=compress&cs=tinysrgb&w=600",
  //     author: "Coach Emily Chen",
  //     date: "March 12, 2025",
  //     category: "Parenting",
  //     readTime: "7 min read"
  //   },
  //   {
  //     id: 3,
  //     title: "Volleyball Fundamentals: Setting Your Child Up for Success",
  //     excerpt: "From serving to spiking, understand the key volleyball skills that will help your child excel on the court and build lasting friendships.",
  //     image: "https://images.pexels.com/photos/8654092/pexels-photo-8654092.jpeg?auto=compress&cs=tinysrgb&w=600",
  //     author: "Coach Sarah Thompson",
  //     date: "March 10, 2025",
  //     category: "Volleyball Tips",
  //     readTime: "6 min read"
  //   },
  //   {
  //     id: 4,
  //     title: "The Benefits of Team Sports for Child Development",
  //     excerpt: "Explore how team sports contribute to physical, mental, and social development in children, backed by research and real-world examples.",
  //     image: "https://images.pexels.com/photos/8654097/pexels-photo-8654097.jpeg?auto=compress&cs=tinysrgb&w=600",
  //     author: "Coach James Wilson",
  //     date: "March 8, 2025",
  //     category: "Child Development",
  //     readTime: "8 min read"
  //   },
  //   {
  //     id: 5,
  //     title: "Preparing Your Child for Their First Sports Program",
  //     excerpt: "Tips and strategies to help your child feel confident and excited about joining their first organized sports program.",
  //     image: "https://images.pexels.com/photos/2834011/pexels-photo-2834011.jpeg?auto=compress&cs=tinysrgb&w=600",
  //     author: "Coach Emily Chen",
  //     date: "March 5, 2025",
  //     category: "Getting Started",
  //     readTime: "4 min read"
  //   },
  //   {
  //     id: 6,
  //     title: "Nutrition Tips for Young Athletes",
  //     excerpt: "Fuel your child's performance with proper nutrition. Learn what foods support athletic development and when to eat them.",
  //     image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600",
  //     author: "Coach Michael Rodriguez",
  //     date: "March 3, 2025",
  //     category: "Health & Nutrition",
  //     readTime: "6 min read"
  //   },
  //   {
  //     id: 6,
  //     title: "Nutrition Tips for Young Athletes",
  //     excerpt: "Fuel your child's performance with proper nutrition. Learn what foods support athletic development and when to eat them.",
  //     image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600",
  //     author: "Coach Michael Rodriguez",
  //     date: "March 3, 2025",
  //     category: "Health & Nutrition",
  //     readTime: "6 min read"
  //   }
  // ];

  const emailRef = useRef<HTMLInputElement>(null);

  const handleSubscribe = async () => {
    if (!emailRef.current) return;
    const email = emailRef.current.value.trim();
    if (!email) {
      alert("Please enter a valid email");
      return;
    }

    try {
      const response = await fetch("https://epicyouthsports.onrender.com/subscribe", { // update to your backend URL
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        alert("Subscribed successfully! 🎉");
        emailRef.current.value = "";
      } else {
        alert("Subscription failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Error connecting to server.");
    }
  };

  const categories = [
    "All Posts",
    "Basketball Tips",
    "Volleyball Tips",
    "Child Development",
    "Parenting",
    "Getting Started",
    "Health & Nutrition"
  ];

  const [selectedCategory, setSelectedCategory] = useState("All Posts");
  const [visibleCount, setVisibleCount] = useState(6);

  const filteredPosts = selectedCategory === "All Posts"
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPost = [...filteredPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )[0];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-epic-blue to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-heading font-bold text-4xl md:text-6xl mb-6">
              Epic Sports <span className="text-energy-yellow">Blog</span>
            </h1>
            <p className="font-body text-xl md:text-2xl text-gray-100 max-w-4xl mx-auto leading-relaxed">
              Expert tips, parenting advice, and insights to help your young athlete thrive both on and off the court.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Categories Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-body font-medium transition-colors duration-200 ${category === selectedCategory
                  ? 'bg-epic-blue text-white'
                  : 'bg-white text-slate-gray hover:bg-epic-blue hover:text-white border border-gray-300'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Featured Post */}
          {filteredPosts.length > 0 && (
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12 hover:shadow-2xl transition-shadow duration-300">
              <div className="md:flex md:h-[450px]"> {/* fixed total height for consistency */}
                <div className="md:w-1/2 h-64 md:h-full">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover" // ensures image fills container perfectly
                  />
                </div>
                <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center space-x-4 mb-4">
                      <span className="bg-epic-blue text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Featured
                      </span>
                      <span className="bg-energy-yellow text-slate-gray px-3 py-1 rounded-full text-sm font-semibold">
                        {featuredPost.category}
                      </span>
                    </div>
                    <h2 className="font-heading font-bold text-3xl md:text-4xl text-slate-gray mb-4 leading-tight line-clamp-2">
                      {featuredPost.title}
                    </h2>
                    <p className="font-body text-light-gray text-lg mb-6 leading-relaxed line-clamp-4">
                      {featuredPost.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-light-gray">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {featuredPost.author}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {featuredPost.date}
                      </div>
                    </div>
                    <Link
                      to={`/blog/${featuredPost.id}`}
                      className="inline-flex items-center text-epic-blue font-semibold hover:text-blue-700 transition-colors duration-200"
                    >
                      Read More
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Blog Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.slice(1, visibleCount).map((post) => (
              <article key={post.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-epic-blue text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-heading font-bold text-xl text-slate-gray mb-3 leading-tight hover:text-epic-blue transition-colors duration-200">
                    <Link to={`/blog/${post.id}`}>
                      {post.title}
                    </Link>
                  </h3>
                  <p className="font-body text-light-gray mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-light-gray">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {post.author}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {post.date}
                      </div>
                    </div>
                    <span className="text-epic-blue font-semibold">{post.readTime}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Load More Button */}
          {visibleCount < filteredPosts.length && (
            <div className="text-center mt-12">
              <button
                onClick={() => setVisibleCount(prev => prev + 3)}
                className="bg-epic-blue text-white px-8 py-4 rounded-lg font-heading font-bold text-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Load More Articles
              </button>
            </div>
          )}
        </div>
      </section>


      {/* Newsletter Signup */}
      <section className="py-20 bg-gradient-to-br from-epic-blue to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-4xl md:text-5xl mb-6">
            Stay Updated with Expert Tips
          </h2>
          <p className="font-body text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
            Get the latest articles, training tips, and parenting advice delivered straight to your inbox.
            No spam, just valuable content to help your young athlete succeed.
          </p>

          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubscribe();
              }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <input
                ref={emailRef}
                type="email"
                placeholder="Enter your email address"
                required
                className="flex-1 px-6 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-epic-blue focus:border-transparent text-slate-gray"
              />
              <button
                type="submit"
                className="bg-epic-blue text-white px-8 py-4 rounded-lg font-heading font-bold hover:bg-blue-700 transition-colors duration-200 whitespace-nowrap"
              >
                Subscribe Now
              </button>
            </form>
            <p className="text-sm text-gray-600 mt-4">
              Join 1,200+ parents who get our weekly newsletter
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;