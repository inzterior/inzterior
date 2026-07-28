// Inzterior — shared site behavior: mobile nav toggle + enquiry form handoff to email client.

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  if (toggle && header) {
    toggle.addEventListener("click", () => header.classList.toggle("open"));
  }

  const form = document.getElementById("enquiry-form");
  const status = document.getElementById("form-status");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = (data.get("name") || "").toString().trim();
    const email = (data.get("email") || "").toString().trim();
    const phone = (data.get("phone") || "").toString().trim();
    const projectType = (data.get("project-type") || "").toString().trim();
    const message = (data.get("message") || "").toString().trim();

    if (!name || !email || !message) {
      status.textContent = "Please fill in your name, email, and project details.";
      status.className = "form-status err";
      return;
    }

    const subject = encodeURIComponent(`New Enquiry — ${projectType || "General"} — ${name}`);
    const bodyLines = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || "-"}`,
      `Project type: ${projectType || "-"}`,
      "",
      message,
    ];
    const body = encodeURIComponent(bodyLines.join("\n"));
    window.location.href = `mailto:inquiry@inzterior.com?subject=${subject}&body=${body}`;

    status.textContent = "Opening your email app to send this enquiry to inquiry@inzterior.com...";
    status.className = "form-status ok";
  });
});
