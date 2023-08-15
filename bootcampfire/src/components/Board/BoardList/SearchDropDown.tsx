import React from 'react';
import DropDownCategory from './DropDownCategory';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import styled from 'styled-components';
import { StyledDropdown, StyledLI} from '../styled';
import { useDispatch } from 'react-redux';

interface DropDownList {
    current: number;
    category : string[];
}

let dummyData : DropDownList = {
    current: 0,
    category : ["제목+내용", "작성자"],
}

function SearchDropDown({visibility, searchType, dropDownHandler, visibilityHandler}: {
    visibility: boolean, 
    searchType: number, 
    dropDownHandler: (idx: number) => void
    visibilityHandler: React.Dispatch<React.SetStateAction<boolean>>}) {
    const dispatch = useDispatch();
    const [dropdownVisibility, setDropdownVisibility] = React.useState(false);
    const [dropdownSelect, setDropdownSelect] = React.useState(dummyData.current);

    const categoryList = dummyData.category.map((element, idx) => (
        <StyledLI key={element} onClick={() => dropDownHandler(idx)}>{element}</StyledLI>
    ))

    return (
        <StyledDropdown>
            <div onClick={e => visibilityHandler(!visibility)}>
                {!visibility && <ArrowDropDownIcon sx={{color: '#FF603D', fontSize: "40px", marginLeft: "10px"}}/>} 
                {visibility && <ArrowDropUpIcon sx={{color: '#FF603D'}}/>} 
            </div>
            <DropDownCategory visibility={visibility} >
                <ul className="search-category">
                    {categoryList}
                </ul>
            </DropDownCategory>
        </StyledDropdown>
    )
}

export default SearchDropDown;