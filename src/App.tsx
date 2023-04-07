import Loading from "@components/loading/loading";
import { useAppDispatch, useAppSelector } from "@hooks/useRedux";
import MainLayout from "@layouts/main.layout";
import LandingPage from "@pages/landing/landing";
import LeaderboardPage from "@pages/leaderboard/leaderboard";
import { fetchProfile } from "@states/user/ProfileSlice";
import { useEffect } from "react";
import { Route } from "wouter";

function App() {
  const profile = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProfile());
  }, []);

  return (
    <MainLayout>
      <main className="flex">
        <article className="w-3/4 py-6 pr-8">
          <Route path="/leaderboard">
            <LeaderboardPage />
          </Route>

          <Route path="/">
            <LandingPage />
          </Route>
        </article>

        <aside className="flex w-1/4 flex-col gap-y-4 py-6">
          <div className="sticky top-24 flex flex-col items-center rounded-lg border bg-white py-8 shadow-sm duration-300 hover:shadow-lg">
            {profile.status == "loading" && <Loading />}
            {profile.status == "error" && <div>Masuk atau daftar.</div>}
            {profile.status == "success" && (
              <>
                <div className="h-20 w-20 rounded-full bg-red-300"></div>
                <span>{profile.profile?.name}</span>
                <span>{profile.profile?.name}</span>
              </>
            )}
          </div>

          <div className="flex  flex-wrap items-start gap-2 rounded-lg border bg-white px-4 py-4 shadow-sm">
            <span className="inline-flex w-full">Kategori</span>
            {["#React", "#JS", "#HTML", "#JSON"].map((value) => (
              <span
                key={value}
                className="rounded-full bg-slate-400 p-1 px-2 text-white"
              >
                {value}
              </span>
            ))}
          </div>
        </aside>
      </main>
    </MainLayout>
  );
}

export default App;
