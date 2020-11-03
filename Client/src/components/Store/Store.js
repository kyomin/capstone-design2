import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';

import "./Store.scss";

function Store(props) {
  const [file, setFile] = useState(null);
  const [userId, setUserId] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [fileType, setFileType] = useState("");
  const [fileContents, setFileContents] = useState("");

  const handleUserId = (e) => {
    setUserId(e.currentTarget.value);
  }

  const handleFile = (e) => {
    const selectedFile = e.target.files[0];
    
    /* 파일 내용(contents)을 읽기 위한 객체 참조 변수 */
    const read = new FileReader();
    read.readAsText(selectedFile);
    read.onload = (e) => {
      setFileContents(e.target.result);
    }

    /* 나머지 파일 정보 셋팅 */
    setFileName(selectedFile.name);
    setFileSize(selectedFile.size);
    setFileType(selectedFile.type);
    setFile(selectedFile);
  }

  const handleStore = (e) => {
    e.preventDefault();

    // ID 입력에 대한 예외 처리!
    if(userId === '') {
      swal("", "ID를 입력해주십시오!", "error");
      return;
    }

    // 파일 선택을 마치지 않았는데, 제출 버튼을 눌렀다면
    if(file == null){
      swal("", "서버에 저장할 파일을 등록해 주십시오!", "error");
      return;
    }

    /* 제출 시각 처리. 요일 DD MM YYYY HH:MM:SS의 포멧을 맞춤 */
    const curruntTime = new Date().toString();
    const timeStamp = curruntTime.substr(0, 25).trim();
    
    const requestData = {
      userId,
      timeStamp,
      fileName,
      fileType,
      fileSize,
      fileContents
    };

    axios.post(`/api/store`, requestData)
    .then((res) => {
      swal("", "파일 저장 성공!", "success")
      .then(() => {
        props.history.push('/');
      });
    })
    .catch((err) => {
      swal("", "서버 문제로 파일 저장에 실패했습니다! \n 잠시 후 다시 시도해 주십시오!", "error");
      console.error(err);
    });
  }

  return (
    <div>         
      <div className="store_wrap">
        <div className="inner_title">
          <h1>파일 저장</h1>
        </div>
        <div className="store">
          <div className="store_box">
            <ul>
                <li className="input-wrap">
                  <label htmlFor className="input-lb">
                    Your ID
                    <span style={{ color: "#0081ff" }}>* </span>
                  </label>
                  <input
                    placeholder="파일 저장에 사용할 ID를 입력해 주시요"
                    type="text"
                    className="input-inp"
                    value={userId}
                    onChange={handleUserId}
                    required
                  />
                </li>

                <li className="input-wrap">
                  <label htmlFor className="input-lb">
                    File
                    <span style={{ color: "#0081ff" }}>* </span>
                  </label>
                  <input
                    type="file"
                    className="input-inp"
                    onChange={handleFile}
                    required
                  />
                </li>
                <br/>
                
                <li className="store_red_p">
                  * 제출 후, ID로 파일 조회가 가능합니다.
                </li>        
            </ul>
            
            <div className="center_div">
              <button
                className="blue_btn"
                onClick={handleStore}>
                  저장
              </button>
              
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
  );
}

export default withRouter(Store);