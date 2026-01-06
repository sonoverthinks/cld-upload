"use client";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import toast from "react-hot-toast";
import { verifyPin } from "../actions/verifyPin";

export default function UploadPage() {
  const [pin, setPin] = useState<string>("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const checkPin = async () => {
    const isValid = await verifyPin(pin);
    if (isValid) {
      setIsAuthorized(true);
      toast.success("PIN Verified!");
    } else {
      toast.error("Incorrect PIN");
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUploadSuccess = async (result: any) => {
    if (!result.info?.secure_url) return;

    const uploadedUrl = result.info.secure_url;
    console.log("Securely Uploaded to Cloudinary:", uploadedUrl);
    toast.success("Securely Uploaded to Cloudinary");

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
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      console.error("Database Save Error:", error);
      setStatus("error");
    }
  };

  if (!isAuthorized) {
    return (
      <div className="flex flex-col gap-4 max-w-sm mx-auto p-8 mt-10 border rounded-xl shadow-sm bg-white dark:bg-zinc-900">
        <h2 className="text-xl font-bold text-center">Enter Access PIN</h2>
        <div className="flex gap-2">
          <input
            type="password"
            className="flex-1 bg-gray-100 dark:bg-zinc-800 p-2 rounded border border-gray-200 dark:border-zinc-700"
            placeholder="PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && checkPin()}
          />
          <button
            onClick={checkPin}
            className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded font-medium"
          >
            Enter
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 max-w-md mx-auto p-5">
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
            className="w-full py-4 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
            onClick={() => open()}
            disabled={status === "loading"}
          >
            upload
          </button>
        )}
      </CldUploadWidget>
    </div>
  );
}
