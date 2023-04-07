import ThreadCard from "@components/card/thread.card";
import Loading from "@components/loading/loading";
import { useAppDispatch, useAppSelector } from "@hooks/useRedux";
import MainLayout from "@layouts/main.layout";
import { fetchAllThreads } from "@states/thread/AllThreadSlice";
import { useEffect } from "react";

function App() {
  const threads = useAppSelector((state) => state.allThreadSlice);
  console.log("file: App.tsx:8 ~ App ~ threads:", threads);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllThreads());
  }, []);

  return (
    <MainLayout>
      <main className="flex">
        <article className="w-3/4 py-6 pr-8">
          <div className="flex flex-col gap-y-4">
            {threads.status == "loading" && <Loading />}
            {threads.status == "success" &&
              threads.threads.map((t) => <ThreadCard key={t.id} thread={t} />)}
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
