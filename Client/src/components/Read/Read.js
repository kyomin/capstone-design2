import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';
import MakeFileList from './Sections/MakeFileList/MakeFileList';

import "./Read.scss";
import searchBtn from "../../img/search_btn.png";

function Read() {
    const [userId, setUserId] = useState("");
    const [whosPage, setWhosPage] = useState("");
    const [fileList, setFileList] = useState([]);
    
    useEffect(() => {
        
    }, [fileList]);

    const handleRead = () => {
        // ID 입력에 대한 예외 처리!
        if(userId === '') {
            swal("", "ID를 입력해 주십시오!", "error");
            return;
        }

        axios.get(`/api/read/${userId}`)
        .then((res) => {
            setFileList(res.data.files);
        })
        .catch((err) => {
            swal("", "서버 문제로 파일 목록 불러오기에 실패했습니다. \n 잠시 후에 다시 시도해 주십시오.", "error");
            console.error(err);
        });
    }

    const handleUserId = (e) => {
        setUserId(e.currentTarget.value);
    }

    const keyPress = (e) => {
        if (e.keyCode === 13) {
            setWhosPage(userId);
            handleRead();
        }
    }

    return (
        <div className="read_wrap">
            <div className="read_head">
                <h1 className="read_title">
                    <p className="sub_title">
                        파일 조회하기
                    </p>
                    <div className="head_search">
                        <input
                            type="text"
                            className="head_input"
                            placeholder="ID를 입력하십시오."
                            value={userId}
                            onChange={handleUserId}
                            onKeyDown={keyPress}
                        />
                        {/* 돋보기 버튼 */}
                        <input
                            type="button"
                            className="head_input_btn"
                            onClick={handleRead}
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
                                { whosPage.length > 0 ? whosPage + "'s file list" : '' }
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
                                        fileList={fileList}
                                        userId={userId}
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
    );
}

export default withRouter(Read);