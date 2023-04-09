import ThreadCard from "@components/card/thread.card";
import Error from "@components/error/error";
import Input from "@components/form/input";
import Loading from "@components/loading/loading";
import useInput from "@hooks/useInput";
import { useAppDispatch, useAppSelector } from "@hooks/useRedux";
import { fetchThreadDetail } from "@states/thread/ThreadDetailSlice";
import { createThread } from "@states/thread/ThreadSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";

interface Props {
  id: string;
}

const DetailPage = ({ id }: Props) => {
  const dispatch = useAppDispatch();
  const thread = useAppSelector((state) => state.threadDetail);
  const profile = useAppSelector((state) => state.profile);
  console.log("file: detail.tsx:19 ~ DetailPage ~ thread:", thread);

  const [title, setTitleOnChange, setTitle] = useInput();
  const [content, _, setContent] = useInput();
  const [category, setCategoryOnChange, setCategory] = useInput();

  const onCreateThread = async () => {
    try {
      if (title == "") return toast.error("judul tidak boleh kosong.");
      if (content == "") return toast.error("Konten tidak boleh kosong.");

      await dispatch(
        createThread({
          body: content,
          category: category,
          title: title,
        })
      );

      setTitle("");
      setContent("");
      setCategory("");

      toast.success("Berhasil membuat postingan.");
    } catch (error) {
      console.error(error);

      toast.error("Gagal membuat postingan.");
    }
  };

  useEffect(() => {
    dispatch(fetchThreadDetail(id));
  }, []);

  return (
    <div className="grow">
      <div className="flex flex-col gap-y-4">
        {thread.status == "error" && <Error />}
        {thread.status == "loading" && <Loading />}
        {thread.status == "success" && (
          <div>
            <h1 className="text-2xl font-semibold mb-4">{thread.thread?.title}</h1>

            <div
              className=""
              dangerouslySetInnerHTML={{ __html: thread.thread?.body ?? "" }}
            />
          </div>
        )}
      </div>

      {profile.profile?.id && thread?.thread != null ? (
        <div className="mb-8 flex items-end gap-x-4">
          <div className="flex flex-col items-center justify-start gap-2 pr-0">
            <button className="duration-300 hover:text-sky-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                />
              </svg>
            </button>

            <button className="duration-300 hover:text-sky-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384"
                />
              </svg>
            </button>

            <div>
              <span>
                {Number(
                  thread?.thread?.upVotesBy?.length -
                    thread.thread.downVotesBy.length
                )}
              </span>
            </div>
          </div>

          <div className="flex w-full flex-col gap-4">
            <div className="flex w-full gap-6"></div>
            <div
              onInput={(e) => setContent(e.currentTarget.innerHTML)}
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
      ) : (
        <div className="flex justify-center p-8">
          <span>Masuk untuk berinteraksi.</span>
        </div>
      )}
    </div>
  );
};

export default DetailPage;
