import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import swal from 'sweetalert';

// 수시로 변동되는 BACK_URL을 상수로 정의한 것을 받아온다.
import * as constants from "../../constants.js";
// Store 페이지 전용 CSS 클래스를 import한다.
import "./Store.scss";


// SHA256 해시 작업을 위한 변수 생성.
var sha256 = require('js-sha256');

class Store extends Component
{
  constructor(props)
  {
      super(props);

      this.state = 
      {
        // Store
        userID : '',
        file : null,
        fileInfo : {}
      };
  }

  // file용 input창의 변화 감지 처리를 위한 함수.
  hadnleFile = (e) =>
  {
    var file = e.target.files[0];

    // 파일 내용을 읽기 위한 객체 참조 변수
    var read = new FileReader();

    /*
      이 객체에는 파일 이름, 파일 사이즈, 파일 타입, 파일 내용물이 담긴다.
    */
    var fileObj = {
      name : file.name,
      size : file.size,
      type : file.type
    };

    read.readAsBinaryString(file);

    read.onload = e => {

      fileObj['contents'] = e.target.result;
    
    }

    console.log(fileObj);

    this.setState(
      {
        file : file,
        fileInfo : fileObj
      }
    )
    
    console.log(e.target.files);
    console.log(e.target.files[0]);
  }

  
  // '저장' 버튼을 눌렀을 때의 이벤트를 처리하는 함수
  handleStore = () =>
  {
    // 사용자가 서버에 저장할 로컬 파일의 선택을 마쳤다면
    if(this.state.file != null) {

      // ID 입력에 대한 예외처리!
      if(this.state.userID == '') {
        swal("", "ID를 입력해주십시오!", "error");
        return;
      }

      // 현재 시간을 today 변수에 담는다.
      var curruntTime = new Date().toString();

      // 요일 DD MM YYYY HH:MM:SS의 형태만을 추출하기 위한 작업.
      var timeStamp = curruntTime.substr(0, 24);

      // 현재 시간의 문자열 잘 처리되었나 콘솔로 찍어보기
      console.log(timeStamp);
      
      /*
        fileInfo, date, ID를 담은 폼 데이터를 이용하여 해시 값 추출!
      */
      var hash = sha256(this.state.userID + timeStamp + JSON.stringify(this.state.fileInfo));

      // 해시 값 추출이 잘 되었나 콘솔로 찍어보기
      console.log(hash);

      // 서버로 보낼 폼 데이터 변수를 선언한다.
      const formData = new FormData();

      // 폼 데이터에 값들 담기!
      formData.append("file", this.state.file); // 파일 원본
      formData.append("fileName", this.state.fileInfo.name);  // 파일 이름
      formData.append("fileSize", this.state.fileInfo.size);  // 파일 크기
      formData.append("fileType", this.state.fileInfo.type);  // 파일 타입
      formData.append("date", timeStamp); // 업로드 날짜
      formData.append("ID", this.state.userID); // 유저 아이디
      formData.append("hash", hash);  // 해시 값
      

      // 폼 데이터 콘솔로 찍어보기 => 잘 찍힌다
      console.log(formData.get('file'));
      console.log(formData.get('fileName'));
      console.log(formData.get('fileSize'));
      console.log(formData.get('fileType'));
      console.log(formData.get('date'));
      console.log(formData.get('ID'));
      console.log(formData.get('hash'));

      fetch(`${constants.URL_BACK}/upload`, {
        method: "POST", // 메소드는 POST
        headers: { },
        body: formData  // body에 폼 데이터를 담아서 보낸다.
      })
      .then(response => response.json())
      .then(response => {
        if (response.message === "SAVE_SUCCESS") {
          swal("", "파일 저장이 완료되었습니다.", "success");
        } else {
          swal("", "파일 저장에 실패했습니다.", "error");
        }
      })
      .catch(err => {
        swal("", "파일 저장에 실패했습니다.", "error");
        console.log(err);
      });

    } else {
      swal("", "파일을 업로드 하십시오", "error");
    }

  }

  render() {
    return (
      <div>         
        <div className="store_wrap">
          <div className="inner_title">
            <h1>파일 저장</h1>
          </div>
          <div className="store">
            <div className="store_box">
              <ul>
                  {/* 유저 아이디 입력 */}
                  <li className="input-wrap">
                    <label htmlFor className="input-lb">
                      Your ID
                      <span style={{ color: "#0081ff" }}>* </span>
                    </label>
                    <input
                      type="text"
                      name="user_ID"
                      className="input-inp"
                      value={this.state.userID}
                      onChange={e=>{
                          this.setState({
                            userID: e.target.value
                          })
                      }}
                      required
                    />
                  </li>

                  {/* 로컬 파일 업로드 */}
                  <li className="input-wrap">
                    <label htmlFor className="input-lb">
                      File
                      <span style={{ color: "#0081ff" }}>* </span>
                    </label>
                    <input
                      type="file"
                      className="input-inp"
                      onChange={this.hadnleFile}
                    />
                  </li>
                  <br/>
                  {/* 주의 사항 */}
                  <li className="store_red_p">
                    * 제출 후, ID로 파일 조회가 가능합니다.
                  </li>        

              </ul>
              
              {/* 저장 / 취소 버튼 */}
              <div className="center_div">
                <button
                  className="blue_btn"
                  onClick={this.handleStore}>
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
    )
}}

export default withRouter(Store);