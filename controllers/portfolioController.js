const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendEmailController = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const msg = {
      to: process.env.MY_EMAIL, // You receive mail
      from: process.env.MY_EMAIL, // MUST be verified sender
      subject: `Portfolio Contact - ${name}`,
      html: `
        <h3>New Contact Message</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b> ${message}</p>
      `,
      replyTo: email, // So you can reply to the user
    };

    await sgMail.send(msg);

    res.status(200).send({
      success: true,
      message: "Email Sent Successfully",
    });
  }  catch (error) {
  console.log("SENDGRID ERROR:");
  console.log(error.response?.body); // 👈 THIS LINE IMPORTANT

  res.status(500).send({
    success: false,
    message: "Email Failed",
  });
}

};
