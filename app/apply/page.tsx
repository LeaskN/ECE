import { ApplicationForm } from "@/components/forms/ApplicationForm";

export default function ApplyPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-10">
      <div className="mx-auto max-w-3xl px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            Stipend Application
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Complete the form below to submit your stipend application.
          </p>
        </div>

        <ApplicationForm />
      </div>
    </main>
  );
}
