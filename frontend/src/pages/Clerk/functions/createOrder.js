export async function createOrder (priceTotal, price, money, paymentType, quantity, service, student, cleanFieldsStudent) {
    try {
        const  orderData = {
            price_total: Number(priceTotal),
            price: Number(price),
            type_payment: paymentType.toUpperCase(),
            quantity_kg: Number(quantity),
            id_service: Number(service)
        }

        if(student && student.registration) {
            orderData.registration_student = student.registration;
        }
        const token = localStorage.getItem('clerk_authToken');     

        const response = await fetch("http://localhost:3030/order/create", {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify( orderData )
        })

        if(response.ok) {
            cleanFieldsStudent();
            alert("Atendimento realizado com sucesso");
            alert("Troco: " + (money-price).toFixed(2))
        } else {
            alert("Erro no servidor");
        }
    } catch(error) {
        alert("ERRO! Não conseguimos conectar ao servidor para enviar o atendimento");
    }
}