const Register = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-50 flex w-full flex-col items-center justify-center gap-4 bg-slate-600 bg-opacity-10 py-6">
      <div className="bg-white p-8">
        <label className="relative flex flex-col rounded-md border group group-focus:border-slate-900">
          <span className="absolute ml-2 px-1 -translate-y-1/2 bg-white">Email</span>
          <input
            type="text"
            className="min-w-[20em] rounded-md px-2 py-2"
          />
        </label>
      </div>
    </div>
  );
};

export default Register;
