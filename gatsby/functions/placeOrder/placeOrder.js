const nodemailer = require('nodemailer');

function generateOrderEmail({ order, total }) {
  return `<div>
    <h2> Your recent order for ${total} </h2> 
    <p> Please start walking over, we'll have your order ready in 20 minutes. </p>
    <ul> 
      ${order
        .map(
          (item) => `<li> 
      <img src="${item.thumbnail}" alt="${item.name}"/> 
      ${item.size} ${item.name} - ${item.price}
      </li>`
        )
        .join('')}
    </ul>
    <p> Your total is <strong>${total}</strong> due at pickup </p>
    <style> 
        ul {
          list-style: none;
        }
    </style>
  </div>`;
}

// create a transport for nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  ignoreTLS: true,
  secure: false,
  tls: {
    rejectUnauthorized: false,
  },
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// test an email
transporter.sendMail({
  from: "Slick's Slices <slick@example.com>",
  to: 'orders@example.com',
  subject: 'New order!',
  html: `<p>Your new pizza is here!</p>`,
});

function wait(ms = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

module.exports = async (req, res) => {
  const { body } = req;
  // Check if `honeypot is submitted:
  if (body.mapleSyrup) {
    return res.status(400).header('Access-Control-Allow-Origin', '*').json({
      message: `Woop woop! It's a cyber attack! Good bye, little mother hacker`,
    });
    // return {
    //   statusCode: 400,
    //   message: `Woop woop! It's a cyber attack! Good bye, little mother hacker`,
    // };
  }

  // validate coming data
  const requiredFields = ['email', 'name', 'order'];

  for (const field of requiredFields) {
    if (!body[field]) {
      return res
        .status(400)
        .header('Access-Control-Allow-Origin', '*')
        .json({
          message: `Oops! You forgot to add ${field}`,
        });
      // return {
      //   statusCode: 400,
      //   body: JSON.stringify({
      //     message: `Oops! You forgot to add ${field}`,
      //   }),
      // };
    }
  }

  if (!body.order.length) {
    return res.status(400).header('Access-Control-Allow-Origin', '*').json({
      message: `Why would you order nothing?`,
    });
    // return {
    //   statusCode: 400,
    //   body: JSON.stringify({
    //     message: `Why would you order nothing?`,
    //   }),
    // };
  }

  // send an email
  const info = await transporter.sendMail({
    from: "Slick's Slices <slick@example.com>",
    to: `${body.name} <${body.email}>, orders@example.com`,
    subject: 'New order!',
    html: generateOrderEmail({
      order: body.order,
      total: body.total,
    }),
  });
  return res.status(200).header('Access-Control-Allow-Origin', '*').json({
    message: 'Success',
  });
  // return {
  //   statusCode: 200,
  //   body: JSON.stringify({ message: 'Success' }),
  // };
};
