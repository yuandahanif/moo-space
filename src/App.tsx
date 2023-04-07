import { useAppDispatch, useAppSelector } from "@hooks/useRedux";
import MainLayout from "@layouts/main.layout";
import { fetchAllThreads } from "@states/thread/AllThreadSlice";
import { useEffect } from "react";

function App() {
  const threads = useAppSelector((state) => state.allThreadSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllThreads());
  }, []);

  return (
    <MainLayout>
      <header className="sticky top-0 z-50 flex rounded-b-lg bg-white p-6 py-8 shadow-md">
        <span aria-label="Forum sepi, eh sapi moo . . .">Moo.Space</span>

        <nav className="ml-auto">
          <ul className="flex gap-x-2">
            {/* <li>Home</li>
            <li>Thread</li>
            <li>Leaderboard</li> */}
          </ul>
        </nav>
      </header>

      <main className="flex grow">
        <article className="w-3/4 py-6 pr-8">
          <div className="flex flex-col gap-y-4">
            {threads.threads.map((t) => (
              <div
                key={t.id}
                className="w-full rounded-lg border bg-white p-5 shadow-sm duration-700 hover:shadow-md"
              >
                <span className="text-xl font-semibold">{t.title}</span>
                <div
                  className="line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: t.body }}
                />
              </div>
            ))}
          </div>
        </article>

        <aside className="flex w-1/4 flex-col gap-y-4 py-6">
          <div className="sticky top-24 flex flex-col items-center rounded-lg border bg-white py-8 shadow-sm duration-300 hover:shadow-lg">
            <div className="h-20 w-20 rounded-full bg-red-300"></div>
            <span>Yuanda</span>
            <span>yuan@fake.mail</span>
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
