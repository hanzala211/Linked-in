import { FeedIdentityModule, Post, PostLoader } from "@components"
import { useAuth, usePost, useProfile, useSearch } from "@context"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

export const PostPage: React.FC = () => {
  const { userData } = useAuth()
  const { selectedProfile, setSelectedProfile } = useProfile()
  const { handleSearch } = useSearch()
  const { isAllPostsLoading, getAllPosts, allPosts, setIsAllPostsLoading, getPost } = usePost()
  const params = useParams()
  const isCurrentProfile = params.username === userData?.userName;

  useEffect(() => {
    if (!params.username || params.username === userData?.userName) return;

    const controller = new AbortController();
    const fetchProfile = async () => {
      if (!selectedProfile) {
        try {
          const data = await handleSearch(controller.signal, params.username || "");
          setSelectedProfile(data[0] || null);
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      }
    };

    fetchProfile();
    return () => controller.abort();
  }, [params.username])

  useEffect(() => {
    if (params.id && allPosts.length === 0) {
      getPost(params.id || "")
    }
  }, [])

  useEffect(() => {
    const userId = isCurrentProfile ? userData?._id : selectedProfile?._id;
    if (!userId || params.id) {
      setIsAllPostsLoading(false)
      return;
    }
    getAllPosts(userId)
  }, [selectedProfile?._id, userData?._id, params.username])

  return <section className="grid lg:grid-cols-[0.7fr_2fr] gap-5 lg:gap-0 grid-cols-1 pt-20 mx-auto w-full xl:max-w-[55%] max-w-[98%]">
    <div className="lg:block hidden">
      <FeedIdentityModule data={isCurrentProfile ? userData : selectedProfile} />
    </div>
    <div className={`bg-white rounded-lg ${!params.id ? "md:p-4" : "p-0"} w-full xl:max-w-[93%]`}>
      {!params.id && <h1 className="text-[20px] p-3 md:p-0 mb-2">All activity</h1>}
      <div className="space-y-2">
        {isAllPostsLoading ? Array.from({ length: 6 }, (_, i) => (
          <PostLoader key={i} />
        )) : allPosts.map((item, index) => (
          <Post item={item} key={index} />
        ))}
      </div>
    </div>
  </section>
}