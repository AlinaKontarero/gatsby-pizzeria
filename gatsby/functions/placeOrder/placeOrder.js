const nodemailer = require('nodemailer');

const generateOrderemail = ({ order, total }) => `
  <div> 
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

// create a transport for nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
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

exports.handler = async (event, context) => {
  await wait(5000);
  const body = JSON.parse(event.body);
  // Check if `honeypot is submitted:
  if (body.mapleSyrup) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Woop woop! It's a cyber attack! Good bye, little mother hacker`,
      }),
    };
  }

  console.log(body);
  // validate coming data
  const requiredFields = ['email', 'name', 'order'];

  for (const field of requiredFields) {
    console.log(`checking field ${field}`);
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: `Oops! You forgot to add ${field}` }),
      };
    }
  }

  if (!body.order.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: `Why you ordered nothing?!` }),
    };
  }

  // send an email
  const info = await transporter.sendMail({
    from: "Slick's Slices <slick@example.com>",
    to: `${body.name} <${body.email}>, orders@example.com`,
    subject: 'New order!',
    html: generateOrderemail({
      order: body.order,
      total: body.total,
    }),
  });
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Success!',
    }),
  };

  // send success or error message
};
