import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ArticlePage, ArtilceReviewPage, FeedPage, JobPage, JobPostingPage, JobSearchPage, LoginPage, NetworkPage, PostPage, ProfilePage, SignupPage, UpdateNamePage } from "@pages";
import { AuthProvider, SearchProvider, PostProvider, ProfileProvider, NetworkProvider, JobProvider } from "@context";
import { ProtectedLayout, RootRedirect, AppLayout } from "@layouts";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PostProvider>
          <ProfileProvider>
            <SearchProvider>
              <NetworkProvider>
                <JobProvider>
                  <Routes>
                    {/* Route for redirecting to feed page when the route is / or to login if there is no token */}
                    <Route path="/" element={<RootRedirect />} />

                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/login-step" element={<UpdateNamePage />} />
                    {/* Protected Routes */}
                    <Route element={<ProtectedLayout />}>
                      <Route element={<AppLayout />}>
                        <Route path="/:username" element={<ProfilePage />} />
                        <Route path="/mynetwork" element={<NetworkPage />} />
                        <Route path="/feed" element={<FeedPage />} />
                        <Route path="/:username/recent-activity/all/" element={<PostPage />} />
                        <Route path="/:username/update/urn:li:activity/:id" element={<PostPage />} />
                        <Route path="/article/edit/" element={<ArticlePage />} />
                        <Route path="/pulse/:title/:fullName/:id" element={<ArtilceReviewPage />} />
                        <Route path="/jobs" element={<JobPage />} />
                        <Route path="/jobs/search" element={<JobSearchPage />} />
                        <Route path="/job-posting/form" element={<JobPostingPage />} />
                      </Route>
                    </Route>
                  </Routes>
                </JobProvider>
              </NetworkProvider>
            </SearchProvider>
          </ProfileProvider>
        </PostProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
