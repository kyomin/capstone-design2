import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function MakeFileList(props) {
    const [fileList, setFileList] = useState(props.fileList);
    const [userId, setUserId] = useState(props.userId);

    useEffect(() => {
        setFileList(props.fileList);
        setUserId(props.userId);
    }, [props]);

    const handleClick = (idx) => {
        const timeStamp = fileList[idx].timeStamp;

        const requestData = {
            userId,
            timeStamp
        };

        axios.post('/api/confirm', requestData)
        .then((res) => {
            if(res.data.confirmFileIntegritySuccess) swal("", res.data.message, "success");
            else swal("", res.data.message, "error");
        })
        .catch((err) => {
            swal("", "서버 문제로 파일 검증에 실패했습니다! \n 잠시 후 다시 시도해 주십시오!", "error");
            console.error(err);
        }); 
    }

    return fileList.map((item, idx) => {
        return (
            <tr 
                key={idx} 
                style ={
                {
                    cursor: "pointer"
                }}
                onClick={() => handleClick(idx)}
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
        );
    });
}

export default withRouter(MakeFileList);