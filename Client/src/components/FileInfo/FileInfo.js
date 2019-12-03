import React from 'react';
import styled from 'styled-components';



export default class FileInfo extends React.Component
{
    render()
    {
        return(
            <Div 
            className = 'yellowHover clickDivEffect' 
            
            onClick = {this.props.onClick}>
                {this.props.file.timeStamp}
                &nbsp;&nbsp;&nbsp;&nbsp;
                {this.props.file.fileName}
                <br></br>
            </Div>
        );
    }
}

const Div = styled.div`
    
    font-weight: 600;
    
    cursor: pointer;
    
    text-align: center;
    width: 200px;
    height: 30px;
    
`;