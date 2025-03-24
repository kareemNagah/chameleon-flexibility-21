
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Clock, User, ChevronRight, MessageCircle } from 'lucide-react';

// Sample blog posts data
const blogPosts = [
  {
    id: 1,
    title: 'How to Build Habits That Last',
    excerpt: 'Learn the science behind habit formation and discover techniques to build lasting habits that stick.',
    author: 'Alex Morgan',
    date: 'June 15, 2023',
    readTime: '5 min',
    category: 'Productivity',
    comments: 12,
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&ixlib=rb-4.0.3'
  },
  {
    id: 2,
    title: 'The Power of the Pomodoro Technique',
    excerpt: 'Discover how working in focused bursts can dramatically improve your productivity and mental clarity.',
    author: 'Jamie Chen',
    date: 'July 22, 2023',
    readTime: '7 min',
    category: 'Focus',
    comments: 8,
    image: 'https://images.unsplash.com/photo-1513128034602-7814ccaddd4e?auto=format&fit=crop&q=80&ixlib=rb-4.0.3'
  },
  {
    id: 3,
    title: 'Mindfulness for Better Productivity',
    excerpt: 'How practicing mindfulness can help you stay focused, reduce stress, and accomplish more of what matters.',
    author: 'Sam Wilson',
    date: 'August 5, 2023',
    readTime: '6 min',
    category: 'Mindfulness',
    comments: 15,
    image: 'https://images.unsplash.com/photo-1506126279646-a697353d3166?auto=format&fit=crop&q=80&ixlib=rb-4.0.3'
  },
  {
    id: 4,
    title: 'The Art of Task Prioritization',
    excerpt: 'Learn how to identify what tasks truly matter and how to organize your day for maximum impact.',
    author: 'Taylor Rodriguez',
    date: 'September 10, 2023',
    readTime: '8 min',
    category: 'Organization',
    comments: 6,
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&ixlib=rb-4.0.3'
  },
  {
    id: 5,
    title: 'Finding Balance in a Digital World',
    excerpt: 'Strategies for maintaining a healthy relationship with technology while staying productive.',
    author: 'Jordan Lee',
    date: 'October 3, 2023',
    readTime: '9 min',
    category: 'Digital Wellbeing',
    comments: 11,
    image: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&q=80&ixlib=rb-4.0.3'
  },
  {
    id: 6,
    title: 'Morning Routines of Successful People',
    excerpt: 'Discover the morning habits that set successful individuals up for productive and fulfilling days.',
    author: 'Casey Johnson',
    date: 'November 15, 2023',
    readTime: '6 min',
    category: 'Habits',
    comments: 19,
    image: 'https://images.unsplash.com/photo-1484627147104-f5197bcd6651?auto=format&fit=crop&q=80&ixlib=rb-4.0.3'
  }
];

// Category pills for filtering
const categories = [
  'All',
  'Productivity',
  'Focus',
  'Mindfulness',
  'Organization',
  'Digital Wellbeing',
  'Habits'
];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);

  // Filter posts based on active category
  useEffect(() => {
    if (activeCategory === 'All') {
      setFilteredPosts(blogPosts);
    } else {
      const filtered = blogPosts.filter(post => post.category === activeCategory);
      setFilteredPosts(filtered);
    }
  }, [activeCategory]);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Blog Header */}
      <div className="pt-28 pb-12 bg-gradient-to-r from-flex-green/5 to-flex-yellow/5">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-flex-text mb-4">Flex Blog</h1>
          <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto">
            Insights, tips, and stories to help you build better habits, boost productivity, and achieve your goals.
          </p>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? 'bg-flex-green text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Featured Post */}
      <div className="container mx-auto px-4 py-12">
        <div className="bg-gradient-to-br from-flex-green/10 to-flex-yellow/10 rounded-2xl overflow-hidden shadow-sm">
          <div className="grid md:grid-cols-2 gap-6 p-6">
            <div className="h-64 md:h-auto bg-gray-200 rounded-xl overflow-hidden">
              <img 
                src={blogPosts[0].image} 
                alt={blogPosts[0].title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="inline-block px-3 py-1 bg-flex-green/20 text-flex-green rounded-full text-xs font-medium mb-4">
                {blogPosts[0].category}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-flex-text mb-3">{blogPosts[0].title}</h2>
              <p className="text-gray-600 mb-6">{blogPosts[0].excerpt}</p>
              <div className="flex items-center text-sm text-gray-500 mb-6">
                <div className="flex items-center mr-4">
                  <User size={14} className="mr-1" />
                  <span>{blogPosts[0].author}</span>
                </div>
                <div className="flex items-center mr-4">
                  <Clock size={14} className="mr-1" />
                  <span>{blogPosts[0].readTime}</span>
                </div>
                <div className="flex items-center">
                  <MessageCircle size={14} className="mr-1" />
                  <span>{blogPosts[0].comments} comments</span>
                </div>
              </div>
              <Button className="w-fit" variant="default">
                Read Article <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Blog Posts Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.slice(1).map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-center mb-2">
                  <span className="inline-block px-3 py-1 bg-flex-green/10 text-flex-green rounded-full text-xs font-medium">
                    {post.category}
                  </span>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock size={12} className="mr-1" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <CardTitle className="text-xl">{post.title}</CardTitle>
                <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-gray-500">
                  <User size={14} className="mr-1" />
                  <span>{post.author}</span>
                  <Separator orientation="vertical" className="mx-2 h-4" />
                  <MessageCircle size={14} className="mr-1" />
                  <span>{post.comments} comments</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="text-flex-green hover:text-flex-green/90 hover:bg-flex-green/10 p-0">
                  Read More <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {/* Load More Button */}
        <div className="flex justify-center mt-12">
          <Button variant="outline" className="rounded-full px-8">
            Load More Articles
          </Button>
        </div>
      </div>
      
      {/* Newsletter Signup */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-br from-flex-yellow/10 to-flex-orange/10 rounded-2xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-flex-text mb-4">Stay Updated</h3>
            <p className="text-gray-600 mb-8">Subscribe to our newsletter for the latest productivity tips, habit-building strategies, and exclusive content.</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-flex-green/30"
              />
              <Button className="bg-flex-gradient hover:opacity-90">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Blog;
