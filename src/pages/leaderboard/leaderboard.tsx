import Error from "@components/error/error";
import Loading from "@components/loading/loading";
import { useAppDispatch, useAppSelector } from "@hooks/useRedux";
import { fetchLeaderboard } from "@states/leaderboard/LeaderboardSlice";
import { useEffect } from "react";

const LeaderboardPage = (): JSX.Element => {
  const data = useAppSelector((state) => state.leaderboard);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(fetchLeaderboard());
  }, [dispatch]);

  return (
    <div className="grow">
      <h1 className="text-2xl">Leaderboard</h1>
      <div className="mt-8 flex flex-col gap-y-4">
        {data.status === "error" && <Error />}
        {data.status === "loading" && <Loading />}

        {data.status === "success" &&
          data.leaderboard.map((t) => (
            <div key={t.user.id} className="flex border p-3">
              <img
                src={t.user.avatar}
                alt={t.user.name}
                className="h-10 w-10 rounded-full"
              />
              <div className="ml-2 flex w-full items-center justify-between gap-y-2">
                <span className="font-bold">{t.user.name}</span>
                <span className="text-sm">{t.score}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default LeaderboardPage;
