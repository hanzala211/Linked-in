import { CreatePostFeed, FeedIdentityModule, FeedSuggestions, Post, PostLoader } from "@components"
import { useEffect } from "react"
import { titleChanger } from "@helpers"
import { useAuth, usePost } from "@context"
import InfiniteScroll from 'react-infinite-scroller';
import { FadeLoader } from "react-spinners";


export const FeedPage: React.FC = () => {
  const { getFeedPosts, feedPosts, hasMore, isFeedPostsLoading } = usePost()
  const { userData } = useAuth()

  useEffect(() => {
    titleChanger("Feed")
    if (feedPosts.length === 0) {
      getFeedPosts();
    }
  }, [])

  return <section className="grid lg:grid-cols-[0.9fr_2fr_1.4fr] md:grid-cols-[1fr_2fr] gap-5 lg:gap-0 grid-cols-1 pt-20 mx-auto w-full xl:max-w-[77%] max-w-[98%]">
    {/* First Column */}
    <FeedIdentityModule data={userData} />

    {/* Second Column */}
    <div className="w-full md:max-w-[97%] relative space-y-2 max-w-full">
      <InfiniteScroll
        pageStart={0}
        loadMore={getFeedPosts}
        hasMore={hasMore}
        loader={<div className="absolute -bottom-20 left-1/2 -translate-x-1/2" key={0}><FadeLoader color="gray" /></div>}
        className="flex flex-col gap-2 relative"
      >
        <CreatePostFeed />
        {!isFeedPostsLoading ? feedPosts.map((item, index) => (
          <Post key={index} item={item} />
        )) : Array.from({ length: 5 }, (_, index) => (
          <PostLoader key={index} />
        ))
        }
      </InfiniteScroll>
    </div>

    {/* Third Column */}
    <div className="w-full xl:max-w-[70%] lg:max-w-[90%] lg:block hidden">
      <FeedSuggestions />
    </div>


  </section >
}