const Loading: React.FC = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 py-6">
      <div className="h-20 w-20 animate-spin rounded-full border-[.4em] border-red-200 border-t-transparent ease-out"></div>
      <span>Sedang memuat data.</span>
    </div>
  );
};

export default Loading;
