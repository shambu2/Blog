import React, { useEffect, useState } from 'react'


const Posts = () => {
  
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <article className="prose prose-lg max-w-none">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                Taxing Laughter: The Joke Tax Chronicles
              </h1>

              <p className="text-gray-600 mb-8">Posted on August 24, 2023</p>

              <div className="space-y-6 text-gray-800 leading-relaxed">
                <p>
                  Once upon a time, in a far-off land, there was a very lazy king who spent all day lounging on his
                  throne. One day, his advisors came to him with a problem: the kingdom was running out of money.
                </p>

                <p>
                  Jokester began sneaking into the castle in the middle of the night and leaving jokes all over the
                  place: under the king's pillow, in his soup, even in the royal toilet. The king was furious, but he
                  couldn't seem to stop Jokester.
                </p>

                <p>
                  And then, one day, the people of the kingdom discovered that the jokes left by Jokester were so funny
                  that they couldn't help but laugh. And once they started laughing, they couldn't stop.
                </p>
              </div>
            </article>
          </div>

         
        </div>
      </div>
    </div>
    
  )
}

export default Posts