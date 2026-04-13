import SearchBar from "./components/SearchBar";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8 px-4 bg-neutral-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
          Lyrics Card Generator
        </h1>
      </div>
      <SearchBar />
    </main>
  );
}
