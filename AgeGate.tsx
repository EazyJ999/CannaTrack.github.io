"use client";
import { useEffect, useState } from "react";

export default function AgeGate() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    try { if (localStorage.getItem("lf_18") !== "yes") setShow(true); } catch { setShow(true); }
  }, []);
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg/95 p-6 backdrop-blur">
      <div className="max-w-md rounded-2xl border border-line bg-card p-8 text-center">
        <h2 className="font-display text-2xl">Are you 18 or older?</h2>
        <p className="mt-3 text-sm text-muted">
          This site lists cannabis stores in South Africa and is only for adults.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <button className="btn btn-primary" onClick={() => { try { localStorage.setItem("lf_18", "yes"); } catch {} setShow(false); }}>
            Yes, I&apos;m 18+
          </button>
          <a className="btn btn-ghost" href="https://www.google.com">No</a>
        </div>
      </div>
    </div>
  );
}
