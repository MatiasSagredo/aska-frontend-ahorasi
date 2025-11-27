import Div from '../atoms/Div.jsx';
import Text from '../atoms/Text.jsx';
import Image from '../atoms/Image.jsx';
import Button from '../atoms/Button.jsx';
import Separator from '../atoms/Separator.jsx';


function ProductCard({ name, description, precio, marca, image, onClickCompra, onClickInfo }) {

    return (
        <article className="bg-secondary rounded-md relative w-full border border-white/10">
            <Div className="flex flex-col justify-between h-full">
                <Div className="flex flex-col p-4">
                    <Text variant='h3' className="font-heading text-2xl font-bold">{name}</Text>
                    <Text className={"text-gray-300"}>{description}</Text>
                </Div>
                <Div className="flex flex-col">
                    <Image src={image} alt={`imagen de ${name}`} className="w-full h-36 md:h-40 object-contain my-2 rounded-2xl p-4" />
                    <Separator />
                    <Div className="flex items-center justify-between my-2 px-4">
                        <Text>Precio: ${precio}</Text>
                        <Text className={"text-gray-400"}>{marca}</Text>
                    </Div>
                    <Div className="flex flex-col p-4">
                        <Button onClick={onClickCompra} className={"bg-button-success mb-2 hover:shadow-2xl hover:shadow-black from-button-success to-button-success-to bg-linear-to-br hover:from-20%"}>Comprar</Button>
                        <Button onClick={onClickInfo} className={"bg-button hover:shadow-2xl hover:shadow-black"}>Ver Informacion</Button>
                    </Div>
                </Div>
            </Div>
        </article>
    )
}

export default ProductCard;
