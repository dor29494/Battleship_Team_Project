import React, { useContext, useState } from "react"
import styled from "styled-components"
import { BsContext } from "../stateManager/stateManager"

const UserGrid = () => {
    const { ships_array, set_ships_array, grid_array, set_grid_array,grid_clicks,set_grid_clicks } = useContext(BsContext)
const [abc_store , set_abc_store] = useState(['A','B','C','D','E','F','G','H','I','J'])
    const show = (e) => {
        // if (!grid_clicks[e.target.id]) {
        //     grid_clicks[e.target.id] = e.target.id;
        // }
        console.log(e.target.id);
        // console.log(grid_clicks);

    }

    return (
        <Wrapper>here
            <AbcWrapper>
            {abc_store.map(abc => <AbcDiv>{abc}</AbcDiv>)}
                </AbcWrapper>
            <Grid>
                {grid_array.map((xArr,Xindex) =><Pixel> id={Xindex}</Pixel> && xArr.map((yArr, Yindex) => <Pixel id={Xindex,Yindex} value={Yindex} key={`g${Yindex}`} onClick={show}>{Xindex}{Yindex}</Pixel>))}
                {/* {grid_array.map((grid, index) => <Pixel id={ index} value={index} key={`g${index}`} onClick={show}></Pixel>)} */}
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
const AbcWrapper = styled.div`
border: 2px solid black;
min-height: 2rem;
width: 330px;
display: flex;

`
const AbcDiv = styled.div`
flex-basis: 10%;
padding: 2px;
margin-left: 5px;

`