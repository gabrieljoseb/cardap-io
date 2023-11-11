const webhookHandler = async (req, res) => {
    if (req.method === 'POST') {
      try {
        const { type, data } = req.body;
  
        // Verificar o tipo do webhook e tratar os dados conforme necessário.
        // Por exemplo, para um pagamento, você pode querer extrair informações da transação.
        if (type === 'payment') {
          const { id, status, payer } = data;
          // Lógica para processar a notificação de pagamento.
        }
  
        // Log e resposta de sucesso.
        console.log('Webhook recebido:', req.body);
        res.status(200).send('Webhook recebido com sucesso');
      } catch (error) {
        // Log e resposta de erro.
        console.error('Erro ao processar webhook:', error);
        res.status(500).send('Erro interno do servidor');
      }
    } else {
      // Permitir apenas métodos POST.
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  };
  
  // Exportar a função nomeada como padrão.
  export default webhookHandler;
  