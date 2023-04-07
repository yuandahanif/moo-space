import ThreadCard from "@components/card/thread.card";
import Loading from "@components/loading/loading";
import { useAppDispatch, useAppSelector } from "@hooks/useRedux";
import { fetchAllThreads } from "@states/thread/AllThreadSlice";
import { useEffect } from "react";

const LandingPage = () => {
  const threads = useAppSelector((state) => state.allThreadSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllThreads());
  }, []);

  return (
    <div className="grow">
      <div className="flex flex-col gap-y-4">
        {threads.status == "loading" && <Loading />}
        {threads.status == "success" &&
          threads.threads.map((t) => <ThreadCard key={t.id} thread={t} />)}
      </div>
    </div>
  );
};

export default LandingPage;