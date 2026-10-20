import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", textAlign: "center", padding: 24 }}>
      <div>
        <h1 style={{ fontSize: 48, fontWeight: 700, marginBottom: 12 }}>Page not found</h1>
        <p style={{ color: "rgba(255,247,240,.62)", marginBottom: 24 }}>That page doesn&apos;t exist.</p>
        <Link href="/">Back to Kōe</Link>
      </div>
    </main>
  );
}
