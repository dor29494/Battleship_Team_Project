import React, { useContext } from "react"
import styled from "styled-components"
import { BsContext } from "../stateManager/stateManager"
let disabled_area = [];

const UserGrid = () => {
    const { ships_array, set_ships_array, grid_array, set_grid_array,grid_clicks,setgrid_clicks } = useContext(BsContext)

    const show = (e) => {
        if (!grid_clicks[e.target.id]) {
            console.log(e.target.id);
            grid_clicks[e.target.id] = e.target.id;
        }
    }

    return (
        <Wrapper>here
            <Grid>
                {grid_array.map((grid, index) => <Pixel id={grid[0] || index} key={`g${index}`} onClick={show}>{grid[0] || index}</Pixel>)}
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
width: 30px;
height: 30px;
border: 2px solid black;
display: flex;
align-items: center;
justify-content: center;


`
const Grid = styled.div`
display: flex;
flex-wrap: wrap;
height: 330px;
width: 330px;
background: yellow;

`