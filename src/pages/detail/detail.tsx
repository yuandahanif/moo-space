import Error from "@components/error/error";
import Loading from "@components/loading/loading";
import useInput from "@hooks/useInput";
import { useAppDispatch, useAppSelector } from "@hooks/useRedux";
import { fetchThreadDetail } from "@states/thread/ThreadDetailSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";

import { postedAt } from "@utils/index";
import UpvoteButton from "@components/button/upvote.button";
import DownVoteButton from "@components/button/downvote.button";
import { createComment } from "@states/comment/CommentSlice";

interface Props {
  id: string;
}

const DetailPage = ({ id }: Props) => {
  const dispatch = useAppDispatch();
  const thread = useAppSelector((state) => state.threadDetail);
  const profile = useAppSelector((state) => state.profile);

  const [content, _, setContent] = useInput();

  const onCreateComment = async () => {
    try {
      if (content == "") return toast.error("Konten tidak boleh kosong.");
      if (thread.thread == null) return toast.error("Konten belom dimuat.");

      await dispatch(createComment({ content, id: thread.thread?.id }));

      setContent("");
      dispatch(fetchThreadDetail(id));

      toast.success("Berhasil membuat komentar.");
    } catch (error) {
      console.error(error);

      toast.error("Gagal membuat komentar.");
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
            <h1 className="mb-4 text-2xl font-semibold">
              {thread.thread?.title}
            </h1>

            <div
              dangerouslySetInnerHTML={{ __html: thread.thread?.body ?? "" }}
            />
          </div>
        )}
      </div>

      <div className="flex gap-2 border-b-2 pb-4 text-sm">
        <span className="ml-auto">Dibuat oleh {thread.thread?.owner.name}</span>
        <img
          className="h-5 w-5 overflow-hidden rounded-full object-cover object-center"
          src={thread.thread?.owner.avatar}
          alt={thread.thread?.owner.name}
        />
        <span>
          {postedAt(thread.thread?.createdAt ?? new Date().toString())}
        </span>
      </div>

      {profile.profile?.id && thread?.thread != null ? (
        <div className="mb-8 flex items-end gap-x-4">
          <div className="flex flex-col items-center justify-start gap-2 pr-0">
            <UpvoteButton />
            <DownVoteButton />

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
              contentEditable
              onInput={(e) => setContent(e.currentTarget.innerHTML)}
              className="flex min-h-[100px] w-full rounded-lg border bg-white p-2 shadow-sm"
            />
          </div>

          <button
            onClick={onCreateComment}
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

      <div className="flex flex-col gap-4 border-t-2 pt-4">
        <span className="font-semibold">
          Komentar ({thread.thread?.comments.length})
        </span>

        <div className="flex flex-col gap-4">
          {thread.thread?.comments.map((comment) => (
            <div
              key={comment.id}
              className="flex flex-col rounded-md border p-3"
            >
              <div className="mb-6  flex items-center gap-x-3">
                <div
                  aria-label="Forum sepi, eh sapi moo . . ."
                  className="h-8 w-8 overflow-hidden rounded-full"
                >
                  <img
                    src={thread.thread?.owner.avatar}
                    alt={thread.thread?.owner.name}
                    className="object-contain hover:cursor-pointer"
                  />
                </div>

                <span>{comment.owner.name}</span>
              </div>

              <div className="flex gap-5">
                <div className="flex flex-col items-center justify-start gap-2 pr-0">
                  <UpvoteButton />
                  <DownVoteButton />

                  <div>
                    <span>
                      {Number(
                        comment.upVotesBy?.length - comment.downVotesBy.length
                      )}
                    </span>
                  </div>
                </div>
                <div
                  dangerouslySetInnerHTML={{ __html: comment.content }}
                ></div>
              </div>

              <div className="flex">
                <span className="ml-auto text-sm">
                  {postedAt(comment.createdAt)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
