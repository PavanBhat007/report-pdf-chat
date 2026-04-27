import Query from "./components/Query";
import ReportUpload from "./components/ReportUpload";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight">
            PDF Intelligence
          </h1>
          <p className="text-gray-500 mt-2">
            Upload documents and query them using AI
          </p>
        </div>

        {/* Grid layout */}
        <div className="grid md:grid-cols-2 gap-6">
          <ReportUpload />
          <Query />
        </div>
      </div>
    </div>
  );
}