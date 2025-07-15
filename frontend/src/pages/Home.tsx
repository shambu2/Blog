"use client";

import { useState } from "react";
// import "./App.css";

interface Article {
  id: number;
  author: {
    name: string;
    avatar: string;
    initials: string;
  };
  date: string;
  title: string;
  excerpt: string;
  readTime: string;
  category: string;
  image: string;
  isMemberOnly: boolean;
  isBookmarked: boolean;
  selectedForYou?: boolean;
}

const articles: Article[] = [
  {
    id: 1,
    author: {
      name: "Peter V.",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "PV",
    },
    date: "Dec 3, 2023",
    title:
      "How an Ugly Single-Page Website Makes $5,000 a Month with Affiliate Marketing",
    excerpt:
      "No need to create a fancy and modern website with hundreds of pages to make money online. — Making money online is the dream for many...",
    readTime: "3 min read",
    category: "Side Hustle",
    image: "/placeholder.svg?height=200&width=300",
    isMemberOnly: true,
    isBookmarked: false,
  },
  {
    id: 2,
    author: {
      name: "Payam Saderi",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "PS",
    },
    date: "Oct 2, 2023",
    title: "To PM2, or Not to PM2: Embracing Docker for Node.js",
    excerpt:
      "We've got this teeny-tiny service written Node.js, and like all services in the world its availability is very important to us. we're talking BC-era code here! Back in those dark ages, Docker didn't exist yet. We had to...",
    readTime: "4 min read",
    category: "Docker",
    image: "/placeholder.svg?height=200&width=300",
    isMemberOnly: false,
    isBookmarked: false,
    selectedForYou: true,
  },
  {
    id: 3,
    author: {
      name: "Ignacio de Gregorio",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "IG",
    },
    date: "Feb 22, 2024",
    title: "Google Has Finally Dethroned ChatGPT",
    excerpt:
      "They Finally Did It — When you look at what Google has just achieved, it's no wonder OpenAI suddenly released Sora a few hours later to...",
    readTime: "5 min read",
    category: "AI",
    image: "/placeholder.svg?height=200&width=300",
    isMemberOnly: true,
    isBookmarked: false,
  },
];

const Home = () => {
  const [activeTab, setActiveTab] = useState<"for-you" | "following">(
    "for-you"
  );
  const [articleStates, setArticleStates] = useState(articles);

  const toggleBookmark = (articleId: number) => {
    setArticleStates((prev) =>
      prev.map((article) =>
        article.id === articleId
          ? { ...article, isBookmarked: !article.isBookmarked }
          : article
      )
    );
  };
  return (
    <div className="min-h-screen bg-white">
      {/* Header Banner */}
      <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center gap-2">
          <svg
            className="w-5 h-5 text-yellow-600 fill-yellow-600"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span className="text-sm text-gray-700">
            Get unlimited access to the best of Medium for less than $1/week.
          </span>
          <button className="text-sm font-medium text-green-700 hover:underline">
            Become a member
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-8 mb-8 border-b">
          <button
            className={`flex items-center gap-2 pb-4 px-0 border-b-2 transition-colors ${
              activeTab === "for-you"
                ? "border-gray-900 text-gray-900"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => setActiveTab("for-you")}
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            For you
          </button>
          <button
            className={`pb-4 px-0 border-b-2 transition-colors ${
              activeTab === "following"
                ? "border-gray-900 text-gray-900"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => setActiveTab("following")}
          >
            Following
          </button>
        </div>

        {/* Articles */}
        <div className="space-y-8">
          {articleStates.map((article) => (
            <article key={article.id} className="border-b border-gray-100 pb-8">
              {/* Author Info */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600">
                    {article.author.initials}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="font-medium text-gray-900">
                    {article.author.name}
                  </span>
                  <span>·</span>
                  <span>{article.date}</span>
                  {article.isMemberOnly && (
                    <>
                      <svg
                        className="w-3 h-3 text-yellow-600 fill-yellow-600"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <span className="text-yellow-700">Member-only</span>
                    </>
                  )}
                </div>
              </div>

              {/* Article Content */}
              <div className="flex gap-6">
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900 mb-2 leading-tight cursor-pointer hover:text-gray-700">
                    {article.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium hover:bg-gray-200 cursor-pointer">
                        {article.category}
                      </span>
                      <span className="text-sm text-gray-500">
                        {article.readTime}
                      </span>
                      {article.selectedForYou && (
                        <span className="text-sm text-gray-500">
                          · Selected for you
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${
                          article.isBookmarked
                            ? "text-green-600"
                            : "text-gray-400"
                        }`}
                        onClick={() => toggleBookmark(article.id)}
                        title={
                          article.isBookmarked
                            ? "Remove bookmark"
                            : "Add bookmark"
                        }
                      >
                        <svg
                          className={`w-4 h-4 ${
                            article.isBookmarked ? "fill-current" : ""
                          }`}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                        </svg>
                      </button>
                      <button className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-400">
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                      </button>
                      <button className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-400">
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <circle cx="12" cy="12" r="1" />
                          <circle cx="19" cy="12" r="1" />
                          <circle cx="5" cy="12" r="1" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="w-32 h-20 bg-gray-100 rounded flex-shrink-0 overflow-hidden">
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-200 cursor-pointer"
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
