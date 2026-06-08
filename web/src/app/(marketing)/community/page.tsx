'use client';

import { Card } from "@/components/ui/card";
import { Calendar, MessageSquare, Search, Star, ThumbsUp, TrendingUp, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Page() {
  const [activeTab, setActiveTab] = useState<'recent' | 'popular' | 'answered'>('recent');
  
  const communityData = [
    { id: 'active-members', icon: Users, figure: '10,234', description: 'Active Members', iconColor: '#1E17ED', },
    { id: 'forum-posts', icon: MessageSquare, figure: '1,456', description: 'Forum Posts', iconColor: '#388C68', },
    { id: 'trades-completed', icon: TrendingUp, figure: '25,678', description: 'Trades Completed', iconColor: '#8924E7', },
    { id: 'upcoming-events', icon: Calendar, figure: '12', description: 'Upcoming Events', iconColor: '#EA6510', }
  ]

  const forumPosts = [
    { id: 1, title: 'Tips for successful first-time trades?', excerpt: 'I just joined BarterHub and wondering what makes a trade successful...', author: 'Sarah M.', time: '2h ago', likes: 23, comments: 15, tag: 'Getting Started', tagColor: 'bg-neutral-100 text-neutral-600' },
    { id: 2, title: 'Amazing trade story - Web design for organic produce!', excerpt: 'Just completed my first trade and it was incredible. Traded my design services...', author: 'Mike J.', time: '5h ago', likes: 45, comments: 8, tag: 'Success Stories', tagColor: 'bg-neutral-100 text-neutral-600' },
    { id: 3, title: 'How to value handmade items?', excerpt: 'I make handmade furniture and having trouble pricing in credits...', author: 'Emma W.', time: '1d ago', likes: 18, comments: 12, tag: 'Valuation', tagColor: 'bg-neutral-100 text-neutral-600' },
  ];

  const upcomingEvents = [
    { id: 1, title: 'Virtual Barter Meetup', date: 'Dec 20, 2025', time: '6:00 PM PST', attending: 45, type: 'Online' },
    { id: 2, title: 'SF Bay Area Trade Fair', date: 'Jan 5, 2026', time: '10:00 AM PST', attending: 120, type: 'In-Person' },
  ];

  const successStories = [
    { id: 1, name: 'Sarah Chen', avatar: 'SC', avatarBg: '#A5B6B1', trade: 'Traded graphic design skills for 6 months of yoga classes. Saved $800 and made a lifelong friend!', rating: 5 },
    { id: 2, name: 'Marcus R.', avatar: 'MR', avatarBg: '#B6A5C4', trade: 'Exchanged homemade bread and pastries for car repairs. Both parties were thrilled!', rating: 5 },
  ];

  const topTraders = [
    { rank: 1, name: 'Alex Chen', trades: 156, rating: 5.0, rankColor: 'bg-yellow-400' },
    { rank: 2, name: 'Maria Garcia', trades: 143, rating: 4.9, rankColor: 'bg-neutral-300' },
    { rank: 3, name: 'David Kim', trades: 128, rating: 4.9, rankColor: 'bg-orange-400' },
  ];

  const popularCategories = [
    { name: 'Getting Started', count: 45 },
    { name: 'Success Stories', count: 32 },
    { name: 'Tips & Tricks', count: 28 },
    { name: 'Valuation Help', count: 23 },
    { name: 'General Discussion', count: 67 },
  ];

  return (
    <>
      <section className='bg-[#A5B6B1] w-full py-12 md:py-20'>
        <div className='max-w-360 mx-auto px-4 md:px-8 grid grid-cols-1 items-center gap-12 md:gap-20 lg:gap-25'>
          <div className='text-center'>
            <h1 className='text-2xl md:text-3xl lg:text-4xl font-poppins font-normal text-white mb-4'>Community Hub</h1>
            <p className='text-white text-base lg:text-lg'>Connect, learn, and grow with fellow traders from around the world</p>
          </div>
        </div>
      </section>

      <section className='bg-[#e5e5e5] w-full py-10 md:py-16 flex flex-col gap-20'>
        <div className='w-full max-w-360 mx-auto px-4 md:px-8 flex flex-col gap-8'>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {communityData.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.id} className="w-full bg-white rounded-lg shadow-xs border-neutral-100 px-4 py-8 flex flex-col items-center gap-6">
                  <Icon size={28} style={{ color: item.iconColor }} />
                  <p className="text-2xl font-medium text-neutral-700">{item.figure}</p>
                  <p className="text-sm text-neutral-500">{item.description}</p>
                </Card>
              );
            })}
          </div>

          <div className='flex flex-col lg:flex-row gap-6 w-full'>
      
            {/* Main */}
            <main className='flex flex-col gap-6 w-full lg:w-[65%]'>
              {/* Community Forum */}
              <Card className="w-full bg-white rounded-lg shadow-xs border-neutral-100 px-3 lg:px-6 py-6 flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-base lg:text-lg font-medium text-neutral-700">Community Forum</h2>
                  <Button className="bg-neutral-800 text-white text-sm px-2.5 lg:px-4 cursor-pointer hover:bg-neutral-700">New Post</Button>
                </div>

                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <Input placeholder="Search discussions..." className="pl-9 bg-neutral-50 border-neutral-200 text-sm" />
                </div>

                <Tabs defaultValue="recent" value={activeTab} onValueChange={(value: string) => { if ( value === "recent" || value === "popular" || value === "answered" ) { setActiveTab(value); } }} className="w-full">
                  <TabsList className="bg-neutral-100 rounded-xl">
                    <TabsTrigger value="recent" className={`cursor-pointer rounded-lg font-normal ${activeTab === 'recent' ? 'bg-white text-neutral-600' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'}`}>Recent</TabsTrigger>
                    <TabsTrigger value="popular" className={`cursor-pointer rounded-lg font-normal ${activeTab === 'popular' ? 'bg-white text-neutral-600' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'}`}>Popular</TabsTrigger>
                    <TabsTrigger value="answered" className={`cursor-pointer rounded-lg font-normal ${activeTab === 'answered' ? 'bg-white text-neutral-600' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'}`}>Answered</TabsTrigger>
                  </TabsList>

                  {(['recent', 'popular', 'answered'] as const).map((tab) => (
                    <TabsContent key={tab} value={tab} className="flex flex-col gap-3 mt-4">
                      {forumPosts.map((post) => (
                        <div key={post.id} className="border border-neutral-100 rounded-lg px-4 py-4 hover:shadow-sm transition-shadow cursor-pointer flex flex-col gap-2">
                          <div className="flex flex-col lg:flex-row items-start justify-between gap-2">
                            <p className="text-sm font-medium text-neutral-700">{post.title}</p>
                            <span className="text-xs px-2 py-1 rounded-full bg-neutral-100 text-neutral-500 shrink-0">{post.tag}</span>
                          </div>
                          <p className="text-xs text-neutral-400 line-clamp-1">{post.excerpt}</p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-xs text-neutral-400">by {post.author} · {post.time}</span>
                            <div className="flex items-center gap-3 text-xs text-neutral-400">
                              <span className="flex items-center gap-1"><ThumbsUp size={12} /> {post.likes}</span>
                              <span className="flex items-center gap-1"><MessageSquare size={12} /> {post.comments}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </TabsContent>
                  ))}
                </Tabs>
              </Card>
              
              <Card className="w-full bg-white rounded-lg shadow-xs border-neutral-100 px-3 lg:px-6 py-6 flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-neutral-700">Upcoming Events</h2>
                  <Button className="text-sm font-normal px-2 lg:px-4 border border-neutral-200 cursor-pointer">View Calendar</Button>
                </div>

                <div className="flex flex-col gap-4">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="border border-neutral-200 border-l-2 border-l-blue-500 p-2 pl-4 rounded-xl flex flex-col gap-3">
                      <div className="flex items-start justify-between">
                        <p className="text-sm font-medium text-neutral-700">{event.title}</p>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium shrink-0 ${event.type === 'Online' ? 'bg-neutral-800 text-white' : 'bg-neutral-800 text-white'}`}>
                          {event.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-neutral-400">
                        <Calendar size={12} />
                        <span>{event.date} · {event.time}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-neutral-400">{event.attending} attending</span>
                        <Button className="bg-neutral-800 text-white text-xs px-4 py-1 h-auto hover:bg-neutral-700">RSVP</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="w-full bg-white rounded-lg shadow-xs border-neutral-100 px-3 lg:px-6 py-6 flex flex-col gap-5">
                <h2 className="text-lg font-medium text-neutral-700">Success Stories</h2>
                <div className="flex flex-col gap-4">
                  {successStories.map((story) => (
                    <div key={story.id} className="rounded-lg bg-neutral-50 border border-neutral-100 px-4 py-4 flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-medium shrink-0" style={{ backgroundColor: story.avatarBg }}>
                          {story.avatar}
                        </div>
                        <div className="flex flex-col">
                          <p className="text-sm font-medium text-neutral-700">{story.name}</p>
                          <div className="flex gap-0.5">
                            {Array.from({ length: story.rating }).map((_, i) => (
                              <Star key={i} size={10} className="text-yellow-400 fill-yellow-400" />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-neutral-500 leading-relaxed">{story.trade}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </main>

            {/* Sidebar */}
            <aside className='flex flex-col gap-6 w-full lg:w-[35%]'>
              <Card className="w-full bg-white rounded-lg shadow-xs border-neutral-100 px-3 lg:px-6 py-6 flex flex-col gap-5">
                <h2 className="text-lg font-medium text-neutral-700">Top Traders This Month</h2>
                <div className="flex flex-col gap-4">
                  {topTraders.map((trader) => (
                    <div key={trader.rank} className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 ${trader.rankColor}`}>
                        {trader.rank}
                      </div>
                      <div className="w-8 h-8 rounded-full bg-neutral-200 shrink-0" />
                      <div className="flex flex-col flex-1">
                        <p className="text-sm font-medium text-neutral-700">{trader.name}</p>
                        <p className="text-xs text-neutral-400">{trader.trades} trades · ★ {trader.rating}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full text-sm border-neutral-200 cursor-pointer">View Leaderboard</Button>
              </Card>

              <Card className="w-full bg-white rounded-lg shadow-xs border-neutral-100 px-3 lg:px-6 py-6 flex flex-col gap-5">
                <h2 className="text-lg font-medium text-neutral-700">Popular Categories</h2>
                <div className="flex flex-col gap-1">
                  {popularCategories.map((cat) => (
                    <div key={cat.name} className="flex items-center justify-between py-2 border-b border-neutral-50 last:border-0 cursor-pointer hover:text-neutral-900 transition-colors">
                      <p className="text-sm font-medium text-neutral-700">{cat.name}</p>
                      <span className="text-xs text-neutral-400">{cat.count}</span>
                    </div>
                  ))}
                </div>
              </Card>


              <Card className="w-full bg-blue-50 rounded-xl shadow-xs border-blue-200 px-3 lg:px-6 py-6 flex flex-col gap-10">
                <h2 className="text-lg font-medium text-neutral-700">Community Guidelines</h2>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  Be respectful, honest, and helpful. Read our full guidelines to create a positive trading environment.
                </p>
                <Button className="w-full text-sm font-normal bg-white border-neutral-200 cursor-pointer">Read Guidelines</Button>
              </Card>
            </aside>

          </div>
        </div>
      </section>
    </>
  )
}