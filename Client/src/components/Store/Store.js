import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';

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
        fileName: '',
        fileSize: '',
        fileType: '',
        fileContents: '',
        file: ''
      };
  }

  // file용 input창의 변화 감지 처리를 위한 함수.
  hadnleFile = (e) =>
  {
    var file = e.target.files[0];

    this.setState({
      file: file
    });

    // 파일 내용을 읽기 위한 객체 참조 변수
    var read = new FileReader();

    read.readAsText(file);

    read.onload = e => {
    
      this.setState({
        fileContents: e.target.result
      });
    }

    this.setState(
      {
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type
      }
    );
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
      var timeStamp = curruntTime.substr(0, 25);
      timeStamp = timeStamp.trim();

      
      /*
        file 정보들, date, ID를 담은 폼 데이터를 이용하여 해시 값 추출!
      */
      var hash = sha256(this.state.userID + timeStamp + 
        this.state.fileName + this.state.fileType + 
        this.state.fileSize + this.state.fileContents);
      

      let headers = new Headers();

      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');

      headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
      headers.append('Access-Control-Allow-Credentials', 'true');

      headers.append('GET', 'POST', 'OPTIONS');

    
      axios.post(`${constants.URL_BACK}/store`, {
        body: {
          userID: this.state.userID,
          timeStamp: timeStamp,
          hashValue: hash,
          fileName: this.state.fileName,
          fileSize: this.state.fileSize,
          fileType: this.state.fileType,
          fileContents: this.state.fileContents
        }
      },
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }
      )
      .then((res) => {
        swal("", "파일 저장 성공!", "success")
        .then(() => {
          window.location.reload();
        });
      })
      .catch((err) => {
        console.log(err);
      })
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