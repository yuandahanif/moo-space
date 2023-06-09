import Error from "@components/error/error";
import Loading from "@components/loading/loading";
import useInput from "@hooks/useInput";
import { useAppDispatch, useAppSelector } from "@hooks/useRedux";
import { fetchThreadDetail } from "@states/thread/ThreadDetailSlice";
import { useEffect, useRef } from "react";
import { type Id, toast } from "react-toastify";

import { postedAt } from "@utils/index";
import UpvoteButton from "@components/button/upvote.button";
import DownVoteButton from "@components/button/downvote.button";
import { createComment, voteComment } from "@states/comment/CommentSlice";
import { voteThread } from "@states/thread/ThreadSlice";
import CommentCard from "@components/card/comment.card";

interface Props {
  id: string;
}

const DetailPage = ({ id }: Props): JSX.Element => {
  const commentFieldRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();
  const thread = useAppSelector((state) => state.threadDetail);
  const profile = useAppSelector((state) => state.profile);

  const [content, _, setContent] = useInput();

  const onCreateComment = async (): Promise<Id | undefined> => {
    try {
      if (content === "") return toast.error("Konten tidak boleh kosong.");
      if (thread.thread == null) return toast.error("Konten belom dimuat.");

      await dispatch(createComment({ content, id: thread.thread?.id }));

      if (commentFieldRef.current != null) {
        commentFieldRef.current.innerHTML = "";
        setContent("");
      }

      void dispatch(fetchThreadDetail(id));

      toast.success("Berhasil membuat komentar.");
    } catch (error) {
      console.error(error);

      toast.error("Gagal membuat komentar.");
    }
  };

  const onVote = async (type: Vote_type): Promise<void> => {
    if (thread.thread?.id != null) {
      await dispatch(voteThread({ id: thread.thread?.id, type }));
      await dispatch(fetchThreadDetail(id));
      toast.success("Berhasil melaukan vote");
    } else {
      toast.error("Gagal melaukan vote");
    }
  };

  const onCommentVote = async (
    comment_id: string,
    type: Vote_type
  ): Promise<void> => {
    if (thread.thread?.id != null) {
      await dispatch(voteComment({ id: thread.thread?.id, type, comment_id }));
      await dispatch(fetchThreadDetail(id));
      toast.success("Berhasil melaukan vote");
    } else {
      toast.error("Gagal melaukan vote");
    }
  };

  useEffect(() => {
    void dispatch(fetchThreadDetail(id));
  }, [dispatch, id]);

  return (
    <div className="grow">
      <div className="flex flex-col gap-y-4">
        {thread.status === "error" && <Error />}
        {thread.status === "loading" && <Loading />}
        {thread.status === "success" && (
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

      {profile.profile?.id != null && thread?.thread != null ? (
        <div className="mb-8 flex items-end gap-x-4">
          <div className="flex flex-col items-center justify-start gap-2 pr-0">
            <UpvoteButton
              onClick={async () => {
                await onVote("up");
              }}
              disabled={
                thread.thread.upVotesBy.find(
                  (t) => t === profile.profile?.id
                ) !== undefined
              }
            />
            <DownVoteButton
              onClick={async () => {
                await onVote("down");
              }}
              disabled={
                thread.thread.downVotesBy.find(
                  (t) => t === profile.profile?.id
                ) !== undefined
              }
            />

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
              ref={commentFieldRef}
              contentEditable
              onInput={(e) => {
                setContent(e.currentTarget.innerHTML);
              }}
              className="flex min-h-[100px] w-full rounded-lg border bg-white p-2 shadow-sm"
            />
          </div>

          <button
            aria-label="post comment"
            type="submit"
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
            <CommentCard
              profile_id={
                profile.profile?.id != null ? profile.profile?.id : ""
              }
              onUpvote={async (c) => {
                await onCommentVote(c.id, "up");
              }}
              onDownvote={async (c) => {
                await onCommentVote(c.id, "down");
              }}
              comment={comment}
              key={comment.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
