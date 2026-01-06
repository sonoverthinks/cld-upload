"use client";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";

export default function UploadPage() {
  const [imageUrl, setImageUrl] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUploadSuccess = async (result: any) => {
    if (!result.info?.secure_url) return;

    const uploadedUrl = result.info.secure_url;
    setImageUrl(uploadedUrl);
    console.log("Securely Uploaded to Cloudinary:", uploadedUrl);

    // Automatically save to DB
    setStatus("loading");
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl: uploadedUrl }),
      });

      if (!res.ok) throw new Error("Failed to save post to DB");

      setStatus("success");
      // Optional: Clear status after a delay if you want,
      // but keeping "Success" visible is good feedback.
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      console.error("Database Save Error:", error);
      setStatus("error");
    }
  };

  return (
    <div className="flex flex-col gap-4 p-5 max-w-md mx-auto">
      <h1 className="text-2xl font-bold">Upload a New Image</h1>

      <CldUploadWidget
        uploadPreset="cld_upload"
        onSuccess={handleUploadSuccess}
        onError={(error) => {
          console.error("Upload Error:", error);
          setStatus("error");
        }}
      >
        {({ open }) => (
          <button
            className="p-2 bg-amber-200 text-black font-semibold rounded-sm hover:bg-amber-300 transition"
            onClick={() => open()}
            disabled={status === "loading"}
          >
            {status === "loading" ? "Processing..." : "Upload Image"}
          </button>
        )}
      </CldUploadWidget>

      {status === "loading" && (
        <p className="text-blue-600 font-medium animate-pulse">
          Saving to database...
        </p>
      )}

      {status === "success" && (
        <p className="text-green-600 font-medium">
          Image uploaded and saved successfully!
        </p>
      )}

      {status === "error" && (
        <p className="text-red-600 font-medium">
          Something went wrong. Please try again.
        </p>
      )}

      {imageUrl && (
        <div className="mt-4">
          <p className="mb-2 font-semibold">Preview:</p>
          <img
            src={imageUrl}
            alt="Uploaded Preview"
            className="w-full h-auto rounded shadow-md"
          />
        </div>
      )}
    </div>
  );
}
