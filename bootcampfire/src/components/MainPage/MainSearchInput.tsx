import React, { useState, ChangeEvent, FormEvent } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import SearchDropDown from 'components/Board/BoardList/SearchDropDown';
import { useNavigate } from 'react-router-dom';
import { colors } from 'constant/constant';

interface DropDownList {
  current: number;
  category : string[];
}

let dummyData : DropDownList = {
  current: 0,
  category : ["제목+내용", "작성자"],
}

export default function InputSection() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [dropdownVisibility, setDropdownVisibility] = React.useState(false);
  const [dropdownSelect, setDropdownSelect] = React.useState(dummyData.current);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    const searchType = dropdownSelect === 0 ? 'keywords' : 'nickname';
    navigate(`/mainSearch/${searchType}/${searchTerm}`);
  };

  const handleLiClick = (idx: number) => {
    setDropdownSelect(idx);
    setDropdownVisibility(false);
}

  return (
    <Paper
      component="form"
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '99%',
        maxWidth: '745px',
        border: 3,
        height: "60px",
        borderColor: '#FF603D',
        borderRadius: 10,
        boxShadow: 'none',
        padding: "none",
        margin: "25px auto 25px auto",
      }}
      className='asdfasdfasdfasdfasdfasdf'
    // <form style={{
    //   // p: '2px 4px',
    //   display: 'flex',
    //   alignItems: 'center',
    //   width: '99%',
    //   maxWidth: '500px',
    //   border: 3,
    //   borderColor: '#FF603D',
    //   borderRadius: 10,
    //   boxShadow: 'none',
    // }}
      onSubmit={handleSearchSubmit}>
      <SearchDropDown 
        visibility= {dropdownVisibility}
        searchType= {dropdownSelect}
        dropDownHandler= {handleLiClick}
        visibilityHandler = {setDropdownVisibility}
      />
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="검색하세요"
        inputProps={{ 'aria-label': 'search google maps' }}
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon sx={{color: colors.PRIMARY, fontSize: "40px", marginRight: "5px"}}/>
      </IconButton>
    {/* </form> */}
    </Paper>
  );
}