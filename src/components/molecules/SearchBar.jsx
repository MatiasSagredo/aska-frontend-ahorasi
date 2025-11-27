import Input from '../atoms/Input.jsx';
import Div from '../atoms/Div.jsx';
import Icon from '../atoms/Icon.jsx';
import { useState } from 'react';

function SearchBar({ placeholder, onChange = () => { } }) {
    let [val, setVal] = useState("");
    return (
        <Div>
            <Input className="mb-4 text-white" type='search' value={val} placeholder={placeholder} onChange={(e) => { setVal(e.target.value); onChange(e); }} />
            <Icon />
        </Div>
    )
}

export default SearchBar;
