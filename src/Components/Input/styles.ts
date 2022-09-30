import styled from "styled-components"

interface Props {
    error: any
}

export const Container = styled.div`
display: flex;
flex-direction: column;
text-align: left;
margin: 10px 0;
`

export const Input = styled.input<Props>`
border: none;
height: 30px;
border-radius: 4px;
margin-top: 5px;
background-color: ${props => props.error ? ("#FFCCCB") : ("#dfe6eb")};
`
