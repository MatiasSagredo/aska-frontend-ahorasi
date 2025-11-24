import Div from '../atoms/Div.jsx';
import Text from '../atoms/Text.jsx';
import Image from '../atoms/Image.jsx';
import Button from '../atoms/BUtton.jsx';


function ProductCard({ name, description, precio, marca, image, onClick }) {

  return (
    <article className="bg-secondary w-fit p-4 rounded border-2 border-[#c5c5c5] relative">
      <Div className="" aria-hidden="true" />
      <Text variant='h3' className="font-heading text-3xl font-bold">{name}</Text>
      <Text>{description}</Text>
      <Image src="/perroia.webp" alt={`imagen de ${name}`} className="w-full h-36 md:h-40 object-contain my-2 rounded-2xl" />
      <Div className="flex items-center justify-between mt-2">
        <Text className={""}>Precio: ${precio}</Text>
        <Text className={""}>Marca: {marca}</Text>
      </Div>
      <Button className={"bg-button-primary"}>Comprar</Button>
    </article>
  )
}

export default ProductCard;
