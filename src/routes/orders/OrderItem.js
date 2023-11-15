import React from 'react';
import './OrderItem.css';

class OrderItem extends React.Component {
  getStatusColor = (status) => {
    switch (status) {
      case 'Pendente':
        return '#FFBC80'; // Pastel orange
      case 'Em Preparo':
        return '#FFFDA1'; // Pastel yellow
      case 'Finalizado':
        return '#98FB98'; // Pastel green
      case 'Cancelado':
        return '#FF6B6B'; // Pastel red
      default:
        return '#D3D3D3'; // Light gray for default or unknown status
    }
  };

  render() {
    const { order } = this.props;
    const { cliente } = order; // Desestruture 'cliente' de 'order'

    return (
      <li className="order-item" style={{ backgroundColor: this.getStatusColor(order.status) }}>
        <div>Pedido: #{order.numero_transacao}</div>
        <div>Cliente: {cliente.nome} - Mesa: {cliente.mesa_id}</div>
        <div>
          Itens:
          <ul>
            {order.items && order.items.map(item => (
              <li key={item.id}>
                {item.nome} - Quantidade: {item.quantidade}
              </li>
            ))}
          </ul>
        </div>
        <div className='status'>Status: {order.status}</div>
      </li>
    );
  }
}

export default OrderItem;