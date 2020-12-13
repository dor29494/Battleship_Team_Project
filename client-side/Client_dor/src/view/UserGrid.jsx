import React, { useContext } from "react"
import styled from "styled-components"
import {BsContext} from "../stateManager/stateManager"
const UserGrid = ()=>{
const {ships_array,set_ships_array,grid_array,set_grid_array} = useContext(BsContext)





    return (
<Wrapper>here
    <Grid>
{grid_array.map((grid,index) => 
    <Pixel>{index}</Pixel>)}
    </Grid>
    </Wrapper>



    )
}
export default UserGrid

const Wrapper = styled.div`
border: 2px solid deeppink;
padding-right: auto;

`
const Pixel = styled.div`
min-width: 2rem;
min-height: 2rem;
border: 2px solid black;
`
const Grid = styled.ul`

`