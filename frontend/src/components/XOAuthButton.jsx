import { useState } from "react";
import { toast } from "sonner";
import XLogo from "./XLogo";
import { startXOAuth } from "../lib/xOAuth";

export default function XOAuthButton({ mode = "signin", referralCode = "", className = "", testId }) {
  const [busy, setBusy] = useState(false);
  const isLink = mode === "link";

  const handle = async () => {
    if (busy) return;
    setBusy(true);
    try {
      await startXOAuth({ mode, referralCode });
    } catch (e) {
      toast.error((e.response?.data?.detail || e.message || "X OAuth failed").toUpperCase());
      setBusy(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handle}
      disabled={busy}
      className={`w-full flex items-center justify-center gap-3 ${isLink ? "btn-ghost-ll py-3" : "btn-cyber bg-[var(--purple)] hover:bg-[var(--purple-bright)] py-3 text-white font-pixel text-[12px]"} cta-pulse ${className}`}
      data-testid={testId || `x-oauth-${mode}-btn`}
    >
      <XLogo size={16} />
      <span>{busy ? "REDIRECTING TO X..." : isLink ? "CONNECT X ACCOUNT" : "CONTINUE WITH X (TWITTER)"}</span>
    </button>
  );
}
