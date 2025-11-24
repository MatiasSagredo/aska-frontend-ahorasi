import Input from '../atoms/Input.jsx';
import Div from '../atoms/Div.jsx';

function SearchBar({placeholder, onChange = () => {}}) {
    return (
        <Div>
            <Input className="" placeholder={placeholder} onChange={onChange} />
            <Icon />
        </Div>
    )
}

export default SearchBar;
