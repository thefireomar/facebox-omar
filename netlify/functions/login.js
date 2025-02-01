// netlify/functions/login.js
exports.handler = async (event, context) => {
  // Parse the POST data (assumes JSON format)
  const { username, password } = JSON.parse(event.body);

  // In a real-world scenario, add your database or authentication logic here.
  // This sample code simply checks if both fields are provided.
  if (username && password) {
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Login successful' })
    };
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify({ success: false, message: 'Invalid credentials' })
    };
  }
};
