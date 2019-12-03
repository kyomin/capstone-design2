import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

// App 페이지 전용 CSS 클래스를 import 한다.
import "./App.scss";

class App extends Component
{
  constructor(props)
  {
    super(props);

    this.state = 
    {

    }
  }

  render() {
    return (
      <div>
        <div className="app_wrap">
          <div className="inner_title">
            <h1>작업을 선택하십시오.</h1>
          </div>
          <div className="app">
            <div className="app_box">
              {/* 저장 / 조회 버튼 */}
              <div className="center_div">
                <Link to="/store">
                  <button
                    className="blue_btn">
                      저장
                  </button>
                </Link>
                
                <Link to="/read">
                  <button
                    className="white_btn">
                      조회
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default App;