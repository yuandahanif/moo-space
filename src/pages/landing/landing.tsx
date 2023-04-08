import ThreadCard from "@components/card/thread.card";
import Error from "@components/error/error";
import Input from "@components/form/input";
import Loading from "@components/loading/loading";
import useInput from "@hooks/useInput";
import { useAppDispatch, useAppSelector } from "@hooks/useRedux";
import { createThread, fetchAllThreads } from "@states/thread/ThreadSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";

const LandingPage = () => {
  const threads = useAppSelector((state) => state.thread);
  const profile = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();

  const [title, setTitleOnChange] = useInput();
  const [content, setContentOnChange] = useInput();
  const [category, setCategoryOnChange] = useInput();

  const onCreateThread = async () => {
    try {
      await dispatch(
        createThread({
          body: content,
          category: category,
          title: title,
        })
      );
      toast("Berhasil membuat postingan.");
    } catch (error) {
      console.error(error);

      toast("Gagal membuat postingan.");
    }
  };

  useEffect(() => {
    dispatch(fetchAllThreads());
  }, []);

  return (
    <div className="grow">
      {profile.profile?.id && (
        <div className="mb-8 flex items-end gap-x-4">
          <div className="flex w-full flex-col gap-4">
            <div className="flex w-full gap-6">
              <Input textLabel="Judul" value={title} />
              <Input textLabel="Kategori" />
            </div>
            <div
              contentEditable
              className="flex min-h-[100px] w-full rounded-lg border bg-white p-2 shadow-sm"
            />
          </div>

          <button
            onClick={onCreateThread}
            className="rounded-md bg-lime-300 p-4 text-white duration-200 hover:bg-lime-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6 -rotate-45"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </button>
        </div>
      )}

      <div className="mb-4 border-t-2 pt-1">
        <h1 className="text-xl">Semua postingan</h1>
      </div>

      <div className="flex flex-col gap-y-4">
        {threads.status == "error" && <Error />}
        {threads.status == "loading" && <Loading />}
        {threads.status == "success" &&
          threads.threads.map((t) => <ThreadCard key={t.id} thread={t} />)}
      </div>
    </div>
  );
};

export default LandingPage;
