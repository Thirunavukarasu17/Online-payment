const paypal = require('@paypal/checkout-server-sdk');

// Set up PayPal SDK
const clientId = 'AWZ0DzFX5A7uwLMtsclxrUiLYn7KZd02cSAUJRjD6vb7o4I2smMLBe5vZ3tXUgP-78IghPklRgdOM5R2';
const clientSecret = 'ELeINHX-zxZbzP3-59n7LDHzwyJqjo_U4mktstetzERR3fOLA7HiiUuakgjf1xndpV5wQPfbTTQ-5d51';

const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

async function initiatePayment(amount) {
    try {
        const request = new paypal.orders.OrdersCreateRequest();
        request.prefer("return=representation");
        request.requestBody({
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD',
                    value: amount.toFixed(2)
                }
            }]
        });

        const response = await client.execute(request);
        const orderId = response.result.id;
        const approvalLink = response.result.links.find(link => link.rel === 'approve').href;

        return { orderId, approvalLink };
    } catch (error) {
        console.error('Error initiating PayPal payment:', error);
        throw new Error('Failed to initiate PayPal payment');
    }
}

// Function to capture payment
async function capturePayment(orderId) {
    try {
        const request = new paypal.orders.OrdersCaptureRequest(orderId);
        request.requestBody({});

        const response = await client.execute(request);
        const captureId = response.result.purchase_units[0].payments.captures[0].id;

        return captureId;
    } catch (error) {
        console.error('Error capturing PayPal payment:', error);
        throw new Error('Failed to capture PayPal payment');
    }
}

module.exports = {
    initiatePayment,
    capturePayment
};
