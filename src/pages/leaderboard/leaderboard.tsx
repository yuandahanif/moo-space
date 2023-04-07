import Error from "@components/error/error";
import Loading from "@components/loading/loading";
import { useAppDispatch, useAppSelector } from "@hooks/useRedux";
import { fetchLeaderboard } from "@states/leaderboard/LeaderboardSlice";
import { useEffect } from "react";

const LeaderboardPage = () => {
  const data = useAppSelector((state) => state.leaderboard);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchLeaderboard());
  }, []);

  return (
    <div className="grow">
      <h1 className="text-2xl">Leaderboard</h1>
      <div className="mt-8 flex flex-col gap-y-4">
        {data.status == "error" && <Error />}
        {data.status == "loading" && <Loading />}

        {data.status == "success" &&
          data.leaderboard.map((t) => (
            <div key={t.user.id} className="border p-3 flex">
              <span className="mr-auto">{t.user.name}</span><span>{t.score}</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default LeaderboardPage;
