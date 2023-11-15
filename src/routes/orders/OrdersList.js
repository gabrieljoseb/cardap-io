import React from 'react';
import axios from 'axios';
import OrderItem from './OrderItem';
import './OrdersList.css';

class OrdersList extends React.Component {
  state = {
    orders: [],
  };

  componentDidMount() {
    this.fetchOrders();
  }

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

      // Associe os itens de pedido aos seus respectivos pedidos
      const ordersWithItems = orders.map((order, index) => {
        return {
          ...order,
          items: itemsResponses[index].data,
        };
      });

      // Obtenha informações do cliente para cada pedido em paralelo
      const clientPromises = ordersWithItems.map(order =>
        axios.get(`/api/client/${order.external_reference}`)
      );
      const clientResponses = await Promise.all(clientPromises);

      // Associe as informações do cliente aos seus respectivos pedidos
      const ordersWithItemsAndClients = ordersWithItems.map((order, index) => {
        return {
          ...order,
          cliente: clientResponses[index].data,
        };
      });

      this.setState({ orders: ordersWithItemsAndClients });
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
