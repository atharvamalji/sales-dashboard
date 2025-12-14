import Link from "next/link";

export default function Page() {
  return (
    <main className="flex flex-col items-center">
      <header className="fixed top-0 w-full flex justify-center text-blue-50">
        <div className="w-full max-w-6xl px-6 py-2 flex items-center justify-between">
          {/* Logo */}
          <div>
            <Link href={"/dashboard"}>
              <span className="font-bold text-black">SuperStore</span>{" "}
              Insights
            </Link>
          </div>

          {/* Nav Links */}
          <nav>
            <ul className="flex items-center gap-8 text-sm font-medium">
              <li>
                <a
                  href="/dashboard"
                  className="hover:text-blue-600 transition-colors"
                >
                  Dashboard
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-linear-to-t from-blue-900 via-blue-500 to-blue-400 w-full flex justify-center items-center h-120">
        <div className="w-full max-w-6xl px-6 py-24 text-center flex flex-col items-center">
          <h1 className="text-5xl font-bold tracking-tight text-blue-50 drop-shadow">
            Sales Visibility Made Simple.
          </h1>
          <p className="mt-4 text-lg text-muted-foreground text-blue-50 w-170 drop-shadow">
            Salescast.io helps you track sales, forecast growth, and make
            data-driven decisions — all in one dashboard.
          </p>
          {/* <div className="mt-8 flex justify-center gap-4">
          <a
            href="/app/dashboard"
            className="rounded-xl bg-primary px-6 py-3 text-base font-medium text-white hover:bg-primary/90"
          >
            Get Started
          </a>
          <a
            href="#pricing"
            className="rounded-xl border border-border px-6 py-3 text-base font-medium hover:bg-muted"
          >
            See Pricing
          </a>
        </div> */}
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-6xl px-6 py-24">
        <h2 className="text-3xl font-semibold text-center mb-12">
          Powerful Features
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Live Dashboards",
              desc: "Get real-time insights with fully interactive charts and KPIs.",
            },
            {
              title: "Sales Forecasting",
              desc: "Predict trends and plan smarter using advanced analytics.",
            },
            {
              title: "Team Collaboration",
              desc: "Share reports and track performance across your entire team.",
            },
            {
              title: "Custom Reports",
              desc: "Build beautiful reports tailored to your business goals.",
            },
            {
              title: "Integrations",
              desc: "Sync data seamlessly from CRMs, spreadsheets, and APIs.",
            },
            {
              title: "Secure & Scalable",
              desc: "Enterprise-grade security with end-to-end encryption.",
            },
          ].map(({ title, desc }) => (
            <div
              key={title}
              className="rounded-2xl border p-6 hover:shadow-sm transition"
            >
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Footer */}
      <section className="w-full bg-primary text-primary-foreground py-16 text-center">
        <h2 className="text-3xl font-semibold">
          Start growing your sales today
        </h2>
        <p className="mt-3 text-lg opacity-90">
          Join thousands of sales teams using Salescast.io to scale faster.
        </p>
        <a
          href="/app/dashboard"
          className="mt-8 inline-block rounded-xl bg-white text-primary px-6 py-3 font-medium hover:bg-neutral/10"
        >
          Get Started Free
        </a>
      </section>
    </main>
  );
}
