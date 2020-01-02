import React, { Component, Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';

import MakeFileList from '../MakeFileList/MakeFileList';
import * as constants from "../../constants.js";

// Read 페이지 전용 CSS 클래스를 import한다.
import "./Read.scss";

// 쿼리 스트링 파싱하는 함수 import!
import { getParams } from "../../Utils/QueryString";

// Image import!
import searchBtn from "../../Img/search_btn.png";


class Read extends Component{
    constructor(props)
    {
        super(props);

        // state 변수들 정의
        this.state = 
        {
            fileList: [],   // 서버로부터 불러오는 파일 리스트
            userID: '',  // 사용자로부터 입력받는 유저 아이디
            whosPage: '',   // 현재 누구의 파일을 읽어서 온 페이지인가?    

            // query string을 object화 한다.
            parsingObj: getParams(window.location.href)
        }
    }

    // 처음 그려질 때 한 번만!
    componentDidMount = () => {
        // userID가 params에 담겨 온다면
        if(this.state.parsingObj.userID !== undefined) {
            this.setState({
                userID: this.state.parsingObj.userID,
                whosPage: this.state.parsingObj.userID
            }, () => {
                // userID의 길이가 0이 아니라면 불러오기 실행
                if(this.state.userID.length > 0)
                {
                    this.handleRead();
                } else {
                    swal("", "ID를 입력해 주십시오!", "error");
                }
                
            })
        } else {    
            // 담겨오지 않는 페이지라면
            // 아무것도 하지 않는다.
        }
    }

    /*
        this.props.history.push와 같은 함수에 의해 컴포넌트(this)의 props의 변화가 일어났다면
        다음의 함수 실행
    */
   componentDidUpdate(prevProps, prevState) {
       // props에 변화가 생겼다면
       if(prevProps != this.props) {
        this.setState({
        // query string을 재 object화 한다.
          parsingObj: getParams(window.location.href)
        }, () => {
            // userID 재 셋팅 및 현재 누구의 페인지인가 정보도 셋팅
            this.setState({
                userID: this.state.parsingObj.userID,
                whosPage: this.state.parsingObj.userID
            }, () => {
                // userID의 길이가 0이 아니라면 불러오기 실행
                if(this.state.userID.length > 0)
                {
                    this.handleRead();
                } else {
                    swal("", "ID를 입력해 주십시오!", "error");
                }
            })
        })
       }
   }
    
 
    /*
        client에서 userID를 입력해서 클라우드 서버로 보내는 과정을 처리하는 함수
        해당 user가 서버에 저장한 파일의 리스트 불러오기를 요청하는 작업.
        GET으로 요청할 것이다.
    */
    handleRead = () => {
        if(this.state.userID.length > 0)
        {
            
            axios.get(`${constants.URL_BACK}/read?userID=${this.state.userID}`)
            .then(res => {
                this.setState({
                    fileList: res.data 
                });
            })
            .catch(err => {
                console.log(err);
            })

        } else{
            swal("", "ID를 입력해주십시오!", "error");
        }

    }

    // input 창에서 엔터 키 Press 시에 '검색' 이벤트 발생시키는 함수
    keyPress = (e) => {
        if (e.keyCode === 13) {
        this.handleFilter();
        }
    };

    // 아이디 검색 시에 새로운 url에서 렌더링 시키기
    handleFilter = () => {
        this.props.history.push({
            pathname: `/read`,
            search: `?userID=${this.state.userID}`
        })
    }

    render() {
        return (
        <div className="read_wrap">
            <div className="read_head">
                <h1 className="read_title">
                    <p className="sub_title">
                        파일 조회하기
                    </p>
                    <div className="head_search">
                        {/* User ID 입력 창 */}
                        <input
                            type="text"
                            className="head_input"
                            placeholder="ID를 입력하십시오."
                            value={this.state.userID}
                            onChange={e => {
                                this.setState({
                                    userID: e.target.value
                                });
                            }}
                            onKeyDown={e => this.keyPress(e)}
                        />
                        {/* 돋보기 버튼 */}
                        <input
                            type="button"
                            className="head_input_btn"
                            onClick={e => this.handleFilter()}
                            style={{ backgroundImage: `url(${searchBtn})` }}
                        />
                    </div>
                </h1>
            </div>
            {/* 해당 유저의 파일 list */}
            <div className="file_list_wrapper">
                <div className="file_box">
                    <div className="file_inner">
                        <div className="type01">
                            {/* 대상 유저 아이디 */}
                            <div className="file_inner_tit">
                                { this.state.whosPage.length>0 ?
                                this.state.whosPage
                                    + "'s file list" : ''
                                }
                            </div>
                            {/* 대상 유저의 파일들 */}
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                        <div className="file_list_accordian">
                                            <div className="file_list_wrap">
                                                <div className="subject">
                                                    File Name
                                                </div>
                                            </div>
                                        </div>
                                        </td>
                                        <td>
                                        <div className="file_list_accordian">
                                            <div className="file_list_wrap">
                                                <div className="subject">
                                                    File Type
                                                </div>
                                            </div>
                                        </div>
                                        </td>
                                        <td>
                                        <div className="file_list_accordian">
                                            <div className="file_list_wrap">
                                                <div className="subject">
                                                    File Size
                                                </div>
                                            </div>
                                        </div>
                                        </td>
                                        <td>
                                        <div className="file_list_accordian">
                                            <div className="file_list_wrap">
                                                <div className="subject">
                                                    Submit Time
                                                </div>
                                            </div>
                                        </div>
                                        </td>
                                    </tr>
                                    <MakeFileList
                                        fileList={this.state.fileList}
                                        userID={this.state.parsingObj.userID}
                                    />
                                </tbody>
                            </table>
                            <div className="center_div">
                            <Link to="/">
                            <button
                                className="white_btn">
                                취소
                            </button>
                            </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}


export default withRouter(Read);