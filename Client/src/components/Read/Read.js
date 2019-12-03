import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { withRouter, Link } from 'react-router-dom';
import FileInfo from '../FileInfo/FileInfo';

import * as constants from "../../constants.js";

const axios = require('axios');

class Read extends Component{
    constructor(props)
    {
        super(props);

        // state 변수들 정의
        this.state = 
        {

            // Read
            isRead : false,
            userID : '',
            timeStamp : '',
            file : '',

            // 리스트의 각 원소를 다루기 위한 변수
            selectedKey : -1
        }

        // 클라우드에 저장한 파일들을 리스트의 형태로 가져올 것이다.
        this._receiveFileList = this._receiveFileList.bind(this);

        // selectedKey를 다시 아무것도 선택되지 않은 상태인 -1로 만든다.
        this.resetKey = this.resetKey.bind(this);

        // 클라우드로부터 불러온 파일 리스트들을 div에 담아서 띄울 것이다.
        // 그 중에서 사용자가 선택할 수 있게 도와주는 함수이다.
        this.handleClick = this.handleClick.bind(this);

        // request 시에 서버로 보낼 userID의 input창 변화 감지를 위한 함수.
        this.handleChange = this.handleChange.bind(this);

        // client에서 userID를 입력해서 클라우드 서버로 보내는 과정을 처리하는 함수
        this.handleRead = this.handleRead.bind(this);

    }

    resetKey()
    {
        this.setState(
            {
                selectedKey : -1
            }
        )
    }

    handleChange(e)
    {
        let nextState = {};

        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    // 클라우드 DB에서 해당 userID가 저장한 파일들 불러오기!
    _receiveFileList(data)
    {
        const FileList = data;

        this.setState(
            {
                FileList
            }
        )
    }

    // 불러온 파일 리스트를 사용자가 관리할 수 있게 도와주는 함수
    handleClick(key)
    {
        // 사용자가 리스트 중 하나를 클릭할 경우
        this.setState(
            {
                // state 변수를 해당 인덱스 번호로 셋팅
                selectedKey : key
            }
        )

        // 만일 클라이언트의 유저가 리스트의 특정 원소를 클릭했다면!
        if(this.state.selectedKey != -1)
        {
            this.setState(
                {
                    timeStamp : this.state.FileList[this.state.selectedKey].timeStamp,
                    file : this.state.FileList[this.state.selectedKey].fileName
                }
            )
        }
        


    }

    // 해당 user가 서버에 저장한 파일의 리스트 불러오기를 요청하는 작업.
    // get으로 요청할 것이다.
    handleRead()
    {
        if(this.state.userID.length > 0)
        {
            const id = this.state.userID;
            
            // 얘는 클라우드의 url이 될 것이다. 추후에 받는다.
            const url = 'http://localhost:3001?userID=';

            // get 메소드로 클라우드로 요청을 보낸다.
            axios.get(url + id, { crossdomain: true })
            .then( (response) => {

                // 클라우드로부터 데이터를 잘 받아왔는지 확인 작업!
                console.log(response.data);

                // 비어있을 시에 이 문자열을 보내라고 서버 작업자에게 알려줄 것!
                if(response.data.Response === "LIST_EMPTY")
                {
                    alert("DB에 파일 리스트가 없어 불러오지 못하였습니다.")
                }
                else{

                }

            })

        }

        else
        {
            alert('빈 칸을 모두 채워주십시오!');
        }

    }

    // 적용 문법 : render 안에 정의한 함수는 constructor 안에서 bind시킬 필요가 없다.
    render() {
        // render 안의 함수 정의! 불러온 리스트 목록을 화면에 띄우는 함수 정의.
        const mapToComponent = (data) =>
        {
            // 첫째 인자는 리스트의 각 원소들, 둘째 인자는 그 원소의 인덱스
            return data.map( (file, i) =>
            {
                return(                    
                    <FileInfo
                        file = {file}
                        key = {i}
                        onClick = {()=>this.handleClick(i)}
                    />
                );
            });           
        }

        // 조회 작업의 창을 띄우는 변수이다.
        const Read = 
        (
            <div
                style = {
                    {
                        width : '300px',
                        height : '300px',
                        border : '3px solid tomato'
                    }

                }
            
            >
                <h1
                    style = {
                        {
                            textAlign : 'center'
                        }
                    }
                >파일을 불러오세요!</h1>

                <br/><br/>
                ID : &nbsp;&nbsp;
                <input
                    type = 'text'
                    name = 'userID'
                    value = {this.state.userID}
                    onChange = {this.handleChange}
                />
                <br/><br/>

                <CenterPara>
                    <OkButton
                        style = {
                        {
                            background : 'blue', color : 'white',
                            cursor : 'pointer'
                        }
                        }
                        className = 'clickButtonEffect'
                        onClick = {this.handleRead}          
                    >
                    OK
                    </OkButton>
                    
                    &nbsp;&nbsp;

                    <Link to = "/">
                        <CancelButton
                            style = {
                            {
                                background : 'red', color : 'white',
                                cursor : 'pointer'
                            }
                            }
                            className = 'clickButtonEffect'
                            
                        >
                            Cancel
                        </CancelButton>
                    </Link>
                </CenterPara>
                
            </div>
        )


        return(
            <Fragment>
                
                {Read}

                {/* 메뉴 리스트 불러오기가 성공했다면 그것들을 화면에 띄우기! */}
                {this.state.FileList?
                // 참인 경우!
                <Fragment>
                    <p>
                        <FileContainers>
                        <CenterPara>불러온 파일 정보 현황! </CenterPara>
                        <br></br><br></br>
                        {mapToComponent(this.state.FileList)}                      
                        </FileContainers>
                    </p>

                    
            
                
            </Fragment> : ''}

            </Fragment>
        )

    }
    
}


const OkButton = styled.button`
    
    padding: 5px;
    width: 60px;
    height: 35px;
    color: white;
    font-weight: 600;
    -webkit-appearance: none;
    cursor: pointer;
    text-align: center;
    background-color: blue;

`;

// 취소 버튼의 스타일 정의
const CancelButton = styled.button`
    padding: 5px;
    width: 60px;
    height: 35px;
    color: white;
    font-weight: 600;
    -webkit-appearance: none;
    cursor: pointer;
    text-align: center;
    background-color: red;
`;


// 파일 표시 영역 범위 정의
const FileContainers = styled.div`
  
  height: 100%;
  width: 200px; 
  border: 1px solid gray;
  margin: 30px;
  flex-shrink: 1; 
  float: right;
    
`;

// 불러온 파일 목록들 표시 영역 범위 정의
const MenuDetailInfoContainers = styled.div`
  
  height: 100%;
  width: 800px;  
  float: right;    
`;


const CenterHead = styled.h1`
  text-align: center;
  color: red;
`;

const CenterPara = styled.p`

  text-align: center;
  color: blue;

`;


export default withRouter(Read);