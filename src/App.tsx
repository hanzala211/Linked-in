import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FeedPage, LoginPage, ProfilePage, SignupPage, UpdateNamePage } from "@pages";
import { AuthProvider, SearchProvider, PostProvider, ProfileProvider } from "@context";
import { ProtectedLayout, RootRedirect, AppLayout } from "@layouts";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SearchProvider>
          <PostProvider>
            <ProfileProvider>
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
                    <Route path="/feed" element={<FeedPage />} />
                  </Route>
                </Route>
              </Routes>
            </ProfileProvider>
          </PostProvider>
        </SearchProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
