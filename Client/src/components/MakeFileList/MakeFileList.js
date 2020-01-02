import React from 'react';
import axios from 'axios';
import swal from 'sweetalert';

// 수시로 변동되는 BACK_URL을 상수로 정의한 것을 받아온다.
import * as constants from "../../constants.js";

export default class MakeFileList extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
            fileList: this.props.fileList,
            userID: this.props.userID
        };
    }

    componentDidMount = () => {
        console.log(this.state.fileList);
        console.log(this.state.userID);
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps !== this.props) {
          this.setState(
            {
              fileList: this.props.fileList,
              userID: this.props.userID
            });
        }
    };

    /*
        파일 리스트의 각 파일에 대해 특정 파일을 클릭했을 때를 처리한다.
    */
    handleClick = (idx) => {
        
        var userID = this.state.fileList[idx].userID;
        var timeStamp = this.state.fileList[idx].timeStamp;

        axios.get(`${constants.URL_BACK}/confirm?userID=${userID}&timeStamp=${timeStamp}`)
        .then(res => {
            console.log(res);
            if(res.data === "OK")
            {
                swal("", "원본 파일의 무결성이 보장되었습니다.", "success");
            } else{
                swal("", "원본 파일이 변경되었습니다", "error");
            }
            
        })
        .catch(err => {
            console.log(err);
        })
    }


    render()
    {
        return this.state.fileList.map((item, idx) => {
            return (
                <tr 
                    key={idx} 
                    style ={
                    {
                        cursor: "pointer"
                    }}
                    onClick={e=>this.handleClick(idx)}
                >
                    <td>
                        <div className="file_list_accordian">
                            <div className="file_list_wrap">
                                <div className="subject">
                                {item.fileName}
                                </div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div className="file_list_accordian">
                            <div className="file_list_wrap">
                                <div className="subject">
                                {item.fileType}
                                </div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div className="file_list_accordian">
                            <div className="file_list_wrap">
                                <div className="subject">
                                {item.fileSize}
                                </div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div className="file_list_accordian">
                            <div className="file_list_wrap">
                                <div className="subject">
                                {item.timeStamp}
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            )
        })
        
        
    }
}
