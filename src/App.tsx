import Register from "@components/auth/register";
import Loading from "@components/loading/loading";
import { useAppDispatch, useAppSelector } from "@hooks/useRedux";
import MainLayout from "@layouts/main.layout";
import LandingPage from "@pages/landing/landing";
import LeaderboardPage from "@pages/leaderboard/leaderboard";
import { fetchProfile } from "@states/user/ProfileSlice";
import { useEffect, useMemo, useRef, useState } from "react";
import { Route } from "wouter";

type modalType = "login" | "register" | "none";
function App() {
  const [displayModal, setDisplayModal] = useState<modalType>("none");

  const threads = useAppSelector((state) => state.thread);
  const profile = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();

  const threadSetMemo = useMemo(() => {
    if (!threads.threads) return [];
    const uniqueCategory = new Set(
      threads.threads.map((thread) => thread.category)
    );
    const returnCategory: string[] = [];
    uniqueCategory.forEach((category) => returnCategory.push(category));
    return returnCategory;
  }, [threads]);

  const openModal = (name: modalType) => {
    setDisplayModal(name);
  };

  useEffect(() => {
    dispatch(fetchProfile());
  }, []);

  return (
    <MainLayout>
      {displayModal == "register" && (
        <Register onHide={() => setDisplayModal("none")} />
      )}
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
            {profile.status == "error" && (
              <>
                <div>
                  <button
                    onClick={() => {
                      openModal("login");
                    }}
                  >
                    Masuk
                  </button>{" "}
                  atau{" "}
                  <button
                    onClick={() => {
                      openModal("register");
                    }}
                  >
                    Daftar
                  </button>{" "}
                  .
                </div>
              </>
            )}

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
            {threadSetMemo.map((value) => (
              <span
                key={value}
                className="rounded-full bg-slate-400 p-1 px-2 text-white"
              >
                #{value}
              </span>
            ))}
          </div>
        </aside>
      </main>
    </MainLayout>
  );
}

export default App;
