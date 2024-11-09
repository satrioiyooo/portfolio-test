// api/submit-form.js
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { fullname, email, message } = req.body;

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.ACCESS_KEY,
          fullname,
          email,
          message,
        }),
      });

      const data = await response.json();

      if (data.success) {
        res.status(200).json({ success: true, message: "Message sent successfully!" });
      } else {
        res.status(500).json({ success: false, message: "Failed to send message" });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
