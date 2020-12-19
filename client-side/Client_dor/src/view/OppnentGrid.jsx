import React, { useContext, useState } from "react"
import styled from "styled-components"
import { BsContext } from "../stateManager/stateManager"
// Last update - Dor
const UserGrid = () => {
    const { ships_array, set_ships_array, grid_array, set_grid_array,grid_clicks,set_grid_clicks } = useContext(BsContext)
const [abc_store , set_abc_store] = useState(['A','B','C','D','E','F','G','H','I','J'])
const [num_store, set_num_store] = useState([1,2,3,4,5,6,7,8,9,10])
    const show = (x,y) => {
        if (!grid_clicks[x+y]) {
            grid_clicks[x+y] = x+y;
            console.log(grid_clicks)
            console.log(x,y);
const PixelObj = {
    x,
    y
}
return PixelObj
        }
        // console.log(grid_clicks);

    }

    return (
        <Wrapper>Your Grid
                <NumWrapper>
            {num_store.map(num => <NumDiv>{num}</NumDiv>)}
                </NumWrapper>
            <AbcWrapper>
            {abc_store.map(abc => <AbcDiv>{abc}</AbcDiv>)}
                </AbcWrapper>
            <Grid>
                {grid_array.map((xArr,Xindex) => xArr.map((yArr, Yindex) => <Pixel id={Xindex} value={Yindex} key={`g${Yindex}`} onClick={()=>{show(Xindex,Yindex)}}>{Xindex}{Yindex}</Pixel>))}
            </Grid>
           
        </Wrapper>
    )
}
export default UserGrid

const Pixel = styled.div`
min-width: 2rem;
min-height: 2rem;
width: 50px;
height: 50px;
display: flex;
align-items: center;
justify-content: center;
cursor: pointer;
border: 1px solid #00FF41;
`
const Grid = styled.div`
display: flex;
flex-wrap: wrap;
height: 500px;
width: 500px;
color: #003B00;

`
const Wrapper = styled(Grid)`
border: none;
color: white;
`
const AbcWrapper = styled.div`
border: 2px solid black;
min-height: 2rem;
width: 500px;
display: flex;

`
const NumWrapper = styled.div`
// border: 1px solid white;
width: 50px;
height: 500px;
display: flex;
flex-direction: column;
justify-content: center;
justify-items: center;
position: absolute;
left: 930px;
top: 310px;
`
const AbcDiv = styled.div`
flex-basis: 10%;
height: 50px;
width: 50px;
// border: 1px solid white;
display: flex;
align-items: center;
justify-content: center;

`
const NumDiv = styled.div`
flex-basis: 10%;
height: 50px;
margin-left: 5px;
// border: 1px solid white;
display: flex;
justify-content: center;
width: 50px;

`