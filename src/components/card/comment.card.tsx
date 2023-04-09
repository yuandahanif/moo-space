import DownVoteButton from "@components/button/downvote.button";
import UpvoteButton from "@components/button/upvote.button";
import { postedAt } from "@utils/index";

interface Props {
  comment: Comment_;
  onUpvote: (comment: Comment_) => void;
  onDownvote: (comment: Comment_) => void;
  profile_id: string;
}

const CommentCard: React.FC<Props> = ({
  comment,
  onUpvote,
  onDownvote,
  profile_id,
}) => {
  return (
    <div key={comment.id} className="flex flex-col rounded-md border p-3">
      <div className="mb-6  flex items-center gap-x-3">
        <div
          aria-label="Forum sepi, eh sapi moo . . ."
          className="h-8 w-8 overflow-hidden rounded-full"
        >
          <img
            src={comment.owner.avatar}
            alt={comment?.owner.name}
            className="object-contain hover:cursor-pointer"
          />
        </div>

        <span>{comment.owner.name}</span>
      </div>

      <div className="flex gap-5">
        <div className="flex flex-col items-center justify-start gap-2 pr-0">
          {profile_id != "" && (
            <>
              <UpvoteButton
                onClick={() => onUpvote(comment)}
                disabled={
                  comment.upVotesBy.find((t) => t == profile_id) != undefined
                }
              />
              <DownVoteButton
                onClick={() => onDownvote(comment)}
                disabled={
                  comment.downVotesBy.find((t) => t == profile_id) != undefined
                }
              />
            </>
          )}

          <div>
            <span>
              {Number(comment.upVotesBy?.length - comment.downVotesBy.length)}
            </span>
          </div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: comment.content }}></div>
      </div>

      <div className="flex">
        <span className="ml-auto text-sm">{postedAt(comment.createdAt)}</span>
      </div>
    </div>
  );
};

export default CommentCard;
