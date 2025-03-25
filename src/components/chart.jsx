import { Card } from 'primereact/card';  // Importando o componente Card do PrimeReact

const MyCard = () => {
  return (
    <Card title="Gastos por categoria" className="shadow-lg rounded-lg border border-gray-200 p-4">
      {/* Adicione o conteúdo aqui */}
      <div className="text-gray-700 text-sm">
      </div>
    </Card>
  );
};

export default MyCard;

