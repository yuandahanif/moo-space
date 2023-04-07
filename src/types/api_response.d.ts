type API_Status = "loading" | "success" | "error" | "idle";

interface API_Wrapper<T> {
  status: API_Status;
  message: string;
  data: T;
}
