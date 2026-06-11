import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import XLogo from "../components/XLogo";
import { completeXOAuth } from "../lib/xOAuth";
import { useAuth } from "../contexts/AuthContext";

export default function XOAuthCallback() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { refreshUser } = useAuth();
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    const run = async () => {
      const oauthError = params.get("error");
      const code = params.get("code");
      const state = params.get("state");
      if (oauthError) {
        setError(oauthError);
        return;
      }
      if (!code || !state) {
        setError("Missing OAuth code or state");
        return;
      }
      try {
        const data = await completeXOAuth({ code, state });
        localStorage.setItem("ll_token", data.access_token);
        await refreshUser();
        toast.success(`WELCOME, @${data.user.username.toUpperCase()}`);
        if (mounted) navigate("/", { replace: true });
      } catch (e) {
        if (mounted) setError(e.response?.data?.detail || e.message || "X OAuth failed");
      }
    };
    run();
    return () => { mounted = false; };
  }, [navigate, params, refreshUser]);

  return (
    <div className="min-h-screen bg-[var(--bg)] page-transition flex items-center justify-center px-5" data-testid="x-oauth-callback">
      <div className="card-ll p-6 w-full max-w-md text-center">
        <div className="w-12 h-12 mx-auto rounded-full border border-[var(--border)] bg-black/40 flex items-center justify-center mb-4">
          <XLogo size={20} />
        </div>
        <div className="font-brush text-[32px] text-white leading-none">
          {error ? "X AUTH FAILED" : "CONNECTING X"}
        </div>
        <div className="font-pixel text-[10px] tracking-widest text-[var(--muted)] mt-3">
          {error ? error.toUpperCase() : "FINISHING YOUR PIT PASS"}
        </div>
        {error && (
          <Link to="/login" className="btn-primary-ll mt-5 inline-flex">
            BACK TO LOGIN
          </Link>
        )}
      </div>
    </div>
  );
}
