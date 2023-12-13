import React from 'react';
import axios from 'axios';
import OrderItem from './OrderItem';
import './OrdersList.css';

class OrdersList extends React.Component {
  state = {
    orders: [],
    userName: null, // Estado para armazenar o nome do usuário logado
  };

  componentDidMount() {
    this.fetchUserName();
    this.fetchOrders();
  }

  fetchUserName = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.nome) {
      this.setState({ userName: user.nome });
    }
  };

  fetchOrders = async () => {
    try {
      // Obtenha todos os pedidos
      const ordersResponse = await axios.get('/api/orders');
      const orders = ordersResponse.data;

      // Obtenha os detalhes dos itens de cada pedido em paralelo
      const itemsPromises = orders.map(order =>
        axios.get(`/api/orders_itens/${order.numero_transacao}`)
      );
      const itemsResponses = await Promise.all(itemsPromises);

      const clientPromises = orders.map(order =>
        axios.get(`/api/client/${order.external_reference}`)
      );
      const clientResponses = await Promise.all(clientPromises);

      const ordersWithItemsAndClients = orders.map((order, index) => ({
        ...order,
        items: itemsResponses[index].data,
        cliente: clientResponses[index].data,
      }));

      // Filtre os pedidos para incluir apenas aqueles relacionados ao nome do usuário logado
      const userOrders = ordersWithItemsAndClients.filter(order =>
        order.cliente.nome === this.state.userName
      );

      this.setState({ orders: userOrders });
    } catch (error) {
      console.error('Error when fetching orders', error);
    }
  }

  render() {
    const { orders } = this.state;

    return (
      <div className="orders-list-container">
        <h1>Pedidos</h1>
        <ul className="orders-list">
          {orders.map(order => (
            <OrderItem key={order.numero_transacao} order={order} />
          ))}
        </ul>
      </div>
    );
  }
}

export default OrdersList;
