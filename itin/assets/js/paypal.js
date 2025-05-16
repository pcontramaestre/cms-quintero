const fundingSources = [
    paypal.FUNDING.PAYPAL,
    paypal.FUNDING.CARD
]

for (const fundingSource of fundingSources) {

    const paypalButtonsComponent = paypal.Buttons({
        fundingSource: fundingSource,

        // optional styling for buttons
        // https://developer.paypal.com/docs/checkout/standard/customize/buttons-style-guide/
        style: {
            shape: 'pill',
            height: 40,
        },

        // set up the transaction
        createOrder: (data, actions) => {

            // pass in any options from the v2 orders create call:
            // https://developer.paypal.com/api/orders/v2/#orders-create-request-body
            const createOrderPayload = {
                payer: {
                    name: {
                        given_name: $("#first_name").val(),
                        surname: $("#last_name").val()
                    },
                    email_address: $("#email").val(),
                    payer_id: $("#pay-username").val()
                },
                purchase_units: [{
                    amount: {
                        /*value: $("#mount_all").val(),*/
                        value: document.getElementById("amount_for_this_order").value,
                        currency_code: "USD",
                    },
                }, ],
            }

            return actions.order.create(createOrderPayload)
        },

        // finalize the transaction
        onApprove: (data, actions) => {
            const captureOrderHandler = (details) => {
                const payerName = details.payer.name.given_name
                console.log('Transaction completed!');
                toastr.success('Transaction completed!');
            }
            $("#make_payment").click();
            //$("#submitbutton").click();
            return actions.order.capture().then(captureOrderHandler)
        },

        // handle unrecoverable errors
        onError: (err) => {
            console.error(
                'An error prevented the buyer from checking out with PayPal',
            )
            toastr.error(
                'An error prevented the buyer from checking out with PayPal',
            )
        },
    })

    if (paypalButtonsComponent.isEligible()) {
        paypalButtonsComponent
            .render('#paypal-button-container')
            .catch((err) => {
                console.error('PayPal Buttons failed to render')
                toastr.error('PayPal Buttons failed to render')
            })
    } else {
        console.log('The funding source is ineligible')
        toastr.error('The funding source is ineligible')
    }
}
