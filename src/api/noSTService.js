const API_URL =
  "https://script.google.com/macros/s/AKfycbwTzN0AuBDnUjJ3UUwrU-Bi8sPCcz8J4GKFq1U7CCyHm6dCAuHFfIxdN_9rgHR1QiTaww/exec";

export async function saveNoST(noST, rows) {
  await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      action: "saveNoST",
      noST,
      rows,
    }),
  });

  return { success: true };
}