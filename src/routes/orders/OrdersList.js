import React from 'react';
import axios from 'axios';
import OrderItem from './OrderItem';
import './OrdersList.css';

class OrdersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [], // Inicialmente, a lista de pedidos está vazia.
    };
  }

  componentDidMount() {
    this.fetchOrders(); // Chamamos fetchOrders quando o componente é montado.
  }

  fetchOrders = async () => {
    try {
      const response = await axios.get('api/orders');
      const ordersWithItems = await Promise.all(response.data.map(async order => {
        const itemsResponse = await axios.get(`api/orders_itens/${order.numero_transacao}`);
        order.items = itemsResponse.data;
        return order;
      }));
      this.setState({ orders: ordersWithItems });
    } catch (error) {
      console.error('Error when fetching orders', error);
      throw error;
    }
  }

  render() {
    const { orders } = this.state; // Alteramos para usar o estado local.

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
