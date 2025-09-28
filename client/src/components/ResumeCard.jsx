export default function ResumeCard({ resume }) {
  const handleDownload = async () => {
    try {
      // Use the base URL from your API instance
      const res = await fetch(`${import.meta.env.VITE_API_URL}/resume/download/${resume._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!res.ok) throw new Error("Failed to download resume");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${resume.title}.pdf`; // force PDF download
      a.click();
      window.URL.revokeObjectURL(url);

    } catch (err) {
      console.error(err);
      alert(err.message || "Download failed");
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="font-bold text-lg">{resume.title}</h2>
      <button
        onClick={handleDownload}
        className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Download PDF
      </button>
    </div>
  );
}
