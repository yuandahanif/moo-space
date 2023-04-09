import Login from "@components/auth/login";
import Register from "@components/auth/register";
import ProfileCard from "@components/card/profile.card";
import Loading from "@components/loading/loading";
import { useAppDispatch, useAppSelector } from "@hooks/useRedux";
import MainLayout from "@layouts/main.layout";
import DetailPage from "@pages/detail/detail";
import LandingPage from "@pages/landing/landing";
import LeaderboardPage from "@pages/leaderboard/leaderboard";
import { fetchProfile, login, removeProfile } from "@states/user/ProfileSlice";
import api from "@utils/api";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { Route } from "wouter";

type modalType = "login" | "register" | "none";
function App() {
  const [displayModal, setDisplayModal] = useState<modalType>("none");
  const [categoryFilter, setCategoryFilter] = useState("");

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

  const onRegister = async ({
    email,
    name,
    password,
  }: {
    email: string;
    name: string;
    password: string;
  }) => {
    try {
      await api.register({ email, name, password });
      toast("Pendaftaran berhasil!", { pauseOnHover: true });
      setDisplayModal("none");
    } catch (error) {
      console.error(error);
      toast("Pendaftaran gagal!", { pauseOnHover: true });
    }
  };

  const onLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      await dispatch(login({ email, password }));
      toast("Masuk berhasil!", { pauseOnHover: true });
      await dispatch(fetchProfile());
      setDisplayModal("none");
    } catch (error) {
      console.error(error);
      toast("Masuk gagal!", { pauseOnHover: true });
    }
  };

  const onLogout = async () => {
    try {
      dispatch(removeProfile());
      toast("Keluar berhasil!", { pauseOnHover: true });
      await dispatch(fetchProfile());
      setDisplayModal("none");
    } catch (error) {
      console.error(error);
      toast("Keluar gagal!", { pauseOnHover: true });
    }
  };

  useEffect(() => {
    void dispatch(fetchProfile());
  }, []);

  return (
    <MainLayout>
      {displayModal == "register" && (
        <Register
          onSubmit={(e) => void onRegister(e)}
          onHide={() => setDisplayModal("none")}
        />
      )}
      {displayModal == "login" && (
        <Login
          onSubmit={(e) => void onLogin(e)}
          onHide={() => setDisplayModal("none")}
        />
      )}

      <main className="flex">
        <article className="w-3/4 py-6 pr-8">
          <Route path="/leaderboard">
            <LeaderboardPage />
          </Route>

          <Route path="/detail/:id">
            {(params) => <DetailPage id={String(params.id)} />}
          </Route>

          <Route path="/">
            <LandingPage categoryFilter={categoryFilter} />
          </Route>
        </article>

        <aside className="flex w-1/4 flex-col gap-y-4 py-6">
          <div className="sticky top-24 flex flex-col items-center rounded-lg border bg-white py-8 shadow-sm duration-300 hover:shadow-lg">
            {profile.status == "loading" && <Loading />}
            {profile.status == "error" && (
              <>
                <div>
                  <button
                    className="hover:underline"
                    onClick={() => {
                      setDisplayModal("login");
                    }}
                  >
                    Masuk
                  </button>{" "}
                  atau{" "}
                  <button
                    className="hover:underline"
                    onClick={() => {
                      setDisplayModal("register");
                    }}
                  >
                    Daftar
                  </button>{" "}
                  .
                </div>
              </>
            )}

            {profile.status == "success" && profile.profile && (
              <ProfileCard
                onLogout={() => void onLogout()}
                profile={profile.profile}
              />
            )}
          </div>

          <div className="flex  flex-wrap items-start gap-2 rounded-lg border bg-white px-4 py-4 shadow-sm">
            <span className="inline-flex w-full">Kategori</span>
            {threadSetMemo.map((value) => (
              <button
                key={value}
                onClick={() => {
                  setCategoryFilter((state) =>
                    state == "" ? value : state == value ? "" : value
                  );
                }}
              >
                <span className="rounded-full bg-slate-400 p-1 px-2 text-white">
                  #{value}
                </span>
              </button>
            ))}
          </div>
        </aside>
      </main>
    </MainLayout>
  );
}

export default App;
