import { SignIn, SignUp } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 relative overflow-hidden px-4">
      {/* Background Subtle Glow/Gradients */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-md flex flex-col items-center justify-center z-10 py-10">
        
        {/* Brand/Header Info */}
        <div className="tehe2xt-center mb-8 space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Welcome Back
          </h1>
          <p className="text-sm text-slate-400">
            Sign in to access your dashboard and manage your account.
          </p>
        </div>

        {/* Clerk Sign-In Component with Custom Styling */}
        <div className="w-full flex justify-center shadow-2xl rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-xl p-2">
          <SignUp 
            appearance={{
              elements: {
                card: "bg-transparent shadow-none border-none",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                socialButtonsBlockButton: 
                  "border-slate-700 bg-slate-800/80 text-white hover:bg-slate-700/80 transition-all",
                formButtonPrimary: 
                  "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-500/25 border-none transition-all",
                footerActionLink: "text-purple-400 hover:text-purple-300 font-semibold",
                formFieldInput: "bg-slate-800/80 border-slate-700 text-white focus:border-purple-500 focus:ring-purple-500",
                formFieldLabel: "text-slate-300",
                dividerLine: "bg-slate-700",
                dividerText: "text-slate-500",
              }
            }}
          />
        </div>

        {/* Footer info */}
        <p className="mt-8 text-center text-xs text-slate-500">
          Protected by enterprise grade security.
        </p>
      </div>
    </main>
  );
}