export async function submitLead(payload) {
  const response = await fetch("/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...payload,
      page: typeof window !== "undefined" ? window.location.href : "",
    }),
  });

  let data = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok || !data?.ok) {
    const error = new Error(data?.error || "lead_submission_failed");
    error.code = data?.error || "lead_submission_failed";
    throw error;
  }

  return data;
}
