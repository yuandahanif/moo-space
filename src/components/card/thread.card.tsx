import DownVoteButton from "@components/button/downvote.button";
import UpvoteButton from "@components/button/upvote.button";
import { postedAt } from "@utils/index";
import React from "react";
import { Link } from "wouter";

interface Props {
  thread: Thread;
  user: User;
  allowVote?: boolean;
}

const ThreadCard: React.FC<Props> = ({ thread, user }) => {
  return (
    <div className="flex w-full rounded-lg border bg-white shadow-sm duration-700 hover:shadow-md">
      <div className="flex flex-col items-center justify-start gap-2 p-5 pr-0">
        {Number(thread.upVotesBy.length - thread.downVotesBy.length) >= 0 ? (
          <UpvoteButton className="cursor-default hover:text-black" />
        ) : (
          <DownVoteButton className="cursor-default hover:text-black" />
        )}

        <div>
          <span aria-label="vote count">
            {Number(thread.upVotesBy.length - thread.downVotesBy.length)}
          </span>
        </div>
      </div>

      <div className="p-5 ">
        <div className="inline-flex w-full gap-1 text-sm">
          Diposting oleh
          <span className="font-semibold">{user.name}</span> |{" "}
          <div className="flex">
            <span className="ml-auto text-sm">
              {postedAt(thread.createdAt)}
            </span>
          </div>
        </div>

        <div className="cursor-pointer hover:underline">
          <Link href={`/detail/${thread.id}`}>
            <span className="text-xl font-semibold">{thread.title}</span>
          </Link>
        </div>

        <div
          className="line-clamp-6"
          dangerouslySetInnerHTML={{ __html: thread.body }}
        />

        <div className="flex gap-2">
          {thread.category != null && (
            <span className="cursor-pointer text-sky-600">
              #{thread.category}
            </span>
          )}{" "}
          | <span>{thread.totalComments} Komentar</span>
        </div>
      </div>
    </div>
  );
};

export default ThreadCard;
