export function BackgroundScene() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-50">
        <div className="grid-overlay absolute inset-0" />
      </div>
      <div className="absolute -left-28 top-20 h-72 w-72 rounded-full bg-white/[0.04] blur-[120px]" />
      <div className="absolute right-[-10%] top-0 h-[32rem] w-[32rem] rounded-full bg-white/[0.03] blur-[160px]" />
      <div className="absolute bottom-10 left-[35%] h-80 w-80 rounded-full bg-white/[0.025] blur-[150px]" />
    </div>
  );
}
